"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Clock, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { posts } from '@/data/posts';
import CTASection from '@/components/sections/CTASection';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    'AI': '#8734E1',
    'SEO': '#2F73EE',
    'Marketing': '#f59e0b',
    'Design': '#10b981',
  };
  return colors[category] || '#8734E1';
}

function BlogPostModal({ post, isOpen, onClose }: { post: typeof posts[0] | null; isOpen: boolean; onClose: () => void }) {
  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto pointer-events-auto"
            >
              <div className="relative aspect-video">
                <img src={post.mainImage} alt={post.title} className="w-full h-full object-cover" />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <Badge className="text-white" style={{ backgroundColor: getCategoryColor(post.category) }}>
                    {post.category}
                  </Badge>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>
                <div className="prose prose-lg max-w-none text-gray-700">
                  {post.content?.split('\\n\\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link href="/contact" onClick={onClose}>
                    <Button className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] text-white">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = ['all', 'AI', 'SEO', 'Marketing', 'Design'];
  
  const filteredPosts = activeCategory === 'all' ? posts : posts.filter(p => p.category === activeCategory);
  const featuredPosts = filteredPosts.filter(p => p.featured);
  const recentPosts = filteredPosts.filter(p => !p.featured);

  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Blog</Badge>
            <h1 className="heading-xl mb-6">Insights & <span className="gradient-text">Resources</span></h1>
            <p className="text-lg text-gray-600">Stay updated with the latest in web development, AI, and digital marketing.</p>
          </div>
        </div>
      </section>

      <section className="py-6 bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-[#8734E1] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="section bg-white">
          <div className="container-custom">
            <h2 className="heading-md mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    onClick={() => setSelectedPost(post)}
                    className="h-full overflow-hidden group hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img src={post.mainImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className="text-white" style={{ backgroundColor: getCategoryColor(post.category) }}>{post.category}</Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#8734E1] transition-colors">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{formatDate(post.publishedAt)}</span>
                        <span className="text-sm text-[#8734E1] flex items-center gap-1">Read more<ArrowRight className="w-4 h-4" /></span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <h2 className="heading-md mb-8">{featuredPosts.length > 0 ? 'Recent Posts' : 'All Posts'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(featuredPosts.length > 0 ? recentPosts : filteredPosts).map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  onClick={() => setSelectedPost(post)}
                  className="h-full overflow-hidden group hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="aspect-video overflow-hidden">
                    <img src={post.mainImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <Badge className="mb-4 text-white" style={{ backgroundColor: getCategoryColor(post.category) }}>{post.category}</Badge>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#8734E1] transition-colors">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.publishedAt)}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <BlogPostModal post={selectedPost} isOpen={!!selectedPost} onClose={() => setSelectedPost(null)} />
    </>
  );
}
