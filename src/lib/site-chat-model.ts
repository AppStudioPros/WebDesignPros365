import { z } from "zod";

export const siteMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(8000),
}).strict();
export const siteChatRequestSchema = z.object({
  messages: z.array(siteMessageSchema).min(1).max(40),
}).strict().refine(({ messages }) => messages.at(-1)?.role === "user" && messages.at(-1)!.content.length <= 1200);
export type SiteMessage = z.infer<typeof siteMessageSchema>;
