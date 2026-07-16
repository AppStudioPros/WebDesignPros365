"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Workflow,
  Calendar,
  Bot,
  Mail,
  CreditCard,
  Check,
  X,
  ArrowRight,
  Zap,
  AlertCircle,
  Clock,
  Lock,
  Sparkles,
  Code2,
} from "lucide-react";

type Feature = {
  id: string;
  icon: typeof Database;
  label: string;
  shortLabel: string;
  /** What HighLevel does + visual mock */
  highlevel: {
    title: string;
    pain: string[];
    cost: string;
    shipDays: string;
  };
  /** What we do + code preview */
  ours: {
    title: string;
    wins: string[];
    cost: string;
    shipDays: string;
    codePreview: string;
    codeLang: string;
  };
};

const features: Feature[] = [
  {
    id: "crm",
    icon: Database,
    label: "CRM + Contacts",
    shortLabel: "CRM",
    highlevel: {
      title: "HighLevel CRM",
      pain: [
        "Locked to their data schema. Want a custom field? Three menus deep.",
        "Search is slow. Filters reset randomly when you navigate.",
        "Export is paginated and rate-limited. Need 50K contacts? Plan for an afternoon.",
      ],
      cost: "$97-$497 / location / mo",
      shipDays: "Already on their roadmap (or it isn't)",
    },
    ours: {
      title: "Next.js + Supabase CRM",
      wins: [
        "Postgres schema you own. Add any field, any type, any time.",
        "Full-text search + filters via tsvector. Sub-100ms results.",
        "Vector embeddings (pgvector) for semantic contact search out of the box.",
        "Real-time multi-user via Supabase Realtime. No more 'reload to see changes'.",
      ],
      cost: "$30K build · $5K/mo retainer",
      shipDays: "Discovery to first contacts imported in 3-4 weeks",
      codeLang: "SQL",
      codePreview: `-- Custom field? Just add it.
ALTER TABLE contacts
  ADD COLUMN lifetime_value numeric,
  ADD COLUMN renewal_date date;

-- Tenant isolation, audit-trail-ready.
CREATE POLICY tenant_isolation ON contacts
  FOR ALL USING (tenant_id = auth.tenant_id());

-- Semantic search in 4 lines.
CREATE INDEX ON contacts
  USING hnsw (embedding vector_cosine_ops);`,
    },
  },
  {
    id: "ai",
    icon: Bot,
    label: "AI Assistant",
    shortLabel: "AI Bot",
    highlevel: {
      title: "HighLevel \"AI\" (EVIE-style wrapper)",
      pain: [
        "GPT-4o-mini wrapper. Hallucinates dates, customer names, prices.",
        "Refuses to tell you what model it runs on.",
        "Can't access your real CRM data unless you copy-paste it.",
        "No audit trail. No methodology binding. No way to debug a wrong answer.",
      ],
      cost: "Bundled (you can't turn it off)",
      shipDays: "Already 'shipping' (and broken)",
    },
    ours: {
      title: "ACI-Powered Agents (real Claude)",
      wins: [
        "Anthropic Claude Sonnet 4.5 via our patented ACI platform.",
        "Grounded in YOUR data, your methodology, your brand voice.",
        "No hallucination. No drift. Every response audit-trail-complete.",
        "Human-in-the-loop guards on outbound sends.",
      ],
      cost: "Included in Pro tier · $30K+",
      shipDays: "Drafted agent live in 1-2 weeks",
      codeLang: "TypeScript",
      codePreview: `import { aci } from "@/lib/aci";

export const concierge = defineAgent({
  name: "Customer Concierge",
  engine: "aci.acumen-7",
  methodology: methodologyLib.brand,
  tools: [getCustomer, draftReply, logToCRM],
  guardrails: {
    hallucination: "forbid",
    drift: "workspace-bound",
    humanInLoop: "outbound-sends",
  },
});`,
    },
  },
  {
    id: "workflow",
    icon: Workflow,
    label: "Workflows",
    shortLabel: "Workflows",
    highlevel: {
      title: "HighLevel Workflow Builder",
      pain: [
        "Visual builder breaks when workflows get complex.",
        "Triggers fire randomly. Or twice. Or not at all.",
        "Webhooks have a 10-second timeout, then they silently fail.",
        "Custom logic = paste JavaScript into a 100px text box. No syntax highlighting.",
      ],
      cost: "Plan-gated. Pro tier or higher.",
      shipDays: "Build today, debug forever",
    },
    ours: {
      title: "Custom n8n-style or code-first workflows",
      wins: [
        "Real code in a real IDE. Version control, testing, rollback.",
        "Or visual flow on top of Inngest / Trigger.dev for non-devs.",
        "Webhooks with retries, idempotency, dead-letter queues.",
        "AI agents can compose + call workflows on their own.",
      ],
      cost: "Included in Pro+ · $30K+",
      shipDays: "First flows live in week 2",
      codeLang: "TypeScript",
      codePreview: `import { inngest } from "@/lib/inngest";

export const onContactCreated = inngest.createFunction(
  { id: "welcome-sequence", retries: 3 },
  { event: "contact.created" },
  async ({ event, step }) => {
    await step.run("score", () => aci.score(event.contact));
    await step.sleep("wait", "2h");
    await step.run("send-welcome", () =>
      resend.send(welcomeEmail(event.contact))
    );
  }
);`,
    },
  },
  {
    id: "booking",
    icon: Calendar,
    label: "Booking",
    shortLabel: "Booking",
    highlevel: {
      title: "HighLevel Calendars",
      pain: [
        "Timezone bugs. Customers book at 2am because the form showed UTC.",
        "Round-robin breaks if one rep is OOO and doesn't update the calendar.",
        "Embed widget is a 200kb iframe that breaks Core Web Vitals.",
        "Branded? Only on enterprise tier.",
      ],
      cost: "Locked to their branded widget",
      shipDays: "Available now, looks rented",
    },
    ours: {
      title: "Cal.com-powered or custom booking",
      wins: [
        "Real timezone math via date-fns-tz. No more 2am surprises.",
        "Multi-calendar conflict resolution (Google + Outlook + Apple).",
        "Native React component. Zero iframe. Sub-50kb. Perfect LCP.",
        "100% your branding from day one.",
      ],
      cost: "Included in Growth+ · $15K+",
      shipDays: "Live week 1 of the build",
      codeLang: "TypeScript",
      codePreview: `<BookingFlow
  type="discovery-call"
  duration={30}
  bufferBefore={5}
  bufferAfter={10}
  hosts={team}
  roundRobin="least-recent"
  conflicts={["google", "outlook"]}
  redirectAfter="/contact/booked"
  // your CSS, your colors, your brand
/>`,
    },
  },
  {
    id: "email",
    icon: Mail,
    label: "Email + SMS",
    shortLabel: "Email/SMS",
    highlevel: {
      title: "HighLevel Email/SMS",
      pain: [
        "Sends from shared IPs. Your deliverability is at the mercy of every other agency.",
        "No real domain warmup. New domains hit spam day one.",
        "SMS templates limited to 160 chars. No MMS without paying more.",
      ],
      cost: "Per-send + per-segment fees",
      shipDays: "Working today, deliverability roulette",
    },
    ours: {
      title: "Resend + Twilio (dedicated IPs)",
      wins: [
        "Resend on your dedicated domain. Real DKIM/SPF/DMARC alignment.",
        "Twilio for SMS with proper toll-free verification + 10DLC.",
        "AI-drafted email that grounds in your actual customer record.",
        "Real bounce + reputation tracking via Resend webhooks.",
      ],
      cost: "Included · pay-at-cost for sends",
      shipDays: "DNS records configured day 1",
      codeLang: "TypeScript",
      codePreview: `import { resend } from "@/lib/resend";

await resend.emails.send({
  from: "you@yourdomain.com",
  to: contact.email,
  subject: await aci.draft({
    intent: "renewal-reminder",
    customer: contact,
    voice: brand.voice,
  }),
  react: <RenewalEmail contact={contact} />,
});`,
    },
  },
  {
    id: "payments",
    icon: CreditCard,
    label: "Payments",
    shortLabel: "Payments",
    highlevel: {
      title: "HighLevel Payments",
      pain: [
        "Stripe under the hood, but with their fees layered on top.",
        "Limited to their checkout UI. No custom payment flows.",
        "Subscription logic is bolted on, not native.",
      ],
      cost: "HighLevel fee + Stripe fee",
      shipDays: "Available, but you pay twice",
    },
    ours: {
      title: "Native Stripe Connect",
      wins: [
        "Stripe's full API. Custom checkouts, subscriptions, invoices, refunds.",
        "Stripe Connect for marketplace flows (split payments, payouts).",
        "Webhooks signed + verified, retried on failure.",
        "You pay Stripe fees only. No middleman tax.",
      ],
      cost: "Stripe fees only (2.9% + $0.30)",
      shipDays: "Live in week 2-3",
      codeLang: "TypeScript",
      codePreview: `import { stripe } from "@/lib/stripe";

const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [{ price: PRICE_GROWTH, quantity: 1 }],
  customer: customer.stripeId,
  payment_method_types: ["card", "us_bank_account"],
  success_url: \`\${origin}/billing/success?id={CHECKOUT_SESSION_ID}\`,
  // Connect for multi-tenant marketplaces:
  payment_intent_data: { application_fee_amount: 250 },
});`,
    },
  },
];

export function HighLevelDemo() {
  const [activeId, setActiveId] = useState(features[0].id);
  const active = features.find((f) => f.id === activeId) || features[0];

  return (
    <section className="section bg-[#0a0a0f] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#2F73EE]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#252640]/10 border border-white/20 text-white mb-4">
            <Sparkles className="w-4 h-4 text-[#BF5DE0]" />
            <span className="text-sm font-mono font-medium">INTERACTIVE COMPARISON</span>
          </div>
          <h2 className="heading-lg mb-4 text-white">
            See it in code.{" "}
            <span className="bg-gradient-to-r from-[#BF5DE0] to-[#2F73EE] bg-clip-text text-transparent">
              Pick a feature.
            </span>
          </h2>
          <p className="text-white/70">
            Click any module below. See exactly what you give up in HighLevel and exactly what
            you get on the modern stack. Real code, real costs, real timelines.
          </p>
        </motion.div>

        {/* Feature tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-4xl mx-auto">
          {features.map((f) => {
            const Icon = f.icon;
            const isActive = f.id === activeId;
            return (
              <button
                key={f.id}
                onClick={() => setActiveId(f.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white shadow-lg shadow-[#8734E1]/30"
                    : "bg-[#252640]/5 text-white/70 hover:bg-[#252640]/10 hover:text-white border border-white/10"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2.25} />
                {f.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Active feature panel — two-up */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
          >
            {/* LEFT: HighLevel side — red-tinted, mocked-up UI */}
            <div className="bg-[#1a1a24] border border-red-500/20 rounded-2xl overflow-hidden">
              {/* Title bar */}
              <div className="bg-[#0f0f17] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
                  <Lock className="w-3.5 h-3.5 text-red-400" strokeWidth={2.25} />
                  <span>app.gohighlevel.com</span>
                </div>
                <div className="text-[10px] text-red-300 uppercase tracking-wider font-mono">
                  Rented
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-red-400" strokeWidth={2.25} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{active.highlevel.title}</h3>
                    <p className="text-xs text-red-300/70 mt-0.5">
                      What you actually get
                    </p>
                  </div>
                </div>

                {/* Pain points list */}
                <ul className="space-y-2.5 mb-6">
                  {active.highlevel.pain.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-sm text-white/75 leading-relaxed"
                    >
                      <X
                        className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5"
                        strokeWidth={2.25}
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                {/* Cost + ship date */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                      Cost
                    </p>
                    <p className="text-sm font-mono text-red-300">{active.highlevel.cost}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                      Ship date
                    </p>
                    <p className="text-sm font-mono text-white/60">{active.highlevel.shipDays}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Our side — purple-glow, code preview */}
            <div className="bg-[#1a1a24] border border-[#8734E1]/40 rounded-2xl overflow-hidden shadow-2xl shadow-[#8734E1]/20">
              {/* Title bar */}
              <div className="bg-gradient-to-r from-[#8734E1]/20 to-[#2F73EE]/20 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/70 font-mono">
                  <Code2 className="w-3.5 h-3.5 text-[#BF5DE0]" strokeWidth={2.25} />
                  <span>{active.ours.codeLang}</span>
                </div>
                <div className="text-[10px] text-[#BF5DE0] uppercase tracking-wider font-mono">
                  You Own It
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8734E1] to-[#2F73EE] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" strokeWidth={2.25} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{active.ours.title}</h3>
                    <p className="text-xs text-[#BF5DE0] mt-0.5">What we build instead</p>
                  </div>
                </div>

                {/* Code preview */}
                <div className="bg-[#0a0a0f] rounded-lg p-4 mb-5 border border-white/5">
                  <pre className="text-[11.5px] leading-relaxed font-mono text-white/85 overflow-x-auto">
                    <code>{active.ours.codePreview}</code>
                  </pre>
                </div>

                {/* Wins list */}
                <ul className="space-y-2.5 mb-6">
                  {active.ours.wins.map((w) => (
                    <li
                      key={w}
                      className="flex items-start gap-2.5 text-sm text-white/85 leading-relaxed"
                    >
                      <Check
                        className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"
                        strokeWidth={2.25}
                      />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>

                {/* Cost + ship date */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                      Investment
                    </p>
                    <p className="text-sm font-mono text-[#BF5DE0]">{active.ours.cost}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                      Ship date
                    </p>
                    <p className="text-sm font-mono text-emerald-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {active.ours.shipDays}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA below the comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mt-12"
        >
          <p className="text-white/70 mb-5">
            Six features, one stack, your code. Discovery call is free, quote in 48 hours.
          </p>
          <a
            href="/contact?topic=highlevel-migration"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#252640] text-[#8734E1] font-semibold hover:bg-[#252640]/90 transition-colors shadow-xl"
          >
            Book a Migration Call
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
