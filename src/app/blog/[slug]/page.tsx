import { getBlogPost, getAllSlugs, portableTextToHtml, formatDate, estimateReadTime } from "@/lib/sanity-blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug);
    if (!post) return { title: "Post Not Found — Web Design Pros 365" };
    return {
      title: `${post.seoTitle || post.title} — WDP365 Blog`,
      description: post.seoDescription || post.excerpt || "",
    };
  } catch {
    return { title: "Blog — Web Design Pros 365" };
  }
}

function getCategoryColor(category: string) {
  const colors: Record<string, string> = { AI: "#8734E1", SEO: "#2F73EE", Marketing: "#f59e0b", Design: "#10b981" };
  return colors[category] || "#8734E1";
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try { post = await getBlogPost(slug); } catch {}
  if (!post) notFound();

  const bodyHtml = portableTextToHtml(post.body);
  const readTime = estimateReadTime(post.body);

  return (
    <main className="min-h-screen bg-background">
      <article className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-[#8734E1] transition-colors mb-6 inline-block">
            ← Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            {post.categories?.[0] && (
              <Badge variant="outline" style={{ color: getCategoryColor(post.categories[0]), borderColor: `${getCategoryColor(post.categories[0])}40` }}>
                {post.categories[0]}
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">{post.title}</h1>
          {post.excerpt && (
            <p className="text-lg text-muted-foreground mb-8 border-l-2 border-[#8734E1] pl-4">{post.excerpt}</p>
          )}
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-foreground
              prose-blockquote:border-[#8734E1] prose-blockquote:text-muted-foreground
              prose-a:text-[#8734E1] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
          <div className="mt-16 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground text-sm mb-4">Ready to transform your digital presence?</p>
            <a href="/contact" className="inline-block text-sm font-semibold bg-[#8734E1] hover:bg-[#7029C9] text-white px-6 py-3 rounded-xl transition-all">
              Get Started
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
