import { createBusinessAppsHandlers } from "../../../lib/business-apps-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const handlers = createBusinessAppsHandlers({
  getKey: () => process.env.OPENAI_API_KEY,
  getModel: () => process.env.OPENAI_BUSINESS_MODEL,
  fetch: (...args) => fetch(...args),
  now: () => Date.now(),
});

export const GET = handlers.GET;
export const POST = handlers.POST;
