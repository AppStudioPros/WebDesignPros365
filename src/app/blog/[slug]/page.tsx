import { getBlogPost, getAllBlogSlugs } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Tag } from "lucide-react";

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

const CATEGORY_COLORS: Record<string, string> = {
  "AI Visibility": "#8734E1",
  GEO: "#2F73EE",
  SEO: "#10b981",
  Design: "#f59e0b",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const color = CATEGORY_COLORS[post.category] || "#8734E1";

  return (
    <main className="min-h-screen bg-[#1e2030]">
      <article className="pt-32 pb-24">
        <div className="container-custom max-w-3xl mx-auto px-4">

          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#8a87a8] hover:text-[#c084fc] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border"
              style={{ color, borderColor: `${color}40`, backgroundColor: `${color}15` }}
            >
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#8a87a8]">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
            <span className="text-xs text-[#6e6b88]">{post.date}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#f0eef8] leading-tight mb-5">
            {post.title}
          </h1>

          {/* Lede */}
          <p className="text-lg text-[#a8a4c8] mb-8 border-l-4 border-[#8734E1] pl-5 leading-relaxed">
            {post.meta}
          </p>

          {/* Divider */}
          <div className="border-t border-[#3a3858] mb-10" />

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
