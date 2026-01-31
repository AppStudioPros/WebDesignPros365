# Web Design Pros 365 — Rebuild Plan (Next.js 15 • Vercel • Sanity.io)

## Current Status: ✅ REACT PREVIEW LIVE & WORKING

### Live Preview URL: https://nextjs-sanity-app.preview.emergentagent.com

---

## What's Been Delivered

### 1. Production-Ready Next.js Project (COMPLETED ✅)
**Location:** `/app/nextjs-project/` and `/app/wdp365-nextjs-project.zip`
- Complete Next.js 15 project with TypeScript and TailwindCSS
- All 8 pages implemented (Home, About, Services, Portfolio, Blog, Contact, Pricing, FAQ)
- Sanity.io CMS schemas defined for all content types
- reCAPTCHA v3 integration (placeholder keys)
- API routes for contact form and revalidation
- Ready for Vercel deployment

### 2. React Live Preview (COMPLETED ✅)
**Status:** All pages working, contact form functional
- ✅ Home page with hero, stats, tech badges, CTAs
- ✅ Services page with dropdown navigation and category filters
- ✅ Portfolio page with case studies grid
- ✅ Blog page with article cards
- ✅ About page with team info and stats
- ✅ Contact page with working form submission
- ✅ Pricing page with 3-tier pricing cards
- ✅ FAQ page with search and category filtering
- ✅ Mobile responsive design
- ✅ Backend API endpoint `/api/contact` working

---

## 1) Objectives
- Rebuild webdesignpros365.com on Next.js 15 with Sanity.io CMS, deployed to Vercel (edge-ready), aligned with the WDP365 Handoff Guide.
- Deliver 8-pages, high-performance, animation-rich site (Framer Motion), with GEO-forward structure (LLMs.txt, semantic markup, strong SEO).
- Migrate key content from old site: logo, testimonials, client logos, service copy; adopt provided Envato SVG icon styles.
- Implement production-ready contact flow with reCAPTCHA v3 (placeholder), honeypot, rate limiting, and Resend email (placeholder, ready for keys).
- Hit performance targets (Lighthouse 90+, LCP <2.5s, CLS <0.1, global TTFB <100ms once on Vercel).

---

## 2) Implementation Steps

### Phase 1 — Core POC (Required; external integrations present)
Goal: Prove Sanity content fetch + secure contact flow (reCAPTCHA + rate-limit + Resend) in isolation before full build.

A. Integrations Playbooks (subagent)
- Request playbooks for: Sanity.io (content fetch/write), Resend (email), Google reCAPTCHA v3 (server verify).
- Capture required ENV and minimal test steps.

B. Minimal Repo + POC Code (exportable)
- Create Next.js 15 skeleton (App Router, TypeScript, Tailwind, Framer Motion).
- Add /lib/sanity/client.ts with ENV-driven config; /lib/sanity/queries.ts with sample GROQ.
- Define initial Sanity schemas: siteSettings, service, testimonial, logo, post.
- Create API route /api/contact (Edge/Node):
  - Validate honeypot and basic rate-limit (IP + 15-min window).
  - If RECAPTCHA keys present → verify token with Google endpoint; else fallback to SAFE_MOCK=true no-op path with clear logging.
  - If RESEND_API_KEY present → send email; else no-op with 200 + "placeholder" message.
- Add single "POC" page (e.g., /poc) that:
  - Renders first Sanity document title via client fetch.
  - Renders minimal contact form posting to /api/contact.

C. One Test Script (Node) — test_core.mjs
- sanityFetch() → fetch 1 document (expect object or empty gracefully if no project setup).
- contactFlow() → POST to /api/contact with honeypot empty, mock recaptcha token; expect 200 and structured JSON.
- resendNoKey() → assert graceful no-op path when RESEND_API_KEY missing.

D. POC Acceptance
- All POC endpoints respond 200 with deterministic JSON; graceful behavior without keys; logs indicate missing creds; schema compiles.

E. Phase 1 User Stories (min 5)
1. As a content editor, I can fetch a service entry via GROQ from Sanity.
2. As a site visitor, I can submit the contact form without spam triggers when legitimate.
3. As a security reviewer, I see server-side reCAPTCHA verification codepath (no-op until keys are added).
4. As an engineer, I see rate limiting prevent >5 submissions/15m per IP.
5. As an admin, I receive (or see no-op) Resend email action depending on key presence.

---

### Phase 2 — Full App Development
Goal: Complete all pages, CMS integration, animations, SEO/GEO, protections; deliver production-ready repo for Vercel.

1) Project Setup
- Dependencies: next@latest, react, framer-motion, tailwindcss, @sanity/client, groq, next-sitemap, class-variance-authority (optional), zod (form), axios/fetch.
- Repo structure: app/(routes), components/ui, lib/sanity, lib/seo, styles, public/icons.
- .env.example with: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN (optional), RESEND_API_KEY, RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY, SAFE_MOCK.

2) Sanity CMS
- Schemas: siteSettings, service (11 services), caseStudy, post, testimonial, teamMember, faq, pricingTier, logo.
- Seed content JSON (optional) + migration mapping from old assets (logos/testimonials/copy).
- GROQ queries for pages and listing components; ISR where useful.

3) Pages (8)
- Home: Hero (badges: Next.js, Vercel, Sanity, GEO), services preview, social proof (logos + testimonials), process timeline, pricing preview, tech stack, FAQ, CTA.
- Services: 11 services, filter tabs (All/Development/AI/Marketing/GEO), animated cards.
- Portfolio/Case Studies: grid/list with metrics, detail pages.
- Blog: listing + post detail (Sanity), categories.
- About: team, story, values; include old-site "Experience/Results" copy.
- Contact: protected form (honeypot + rate-limit + reCAPTCHA v3 placeholder), success/redirect UX.
- Pricing: comparison table for 4 tiers; Growth highlighted; CTA.
- FAQ: accordion; pull from Sanity.

4) Components & Animations
- Global header (sticky), mobile menu, footer; glassmorphism overlays where applicable.
- Framer Motion: hero load, staggered service cards, counters, testimonial carousel fade, page transitions.
- Use provided Envato SVG icons (outline/color) for services/features.

5) SEO/GEO & Performance
- Next.js Metadata API per route + next-sitemap (sitemap.xml, robots.txt).
- LLMs.txt endpoint with GEO details.
- Structured data (Organization, LocalBusiness, Service).
- Image optimization, font loading, route-level caching, edge-ready where beneficial.

6) Contact Flow & Protections
- Server: reCAPTCHA verify (when keys exist), honeypot, 5/15m IP rate-limit, Resend email (when key exists), clear JSON responses.
- Client: validation (zod), loading/error states, success redirect.

7) Analytics & Monitoring (placeholders)
- GA4 snippet placeholder; Vercel Analytics note in README.

8) Deliverables
- Full Next.js repository tree, Sanity schemas, .env.example, README (Vercel deploy steps).

9) Phase 2 User Stories (min 10)
1. As a visitor, I see a premium hero with animated badges and CTA.
2. As a buyer, I can filter services and open their details.
3. As a prospect, I can submit the contact form and get a clear success state.
4. As a marketer, I see pricing tiers with a highlighted plan and can request a consult.
5. As a researcher, I can read blog posts sourced from Sanity.
6. As a stakeholder, I can browse case studies with metrics and visuals.
7. As a mobile user, I can use the sticky header and mobile menu comfortably.
8. As an accessibility-minded user, focus states and alt text are present.
9. As an SEO/GEO reviewer, I find sitemaps, robots.txt, schema, and LLMs.txt.
10. As an admin, I can change content in Sanity and see it reflected on site.

10) Testing & QA
- Local runbook in README (pnpm dev, env setup, sanity config, create first docs).
- Automated checks: TypeScript build, ESLint, basic unit tests for utils.
- Final: Deploy to Vercel preview → Lighthouse (target 90+), visual QA.

---

## 3) Next Actions (Optional Enhancements)

### For the React Live Preview:
- [ ] Connect contact form to MongoDB for persistent storage
- [ ] Add Resend email integration (requires API key from user)
- [ ] Replace hardcoded content with dynamic data from backend
- [ ] Add portfolio project detail pages

### For Production Deployment (Next.js Project):
- [ ] User to download `/app/wdp365-nextjs-project.zip`
- [ ] Set up Sanity.io project and add credentials
- [ ] Add reCAPTCHA v3 site/secret keys
- [ ] Add Resend API key for email functionality
- [ ] Deploy to Vercel

---

## 4) Success Criteria
- POC: test_core.mjs passes all functions; /api/contact returns correct responses with/without keys; Sanity fetch works when IDs provided.
- App: 8 pages functional, CMS-powered where applicable, animations smooth (60fps), forms protected.
- SEO/GEO: Metadata per page, sitemap/robots/LLMs.txt present, structured data valid.
- Performance: Lighthouse ≥ 90 on key pages (Vercel preview), CLS < 0.1, LCP < 2.5s.
- Handoff: README with Vercel + Sanity setup, .env.example, clean repo ready for deploy.
