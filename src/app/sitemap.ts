import type { MetadataRoute } from 'next';

// Update this date whenever site content meaningfully changes
const SITE_LAST_MODIFIED = '2026-10-13';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.webdesignpros365.com';
  const lastModified = new Date(SITE_LAST_MODIFIED).toISOString();

  return [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly', lastModified },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: 'weekly', lastModified },
    { url: `${baseUrl}/media`, priority: 0.9, changeFrequency: 'weekly', lastModified },
    { url: `${baseUrl}/contact`, priority: 0.9, changeFrequency: 'weekly', lastModified },
    { url: `${baseUrl}/pricing`, priority: 0.9, changeFrequency: 'weekly', lastModified },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/portfolio`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/faq`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/methodology`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/partnerships`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/case-studies`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/platform-engineering`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/services/ai-visibility`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/services/custom-ai`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/services/ai-saas-platforms`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/services/aci-platform`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/services/program-creation`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/services/ai-ready-seo`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/verticals/real-estate`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/verticals/real-estate-financial`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/verticals/federal-contracting`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/verticals/marketing-agencies`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/verticals/saas-founders`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/verticals/wordpress-migration`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/denver-web-design`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/denver-nextjs-development`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/denver-ai-web-design`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/denver-ai-seo`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/denver-generative-engine-optimization`, priority: 0.8, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog/ai-is-choosing-winners-right-now`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog/geo-vs-seo-whats-the-difference`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog/why-your-lighthouse-score-matters`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog/how-ai-decides-which-businesses-to-recommend`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog/zero-click-search-and-what-it-means`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog/5-seo-mistakes-costing-your-business-customers`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog/7-signs-your-website-is-costing-you-customers`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog/customer-journey-how-people-actually-find-your-business`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog/the-cost-of-waiting-website-improvements`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog/ai-tools-save-small-business-owners-10-hours-weekly`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog/5-second-test-can-someone-tell-what-your-business-does`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog/7-things-to-check-on-your-website-before-monday-morning`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/blog/why-ai-search-is-rewriting-who-gets-found-online`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/benefits`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/partnerprogram`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/privacy`, priority: 0.3, changeFrequency: 'yearly', lastModified },
  ];
}
