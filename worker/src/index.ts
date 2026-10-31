import { getSystemPrompt } from "../../lib/portfolio-context";

interface Env {
  OPENAI_API_KEY: string;
  APPS_SCRIPT_URL: string;
  LOG_SECRET: string;
  ALLOWED_ORIGINS: string;
  RATE_LIMITER: { limit(options: { key: string }): Promise<{ success: boolean }> };
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const MAX_MESSAGE_CHARS = 1000;
const MAX_CHAT_MESSAGES = 10;
const MAX_LOG_MESSAGES = 200;

const corsHeaders = (origin: string | null, env: Env): Record<string, string> => {
  const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
  if (!origin || !allowed.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
};

const json = (body: unknown, status: number, headers: Record<string, string>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });

const parseMessages = (value: unknown, maxCount: number): Message[] | null => {
  if (!Array.isArray(value) || value.length === 0) return null;
  const messages: Message[] = [];
  for (const m of value.slice(-maxCount)) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      !m.content.trim()
    ) {
      return null;
    }
    messages.push({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) });
  }
  return messages;
};

const readJson = async (request: Request): Promise<Record<string, unknown> | null> => {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
};

const handleChat = async (request: Request, env: Env, cors: Record<string, string>) => {
  const body = await readJson(request);
  const messages = body && parseMessages(body.messages, MAX_CHAT_MESSAGES);
  if (!messages || messages[messages.length - 1].role !== "user") {
    return json({ error: "Invalid messages." }, 400, cors);
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "system", content: getSystemPrompt() }, ...messages],
      max_tokens: 300,
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    console.error("OpenAI error", response.status, await response.text());
    return json({ error: "The assistant is unavailable right now." }, 502, cors);
  }

  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return json({ error: "No response from AI" }, 502, cors);
  return json({ content }, 200, cors);
};

const handleLog = async (
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  cors: Record<string, string>,
) => {
  const body = await readJson(request);
  const messages = body && parseMessages(body.messages, MAX_LOG_MESSAGES);
  const sessionId = body?.sessionId;
  if (!messages || typeof sessionId !== "string" || !sessionId || sessionId.length > 100) {
    return json({ error: "Invalid log payload." }, 400, cors);
  }

  const payload = {
    secret: env.LOG_SECRET,
    sessionId,
    messages,
    page: typeof body.page === "string" ? body.page.slice(0, 500) : "",
    startedAt: typeof body.startedAt === "string" ? body.startedAt.slice(0, 50) : "",
  };

  ctx.waitUntil(
    fetch(env.APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => {
        if (!r.ok) console.error("Apps Script error", r.status);
      })
      .catch((err) => console.error("Apps Script fetch failed", err)),
  );

  return new Response(null, { status: 204, headers: cors });
};

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin, env);
    const { pathname } = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: cors["Access-Control-Allow-Origin"] ? 204 : 403, headers: cors });
    }

    if (request.method !== "POST" || (pathname !== "/chat" && pathname !== "/log")) {
      return json({ error: "Not found." }, 404, cors);
    }

    // Not a real auth boundary (Origin can be spoofed outside browsers), but it stops
    // other sites from using this Worker from their visitors' browsers.
    if (!cors["Access-Control-Allow-Origin"]) {
      return json({ error: "Origin not allowed." }, 403, cors);
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const { success } = await env.RATE_LIMITER.limit({ key: `${pathname}:${ip}` });
    if (!success) {
      return json({ error: "Too many requests. Please wait a moment and try again." }, 429, cors);
    }

    try {
      return pathname === "/chat"
        ? await handleChat(request, env, cors)
        : await handleLog(request, env, ctx, cors);
    } catch (err) {
      console.error("Unhandled error", err);
      return json({ error: "Sorry, I encountered an error. Please try again later." }, 500, cors);
    }
  },
};

export default worker;
