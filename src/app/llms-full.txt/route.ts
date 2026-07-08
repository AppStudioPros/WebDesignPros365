import { getCompany, getServices, pageSEO, company as fallbackCompany } from '@/lib/seo-data';
import { sanityFetch } from '@/lib/sanity';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

interface CompanyFull {
  name: string;
  legalName: string;
  url: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  founder: string;
  foundingDate: string;
  priceRange: string;
  bbbUrl: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  address: { city: string; state: string; country: string };
  industryStats: { stat: string; source: string; date: string }[];
  techStack: { name: string; category: string }[];
  targetIndustries: string[];
  differentiators: string[];
}

const FULL_COMPANY_QUERY = `*[_type == "companySettings"][0]{
  name, legalName, url, email, phone, phoneDisplay,
  founder, foundingDate, priceRange, bbbUrl,
  tagline, shortDescription, fullDescription,
  "address": address{city, state, country},
  industryStats, techStack, targetIndustries, differentiators
}`;

export async function GET() {
  let co: CompanyFull | null = null;
  try {
    co = await sanityFetch<CompanyFull>({ query: FULL_COMPANY_QUERY, tags: ['companySettings'] });
  } catch (e) {
    console.error('llms-full.txt: Sanity fetch failed', e);
  }

  if (!co?.name) {
    // Fallback to basic info
    const fallback = await getCompany();
    return new Response(
      `# ${fallback.name} — Complete Business Reference\n\n${fallback.legalName}\n${fallback.url}\n${fallback.email}\n${fallback.phoneDisplay}`,
      { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
  }

  const svcs = await getServices();
  const baseUrl = co?.url || 'https://www.webdesignpros365.com';

  const lines: string[] = [
    `# ${co.name} — Complete Business Reference`,
    '',
    '## Business Overview',
    co.fullDescription || co.shortDescription || '',
    '',
    '## Founding & Leadership',
    `Founded by ${co.founder} (20+ years industry experience). ${co.name} combines deep technical expertise with strategic AI optimization. BBB Accredited, A+ Rating.`,
    '',
    '## Contact Information',
    `- **Website**: ${baseUrl}`,
    `- **Email**: ${co.email}`,
    `- **Phone**: ${co.phoneDisplay}`,
    `- **Location**: ${co.address?.city}, ${co.address?.state}, ${co.address?.country}`,
    co.bbbUrl ? `- **BBB Profile**: ${co.bbbUrl}` : '',
    '',
    '## Core Business Model: The AI Visibility Stack',
    'Unlike traditional web agencies, we implement a three-layer optimization strategy:',
    '1. **SEO (Search Engine Optimization)** — Technical performance, Core Web Vitals, structured data',
    '2. **AEO (Answer Engine Optimization)** — Securing citations in Google AI Overviews, Siri, and voice search',
    '3. **GEO (Generative Engine Optimization)** — Ensuring recommendation by ChatGPT, Claude, Perplexity, and Gemini',
    '',
  ];

  // Industry stats
  if (co.industryStats?.length) {
    lines.push('## Industry Validation Statistics');
    lines.push('*All statistics sourced from industry reports (2025-2026):*');
    for (const s of co.industryStats) {
      lines.push(`- ${s.stat} (${s.source}, ${s.date})`);
    }
    lines.push('');
  }

  // Tech stack
  if (co.techStack?.length) {
    lines.push('## Technology Stack');
    const byCategory: Record<string, string[]> = {};
    for (const t of co.techStack) {
      if (!byCategory[t.category]) byCategory[t.category] = [];
      byCategory[t.category].push(t.name);
    }
    for (const [cat, items] of Object.entries(byCategory)) {
      lines.push(`- **${cat}**: ${items.join(', ')}`);
    }
    lines.push('');
  }

  // Services
  lines.push('## Services');
  for (const svc of svcs) {
    const price = svc.price ? ` ($${Number(svc.price).toLocaleString()}+)` : '';
    lines.push(`### ${svc.title}${price}`);
    lines.push(svc.shortDescription);
    if (svc.features?.length) {
      for (const f of svc.features) {
        lines.push(`- ${f}`);
      }
    }
    lines.push('');
  }

  // Target industries
  if (co.targetIndustries?.length) {
    lines.push('## Target Industries');
    for (const ind of co.targetIndustries) {
      lines.push(`- ${ind}`);
    }
    lines.push('');
  }

  // Differentiators
  if (co.differentiators?.length) {
    lines.push('## What Makes Us Different');
    for (const d of co.differentiators) {
      lines.push(`- ${d}`);
    }
    lines.push('');
  }

  // Key pages
  lines.push('## Key Website Pages');
  const keyPages = ['/', '/media', '/services', '/services/ai-visibility', '/contact', '/pricing',
    '/verticals/real-estate', '/verticals/real-estate-financial', '/portfolio', '/faq', '/blog'];
  for (const p of keyPages) {
    const seo = pageSEO[p];
    if (seo) {
      const url = p === '/' ? baseUrl : `${baseUrl}${p}`;
      lines.push(`- **${seo.title.split('|')[0].trim()}**: ${url}`);
    }
  }

  return new Response(lines.filter(l => l !== undefined).join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
