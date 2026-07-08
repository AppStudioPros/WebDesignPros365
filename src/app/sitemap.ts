import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.webdesignpros365.com';
  const lastModified = new Date().toISOString();

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
    { url: `${baseUrl}/verticals/real-estate`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/verticals/real-estate-financial`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/verticals/federal-contracting`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/verticals/marketing-agencies`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/verticals/saas-founders`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/verticals/wordpress-migration`, priority: 0.7, changeFrequency: 'monthly', lastModified },
    { url: `${baseUrl}/privacy`, priority: 0.3, changeFrequency: 'yearly', lastModified },
  ];
}
