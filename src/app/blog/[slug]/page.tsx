import { getBlogPost, getAllBlogSlugs } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found | Web Design Pros 365" };
  return {
    title: `${post.title} | WDP365 Blog`,
    description: post.excerpt,
  };
}

const CATEGORY_COLORS: Record<string, { color: string; label: string }> = {
  "AI Visibility": { color: "#8734E1", label: "AI Visibility" },
  GEO:             { color: "#2F73EE", label: "GEO" },
  SEO:             { color: "#10b981", label: "SEO" },
  Design:          { color: "#f59e0b", label: "Design" },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const cat = CATEGORY_COLORS[post.category] || { color: "#8734E1", label: post.category };

  return (
    <main className="min-h-screen bg-[#1e2030]">

      {/* ── Hero Header ─────────────────────────────────────── */}
      <header style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #10102a 0%, #1a1830 45%, #1e1c35 100%)", borderBottom: "1px solid #2e2c4a" }}>

        {/* Purple glow top-left */}
        <div style={{ position: "absolute", top: "-80px", left: "-60px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(135,52,225,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        {/* Blue glow bottom-right */}
        <div style={{ position: "absolute", bottom: "-60px", right: "5%", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(47,115,238,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />
        {/* Subtle grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(135,52,225,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(135,52,225,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

        <div className="container-custom max-w-3xl mx-auto px-4" style={{ position: "relative", zIndex: 1, paddingTop: "9rem", paddingBottom: "3.5rem" }}>

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors mb-7"
            style={{ color: "#8a87a8" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Category + meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ color: cat.color, background: `${cat.color}18`, border: `1px solid ${cat.color}35`, letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              {cat.label}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: "#6e6b88" }}>
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: "#6e6b88" }}>
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-bold leading-tight mb-5"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#f0eef8", letterSpacing: "-0.02em", lineHeight: 1.2 }}
          >
            {post.title}
          </h1>

          {/* Accent bar + subtitle */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div style={{ width: "3px", minHeight: "100%", flexShrink: 0, borderRadius: "2px", background: `linear-gradient(180deg, ${cat.color} 0%, #2F73EE 100%)`, alignSelf: "stretch" }} />
            <p style={{ fontSize: "1.05rem", color: "#a8a4c8", lineHeight: 1.75, margin: 0 }}>
              {post.meta}
            </p>
          </div>

        </div>
      </header>

      {/* ── Article Body ─────────────────────────────────────── */}
      <article className="pb-24">
        <div className="container-custom max-w-3xl mx-auto px-4 pt-12">

          {/* Body */}
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="mt-16 pt-8 border-t border-[#3a3858]">
            <div className="bg-gradient-to-br from-[#1e1c35] to-[#252640] border border-[#8734E1]/30 rounded-2xl p-8 text-center">
              <p className="text-[#f0eef8] font-bold text-xl mb-2">Ready to get found by AI?</p>
              <p className="text-[#a8a4c8] text-sm mb-6 max-w-md mx-auto">
                See how the AI Visibility Stack can get your business cited by ChatGPT, Perplexity, and Google AI Overviews.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Book a Free Discovery Call
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#252640] border border-[#3a3858] text-[#c4c0e0] font-semibold text-sm hover:border-[#8734E1]/40 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>

        </div>
      </article>
    </main>
  );
}
