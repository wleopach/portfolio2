"use client";

import { useEffect, useRef, useCallback } from "react";
import { technologies } from "@/lib/data";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Tech {
  name: string;
  slug: string;
  hex: string;
}

interface SpherePoint {
  tech: Tech;
  phi: number;
  theta: number;
}

interface ProjectedPoint extends SpherePoint {
  sx: number;
  sy: number;
  depth: number;
  scale: number;
  screenR: number;
}

interface ImgEntry {
  img: HTMLImageElement | null;
  ready: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SPHERE_RADIUS_DESKTOP = 0.38;
const SPHERE_RADIUS_MOBILE = 0.42;
const MIN_ALPHA = 0.2;
const ICON_SIZE_FACTOR = 1.05;
const AUTO_ROTATE_Y = 0.004;
const AUTO_ROTATE_X = 0.0012;
const FRICTION = 0.95;
const SIMPLE_ICONS_CDN = "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lighten(hex: string, amt: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgb(${Math.min(255, r + Math.round(255 * amt))},${Math.min(255, g + Math.round(255 * amt))},${Math.min(255, b + Math.round(255 * amt))})`;
}

function fibonacciSphere(n: number): { phi: number; theta: number }[] {
  return Array.from({ length: n }, (_, i) => ({
    phi: Math.acos(1 - (2 * (i + 0.5)) / n),
    theta: Math.PI * (1 + Math.sqrt(5)) * i,
  }));
}

// ─── Component ───────────────────────────────────────────────────────────────

const Technologies = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Mutable state kept in refs to avoid re-renders
  const rotX = useRef(0.3);
  const rotY = useRef(0.5);
  const velX = useRef(0);
  const velY = useRef(AUTO_ROTATE_Y);
  const dragging = useRef(false);
  const lastMX = useRef(0);
  const lastMY = useRef(0);
  const hovered = useRef<number | null>(null);
  const projectedRef = useRef<ProjectedPoint[]>([]);
  const imgCache = useRef<Map<string, ImgEntry>>(new Map());
  const rafId = useRef<number>(0);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Build sphere points once from technologies data
  const points = useRef<SpherePoint[]>([]);
  useEffect(() => {
    const positions = fibonacciSphere(technologies.length);
    points.current = technologies.map((tech, i) => ({
      tech,
      phi: positions[i].phi,
      theta: positions[i].theta,
    }));
  }, []);

  // Fetch + recolour SVG, return cached entry
  const getImg = useCallback((tech: Tech): ImgEntry => {
    const cached = imgCache.current.get(tech.slug);
    if (cached) return cached;

    const entry: ImgEntry = { img: null, ready: false };
    imgCache.current.set(tech.slug, entry);

    const isDark =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    const iconColor = isDark ? "ffffff" : tech.hex;

    fetch(`${SIMPLE_ICONS_CDN}/${tech.slug}.svg`)
        .then((r) => r.text())
        .then((svgText) => {
          // Strip existing fill attrs, inject brand colour
          const coloured = svgText
              .replace(/fill="[^"]*"/g, "")
              .replace("<svg ", `<svg fill="#${iconColor}" `);
          const blob = new Blob([coloured], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const img = new Image();
          img.onload = () => {
            entry.img = img;
            entry.ready = true;
            URL.revokeObjectURL(url);
          };
          img.onerror = () => {
            entry.ready = true; // fall back to text label
          };
          img.src = url;
        })
        .catch(() => {
          entry.ready = true;
        });

    return entry;
  }, []);

  // Project 3D point → 2D screen coords
  const project = useCallback(
      (phi: number, theta: number, R: number, cx: number, cy: number) => {
        const cosX = Math.cos(rotX.current);
        const sinX = Math.sin(rotX.current);
        const cosY = Math.cos(rotY.current);
        const sinY = Math.sin(rotY.current);

        const x0 = R * Math.sin(phi) * Math.cos(theta);
        const y0 = R * Math.sin(phi) * Math.sin(theta);
        const z0 = R * Math.cos(phi);

        // Rotate around X axis
        const y1 = y0 * cosX - z0 * sinX;
        const z1 = y0 * sinX + z0 * cosX;
        // Rotate around Y axis
        const x2 = x0 * cosY + z1 * sinY;
        const z2 = -x0 * sinY + z1 * cosY;

        const depth = (z2 + R) / (2 * R); // 0 (back) → 1 (front)
        const scale = 0.45 + 0.7 * depth;

        return { sx: cx + x2, sy: cy + y1, depth, scale };
      },
      []
  );

  // Main draw loop
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    const isMobile = window.innerWidth < 768;
    const R = Math.min(W, H) * (isMobile ? SPHERE_RADIUS_MOBILE : SPHERE_RADIUS_DESKTOP);

    ctx.clearRect(0, 0, W, H);

    // Project all points
    const projected: ProjectedPoint[] = points.current.map((p, i) => {
      const { sx, sy, depth, scale } = project(p.phi, p.theta, R, cx, cy);
      // Adaptive icon size based on screen
      const baseIconSize = isMobile ? 20 : 26;
      const screenR = baseIconSize * scale;
      return { ...p, sx, sy, depth, scale, screenR, _i: i } as ProjectedPoint & { _i: number };
    });

    // Sort back → front for correct occlusion
    projected.sort((a, b) => a.depth - b.depth);
    projectedRef.current = projected;

    // Draw each logo bubble
    for (const p of projected) {
      const idx = (p as ProjectedPoint & { _i: number })._i;
      const isHov = hovered.current === idx;
      const alpha = isHov ? 1 : MIN_ALPHA + (1 - MIN_ALPHA) * p.depth;
      const [r, g, b] = hexToRgb(p.tech.hex);

      ctx.save();
      ctx.globalAlpha = alpha;

      // Circle background
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, p.screenR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},0.12)`;
      ctx.fill();

      // Ring
      ctx.strokeStyle = isHov
          ? `rgba(${r},${g},${b},1)`
          : `rgba(${r},${g},${b},0.55)`;
      ctx.lineWidth = isHov ? 2 : 0.8;
      ctx.stroke();

      // SVG logo or fallback text
      const entry = getImg(p.tech);
      const iconSize = p.screenR * ICON_SIZE_FACTOR * 1.3;

      if (entry.ready && entry.img) {
        ctx.drawImage(
            entry.img,
            p.sx - iconSize / 2,
            p.sy - iconSize / 2,
            iconSize,
            iconSize
        );
      } else {
        // Fallback initials while SVG loads
        ctx.fillStyle = `rgba(${r},${g},${b},0.9)`;
        ctx.font = `500 ${Math.max(8, 10 * p.scale)}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.tech.name.slice(0, 2).toUpperCase(), p.sx, p.sy);
      }

      ctx.restore();
    }
  }, [getImg, project]);

  // Animation loop
  const loop = useCallback(() => {
    if (!dragging.current) {
      velY.current = velY.current * FRICTION + AUTO_ROTATE_Y * (1 - FRICTION);
      velX.current = velX.current * FRICTION + AUTO_ROTATE_X * (1 - FRICTION);
      rotY.current += velY.current;
      rotX.current += velX.current;
    }
    draw();
    rafId.current = requestAnimationFrame(loop);
  }, [draw]);

  // Canvas resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ro = new ResizeObserver(() => {
      const { width, height } = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    });

    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // Start animation
  useEffect(() => {
    rafId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId.current);
  }, [loop]);

  // Pointer events
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    lastMX.current = e.clientX;
    lastMY.current = e.clientY;
    velX.current = 0;
    velY.current = 0;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (dragging.current) {
      const dx = e.clientX - lastMX.current;
      const dy = e.clientY - lastMY.current;
      const sensitivity = window.innerWidth < 768 ? 0.008 : 0.006;
      velY.current = dx * sensitivity;
      velX.current = dy * sensitivity;
      rotY.current += velY.current;
      rotX.current += velX.current;
      lastMX.current = e.clientX;
      lastMY.current = e.clientY;
      return;
    }

    // Hit-test for hover
    const rect = canvas.getBoundingClientRect();
    const ox = e.clientX - rect.left;
    const oy = e.clientY - rect.top;
    let hit: number | null = null;

    // Test front-to-back (reversed projected order)
    const pts = [...projectedRef.current].reverse();
    for (const p of pts) {
      const idx = (p as ProjectedPoint & { _i: number })._i;
      const dx = ox - p.sx;
      const dy = oy - p.sy;
      if (Math.sqrt(dx * dx + dy * dy) < p.screenR) {
        hit = idx;
        break;
      }
    }

    hovered.current = hit;

    // Update tooltip
    const tip = tooltipRef.current;
    if (tip) {
      if (hit !== null) {
        tip.textContent = technologies[hit].name;
        tip.style.opacity = "1";
      } else {
        tip.style.opacity = "0";
      }
    }
  }, []);

  const onMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onMouseLeave = useCallback(() => {
    dragging.current = false;
    hovered.current = null;
    if (tooltipRef.current) tooltipRef.current.style.opacity = "0";
  }, []);

  // Touch events
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragging.current = true;
    lastMX.current = e.touches[0].clientX;
    lastMY.current = e.touches[0].clientY;
    velX.current = 0;
    velY.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging.current) return;
    const dx = e.touches[0].clientX - lastMX.current;
    const dy = e.touches[0].clientY - lastMY.current;
    const sensitivity = window.innerWidth < 768 ? 0.008 : 0.006;
    velY.current = dx * sensitivity;
    velX.current = dy * sensitivity;
    rotY.current += velY.current;
    rotX.current += velX.current;
    lastMX.current = e.touches[0].clientX;
    lastMY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
      <section
          id="technologies"
          className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Technologies</h2>
          <p className="mt-2 text-sm text-foreground/50 tracking-widest uppercase">
            Drag to explore
          </p>
        </div>

        {/* Sphere container */}
        <div
            ref={wrapRef}
            className="relative w-full rounded-3xl overflow-hidden bg-foreground/[0.03] border border-foreground/[0.06] aspect-square md:aspect-video"
        >
          <canvas
              ref={canvasRef}
              className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              aria-label="Interactive 3D sphere showing Leonardo's technology stack"
          />

          {/* Hover tooltip */}
          <div
              ref={tooltipRef}
              className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2
                     px-3 py-1.5 rounded-full bg-foreground/80 text-background
                     text-xs font-medium tracking-wide opacity-0 transition-opacity duration-150"
          />

          {/* Drag hint — fades after 3s via CSS animation */}
          <div
              className="pointer-events-none absolute top-4 right-5
                     text-xs text-foreground/30 tracking-widest uppercase
                     animate-[fadeout_3s_2s_ease-in_forwards]"
          >
            drag · hover
          </div>
        </div>
      </section>
  );
};

export default Technologies;