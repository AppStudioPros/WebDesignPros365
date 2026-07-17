import type { Metadata } from "next";
import Link from "next/link";
import { getGAPBlogPosts, slugify, estimateReadTime, extractExcerpt } from "@/lib/gap";
import { ArrowRight, Clock, Tag } from "lucide-react";

const GAP_CLIENT_ID = "10a80963-f49b-4bee-a6d5-c305b98e3317";

export const metadata: Metadata = {
  title: "Blog | Web Design Pros 365",
  description: "AI visibility, SEO, GEO, and web performance insights from the WDP365 team.",
};

export const revalidate = 60;

const FALLBACK_POSTS = [
  {
    slug: "web-design-trends-2026",
    category: "Design",
    date: "March 25, 2026",
    readTime: "5 min read",
    title: "Web Design Trends to Watch in 2026",
    excerpt: "From AI-powered layouts to micro-interactions, here's what's shaping the future of web design.",
  },
  {
    slug: "ai-visibility-for-local-business",
    category: "AI Visibility",
    date: "April 10, 2026",
    readTime: "6 min read",
    title: "Why Your Business Needs AI Visibility in 2026",
    excerpt: "63% of people now use AI to find and vet businesses. If you're not showing up in those results, you're invisible to the fastest-growing buyer segment.",
  },
  {
    slug: "geo-vs-seo",
    category: "GEO",
    date: "May 2, 2026",
    readTime: "7 min read",
    title: "GEO vs SEO: What's the Difference and Why It Matters",
    excerpt: "SEO gets you ranked on Google. GEO gets you cited by ChatGPT, Perplexity, and Claude. In 2026, you need both.",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "AI Visibility": "#8734E1",
  GEO: "#2F73EE",
  SEO: "#10b981",
  Design: "#f59e0b",
  Blog: "#8734E1",
};

export default async function BlogPage() {
  const gapPosts = await getGAPBlogPosts(GAP_CLIENT_ID).catch(() => []);
  const posts =
    gapPosts.length > 0
      ? gapPosts.map((p) => ({
          slug: slugify(p.blog_title),
          category: "Blog",
          date: new Date(p.created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          readTime: estimateReadTime(p.blog_content),
          title: p.blog_title,
          excerpt: extractExcerpt(p.blog_content),
        }))
      : FALLBACK_POSTS;

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main className="min-h-screen bg-[#1e2030]">
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1930] to-[#1e2030]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-[#8734E1]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8734E1]/20 border border-[#8734E1]/40 text-[#c084fc] text-sm font-medium mb-5">
            <Tag className="w-3.5 h-3.5" />
            Insights + Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f0eef8] mb-4">The WDP365 Blog</h1>
          <p className="text-lg text-[#a8a4c8] max-w-xl mx-auto">
            AI visibility, GEO, web performance, and what actually works in 2026.
          </p>
        </div>
      </section>

      <div className="container-custom max-w-5xl mx-auto pb-24 px-4">
        {/* Featured post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group block mb-10 bg-[#252640] border border-[#3a3858] hover:border-[#8734E1]/50 rounded-2xl overflow-hidden transition-all"
          >
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full border"
                  style={{
                    color: CATEGORY_COLORS[featured.category] || "#8734E1",
                    borderColor: `${CATEGORY_COLORS[featured.category] || "#8734E1"}40`,
                    backgroundColor: `${CATEGORY_COLORS[featured.category] || "#8734E1"}15`,
                  }}
                >
                  {featured.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[#8a87a8]">
                  <Clock className="w-3 h-3" />
                  {featured.readTime}
                </span>
                <span className="text-xs text-[#6e6b88]">{featured.date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#f0eef8] group-hover:text-[#c084fc] transition-colors mb-3 leading-snug">
                {featured.title}
              </h2>
              <p className="text-[#a8a4c8] text-base leading-relaxed mb-5 max-w-2xl">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-[#8734E1] text-sm font-semibold group-hover:gap-3 transition-all">
                Read article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        )}

        {/* Post grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-[#252640] border border-[#3a3858] hover:border-[#8734E1]/50 rounded-2xl p-6 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full border"
                    style={{
                      color: CATEGORY_COLORS[post.category] || "#8734E1",
                      borderColor: `${CATEGORY_COLORS[post.category] || "#8734E1"}40`,
                      backgroundColor: `${CATEGORY_COLORS[post.category] || "#8734E1"}15`,
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-[#8a87a8]">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-[#f0eef8] group-hover:text-[#c084fc] transition-colors mb-2 leading-snug flex-1">
                  {post.title}
                </h2>
                <p className="text-[#8a87a8] text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6e6b88]">{post.date}</span>
                  <span className="inline-flex items-center gap-1 text-[#8734E1] text-xs font-semibold group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-24 text-[#8a87a8]">
            <p className="text-lg">No posts yet. Check back soon.</p>
          </div>
        )}
      </div>
    </main>
  );
}
