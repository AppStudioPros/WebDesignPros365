import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://webdesignpros365.com'

  // Static pages
  const staticPages = [
    '',
    '/services',
    '/portfolio',
    '/blog',
    '/about',
    '/contact',
    '/pricing',
    '/faq',
  ]

  // Service pages
  const servicePages = [
    '/services/geo',
    '/services/ai-integration',
    '/services/seo-performance',
    '/services/nextjs-development',
    '/services/headless-cms',
    '/services/digital-marketing',
    '/services/social-media',
    '/services/e-commerce',
    '/services/web-performance',
    '/services/custom-software',
    '/services/brand-design',
  ]

  const allPages = [...staticPages, ...servicePages]

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'weekly' : 'monthly',
    priority: page === '' ? 1 : page.startsWith('/services') ? 0.9 : 0.8,
  }))
}
