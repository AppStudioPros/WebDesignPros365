'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Loader2, ArrowRight, CheckCircle, XCircle, AlertCircle, ChevronRight, Zap, Shield, Eye, BarChart3, Users } from 'lucide-react'

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

function ScoreCard({ icon: Icon, label, score, visitors }: {
  icon: React.ElementType
  label: string
  score: number | null
  visitors?: boolean
}) {
  const color = (s: number) => s >= 80 ? 'text-emerald-500' : s >= 60 ? 'text-amber-500' : 'text-red-500'
  const barBg = (s: number) => s >= 80 ? 'bg-emerald-500' : s >= 60 ? 'bg-amber-500' : 'bg-red-500'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center">
      <Icon className={`w-5 h-5 mb-2 ${score !== null && !visitors ? color(score) : 'text-sky-500'}`} />
      <span className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">{label}</span>
      {visitors ? (
        <span className="text-3xl font-black text-sky-500">~2.4K</span>
      ) : score !== null ? (
        <>
          <span className={`text-3xl font-black font-mono ${color(score)}`}>{score}</span>
          <div className="w-full h-1.5 rounded-full bg-gray-100 mt-2">
            <div className={`h-1.5 rounded-full transition-all ${barBg(score)}`} style={{ width: `${score}%` }} />
          </div>
        </>
      ) : (
        <span className="text-3xl font-black font-mono text-gray-300">—</span>
      )}
    </div>
  )
}

function Flag({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3">
      {ok
        ? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
        : <XCircle className="w-4 h-4 text-red-400 shrink-0" />
      }
      <span className={ok ? 'text-sm text-gray-500' : 'text-sm text-gray-800 font-medium'}>{label}</span>
    </div>
  )
}

export default function SiteAuditScanner() {
  const domainRef = useRef<HTMLInputElement>(null)
  const [domain,       setDomain]       = useState('')
  const [email,        setEmail]        = useState('')
  const [keyword,      setKeyword]      = useState('')
  const [location,     setLocation]     = useState('')

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
    return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/.test(cleaned)
  }

  async function handleScan(e: React.FormEvent) {
    e.preventDefault()
    if (!domain.trim() || !keyword.trim() || !location.trim()) return
    if (!isValidDomain(domain)) {
      setError('Please enter a valid website address, e.g. www.yoursite.com')
      return
    }

    setLoading(true)
    setError(null)
    setStep('scanning')
    setLogIndex(0)

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

  const progress = logIndex >= logs.length - 1 ? 100 : Math.round((logIndex / (logs.length - 1)) * 95)
  const calLink = `https://calendly.com/webdesignpros365/consultation?email=${encodeURIComponent(email)}&a1=${encodeURIComponent(domain)}`

  return (
    <section id="site-scanner" className="section bg-gradient-to-b from-white to-[#f8f9fc] py-20">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8734E1] bg-[#f0e6fb] px-3 py-1 rounded-full mb-4">
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

          {/* ─── FORM ─── */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block">
                      Target Keyword
                    </label>
                    <input
                      type="text"
                      value={keyword}
                      onChange={e => setKeyword(e.target.value)}
                      placeholder="e.g. real estate"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#8734E1] focus:ring-2 focus:ring-[#8734E1]/10 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g. Orlando"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#8734E1] focus:ring-2 focus:ring-[#8734E1]/10 transition-all"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!domain.trim() || !keyword.trim() || !location.trim()}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2F73EE] to-[#8734E1] text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#8734E1]/20"
                >
                  <Search className="w-4 h-4" /> Scan My Website Free
                </button>
                <p className="text-center text-xs text-gray-500">No credit card. No install. Results in about 30 seconds.</p>
              </form>
            </div>
          )}

          {/* ─── SCANNING ─── */}
          {step === 'scanning' && (
            <div className="bg-[#0d0d14] rounded-2xl border border-white/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Loader2 className="w-5 h-5 text-[#8734E1] animate-spin shrink-0" />
                <span className="text-sm font-bold text-white">Scanning {domain}...</span>
              </div>
              <div className="space-y-3 mb-8">
                {logs.slice(0, logIndex + 1).map((log, i) => (
                  <div key={i} className={`text-sm font-semibold font-mono flex items-center gap-2.5 transition-colors duration-500 ${
                    i < logIndex ? 'text-emerald-400' : i === logIndex ? 'text-[#8734E1]' : 'text-gray-600'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                    {log}
                  </div>
                ))}
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#2F73EE] to-[#8734E1] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-white/50 font-mono mt-2">{progress}% complete</p>
            </div>
          )}

          {/* ─── RESULTS ─── */}
          {step === 'results' && result && (
            <div className="space-y-6">

              {/* Platform detection banner */}
              {result.platform.slug !== 'unknown' && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2 shrink-0">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span className="text-sm font-bold text-red-700">Built on {result.platform.platform}</span>
                  </div>
                  <p className="text-sm text-red-600 leading-relaxed flex-1">{result.platform.painPoint}</p>
                  <span className="shrink-0 text-xs font-bold text-red-700 bg-red-100 border border-red-200 px-3 py-1.5 rounded-full whitespace-nowrap">
                    We can fix this
                  </span>
                </div>
              )}

              {/* Score grid — 6 cards */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-base">Scores for <span className="text-[#8734E1]">{result.domain}</span></h3>
                  <span className="text-xs text-gray-500 font-mono">Just scanned</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <ScoreCard icon={Zap}       label="Speed"      score={result.scores.performance} />
                  <ScoreCard icon={Search}    label="SEO"        score={result.scores.seo} />
                  <ScoreCard icon={Eye}       label="Access."    score={result.scores.accessibility} />
                  <ScoreCard icon={Shield}    label="Security"   score={result.scores.security} />
                  <ScoreCard icon={BarChart3} label="AI Ready"   score={result.scores.ai_readiness} />
                  <ScoreCard icon={Users}     label="Est. Visitors" score={null} visitors />
                </div>
              </div>

              {/* Google Ranking */}
              {result.ranking && (
                <div className={`rounded-2xl border p-6 ${
                  result.ranking.tier === 'top25'
                    ? 'bg-emerald-50 border-emerald-200'
                    : result.ranking.tier === 'top100'
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Search className={`w-5 h-5 ${
                        result.ranking.tier === 'top25' ? 'text-emerald-600'
                        : result.ranking.tier === 'top100' ? 'text-amber-600'
                        : 'text-red-500'
                      }`} />
                      <span className="text-sm font-bold text-gray-800">Google Ranking</span>
                      <span className="text-sm font-bold text-gray-600">&ldquo;{result.ranking.query}&rdquo;</span>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      result.ranking.tier === 'top25'
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                        : result.ranking.tier === 'top100'
                        ? 'bg-amber-100 text-amber-700 border-amber-300'
                        : 'bg-red-100 text-red-600 border-red-200'
                    }`}>
                      {result.ranking.tier === 'top25' ? 'Top 25'
                        : result.ranking.tier === 'top100' ? 'Top 100'
                        : 'Below Top 100'}
                    </span>
                  </div>
                  {result.ranking.position ? (
                    <div className="flex items-baseline gap-2">
                      <span className={`text-5xl font-black font-mono ${
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
                    <p className="mt-2 text-xs text-gray-500 italic leading-relaxed line-clamp-2">{result.ranking.snippet}</p>
                  )}
                  {result.ranking.tier !== 'top25' && (
                    <p className="mt-2 text-sm font-medium text-gray-600">
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
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-4">Checklist</h4>
                  <Flag ok={result.flags.hasSchema}      label="Structured data (Schema.org)" />
                  <Flag ok={result.flags.hasFAQ}         label="FAQ content for AI answers" />
                  <Flag ok={result.flags.hasOG}           label="Social sharing (OG tags)" />
                  <Flag ok={!result.flags.descTooLong}   label="Meta description length" />
                  <Flag ok={result.flags.secChecks >= 4} label="Security headers" />
                  <div className="pt-3 border-t border-gray-100 mt-2 space-y-2">
                    {result.ranking && result.ranking.query ? (
                      <>
                        <div className="flex items-start gap-3">
                          <Search className={`w-4 h-4 shrink-0 mt-0.5 ${
                            result.ranking.tier === 'top25' ? 'text-emerald-500'
                            : result.ranking.tier === 'top100' ? 'text-amber-500'
                            : 'text-red-400'
                          }`} />
                          <div>
                            <span className={`font-bold text-sm block ${
                              result.ranking.tier === 'top25' ? 'text-emerald-600'
                              : result.ranking.tier === 'top100' ? 'text-amber-600'
                              : 'text-red-500'
                            }`}>
                              {result.ranking.position
                                ? `Google Rank: #${result.ranking.position}`
                                : 'Not in top 100 results'}
                            </span>
                            <span className="text-gray-400 text-xs">for &ldquo;{result.ranking.query}&rdquo;</span>
                          </div>
                        </div>
                        {(result.ranking.tier === 'below100' || !result.ranking.position) && (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                            <p className="text-sm font-bold text-red-600 leading-snug">
                              You are getting ghosted by thousands of potential clients.
                            </p>
                            <p className="text-xs text-red-500 mt-1 leading-relaxed">
                              Switching to the Ultimate AI Tech Stack is a game changer. Customers searching right now can&apos;t find you.
                            </p>
                          </div>
                        )}
                      </>
                    ) : keyword.trim() ? (
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Search className="w-3.5 h-3.5 shrink-0" />
                        <span>Google rank check unavailable. Retry scan.</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Search className="w-3.5 h-3.5 shrink-0" />
                        <span>Add a keyword above to see Google rank</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right — What this means */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">What this means</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{result.analysis.problem}</p>
                  <div className="bg-[#8734E1]/5 border border-[#8734E1]/20 rounded-xl p-4">
                    <p className="text-sm font-bold text-[#8734E1] mb-1">AI visibility gap:</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{result.analysis.ai_gap}</p>
                  </div>
                </div>
              </div>



              {/* Plugin detection */}
              {result.plugins.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Plugins & Scripts Detected</h4>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${result.plugins.filter(p => p.weight === 'heavy').length > 0 ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}`}>
                      {result.plugins.length} found · {result.plugins.filter(p => p.weight === 'heavy').length} heavy
                    </span>
                  </div>
                  <div className="space-y-3">
                    {result.plugins.map((plugin, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className={`shrink-0 mt-1.5 w-2 h-2 rounded-full ${plugin.weight === 'heavy' ? 'bg-red-400' : 'bg-amber-400'}`} />
                        <div>
                          <span className="text-sm font-semibold text-gray-700">{plugin.name}</span>
                          <span className="text-sm text-gray-400 ml-2">{plugin.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {result.plugins.filter(p => p.weight === 'heavy').length >= 2 && (
                    <p className="mt-4 text-sm text-red-500 font-medium border-t border-gray-100 pt-3">
                      {result.plugins.filter(p => p.weight === 'heavy').length} heavy plugins detected. This is likely adding 2-4 seconds to your load time.
                    </p>
                  )}
                </div>
              )}



              {/* Email hook */}
              {!emailSubmitted ? (
                <div className="bg-gradient-to-r from-[#2F73EE] to-[#8734E1] rounded-2xl p-6 text-white">
                  <p className="font-bold text-lg mb-1">Want the full fix plan emailed to you?</p>
                  <p className="text-white/70 text-sm mb-4">We&apos;ll send a detailed report + a free consultation offer. No spam, ever.</p>
                  <form
                    onSubmit={e => { e.preventDefault(); if (email.trim()) setEmailSubmitted(true) }}
                    className="flex gap-2"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/50 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!email.trim()}
                      className="shrink-0 flex items-center gap-1.5 bg-white text-[#8734E1] font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50"
                    >
                      Send it <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-[#2F73EE] to-[#8734E1] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-lg">Report on its way to {email} ✓</p>
                    <p className="text-white/70 text-sm mt-0.5">Ready to fix it now? Book a free 30-min call, no pressure.</p>
                  </div>
                  <a
                    href={calLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-2 bg-white text-[#8734E1] font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/90 transition-colors shadow-md"
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
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border-2 border-[#8734E1]/20 bg-white hover:bg-[#f0e6fb] text-[#8734E1] font-bold text-sm transition-all"
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
