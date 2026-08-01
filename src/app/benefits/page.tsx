"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { TrendingUp, DollarSign, Users, Zap, Shield, CheckCircle2, ArrowRight, BarChart3, ChevronDown, ChevronUp, Building2 } from 'lucide-react';

/* ── Animated counter ────────────────────── */
function Counter({ target, prefix = "", suffix = "", duration = 1800 }: { target: number; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ── FAQ item ────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${open ? "rgba(135,52,225,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius: 12, padding: "20px 24px", cursor: "pointer", transition: "border-color 0.2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <p style={{ color: "#f0eef8", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.5, margin: 0 }}>{q}</p>
        <span style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
      </div>
      {open && <p style={{ color: "#a8a4c8", fontSize: "0.88rem", lineHeight: 1.75, marginTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14 }}>{a}</p>}
    </div>
  );
}

const MATH_ROWS = [
  { los: 10, extra: 15, perLoan: 2000, label: "Small team (10 LOs)" },
  { los: 25, extra: 18, perLoan: 2000, label: "Mid-size company (25 LOs)" },
  { los: 50, extra: 20, perLoan: 2500, label: "Regional firm (50 LOs)" },
];

export default function BenefitsPage() {
  const [activeRow, setActiveRow] = useState(1);

  return (
    <div style={{ background: "#0f0e1a", minHeight: "100vh", fontFamily: "'Poppins', system-ui, sans-serif", color: "#f0eef8" }}>

      {/* Nav */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(15,14,26,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: "1rem", color: "#f0eef8", textDecoration: "none" }}>
            WebDesignPros<span style={{ color: "#8734E1" }}>365</span>
          </Link>

        </div>
      </div>

      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(circle, rgba(135,52,225,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(135,52,225,0.15)", border: "1px solid rgba(135,52,225,0.4)", borderRadius: 24, padding: "6px 18px", marginBottom: 24 }}>
            <Building2 size={14} color="#c084fc" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#c084fc", letterSpacing: "0.08em", textTransform: "uppercase" }}>For Mortgage Company Owners</span>
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: 24 }}>
            One policy decision.<br />
            <span style={{ background: "linear-gradient(135deg, #8734E1, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hundreds of thousands in new revenue.</span>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#a8a4c8", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 16px" }}>
            Require your loan officers to maintain a modern, AI-optimized website through our partner program. It costs you nothing. Your LOs pay for their own sites. But every extra loan they close because of it goes straight to your bottom line.
          </p>
          <p style={{ fontSize: "1rem", color: "#8734E1", fontWeight: 700, marginBottom: 40 }}>Zero cost to you. 50–100% more inbound loans per LO. Every year.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#math" style={{ background: "linear-gradient(135deg, #8734E1, #a855f7)", color: "#fff", fontWeight: 700, padding: "14px 32px", borderRadius: 10, textDecoration: "none", fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: 8 }}>
              Show Me the Math <ArrowRight size={16} />
            </a>
            <a href="mailto:info@webdesignpros365.com" style={{ border: "1.5px solid rgba(255,255,255,0.15)", color: "#f0eef8", fontWeight: 600, padding: "14px 32px", borderRadius: 10, textDecoration: "none", fontSize: "0.95rem" }}>
              Talk to Us
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, textAlign: "center" }}>
          {[
            { n: 70, suf: "%+", label: "of borrowers vet LOs using AI" },
            { n: 50, suf: "–100%", label: "more inbound leads per LO" },
            { n: 0, suf: "", label: "dollars out of your pocket", prefix: "$" },
            { n: 24, suf: "hrs", label: "avg. pre-approval turnaround" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                <Counter target={s.n} prefix={s.prefix} suffix={s.suf} />
              </div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", marginTop: 8, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The case */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-block", background: "rgba(135,52,225,0.15)", border: "1px solid rgba(135,52,225,0.3)", borderRadius: 24, padding: "5px 18px", marginBottom: 16, fontSize: "0.72rem", fontWeight: 700, color: "#c084fc", letterSpacing: "0.08em", textTransform: "uppercase" }}>The Reality</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, marginBottom: 16 }}>Your LOs are invisible where borrowers are looking.</h2>
            <p style={{ color: "#a8a4c8", fontSize: "1rem", lineHeight: 1.8, maxWidth: 580, margin: "0 auto" }}>Today, 70–80% of borrowers use AI tools — ChatGPT, Perplexity, Google AI — before they ever call a loan officer. If your LO isn't showing up in those answers, they don't exist.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { icon: BarChart3, color: "#8734E1", title: "The old way is dying", body: "A static WordPress site with a headshot and a phone number used to be enough. It isn't anymore. Borrowers Google LOs, check AI summaries, and form opinions before picking up the phone. If that search returns nothing — or worse, a broken site — the deal is already gone." },
              { icon: Zap, color: "#e5ab44", title: "AI-optimized presence wins", body: "Our sites are built with AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) baked in. When someone asks ChatGPT 'Who is a good loan officer in Braselton?' — your LOs show up. That's not marketing. That's a structural advantage." },
              { icon: TrendingUp, color: "#4ade80", title: "More loans. No extra effort.", body: "Your LOs don't work harder. They just become findable to the borrowers who were already looking. That incremental visibility translates directly into more pre-approval conversations — and more closed loans that your company earns on." },
            ].map((card, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${card.color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <card.icon size={20} color={card.color} />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 10, color: "#f0eef8" }}>{card.title}</h3>
                <p style={{ fontSize: "0.86rem", color: "#a8a4c8", lineHeight: 1.75 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The math */}
      <section id="math" style={{ padding: "80px 24px", background: "rgba(135,52,225,0.04)", borderTop: "1px solid rgba(135,52,225,0.12)", borderBottom: "1px solid rgba(135,52,225,0.12)" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", background: "rgba(135,52,225,0.15)", border: "1px solid rgba(135,52,225,0.3)", borderRadius: 24, padding: "5px 18px", marginBottom: 16, fontSize: "0.72rem", fontWeight: 700, color: "#c084fc", letterSpacing: "0.08em", textTransform: "uppercase" }}>The Math</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, marginBottom: 12 }}>What does 50% more loans look like for your company?</h2>
            <p style={{ color: "#a8a4c8", fontSize: "0.95rem" }}>Select your company size to see the revenue impact.</p>
          </div>

          {/* Selector */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            {MATH_ROWS.map((row, i) => (
              <button key={i} onClick={() => setActiveRow(i)}
                style={{ padding: "10px 22px", borderRadius: 8, border: `1.5px solid ${activeRow === i ? "#8734E1" : "rgba(255,255,255,0.12)"}`, background: activeRow === i ? "rgba(135,52,225,0.2)" : "transparent", color: activeRow === i ? "#c084fc" : "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit" }}>
                {row.label}
              </button>
            ))}
          </div>

          {/* Math card */}
          {(() => {
            const row = MATH_ROWS[activeRow];
            const extraLoans = row.los * row.extra;
            const revenue = extraLoans * row.perLoan;
            return (
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(135,52,225,0.25)", borderRadius: 20, padding: "36px 40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32, marginBottom: 32 }}>
                  {[
                    { label: "Loan officers", value: `${row.los}` },
                    { label: "Extra loans/LO/year", value: `+${row.extra}` },
                    { label: "Avg. company earn/loan", value: `$${row.perLoan.toLocaleString()}` },
                    { label: "Extra revenue/year", value: `$${revenue.toLocaleString()}`, highlight: true },
                  ].map((item, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "1.9rem", fontWeight: 900, color: item.highlight ? "#c084fc" : "#fff", lineHeight: 1 }}>{item.value}</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{item.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, textAlign: "center" }}>
                  <p style={{ color: "#a8a4c8", fontSize: "0.88rem", lineHeight: 1.7 }}>
                    <strong style={{ color: "#fff" }}>${revenue.toLocaleString()} in additional annual revenue</strong> — from a policy that costs you absolutely nothing. Your LOs fund their own sites ($1,999.99 each, one-time). You collect on every loan they close.
                  </p>
                </div>
              </div>
            );
          })()}

          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", marginTop: 16 }}>
            Projections based on 50% inbound lead increase and estimated company revenue per closed loan. Actual results vary by market, LO performance, and loan volume.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", background: "rgba(135,52,225,0.15)", border: "1px solid rgba(135,52,225,0.3)", borderRadius: 24, padding: "5px 18px", marginBottom: 16, fontSize: "0.72rem", fontWeight: 700, color: "#c084fc", letterSpacing: "0.08em", textTransform: "uppercase" }}>What You Get</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, marginBottom: 12 }}>Everything your LOs get. Zero cost to you.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {[
              "Premium Next.js website per LO — built to convert",
              "AI chatbot trained on each LO's programs and service area",
              "AABOS pre-approval flow — captures leads 24/7",
              "AEO + GEO optimization — LOs appear in AI search results",
              "NMLS-compliant compliance footer and disclosure pages",
              "Admin analytics panel — LOs see their own lead data",
              "Company branding alongside LO's personal brand",
              "Rate alert capture — builds LO's pipeline automatically",
              "Realtor co-brand pages — expands referral network",
              "Ongoing updates included — not a one-time build",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
                <CheckCircle2 size={16} color="#8734E1" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: "0.86rem", color: "#c8c4e0", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why make it policy */}
      <section style={{ padding: "80px 24px", background: "rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(135,52,225,0.15)", border: "1px solid rgba(135,52,225,0.3)", borderRadius: 24, padding: "5px 18px", marginBottom: 16, fontSize: "0.72rem", fontWeight: 700, color: "#c084fc", letterSpacing: "0.08em", textTransform: "uppercase" }}>Why Make It Policy</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, marginBottom: 20 }}>Optional doesn't work. Policy does.</h2>
          <p style={{ color: "#a8a4c8", lineHeight: 1.8, marginBottom: 48, fontSize: "0.95rem" }}>
            When digital presence is optional, only your most proactive LOs take action. When it's policy, every LO in your company becomes a digital asset — and your company brand compounds across every one of their sites.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, textAlign: "left", marginBottom: 48 }}>
            <div style={{ background: "rgba(255,59,59,0.06)", border: "1px solid rgba(255,59,59,0.15)", borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,100,100,0.8)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Without Policy</div>
              {["2-3 tech-savvy LOs adopt, rest do nothing", "Inconsistent brand presence across your team", "Borrowers find your LOs in some markets, not others", "Lost loans you never know about", "Competitors with mandated digital standards recruit away your top LOs"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: "rgba(255,100,100,0.7)", fontSize: "0.9rem", flexShrink: 0 }}>✗</span>
                  <span style={{ fontSize: "0.83rem", color: "#8a87a8", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(135,52,225,0.06)", border: "1px solid rgba(135,52,225,0.2)", borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#c084fc", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>With Policy</div>
              {["Every LO has a modern, AI-visible presence", "Consistent company brand amplified across all markets", "Borrowers find your team wherever they search", "More loans. More revenue. No extra hiring.", "Premium digital standard becomes a recruiting tool"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <CheckCircle2 size={14} color="#8734E1" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: "0.83rem", color: "#c8c4e0", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, marginBottom: 8 }}>Common questions from owners</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { q: "What does this actually cost my company?", a: "Nothing. Each loan officer pays for their own site — $1,999.99 one-time for the full build. You issue a policy, we handle everything else. You don't write a check. You collect on every extra loan they close." },
              { q: "How do we know this actually increases loan volume?", a: "Modern AI-optimized sites dramatically increase organic and AI-driven discovery. 70-80% of borrowers research loan officers using AI tools before making contact. LOs with no digital presence simply don't exist to this audience. More discovery = more pre-approval conversations = more closed loans." },
              { q: "What if an LO leaves the company?", a: "The LO owns their site — it's their asset. When they move on, the site moves with them. But the institutional knowledge, brand standards, and policy infrastructure you've built stays with your company, and onboarding the next LO through the same program is seamless." },
              { q: "Will our company branding appear on these sites?", a: "Yes. Every site can include company branding alongside the individual LO's personal brand. NMLS company numbers, Equal Housing Lender disclosures, and company contact information are all included as standard." },
              { q: "How do we roll this out across our team?", a: "Simple. You tell your LOs the program exists, provide them the link, and set the expectation. We handle onboarding, building, and support for each LO individually. You make one decision; we execute it across your entire team." },
            ].map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #1a0f35, #2d1458)", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>Ready to turn your whole team into digital assets?</h2>
          <p style={{ color: "#a8a4c8", lineHeight: 1.8, marginBottom: 36, fontSize: "0.95rem" }}>One conversation. One decision. Revenue that compounds every year your LOs close loans.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:info@webdesignpros365.com" style={{ background: "linear-gradient(135deg, #8734E1, #a855f7)", color: "#fff", fontWeight: 700, padding: "16px 36px", borderRadius: 10, textDecoration: "none", fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: 8 }}>
              Talk to Us <ArrowRight size={16} />
            </a>
            <Link href="/partnerprogram" style={{ border: "1.5px solid rgba(255,255,255,0.2)", color: "#f0eef8", fontWeight: 600, padding: "16px 36px", borderRadius: 10, textDecoration: "none", fontSize: "0.95rem" }}>
              View the LO Package
            </Link>
          </div>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", marginTop: 24 }}>No obligation. No pitch deck. Just a straight conversation about what this looks like for your company.</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0a0917", padding: "28px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>
          &copy; {new Date().getFullYear()} WebDesignPros365. All rights reserved. |{" "}
          <Link href="/privacy" style={{ color: "rgba(255,255,255,0.35)" }}>Privacy</Link>{" "}&middot;{" "}
          <Link href="/terms" style={{ color: "rgba(255,255,255,0.35)" }}>Terms</Link>
        </p>
      </footer>

    </div>
  );
}
