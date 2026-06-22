import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 60 // seconds — needed for PageSpeed + Firecrawl + Claude in parallel

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

async function fetchPageSpeedData(url: string) {
  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance&category=seo&category=accessibility&key=${process.env.PAGESPEED_API_KEY || ''}`
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(30000) })
    const data = await res.json()
    if (!res.ok) {
      console.error('[pagespeed error]', data?.error?.message)
      return null
    }
    const cats = data.lighthouseResult?.categories
    console.log('[pagespeed cats]', Object.keys(cats || {}))
    return {
      performance:   cats?.performance?.score   != null ? Math.round(cats.performance.score   * 100) : null,
      accessibility: cats?.accessibility?.score != null ? Math.round(cats.accessibility.score * 100) : null,
      seo:           cats?.seo?.score           != null ? Math.round(cats.seo.score           * 100) : null,
      lcp:           data.lighthouseResult?.audits?.['largest-contentful-paint']?.displayValue || null,
    }
  } catch (e: any) {
    console.error('[pagespeed exception]', e.message)
    return null
  }
}

async function fetchPageContent(url: string) {
  try {
    const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        formats: ['markdown'],
        onlyMainContent: false,
        includeTags: ['meta', 'script', 'head'],
      }),
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) return null
    const data = await res.json()
    return {
      markdown: data.data?.markdown?.slice(0, 3000) || '',
      metadata: data.data?.metadata || {},
    }
  } catch {
    return null
  }
}

function detectPlugins(content: string): { name: string; weight: 'heavy' | 'medium'; impact: string }[] {
  const c = content.toLowerCase()
  const plugins = []

  if (c.includes('elementor'))
    plugins.push({ name: 'Elementor', weight: 'heavy' as const, impact: 'Adds 500KB+ of CSS/JS on every page load' })
  if (c.includes('et_pb_') || c.includes('divi'))
    plugins.push({ name: 'Divi Builder', weight: 'heavy' as const, impact: 'Generates bloated inline CSS that slows rendering' })
  if (c.includes('wpb_') || c.includes('vc_row'))
    plugins.push({ name: 'WPBakery', weight: 'heavy' as const, impact: 'Legacy page builder adds significant render-blocking scripts' })
  if (c.includes('woocommerce'))
    plugins.push({ name: 'WooCommerce', weight: 'heavy' as const, impact: 'Loads store scripts on every page, not just shop pages' })
  if (c.includes('wpcf7') || c.includes('contact-form-7'))
    plugins.push({ name: 'Contact Form 7', weight: 'medium' as const, impact: 'Loads scripts on every page even when no form is present' })
  if (c.includes('yoast') || c.includes('wpseo'))
    plugins.push({ name: 'Yoast SEO', weight: 'medium' as const, impact: 'Adds meta bloat but helps basic SEO' })
  if (c.includes('rank-math') || c.includes('rankmath'))
    plugins.push({ name: 'RankMath SEO', weight: 'medium' as const, impact: 'SEO plugin with moderate overhead' })
  if (c.includes('revslider') || c.includes('revolution-slider'))
    plugins.push({ name: 'Revolution Slider', weight: 'heavy' as const, impact: 'One of the heaviest plugins — adds 1MB+ of JS/CSS' })
  if (c.includes('jetpack'))
    plugins.push({ name: 'Jetpack', weight: 'heavy' as const, impact: 'Loads dozens of modules whether you use them or not' })
  if (c.includes('intercom'))
    plugins.push({ name: 'Intercom Chat', weight: 'medium' as const, impact: 'Third-party chat widget adds load time on every page' })
  if (c.includes('drift.com') || c.includes('driftt.com'))
    plugins.push({ name: 'Drift Chat', weight: 'medium' as const, impact: 'Third-party chat widget adds render-blocking scripts' })
  if (c.includes('tidio'))
    plugins.push({ name: 'Tidio Chat', weight: 'medium' as const, impact: 'Chat widget loads additional third-party scripts' })
  if (c.includes('hubspot') || c.includes('hs-script'))
    plugins.push({ name: 'HubSpot Widget', weight: 'medium' as const, impact: 'Marketing tracking adds script weight to every page' })
  if (c.includes('popup') || c.includes('optinmonster') || c.includes('sumo'))
    plugins.push({ name: 'Popup/OptIn Tool', weight: 'medium' as const, impact: 'Popup scripts load on every page visit' })
  if (c.includes('wpml') || c.includes('polylang'))
    plugins.push({ name: 'Translation Plugin', weight: 'medium' as const, impact: 'Multi-language plugins add database queries on every load' })

  return plugins
}

function detectPlatform(content: string, metadata: any): {
  platform: string
  slug: string
  painPoint: string
  cta: string
} {
  const c = content.toLowerCase()
  const m = JSON.stringify(metadata).toLowerCase()
  const all = c + m

  if (all.includes('cdn.msgsndr.com') || all.includes('leadconnectorhq.com') || all.includes('ghl-'))
    return {
      platform:  'GoHighLevel',
      slug:      'gohighlevel',
      painPoint: 'GoHighLevel sites share hosting with thousands of other businesses, which kills your page speed and makes it nearly impossible for AI to index you as a unique brand.',
      cta:       'Switch to a custom Next.js site and load 10x faster.',
    }

  if (all.includes('cdn.shopify.com') || all.includes('myshopify.com'))
    return {
      platform:  'Shopify',
      slug:      'shopify',
      painPoint: 'Shopify is great for products but generates bloated pages that score poorly for AI readiness. You have zero control over your technical SEO.',
      cta:       'A custom Next.js storefront gives you full control and better AI visibility.',
    }

  if (all.includes('webflow.io') || all.includes('webflow.com'))
    return {
      platform:  'Webflow',
      slug:      'webflow',
      painPoint: "Webflow exports clean code but locks your content in their CMS. You're renting your website.",
      cta:       'Move to Next.js + Sanity and own your stack completely.',
    }

  if (all.includes('squarespace.com'))
    return {
      platform:  'Squarespace',
      slug:      'squarespace',
      painPoint: 'Squarespace sites load slowly on mobile and have limited structured data support, which is exactly what AI search engines need to recommend you.',
      cta:       'A custom site loads 5x faster and gets you in front of AI-driven searches.',
    }

  if (all.includes('wix.com') || all.includes('wix-code'))
    return {
      platform:  'Wix',
      slug:      'wix',
      painPoint: 'Wix sites are known for poor Core Web Vitals and almost zero AI search visibility. Customers searching by voice or AI assistant are unlikely to find you.',
      cta:       "Let's replace it with a fast, AI-ready custom site.",
    }

  if (all.includes('godaddy.com') || all.includes('secureserver.net'))
    return {
      platform:  'GoDaddy',
      slug:      'godaddy',
      painPoint: 'GoDaddy shared hosting is one of the slowest environments for a business website. Slow load times directly hurt your Google ranking and AI discoverability.',
      cta:       'Move to a modern stack on Vercel — night and day difference in speed.',
    }

  if (all.includes('wp-content') || all.includes('wp-includes') || all.includes('wordpress'))
    return {
      platform:  'WordPress',
      slug:      'wordpress',
      painPoint: 'WordPress sites loaded with plugins routinely take 4-6 seconds to load on mobile. That kills 53% of your visitors before they even see your phone number.',
      cta:       'A custom Next.js site loads in under 500ms and scores perfectly for AI search.',
    }

  if (all.includes('elementor'))
    return {
      platform:  'WordPress + Elementor',
      slug:      'wordpress',
      painPoint: 'Elementor adds significant page bloat to WordPress sites, making them even slower and harder for AI to crawl efficiently.',
      cta:       'A modern custom build will cut your load time in half and boost your AI visibility.',
    }

  return {
    platform:  'Custom / Unknown',
    slug:      'unknown',
    painPoint: '',
    cta:       '',
  }
}

async function fetchRankingData(domain: string, keyword: string, location: string) {
  if (!keyword || !process.env.SERPER_API_KEY) return null
  try {
    const query = location ? `${keyword} ${location}` : keyword
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
    const res = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': process.env.SERPER_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: query, num: 100 }),
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null
    const data = await res.json()
    const organic: any[] = data.organic || []
    const position = organic.findIndex((r: any) => {
      const link = (r.link || '').replace(/^https?:\/\//, '').replace(/^www\./, '')
      return link.startsWith(cleanDomain)
    })
    if (position === -1) return { position: null, tier: 'below100', query }
    const pos = position + 1
    return {
      position: pos,
      tier: pos <= 25 ? 'top25' : pos <= 100 ? 'top100' : 'below100',
      snippet: organic[position]?.snippet || null,
      title: organic[position]?.title || null,
      query,
    }
  } catch (e: any) {
    console.error('[ranking]', e.message)
    return null
  }
}

async function checkSecurityHeaders(url: string) {
  try {
    const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(5000) })
    const headers = res.headers
    return {
      hasCSP:         !!headers.get('content-security-policy'),
      hasXFrame:      !!headers.get('x-frame-options'),
      hasXContent:    !!headers.get('x-content-type-options'),
      hasHSTS:        !!headers.get('strict-transport-security'),
      hasReferrer:    !!headers.get('referrer-policy'),
      hasPermissions: !!headers.get('permissions-policy'),
    }
  } catch {
    return null
  }
}

async function runScan(domain: string, email: string, keyword?: string, location?: string) {
  try {
    if (!domain) {
      return NextResponse.json({ error: 'Domain is required.' }, { status: 400 })
    }

    const url = domain.startsWith('http') ? domain : `https://${domain}`

    // Run checks in parallel
    const [pageSpeed, pageContent, secHeaders, ranking] = await Promise.all([
      fetchPageSpeedData(url),
      fetchPageContent(url),
      checkSecurityHeaders(url),
      fetchRankingData(domain, keyword || '', location || ''),
    ])

    // Check for quick technical flags
    const content   = pageContent?.markdown  || ''
    const metadata  = pageContent?.metadata  || {}
    const platform  = detectPlatform(content, metadata)
    const plugins   = detectPlugins(content)
    const hasSchema = content.includes('application/ld+json') || content.includes('schema.org')
    const hasFAQ    = content.toLowerCase().includes('faq') || content.toLowerCase().includes('frequently asked')
    const hasOG     = !!metadata.ogTitle || content.includes('og:title')
    const metaDesc  = metadata.description || ''
    const descTooLong = metaDesc.length > 160

    // Security score
    const secChecks   = secHeaders ? Object.values(secHeaders).filter(Boolean).length : 0
    const secScore    = secHeaders ? Math.round((secChecks / 6) * 100) : 20

    // AI readiness score
    let aiScore = 30
    if (hasSchema)  aiScore += 25
    if (hasFAQ)     aiScore += 15
    if (hasOG)      aiScore += 10
    if (!descTooLong && metaDesc.length > 0) aiScore += 10
    if (secChecks >= 4) aiScore += 10
    aiScore = Math.min(aiScore, 95)

    // Build Claude prompt with real data
    const prompt = `You are auditing the website: ${url}

Real data collected:
- Mobile Performance Score: ${pageSpeed?.performance ?? 'unavailable'}/100
- Mobile LCP: ${pageSpeed?.lcp ?? 'unavailable'}
- SEO Score: ${pageSpeed?.seo ?? 'unavailable'}/100
- Accessibility Score: ${pageSpeed?.accessibility ?? 'unavailable'}/100
- Security Headers Present: ${secChecks}/6
- Has Structured Data (Schema.org): ${hasSchema}
- Has FAQ Content: ${hasFAQ}
- Has Open Graph Tags: ${hasOG}
- Meta Description Length: ${metaDesc.length} chars (ideal: under 160)
- AI Readiness Score: ${aiScore}/100
- Security Score: ${secScore}/100

Page content sample:
${content.slice(0, 1500)}

Based on this REAL data, write:
1. "problem" (1-2 sentences, plain English, what's hurting them most — be specific, no jargon)
2. "quick_win" (1 sentence, the single fastest thing they can fix today)
3. "ai_gap" (1 sentence explaining why AI search engines may not be recommending them)

Format as raw JSON only: {"problem":"...","quick_win":"...","ai_gap":"..."}`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }],
    })

    let analysis = { problem: '', quick_win: '', ai_gap: '' }
    try {
      const raw = (message.content[0] as any).text?.trim().replace(/```json|```/gi, '')
      analysis = JSON.parse(raw)
    } catch {
      analysis = {
        problem:   'Your site has several technical issues that are making it harder for customers to find you online.',
        quick_win: 'Adding structured data markup is the fastest way to help AI models understand and recommend your business.',
        ai_gap:    'Without proper schema markup and FAQ content, ChatGPT and Perplexity are unlikely to recommend your business.',
      }
    }

    return NextResponse.json({
      success: true,
      domain,
      ranking: ranking || null,
      scores: {
        performance:   pageSpeed?.performance   ?? null,
        seo:           pageSpeed?.seo           ?? null,
        accessibility: pageSpeed?.accessibility ?? null,
        security:      secScore,
        ai_readiness:  aiScore,
      },
      flags: { hasSchema, hasFAQ, hasOG, descTooLong, secChecks },
      platform,
      plugins,
      analysis,
      lcp: pageSpeed?.lcp ?? null,
    })

  } catch (err: any) {
    console.error('[scan]', err.message)
    return NextResponse.json({ error: err.message || 'Scan failed.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { domain, email, keyword, location } = await req.json().catch(() => ({ domain: '', email: '', keyword: '', location: '' }))

  const timeout = new Promise<NextResponse>((resolve) =>
    setTimeout(() => resolve(
      NextResponse.json({ error: 'Scan timed out. Please try again.' }, { status: 504 })
    ), 55000)
  )

  return Promise.race([runScan(domain, email, keyword, location), timeout])
}
