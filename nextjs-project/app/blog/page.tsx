import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { CTASection } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and updates from the Web Design Pros 365 team.',
}

// Blog posts data (would come from Sanity in production)
const posts = [
  {
    title: 'What is GEO and Why Your Business Needs It Now',
    excerpt: 'Generative Engine Optimization is the next frontier of SEO. Learn how to prepare your website for AI-powered search.',
    publishedAt: '2025-01-15',
    readTime: '8 min read',
    author: 'Web Design Pros 365',
    category: 'GEO',
    slug: 'what-is-geo-generative-engine-optimization',
    featured: true,
  },
  {
    title: 'Next.js 15: What\'s New and How to Upgrade',
    excerpt: 'A comprehensive guide to the latest features in Next.js 15, including the stable App Router and Server Components.',
    publishedAt: '2025-01-10',
    readTime: '12 min read',
    author: 'Web Design Pros 365',
    category: 'Development',
    slug: 'nextjs-15-whats-new',
    featured: true,
  },
  {
    title: 'Building AI Chatbots with OpenAI and Next.js',
    excerpt: 'Step-by-step tutorial on creating intelligent chatbots using OpenAI\'s API and modern web technologies.',
    publishedAt: '2025-01-05',
    readTime: '15 min read',
    author: 'Web Design Pros 365',
    category: 'AI',
    slug: 'building-ai-chatbots-openai-nextjs',
    featured: false,
  },
  {
    title: 'Core Web Vitals: A Complete Optimization Guide',
    excerpt: 'Everything you need to know about improving LCP, FID, and CLS for better user experience and SEO.',
    publishedAt: '2024-12-28',
    readTime: '10 min read',
    author: 'Web Design Pros 365',
    category: 'Performance',
    slug: 'core-web-vitals-optimization-guide',
    featured: false,
  },
  {
    title: 'Why Sanity.io is Our CMS of Choice',
    excerpt: 'Exploring the benefits of Sanity as a headless CMS for modern web development projects.',
    publishedAt: '2024-12-20',
    readTime: '6 min read',
    author: 'Web Design Pros 365',
    category: 'CMS',
    slug: 'why-sanity-cms-of-choice',
    featured: false,
  },
  {
    title: 'The Future of E-Commerce: Headless Architecture',
    excerpt: 'How headless commerce is revolutionizing online retail and why you should consider it.',
    publishedAt: '2024-12-15',
    readTime: '9 min read',
    author: 'Web Design Pros 365',
    category: 'E-Commerce',
    slug: 'future-ecommerce-headless-architecture',
    featured: false,
  },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const featuredPosts = posts.filter(p => p.featured)
  const recentPosts = posts.filter(p => !p.featured)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-4">
              Blog
            </Badge>
            <h1 className="heading-xl mb-6">
              Insights & <span className="gradient-text">Resources</span>
            </h1>
            <p className="text-lg text-white/60">
              Stay updated with the latest in web development, AI, and digital marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section">
        <div className="container-custom">
          <h2 className="heading-md mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full overflow-hidden group hover:border-accent/30 transition-colors">
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-6xl opacity-50">📝</span>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="primary">{post.category}</Badge>
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40">{formatDate(post.publishedAt)}</span>
                      <span className="text-sm text-accent flex items-center gap-1">
                        Read more
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="section bg-dark-secondary">
        <div className="container-custom">
          <h2 className="heading-md mb-8">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full p-6 group hover:bg-white/10 transition-colors">
                  <Badge variant="primary" className="mb-4">{post.category}</Badge>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
