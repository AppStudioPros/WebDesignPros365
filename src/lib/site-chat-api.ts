import { ACI_IDENTITY, hasConflictingIdentity, identityReply } from "./aci-identity";
import { BodyTooLarge, extractOutput, json, readLimited } from "./ai-http";
import { DEFAULT_OPENAI_MODEL } from "./openai-config";
import { siteChatRequestSchema } from "./site-chat-model";
import { siteChatInstructions } from "./site-chat-prompt";

type Dependencies = {
  getKey: () => string | undefined;
  getModel: () => string | undefined;
  fetch: typeof fetch;
  now: () => number;
  timeoutMs?: number;
};
const REQUEST_LIMIT = 96 * 1024;
const WINDOW_MS = 15 * 60 * 1000;

// Keep the node's existing SSE wire format. Buffer the completed answer so an
// invalid/failed response or conflicting identity never appears token by token.
function answer(text: string) {
  return new Response(`data: ${JSON.stringify({ text })}\n\ndata: [DONE]\n\n`, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-store, no-transform", "X-Content-Type-Options": "nosniff" },
  });
}

export function createSiteChatHandlers(deps: Dependencies) {
  const visitors = new Map<string, { count: number; until: number }>();
  let global = { count: 0, until: 0 };
  let inFlight = 0;
  // Best-effort per-instance limits, not a shared account-wide spending cap.
  function allowance(request: Request) {
    const now = deps.now();
    for (const [key, bucket] of visitors) if (bucket.until <= now) visitors.delete(key);
    if (global.until <= now) global = { count: 0, until: now + WINDOW_MS };
    const ip = (request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim().slice(0, 100);
    const bucket = visitors.get(ip) ?? { count: 0, until: now + WINDOW_MS };
    if (bucket.count >= 20 || global.count >= 120 || visitors.size >= 2000 || inFlight >= 3) return Math.max(1, Math.ceil((Math.min(bucket.until, global.until) - now) / 1000));
    bucket.count++;
    global.count++;
    visitors.set(ip, bucket);
    return 0;
  }

  return {
    async POST(request: Request) {
      const origin = request.headers.get("origin");
      if ((origin && origin !== new URL(request.url).origin) || request.headers.get("sec-fetch-site") === "cross-site") return json({ error: "Open the assistant on this website to chat." }, 403);
      if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") ?? "")) return json({ error: "Send a JSON request." }, 415);
      const declared = request.headers.get("content-length");
      if (declared && (!/^\d+$/.test(declared) || Number(declared) > REQUEST_LIMIT)) return json({ error: "This conversation is too long. Start a new chat." }, 413);
      let input: unknown;
      try { input = JSON.parse(await readLimited(request.body, REQUEST_LIMIT)); }
      catch (error) { return json({ error: error instanceof BodyTooLarge ? "This conversation is too long. Start a new chat." : "The message could not be read. Please try again." }, error instanceof BodyTooLarge ? 413 : 400); }
      const parsed = siteChatRequestSchema.safeParse(input);
      if (!parsed.success) return json({ error: "Send a message of up to 1,200 characters in a conversation of up to 40 messages." }, 400);
      const identity = identityReply(parsed.data.messages.at(-1)!.content, "website");
      if (identity) return answer(identity);
      const key = deps.getKey()?.trim();
      if (!key || key.startsWith("sk-ant-")) return json({ error: "Chat is temporarily unavailable. Please use the contact form at /contact." }, 503);
      const retryAfter = allowance(request);
      if (retryAfter) return json({ error: "The assistant is receiving too many requests. Please try again later." }, 429, { "Retry-After": String(retryAfter) });
      if (request.signal.aborted) return json({ error: "The request was cancelled." }, 408);

      inFlight++;
      const controller = new AbortController();
      const abort = () => controller.abort();
      request.signal.addEventListener("abort", abort, { once: true });
      const timer = setTimeout(abort, deps.timeoutMs ?? 45_000);
      try {
        const response = await deps.fetch("https://api.openai.com/v1/responses", {
          method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          signal: controller.signal, cache: "no-store",
          body: JSON.stringify({
            model: deps.getModel()?.trim() || DEFAULT_OPENAI_MODEL,
            instructions: siteChatInstructions(),
            input: parsed.data.messages.map(message => ({ ...message, ...(message.role === "assistant" ? { phase: "final_answer" } : {}) })),
            store: false, max_output_tokens: 2000, reasoning: { effort: "low" }, text: { verbosity: "low" },
          }),
        });
        if (!response.ok) {
          const requestId = response.headers.get("x-request-id");
          console.warn("[site-chat] Provider request failed", { status: response.status, ...(requestId && /^req_[a-zA-Z0-9_-]{1,100}$/.test(requestId) ? { requestId } : {}) });
          await response.body?.cancel().catch(() => undefined);
          return json({ error: "Chat is temporarily unavailable. Please try again or use /contact." }, response.status === 429 ? 503 : 502);
        }
        const output = extractOutput(JSON.parse(await readLimited(response.body, 128 * 1024)));
        if (controller.signal.aborted) return json({ error: "The request was cancelled." }, 408);
        if (output.refused) return answer(`${ACI_IDENTITY} I can help with Web Design Pros 365 services and business website questions. What would you like to build?`);
        if (!output.text?.trim() || output.text.length > 8000) return json({ error: "The answer could not be completed. Please try a shorter question." }, 502);
        return answer(hasConflictingIdentity(output.text) ? ACI_IDENTITY : output.text);
      } catch {
        return json({ error: controller.signal.aborted ? "The response took too long or was cancelled. Please try again." : "Chat could not finish. Please try again or use /contact." }, controller.signal.aborted ? 504 : 502);
      } finally {
        clearTimeout(timer);
        request.signal.removeEventListener("abort", abort);
        inFlight--;
      }
    },
  };
}
