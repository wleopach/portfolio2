// lib/data.ts reads process.env.NODE_ENV; wrangler replaces it at build time via [define].
declare const process: { env: Record<string, string | undefined> };
