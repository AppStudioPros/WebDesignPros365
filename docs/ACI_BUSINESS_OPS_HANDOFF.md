# ACI Business Ops continuation

Updated 2026-11-23.

## Current implementation

The public site has the guided business-applications page and ACI Business Ops navigation (merged PRs #1 and #2). PR #3 adds an OpenAI-backed workspace builder while retaining the guided examples. It is separate from the private ACI engine and the existing Anthropic sales assistant.

The builder uses validated data, never executable model-generated code. It supports up to 10 fields and 20 records, custom field labels/options, table/board/dated-agenda views, manual record editing, follow-up changes, and browser-local save/reset. Generated calendars are agendas, not external calendar integrations. No company systems, real transactions, shared database, staff authentication, or enforced approval workflows are connected.

## Configuration

Set OPENAI_API_KEY on Vercel project webdesignpros365 (team webdesignpros), including Preview and Production. The existing OPEN_API_KEY name is also supported as a server-only fallback; OPENAI_API_KEY takes precedence. Optional OPENAI_BUSINESS_MODEL overrides the default gpt-6.2-sol. The key is server-only. Never commit an environment file or print secret values.

GET /api/business-apps reports only whether a nonempty key is configured; it does not prove provider access or billing. POST uses Responses API, store:false, strict structured output, schema validation, a 45-second timeout, and a 4,000-output-token ceiling. Provider failures log only HTTP status and a validated request ID. Per-instance/IP throttling is best-effort; it is not a distributed spending cap. Deployment-wide controls require a shared limiter or platform firewall rule. Provider budgets may be alerts rather than hard limits.

## Verification

- All 12 API tests passed: bash tests/run-business-apps-tests.sh. These use an injected mock provider; no real OpenAI calls are made.
- npm run build passed, including TypeScript and static page generation.
- node tests/business-apps-ui.mjs passed against the production build on localhost:3004, with the provider route mocked. Covers generation, manual edit/add, follow-up state, failure preservation, save/restore/reset, table/board/agenda, five viewport widths, unavailable fallback, and guided approval flags. Set BUSINESS_APPS_TEST_URL to change the target.
- Initial Vercel preview dpl_6tSuFPorwSMez1xCzb9dFKPr3wJc for app commit d26c6b8862b5599179ebbd1c41b6eaa1b14a27ee reached READY. Authenticated GET /api/business-apps returned HTTP 200 with available:false.
- Vercel variable metadata did not list OPENAI_API_KEY, despite the owner reporting it saved for Production, Preview, and Development. No secret was retrieved. The exact saved variable name has been requested to diagnose the mismatch.

## Next action / release boundary

Resolve the saved-variable mismatch, then build a fresh preview so it receives the configuration. Verify availability and perform a real generation plus follow-up edit using fictional data. Confirm actual model access and inspect safe provider status logs if it fails. Update PR #3 with results and complete the already requested site integration only after live verification. Do not report GPT as connected based only on mocked tests or key presence. Production remains on the guided implementation until this succeeds.

## Configuration correction, 2026-11-23

The owner confirmed that the existing ANTHROPIC_API_KEY row had been renamed to OPENAI_API_KEY. This explained the missing-variable mismatch; renaming a variable does not convert a provider credential. Restored the existing row to ANTHROPIC_API_KEY via a name-only Vercel update, preserving its value and Production/Preview/Development targets. No secret value was read or changed. The owner has been asked to add a separate OPENAI_API_KEY row using an actual OpenAI secret key.

A preview was started while the renamed setting existed (dpl_2uCSufbqGxwFj7ThveK9gHHRurnH). Do not use it for live API calls: its OpenAI-named setting may hold the Anthropic credential. Use a fresh build only after the separate OpenAI row is correctly saved. No live OpenAI request has been made. Production remains unchanged.

The builder now treats a known Anthropic key prefix in OPENAI_API_KEY as unavailable and rejects generation before any provider request. This guards against the observed variable-renaming mistake without logging credential values. The additional regression test verifies no outbound request occurs.

## Separate OpenAI setting, 2026-11-23

The owner added separate Sensitive OpenAI variables in Production, Preview, and Development, named OPEN_API_KEY. Vercel rejects renaming Sensitive variables with HTTP 400. The application now accepts this existing name as a server-only fallback, preserving the values and Sensitive protection without reading or recreating secrets. ANTHROPIC_API_KEY remains restored. The alias and standard-name precedence are covered by a regression test; all 14 API tests passed. Live verification must use a new deployment containing this alias support.
