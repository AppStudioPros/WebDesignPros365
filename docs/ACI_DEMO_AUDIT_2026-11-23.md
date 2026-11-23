# ACI Business Ops demo review

Reviewed November 23, 2026. Baseline: production commit `c76c8b70c91a56d045331ca74a1176a6fb1355ba`. The improvements described below are on `codex/aci-demo-discovery`; they are not a claim that production has changed.

## Recommendation

Keep the conversational builder and make the first experience concrete: five immediately usable sample apps, an obvious reset, and a capability guide that distinguishes a browser preview from an operational deployment. Preserve the acquisition example as a specialty. No additional plugin or package is required for this revision.

“Top five” here is an editorial selection for the overlap between corporate and municipal management, not a survey ranking or a claim that every organization needs the same stack. A finance director, HR lead, or permitting department will have different priorities.

| Core app | Corporate use | City-manager use | What this demo actually does |
|---|---|---|---|
| Projects & tasks | Initiatives, ownership, deadlines | Capital projects, department action items | Editable tasks and a status board |
| Budgets & purchasing | Requests, planned spending, vendor quotes | Department purchasing and review queues | Tracks amounts and review status; no ledger, calculated variance, payment, or enforced approval |
| Service requests | IT and facility support | Resident requests and public works follow-up | Tracks sample requests, teams, priority, and resolution status; no dispatch or citizen submission |
| Assets & inventory | Equipment, supplies, stock | Fleet, facilities, public works assets | Editable quantities, condition, locations, reorder points; no automatic replenishment |
| Calendars & meetings | Coordination and deadlines | Inspections and department scheduling | Dated agenda with manually editable events; no sync, invitations, or conflict detection |

This selection draws on [ICMA’s management practices](https://icma.org/page/practices-effective-local-government-management-and-leadership), especially planning, service delivery, staff effectiveness, and financial management; [GFOA budget monitoring](https://www.gfoa.org/materials/budget-monitoring); [GFOA capital asset management](https://www.gfoa.org/materials/capital-asset-management); and [Microsoft’s description of work management](https://www.microsoft.com/en-us/microsoft-365/planner/work-management). Those sources support the workflow categories, not this exact five-app ranking. HR, document management, and executive reporting remain important candidates for a client-specific build.

## Fresh live evidence

The audit used the actual public page at https://www.webdesignpros365.com/business-applications, current repository source, and a read-only Vercel firewall query. Screenshots were captured during this review and saved under `/workspace/shared/business-applications/audit-2026-11-23/`.

1. **Entry — useful foundation, narrow discovery.** `01-entry.jpg` shows a clean chat/workspace split, clear editable-preview language, and three starter prompts. It does not offer five management categories or a capability entry point.
2. **Capability question — needs correction.** In a verified empty workspace, the real GPT-backed public demo answered “What can we build? List what works in this demo versus what needs a custom production build.” by generating a four-row capability table. `02-capabilities-response.jpg` captures that result and the small bottom reset. The content was reasonably bounded, but it became the workspace. Source inspection confirms any returned program replaces the current program; a capability question can therefore overwrite someone’s current work. We did not test overwriting another user’s data.
3. **Guided entry — functional, scope clearly labeled.** `03-guided-samples.jpg` shows three guided examples and an already populated acquisition workspace. The DOM explicitly identifies this mode as guided prompts with no live AI connection. The initial screenshot includes the mode transition; it is not evidence of the final selected-button styling.
4. **Guided workspace — useful interaction, readability needs work.** `04-workspace-and-reset.jpg` shows the acquisition table, KPI examples, follow-up prompts, editable stages, and local save. The reset is below this viewport; this image does not show or verify reset activation.

An attempted switch out of the generated capability table was stopped by automatic approval review because of possible unsaved-state loss. That table was preserved; guided inspection continued in a separate empty tab. The original mode-loss finding is based on the conditional unmount in source, not a claimed completed destructive browser test.

## Priority findings and implemented response

| Finding | Evidence | Revision |
|---|---|---|
| Capability help can become a new workspace | Live question plus assignment in `GeneratedProgramDemo` | Curated guide, explicit button, local conversational intent handling, and a server guard returning `program: null` without an OpenAI call |
| Only three first-run examples | Live entry and starter definitions | Five core samples plus acquisitions; each opens immediately with clearly identified prepared fictional data |
| Reset is small and hard to find | Live DOM: approximately 87 × 15 CSS px, 10px text, bottom status bar | One top-level reset, at least 46px tall, covering both modes; confirmation explains what is cleared and provides a cancel action |
| Switching modes unmounts unsaved work | `BusinessAppsExperience` source | Preserve both mode instances; an explicit reset clears their state and both browser-storage keys |
| Important text has low contrast | Live reset colors calculate to 3.72:1; disclosure to 3.81:1 | Reset colors calculate to 13.76:1; disclosure to 5.98:1, with larger text; table headings and sample descriptions also strengthened |
| Samples consume AI calls before customization | Existing starter sends to API; six requests per visitor/window | Prepared samples and discovery use no AI calls; custom generation and changes still use GPT |
| Relative-date context is missing | Server instructions | Supply current UTC date for new generated schedules; prepared sample dates are relative to opening time |

The capability guide contains six prepared samples, 25 additional record-tracker ideas grouped by business development, operations, administration, people, and city/community work, and seven production feature groups. It states the 10-field/20-record limit and distinguishes tracking an approval status from enforcing authorization.

The existing accepted hero and top navigation are preserved. The existing guided workflows and unrelated Anthropic assistant are retained. No private ACI engine functionality is exposed.

## Why these interaction choices

[Microsoft’s human–AI interaction guidelines](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/) emphasize communicating capability, handling errors, and helping people control AI behavior. A maintained catalog is more dependable for product claims than asking the model to invent a menu. [Nielsen Norman Group’s usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) support visible actions, user control, and recovery. These principles motivate sample choices, a clear reset, preservation of work, and an honest distinction between previews and integrations.

The parallel mechanism is a payment sandbox: [Stripe describes isolated test environments](https://support.stripe.com/questions/how-do-i-test-my-integration-when-test-mode-isnt-available?locale=en-GB) that let people learn without moving real money. The shared principle is safe, repeatable exploration. ACI’s browser-only samples are much narrower than a payment-provider sandbox: they do not simulate a complete accounting, procurement, or municipal system. The cheapest falsifying checks are opening all samples without provider calls, editing them, switching modes without data loss, cancelling reset, and resetting to a predictable baseline. These flows are covered by the revised tests; no conversion-rate improvement is claimed without user measurement.

## Plugins and production integrations

- **This demo revision:** existing React, Radix Dialog, Zod, GPT endpoint, and browser storage suffice. No new plugin, dependency, account, or subscription was added.
- **Calendar connections:** Microsoft 365 or Google integration is relevant only when a real client wants synchronization or invitations. Installing a tool in this Codex conversation does not connect website visitors’ accounts.
- **Operational deployment:** select authentication, organization-scoped shared storage, role enforcement, audit history, backups, retention, and integrations based on the client’s actual workflow. A database plugin by itself does not implement these controls.
- **Public AI usage:** Vercel’s active firewall query returned `configured: false`, with its default firewall applying. The code’s limits are per server instance, not a deployment-wide spending cap. Evaluate a narrowly scoped `/api/business-apps` edge rate rule or shared limiter before a larger promotion. [Vercel documents WAF rate limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting). Plan eligibility and usage pricing require review; this audit made no firewall or billing changes. Distributed limits can reduce abuse but do not alone guarantee an absolute provider spending cap.

## Accessibility and evidence limits

The measured reset and disclosure contrast were below the usual 4.5:1 target for ordinary text. The 15px reset height is also a usability concern, but a definitive WCAG 2.2 target-size failure requires checking the spacing exceptions. [W3C explains the 24px minimum and its exceptions](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum); 44px is a useful stronger target for these prominent actions.

For actual municipal deployments, accessibility needs to be part of delivery acceptance. [Current DOJ guidance](https://www.ada.gov/resources/web-rule-first-steps/) identifies WCAG 2.1 AA under the Title II web rule and describes the applicable extended compliance dates. This public commercial demo audit is not a finding of legal compliance for a city deployment. Screenshots, a few contrast measurements, and automated browser checks do not establish full accessibility conformance. Screen-reader testing, a full contrast audit, real-device checks, and client-specific records/security requirements remain separate work.

## Verification

- API and sample suite: **17/17 PASS**. Includes provider boundaries, schema validation, limits, timeouts, help preserving the current program and generation quota, and valid data for all six samples.
- Production build and TypeScript: **PASS**, including the final catalog width and guided-discovery refinements.
- Browser interaction suite with a mocked provider: **PASS** on the final revision. Covers five samples, help without provider calls from either mode, manual edits, mode preservation, sample replacement cancellation, reset cancellation and both saved modes, generation/follow-up/errors, and widths 1440/1024/768/390/360.
- Live GPT observation on the production baseline: the capability-table behavior above was observed during this audit. This does not establish a new production deployment.
- Fresh visual inspection of the local revision found and corrected a catalog-width cascade issue. Local AI is unconfigured; prepared samples and discovery remain usable there.

See `ACI_BUSINESS_OPS_HANDOFF.md` for the final revision and release state. The screenshot report in the shared audit directory keeps the evidence images alongside these findings.
