# Roadmap

**Project:** Leonardo Pacheco — Personal Portfolio Website

---

## Phase 1 — Scaffold

> Goal: working Next.js project with all config in place, ready to build components.

- [ ] Bootstrap project: `npx create-next-app@latest portfolio --typescript --tailwind --app`
- [ ] Configure `tsconfig.json` path alias `@/` pointing to project root
- [ ] Set up `tailwind.config.ts` with custom theme tokens (colors, fonts, spacing)
- [ ] Create `lib/data.ts` and populate with real content:
    - Owner info (name, title, bio, location, email, GitHub, LinkedIn)
    - Technologies list (18 entries with `name`, `slug`, `hex`)
    - Projects array (name, description, tags, links)
    - Experience array (company, role, dates, bullet points)
- [ ] Add `.env.local` with `OPENAI_API_KEY`
- [ ] Confirm `npm run dev` serves at `localhost:3000`

---

## Phase 2 — Core Sections

> Goal: full single-page portfolio with all sections, no chatbot yet.

### Layout
- [ ] `components/layout/Navbar.tsx` — logo, nav links, mobile menu
- [ ] `components/layout/Footer.tsx` — links, copyright
- [ ] Wire into `app/layout.tsx`

### Sections (in page order)
- [ ] `components/sections/Hero.tsx` — name, title, CTA buttons, entrance animation
- [ ] `components/sections/About.tsx` — bio, profile photo via `next/image`
- [ ] `components/sections/Technologies.tsx` — 3D canvas sphere (`'use client'`)
    - Fibonacci sphere layout
    - Simple Icons SVGs fetched + recoloured with brand hex
    - Drag-to-rotate with momentum, depth-sorted rendering, hover tooltip
- [ ] `components/sections/Projects.tsx` — card grid with tech badges + links
- [ ] `components/sections/Experience.tsx` — vertical timeline
- [ ] `components/sections/Contact.tsx` — email, GitHub, LinkedIn

### Page assembly
- [ ] Compose all sections in `app/page.tsx`
- [ ] Verify scroll navigation from Navbar links
- [ ] Confirm full mobile responsiveness

---

## Phase 3 — AI Chatbot

> Goal: floating chat widget backed by GPT-4o, knowing Leonardo's full profile.

- [ ] `npm install openai`
- [ ] `lib/openai.ts` — OpenAI client singleton
- [ ] `lib/portfolio-context.ts` — system prompt built from `lib/data.ts`
- [ ] `app/api/chat/route.ts` — POST handler, trims to last 10 messages
- [ ] `components/chatbot/TypingIndicator.tsx`
- [ ] `components/chatbot/ChatMessages.tsx` — user / assistant message bubbles
- [ ] `components/chatbot/ChatInput.tsx` — textarea + send button
- [ ] `components/chatbot/ChatWidget.tsx` — floating toggle, slide-up panel
    - Open/closed state persisted in `localStorage`
    - Welcome message on first open
    - Auto-scroll to latest message
- [ ] Mount `<ChatWidget />` in `app/layout.tsx` (renders on every page)
- [ ] Test with 10+ realistic recruiter questions

---

## Phase 4 — Polish & Launch

> Goal: production-ready, fast, SEO-optimised, live on Vercel.

### Performance
- [ ] Replace all `<img>` with `next/image` (lazy load, AVIF/WebP)
- [ ] Add `next/font` for web fonts (zero layout shift)
- [ ] Audit and remove unused Tailwind classes (`npx tailwindcss --minify`)

### SEO
- [ ] `metadata` export in `app/layout.tsx` (title, description, og:image)
- [ ] `robots.txt` and `sitemap.xml` via Next.js route handlers
- [ ] Run Lighthouse audit — target Performance ≥ 90, SEO = 100

### Chatbot hardening
- [ ] Cap `/api/chat` at last 10 messages and `max_tokens: 300`
- [ ] Add Vercel Edge middleware for IP-based rate limiting
- [ ] Handle API errors gracefully in the chat widget UI

### Deploy
- [ ] Push repo to GitHub
- [ ] Connect repo to Vercel project
- [ ] Set `OPENAI_API_KEY` in Vercel environment variables
- [ ] `vercel --prod` — confirm live URL works end-to-end
- [ ] Set up GitHub Actions CI (lint + type-check on every PR)

### Optional enhancements
- [ ] Framer Motion entrance animations on scroll
- [ ] Project filtering by technology tag
- [ ] Dark / light mode toggle
- [ ] Resume PDF download button

---

## Timeline Estimate

| Phase | Effort |
|---|---|
| Phase 1 — Scaffold | 1–2 hours |
| Phase 2 — Core sections | 1–2 days |
| Phase 3 — AI chatbot | 4–6 hours |
| Phase 4 — Polish & launch | 4–6 hours |
| **Total** | **~3–4 days** |