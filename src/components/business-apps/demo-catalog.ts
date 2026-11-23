import type { GeneratedProgram } from "./program-model";

export const capabilityMessage = "You can try five core apps now: projects and tasks, budgets and purchasing, service requests, assets and inventory, and calendars. Acquisitions is also available. Open the capability guide for more record-based ideas and the features that require a separate production build. Your current workspace is unchanged.";

// Discovery is product help, not a request to generate or replace a workspace.
// Keep the explicit button and the common conversational forms on the same path.
export function isCapabilityQuestion(prompt: string) {
  const text = prompt.trim().toLowerCase().replace(/[’']/g, "").replace(/^(?:hey\s+)?aci[,!:]?\s+/, "");
  return /^(?:please\s+)?(?:what\s+(?:can|could)\s+(?:we|you|aci)\s+(?:build|create|make|do)\b|what\s+(?:apps|applications|programs|tools|workflows|capabilities)\b|whats\s+(?:available|possible)\b|(?:show|list|explore)\s+(?:me\s+)?(?:all\s+)?(?:your\s+|the\s+|available\s+|demo\s+)?(?:apps|applications|programs|tools|workflows|capabilities)\b)/.test(text);
}

export const coreApps = [
  { id: "projects", title: "Projects & tasks", description: "Owners, priorities, deadlines, and progress across departments.", view: "Board", example: "Corporate initiatives or city capital projects." },
  { id: "purchasing", title: "Budgets & purchasing", description: "Planned amounts, purchase requests, vendors, and review stages.", view: "Table", example: "Department spending or municipal procurement tracking." },
  { id: "service", title: "Service requests", description: "Requests, assigned teams, due dates, and resolution stages.", view: "Board", example: "Internal support, facility repairs, or resident requests." },
  { id: "assets", title: "Assets & inventory", description: "Items, quantities, locations, condition, and reorder points.", view: "Table", example: "Office equipment, supplies, fleet, or public works assets." },
  { id: "calendar", title: "Calendars & meetings", description: "A dated agenda for meetings, inspections, and deadlines.", view: "Agenda", example: "Team schedules or city department coordination." },
] as const;

export const acquisitionApp = { id: "acquisitions", title: "Acquisitions & land", description: "Track fictional properties, prices, owners, review dates, and deal stages.", view: "Board", example: "A specialty sample for company growth and land purchasing." } as const;
export type StarterId = (typeof coreApps)[number]["id"] | "acquisitions";

export const morePreviewIdeas = [
  { title: "Business development", ideas: "Lead trackers, client onboarding, account registers, sales pipelines, vendor directories." },
  { title: "Projects & operations", ideas: "Milestone trackers, risk registers, inspection logs, maintenance schedules, delivery trackers." },
  { title: "Finance & administration", ideas: "Contract renewal lists, grant milestones, invoice status trackers, expense review queues, policy registers." },
  { title: "People & coordination", ideas: "Onboarding checklists, training schedules, shift plans, equipment assignments, meeting action items." },
  { title: "City & community", ideas: "Permit status trackers, public works requests, facility booking lists, council action trackers, community project registers." },
] as const;

export const productionFeatures = [
  "Staff sign-in, roles, and access to each organization’s records",
  "Shared databases, backups, retention rules, and an audit trail",
  "Enforced approval routes, notifications, and scheduled automation",
  "Microsoft 365 or Google calendar synchronization and invitations",
  "Accounting, ERP, CRM, GIS, and other approved data connections",
  "Document uploads, search, signing, and public-facing service portals",
  "Calculated reporting, operational dashboards, and cross-app workflows",
] as const;

const field = (id: string, label: string, type: GeneratedProgram["fields"][number]["type"] = "text", options: string[] = []) => ({ id, label, type, options });
const records = (rows: string[][]) => rows.map((values, index) => ({ id: `sample_${index + 1}`, values }));

// Prepared fictional data provides an instant, repeatable first experience.
// Loading a sample never calls a model; only an explicit Build/Update request does.
export function starterProgram(id: StarterId, now = new Date()): GeneratedProgram {
  const date = (days: number) => { const next = new Date(now); next.setUTCDate(next.getUTCDate() + days); return next.toISOString().slice(0, 10); };
  switch (id) {
    case "projects": return {
      title: "Projects & tasks", description: "Prepared fictional sample: coordinate priorities and deadlines across departments.", view: "board",
      fields: [field("task", "Project / task"), field("status", "Status", "select", ["Planned", "In progress", "Review", "Complete"]), field("owner", "Owner"), field("department", "Department"), field("due", "Due date", "date"), field("priority", "Priority", "select", ["High", "Normal", "Low"])],
      records: records([["Facility energy review", "In progress", "Alex Morgan", "Operations", date(7), "High"], ["Quarterly service plan", "Review", "Jordan Lee", "Administration", date(3), "Normal"], ["Equipment replacement plan", "Planned", "Sam Rivera", "Facilities", date(14), "Normal"]]),
    };
    case "purchasing": return {
      title: "Budgets & purchasing", description: "Prepared fictional sample: amounts and review statuses are tracking data, not accounting or enforced approvals.", view: "table",
      fields: [field("request", "Purchase request"), field("status", "Review status", "select", ["Draft", "Under review", "Reviewed", "Ordered"]), field("department", "Department"), field("planned", "Planned amount", "currency"), field("quoted", "Quoted amount", "currency"), field("vendor", "Vendor"), field("owner", "Reviewer"), field("due", "Review date", "date")],
      records: records([["Replacement field tablets", "Under review", "Operations", "6000", "5400", "Example Supply Co.", "Alex Morgan", date(4)], ["Meeting room equipment", "Draft", "Administration", "2400", "2150", "Sample AV Partners", "Jordan Lee", date(8)], ["Seasonal safety supplies", "Reviewed", "Facilities", "1800", "1650", "Fictional Safety Supply", "Sam Rivera", date(2)]]),
    };
    case "service": return {
      title: "Service requests", description: "Prepared fictional sample: track internal support or public works requests without contacting anyone.", view: "board",
      fields: [field("request", "Request"), field("status", "Status", "select", ["New", "Assigned", "In progress", "Resolved"]), field("category", "Category", "select", ["Facilities", "IT", "Public works"]), field("location", "Location"), field("owner", "Assigned team"), field("priority", "Priority", "select", ["High", "Normal", "Low"]), field("due", "Due date", "date")],
      records: records([["Repair meeting room lights", "Assigned", "Facilities", "Sample civic center", "Facilities team", "Normal", date(2)], ["Replace field device", "In progress", "IT", "Example operations office", "Technology team", "High", date(1)], ["Inspect park pathway", "New", "Public works", "Fictional North Park", "Maintenance team", "Normal", date(5)]]),
    };
    case "assets": return {
      title: "Assets & inventory", description: "Prepared fictional sample: track equipment and stock. Quantities and reorder points are manually editable.", view: "table",
      fields: [field("item", "Item"), field("asset_id", "Asset / SKU"), field("quantity", "Quantity", "number"), field("reorder", "Reorder point", "number"), field("location", "Location"), field("condition", "Condition", "select", ["Good", "Service due", "Replace"]), field("cost", "Unit cost", "currency")],
      records: records([["Field tablet", "DEMO-TAB-01", "12", "4", "Operations", "Good", "450"], ["Safety kit", "DEMO-KIT-02", "3", "8", "Facilities store", "Good", "55"], ["Portable pump", "DEMO-PMP-03", "2", "1", "Maintenance depot", "Service due", "850"]]),
    };
    case "calendar": return {
      title: "Calendars & meetings", description: "Prepared fictional sample: a dated agenda. No calendar sync, invitations, or conflict checking is connected.", view: "calendar",
      fields: [field("event", "Meeting / event"), field("date", "Date", "date"), field("time", "Time (local)"), field("owner", "Organizer"), field("type", "Type", "select", ["Meeting", "Inspection", "Deadline"]), field("location", "Location"), field("notes", "Notes")],
      records: records([["Department planning", date(1), "09:00", "Alex Morgan", "Meeting", "Sample meeting room", "Review next week’s priorities"], ["Facility walkthrough", date(3), "14:00", "Sam Rivera", "Inspection", "Example operations center", "Review maintenance list"], ["Project update due", date(7), "16:00", "Jordan Lee", "Deadline", "Sample workspace", "Prepare a fictional progress summary"]]),
    };
    case "acquisitions": return {
      title: "Land acquisition pipeline", description: "Prepared fictional sample: compare opportunities and track due diligence. No purchase or approval is executed.", view: "board",
      fields: [field("property", "Property"), field("stage", "Stage", "select", ["Sourcing", "Due diligence", "Offer review", "Under contract"]), field("price", "Asking price", "currency"), field("acreage", "Acres", "number"), field("owner", "Owner"), field("review", "Review date", "date")],
      records: records([["Cedar Ridge (sample)", "Due diligence", "425000", "24.5", "Alex Morgan", date(5)], ["Willow Creek (sample)", "Sourcing", "180000", "12.8", "Jordan Lee", date(9)], ["Mesa Vista (sample)", "Offer review", "310000", "38.2", "Sam Rivera", date(3)]]),
    };
  }
}
