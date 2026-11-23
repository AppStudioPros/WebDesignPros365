export class BodyTooLarge extends Error {}

export async function readLimited(body: ReadableStream<Uint8Array> | null, limit: number): Promise<string> {
  if (!body) return "";
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel().catch(() => undefined);
        throw new BodyTooLarge();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const combined = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(combined);
}

export function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...extra },
  });
}

export function extractOutput(value: unknown): { refused: boolean; text: string | null } {
  if (!value || typeof value !== "object") return { refused: false, text: null };
  const response = value as { status?: unknown; output?: unknown };
  if (response.status !== "completed" || !Array.isArray(response.output)) return { refused: false, text: null };
  const texts: string[] = [];
  let refused = false;
  for (const item of response.output) {
    if (!item || item.type !== "message" || item.role !== "assistant" || !Array.isArray(item.content)) continue;
    for (const content of item.content) {
      if (content?.type === "refusal") refused = true;
      if (content?.type === "output_text" && typeof content.text === "string") texts.push(content.text);
    }
  }
  return { refused, text: texts.length === 1 ? texts[0] : null };
}

