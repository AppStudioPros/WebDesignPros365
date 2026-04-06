import Link from "next/link";
import { getBlogPosts, formatDate, type BlogPost as SanityPost } from "@/lib/sanity-blog";
import { posts as hardcodedPosts } from "@/data/posts";
import { Badge } from "@/components/ui/badge";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Blog — Web Design Pros 365",
  description: "Insights on web development, AI integration, SEO, and digital presence from Web Design Pros 365.",
};

export const revalidate = 60;

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    AI: "#8734E1",
    SEO: "#2F73EE",
    Marketing: "#f59e0b",
    Design: "#10b981",
  };
  return colors[category] || "#8734E1";
}

export default async function BlogPage() {
  let sanityPosts: SanityPost[] = [];
  try {
    sanityPosts = await getBlogPosts();
  } catch (err) {
    console.error("[Blog] Failed to fetch from Sanity:", err);
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-muted-foreground text-lg">Web development insights, AI integration, and digital growth strategies.</p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Sanity CMS posts */}
          {sanityPosts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`}
              className="block group p-6 rounded-2xl border border-border hover:border-[#8734E1]/30 bg-card hover:shadow-lg hover:shadow-[#8734E1]/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                {post.categories?.[0] && (
                  <Badge variant="outline" style={{ color: getCategoryColor(post.categories[0]), borderColor: `${getCategoryColor(post.categories[0])}40` }}>
                    {post.categories[0]}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
              </div>
              <h2 className="text-xl font-bold text-foreground group-hover:text-[#8734E1] transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt || post.seoDescription || ""}</p>
            </Link>
          ))}

          {/* Hardcoded posts */}
          {hardcodedPosts.map((post) => (
            <div key={post._id}
              className="block p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline" style={{ color: getCategoryColor(post.category), borderColor: `${getCategoryColor(post.category)}40` }}>
                  {post.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">{post.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
