import { configuredOpenAIKey, configuredOpenAIModel } from "../../../lib/openai-config";
import { createSiteChatHandlers } from "../../../lib/site-chat-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const handlers = createSiteChatHandlers({
  getKey: () => configuredOpenAIKey(process.env),
  getModel: () => configuredOpenAIModel(process.env),
  fetch: (...args) => fetch(...args),
  now: () => Date.now(),
});

export const POST = handlers.POST;
