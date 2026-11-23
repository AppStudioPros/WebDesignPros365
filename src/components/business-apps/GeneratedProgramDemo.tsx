"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowDown, ArrowUpRight, CalendarDays, Check, ChevronRight, Columns3,
  FolderOpen, Info, LoaderCircle, Pencil, Plus,
  Save, Send, Sparkles, Table2, Trash2, X,
} from "lucide-react";
import {
  PROGRAM_STORAGE_KEY, programResponseSchema, programSchema,
  type GeneratedProgram,
} from "./program-model";
import CapabilityGuide from "./CapabilityGuide";
import { acquisitionApp, capabilityMessage, coreApps, isCapabilityQuestion, starterProgram, type StarterId } from "./demo-catalog";
import { ACI_IDENTITY, identityReply } from "../../lib/aci-identity";
import styles from "./generated-program.module.css";

type Message = { role: "user" | "assistant"; text: string };
type Editor = { id: string | null; values: string[] };
const welcome: Message = {
  role: "assistant",
  text: `${ACI_IDENTITY} Describe a business tool for an editable preview, open a prepared sample, or ask ‘What can we build?’`,
};

function recordName(program: GeneratedProgram, values: string[], index: number) {
  const nameIndex = program.fields.findIndex((field) => field.type === "text");
  return values[nameIndex] || values.find(Boolean) || `Record ${index + 1}`;
}

function displayValue(value: string, type: GeneratedProgram["fields"][number]["type"]) {
  if (!value) return "—";
  if (type === "currency") return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(Number(value));
  if (type === "number") return new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 }).format(Number(value));
  if (type === "date") return new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  return value;
}

export default function GeneratedProgramDemo({ onShowGuided, restoreSaved = true, guideOpen, onGuideOpenChange: setGuideOpen }: {
  onShowGuided: () => void; restoreSaved?: boolean; guideOpen: boolean; onGuideOpenChange: (open: boolean) => void;
}) {
  const [program, setProgram] = useState<GeneratedProgram | null>(null);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [availability, setAvailability] = useState<"checking" | "available" | "unavailable">("checking");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("Start with a sample prompt or describe your own workflow.");
  const [saved, setSaved] = useState(false);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [editorError, setEditorError] = useState("");
  const [pendingStarter, setPendingStarter] = useState<StarterId | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const versionRef = useRef(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const editorTriggerRef = useRef<HTMLElement | null>(null);
  const addRecordRef = useRef<HTMLButtonElement>(null);
  const guideTriggerRef = useRef<HTMLButtonElement>(null);
  const interacted = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/business-apps", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!controller.signal.aborted) setAvailability(response.ok && data.available === true ? "available" : "unavailable");
      })
      .catch(() => { if (!controller.signal.aborted) setAvailability("unavailable"); });
    try {
      const raw = restoreSaved ? localStorage.getItem(PROGRAM_STORAGE_KEY) : null;
      if (raw) {
        const result = programSchema.safeParse(JSON.parse(raw));
        if (result.success) {
          setProgram(result.data);
          setSaved(true);
          setNotice("Restored your saved preview from this browser.");
          setMessages([{ role: "assistant", text: "Your saved preview is ready. Describe a change to its fields, records, or layout to keep building." }]);
        }
      }
    } catch { /* Local storage is optional. */ }
    return () => {
      controller.abort();
      versionRef.current += 1;
      requestRef.current?.abort();
      requestRef.current = null;
    };
  }, [restoreSaved]);

  useEffect(() => {
    if (interacted.current && chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, busy]);

  async function send(prompt: string) {
    prompt = prompt.trim();
    if (!prompt || prompt.length > 1200 || requestRef.current) return;
    const identity = identityReply(prompt);
    if (identity) {
      interacted.current = true;
      setMessages(previous => [...previous.slice(-10), { role: "user", text: prompt }, { role: "assistant", text: identity }]);
      setInput("");
      setError("");
      return;
    }
    if (isCapabilityQuestion(prompt)) { showCapabilities(prompt, true); return; }
    if (availability !== "available") return;
    const controller = new AbortController();
    requestRef.current = controller;
    const version = ++versionRef.current;
    interacted.current = true;
    setBusy(true);
    setError("");
    setInput("");
    setEditor(null);
    setMessages((previous) => [...previous.slice(-10), { role: "user", text: prompt }]);
    try {
      const response = await fetch("/api/business-apps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, current: program }),
        signal: controller.signal,
      });
      const data: unknown = await response.json();
      if (controller.signal.aborted || version !== versionRef.current) return;
      if (!response.ok) {
        const message = data && typeof data === "object" && "error" in data && typeof data.error === "string"
          ? data.error.slice(0, 300) : "AI generation is unavailable right now. Please try again shortly.";
        throw new Error(message);
      }
      const result = programResponseSchema.safeParse(data);
      if (!result.success) throw new Error("That preview could not be loaded. Please try a simpler request.");
      setMessages((previous) => [...previous.slice(-11), { role: "assistant", text: result.data.message }]);
      if (result.data.program) {
        setProgram(result.data.program);
        setSaved(false);
        setNotice("Your preview is ready. Edit its records or ask for another change.");
      }
    } catch (failure) {
      if (controller.signal.aborted || version !== versionRef.current) return;
      setError(failure instanceof Error ? failure.message : "Something went wrong. Please try again.");
      setInput(prompt);
      setNotice("Your existing preview has been kept.");
    } finally {
      if (version === versionRef.current) {
        requestRef.current = null;
        setBusy(false);
      }
    }
  }

  function showCapabilities(prompt = "What can we build?", clearInput = false) {
    interacted.current = true;
    setMessages(previous => [...previous.slice(-10), { role: "user", text: prompt }, { role: "assistant", text: capabilityMessage }]);
    if (clearInput) setInput("");
    setGuideOpen(true);
  }

  function loadSample(id: StarterId) {
    if (requestRef.current) return;
    const sample = programSchema.parse(starterProgram(id));
    setProgram(sample);
    setSaved(false);
    setInput("");
    setError("");
    setEditor(null);
    setPendingStarter(null);
    setNotice("Prepared sample loaded. Edit the records or ask AI to customize it.");
    setMessages([{ role: "assistant", text: `Opened the prepared ${sample.title.toLowerCase()} sample. No AI request was used to load it. Edit a record, try another view, or ask me to change its fields and layout.` }]);
  }

  function chooseSample(id: StarterId) {
    if (requestRef.current) return;
    setGuideOpen(false);
    if (program) setPendingStarter(id);
    else loadSample(id);
  }

  function change(next: GeneratedProgram, message: string) {
    const result = programSchema.safeParse(next);
    if (!result.success) return false;
    setProgram(result.data);
    setSaved(false);
    setNotice(message);
    return true;
  }

  function save() {
    if (!program) return;
    try {
      localStorage.setItem(PROGRAM_STORAGE_KEY, JSON.stringify(program));
      setSaved(true);
      setNotice("Saved on this device. No company systems are connected.");
    } catch {
      setSaved(false);
      setNotice("Browser storage is unavailable. You can keep using your preview without saving.");
    }
  }

  function openEditor(id: string | null, values?: string[]) {
    if (!program || busy) return;
    editorTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setEditorError("");
    setEditor({ id, values: values ? [...values] : program.fields.map(() => "") });
  }

  function saveRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!program || !editor || busy) return;
    const record = { id: editor.id ?? `r_${crypto.randomUUID().replaceAll("-", "").slice(0, 24)}`, values: editor.values.map((value) => value.trim()) };
    const records = editor.id ? program.records.map((item) => item.id === editor.id ? record : item) : [...program.records, record];
    if (!change({ ...program, records }, editor.id ? "Record updated. Save to keep your changes on this device." : "Record added. Save to keep your changes on this device.")) {
      setEditorError("Check your dates and numbers. This preview supports up to 20 records.");
      return;
    }
    setEditor(null);
  }

  const selectIndex = program?.fields.findIndex((field) => field.type === "select") ?? -1;
  const dateIndex = program?.fields.findIndex((field) => field.type === "date") ?? -1;
  const ready = availability === "available" && !busy;

  function renderCard(record: GeneratedProgram["records"][number], index: number) {
    if (!program) return null;
    return (
      <button type="button" className={styles.recordCard} key={record.id} disabled={busy} onClick={() => openEditor(record.id, record.values)} aria-label={`Edit ${recordName(program, record.values, index)}`}>
        <strong>{recordName(program, record.values, index)} <Pencil size={12} /></strong>
        <dl>{program.fields.map((field, fieldIndex) => (
          <div key={field.id}><dt>{field.label}</dt><dd>{displayValue(record.values[fieldIndex], field.type)}</dd></div>
        ))}</dl>
      </button>
    );
  }

  return (
    <>
      <div className={styles.shell}>
        <div className={styles.windowBar}>
          <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
          <span>your-company / workspace</span>
          <span className={styles.badge}>Interactive preview · sample data</span>
        </div>
        <div className={styles.body}>
          <aside className={styles.chat} aria-label="ACI AI builder chat">
            <div className={styles.chatHeading}>
              <span className={styles.mark}><Sparkles size={20} /></span>
              <div><strong>ACI Business Ops</strong><span>Lucid Tech Labs LLC</span></div>
            </div>
            <button type="button" ref={guideTriggerRef} className={styles.guideButton} onClick={() => showCapabilities()}><Sparkles size={16} /> What can we build?</button>
            <div className={styles.messages} role="log" aria-live="polite" aria-relevant="additions text" aria-label="AI builder conversation" ref={chatRef}>
              <p className={styles.eyebrow}>YOUR NEXT TOOL STARTS HERE</p>
              {messages.map((message, index) => (
                <div key={index} className={message.role === "user" ? styles.userMessage : styles.assistantMessage}>
                  <span>{message.role === "user" ? "YOU" : "ACI · AI BUILDER"}</span>
                  <p>{message.text}</p>
                  {message.role === "assistant" && index === messages.length - 1 && program && <a href="#generated-workspace">View workspace <ArrowDown size={12} /></a>}
                </div>
              ))}
              {busy && <div className={styles.thinking} role="status"><LoaderCircle size={15} className={styles.spin} /> Shaping your workspace…</div>}
            </div>
            <div className={styles.composer}>
              {availability === "checking" && <p className={styles.connectionNote}>Checking AI availability…</p>}
              {availability === "unavailable" && <div className={styles.unavailable} role="status"><p>The AI builder is temporarily unavailable. You can still explore the interactive samples.</p><button type="button" onClick={onShowGuided}>Explore guided samples <ArrowUpRight size={13} /></button></div>}
              {error && <p className={styles.error} role="alert">{error}</p>}
              <label className={styles.promptLabel} htmlFor="ai-business-prompt">{program ? "What would you like to change?" : "What does your business need?"}</label>
              <form onSubmit={(event) => { event.preventDefault(); void send(input); }}>
                <textarea id="ai-business-prompt" value={input} onChange={(event) => setInput(event.target.value)} maxLength={1200} rows={3} placeholder={program ? "Add a budget field and a review stage…" : "Build a project tracker, or ask what we can build…"} disabled={busy} />
                <div className={styles.composerBottom}><span>{input.length}/1200</span><button type="submit" disabled={busy || (!ready && !isCapabilityQuestion(input) && !identityReply(input)) || !input.trim()} aria-label="Build or update workspace">{busy ? <LoaderCircle size={15} className={styles.spin} /> : <Send size={15} />} {isCapabilityQuestion(input) ? "Explore" : identityReply(input) ? "Ask ACI" : program ? "Update" : "Build"}</button></div>
              </form>
              <p className={styles.disclosure}>Your prompt and current sample workspace are sent to OpenAI. Use fictional information.</p>
            </div>
          </aside>

          <section className={styles.workspace} id="generated-workspace" aria-label="Generated business workspace" aria-busy={busy}>
            <div className={styles.breadcrumb}><FolderOpen size={13} /> My applications <ChevronRight size={12} /><span>{program ? "Your preview" : "New workspace"}</span><span className={styles.previewTag}>PREVIEW</span></div>
            {program ? (
              <>
                <div className={styles.workspaceHeading}>
                  <div><h3>{program.title}</h3><p>{program.description}</p></div>
                  <button type="button" className={styles.saveButton} disabled={busy} onClick={save}>{saved ? <Check size={14} /> : <Save size={14} />}{saved ? "Saved locally" : "Save preview"}</button>
                </div>
                <div className={styles.overview}><span><strong>{program.records.length}</strong> records</span><span><strong>{program.fields.length}</strong> fields</span><span>Editable sample data</span></div>
                <div className={styles.toolbar}>
                  <div className={styles.viewButtons} aria-label="Workspace view">
                    <button type="button" aria-pressed={program.view === "table"} disabled={busy} onClick={() => change({ ...program, view: "table" }, "Table view selected.")}><Table2 size={14} /> Table</button>
                    {selectIndex >= 0 && <button type="button" aria-pressed={program.view === "board"} disabled={busy} onClick={() => change({ ...program, view: "board" }, "Board view selected.")}><Columns3 size={14} /> Board</button>}
                    {dateIndex >= 0 && <button type="button" aria-pressed={program.view === "calendar"} disabled={busy} onClick={() => change({ ...program, view: "calendar" }, "Calendar agenda selected.")}><CalendarDays size={14} /> Agenda</button>}
                  </div>
                  <button type="button" ref={addRecordRef} className={styles.addButton} disabled={busy || program.records.length >= 20} onClick={() => openEditor(null)}><Plus size={14} /> Add record</button>
                </div>
                {program.records.length === 0 && <div className={styles.emptyRecords}><Plus size={22} /><strong>No records yet</strong><p>Add a sample record or ask AI to create examples.</p></div>}
                {program.records.length > 0 && program.view === "table" && <div className={styles.tableScroll}><table><thead><tr>{program.fields.map((field) => <th scope="col" key={field.id}>{field.label}</th>)}<th scope="col">Actions</th></tr></thead><tbody>{program.records.map((record, index) => <tr key={record.id}>{program.fields.map((field, fieldIndex) => <td key={field.id}>{field.type === "select" && record.values[fieldIndex] ? <span className={styles.selectBadge}>{record.values[fieldIndex]}</span> : displayValue(record.values[fieldIndex], field.type)}</td>)}<td><div className={styles.rowActions}><button type="button" disabled={busy} aria-label={`Edit ${recordName(program, record.values, index)}`} onClick={() => openEditor(record.id, record.values)}><Pencil size={14} /></button><button type="button" disabled={busy} aria-label={`Delete ${recordName(program, record.values, index)}`} onClick={() => change({ ...program, records: program.records.filter((item) => item.id !== record.id) }, "Sample record deleted. Save to keep this change.")}><Trash2 size={14} /></button></div></td></tr>)}</tbody></table></div>}
                {program.records.length > 0 && program.view === "board" && selectIndex >= 0 && <div className={styles.board}>{[...program.fields[selectIndex].options, ...(program.records.some((record) => !record.values[selectIndex]) ? [""] : [])].map((option) => {
                  const records = program.records.filter((record) => record.values[selectIndex] === option);
                  return <div className={styles.boardColumn} key={option}><h4>{option || "Unassigned"}<span>{records.length}</span></h4>{records.map((record) => renderCard(record, program.records.indexOf(record)))}{records.length === 0 && <p className={styles.emptyColumn}>No records in this stage</p>}</div>;
                })}</div>}
                {program.records.length > 0 && program.view === "calendar" && dateIndex >= 0 && <div className={styles.agenda}><p className={styles.agendaLabel}>CALENDAR AGENDA · {program.fields[dateIndex].label}</p>{Array.from(new Set(program.records.map((record) => record.values[dateIndex]))).sort((a, b) => !a ? 1 : !b ? -1 : a.localeCompare(b)).map((date) => <div className={styles.agendaGroup} key={date}><h4><CalendarDays size={16} />{date ? displayValue(date, "date") : "Unscheduled"}</h4><div>{program.records.filter((record) => record.values[dateIndex] === date).map((record) => renderCard(record, program.records.indexOf(record)))}</div></div>)}</div>}
                <p className={styles.workspaceLimit}>Preview limits: 20 records and 10 fields. Saved data stays on this device.</p>
              </>
            ) : (
              <div className={styles.emptyWorkspace}>
                <div className={styles.emptyMark}><Sparkles size={29} /></div>
                <p className={styles.eyebrow}>BUILT AROUND THE WAY YOU WORK</p>
                <h3>Your idea.<br /><span>A working workspace.</span></h3>
                <p>Five everyday apps for business and city teams. Open a prepared sample instantly, or describe your own tool in chat to build with AI.</p>
                <div className={styles.starters}>{coreApps.map(app => <button type="button" key={app.id} disabled={busy} onClick={() => chooseSample(app.id)} aria-label={`Open ${app.title.toLowerCase()} sample`}><span><strong>{app.title}</strong><small>{app.view} · Open sample</small></span><ArrowUpRight size={16} /></button>)}</div>
                <button type="button" className={styles.specialtyButton} disabled={busy} onClick={() => chooseSample(acquisitionApp.id)}>Also explore: Acquisitions & land <ArrowUpRight size={15} /></button>
                <div className={styles.emptySteps}><span><Check size={13} /> Editable records</span><span><Check size={13} /> Follow-up changes</span><span><Check size={13} /> Save locally</span></div>
              </div>
            )}
          </section>
        </div>
        <div className={styles.statusBar}><span role="status"><Info size={14} />{notice}</span></div>
      </div>
      <p className={styles.caption}><Info size={14} />AI generates a sample workspace, not a deployed company system. Team accounts, shared storage, and business integrations are scoped separately. This demo does not access the private ACI engine.</p>
      <CapabilityGuide open={guideOpen} onOpenChange={setGuideOpen} onChoose={chooseSample} busy={busy} onClose={() => guideTriggerRef.current?.focus()} />
      <Dialog.Root open={pendingStarter !== null} onOpenChange={open => { if (!open) setPendingStarter(null); }}>
        <Dialog.Portal><Dialog.Overlay className={styles.dialogOverlay} /><Dialog.Content className={styles.dialog} onCloseAutoFocus={event => { event.preventDefault(); guideTriggerRef.current?.focus(); }}>
          <Dialog.Title className={styles.dialogTitle}>Open a different sample?</Dialog.Title>
          <Dialog.Description className={styles.dialogDescription}>This replaces your current working preview. Unsaved edits will be lost. Your last saved preview stays in this browser until you save again or reset the demo.</Dialog.Description>
          <div className={styles.formActions}><Dialog.Close className={styles.cancelButton}>Keep current workspace</Dialog.Close><button type="button" className={styles.submitButton} onClick={() => { if (pendingStarter) loadSample(pendingStarter); }}>Open sample</button></div>
        </Dialog.Content></Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root open={editor !== null} onOpenChange={(open) => { if (!open) setEditor(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.dialogOverlay} />
          <Dialog.Content className={styles.dialog} onCloseAutoFocus={(event) => {
            event.preventDefault();
            const trigger = editorTriggerRef.current;
            if (trigger?.isConnected) trigger.focus();
            else addRecordRef.current?.focus();
          }}>
            <Dialog.Title className={styles.dialogTitle}>{editor?.id ? "Edit record" : "Add record"}</Dialog.Title>
            <Dialog.Description className={styles.dialogDescription}>Use fictional information. Changes update your preview on this device.</Dialog.Description>
            <Dialog.Close className={styles.dialogClose} aria-label="Close record form"><X size={19} /></Dialog.Close>
            {program && editor && <form onSubmit={saveRecord} className={styles.recordForm}>{program.fields.map((field, index) => <div key={field.id}><label htmlFor={`ai-field-${field.id}`}>{field.label}{field.type === "currency" && " (USD)"}</label>{field.type === "select" ? <select id={`ai-field-${field.id}`} value={editor.values[index]} onChange={(event) => setEditor({ ...editor, values: editor.values.map((value, i) => i === index ? event.target.value : value) })}><option value="">Select an option</option>{field.options.map((option) => <option key={option}>{option}</option>)}</select> : <input id={`ai-field-${field.id}`} type={field.type === "date" ? "date" : ["number", "currency"].includes(field.type) ? "number" : "text"} step="any" min={field.type === "date" ? "0001-01-01" : ["number", "currency"].includes(field.type) ? -1e12 : undefined} max={field.type === "date" ? "9999-12-31" : ["number", "currency"].includes(field.type) ? 1e12 : undefined} maxLength={200} value={editor.values[index]} onChange={(event) => setEditor({ ...editor, values: editor.values.map((value, i) => i === index ? event.target.value : value) })} />}</div>)}{editorError && <p role="alert" className={styles.error}>{editorError}</p>}<div className={styles.formActions}>{editor.id && <button type="button" className={styles.deleteButton} onClick={() => { change({ ...program, records: program.records.filter((record) => record.id !== editor.id) }, "Sample record deleted. Save to keep this change."); setEditor(null); }}><Trash2 size={14} /> Delete record</button>}<button type="submit" className={styles.submitButton}><Check size={15} />{editor.id ? "Save record" : "Add record"}</button></div></form>}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
