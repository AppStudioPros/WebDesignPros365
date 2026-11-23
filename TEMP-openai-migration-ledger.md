# OpenAI migration decision ledger

Application: WebDesignPros365, reviewed November 23, 2026.

Current request: the owner asked to identify ACI as a custom patented AI product from Lucid Tech Labs LLC, then explicitly asked to switch the main website node bot to the same GPT API as the Business Ops demo with different behavior at each entry point. This authorizes implementation using the existing connection; it does not request a new key, subscription, model tier, shared conversation, or production publication.

Selected integration: direct OpenAI Responses API through native fetch, matching the existing demo. Both routes use `configuredOpenAIKey` and `configuredOpenAIModel`: `OPENAI_API_KEY` takes precedence over the existing Sensitive `OPEN_API_KEY` alias; `OPENAI_BUSINESS_MODEL` overrides the shared default `gpt-6.2-sol`. No secret is read, renamed, copied, or created for this migration.

## Approved stage and workload coverage

One stage: shared provider configuration, separate site/demo instructions, shared ACI identity rules, corrected data-processing copy, and verified state isolation. This extends the existing review branch and PR #4. The existing Anthropic scanner (`/api/scan`) and its SDK/key remain unchanged.

| Workload | Before | Selected behavior | Validation |
|---|---|---|---|
| Main website node, `/api/chat` | Anthropic SDK, Claude, text deltas over SSE | Existing OpenAI connection; website services, pricing, project scoping, and links to contact/demo; no workspace creation or external actions | Site API tests, site browser suite, live preview requests |
| Business Ops, `/api/business-apps` | OpenAI Responses, strict program schema | Same provider/model; bounded workspace creation and editing; identity/help preserve current workspace | Demo API/sample suite, browser suite, live preview requests |
| Guided demo | Local examples | Same ACI identity/help, no provider call | Browser and shared-identity tests |
| Website scanner | Anthropic | Retained, outside requested switch | Source unchanged; no new scanner test claimed |

The original node's 2–4-paragraph preference remains. Website output is now held until a complete response passes basic identity checks, then delivered using the existing SSE `{text}` / `[DONE]` contract. The visible thinking state remains, but individual unvalidated model tokens are not displayed. This follows the owner's identity-guard requirement. The model request has a 2,000-token total ceiling to cover reasoning plus the prior roughly 1,024-token visible-answer budget; the demo retains 4,000.

## Capability assessment

Every Responses guidance heading was considered. This is a provider/role migration, not a new agent platform.

| Guidance area | Applicability / support / decision | Evidence or limit |
|---|---|---|
| Model selection | Applicable; existing model preserved | Owner explicitly requested the demo's GPT connection; shared configuration prevents drift |
| Instruction file naming | Not applicable | No AGENTS/CLAUDE instructions renamed or introduced |
| Responses API migration | Applicable; implemented | Native fetch replaces only the node's Anthropic request; demo already uses Responses |
| Streaming | Applicable; existing wire contract retained, completed-answer gate added | Identity checking needs the complete answer; incomplete provider responses never appear as a successful turn |
| WebSocket mode | Not applicable to this bounded text chat | No tool loops, persistent sessions, multiplexing, or side-effect recovery needed |
| Zero Data Retention | Not claimed or configured | Both routes use `store:false`; this alone does not establish provider-wide ZDR |
| Data residency | No new regional requirement or setting requested | Reuse the same existing OpenAI endpoint/project; residency was not audited |
| Processing tiers | Existing default behavior retained | No Priority, Flex, Batch, Reserved, background processing, or billing change |
| Prompt cache keys | No new keys | Current model uses provider defaults; no prior app cache-key convention |
| Extended cache retention | Not introduced | No user request to change retention |
| Explicit cache breakpoints | Optional optimization, outside this role migration | Stable knowledge prefix remains; no cache-efficiency improvement is claimed or measured |
| Cache diagnostics | Not applicable to the current client contract | No response IDs are stored or replayed; adding diagnostic state is separate work |
| State management | Applicable; existing local ownership preserved | Separate browser keys, separate API request schemas, no shared transcript, no `previous_response_id` |
| Instruction persistence | Applicable; implemented | Server-owned surface instructions sent on every request; clients cannot choose profile or supply system/developer roles |
| Encrypted reasoning replay | Not introduced | Text-only bounded Q&A preserves its visible-message contract; no encrypted reasoning or tools were previously stored |
| Reasoning effort | Existing demo preference reused | `low` for both; no model/effort escalation or extra paid tier |
| Reasoning preservation | Existing visible conversation only | No claim to preserve hidden reasoning; website history is capped at 40 messages |
| Reasoning summaries/preambles | Not applicable | No summaries or tool activity shown to visitors |
| Verbosity | Existing concise preference retained | Website `text.verbosity:low` supports the existing 2–4-short-paragraph voice; demo schema unchanged |
| Maximum output tokens | Applicable; bounded by workload | Website 2,000 including reasoning; demo 4,000 |
| Assistant phases | Applicable to website replay | Replayed completed visible assistant answers are marked `final_answer`; no commentary phase is stored |
| Context compaction | Not needed for current bounded workload | Existing short conversation window retained; no native compaction or extra provider state |
| Structured outputs | Required for demo, not website | Existing strict Zod/JSON program schema retained; website remains plain text |
| Tool choice | No tools available in either route | No bookings, messages, transactions, company access, or claims of completed actions |
| Tool search / additional tools | Not applicable | No tool catalog |
| Parallel tool calls | Not applicable | No tool execution |
| Programmatic tool calling | Not applicable | No execution environment or programmatic tools |
| Model-aligned tool interfaces | Not applicable | No tool redesign requested |

## Guardrails and privacy

One shared identity source supplies the owner-approved sentence, deterministic identity answers, patent-detail limits, and surface-specific provider facts. Common identity/persona requests bypass the provider and preserve work. Completed model explanations are checked for common conflicting identities. This is defense in depth, not a claim that every possible prompt injection is solved. No patent document or number was supplied or verified.

Website messages accept only `user`/`assistant` roles and cannot include a demo program, provider/model override, or alternate surface. Both routes bound request/response sizes and time, reject cross-origin requests, keep provider errors private, and cancel aborted requests. Site chat has best-effort per-instance limits of 20 requests per visitor and 120 total per 15 minutes, plus three concurrent calls. This does not replace the previously recommended shared/edge rate limit.

The website response is checked before display. Reset cancels the pending request and prevents a late answer from returning. Only completed answers are persisted. Both browser storage access and malformed stored history are handled without crashing.

The privacy page now reflects OpenAI processing for these two surfaces and local chat/demo storage. Provider retention follows the account's applicable policies; no ZDR, compliance certification, or new database is implied.

## Sources and verification

- Repository baseline: PR #4 review commit `ecd68fa`; production still `c76c8b7` when this work began.
- [OpenAI Responses reference](https://developers.openai.com/api/reference/resources/responses/methods/create), consulted November 23, 2026: input roles/phases and request/output fields.
- [OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data), consulted November 23, 2026: response storage and other retention controls are distinct.
- The existing Anthropic SDK request path was inspected directly (`@anthropic-ai/sdk` 0.100.x); no claim that Anthropic lacks the requested product capabilities is made. The provider change follows the owner's preference to reuse GPT.

Validation at this checkpoint: 30/30 API/sample checks pass; final production build and TypeScript pass; both browser suites pass with a mocked provider. Website checks cover identity, history, errors, cancelled/late answers, payload isolation, independent resets, and controls contained at 1440/390/360 widths. Demo checks cover the five samples and all existing generation/edit/discovery/reset flows, plus identity in both modes. Fresh visual inspection caught and corrected a clipped mobile send button; the final screenshot and containment check pass on the restarted final build at localhost:3007. Fresh deployed-provider verification follows the commit; the PR description records that exact deployment and result.
