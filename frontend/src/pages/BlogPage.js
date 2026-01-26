import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, Badge } from '../components/ui';
import { CTASection } from '../components/sections';

const posts = [
  { title: 'What is GEO and Why Your Business Needs It Now', excerpt: 'Generative Engine Optimization is the next frontier of SEO. Learn how to prepare your website for AI-powered search.', publishedAt: '2025-01-15', readTime: '8 min read', category: 'GEO', featured: true },
  { title: "Next.js 15: What's New and How to Upgrade", excerpt: 'A comprehensive guide to the latest features in Next.js 15, including the stable App Router and Server Components.', publishedAt: '2025-01-10', readTime: '12 min read', category: 'Development', featured: true },
  { title: 'Building AI Chatbots with OpenAI and Next.js', excerpt: "Step-by-step tutorial on creating intelligent chatbots using OpenAI's API and modern web technologies.", publishedAt: '2025-01-05', readTime: '15 min read', category: 'AI', featured: false },
  { title: 'Core Web Vitals: A Complete Optimization Guide', excerpt: 'Everything you need to know about improving LCP, FID, and CLS for better user experience and SEO.', publishedAt: '2024-12-28', readTime: '10 min read', category: 'Performance', featured: false },
  { title: 'Why Sanity.io is Our CMS of Choice', excerpt: 'Exploring the benefits of Sanity as a headless CMS for modern web development projects.', publishedAt: '2024-12-20', readTime: '6 min read', category: 'CMS', featured: false },
  { title: 'The Future of E-Commerce: Headless Architecture', excerpt: 'How headless commerce is revolutionizing online retail and why you should consider it.', publishedAt: '2024-12-15', readTime: '9 min read', category: 'E-Commerce', featured: false },
];

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPage() {
  const featuredPosts = posts.filter(p => p.featured);
  const recentPosts = posts.filter(p => !p.featured);

  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-4">Blog</Badge>
            <h1 className="heading-xl mb-6">Insights & <span className="gradient-text">Resources</span></h1>
            <p className="text-lg text-gray-600">
              Stay updated with the latest in web development, AI, and digital marketing.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="heading-md mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden group hover:shadow-xl transition-all cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-[#8734E1]/20 to-[#2F73EE]/20 flex items-center justify-center">
                    <span className="text-6xl opacity-50">📝</span>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="primary">{post.category}</Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#8734E1] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{formatDate(post.publishedAt)}</span>
                      <span className="text-sm text-[#8734E1] flex items-center gap-1">
                        Read more<ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <h2 className="heading-md mb-8">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6 group hover:shadow-lg transition-all cursor-pointer">
                  <Badge variant="primary" className="mb-4">{post.category}</Badge>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#8734E1] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.publishedAt)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
