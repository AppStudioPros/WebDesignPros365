import { z } from "zod";

export const STORAGE_KEY = "wdp365.business-apps.demo.v1";
export const scenarioSchema = z.enum(["acquisitions", "calendar", "inventory"]);
export type Scenario = z.infer<typeof scenarioSchema>;

const text = z.string().trim().min(1).max(120);
const amount = z.number().finite().min(0).max(1_000_000_000);
const propertySchema = z.object({
  id: text,
  name: text,
  location: text,
  owner: text,
  price: amount,
  acres: amount,
  stage: z.enum(["Sourcing", "Due diligence", "Offer ready", "Under contract"]),
  overdue: z.boolean(),
});
const itemSchema = z.object({
  id: text,
  name: text,
  sku: text,
  category: text,
  stock: amount.int(),
  reorder: amount.int(),
  price: amount,
});
const eventSchema = z.object({
  id: text,
  name: text,
  owner: text,
  day: z.number().int().min(0).max(4),
  hour: z.number().int().min(9).max(16),
  kind: z.enum(["Meeting", "Site visit", "Deadline"]),
});

export const demoSchema = z.object({
  version: z.literal(1),
  active: scenarioSchema,
  properties: z.array(propertySchema).max(100),
  items: z.array(itemSchema).max(100),
  events: z.array(eventSchema).max(100),
  approvalThreshold: amount.nullable(),
});
export type DemoState = z.infer<typeof demoSchema>;
export type Property = z.infer<typeof propertySchema>;
export type InventoryItem = z.infer<typeof itemSchema>;
export type CalendarEvent = z.infer<typeof eventSchema>;

export const scenarios: Record<
  Scenario,
  {
    label: string;
    title: string;
    prompt: string;
    response: string;
    suggestions: string[];
  }
> = {
  acquisitions: {
    label: "Land acquisitions",
    title: "Acquisition workspace",
    prompt:
      "Build a land acquisition program with properties, due diligence, offers, and closing stages.",
    response:
      "Here is your sample acquisition workspace. Explore the pipeline, add a property, or ask me to add an approval rule.",
    suggestions: [
      "Require approval above $250,000",
      "Show overdue due diligence",
    ],
  },
  calendar: {
    label: "Company calendar",
    title: "Company calendar",
    prompt:
      "Create a company calendar for team meetings, site visits, and important deadlines.",
    response:
      "Your sample team calendar is ready. Open an event for details, add your own sample event, or filter to site visits.",
    suggestions: ["Show site visits only", "Show all events"],
  },
  inventory: {
    label: "Inventory system",
    title: "Inventory workspace",
    prompt:
      "Create an inventory system with stock levels, product details, and reorder points.",
    response:
      "Here is a sample inventory workspace with reorder indicators. Add an item or adjust stock levels directly in the table.",
    suggestions: ["Show low-stock items", "Show all inventory"],
  },
};

export function initialDemo(): DemoState {
  return {
    version: 1,
    active: "acquisitions",
    approvalThreshold: null,
    properties: [
      {
        id: "p1",
        name: "Cedar Ridge",
        location: "Douglas County, CO",
        owner: "Alex Morgan",
        price: 425000,
        acres: 24.5,
        stage: "Due diligence",
        overdue: true,
      },
      {
        id: "p2",
        name: "Willow Creek",
        location: "Elbert County, CO",
        owner: "Jordan Lee",
        price: 185000,
        acres: 12.8,
        stage: "Sourcing",
        overdue: false,
      },
      {
        id: "p3",
        name: "Mesa Vista",
        location: "Pueblo County, CO",
        owner: "Sam Rivera",
        price: 310000,
        acres: 38.2,
        stage: "Offer ready",
        overdue: false,
      },
      {
        id: "p4",
        name: "Aspen Grove",
        location: "Park County, CO",
        owner: "Alex Morgan",
        price: 240000,
        acres: 18,
        stage: "Under contract",
        overdue: false,
      },
      {
        id: "p5",
        name: "Clearwater",
        location: "Fremont County, CO",
        owner: "Jordan Lee",
        price: 155000,
        acres: 9.6,
        stage: "Due diligence",
        overdue: true,
      },
    ],
    items: [
      {
        id: "i1",
        name: "Field survey kit",
        sku: "FSK-001",
        category: "Equipment",
        stock: 24,
        reorder: 8,
        price: 145,
      },
      {
        id: "i2",
        name: "Safety vest",
        sku: "SV-012",
        category: "Safety",
        stock: 6,
        reorder: 10,
        price: 28,
      },
      {
        id: "i3",
        name: "GPS receiver",
        sku: "GPS-008",
        category: "Equipment",
        stock: 12,
        reorder: 4,
        price: 425,
      },
      {
        id: "i4",
        name: "Marking flags · 100 pack",
        sku: "MF-104",
        category: "Supplies",
        stock: 3,
        reorder: 12,
        price: 18,
      },
      {
        id: "i5",
        name: "Site notebook",
        sku: "SN-020",
        category: "Supplies",
        stock: 45,
        reorder: 15,
        price: 12,
      },
    ],
    events: [
      {
        id: "e1",
        name: "Pipeline review",
        owner: "Acquisitions team",
        day: 0,
        hour: 9,
        kind: "Meeting",
      },
      {
        id: "e2",
        name: "Cedar Ridge visit",
        owner: "Alex Morgan",
        day: 1,
        hour: 11,
        kind: "Site visit",
      },
      {
        id: "e3",
        name: "Mesa Vista offer",
        owner: "Sam Rivera",
        day: 2,
        hour: 14,
        kind: "Deadline",
      },
      {
        id: "e4",
        name: "Willow Creek visit",
        owner: "Jordan Lee",
        day: 3,
        hour: 10,
        kind: "Site visit",
      },
      {
        id: "e5",
        name: "Weekly wrap-up",
        owner: "Operations team",
        day: 4,
        hour: 15,
        kind: "Meeting",
      },
    ],
  };
}

export const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export type DemoCommand =
  | { kind: "scenario"; scenario: Scenario }
  | { kind: "approval"; threshold: number }
  | { kind: "filter"; filter: "overdue" | "low-stock" | "site-visits" | "all" }
  | { kind: "unsupported" };

// A bounded product demonstration. No prompt execution or private ACI engine calls.
export function parseDemoCommand(input: string): DemoCommand {
  const value = input.toLowerCase().trim();
  if (/\b(create|build|open|switch)\b/.test(value)) {
    if (/\b(inventory|stock)\b/.test(value))
      return { kind: "scenario", scenario: "inventory" };
    if (/\b(calendar|schedule)\b/.test(value))
      return { kind: "scenario", scenario: "calendar" };
    if (/\b(acquisition|acquisitions|land|property|properties)\b/.test(value))
      return { kind: "scenario", scenario: "acquisitions" };
  }
  if (/\bapproval\b/.test(value)) {
    const match = value.match(
      /(?:above|over)\s*\$?\s*(\d[\d,]*(?:\.\d+)?)\s*(k|m)?\b/,
    );
    if (!match) return { kind: "unsupported" };
    const threshold =
      Number(match[1].replaceAll(",", "")) *
      (match[2] === "k" ? 1000 : match[2] === "m" ? 1_000_000 : 1);
    if (
      Number.isFinite(threshold) &&
      threshold >= 0 &&
      threshold <= 1_000_000_000
    )
      return { kind: "approval", threshold };
  }
  if (/\b(show|filter)\b/.test(value)) {
    if (/\ball\b/.test(value)) return { kind: "filter", filter: "all" };
    if (/overdue/.test(value)) return { kind: "filter", filter: "overdue" };
    if (/low[ -]stock|reorder/.test(value))
      return { kind: "filter", filter: "low-stock" };
    if (/site visits?/.test(value))
      return { kind: "filter", filter: "site-visits" };
  }
  return { kind: "unsupported" };
}
