import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-posts";
import { ArrowRight, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Web Design Pros 365",
  description: "AI visibility, SEO, GEO, and web performance insights from the WDP365 team.",
};

const CATEGORY_COLORS: Record<string, string> = {
  "AI Visibility": "#8734E1",
  GEO: "#2F73EE",
  SEO: "#10b981",
  Design: "#f59e0b",
  Blog: "#8734E1",
};

export default function BlogPage() {
  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

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

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-[#6e6b88]">{post.date}</span>
                <span className="inline-flex items-center gap-1 text-[#8734E1] text-xs font-semibold group-hover:gap-2 transition-all">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
