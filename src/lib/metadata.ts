/**
 * Auto Metadata Generator
 * 
 * Usage in any layout.tsx:
 *   import { autoMetadata } from '@/lib/metadata';
 *   export const metadata = autoMetadata('/about');
 * 
 * For async pages that can fetch from Sanity:
 *   import { asyncMetadata } from '@/lib/metadata';
 *   export async function generateMetadata() { return asyncMetadata('/about'); }
 * 
 * Generates title, description, Open Graph, Twitter cards, canonical URL — all automatic.
 */

import type { Metadata } from 'next';
import { getPageSEO, company } from './seo-data';
import { sanityFetch } from './sanity';

const BASE = 'https://www.webdesignpros365.com';

export function autoMetadata(path: string): Metadata {
  const seo = getPageSEO(path);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `${BASE}${path === '/' ? '' : path}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${BASE}${path === '/' ? '' : path}`,
      siteName: company.name,
      type: 'website',
      locale: 'en_US',
      ...(seo.ogImage && { images: [{ url: seo.ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Async version — tries Sanity first, falls back to hardcoded.
 * Use with generateMetadata() in page.tsx or layout.tsx.
 */
export async function asyncMetadata(path: string): Promise<Metadata> {
  let title: string;
  let description: string;

  try {
    const data = await sanityFetch<{ title: string; description: string } | null>({
      query: `*[_type == "pageSEO" && path == $path][0]{title, description}`,
      params: { path },
      tags: ['pageSEO'],
    });
    if (data?.title) {
      title = data.title;
      description = data.description;
    } else {
      const seo = getPageSEO(path);
      title = seo.title;
      description = seo.description;
    }
  } catch {
    const seo = getPageSEO(path);
    title = seo.title;
    description = seo.description;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE}${path === '/' ? '' : path}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE}${path === '/' ? '' : path}`,
      siteName: company.name,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
