"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  FolderOpen,
  LayoutGrid,
  MapPin,
  Minus,
  Package,
  Plus,
  Save,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  demoSchema,
  initialDemo,
  money,
  parseDemoCommand,
  scenarios,
  STORAGE_KEY,
  type CalendarEvent,
  type DemoState,
  type Scenario,
} from "./demo-model";
import styles from "@/app/business-applications/page.module.css";
import { capabilityMessage, isCapabilityQuestion } from "./demo-catalog";
import builderStyles from "./generated-program.module.css";

type Message = { role: "user" | "assistant"; text: string };
type Filter = "all" | "overdue" | "low-stock" | "site-visits";
const icons = {
  acquisitions: MapPin,
  calendar: CalendarDays,
  inventory: Package,
};
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const stages = [
  "Sourcing",
  "Due diligence",
  "Offer ready",
  "Under contract",
] as const;

function Stat({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string | number;
  detail: string;
  accent?: boolean;
}) {
  return (
    <div className={styles.stat}>
      <span>{label}</span>
      <strong className={accent ? styles.statAccent : undefined}>
        {value}
      </strong>
      <small>{detail}</small>
    </div>
  );
}

export default function BusinessAppsDemo({ restoreSaved = true, onShowCapabilities }: { restoreSaved?: boolean; onShowCapabilities: () => void }) {
  const [state, setState] = useState<DemoState>(initialDemo);
  const [messages, setMessages] = useState<Message[]>([
    { role: "user", text: scenarios.acquisitions.prompt },
    { role: "assistant", text: scenarios.acquisitions.response },
  ]);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<"table" | "board">("table");
  const [notice, setNotice] = useState("Sample workspace ready");
  const [saved, setSaved] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [event, setEvent] = useState<CalendarEvent | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);
  const active = state.active;
  const scenario = scenarios[active];
  const ActiveIcon = icons[active];

  useEffect(() => {
    try {
      const raw = restoreSaved ? localStorage.getItem(STORAGE_KEY) : null;
      if (!raw) return;
      const result = demoSchema.safeParse(JSON.parse(raw));
      if (result.success) {
        setState(result.data);
        setMessages([
          {
            role: "assistant",
            text: "Your saved sample workspace is restored in this browser. Choose a prompt to keep exploring.",
          },
        ]);
        setSaved(true);
        setNotice("Restored from this browser");
      }
    } catch {
      /* Storage is optional; the demo also works without it. */
    }
  }, [restoreSaved]);

  useEffect(() => {
    if (hasInteracted.current && chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  function update(
    updater: (previous: DemoState) => DemoState,
    message: string,
  ) {
    setState(updater);
    setSaved(false);
    setNotice(message);
  }

  function chooseScenario(next: Scenario) {
    hasInteracted.current = true;
    update(
      (previous) => ({ ...previous, active: next }),
      `${scenarios[next].title} ready`,
    );
    setFilter("all");
    setQuery("");
    setInput("");
    setEvent(null);
    setFormOpen(false);
    setMessages([
      { role: "user", text: scenarios[next].prompt },
      { role: "assistant", text: scenarios[next].response },
    ]);
  }

  function send(text: string) {
    text = text.trim().slice(0, 500);
    if (!text) return;
    hasInteracted.current = true;
    setInput("");
    if (isCapabilityQuestion(text)) {
      setMessages(previous => [...previous.slice(-6), { role: "user", text }, { role: "assistant", text: capabilityMessage }]);
      onShowCapabilities();
      return;
    }
    const command = parseDemoCommand(text);
    let reply = "";
    if (command.kind === "scenario") {
      chooseScenario(command.scenario);
      setMessages([
        { role: "user", text },
        { role: "assistant", text: scenarios[command.scenario].response },
      ]);
      return;
    }
    if (command.kind === "approval") {
      update(
        (previous) => ({
          ...previous,
          active: "acquisitions",
          approvalThreshold: command.threshold,
        }),
        "Approval rule added to the demo",
      );
      setFilter("all");
      setQuery("");
      reply = `Added an approval indicator for asking prices above ${money(command.threshold)}. Matching properties are flagged in the workspace. In your production build, this rule can govern the offer approval workflow.`;
    } else if (command.kind === "filter") {
      const target =
        command.filter === "overdue"
          ? "acquisitions"
          : command.filter === "low-stock"
            ? "inventory"
            : command.filter === "site-visits"
              ? "calendar"
              : active;
      update(
        (previous) => ({ ...previous, active: target }),
        command.filter === "all"
          ? "All records shown"
          : "Workspace filter applied",
      );
      setFilter(command.filter);
      setQuery("");
      reply =
        command.filter === "all"
          ? "Showing all records in this workspace."
          : command.filter === "overdue"
            ? "Showing properties with overdue due diligence. Clear the filter to return to the full pipeline."
            : command.filter === "low-stock"
              ? "Showing items at or below their reorder point. Adjust quantities to see the indicators update."
              : "Showing site visits only. Select an event to see the details.";
    } else {
      reply =
        "This guided demo supports creating the three sample workspaces, filtering records, and adding approval thresholds. Try one of the suggested prompts below. Custom workflows are scoped with your project.";
    }
    setMessages((previous) => [
      ...previous.slice(-6),
      { role: "user", text },
      { role: "assistant", text: reply },
    ]);
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setSaved(true);
      setNotice("Saved in this browser. No company systems connected.");
    } catch {
      setSaved(false);
      setNotice(
        "Browser storage is unavailable. You can keep exploring without saving.",
      );
    }
  }

  const matchingProperties = state.properties.filter(
    (property) =>
      (filter !== "overdue" || property.overdue) &&
      `${property.name} ${property.location} ${property.owner}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const matchingItems = state.items.filter(
    (item) =>
      (filter !== "low-stock" || item.stock <= item.reorder) &&
      `${item.name} ${item.sku} ${item.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const matchingEvents = state.events.filter(
    (item) =>
      (filter !== "site-visits" || item.kind === "Site visit") &&
      `${item.name} ${item.owner} ${item.kind}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const lowStock = state.items.filter(
    (item) => item.stock <= item.reorder,
  ).length;
  const approvalCount =
    state.approvalThreshold === null
      ? 0
      : state.properties.filter(
          (property) => property.price > state.approvalThreshold!,
        ).length;
  const visibleCount =
    active === "acquisitions"
      ? matchingProperties.length
      : active === "inventory"
        ? matchingItems.length
        : matchingEvents.length;
  const totalCount =
    active === "acquisitions"
      ? state.properties.length
      : active === "inventory"
        ? state.items.length
        : state.events.length;

  function addRecord(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    if (!name) return;
    const id = crypto.randomUUID();
    let next: DemoState;
    if (active === "acquisitions") {
      next = {
        ...state,
        properties: [
          ...state.properties,
          {
            id,
            name,
            owner: String(data.get("owner")).trim(),
            location: String(data.get("location")).trim(),
            price: Number(data.get("price")),
            acres: Number(data.get("acres")),
            stage: "Sourcing",
            overdue: false,
          },
        ],
      };
    } else if (active === "inventory") {
      next = {
        ...state,
        items: [
          ...state.items,
          {
            id,
            name,
            sku: String(data.get("sku")).trim(),
            category: String(data.get("category")).trim(),
            stock: Number(data.get("stock")),
            reorder: Number(data.get("reorder")),
            price: Number(data.get("price")),
          },
        ],
      };
    } else {
      next = {
        ...state,
        events: [
          ...state.events,
          {
            id,
            name,
            owner: String(data.get("owner")).trim(),
            day: Number(data.get("day")),
            hour: Number(data.get("hour")),
            kind: data.get("kind") as CalendarEvent["kind"],
          },
        ],
      };
    }
    const result = demoSchema.safeParse(next);
    if (!result.success) {
      setNotice(
        "Check the fields. Each sample workspace supports up to 100 records.",
      );
      return;
    }
    update(
      () => result.data,
      `${name} added. Save to keep it in this browser.`,
    );
    setQuery("");
    setFilter("all");
    setFormOpen(false);
  }

  const formLabel =
    active === "acquisitions"
      ? "Add property"
      : active === "inventory"
        ? "Add item"
        : "Add event";

  return (
    <>
      <div className={styles.demoIntro}>
        <span>
          <span className={styles.liveDot} /> INTERACTIVE PRODUCT DEMO
        </span>
        <span>Choose a workflow. Make it yours.</span>
      </div>
      <div
        className={styles.scenarioSelector}
        aria-label="Choose a sample application"
      >
        {(Object.keys(scenarios) as Scenario[]).map((key) => {
          const Icon = icons[key];
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active === key}
              onClick={() => chooseScenario(key)}
            >
              <Icon size={17} />
              {scenarios[key].label}
              <ArrowUpRight size={14} />
            </button>
          );
        })}
      </div>
      <div className={styles.demoShell}>
        <div className={styles.windowBar}>
          <span className={styles.windowDots} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            <LockKeyholeSmall /> your-company / workspace
          </span>
          <span className={styles.sampleBadge}>Sample data</span>
        </div>
        <div className={styles.demoBody}>
          <aside className={styles.chatPanel} aria-label="ACI guided demo chat">
            <div className={styles.chatHeading}>
              <span className={styles.aciMark}>
                <Sparkles size={18} />
              </span>
              <div>
                <strong>ACI</strong>
                <span>Your workspace, in a conversation</span>
              </div>
              <span className={styles.chatStatus} />
            </div>
            <button type="button" className={builderStyles.guideButton} onClick={onShowCapabilities}><Sparkles size={16} /> What can we build?</button>
            <div
              className={styles.chatMessages}
              ref={chatRef}
              role="log"
              aria-label="Demo conversation"
              aria-live="polite"
              aria-relevant="additions text"
            >
              <p className={styles.chatDate}>LET’S BUILD SOMETHING USEFUL</p>
              {messages.map((message, index) => (
                <div
                  className={
                    message.role === "user"
                      ? styles.userMessage
                      : styles.assistantMessage
                  }
                  key={`${index}-${message.text}`}
                >
                  <span className={styles.messageAuthor}>
                    {message.role === "user" ? (
                      "YOU"
                    ) : (
                      <>
                        <Sparkles size={12} /> ACI DEMO
                      </>
                    )}
                  </span>
                  <p>{message.text}</p>
                  {message.role === "assistant" &&
                    index === messages.length - 1 && (
                      <a
                        href="#rendered-workspace"
                        className={styles.viewWorkspace}
                      >
                        View workspace <ArrowDown size={13} />
                      </a>
                    )}
                </div>
              ))}
            </div>
            <div className={styles.chatComposer}>
              <span className={styles.suggestionLabel}>TRY A FOLLOW-UP</span>
              <div className={styles.suggestions}>
                {scenario.suggestions.map((prompt) => (
                  <button key={prompt} onClick={() => send(prompt)}>
                    {prompt}
                    <Plus size={13} />
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className={styles.inputWrap}
              >
                <label className={styles.srOnly} htmlFor="aci-demo-prompt">
                  Describe a change to the demo
                </label>
                <input
                  id="aci-demo-prompt"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={500}
                  placeholder="Describe a change…"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  aria-label="Send demo request"
                  disabled={!input.trim()}
                >
                  <Send size={16} />
                </button>
              </form>
              <p className={styles.chatDisclaimer}>
                Guided prompts · sample data · no live AI connection
              </p>
            </div>
          </aside>

          <div id="rendered-workspace" className={styles.workspace}>
            <div className={styles.workspaceBreadcrumb}>
              <FolderOpen size={13} /> My applications{" "}
              <ChevronRight size={12} />
              <span>{scenario.label}</span>
              <span className={styles.previewLabel}>DEMO</span>
            </div>
            <div className={styles.workspaceHeading}>
              <div>
                <h3>
                  <ActiveIcon size={21} />
                  {scenario.title}
                </h3>
                <p>
                  {active === "acquisitions"
                    ? "Every opportunity. One clear path forward."
                    : active === "inventory"
                      ? "A clear picture of your stock, at a glance."
                      : "The right people, in the right place, on time."}
                </p>
              </div>
              <button
                className={styles.saveButton}
                onClick={save}
                title="Save sample data on this device"
              >
                {saved ? <Check size={14} /> : <Save size={14} />}
                {saved ? "Saved locally" : "Save demo"}
              </button>
            </div>
            <div className={styles.stats}>
              {active === "acquisitions" ? (
                <>
                  <Stat
                    label="Pipeline value"
                    value={money(
                      state.properties.reduce(
                        (sum, property) => sum + property.price,
                        0,
                      ),
                    )}
                    detail="Total asking prices"
                  />
                  <Stat
                    label="Active properties"
                    value={state.properties.length}
                    detail="Across the pipeline"
                  />
                  <Stat
                    label="Needs attention"
                    value={
                      state.properties.filter((property) => property.overdue)
                        .length
                    }
                    detail="Overdue due diligence"
                    accent
                  />
                </>
              ) : active === "inventory" ? (
                <>
                  <Stat
                    label="Inventory value"
                    value={money(
                      state.items.reduce(
                        (sum, item) => sum + item.price * item.stock,
                        0,
                      ),
                    )}
                    detail="At listed unit cost"
                  />
                  <Stat
                    label="Product lines"
                    value={state.items.length}
                    detail="In this workspace"
                  />
                  <Stat
                    label="Reorder needed"
                    value={lowStock}
                    detail="At or below reorder point"
                    accent
                  />
                </>
              ) : (
                <>
                  <Stat
                    label="This week"
                    value={state.events.length}
                    detail="Scheduled events"
                  />
                  <Stat
                    label="Site visits"
                    value={
                      state.events.filter((item) => item.kind === "Site visit")
                        .length
                    }
                    detail="Across your properties"
                  />
                  <Stat
                    label="Key deadlines"
                    value={
                      state.events.filter((item) => item.kind === "Deadline")
                        .length
                    }
                    detail="Keep the team on track"
                    accent
                  />
                </>
              )}
            </div>

            {active === "acquisitions" && state.approvalThreshold !== null && (
              <div className={styles.ruleBanner}>
                <ShieldCheck size={16} />
                <span>
                  Approval above{" "}
                  <strong>{money(state.approvalThreshold)}</strong>
                  <small>
                    {approvalCount} matching{" "}
                    {approvalCount === 1 ? "property" : "properties"} · demo
                    indicator
                  </small>
                </span>
                <button
                  aria-label="Remove approval rule"
                  onClick={() =>
                    update(
                      (previous) => ({ ...previous, approvalThreshold: null }),
                      "Approval rule removed",
                    )
                  }
                >
                  <X size={15} />
                </button>
              </div>
            )}

            <div className={styles.workspaceToolbar}>
              {active === "acquisitions" ? (
                <div
                  className={styles.viewSwitch}
                  aria-label="Acquisition view"
                >
                  <button
                    aria-pressed={view === "table"}
                    onClick={() => setView("table")}
                  >
                    <LayoutGrid size={13} />
                    Overview
                  </button>
                  <button
                    aria-pressed={view === "board"}
                    onClick={() => setView("board")}
                  >
                    Pipeline
                  </button>
                </div>
              ) : (
                <strong className={styles.viewTitle}>
                  {active === "calendar" ? "Nov 23–27, 2026" : "All products"}
                </strong>
              )}
              <div className={styles.toolbarActions}>
                <label className={styles.search}>
                  <Search size={14} />
                  <span className={styles.srOnly}>Search workspace</span>
                  <input
                    type="search"
                    placeholder="Search…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <Dialog.Root open={formOpen} onOpenChange={setFormOpen}>
                  <Dialog.Trigger asChild>
                    <button
                      className={styles.addButton}
                      disabled={totalCount >= 100}
                    >
                      <Plus size={14} />
                      {formLabel}
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className={styles.dialogOverlay} />
                    <Dialog.Content className={styles.dialogContent}>
                      <Dialog.Title className={styles.dialogTitle}>
                        {formLabel}
                      </Dialog.Title>
                      <Dialog.Description className={styles.dialogDescription}>
                        Use sample information. This demo stays in your browser.
                      </Dialog.Description>
                      <Dialog.Close
                        className={styles.dialogClose}
                        aria-label="Close form"
                      >
                        <X size={19} />
                      </Dialog.Close>
                      <form onSubmit={addRecord} className={styles.recordForm}>
                        <Field
                          label={
                            active === "acquisitions"
                              ? "Property name"
                              : active === "inventory"
                                ? "Item name"
                                : "Event name"
                          }
                          name="name"
                          placeholder={
                            active === "acquisitions"
                              ? "Pine Valley"
                              : active === "inventory"
                                ? "Measuring wheel"
                                : "Project check-in"
                          }
                        />
                        {active === "acquisitions" ? (
                          <>
                            <Field
                              label="Location"
                              name="location"
                              placeholder="County, state"
                            />
                            <Field
                              label="Assigned to"
                              name="owner"
                              placeholder="Team member"
                            />
                            <div className={styles.formColumns}>
                              <Field
                                label="Asking price ($)"
                                name="price"
                                type="number"
                              />
                              <Field label="Acres" name="acres" type="number" />
                            </div>
                          </>
                        ) : active === "inventory" ? (
                          <>
                            <div className={styles.formColumns}>
                              <Field
                                label="SKU"
                                name="sku"
                                placeholder="MW-001"
                              />
                              <Field
                                label="Category"
                                name="category"
                                placeholder="Equipment"
                              />
                            </div>
                            <div className={styles.formColumns}>
                              <Field
                                label="Quantity"
                                name="stock"
                                type="number"
                                step="1"
                              />
                              <Field
                                label="Reorder point"
                                name="reorder"
                                type="number"
                                step="1"
                              />
                            </div>
                            <Field
                              label="Unit cost ($)"
                              name="price"
                              type="number"
                            />
                          </>
                        ) : (
                          <>
                            <Field
                              label="Assigned to"
                              name="owner"
                              placeholder="Team member"
                            />
                            <div className={styles.formColumns}>
                              <div>
                                <label htmlFor="demo-event-day">Day</label>
                                <select id="demo-event-day" name="day">
                                  {days.map((day, index) => (
                                    <option key={day} value={index}>
                                      {day}, Nov {23 + index}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label htmlFor="demo-event-hour">Time</label>
                                <select id="demo-event-hour" name="hour">
                                  {Array.from({ length: 8 }, (_, index) => (
                                    <option value={9 + index} key={index}>
                                      {9 + index}:00
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div>
                              <label htmlFor="demo-event-kind">
                                Event type
                              </label>
                              <select id="demo-event-kind" name="kind">
                                <option>Meeting</option>
                                <option>Site visit</option>
                                <option>Deadline</option>
                              </select>
                            </div>
                          </>
                        )}
                        <button type="submit" className={styles.primaryButton}>
                          <Plus size={16} />
                          Add to sample workspace
                        </button>
                      </form>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
            </div>

            {filter !== "all" && (
              <div className={styles.activeFilter}>
                <span>
                  {filter === "overdue"
                    ? "Overdue due diligence"
                    : filter === "low-stock"
                      ? "Low stock"
                      : "Site visits only"}
                </span>
                <button
                  onClick={() => {
                    setFilter("all");
                    setNotice("Filter cleared");
                  }}
                  aria-label="Clear workspace filter"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            <div className={styles.workspaceContent}>
              {active === "acquisitions" && view === "table" && (
                <div className={styles.tableScroll}>
                  <table className={styles.dataTable}>
                    <caption className={styles.srOnly}>
                      Sample land acquisition properties
                    </caption>
                    <thead>
                      <tr>
                        <th>Property</th>
                        <th>Asking price</th>
                        <th>Stage</th>
                        <th>Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchingProperties.map((property) => (
                        <tr key={property.id}>
                          <td>
                            <div className={styles.propertyName}>
                              <span className={styles.propertyIcon}>
                                <MapPin size={16} />
                              </span>
                              <div>
                                <strong>{property.name}</strong>
                                <small>
                                  {property.acres} acres · {property.location}
                                </small>
                              </div>
                            </div>
                            {property.overdue && (
                              <span className={styles.overdue}>
                                Due diligence overdue
                              </span>
                            )}
                          </td>
                          <td>
                            <strong>{money(property.price)}</strong>
                            {state.approvalThreshold !== null &&
                              property.price > state.approvalThreshold && (
                                <span className={styles.approvalFlag}>
                                  <ShieldCheck size={11} />
                                  Approval flagged
                                </span>
                              )}
                          </td>
                          <td>
                            <label
                              className={styles.srOnly}
                              htmlFor={`stage-${property.id}`}
                            >
                              Stage for {property.name}
                            </label>
                            <select
                              id={`stage-${property.id}`}
                              value={property.stage}
                              className={styles.stageSelect}
                              onChange={(e) => {
                                const stage = e.target
                                  .value as typeof property.stage;
                                update(
                                  (previous) => ({
                                    ...previous,
                                    properties: previous.properties.map(
                                      (item) =>
                                        item.id === property.id
                                          ? {
                                              ...item,
                                              stage,
                                              overdue:
                                                stage === "Due diligence" &&
                                                item.overdue,
                                            }
                                          : item,
                                    ),
                                  }),
                                  `${property.name} moved to ${stage}`,
                                );
                              }}
                            >
                              {stages.map((stage) => (
                                <option key={stage}>{stage}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <span className={styles.ownerAvatar}>
                              {property.owner
                                .split(" ")
                                .map((part) => part[0])
                                .slice(0, 2)
                                .join("")}
                            </span>
                            <span className={styles.srOnly}>
                              {property.owner}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {active === "acquisitions" && view === "board" && (
                <div className={styles.pipeline}>
                  {stages.map((stage) => (
                    <div className={styles.pipelineColumn} key={stage}>
                      <h4>
                        {stage}
                        <span>
                          {
                            matchingProperties.filter(
                              (property) => property.stage === stage,
                            ).length
                          }
                        </span>
                      </h4>
                      {matchingProperties
                        .filter((property) => property.stage === stage)
                        .map((property) => (
                          <div
                            className={styles.pipelineCard}
                            key={property.id}
                          >
                            <MapPin size={14} />
                            <strong>{property.name}</strong>
                            <small>{property.acres} acres</small>
                            <span>{money(property.price)}</span>
                            {property.overdue && (
                              <small className={styles.overdue}>
                                Due diligence overdue
                              </small>
                            )}
                            {state.approvalThreshold !== null &&
                              property.price > state.approvalThreshold && (
                                <small className={styles.approvalFlag}>
                                  Approval flagged
                                </small>
                              )}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              )}

              {active === "inventory" && (
                <div className={styles.tableScroll}>
                  <table className={styles.dataTable}>
                    <caption className={styles.srOnly}>
                      Sample inventory products
                    </caption>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>In stock</th>
                        <th>Reorder at</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchingItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className={styles.propertyName}>
                              <span className={styles.propertyIcon}>
                                <Package size={16} />
                              </span>
                              <div>
                                <strong>{item.name}</strong>
                                <small>
                                  {item.sku} · {item.category}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className={styles.quantity}>
                              <button
                                aria-label={`Decrease ${item.name} stock`}
                                disabled={item.stock === 0}
                                onClick={() =>
                                  update(
                                    (previous) => ({
                                      ...previous,
                                      items: previous.items.map((row) =>
                                        row.id === item.id
                                          ? { ...row, stock: row.stock - 1 }
                                          : row,
                                      ),
                                    }),
                                    `${item.name} stock updated`,
                                  )
                                }
                              >
                                <Minus size={12} />
                              </button>
                              <span>{item.stock}</span>
                              <button
                                aria-label={`Increase ${item.name} stock`}
                                disabled={item.stock >= 1_000_000_000}
                                onClick={() =>
                                  update(
                                    (previous) => ({
                                      ...previous,
                                      items: previous.items.map((row) =>
                                        row.id === item.id
                                          ? { ...row, stock: row.stock + 1 }
                                          : row,
                                      ),
                                    }),
                                    `${item.name} stock updated`,
                                  )
                                }
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </td>
                          <td>{item.reorder}</td>
                          <td>
                            <span
                              className={
                                item.stock <= item.reorder
                                  ? styles.warningBadge
                                  : styles.goodBadge
                              }
                            >
                              {item.stock <= item.reorder
                                ? "Reorder"
                                : "In stock"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {active === "calendar" && (
                <div className={styles.calendarScroll}>
                  <div
                    className={styles.calendarGrid}
                    aria-label="Sample company calendar, November 23 to 27, 2026"
                  >
                    <div className={styles.calendarCorner}>TIME</div>
                    {days.map((day, index) => (
                      <div className={styles.calendarDay} key={day}>
                        {day}
                        <strong>{23 + index}</strong>
                      </div>
                    ))}
                    {Array.from({ length: 8 }, (_, index) => (
                      <CalendarRow
                        key={index}
                        hour={9 + index}
                        events={matchingEvents}
                        onSelect={setEvent}
                      />
                    ))}
                  </div>
                </div>
              )}
              {visibleCount === 0 && (
                <div className={styles.emptyState}>
                  <Search size={22} />
                  <strong>No matching records</strong>
                  <p>Try another search or clear the filter.</p>
                  <button
                    onClick={() => {
                      setQuery("");
                      setFilter("all");
                    }}
                  >
                    Show all records
                  </button>
                </div>
              )}
            </div>
            <div className={styles.workspaceBottom}>
              <span>
                {visibleCount} of {totalCount}{" "}
                {active === "acquisitions"
                  ? "properties"
                  : active === "inventory"
                    ? "products"
                    : "events"}
              </span>
              <span>
                <span className={styles.liveDot} />
                Interactive sample workspace
              </span>
            </div>
          </div>
        </div>
        <div className={styles.demoStatus}>
          <span role="status">
            <Check size={14} />
            {notice}
          </span>
        </div>
      </div>
      <p className={styles.demoCaption}>
        <CircleHelp size={14} />
        Explore with sample information. Saving keeps this demo on your device;
        team accounts and live integrations are part of a scoped build.
      </p>

      <Dialog.Root
        open={event !== null}
        onOpenChange={(open) => {
          if (!open) setEvent(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className={styles.dialogOverlay} />
          <Dialog.Content className={styles.dialogContent}>
            <Dialog.Title className={styles.dialogTitle}>
              {event?.name}
            </Dialog.Title>
            <Dialog.Description className={styles.dialogDescription}>
              Sample calendar event · November 2026
            </Dialog.Description>
            <Dialog.Close
              className={styles.dialogClose}
              aria-label="Close event details"
            >
              <X size={19} />
            </Dialog.Close>
            {event && (
              <dl className={styles.eventDetails}>
                <dt>When</dt>
                <dd>
                  {days[event.day]}, November {23 + event.day} at {event.hour}
                  :00
                </dd>
                <dt>Assigned to</dt>
                <dd>{event.owner}</dd>
                <dt>Type</dt>
                <dd>{event.kind}</dd>
              </dl>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  step = "0.01",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  step?: string;
}) {
  return (
    <label>
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        maxLength={120}
        min={type === "number" ? 0 : undefined}
        max={type === "number" ? 1_000_000_000 : undefined}
        step={type === "number" ? step : undefined}
      />
    </label>
  );
}

function CalendarRow({
  hour,
  events,
  onSelect,
}: {
  hour: number;
  events: CalendarEvent[];
  onSelect: (event: CalendarEvent) => void;
}) {
  const cells: ReactNode[] = [
    <div className={styles.calendarTime} key="time">
      {hour > 12 ? hour - 12 : hour}
      {hour >= 12 ? "p" : "a"}
    </div>,
  ];
  for (let day = 0; day < 5; day++)
    cells.push(
      <div className={styles.calendarCell} key={day}>
        {events
          .filter((event) => event.day === day && event.hour === hour)
          .map((event) => (
            <button
              key={event.id}
              className={
                event.kind === "Site visit"
                  ? styles.visitEvent
                  : event.kind === "Deadline"
                    ? styles.deadlineEvent
                    : styles.meetingEvent
              }
              onClick={() => onSelect(event)}
            >
              <strong>{event.name}</strong>
              <span>{event.owner}</span>
            </button>
          ))}
      </div>,
    );
  return <>{cells}</>;
}

function LockKeyholeSmall() {
  return <ShieldCheck size={12} aria-hidden="true" />;
}
