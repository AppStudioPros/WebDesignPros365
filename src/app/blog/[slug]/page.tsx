import { getBlogPost, getAllBlogSlugs, BLOG_POSTS } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

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
    openGraph: post.mainImage ? { images: [{ url: post.mainImage }] } : undefined,
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

  // Related posts: same category, excluding current, latest 3
  const related = BLOG_POSTS
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Fill with other posts if not enough same-category
  if (related.length < 2) {
    const others = BLOG_POSTS
      .filter((p) => p.slug !== post.slug && !related.find((r) => r.slug === p.slug))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3 - related.length);
    related.push(...others);
  }

  return (
    <main className="min-h-screen bg-[#1e2030]">

      {/* Vertical reading progress bar */}
      <ReadingProgress />

      {/* ── Animated Hero Header ──────────────────────────────── */}
      <header className="relative overflow-hidden" style={{ borderBottom: "1px solid #2e2c4a" }}>

        {/* Animated gradient base */}
        <div className="absolute inset-0 blog-header-gradient" />

        {/* Morphing blobs */}
        <div className="blog-blob blog-blob-1" />
        <div className="blog-blob blog-blob-2" />
        <div className="blog-blob blog-blob-3" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(135,52,225,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(135,52,225,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="container-custom max-w-3xl mx-auto px-4 relative z-10" style={{ paddingTop: "9rem", paddingBottom: "4rem" }}>

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors mb-8 hover:text-[#c084fc]"
            style={{ color: "#8a87a8" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Category + meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
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
            className="font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.9rem)", color: "#f0eef8", letterSpacing: "-0.02em", lineHeight: 1.15 }}
          >
            {post.title}
          </h1>

          {/* Accent bar + subtitle */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div style={{ width: "3px", minHeight: "2rem", flexShrink: 0, borderRadius: "2px", background: `linear-gradient(180deg, ${cat.color} 0%, #2F73EE 100%)`, alignSelf: "stretch" }} />
            <p style={{ fontSize: "1.05rem", color: "#a8a4c8", lineHeight: 1.75, margin: 0 }}>
              {post.meta}
            </p>
          </div>

        </div>
      </header>

      {/* ── Featured Image ────────────────────────────────────── */}
      {post.mainImage && (
        <div className="container-custom max-w-3xl mx-auto px-4" style={{ marginTop: "2.5rem" }}>
          <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #2e2c4a", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            <Image
              src={post.mainImage}
              alt={post.title}
              width={900}
              height={480}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </div>
        </div>
      )}

      {/* ── Article Body ─────────────────────────────────────── */}
      <article className="pb-24">
        <div className="container-custom max-w-3xl mx-auto px-4" style={{ paddingTop: post.mainImage ? "3rem" : "3.5rem" }}>

          {/* Body prose */}
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
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #8734E1 0%, #2F73EE 100%)" }}
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

      {/* ── Related Posts ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-[#2e2c4a] py-20" style={{ background: "#191828" }}>
          <div className="container-custom max-w-3xl mx-auto px-4">
            <h2 className="text-lg font-bold text-[#f0eef8] mb-8" style={{ letterSpacing: "-0.01em" }}>
              Keep reading
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rp) => {
                const rpCat = CATEGORY_COLORS[rp.category] || { color: "#8734E1", label: rp.category };
                return (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group flex flex-col bg-[#252640] border border-[#3a3858] hover:border-[#8734E1]/50 rounded-xl p-5 transition-all"
                  >
                    {rp.mainImage && (
                      <div style={{ borderRadius: "8px", overflow: "hidden", marginBottom: "0.875rem", border: "1px solid #2e2c4a" }}>
                        <Image src={rp.mainImage} alt={rp.title} width={400} height={210} style={{ width: "100%", height: "auto", display: "block" }} />
                      </div>
                    )}
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full self-start mb-2"
                      style={{ color: rpCat.color, background: `${rpCat.color}15`, border: `1px solid ${rpCat.color}30` }}
                    >
                      {rpCat.label}
                    </span>
                    <h3 className="text-sm font-semibold text-[#f0eef8] group-hover:text-[#c084fc] transition-colors leading-snug flex-1">
                      {rp.title}
                    </h3>
                    <p className="text-[11px] text-[#6e6b88] mt-2">{rp.date}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
