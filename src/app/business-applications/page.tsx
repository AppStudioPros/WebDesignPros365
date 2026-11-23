import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Sparkles,
  Workflow,
} from "lucide-react";
import { autoMetadata } from "@/lib/metadata";
import AutoSchema from "@/components/AutoSchema";
import BusinessAppsExperience from "@/components/business-apps/BusinessAppsExperience";
import styles from "./page.module.css";

export const metadata = autoMetadata("/business-applications");

const useCases = [
  ["01", "Projects & tasks", "Turn priorities into clear assignments.", "Owners · deadlines · project stages · department coordination"],
  ["02", "Budgets & purchasing", "Keep requests and planned spending in view.", "Purchase requests · vendors · review status · planned amounts"],
  ["03", "Service requests", "Give every request a clear next step.", "Internal support · facility repairs · public works · resolution tracking"],
  [
    "04",
    "Assets & inventory",
    "Know what you have and where it belongs.",
    "Equipment · stock levels · locations · condition · reorder points",
  ],
  [
    "05",
    "Calendars & meetings",
    "Give the whole team a clear view of what comes next.",
    "Company calendars · assignments · site visits · deadlines",
  ],
  [
    "SPECIALTY",
    "Acquisitions & land",
    "From the first opportunity to the closing table.",
    "Deal pipelines · property records · due diligence · review stages",
  ],
];

const faqs = [
  [
    "What is an ACI business application?",
    "A business tool designed around your workflow, with a conversational interface for shaping its screens and processes. It can be scoped as part of a new website build or as a private workspace connected to your existing site.",
  ],
  [
    "What can I do in the demo?",
    "Open one of five core app samples or the acquisition sample instantly, or describe a tool for AI to generate. Edit records, use table, board, or dated-agenda views, and save locally. Ask ‘What can we build?’ for the capability guide. AI build and update requests send your prompt and current sample workspace to OpenAI; use fictional information. The top Reset demo button clears both modes and browser saves. Company systems and the private ACI engine are not connected.",
  ],
  [
    "Will my employees use it behind a login?",
    "That is the intended production setup: a private staff workspace alongside your public website. Sign-in, team permissions, shared storage, and integrations are scoped and implemented for your business. They are not active in this public demo.",
  ],
  [
    "Can it connect with our existing tools?",
    "We scope connections around the systems you already use. Data access, available APIs, permissions, and the actions you want automated determine what can be connected.",
  ],
  [
    "How do we start, and what does it cost?",
    "Start with one useful workflow. We map the records, roles, rules, and integrations, then quote the website and application scope together. Pricing and delivery timing depend on that agreed scope.",
  ],
];

export default function BusinessApplicationsPage() {
  return (
    <div className={styles.page}>
      <AutoSchema path="/business-applications" />
      <section className={styles.hero} aria-labelledby="business-apps-title">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.eyebrow}>
            <Sparkles size={14} /> INTRODUCING ACI BUSINESS APPLICATIONS
          </div>
          <h1 id="business-apps-title">
            Your website brings in business.
            <br />
            <span>
              Now, help it run your business
              <br /> with ACI Patented Intelligence.
            </span>
          </h1>
          <p className={styles.heroDescription}>
            A company calendar. An acquisition pipeline. Your next inventory
            system.
            <br className={styles.desktopBreak} /> Describe the way you work.
            Shape the tools around it.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#workspace-demo">
              Explore the interactive demo <ArrowDown size={17} />
            </a>
            <Link
              className={styles.textLink}
              href="/contact?ref=aci-business-applications"
            >
              Build my business workspace <ArrowRight size={17} />
            </Link>
          </div>
          <p className={styles.heroNote}>
            <span /> Your website. Your workflows. One connected experience.
          </p>
        </div>
      </section>

      <section
        id="workspace-demo"
        className={`${styles.container} ${styles.demoSection}`}
        aria-label="Interactive business application demo"
      >
        <BusinessAppsExperience />
      </section>

      <section
        className={`${styles.container} ${styles.howSection}`}
        aria-labelledby="how-title"
      >
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>
            A CONVERSATION THAT BECOMES A WORKSPACE
          </p>
          <h2 id="how-title">Describe it. Shape it. Put it to work.</h2>
          <p>Start with the way your company actually operates.</p>
        </div>
        <div className={styles.steps}>
          {[
            {
              icon: MessageSquareText,
              number: "01",
              title: "Tell ACI what you need",
              body: "Explain the task, the people involved, and the information you need to track.",
            },
            {
              icon: Layers3,
              number: "02",
              title: "See your workspace take shape",
              body: "Bring the workflow into focus with editable tables, forms, boards, and dated agendas.",
            },
            {
              icon: Workflow,
              number: "03",
              title: "Make it fit your business",
              body: "Refine the fields and rules. Scope the saved data, team access, and connections for your rollout.",
            },
          ].map(({ icon: Icon, number, title, body }) => (
            <div className={styles.step} key={number}>
              <div className={styles.stepTop}>
                <Icon size={23} />
                <span>{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={styles.useCasesSection}
        aria-labelledby="use-cases-title"
      >
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>BUILT AROUND YOUR DAY-TO-DAY</p>
            <h2 id="use-cases-title">
              Your business has its own way of working.
              <br />
              Your software should, too.
            </h2>
          </div>
          <div className={styles.useCases}>
            {useCases.map(([number, title, description, examples]) => (
              <div className={styles.useCase} key={number}>
                <span className={styles.caseNumber}>{number}</span>
                <h3>{title}</h3>
                <div>
                  <p>{description}</p>
                  <span>{examples}</span>
                </div>
                <ArrowRight size={22} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${styles.container} ${styles.scopeSection}`}
        aria-labelledby="scope-title"
      >
        <div>
          <p className={styles.kicker}>THE WEBSITE IS JUST THE BEGINNING</p>
          <h2 id="scope-title">
            A public front door.
            <br />A private place to get work done.
          </h2>
          <p className={styles.scopeDescription}>
            Pair the website your customers see with the tools your team needs.
            We start with one valuable workflow and build the operational
            foundation around it.
          </p>
          <Link
            className={styles.textLink}
            href="/contact?ref=aci-business-applications"
          >
            Let’s map your first application <ArrowRight size={18} />
          </Link>
        </div>
        <div className={styles.scopeCard}>
          <div className={styles.scopeIcon}>
            <LockKeyhole size={24} />
          </div>
          <h3>Your production workspace, scoped to fit.</h3>
          <p>Planned together as part of your build:</p>
          <ul>
            {[
              "Staff sign-in and role-based access",
              "Shared records that persist between sessions",
              "Connected workflows and approved integrations",
              "Clear approval rules and accountable changes",
            ].map((item) => (
              <li key={item}>
                <Check size={17} />
                {item}
              </li>
            ))}
          </ul>
          <div className={styles.scopeFootnote}>
            The interactive demo above previews the experience. Production
            access, data, and integrations are configured during your project.
          </div>
        </div>
      </section>

      <section
        className={`${styles.container} ${styles.faqSection}`}
        aria-labelledby="faq-title"
      >
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>A FEW GOOD QUESTIONS</p>
          <h2 id="faq-title">Before you build.</h2>
        </div>
        <div className={styles.faqs}>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={`${styles.container} ${styles.finalCta}`}>
        <Sparkles size={27} />
        <h2>What would you build for your business?</h2>
        <p>
          Bring us the spreadsheet, the process, or the idea.
          <br />
          Let’s turn it into your next useful application.
        </p>
        <Link
          className={styles.primaryButton}
          href="/contact?ref=aci-business-applications"
        >
          Talk through my first application <ArrowRight size={18} />
        </Link>
        <span>Start with a conversation. Scope the right build.</span>
      </section>
    </div>
  );
}
