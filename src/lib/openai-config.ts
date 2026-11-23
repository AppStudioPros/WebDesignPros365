export const DEFAULT_OPENAI_MODEL = "gpt-6.2-sol";

export function configuredOpenAIKey(env: Record<string, string | undefined>) {
  // Support the project's existing Sensitive variable without exposing its value
  // or recreating it. Prefer the standard name when both are configured.
  return env.OPENAI_API_KEY?.trim() || env.OPEN_API_KEY?.trim();
}

export function configuredOpenAIModel(env: Record<string, string | undefined>) {
  return env.OPENAI_BUSINESS_MODEL?.trim() || DEFAULT_OPENAI_MODEL;
}
