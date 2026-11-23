import { z } from "zod";

const short = z.string().trim().min(1).max(120);
const id = z.string().regex(/^[a-z][a-z0-9_]{0,31}$/);
export const programSchema = z.object({
  title: short,
  description: z.string().max(300),
  view: z.enum(["table", "board", "calendar"]),
  fields: z.array(z.object({
    id,
    label: short,
    type: z.enum(["text", "number", "currency", "date", "select"]),
    options: z.array(short).max(8),
  }).strict()).min(1).max(10),
  records: z.array(z.object({
    id,
    values: z.array(z.string().max(200)).max(10),
  }).strict()).max(20),
}).strict().superRefine((program, context) => {
  const issue = (message: string) => context.addIssue({ code: z.ZodIssueCode.custom, message });
  if (new Set(program.fields.map(f => f.id)).size !== program.fields.length) issue("Field IDs must be unique.");
  if (new Set(program.records.map(r => r.id)).size !== program.records.length) issue("Record IDs must be unique.");
  for (const field of program.fields) {
    if (field.type === "select" && (field.options.length === 0 || new Set(field.options).size !== field.options.length)) issue("Select fields require unique options.");
    if (field.type !== "select" && field.options.length) issue("Only select fields have options.");
  }
  if (program.view === "board" && !program.fields.some(f => f.type === "select")) issue("Boards require a select field.");
  if (program.view === "calendar" && !program.fields.some(f => f.type === "date")) issue("Calendars require a date field.");
  for (const record of program.records) {
    if (record.values.length !== program.fields.length) issue("Every record must match the fields.");
    record.values.forEach((value, i) => {
      const field = program.fields[i];
      if (!field || !value) return;
      if (field.type === "select" && !field.options.includes(value)) issue("Invalid select value.");
      if (["number", "currency"].includes(field.type) && (!Number.isFinite(Number(value)) || Math.abs(Number(value)) > 1e12)) issue("Invalid number.");
      if (field.type === "date" && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value)) issue("Invalid date.");
    });
  }
});
export type GeneratedProgram = z.infer<typeof programSchema>;
export const programResponseSchema = z.object({message: z.string().min(1).max(600), program: programSchema.nullable()}).strict();
export const programRequestSchema = z.object({prompt: z.string().trim().min(1).max(1200), current: programSchema.nullable()}).strict();
export const PROGRAM_STORAGE_KEY = "wdp365.business-apps.generated.v1";

// Strict structured output defines data only. The browser never executes model code.
export const programOutputJsonSchema = {
  type: "object", additionalProperties: false, required: ["message", "program"],
  properties: {
    message: {type: "string", maxLength: 600},
    program: {anyOf: [{type: "null"}, {
      type: "object", additionalProperties: false, required: ["title", "description", "view", "fields", "records"],
      properties: {
        title: {type: "string", maxLength: 120}, description: {type: "string", maxLength: 300},
        view: {type: "string", enum: ["table", "board", "calendar"]},
        fields: {type: "array", minItems: 1, maxItems: 10, items: {
          type: "object", additionalProperties: false, required: ["id", "label", "type", "options"],
          properties: {id: {type: "string", pattern: "^[a-z][a-z0-9_]{0,31}$"}, label: {type: "string", maxLength: 120}, type: {type: "string", enum: ["text", "number", "currency", "date", "select"]}, options: {type: "array", maxItems: 8, items: {type: "string", maxLength: 120}}},
        }},
        records: {type: "array", maxItems: 20, items: {
          type: "object", additionalProperties: false, required: ["id", "values"],
          properties: {id: {type: "string", pattern: "^[a-z][a-z0-9_]{0,31}$"}, values: {type: "array", maxItems: 10, items: {type: "string", maxLength: 200}}},
        }},
      },
    }]},
  },
} as const;
