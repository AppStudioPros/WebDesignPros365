import { getGAPBlogPostBySlug, getAllGAPSlugs, slugify, estimateReadTime, extractExcerpt, formatDate } from "@/lib/gap";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Tag } from "lucide-react";

const GAP_CLIENT_ID = "10a80963-f49b-4bee-a6d5-c305b98e3317";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await getAllGAPSlugs(GAP_CLIENT_ID);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getGAPBlogPostBySlug(GAP_CLIENT_ID, slug);
    if (!post) return { title: "Post Not Found | Web Design Pros 365" };
    return {
      title: `${post.blog_title} | WDP365 Blog`,
      description: extractExcerpt(post.blog_content, 160),
    };
  } catch {
    return { title: "Blog | Web Design Pros 365" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getGAPBlogPostBySlug(GAP_CLIENT_ID, slug);
  } catch {}
  if (!post) notFound();

  const readTime = estimateReadTime(post.blog_content);

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
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border border-[#8734E1]/40 bg-[#8734E1]/15 text-[#c084fc]">
              <Tag className="w-3 h-3" />
              Blog
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#8a87a8]">
              <Clock className="w-3 h-3" />
              {readTime}
            </span>
            <span className="text-xs text-[#6e6b88]">{formatDate(post.created_at)}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#f0eef8] leading-tight mb-5">
            {post.blog_title}
          </h1>

          {/* Lede */}
          {post.blog_meta && (
            <p className="text-lg text-[#a8a4c8] mb-8 border-l-4 border-[#8734E1] pl-5 leading-relaxed">
              {post.blog_meta}
            </p>
          )}

          {/* Divider */}
          <div className="border-t border-[#3a3858] mb-10" />

          {/* Body */}
          <div
            className="
              prose prose-lg max-w-none
              prose-headings:text-[#f0eef8] prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-[#a8a4c8] prose-p:leading-relaxed prose-p:mb-5
              prose-strong:text-[#f0eef8]
              prose-em:text-[#c4c0e0]
              prose-blockquote:border-l-4 prose-blockquote:border-[#8734E1] prose-blockquote:text-[#a8a4c8] prose-blockquote:pl-5 prose-blockquote:not-italic
              prose-a:text-[#8734E1] prose-a:no-underline hover:prose-a:underline hover:prose-a:text-[#c084fc]
              prose-ul:text-[#a8a4c8] prose-ol:text-[#a8a4c8]
              prose-li:my-1
              prose-code:text-[#c084fc] prose-code:bg-[#252640] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-[#252640] prose-pre:border prose-pre:border-[#3a3858] prose-pre:rounded-xl
              prose-hr:border-[#3a3858]
            "
            dangerouslySetInnerHTML={{ __html: post.blog_content }}
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
