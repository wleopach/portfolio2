# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server at http://localhost:3000 (no basePath in dev)
- `npm run build` — static export to `out/` (production build uses the `/portfolio2` basePath)
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- Type-check: `npx tsc --noEmit`

There is no test suite.

## Architecture

Single-page personal portfolio for Leonardo Pacheco. Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (configured in CSS via `@theme` in `app/globals.css` — there is no `tailwind.config.ts`), Framer Motion, and react-three-fiber.

### Static export to GitHub Pages

`next.config.ts` sets `output: 'export'` and, in production, `basePath`/`assetPrefix` of `/portfolio2`. `.github/workflows/deploy.yml` builds and deploys `out/` to GitHub Pages on every push to `main`. Consequences:

- No server runtime: no API routes, no middleware, no server actions, no `next/image` optimization (`images.unoptimized`).
- Asset paths to `public/` are **not** automatically prefixed when used in plain strings (CSS `url()`, `<img src>`, canvas textures, metadata icons). Always build them with the `basePath` constant exported from `lib/data.ts` (e.g. `` `${basePath}/assets/...` ``). Forgetting this works in dev but breaks in production.

### Content: `lib/data.ts` is the single source of truth

All portfolio content (owner info, services, technologies, projects, experience) lives in typed arrays in `lib/data.ts`. Section components in `components/sections/` render from it, and `lib/portfolio-context.ts` builds the chatbot's system prompt from the same data — so content edits propagate to both the UI and the AI.

### Page composition

`app/page.tsx` stacks the sections in order (Hero, About, Technologies, Projects, Experience, Contact). `app/layout.tsx` provides Navbar, Footer, the `ChatWidget`, fonts, and SEO/OpenGraph metadata. `app/robots.ts` and `app/sitemap.ts` generate static SEO files. Shared Framer Motion variants (`textVariant`, `staggerContainer`, etc.) are in `lib/motion.ts`.

### Chatbot (Cloudflare Worker + Apps Script)

The static site has no server, so the chatbot backend is a separate Cloudflare Worker in `worker/` (deployed independently from the site):

- `components/chatbot/ChatWidget.tsx` POSTs `{ messages }` (last 10 plus the new one) to `${NEXT_PUBLIC_CHAT_API_URL}/chat`. The Worker (`worker/src/index.ts`) validates and truncates messages, prepends the system prompt from `lib/portfolio-context.ts` server-side, calls OpenAI (`gpt-4o`, `max_tokens: 300`) with its own secret key, and returns `{ content }`. No OpenAI key exists in the client bundle.
- On widget close, `pagehide`, or tab hidden, the widget `sendBeacon`s the transcript (`text/plain`, no preflight) to `/log`. The Worker forwards it with a shared secret to a Google Apps Script web app (`apps-script/Code.gs`, pasted into script.google.com), which appends a row to a Google Sheet and emails wleonardop@gmail.com. Later flushes of a longer transcript reuse the session ID in the subject, so Gmail threads them.
- The Worker enforces an Origin allowlist (`ALLOWED_ORIGINS` in `worker/wrangler.toml`) and a per-IP rate limit. Secrets: `OPENAI_API_KEY`, `APPS_SCRIPT_URL`, `LOG_SECRET` (`npx wrangler secret put <NAME>`).
- Worker commands (from `worker/`): `npm install`, `npm run dev` (http://localhost:8787; put secrets in `worker/.dev.vars`), `npm run deploy`, `npm run typecheck`. The root `tsconfig.json` excludes `worker/`.
- `NEXT_PUBLIC_CHAT_API_URL` is set in `.github/workflows/deploy.yml` for production; locally put it in `.env.local` (e.g. `http://localhost:8787`). Without it the widget shows a "Chat API URL is missing" error.
- Because the Worker bundles `lib/data.ts`, keep `lib/` free of browser/Node-only imports. `process.env.NODE_ENV` is replaced via `[define]` in `wrangler.toml`.

### Technologies section

Each technology is rendered as a 3D "ball" with react-three-fiber/drei (`components/canvas/Ball.tsx`), using PNG icons from `public/assets/tech/`.

### Fonts

Custom local fonts (`app/fonts/`: Arenq, Beckman, Mova, Overcame) are declared with `@font-face` in `app/globals.css` and exposed as Tailwind font tokens; Geist is loaded via `next/font/google` in the layout.

## Note on `spec/`

`spec/mission.md`, `spec/roadmap.md`, and `spec/tech-stack.md` describe the original plan (Next.js 14, Tailwind v3, Vercel, a server-side `/api/chat` route, an HTML5-canvas Simple Icons sphere). The actual implementation diverged — trust the code over the specs for stack and deployment details, but the specs remain useful for product goals and intent.

@AGENTS.md
