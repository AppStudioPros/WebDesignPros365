import type { Metadata } from "next";
import Link from "next/link";
import { getGAPBlogPosts, slugify, estimateReadTime, extractExcerpt } from "@/lib/gap";

const GAP_CLIENT_ID = "10a80963-f49b-4bee-a6d5-c305b98e3317";
export const metadata: Metadata = { title: "Blog — Web Design Pros 365", description: "Web design tips, SEO insights, and digital marketing strategies." };
export const revalidate = 60;

const FALLBACK_POSTS = [
  { slug: "web-design-trends-2026", category: "Design", categoryColor: "#6366f1", date: "March 25, 2026", readTime: "5 min read", title: "Web Design Trends to Watch in 2026", excerpt: "From AI-powered layouts to micro-interactions, here's what's shaping the future of web design." },
];

export default async function BlogPage() {
  const gapPosts = await getGAPBlogPosts(GAP_CLIENT_ID);
  const posts = gapPosts.length > 0
    ? gapPosts.map((p) => ({ slug: slugify(p.blog_title), category: "Blog", categoryColor: "#6366f1", date: new Date(p.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), readTime: estimateReadTime(p.blog_content), title: p.blog_title, excerpt: extractExcerpt(p.blog_content) }))
    : FALLBACK_POSTS;

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-gray-400 text-lg mb-12">Web design tips, SEO insights, and digital marketing strategies.</p>
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group p-6 rounded-2xl border border-gray-800 hover:border-indigo-500/30 bg-gray-900/50 hover:bg-gray-900 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border" style={{ color: post.categoryColor, borderColor: `${post.categoryColor}40` }}>{post.category}</span>
                <span className="text-xs text-gray-500">{post.date}</span><span className="text-xs text-gray-500">·</span><span className="text-xs text-gray-500">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">{post.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
