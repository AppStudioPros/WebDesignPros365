'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Loader2, ArrowRight, CheckCircle, XCircle, AlertCircle, ChevronRight } from 'lucide-react'

interface RankingResult {
  position: number | null
  tier: 'top25' | 'top100' | 'below100'
  snippet: string | null
  title: string | null
  query: string
}

type TechCategory = 'builder' | 'analytics' | 'crm' | 'chat' | 'ecommerce' | 'seo' | 'marketing' | 'payments' | 'booking' | 'video' | 'hosting' | 'framework'

interface TechItem {
  name: string
  category: TechCategory
  weight: 'heavy' | 'medium' | 'light'
  impact: string
}

interface ScanResult {
  domain: string
  ranking: RankingResult | null
  techStack: TechItem[]
  scores: {
    performance:   number | null
    seo:           number | null
    accessibility: number | null
    security:      number
    ai_readiness:  number
  }
  flags: {
    hasSchema:    boolean
    hasFAQ:       boolean
    hasOG:        boolean
    descTooLong:  boolean
    secChecks:    number
  }
  platform: {
    platform:  string
    slug:      string
    painPoint: string
    cta:       string
  }
  plugins: { name: string; weight: 'heavy' | 'medium'; impact: string }[]
  analysis: {
    problem:   string
    quick_win: string
    ai_gap:    string
  }
  lcp: string | null
}

function ScoreRing({ score, label, color }: { score: number | null; label: string; color: string }) {
  const getColor = (s: number) => {
    if (s >= 80) return 'text-emerald-500'
    if (s >= 60) return 'text-amber-500'
    return 'text-red-500'
  }
  const getBg = (s: number) => {
    if (s >= 80) return 'bg-emerald-500/10 border-emerald-500/20'
    if (s >= 60) return 'bg-amber-500/10 border-amber-500/20'
    return 'bg-red-500/10 border-red-500/20'
  }
  if (score === null) return (
    <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-gray-50 border-gray-200">
      <span className="text-2xl font-black font-mono text-gray-300">—</span>
      <span className="text-[10px] text-gray-400 font-medium text-center leading-tight">{label}</span>
    </div>
  )
  return (
    <div className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border ${getBg(score)}`}>
      <span className={`text-2xl font-black font-mono ${getColor(score)}`}>{score}</span>
      <span className="text-[10px] text-gray-500 font-medium text-center leading-tight">{label}</span>
    </div>
  )
}

function Flag({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[12px]">
      {ok
        ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        : <XCircle    className="w-3.5 h-3.5 text-red-400 shrink-0" />
      }
      <span className={ok ? 'text-gray-400' : 'text-gray-300 font-medium'}>{label}</span>
    </div>
  )
}

export default function SiteAuditScanner() {
  const domainRef = useRef<HTMLInputElement>(null)
  const [domain,       setDomain]       = useState('')
  const [email,        setEmail]        = useState('')
  const [keyword,      setKeyword]      = useState('')
  const [location,     setLocation]     = useState('')

  // Listen for pre-fill from hero scan form
  useEffect(() => {
    function handleHeroScan(e: Event) {
      const d = (e as CustomEvent).detail?.domain
      if (d) {
        setDomain(d)
        setTimeout(() => domainRef.current?.focus(), 300)
      }
    }
    window.addEventListener('hero-scan', handleHeroScan)
    return () => window.removeEventListener('hero-scan', handleHeroScan)
  }, [])
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [loading,      setLoading]      = useState(false)
  const [result,       setResult]       = useState<ScanResult | null>(null)
  const [error,        setError]        = useState<string | null>(null)
  const [step,         setStep]         = useState<'form' | 'scanning' | 'results'>('form')

  const logs = [
    'Connecting to site infrastructure...',
    'Running mobile performance test...',
    'Checking AI readiness signals...',
    'Analyzing structured data markup...',
    'Scanning security headers...',
    'Running SEO audit...',
    'Generating your report...',
  ]
  const [logIndex, setLogIndex] = useState(0)

  function isValidDomain(input: string): boolean {
    const cleaned = input.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '')
    // Must have at least one dot, no spaces, valid TLD pattern
    return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/.test(cleaned)
  }

  async function handleScan(e: React.FormEvent) {
    e.preventDefault()
    if (!domain.trim()) return
    if (!isValidDomain(domain)) {
      setError('Please enter a valid website address — e.g. www.yoursite.com')
      return
    }

    setLoading(true)
    setError(null)
    setStep('scanning')
    setLogIndex(0)

    // Animate logs — stop at second-to-last, hold until API responds
    const interval = setInterval(() => {
      setLogIndex(prev => Math.min(prev + 1, logs.length - 2))
    }, 1200)

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domain.trim(),
          email: email.trim() || '',
          keyword: keyword.trim() || '',
          location: location.trim() || '',
        }),
      })
      clearInterval(interval)
      const contentType = res.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        throw new Error('Scan took too long. Please try again.')
      }
      let data: any
      try {
        data = await res.json()
      } catch {
        throw new Error('Scan took too long. Please try again.')
      }
      if (!res.ok) throw new Error(data?.error || 'Scan failed.')
      // Flash to 100% then show results
      clearInterval(interval)
      setLogIndex(logs.length - 1)
      await new Promise(r => setTimeout(r, 600))
      setResult(data)
      setStep('results')
    } catch (err: any) {
      clearInterval(interval)
      setError(err.message || 'Something went wrong.')
      setStep('form')
    } finally {
      setLoading(false)
    }
  }

  const calLink = `https://calendly.com/webdesignpros365/consultation?email=${encodeURIComponent(email)}&a1=${encodeURIComponent(domain)}`

  return (
    <section id="site-scanner" className="section bg-gradient-to-b from-white to-[#f8f9fc] py-20">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8734E1] bg-[#f0e6fb] px-3 py-1 rounded-full mb-4">
            Free Site Audit
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Get a comprehensive analysis of your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F73EE] to-[#8734E1]">
              digital reach
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Real scan. Real scores. We check performance, SEO, security, and whether AI like ChatGPT is even able to recommend you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">

          {/* FORM */}
          {step === 'form' && (
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}
              <form onSubmit={handleScan} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block">Your Website</label>
                  <input
                    ref={domainRef}
                    type="text"
                    value={domain}
                    onChange={e => setDomain(e.target.value)}
                    placeholder="e.g. www.yoursite.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#8734E1] focus:ring-2 focus:ring-[#8734E1]/10 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block">
                      Target Keyword <span className="text-gray-400 font-normal normal-case">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={keyword}
                      onChange={e => setKeyword(e.target.value)}
                      placeholder="e.g. web design"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#8734E1] focus:ring-2 focus:ring-[#8734E1]/10 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block">
                      Location <span className="text-gray-400 font-normal normal-case">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g. Denver CO"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#8734E1] focus:ring-2 focus:ring-[#8734E1]/10 transition-all"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!domain}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2F73EE] to-[#8734E1] text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#8734E1]/20"
                >
                  <Search className="w-4 h-4" /> Scan My Website Free
                </button>
                <p className="text-center text-[11px] text-gray-400">No credit card. No install. Results in about 30 seconds.</p>
              </form>
            </div>
          )}

          {/* SCANNING */}
          {step === 'scanning' && (
            <div className="bg-[#0d0d14] rounded-2xl border border-white/5 p-8 min-h-[260px] flex gap-6 items-center">
              {/* Log lines — left, takes remaining space */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-5">
                  <Loader2 className="w-4 h-4 text-[#8734E1] animate-spin shrink-0" />
                  <span className="text-sm font-bold text-white">Scanning {domain}...</span>
                </div>
                <div className="space-y-3">
                  {logs.slice(0, logIndex + 1).map((log, i) => (
                    <div key={i} className={`text-[15px] font-bold font-mono flex items-center gap-2.5 transition-colors duration-500 ${
                      i < logIndex
                        ? 'text-emerald-400'
                        : i === logIndex
                        ? 'text-[#8734E1]'
                        : 'text-gray-600'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                      {log}
                    </div>
                  ))}
                </div>
              </div>
              {/* % counter — fixed width right column, always centered */}
              <div className="shrink-0 w-36 flex flex-col items-center justify-center self-stretch">
                <div className="relative leading-none">
                  <span className="text-8xl font-black font-mono text-yellow-400 tabular-nums transition-all duration-300">
                    {logIndex >= logs.length - 1 ? 100 : Math.round((logIndex / (logs.length - 1)) * 95)}
                  </span>
                  <span className="absolute -top-2 -right-6 text-2xl font-black font-mono text-yellow-400">%</span>
                </div>
                <span className="text-gray-500 text-[10px] font-mono mt-3 uppercase tracking-widest">complete</span>
              </div>
            </div>
          )}

          {/* RESULTS */}
          {step === 'results' && result && (
            <div className="space-y-4">

              {/* Platform detection banner */}
              {result.platform.slug !== 'unknown' && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2 shrink-0">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="text-sm font-bold text-red-700">Built on {result.platform.platform}</span>
                  </div>
                  <p className="text-[12px] text-red-600 leading-relaxed flex-1">{result.platform.painPoint}</p>
                  <span className="shrink-0 text-[11px] font-bold text-red-700 bg-red-100 border border-red-200 px-3 py-1 rounded-full whitespace-nowrap">
                    We can fix this
                  </span>
                </div>
              )}

              {/* Score grid */}
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-sm">Scores for <span className="text-[#8734E1]">{result.domain}</span></h3>
                  <span className="text-[10px] text-gray-400 font-mono">Just scanned</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  <ScoreRing score={result.scores.performance}   label="Speed"       color="blue" />
                  <ScoreRing score={result.scores.seo}           label="SEO"         color="green" />
                  <ScoreRing score={result.scores.accessibility} label="Access."     color="purple" />
                  <ScoreRing score={result.scores.security}      label="Security"    color="orange" />
                  <ScoreRing score={result.scores.ai_readiness}  label="AI Ready"    color="pink" />
                </div>
              </div>

              {/* Google Ranking */}
              {result.ranking && (
                <div className={`rounded-2xl border p-5 ${
                  result.ranking.tier === 'top25'
                    ? 'bg-emerald-50 border-emerald-200'
                    : result.ranking.tier === 'top100'
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Search className={`w-4 h-4 ${
                        result.ranking.tier === 'top25' ? 'text-emerald-600'
                        : result.ranking.tier === 'top100' ? 'text-amber-600'
                        : 'text-red-500'
                      }`} />
                      <span className="text-sm font-bold text-gray-800">Google Ranking</span>
                      <span className="text-[13px] font-bold text-gray-600">"{result.ranking.query}"</span>
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                      result.ranking.tier === 'top25'
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                        : result.ranking.tier === 'top100'
                        ? 'bg-amber-100 text-amber-700 border-amber-300'
                        : 'bg-red-100 text-red-600 border-red-200'
                    }`}>
                      {result.ranking.tier === 'top25' ? '🏆 Top 25'
                        : result.ranking.tier === 'top100' ? '📊 Top 100'
                        : '❌ Below Top 100'}
                    </span>
                  </div>
                  {result.ranking.position ? (
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-black font-mono ${
                        result.ranking.tier === 'top25' ? 'text-emerald-600'
                        : result.ranking.tier === 'top100' ? 'text-amber-600'
                        : 'text-red-500'
                      }`}>#{result.ranking.position}</span>
                      <span className="text-sm text-gray-500">in Google organic results</span>
                    </div>
                  ) : (
                    <p className="text-sm text-red-600 font-medium">Not found in the top 100 results</p>
                  )}
                  {result.ranking.snippet && (
                    <p className="mt-2 text-[11px] text-gray-500 italic leading-relaxed line-clamp-2">{result.ranking.snippet}</p>
                  )}
                  {result.ranking.tier !== 'top25' && (
                    <p className="mt-2 text-[11px] font-medium text-gray-600">
                      {result.ranking.tier === 'top100'
                        ? 'You\'re ranking but not on page 1. Our AI Visibility Stack can move you up.'
                        : 'You\'re not showing up for this search. Customers can\'t find you here.'}
                    </p>
                  )}
                </div>
              )}

              {/* Flags + Analysis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left — Checklist */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-md shadow-gray-100 p-5 space-y-2.5">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Checklist</h4>
                  <Flag ok={result.flags.hasSchema}          label="Structured data (Schema.org)" />
                  <Flag ok={result.flags.hasFAQ}             label="FAQ content for AI answers" />
                  <Flag ok={result.flags.hasOG}              label="Social sharing (OG tags)" />
                  <Flag ok={!result.flags.descTooLong}       label="Meta description length" />
                  <Flag ok={result.flags.secChecks >= 4}     label="Security headers" />
                  <div className="pt-1 border-t border-gray-100 mt-1 space-y-2">
                    {result.ranking && result.ranking.query ? (
                      <>
                        <div className="flex items-start gap-2 text-[12px]">
                          <Search className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            result.ranking.tier === 'top25' ? 'text-emerald-500'
                            : result.ranking.tier === 'top100' ? 'text-amber-500'
                            : 'text-red-400'
                          }`} />
                          <div>
                            <span className={`font-bold block ${
                              result.ranking.tier === 'top25' ? 'text-emerald-600'
                              : result.ranking.tier === 'top100' ? 'text-amber-600'
                              : 'text-red-500'
                            }`}>
                              {result.ranking.position
                                ? `Google Rank: #${result.ranking.position}`
                                : 'Not in top 100 results'}
                            </span>
                            <span className="text-gray-400 text-[11px]">for "{result.ranking.query}"</span>
                          </div>
                        </div>
                        {(result.ranking.tier === 'below100' || !result.ranking.position) && (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                            <p className="text-[12px] font-bold text-red-600 leading-snug">
                              You are getting ghosted by thousands of potential clients.
                            </p>
                            <p className="text-[11px] text-red-500 mt-1 leading-relaxed">
                              Switching to the Ultimate AI Tech Stack is a game changer — customers searching right now can't find you.
                            </p>
                          </div>
                        )}
                      </>
                    ) : keyword.trim() ? (
                      <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <Search className="w-3 h-3 shrink-0" />
                        <span>Google rank check unavailable — retry scan</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <Search className="w-3 h-3 shrink-0" />
                        <span>Add a keyword above to see Google rank</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right — What this means */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-md shadow-gray-100 p-5 space-y-3">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">What this means</h4>
                  <p className="text-[12px] text-gray-600 leading-relaxed">{result.analysis.problem}</p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <p className="text-[11px] font-semibold text-purple-700 mb-1">AI visibility gap:</p>
                    <p className="text-[11px] text-purple-600 leading-relaxed">{result.analysis.ai_gap}</p>
                  </div>
                </div>
              </div>

              {/* Ultimate AI Tech Stack Difference */}
              <div className="bg-gradient-to-br from-[#0d0d14] to-[#1a0a2e] rounded-2xl border border-[#8734E1]/30 p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <h4 className="text-base font-extrabold text-white leading-tight">
                    Ultimate AI Tech Stack Difference
                  </h4>
                  <div className="shrink-0 text-right">
                    <p className="text-[10px] text-[#8734E1] font-bold uppercase tracking-wider">Estimated Year 1 ROI</p>
                    <p className="text-2xl font-black text-emerald-400 leading-none">$120K–$180K</p>
                    <p className="text-[9px] text-gray-500 mt-0.5">avg for $500K+ revenue businesses</p>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">
                  Switching to the Next.js + Vercel + Python AI stack gives you the ultimate visibility across all three search channels:
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#2F73EE]/20 border border-[#2F73EE]/40 flex items-center justify-center text-[9px] font-black text-[#2F73EE]">1</span>
                    <div>
                      <span className="text-[12px] font-bold text-white">SEO — Search Engine Optimization</span>
                      <p className="text-[11px] text-gray-400 leading-relaxed">Top-10 Google rankings through perfect Core Web Vitals, structured data, and a codebase search engines can actually read.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#EC4899]/20 border border-[#EC4899]/40 flex items-center justify-center text-[9px] font-black text-[#EC4899]">2</span>
                    <div>
                      <span className="text-[12px] font-bold text-white">AEO — AI Answer Engine Optimization</span>
                      <p className="text-[11px] text-gray-400 leading-relaxed">Direct answer slots in Google AI Overviews, Siri, and voice search — putting your business at position zero before competitors even know it exists.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#8734E1]/20 border border-[#8734E1]/40 flex items-center justify-center text-[9px] font-black text-[#8734E1]">3</span>
                    <div>
                      <span className="text-[12px] font-bold text-white">GEO — Generative Engine Optimization</span>
                      <p className="text-[11px] text-gray-400 leading-relaxed">Cited by ChatGPT, Perplexity, and Gemini when customers ask about your industry — the fastest-growing traffic source in 2025.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-[10px] text-gray-500 italic">ROI estimate based on avg 2-3x conversion improvement from PageSpeed 30→90+ and 20-40% organic traffic gain from AI search visibility. Individual results vary.</p>
                </div>
              </div>

              {/* Plugin detection */}
              {result.plugins.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-md shadow-gray-100 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Plugins & Scripts Detected</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${result.plugins.filter(p => p.weight === 'heavy').length > 0 ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}`}>
                      {result.plugins.length} found · {result.plugins.filter(p => p.weight === 'heavy').length} heavy
                    </span>
                  </div>
                  <div className="space-y-2">
                    {result.plugins.map((plugin, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className={`shrink-0 mt-0.5 w-2 h-2 rounded-full ${plugin.weight === 'heavy' ? 'bg-red-400' : 'bg-amber-400'}`} />
                        <div>
                          <span className="text-[12px] font-semibold text-gray-700">{plugin.name}</span>
                          <span className="text-[11px] text-gray-400 ml-2">{plugin.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {result.plugins.filter(p => p.weight === 'heavy').length >= 2 && (
                    <p className="mt-3 text-[11px] text-red-500 font-medium border-t border-gray-100 pt-3">
                      ⚠️ {result.plugins.filter(p => p.weight === 'heavy').length} heavy plugins detected — this is likely adding 2-4 seconds to your load time.
                    </p>
                  )}
                </div>
              )}

              {/* Tech Stack */}
              {result.techStack && result.techStack.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-md shadow-gray-100 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Tech Stack Detected</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                      {result.techStack.length} tools found
                    </span>
                  </div>
                  {(() => {
                    const categoryLabels: Record<TechCategory, string> = {
                      hosting: '🏠 Platform / Hosting',
                      builder: '🔧 Page Builders',
                      analytics: '📊 Analytics',
                      crm: '👥 CRM',
                      marketing: '📣 Marketing',
                      chat: '💬 Chat / Support',
                      ecommerce: '🛒 E-Commerce',
                      payments: '💳 Payments',
                      booking: '📅 Booking',
                      video: '🎥 Video',
                      seo: '🔍 SEO Tools',
                      framework: '⚡ Framework',
                    }
                    const grouped = result.techStack.reduce((acc, item) => {
                      if (!acc[item.category]) acc[item.category] = []
                      acc[item.category].push(item)
                      return acc
                    }, {} as Record<string, TechItem[]>)
                    const order: TechCategory[] = ['hosting', 'framework', 'builder', 'analytics', 'crm', 'marketing', 'chat', 'ecommerce', 'payments', 'booking', 'video', 'seo']
                    return order.filter(cat => grouped[cat]?.length).map(cat => (
                      <div key={cat} className="mb-3 last:mb-0">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">{categoryLabels[cat]}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {grouped[cat].map((item, i) => (
                            <div key={i} className="group relative">
                              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border cursor-default ${
                                item.weight === 'heavy'
                                  ? 'bg-red-50 text-red-600 border-red-200'
                                  : item.weight === 'medium'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  item.weight === 'heavy' ? 'bg-red-400'
                                  : item.weight === 'medium' ? 'bg-amber-400'
                                  : 'bg-emerald-400'
                                }`} />
                                {item.name}
                              </span>
                              <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block z-10 w-48 bg-gray-900 text-white text-[10px] rounded-lg p-2 leading-relaxed shadow-xl">
                                {item.impact}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  })()}
                  <p className="mt-3 text-[10px] text-gray-400 border-t border-gray-100 pt-3">
                    🔴 Heavy impact &nbsp;|&nbsp; 🟡 Moderate &nbsp;|&nbsp; 🟢 Lightweight. Hover any tag for details.
                  </p>
                </div>
              )}

              {/* Email hook → full report CTA */}
              {!emailSubmitted ? (
                <div className="bg-gradient-to-r from-[#2F73EE] to-[#8734E1] rounded-2xl p-6 text-white">
                  <p className="font-bold text-base mb-1">Want the full fix plan emailed to you?</p>
                  <p className="text-white/70 text-sm mb-4">We'll send a detailed report + a free consultation offer. No spam, ever.</p>
                  <form
                    onSubmit={e => { e.preventDefault(); if (email.trim()) setEmailSubmitted(true) }}
                    className="flex gap-2"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/50 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!email.trim()}
                      className="shrink-0 flex items-center gap-1.5 bg-white text-[#8734E1] font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50"
                    >
                      Send it <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-[#2F73EE] to-[#8734E1] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-base">Report on its way to {email} ✓</p>
                    <p className="text-white/70 text-sm mt-0.5">Ready to fix it now? Book a free 30-min call — no pressure.</p>
                  </div>
                  <a
                    href={calLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-2 bg-white text-[#8734E1] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors shadow-md"
                  >
                    Book a Free Call <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* Scan another */}
              <button
                onClick={() => {
                  setStep('form')
                  setResult(null)
                  setDomain('')
                  setEmailSubmitted(false)
                  setTimeout(() => {
                    document.getElementById('site-scanner')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 50)
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-[#8734E1]/20 bg-white hover:bg-[#f0e6fb] text-[#8734E1] font-bold text-sm transition-all"
              >
                ↩ Scan a Different Site
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
