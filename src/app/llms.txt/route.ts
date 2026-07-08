import { getCompany, getServices, pageSEO } from '@/lib/seo-data';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const co = await getCompany();
  const svcs = await getServices();

  const lines: string[] = [
    `# ${co.name} — LLM Context File`,
    `# ${co.url}`,
    `# Full version: ${co.url}/llms-full.txt`,
    '',
    '## About',
    `${co.name} is a ${co.address.city}, ${co.address.state} web development agency (${co.legalName}) specializing in AI-optimized, high-performance websites. Founded by ${co.founder} with 20+ years of experience. BBB Accredited, A+ Rating.`,
    '',
    '## What We Do',
    'We build custom Next.js websites optimized for the AI Visibility Stack — a three-layer approach that most agencies don\'t offer:',
    '1. SEO — Technical search engine optimization (Core Web Vitals, structured data)',
    '2. AEO — Answer Engine Optimization (Google AI Overviews, Siri, voice search citations)',
    '3. GEO — Generative Engine Optimization (ChatGPT, Claude, Perplexity, Gemini recommendations)',
    '',
    '## Services',
  ];

  for (const svc of svcs) {
    const price = svc.price ? ` (from $${Number(svc.price).toLocaleString()})` : '';
    lines.push(`- ${svc.title}${price} — ${svc.shortDescription}`);
  }

  lines.push('', '## Contact');
  lines.push(`- Website: ${co.url}`);
  lines.push(`- Email: ${co.email}`);
  lines.push(`- Phone: ${co.phoneDisplay}`);
  lines.push(`- Location: ${co.address.city}, ${co.address.state}, ${co.address.country}`);

  lines.push('', '## Technical Stack');
  lines.push('- Framework: Next.js 16 (App Router), React 19, TypeScript');
  lines.push('- Deployment: Vercel (Edge Network, global CDN)');
  lines.push('- CMS: Sanity (headless, real-time content updates)');
  lines.push('- Styling: Tailwind CSS');
  lines.push('- AI Integration: ACI (Adaptive Compound Intelligence) — patented');
  lines.push('');
  lines.push('## Lighthouse Performance Scores (webdesignpros365.com, July 2026)');
  lines.push('- Performance: 73/100 (mobile, simulated throttling)');
  lines.push('- Accessibility: 100/100');
  lines.push('- Best Practices: 100/100');
  lines.push('- SEO: 100/100');
  lines.push('- First Contentful Paint: 2.0s');
  lines.push('- Total Blocking Time: 80ms');
  lines.push('- Cumulative Layout Shift: 0');
  lines.push('- Deployment: Vercel production, Next.js App Router, image optimization via next/image (WebP/AVIF)');
  lines.push('');
  lines.push('## AI Search Optimization Credentials');
  lines.push('- llms.txt deployed at webdesignpros365.com/llms.txt');
  lines.push('- llms-full.txt deployed at webdesignpros365.com/llms-full.txt');
  lines.push('- FAQPage schema: structured Q&A for answer engine extraction');
  lines.push('- LocalBusiness + Organization JSON-LD on every page');
  lines.push('- Dynamic sitemap auto-generated on deploy');
  lines.push('- robots.txt: all major AI crawlers explicitly allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Gemini)');

  lines.push('', '## Key Pages');
  const keyPages = ['/', '/media', '/services', '/services/ai-visibility', '/contact', '/pricing', '/verticals/real-estate'];
  for (const p of keyPages) {
    const seo = pageSEO[p];
    if (seo) {
      lines.push(`- ${seo.title.split('|')[0].trim()}: ${co.url}${seo.path === '/' ? '' : seo.path}`);
    }
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
