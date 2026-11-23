import { createBusinessAppsHandlers } from "../../../lib/business-apps-api";
import { configuredOpenAIKey, configuredOpenAIModel } from "../../../lib/openai-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const handlers = createBusinessAppsHandlers({
  getKey: () => configuredOpenAIKey(process.env),
  getModel: () => configuredOpenAIModel(process.env),
  fetch: (...args) => fetch(...args),
  now: () => Date.now(),
});

export const GET = handlers.GET;
export const POST = handlers.POST;
