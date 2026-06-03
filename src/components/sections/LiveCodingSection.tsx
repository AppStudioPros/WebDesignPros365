'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, GitBranch, CheckCircle2, Cpu } from 'lucide-react';

// Mocked code "frames" that loop in the editor pane
const codeFrames = [
  {
    file: 'app/api/visibility/route.ts',
    lang: 'TypeScript',
    lines: [
      { c: '#A78BFA', t: 'import' }, { c: '#E5E7EB', t: ' { aci } ' }, { c: '#A78BFA', t: 'from' }, { c: '#E5E7EB', t: " '@/lib/aci';" },
      '\n',
      { c: '#A78BFA', t: 'export async function' }, { c: '#FBBF24', t: ' POST' }, { c: '#E5E7EB', t: '(req: Request) {' },
      '\n',
      { c: '#E5E7EB', t: '  ' }, { c: '#A78BFA', t: 'const' }, { c: '#E5E7EB', t: ' { url } = ' }, { c: '#A78BFA', t: 'await' }, { c: '#E5E7EB', t: ' req.json();' },
      '\n',
      { c: '#E5E7EB', t: '  ' }, { c: '#A78BFA', t: 'const' }, { c: '#E5E7EB', t: ' result = ' }, { c: '#A78BFA', t: 'await' }, { c: '#E5E7EB', t: ' aci.evaluate({' },
      '\n',
      { c: '#E5E7EB', t: '    methodology: ' }, { c: '#34D399', t: "'aci.visibility.v1'" }, { c: '#E5E7EB', t: ',' },
      '\n',
      { c: '#E5E7EB', t: '    auditTrail: ' }, { c: '#FBBF24', t: 'true' }, { c: '#E5E7EB', t: ',' },
      '\n',
      { c: '#E5E7EB', t: '    target: url,' },
      '\n',
      { c: '#E5E7EB', t: '  });' },
      '\n',
      { c: '#E5E7EB', t: '  ' }, { c: '#A78BFA', t: 'return' }, { c: '#E5E7EB', t: ' Response.json(result);' },
      '\n',
      { c: '#E5E7EB', t: '}' },
    ],
  },
  {
    file: 'app/agents/concierge.ts',
    lang: 'TypeScript',
    lines: [
      { c: '#A78BFA', t: 'export const' }, { c: '#FBBF24', t: ' concierge' }, { c: '#E5E7EB', t: ' = defineAgent({' },
      '\n',
      { c: '#E5E7EB', t: '  name: ' }, { c: '#34D399', t: "'Customer Concierge'" }, { c: '#E5E7EB', t: ',' },
      '\n',
      { c: '#E5E7EB', t: '  engine: ' }, { c: '#34D399', t: "'aci.acumen-7'" }, { c: '#E5E7EB', t: ',' },
      '\n',
      { c: '#E5E7EB', t: '  methodology: methodologyLib.brand,' },
      '\n',
      { c: '#E5E7EB', t: '  tools: [getCustomer, draftReply, logToCRM],' },
      '\n',
      { c: '#E5E7EB', t: '  guardrails: {' },
      '\n',
      { c: '#E5E7EB', t: '    hallucination: ' }, { c: '#34D399', t: "'forbid'" }, { c: '#E5E7EB', t: ',' },
      '\n',
      { c: '#E5E7EB', t: '    drift: ' }, { c: '#34D399', t: "'workspace-bound'" }, { c: '#E5E7EB', t: ',' },
      '\n',
      { c: '#E5E7EB', t: '    humanInLoop: ' }, { c: '#34D399', t: "'outbound-sends'" } as any, { c: '#E5E7EB', t: ',' },
      '\n',
      { c: '#E5E7EB', t: '  },' },
      '\n',
      { c: '#E5E7EB', t: '});' },
    ],
  },
  {
    file: 'supabase/migrations/0042_tenant_isolation.sql',
    lang: 'SQL',
    lines: [
      { c: '#A78BFA', t: 'CREATE POLICY' }, { c: '#FBBF24', t: ' tenant_isolation' }, { c: '#E5E7EB', t: ' ON public.contacts' },
      '\n',
      { c: '#E5E7EB', t: '  ' }, { c: '#A78BFA', t: 'FOR ALL' },
      '\n',
      { c: '#E5E7EB', t: '  ' }, { c: '#A78BFA', t: 'USING' }, { c: '#E5E7EB', t: ' (tenant_id = auth.tenant_id());' },
      '\n', '\n',
      { c: '#A78BFA', t: 'ALTER TABLE' }, { c: '#E5E7EB', t: ' public.contacts' },
      '\n',
      { c: '#E5E7EB', t: '  ' }, { c: '#A78BFA', t: 'ENABLE ROW LEVEL SECURITY' }, { c: '#E5E7EB', t: ';' },
    ],
  },
  {
    file: 'app/components/AnswerBlock.tsx',
    lang: 'TypeScript',
    lines: [
      { c: '#7DD3FC', t: '// FAQPage schema for AEO — direct-answer extraction' },
      '\n',
      { c: '#A78BFA', t: 'export function' }, { c: '#FBBF24', t: ' AnswerBlock' }, { c: '#E5E7EB', t: '({ q, a }: Props) {' },
      '\n',
      { c: '#E5E7EB', t: '  ' }, { c: '#A78BFA', t: 'return' }, { c: '#E5E7EB', t: ' (' },
      '\n',
      { c: '#E5E7EB', t: '    <' }, { c: '#FBBF24', t: 'article' }, { c: '#E5E7EB', t: ' itemScope itemType=' }, { c: '#34D399', t: '"schema.org/Question"' }, { c: '#E5E7EB', t: '>' },
      '\n',
      { c: '#E5E7EB', t: '      <h3 itemProp=' }, { c: '#34D399', t: '"name"' }, { c: '#E5E7EB', t: '>{q}</h3>' },
      '\n',
      { c: '#E5E7EB', t: '      <div itemProp=' }, { c: '#34D399', t: '"acceptedAnswer"' }, { c: '#E5E7EB', t: '>' },
      '\n',
      { c: '#E5E7EB', t: '        <p itemProp=' }, { c: '#34D399', t: '"text"' }, { c: '#E5E7EB', t: '>{a}</p>' },
      '\n',
      { c: '#E5E7EB', t: '      </div>' },
      '\n',
      { c: '#E5E7EB', t: '    </' }, { c: '#FBBF24', t: 'article' }, { c: '#E5E7EB', t: '>' },
      '\n',
      { c: '#E5E7EB', t: '  );' },
      '\n',
      { c: '#E5E7EB', t: '}' },
    ],
  },
];

// Terminal log lines that scroll past
const terminalLines = [
  { kind: 'cmd', text: '$ pnpm run build' },
  { kind: 'info', text: '▲ Next.js 16.1.6' },
  { kind: 'info', text: '   Creating optimized production build...' },
  { kind: 'ok', text: '✓ Compiled successfully in 11.2s' },
  { kind: 'info', text: '   Generating static pages (26/26)' },
  { kind: 'ok', text: '✓ Finalizing page optimization' },
  { kind: 'info', text: '   Route (app)              Size      First Load JS' },
  { kind: 'info', text: '   ┌ ○ /                    4.21 kB    108 kB' },
  { kind: 'info', text: '   ├ ○ /services/ai-visibility  7.84 kB  124 kB' },
  { kind: 'info', text: '   ├ ○ /platform-engineering   6.92 kB  121 kB' },
  { kind: 'info', text: '   └ ○ /partnerships           5.71 kB  116 kB' },
  { kind: 'cmd', text: '$ vercel deploy --prod' },
  { kind: 'info', text: '   Vercel CLI 38.2.0' },
  { kind: 'info', text: '   🔍  Inspect: vercel.com/wdp/...' },
  { kind: 'ok', text: '   ✅  Production: webdesignpros365.com [11s]' },
  { kind: 'cmd', text: '$ curl -s https://webdesignpros365.com/llms.txt | head -3' },
  { kind: 'info', text: '   # Web Design Pros 365' },
  { kind: 'info', text: '   > AI-native web development agency. Next.js 16 + React 19 + Vercel...' },
  { kind: 'ok', text: '   ACI architecture active · patent-protected' },
];

function CodePane({ frameIndex }: { frameIndex: number }) {
  const frame = codeFrames[frameIndex];
  return (
    <motion.div
      key={frameIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="font-mono text-[12.5px] leading-relaxed"
    >
      {frame.lines.map((tok, i) => {
        if (typeof tok === 'string') {
          return <span key={i}>{tok}</span>;
        }
        return (
          <span key={i} style={{ color: tok.c }}>
            {tok.t}
          </span>
        );
      })}
    </motion.div>
  );
}

export default function LiveCodingSection() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [terminalIndex, setTerminalIndex] = useState(0);

  // Rotate code frames every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setFrameIndex((i) => (i + 1) % codeFrames.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  // Rotate terminal lines every 1.2 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setTerminalIndex((i) => (i + 1) % terminalLines.length);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  const frame = codeFrames[frameIndex];
  // Show a rolling window of 7 terminal lines
  const visibleTerm = Array.from({ length: 7 }, (_, k) => {
    const idx = (terminalIndex + k) % terminalLines.length;
    return terminalLines[idx];
  });

  return (
    <section className="pt-8 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/70" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8734E1]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2F73EE]/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header — tightened to hug the section above */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0e6fb] border border-[#8734E1] text-[#8734E1] mb-4">
            <Code2 className="w-4 h-4" />
            <span className="text-sm font-mono font-medium">LIVE BUILD PIPELINE</span>
          </div>
          <h2 className="heading-lg mb-3">
            This is what <span className="gradient-text">modern looks like.</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real engineering, in your repo. Patent-anchored ACI architecture, audit-trail-complete AI,
            deployed on Vercel Edge. Not a no-code shell. Not a GoHighLevel wrapper. Your code, your stack.
          </p>
        </motion.div>

        {/* IDE + Terminal mock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Title bar */}
            <div className="bg-[#1a1a24] px-4 py-3 flex items-center gap-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              </div>
              <div className="flex-1 flex items-center gap-2 text-xs text-white/50 font-mono">
                <GitBranch className="w-3.5 h-3.5" />
                <span>main</span>
                <span className="text-white/30">·</span>
                <span>{frame.file}</span>
                <span className="text-white/30">·</span>
                <span className="text-[#8734E1]">{frame.lang}</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-xs text-white/40">
                <Cpu className="w-3 h-3 text-emerald-400" />
                <span>ACI active</span>
              </div>
            </div>

            {/* Two-column body: code editor + terminal */}
            <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[360px]">
              {/* Editor pane */}
              <div className="lg:col-span-3 p-5 border-r border-white/10 relative">
                {/* Line numbers gutter */}
                <div className="absolute left-0 top-5 bottom-5 w-8 flex flex-col items-end pr-2 text-[11px] text-white/20 font-mono leading-relaxed">
                  {Array.from({ length: 14 }, (_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </div>
                <div className="pl-8 whitespace-pre-wrap">
                  <CodePane frameIndex={frameIndex} />
                </div>
                {/* Frame indicator dots */}
                <div className="absolute bottom-3 right-4 flex gap-1.5">
                  {codeFrames.map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === frameIndex ? 'bg-[#8734E1] w-4' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Terminal pane */}
              <div className="lg:col-span-2 bg-[#0f0f17] p-5 font-mono text-[11.5px] leading-relaxed">
                <div className="flex items-center gap-2 text-xs text-white/40 mb-3 pb-2 border-b border-white/10">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>build · deploy · verify</span>
                </div>
                <div className="space-y-0.5">
                  {visibleTerm.map((line, i) => {
                    const colorClass =
                      line.kind === 'cmd'
                        ? 'text-[#BF5DE0]'
                        : line.kind === 'ok'
                          ? 'text-emerald-400'
                          : 'text-white/60';
                    const opacity = i === 0 ? 'opacity-100' : i < 4 ? 'opacity-80' : 'opacity-40';
                    return (
                      <motion.div
                        key={`${terminalIndex}-${i}`}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`${colorClass} ${opacity} truncate`}
                      >
                        {line.kind === 'ok' ? (
                          <span className="inline-flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3" />
                            {line.text.replace(/^✓\s|^✅\s\s/, '')}
                          </span>
                        ) : (
                          <span>{line.text}</span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Status footer */}
            <div className="bg-[#1a1a24] px-4 py-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Production
                </span>
                <span>iad1.vercel.app</span>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <span>p95 87ms</span>
                <span>·</span>
                <span>LCP 0.9s</span>
                <span>·</span>
                <span className="text-[#BF5DE0]">No hallucination · No drift · Human-in-loop</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
