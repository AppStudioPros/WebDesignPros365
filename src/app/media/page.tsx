import MediaHero from '@/components/media/MediaHero';
import VideoGrid from '@/components/media/VideoGrid';
import IndustryDataCards from '@/components/media/IndustryDataCards';
import TrustLine from '@/components/media/TrustLine';
import ROICalculator from '@/components/media/ROICalculator';
import MediaCTA from '@/components/media/MediaCTA';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import VideoSchema from '@/components/VideoSchema';

export const metadata = {
  title: 'AI Visibility Report | Web Design Pros 365',
  description:
    'See how AI is changing how clients find real estate agents, mortgage lenders, and insurance brokers. Calculate your visibility gap and learn what it costs to be invisible to AI.',
};

const BASE = 'https://www.webdesignpros365.com';

const videos = [
  {
    title: 'The Speed Problem Is Costing You Money',
    description: 'Most business owners are paying for a website that costs them customers — not because the design is bad, but because it takes four seconds to load.',
    url: `${BASE}/videos/speed-problem.mp4`,
    thumbnailUrl: `${BASE}/videos/speed-problem-poster.jpg`,
    uploadDate: '2026-06-15',
  },
  {
    title: 'SEO Is Old News. Meet GEO.',
    description: 'Traditional SEO gets you ranked. In 2026, AI answers the question before users reach your site. Generative Engine Optimization is how you get cited.',
    url: `${BASE}/videos/seo-is-old-news.mp4`,
    thumbnailUrl: `${BASE}/videos/seo-is-old-news-poster.jpg`,
    uploadDate: '2026-06-20',
  },
  {
    title: 'How We Do It And Why Daily Optimization Wins',
    description: 'One-time builds go stale. The sites that keep climbing are the ones being actively improved.',
    url: `${BASE}/videos/daily-optimization.mp4`,
    thumbnailUrl: `${BASE}/videos/daily-optimization-poster.png`,
    uploadDate: '2026-07-06',
  },
  {
    title: 'The AI Search Revolution in Real Estate',
    description: 'Your clients are already asking AI to find agents, compare lenders, and vet providers. This is what that shift looks like — and what it means for your business.',
    url: `${BASE}/videos/ai-search-revolution.mp4`,
    thumbnailUrl: `${BASE}/videos/ai-search-revolution-poster.jpg`,
    uploadDate: '2026-07-06',
  },
  {
    title: 'No Guesswork. Daily AI Search Domination.',
    description: 'Stop guessing what Google and AI want. Our daily optimization system removes the uncertainty and puts your business in front of the right people — every single day.',
    url: `${BASE}/videos/no-guesswork-ai-domination.mp4`,
    thumbnailUrl: `${BASE}/videos/ai-search-revolution-poster.jpg`,
    uploadDate: '2026-07-10',
  },
];

export default function MediaPage() {
  return (
    <main className="bg-[#0d0d14]">
      <BreadcrumbSchema items={[{ name: 'Media', url: `${BASE}/media` }]} />
      <VideoSchema videos={videos} />
      <MediaHero />
      <VideoGrid />
      <IndustryDataCards />
      <TrustLine />
      <ROICalculator />
      <MediaCTA />
    </main>
  );
}
