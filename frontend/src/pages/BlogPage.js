import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Calendar, Clock, X } from 'lucide-react';
import { Card, CardContent, Badge, Button } from '../components/ui';
import { CTASection } from '../components/sections';

// Blog posts data from your CSV export
const posts = [
  {
    id: 1,
    title: 'Exploring the Future of AI in Web Development',
    slug: 'exploring-the-future-of-ai-in-web-development',
    excerpt: 'Artificial intelligence is transforming how websites are designed, developed, and optimized—learn how integrating AI tools can improve performance, personalization, and efficiency.',
    content: `In today's digital age, your website is often the first impression customers have of your brand. A poorly designed site can turn potential clients away within seconds, while a well-crafted one can capture attention, build trust, and inspire action. Great web design isn't just about aesthetics—it's about creating meaningful experiences that guide visitors toward becoming loyal customers.

A visually appealing website immediately establishes credibility. Clean layouts, professional typography, and consistent branding signal to visitors that your business is trustworthy and detail-oriented. When users see a well-structured design, they instinctively associate it with quality service and reliability. This trust becomes the foundation of long-term customer relationships.

Beyond visuals, usability plays a crucial role in customer retention. A great design ensures effortless navigation, clear calls to action, and fast load times. Visitors should be able to find what they're looking for in seconds. When a website feels intuitive and easy to use, it enhances satisfaction—turning one-time visitors into returning users.

Consistency across devices also shapes loyalty. With mobile browsing dominating online activity, responsive design is essential. A seamless experience from desktop to smartphone keeps users engaged wherever they are. If your site performs flawlessly on every screen size, it communicates professionalism and care—qualities that customers value deeply.

Great web design also tells a story. Through colors, imagery, and tone, your site communicates who you are and what you stand for. When visitors connect emotionally with your brand message, they're more likely to return, recommend, and invest in your products or services.

Integrating social proof—such as testimonials, reviews, or case studies—further strengthens credibility. Seeing others' positive experiences builds confidence and reassures new visitors that they're making the right choice. These trust signals transform curiosity into commitment.

Finally, great web design evolves with your audience. Regular updates, new content, and modern visuals show that your business is active and growing. When customers see you continuously improving, they remain engaged and invested in your journey. In short, great design isn't just decoration—it's strategy. By combining beauty, usability, and authenticity, you create digital experiences that not only attract visitors but turn them into loyal brand advocates who return again and again.`,
    publishedAt: '2025-10-05',
    readTime: '6 min read',
    category: 'AI',
    image: 'https://cdn.prod.website-files.com/68e79bad9c543e2ea52b6147/68eb8300bdf5f9286066efd6_b5.png',
    featured: true,
  },
  {
    id: 2,
    title: 'Five Proven Strategies to Elevate Your Online Presence',
    slug: 'five-proven-strategies-to-elevate-your-online-presence',
    excerpt: 'Boost your brand visibility with a strong website, SEO, and smart marketing. These strategies will help you stand out and attract your ideal audience.',
    content: `In today's digital age, your website is often the first impression customers have of your brand. A poorly designed site can turn potential clients away within seconds, while a well-crafted one can capture attention, build trust, and inspire action. Great web design isn't just about aesthetics—it's about creating meaningful experiences that guide visitors toward becoming loyal customers.

A visually appealing website immediately establishes credibility. Clean layouts, professional typography, and consistent branding signal to visitors that your business is trustworthy and detail-oriented. When users see a well-structured design, they instinctively associate it with quality service and reliability. This trust becomes the foundation of long-term customer relationships.

Beyond visuals, usability plays a crucial role in customer retention. A great design ensures effortless navigation, clear calls to action, and fast load times. Visitors should be able to find what they're looking for in seconds. When a website feels intuitive and easy to use, it enhances satisfaction—turning one-time visitors into returning users.

Consistency across devices also shapes loyalty. With mobile browsing dominating online activity, responsive design is essential. A seamless experience from desktop to smartphone keeps users engaged wherever they are. If your site performs flawlessly on every screen size, it communicates professionalism and care—qualities that customers value deeply.

Great web design also tells a story. Through colors, imagery, and tone, your site communicates who you are and what you stand for. When visitors connect emotionally with your brand message, they're more likely to return, recommend, and invest in your products or services.

Integrating social proof—such as testimonials, reviews, or case studies—further strengthens credibility. Seeing others' positive experiences builds confidence and reassures new visitors that they're making the right choice. These trust signals transform curiosity into commitment.

Finally, great web design evolves with your audience. Regular updates, new content, and modern visuals show that your business is active and growing. When customers see you continuously improving, they remain engaged and invested in your journey. In short, great design isn't just decoration—it's strategy.`,
    publishedAt: '2025-10-06',
    readTime: '5 min read',
    category: 'SEO',
    image: 'https://cdn.prod.website-files.com/68e79bad9c543e2ea52b6147/68eb836eb76fa472b1133af1_b6.png',
    featured: true,
  },
  {
    id: 3,
    title: 'How Brand Consistency Shapes User Trust and Recognition',
    slug: 'how-brand-consistency-shapes-user-trust-and-recognition',
    excerpt: "Consistent branding across your website, ads, and content creates familiarity, builds credibility, and strengthens your audience's emotional connection with your business.",
    content: `In today's digital age, your website is often the first impression customers have of your brand. A poorly designed site can turn potential clients away within seconds, while a well-crafted one can capture attention, build trust, and inspire action. Great web design isn't just about aesthetics—it's about creating meaningful experiences that guide visitors toward becoming loyal customers.

A visually appealing website immediately establishes credibility. Clean layouts, professional typography, and consistent branding signal to visitors that your business is trustworthy and detail-oriented. When users see a well-structured design, they instinctively associate it with quality service and reliability. This trust becomes the foundation of long-term customer relationships.

Beyond visuals, usability plays a crucial role in customer retention. A great design ensures effortless navigation, clear calls to action, and fast load times. Visitors should be able to find what they're looking for in seconds. When a website feels intuitive and easy to use, it enhances satisfaction—turning one-time visitors into returning users.

Consistency across devices also shapes loyalty. With mobile browsing dominating online activity, responsive design is essential. A seamless experience from desktop to smartphone keeps users engaged wherever they are. If your site performs flawlessly on every screen size, it communicates professionalism and care—qualities that customers value deeply.

Great web design also tells a story. Through colors, imagery, and tone, your site communicates who you are and what you stand for. When visitors connect emotionally with your brand message, they're more likely to return, recommend, and invest in your products or services.

Integrating social proof—such as testimonials, reviews, or case studies—further strengthens credibility. Seeing others' positive experiences builds confidence and reassures new visitors that they're making the right choice. These trust signals transform curiosity into commitment.

Finally, great web design evolves with your audience. Regular updates, new content, and modern visuals show that your business is active and growing. When customers see you continuously improving, they remain engaged and invested in your journey.`,
    publishedAt: '2025-10-07',
    readTime: '5 min read',
    category: 'Marketing',
    image: 'https://cdn.prod.website-files.com/68e79bad9c543e2ea52b6147/68eb82815f5eada2edc445b2_b4.png',
    featured: false,
  },
  {
    id: 4,
    title: 'How Great Web Design Transforms Visitors into Loyal Customers',
    slug: 'how-great-web-design-transforms-visitors-into-loyal-customers',
    excerpt: 'A well-designed website does more than look good—it builds trust, improves user experience, and converts casual visitors into long-term customers who value your brand.',
    content: `In today's digital age, your website is often the first impression customers have of your brand. A poorly designed site can turn potential clients away within seconds, while a well-crafted one can capture attention, build trust, and inspire action. Great web design isn't just about aesthetics—it's about creating meaningful experiences that guide visitors toward becoming loyal customers.

A visually appealing website immediately establishes credibility. Clean layouts, professional typography, and consistent branding signal to visitors that your business is trustworthy and detail-oriented. When users see a well-structured design, they instinctively associate it with quality service and reliability. This trust becomes the foundation of long-term customer relationships.

Beyond visuals, usability plays a crucial role in customer retention. A great design ensures effortless navigation, clear calls to action, and fast load times. Visitors should be able to find what they're looking for in seconds. When a website feels intuitive and easy to use, it enhances satisfaction—turning one-time visitors into returning users.

Consistency across devices also shapes loyalty. With mobile browsing dominating online activity, responsive design is essential. A seamless experience from desktop to smartphone keeps users engaged wherever they are. If your site performs flawlessly on every screen size, it communicates professionalism and care—qualities that customers value deeply.

Great web design also tells a story. Through colors, imagery, and tone, your site communicates who you are and what you stand for. When visitors connect emotionally with your brand message, they're more likely to return, recommend, and invest in your products or services.

Integrating social proof—such as testimonials, reviews, or case studies—further strengthens credibility. Seeing others' positive experiences builds confidence and reassures new visitors that they're making the right choice. These trust signals transform curiosity into commitment.

Finally, great web design evolves with your audience. Regular updates, new content, and modern visuals show that your business is active and growing. When customers see you continuously improving, they remain engaged and invested in your journey.`,
    publishedAt: '2025-10-08',
    readTime: '6 min read',
    category: 'Design',
    image: 'https://cdn.prod.website-files.com/68e79bad9c543e2ea52b6147/68eb7eb024be7f7d245e4d79_blog1.png',
    featured: false,
  },
  {
    id: 5,
    title: "The Ultimate Guide to Boosting Your Site's SEO Performance",
    slug: 'the-ultimate-guide-to-boosting-your-sites-seo-performance',
    excerpt: 'From keyword research to on-page optimization, learn how to improve your search rankings and attract consistent, high-quality traffic that grows your business naturally.',
    content: `In today's digital age, your website is often the first impression customers have of your brand. A poorly designed site can turn potential clients away within seconds, while a well-crafted one can capture attention, build trust, and inspire action. Great web design isn't just about aesthetics—it's about creating meaningful experiences that guide visitors toward becoming loyal customers.

A visually appealing website immediately establishes credibility. Clean layouts, professional typography, and consistent branding signal to visitors that your business is trustworthy and detail-oriented. When users see a well-structured design, they instinctively associate it with quality service and reliability. This trust becomes the foundation of long-term customer relationships.

Beyond visuals, usability plays a crucial role in customer retention. A great design ensures effortless navigation, clear calls to action, and fast load times. Visitors should be able to find what they're looking for in seconds. When a website feels intuitive and easy to use, it enhances satisfaction—turning one-time visitors into returning users.

Consistency across devices also shapes loyalty. With mobile browsing dominating online activity, responsive design is essential. A seamless experience from desktop to smartphone keeps users engaged wherever they are. If your site performs flawlessly on every screen size, it communicates professionalism and care—qualities that customers value deeply.

Great web design also tells a story. Through colors, imagery, and tone, your site communicates who you are and what you stand for. When visitors connect emotionally with your brand message, they're more likely to return, recommend, and invest in your products or services.

Integrating social proof—such as testimonials, reviews, or case studies—further strengthens credibility. Seeing others' positive experiences builds confidence and reassures new visitors that they're making the right choice. These trust signals transform curiosity into commitment.

Finally, great web design evolves with your audience. Regular updates, new content, and modern visuals show that your business is active and growing.`,
    publishedAt: '2025-10-09',
    readTime: '7 min read',
    category: 'SEO',
    image: 'https://cdn.prod.website-files.com/68e79bad9c543e2ea52b6147/68eb8221d4f313aae84cece2_b2.png',
    featured: false,
  },
  {
    id: 6,
    title: 'Why Mobile Responsiveness Is No Longer Optional in 2025',
    slug: 'why-mobile-responsiveness-is-no-longer-optional-in-2025',
    excerpt: 'Today\'s users expect seamless experiences on every device. Discover how mobile-first design can enhance engagement, speed, and visibility across your entire digital presence.',
    content: `In today's digital age, your website is often the first impression customers have of your brand. A poorly designed site can turn potential clients away within seconds, while a well-crafted one can capture attention, build trust, and inspire action. Great web design isn't just about aesthetics—it's about creating meaningful experiences that guide visitors toward becoming loyal customers.

A visually appealing website immediately establishes credibility. Clean layouts, professional typography, and consistent branding signal to visitors that your business is trustworthy and detail-oriented. When users see a well-structured design, they instinctively associate it with quality service and reliability. This trust becomes the foundation of long-term customer relationships.

Beyond visuals, usability plays a crucial role in customer retention. A great design ensures effortless navigation, clear calls to action, and fast load times. Visitors should be able to find what they're looking for in seconds. When a website feels intuitive and easy to use, it enhances satisfaction—turning one-time visitors into returning users.

Consistency across devices also shapes loyalty. With mobile browsing dominating online activity, responsive design is essential. A seamless experience from desktop to smartphone keeps users engaged wherever they are. If your site performs flawlessly on every screen size, it communicates professionalism and care—qualities that customers value deeply.

Great web design also tells a story. Through colors, imagery, and tone, your site communicates who you are and what you stand for. When visitors connect emotionally with your brand message, they're more likely to return, recommend, and invest in your products or services.

Integrating social proof—such as testimonials, reviews, or case studies—further strengthens credibility. Seeing others' positive experiences builds confidence and reassures new visitors that they're making the right choice.

Finally, great web design evolves with your audience. Regular updates, new content, and modern visuals show that your business is active and growing.`,
    publishedAt: '2025-10-10',
    readTime: '5 min read',
    category: 'Design',
    image: 'https://cdn.prod.website-files.com/68e79bad9c543e2ea52b6147/68eb825546c6c49acfa99f94_b3.png',
    featured: false,
  },
];

// Export posts for use in other components
export { posts };

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Get category color
function getCategoryColor(category) {
  const colors = {
    'AI': '#8734E1',
    'SEO': '#2F73EE',
    'Marketing': '#f59e0b',
    'Design': '#10b981',
  };
  return colors[category] || '#8734E1';
}

// Blog Post Modal Component
function BlogPostModal({ post, isOpen, onClose }) {
  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal Container - Centered */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto pointer-events-auto"
            >
              {/* Header Image */}
              <div className="relative aspect-video">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <Badge 
                    className="text-white"
                    style={{ backgroundColor: getCategoryColor(post.category) }}
                  >
                    {post.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
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

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  {post.title}
                </h1>

                <div className="prose prose-lg max-w-none text-gray-700">
                  {post.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="bg-[#f8f9fc] rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Importance of converting website visitors into customers
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      When it comes to building a successful online presence, converting website visitors into customers is crucial. Conversions translate directly into sales, revenue, and business success.
                    </p>
                    <Link to="/contact" onClick={onClose}>
                      <Button variant="accent" size="sm">
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
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
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'AI', 'SEO', 'Marketing', 'Design'];
  
  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  const featuredPosts = filteredPosts.filter(p => p.featured);
  const recentPosts = filteredPosts.filter(p => !p.featured);

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

      {/* Category Filter */}
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

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="section bg-white">
          <div className="container-custom">
            <h2 className="heading-md mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    onClick={() => setSelectedPost(post)}
                    className="h-full overflow-hidden group hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge 
                          className="text-white"
                          style={{ backgroundColor: getCategoryColor(post.category) }}
                        >
                          {post.category}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />{post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#8734E1] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
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
      )}

      {/* Recent Posts */}
      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <h2 className="heading-md mb-8">{featuredPosts.length > 0 ? 'Recent Posts' : 'All Posts'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(featuredPosts.length > 0 ? recentPosts : filteredPosts).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  onClick={() => setSelectedPost(post)}
                  className="h-full overflow-hidden group hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <Badge 
                      className="mb-4 text-white"
                      style={{ backgroundColor: getCategoryColor(post.category) }}
                    >
                      {post.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#8734E1] transition-colors">
                      {post.title}
                    </h3>
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

      {/* Blog Post Modal */}
      <BlogPostModal 
        post={selectedPost} 
        isOpen={!!selectedPost} 
        onClose={() => setSelectedPost(null)} 
      />
    </>
  );
}
