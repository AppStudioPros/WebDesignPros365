const assert = require("node:assert/strict");
const { test } = require("node:test");
const { createBusinessAppsHandlers } = require(process.env.BUSINESS_APPS_TEST_MODULE);

const program = {
  title: "Acquisition pipeline", description: "Fictional sample opportunities", view: "board",
  fields: [{ id: "name", label: "Property", type: "text", options: [] }, { id: "stage", label: "Stage", type: "select", options: ["Sourcing", "Offer"] }],
  records: [{ id: "p1", values: ["Cedar Ridge", "Sourcing"] }],
};
const answer = { message: "Your sample pipeline is ready.", program };
function provider(body = answer) {
  return Response.json({ status: "completed", output: [{ type: "message", role: "assistant", content: [{ type: "output_text", text: JSON.stringify(body) }] }] });
}
function setup(overrides = {}) {
  const calls = [];
  const handlers = createBusinessAppsHandlers({ getKey: () => "test-credential-not-real", getModel: () => undefined, now: () => 1_000,
    fetch: async (...args) => { calls.push(args); return provider(); }, ...overrides });
  return { ...handlers, calls };
}
function request(body = { prompt: "Build a land acquisition pipeline", current: null }, headers = {}) {
  return new Request("https://www.webdesignpros365.com/api/business-apps", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://www.webdesignpros365.com", ...headers }, body: JSON.stringify(body) });
}

test("generation uses server credentials and validates structured data", async () => {
  const api = setup();
  const response = await api.POST(request());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), answer);
  assert.equal(api.calls[0][0], "https://api.openai.com/v1/responses");
  const payload = JSON.parse(api.calls[0][1].body);
  assert.equal(payload.model, "gpt-6.2-sol");
  assert.equal(payload.store, false);
  assert.equal(payload.max_output_tokens, 4000);
  assert.equal(payload.text.format.strict, true);
  assert.equal(payload.text.format.schema.additionalProperties, false);
});

test("follow-up sends current manual edits and accepts a schema change", async () => {
  const edited = structuredClone(program);
  edited.records[0].values[0] = "Manually renamed property";
  const next = structuredClone(edited);
  next.fields.push({ id: "owner", label: "Owner", type: "text", options: [] });
  next.records[0].values.push("");
  let sent;
  const api = setup({ fetch: async (_, init) => { sent = JSON.parse(init.body); return provider({ message: "Added owner.", program: next }); } });
  const response = await api.POST(request({ prompt: "Add an owner field", current: edited }));
  assert.equal(response.status, 200);
  assert.deepEqual(JSON.parse(sent.input).current, edited);
  assert.deepEqual((await response.json()).program, next);
});

test("missing configuration is explicit and does not call the provider", async () => {
  const api = setup({ getKey: () => undefined });
  assert.deepEqual(await api.GET().json(), { available: false });
  assert.equal((await api.POST(request())).status, 503);
  assert.equal(api.calls.length, 0);
});

test("a renamed Anthropic credential is never sent to OpenAI", async () => {
  const api = setup({ getKey: () => "  sk-ant-fixture-not-a-real-key  " });
  assert.deepEqual(await api.GET().json(), { available: false });
  const response = await api.POST(request());
  assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /sk-ant-|fixture/);
  assert.equal(api.calls.length, 0);
});

test("untrusted origin, content type, malformed JSON, unknown properties and oversized bodies are rejected", async () => {
  const api = setup();
  assert.equal((await api.POST(request(undefined, { Origin: "https://attacker.example" }))).status, 403);
  assert.equal((await api.POST(request(undefined, { "Sec-Fetch-Site": "cross-site" }))).status, 403);
  assert.equal((await api.POST(request(undefined, { "Content-Type": "text/plain" }))).status, 415);
  assert.equal((await api.POST(request({ prompt: "Build", current: null, model: "other-model" }))).status, 400);
  assert.equal((await api.POST(new Request("https://www.webdesignpros365.com/api/business-apps", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" }))).status, 400);
  assert.equal((await api.POST(request({ prompt: "x".repeat(50_000), current: null }))).status, 413);
  assert.equal(api.calls.length, 0);
});

test("streaming body limit works without a Content-Length header", async () => {
  const body = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(30_000)); controller.enqueue(new Uint8Array(30_000)); controller.close(); } });
  const req = new Request("https://www.webdesignpros365.com/api/business-apps", { method: "POST", headers: { "Content-Type": "application/json" }, body, duplex: "half" });
  const api = setup();
  assert.equal((await api.POST(req)).status, 413);
  assert.equal(api.calls.length, 0);
});

test("invalid provider programs and incomplete output never replace the workspace", async () => {
  const invalid = structuredClone(answer);
  invalid.program.records[0].values[1] = "Missing option";
  for (const fetch of [
    async () => provider(invalid),
    async () => Response.json({ status: "incomplete", output: [] }),
    async () => Response.json({ status: "completed", output: [{ type: "message", role: "assistant", content: [{ type: "output_text", text: "not JSON" }] }] }),
    async () => new Response("x".repeat(140_000)),
  ]) {
    const response = await setup({ fetch }).POST(request());
    assert.equal(response.status, 502);
    assert.equal((await response.json()).program, undefined);
  }
});

test("duplicate fields and impossible dates are rejected before rendering", async () => {
  const duplicate = structuredClone(answer);
  duplicate.program.fields[1].id = duplicate.program.fields[0].id;
  const impossibleDate = structuredClone(answer);
  impossibleDate.program.fields[1] = { id: "closing", label: "Closing date", type: "date", options: [] };
  impossibleDate.program.view = "calendar";
  impossibleDate.program.records[0].values[1] = "2026-02-30";
  for (const body of [duplicate, impossibleDate]) {
    const response = await setup({ fetch: async () => provider(body) }).POST(request());
    assert.equal(response.status, 502);
    assert.equal((await response.json()).program, undefined);
  }
});

test("provider failures do not disclose response contents", async () => {
  const api = setup({ fetch: async () => new Response("secret provider details and a credential", { status: 401 }) });
  const response = await api.POST(request());
  assert.equal(response.status, 502);
  assert.doesNotMatch(await response.text(), /secret|credential/);
  const capacity = await setup({ fetch: async () => new Response("provider billing details", { status: 429 }) }).POST(request());
  assert.equal(capacity.status, 503);
  assert.equal(capacity.headers.get("retry-after"), "60");
});

test("provider refusal is a message without a new program", async () => {
  const api = setup({ fetch: async () => Response.json({ status: "completed", output: [{ type: "message", role: "assistant", content: [{ type: "refusal", refusal: "Upstream text" }] }] }) });
  const response = await api.POST(request());
  assert.equal(response.status, 200);
  const value = await response.json();
  assert.equal(value.program, null);
  assert.doesNotMatch(value.message, /Upstream/);
});

test("timed out generation aborts provider request and returns a safe error", async () => {
  let aborted = false;
  const api = setup({ timeoutMs: 5, fetch: async (_, { signal }) => new Promise((resolve, reject) => signal.addEventListener("abort", () => { aborted = true; reject(new Error("secret detail")); }, { once: true })) });
  const response = await api.POST(request());
  assert.equal(response.status, 504);
  assert.equal(aborted, true);
  assert.doesNotMatch(await response.text(), /secret/);
});

test("per-visitor limit rejects a burst and expires with the window", async () => {
  let now = 1_000;
  const api = setup({ now: () => now });
  for (let i = 0; i < 6; i++) assert.equal((await api.POST(request())).status, 200);
  const response = await api.POST(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "900");
  assert.equal(api.calls.length, 6);
  now += 15 * 60 * 1000;
  assert.equal((await api.POST(request())).status, 200);
});

test("global instance limit also bounds distinct visitor bursts", async () => {
  const api = setup();
  for (let i = 0; i < 60; i++) assert.equal((await api.POST(request(undefined, { "x-forwarded-for": `192.0.2.${i}` }))).status, 200);
  assert.equal((await api.POST(request(undefined, { "x-forwarded-for": "192.0.2.100" }))).status, 429);
  assert.equal(api.calls.length, 60);
});
