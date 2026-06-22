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

type TechCategory = 'builder' | 'analytics' | 'crm' | 'chat' | 'ecommerce' | 'seo' | 'marketing' | 'payments' | 'booking' | 'video' | 'hosting' | 'framework'
type TechWeight = 'heavy' | 'medium' | 'light'

interface TechItem {
  name: string
  category: TechCategory
  weight: TechWeight
  impact: string
}

function detectTechStack(content: string, metadata: any): TechItem[] {
  const c = content.toLowerCase()
  const m = JSON.stringify(metadata).toLowerCase()
  const all = c + ' ' + m
  const stack: TechItem[] = []

  const add = (name: string, category: TechCategory, weight: TechWeight, impact: string) =>
    stack.push({ name, category, weight, impact })

  // ── Page Builders ──────────────────────────────────────────────
  if (all.includes('elementor'))
    add('Elementor', 'builder', 'heavy', 'Adds 500KB+ of CSS/JS on every page load')
  if (all.includes('et_pb_') || all.includes('divi'))
    add('Divi Builder', 'builder', 'heavy', 'Generates bloated inline CSS that slows rendering')
  if (all.includes('wpb_') || all.includes('vc_row'))
    add('WPBakery', 'builder', 'heavy', 'Legacy builder adds render-blocking scripts')
  if (all.includes('revslider') || all.includes('revolution-slider'))
    add('Revolution Slider', 'builder', 'heavy', 'Adds 1MB+ of JS/CSS for sliders')
  if (all.includes('beaver-builder') || all.includes('fl-builder'))
    add('Beaver Builder', 'builder', 'heavy', 'Page builder adds significant frontend overhead')
  if (all.includes('avada') || all.includes('fusion-builder'))
    add('Avada/Fusion', 'builder', 'heavy', 'Theme + builder combo adds major page weight')

  // ── Platforms / CMS ────────────────────────────────────────────
  if (all.includes('cdn.msgsndr.com') || all.includes('leadconnectorhq') || all.includes('ghl-'))
    add('GoHighLevel', 'hosting', 'heavy', 'Shared GHL hosting kills page speed and AI indexing')
  if (all.includes('cdn.shopify.com') || all.includes('myshopify.com'))
    add('Shopify', 'ecommerce', 'medium', 'Shopify theme limitations hurt Core Web Vitals')
  if (all.includes('webflow.io') || all.includes('webflow.com'))
    add('Webflow', 'hosting', 'medium', 'Clean code but locked CMS — you\'re renting your site')
  if (all.includes('squarespace.com'))
    add('Squarespace', 'hosting', 'heavy', 'Slow on mobile, poor structured data support')
  if (all.includes('wix.com') || all.includes('wix-code') || all.includes('parastorage.com'))
    add('Wix', 'hosting', 'heavy', 'Poor Core Web Vitals, near-zero AI search visibility')
  if (all.includes('godaddy.com') || all.includes('secureserver.net'))
    add('GoDaddy Website Builder', 'hosting', 'heavy', 'Shared GoDaddy hosting is among the slowest for business sites')
  if (all.includes('wp-content') || all.includes('wp-includes'))
    add('WordPress', 'hosting', 'medium', 'Performance depends heavily on plugins and hosting')
  if (all.includes('ghost.io') || all.includes('ghost.org'))
    add('Ghost CMS', 'hosting', 'light', 'Clean, fast CMS — good for content sites')
  if (all.includes('hubspot.com/hs/') || all.includes('hs-sites.com'))
    add('HubSpot CMS', 'hosting', 'medium', 'HubSpot-hosted sites have limited speed optimization options')
  if (all.includes('kajabi'))
    add('Kajabi', 'hosting', 'medium', 'All-in-one course platform with limited customization')
  if (all.includes('clickfunnels') || all.includes('cfpage'))
    add('ClickFunnels', 'hosting', 'heavy', 'Funnel builder generates slow, AI-unfriendly pages')

  // ── Analytics ──────────────────────────────────────────────────
  if (all.includes('gtag') || all.includes('google-analytics') || all.includes('ga4') || all.includes('googletagmanager') || all.includes('gtm.js'))
    add('Google Analytics / GTM', 'analytics', 'light', 'Standard analytics — minimal performance impact if loaded async')
  if (all.includes('hotjar') || all.includes('hj.sv'))
    add('Hotjar', 'analytics', 'medium', 'Session recording adds script weight — defer loading if possible')
  if (all.includes('clarity.ms') || all.includes('microsoft clarity'))
    add('Microsoft Clarity', 'analytics', 'light', 'Heatmap/session tool — lighter than Hotjar')
  if (all.includes('mixpanel'))
    add('Mixpanel', 'analytics', 'light', 'Event analytics — minimal page weight')
  if (all.includes('segment.com') || all.includes('analytics.js'))
    add('Segment', 'analytics', 'medium', 'Data pipeline can multiply third-party script load')
  if (all.includes('fbq(') || all.includes('facebook.com/tr') || all.includes('connect.facebook.net'))
    add('Meta Pixel', 'analytics', 'medium', 'Facebook tracking pixel adds third-party request on every load')
  if (all.includes('ads.linkedin.com') || all.includes('snap.licdn.com'))
    add('LinkedIn Insight Tag', 'analytics', 'light', 'B2B tracking pixel — low performance impact')
  if (all.includes('tiktok') && all.includes('pixel'))
    add('TikTok Pixel', 'analytics', 'light', 'Ad tracking pixel')

  // ── CRM / Marketing Automation ────────────────────────────────
  if (all.includes('hs-scripts') || all.includes('hs-banner') || (all.includes('hubspot') && !all.includes('hs-sites')))
    add('HubSpot CRM', 'crm', 'medium', 'HubSpot tracking adds marketing scripts to every page')
  if (all.includes('activecampaign') || all.includes('activehosted.com'))
    add('ActiveCampaign', 'crm', 'light', 'Email/CRM automation — scripts load on form pages')
  if (all.includes('mailchimp') || all.includes('list-manage.com') || all.includes('chimpstatic'))
    add('Mailchimp', 'marketing', 'light', 'Email marketing — pop-up scripts may affect load')
  if (all.includes('klaviyo'))
    add('Klaviyo', 'marketing', 'medium', 'E-commerce email tool — adds scripts to every page')
  if (all.includes('keap') || all.includes('infusionsoft'))
    add('Keap / Infusionsoft', 'crm', 'medium', 'CRM tracking scripts load sitewide')
  if (all.includes('salesforce') || all.includes('pardot') || all.includes('force.com'))
    add('Salesforce / Pardot', 'crm', 'medium', 'Enterprise CRM tracking — scripts add page weight')
  if (all.includes('pipedrive'))
    add('Pipedrive', 'crm', 'light', 'CRM — minimal front-end footprint')
  if (all.includes('gohighlevel') || all.includes('leadconnector'))
    add('GoHighLevel CRM', 'crm', 'medium', 'GHL CRM scripts load with the page')
  if (all.includes('convertkit') || all.includes('ck.js'))
    add('ConvertKit', 'marketing', 'light', 'Email marketing — lightweight embed scripts')

  // ── Chat / Support ─────────────────────────────────────────────
  if (all.includes('intercom'))
    add('Intercom', 'chat', 'medium', 'Chat widget adds third-party scripts to every page')
  if (all.includes('drift.com') || all.includes('driftt.com'))
    add('Drift', 'chat', 'medium', 'Chat widget adds render-blocking scripts')
  if (all.includes('tidio'))
    add('Tidio', 'chat', 'medium', 'Chat widget loads additional third-party scripts')
  if (all.includes('zendesk') || all.includes('zopim'))
    add('Zendesk Chat', 'chat', 'medium', 'Support chat adds JS on every page load')
  if (all.includes('livechat') || all.includes('livechatinc'))
    add('LiveChat', 'chat', 'medium', 'Live chat widget adds script weight')
  if (all.includes('crisp.chat') || all.includes('crisp-livechat'))
    add('Crisp Chat', 'chat', 'light', 'Lightweight chat widget')
  if (all.includes('tawk.to') || all.includes('tawk_api'))
    add('Tawk.to', 'chat', 'light', 'Free chat widget — minimal weight')
  if (all.includes('freshchat') || all.includes('freshdesk'))
    add('Freshchat', 'chat', 'medium', 'Support chat widget adds page weight')
  if (all.includes('gorgias'))
    add('Gorgias', 'chat', 'medium', 'E-commerce support chat')

  // ── E-Commerce ────────────────────────────────────────────────
  if (all.includes('woocommerce'))
    add('WooCommerce', 'ecommerce', 'heavy', 'Loads store scripts on every page, not just shop pages')
  if (all.includes('bigcommerce'))
    add('BigCommerce', 'ecommerce', 'medium', 'Hosted e-commerce platform with moderate overhead')
  if (all.includes('magento') || all.includes('mage/'))
    add('Magento', 'ecommerce', 'heavy', 'Heavy e-commerce platform — complex JS bundle')
  if (all.includes('snipcart'))
    add('Snipcart', 'ecommerce', 'light', 'Lightweight cart add-on')

  // ── Payments ──────────────────────────────────────────────────
  if (all.includes('stripe.com') || all.includes('stripe.js') || all.includes('js.stripe.com'))
    add('Stripe', 'payments', 'light', 'Payment processor — secure, minimal page weight')
  if (all.includes('paypal') || all.includes('paypalobjects'))
    add('PayPal', 'payments', 'medium', 'PayPal scripts add third-party load on checkout pages')
  if (all.includes('square') && (all.includes('squareup') || all.includes('squarespace') === false))
    add('Square', 'payments', 'light', 'Payment processor — moderate script weight')
  if (all.includes('authorize.net') || all.includes('authorizenet'))
    add('Authorize.net', 'payments', 'light', 'Payment gateway')

  // ── Booking / Scheduling ──────────────────────────────────────
  if (all.includes('calendly'))
    add('Calendly', 'booking', 'medium', 'Booking widget embeds add third-party scripts')
  if (all.includes('acuityscheduling') || all.includes('acuity'))
    add('Acuity Scheduling', 'booking', 'medium', 'Scheduling embed loads Acuity scripts')
  if (all.includes('mindbody') || all.includes('mindbodyonline'))
    add('Mindbody', 'booking', 'heavy', 'Fitness/wellness booking platform — heavy script bundle')
  if (all.includes('booker') || all.includes('bookingkoala'))
    add('Online Booking Tool', 'booking', 'medium', 'Booking widget adds third-party scripts')
  if (all.includes('simplybook') || all.includes('setmore'))
    add('Setmore / SimplyBook', 'booking', 'medium', 'Scheduling tool embed')

  // ── Video ─────────────────────────────────────────────────────
  if (all.includes('wistia'))
    add('Wistia', 'video', 'medium', 'Business video host — loads player scripts')
  if (all.includes('player.vimeo') || all.includes('vimeo.com/video'))
    add('Vimeo', 'video', 'light', 'Video hosting — faster than YouTube embeds')
  if (all.includes('youtube.com/embed') || all.includes('ytimg.com'))
    add('YouTube Embeds', 'video', 'medium', 'YouTube iframes add significant load weight — use facades')
  if (all.includes('loom.com/embed'))
    add('Loom', 'video', 'light', 'Screen recording embeds — minimal weight')
  if (all.includes('bunny.net') || all.includes('b-cdn.net'))
    add('Bunny.net CDN/Video', 'video', 'light', 'Fast video/CDN provider')

  // ── SEO Tools ────────────────────────────────────────────────
  if (all.includes('yoast') || all.includes('wpseo'))
    add('Yoast SEO', 'seo', 'medium', 'WordPress SEO plugin — adds meta overhead')
  if (all.includes('rank-math') || all.includes('rankmath'))
    add('RankMath SEO', 'seo', 'medium', 'WordPress SEO plugin with moderate overhead')
  if (all.includes('jetpack'))
    add('Jetpack', 'seo', 'heavy', 'Loads dozens of modules whether you use them or not')
  if (all.includes('schema.org') || all.includes('application/ld+json'))
    add('Structured Data (Schema)', 'seo', 'light', 'Good — helps AI engines and featured snippets')

  // ── Frameworks / Tech Stack ───────────────────────────────────
  if (all.includes('__next') || all.includes('_next/static') || all.includes('next.js'))
    add('Next.js', 'framework', 'light', 'Modern React framework — excellent performance')
  if (all.includes('gatsby') || all.includes('gatsby-'))
    add('Gatsby', 'framework', 'light', 'Static site generator — fast but limited CMS flexibility')
  if (all.includes('nuxt') || all.includes('__nuxt'))
    add('Nuxt.js', 'framework', 'light', 'Vue-based framework — good performance')
  if (all.includes('wp-json') && all.includes('react') || all.includes('headlesswp'))
    add('Headless WordPress', 'framework', 'medium', 'Headless WP is faster than traditional WP but complex to maintain')

  // ── CDN / Hosting Signals ─────────────────────────────────────
  if (all.includes('cloudflare'))
    add('Cloudflare CDN', 'hosting', 'light', 'Good — Cloudflare provides fast global CDN and security')
  if (all.includes('amazonaws.com') || all.includes('cloudfront.net'))
    add('AWS / CloudFront', 'hosting', 'light', 'AWS-backed hosting — good reliability')
  if (all.includes('wpengine') || all.includes('wpenginepowered'))
    add('WP Engine', 'hosting', 'medium', 'Managed WordPress hosting — better than shared but not as fast as Vercel')
  if (all.includes('kinsta'))
    add('Kinsta', 'hosting', 'light', 'Premium managed WordPress hosting — fast')
  if (all.includes('flywheel') || all.includes('getflywheel'))
    add('Flywheel', 'hosting', 'medium', 'Managed WordPress hosting')

  // ── Other ────────────────────────────────────────────────────
  if (all.includes('wpcf7') || all.includes('contact-form-7'))
    add('Contact Form 7', 'builder', 'medium', 'Loads scripts on every page even without a form present')
  if (all.includes('wpml') || all.includes('polylang'))
    add('Translation Plugin', 'builder', 'medium', 'Multi-language plugins add database queries on load')
  if (all.includes('optinmonster') || all.includes('sumo') || all.includes('privy'))
    add('Popup/OptIn Tool', 'marketing', 'medium', 'Popup scripts load on every page visit')
  if (all.includes('typeform'))
    add('Typeform', 'marketing', 'light', 'Form/survey tool embed')
  if (all.includes('recaptcha') || all.includes('hcaptcha'))
    add('reCAPTCHA / hCaptcha', 'builder', 'light', 'Bot protection — adds small script load')
  if (all.includes('disqus'))
    add('Disqus Comments', 'builder', 'heavy', 'Comment system adds heavy third-party JS bundle')

  return stack
}

// Keep legacy detectPlugins signature for backward compat — now delegates to detectTechStack
function detectPlugins(content: string): { name: string; weight: 'heavy' | 'medium'; impact: string }[] {
  return detectTechStack(content, {})
    .filter(t => t.category === 'builder' || t.weight === 'heavy')
    .map(t => ({ name: t.name, weight: t.weight as 'heavy' | 'medium', impact: t.impact }))
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
    const techStack = detectTechStack(content, metadata)
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
      techStack,
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
