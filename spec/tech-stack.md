# Tech Stack

**Project:** Leonardo Pacheco — Personal Portfolio Website

---

## Framework

| Choice | Version | Reason |
|---|---|---|
| Next.js | 14 (App Router) | SSR, file-based routing, built-in API routes, image & font optimisation |
| React | 18 | Component model, hooks, concurrent features |
| TypeScript | 5 | Type safety across all components, data, and API contracts |

## Styling

| Choice | Version | Reason |
|---|---|---|
| Tailwind CSS | v3 | Utility-first, consistent design tokens, no runtime cost |
| CSS variables | — | Theme tokens (colors, spacing) shared across Tailwind and canvas code |

## AI Chatbot

| Choice | Reason |
|---|---|
| OpenAI GPT-4o | Best conversational quality for recruiter Q&A |
| Next.js API Route (`/api/chat`) | Server-side key handling — key never exposed to browser |
| System prompt from `lib/data.ts` | Single source of truth; content changes propagate to both UI and AI |

```ts
// app/api/chat/route.ts
model: 'gpt-4o',
max_tokens: 300,
temperature: 0.5,
```

## Technologies Sphere

| Choice | Reason |
|---|---|
| HTML5 Canvas | Full control over 3D projection, depth sorting, momentum physics |
| Simple Icons CDN | `https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/[slug].svg` — 3000+ brand SVGs, free |
| Fibonacci sphere layout | Even distribution of N points on a sphere, no clustering |

SVGs are fetched, recoloured with each brand's official hex via `Blob` + `URL.createObjectURL`, then drawn as `Image` objects on the canvas each frame.

## Data Layer

```
lib/
├── data.ts                 # Single typed file — owner, techs, projects, experience
├── openai.ts               # OpenAI client singleton
└── portfolio-context.ts    # System prompt built programmatically from data.ts
```

All UI components and the chatbot system prompt consume the same `lib/data.ts`. Content is never duplicated.

## Deployment

| Choice | Reason |
|---|---|
| Vercel | Zero-config Next.js hosting, edge network, preview deployments per PR |
| GitHub Actions | CI checks (lint, type-check) on every push before deploy |

## Dependencies

```json
{
  "dependencies": {
    "next": "^16",
    "react": "^19",
    "react-dom": "^18",
    "openai": "^5",
    "tailwindcss": "^4"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "postcss": "^8",
    "autoprefixer": "^10",
    "eslint": "^8",
    "eslint-config-next": "^14"
  }
}
```

## Environment Variables

```bash
# .env.local — never commit this file
OPENAI_API_KEY=sk-...
```

Set `OPENAI_API_KEY` in Vercel → Project → Settings → Environment Variables for production.

## Security Considerations

- OpenAI key is server-side only — never in client bundles
- `/api/chat` trims history to last 10 messages to cap token cost
- Consider Vercel Edge middleware for IP-based rate limiting before launch