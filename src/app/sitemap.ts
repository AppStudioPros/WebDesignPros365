import type { MetadataRoute } from "next";

const BASE_URL = "https://www.webdesignpros365.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const routes = [
    "",
    "/about",
    "/contact",
    "/pricing",
    "/portfolio",
    "/faq",
    "/blog",
    "/methodology",
    "/partnerships",
    "/case-studies",
    "/verticals",
    "/platform-engineering",
    "/privacy",
    "/services/custom-ai",
    "/services/ai-saas-platforms",
    "/services/ai-visibility",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
