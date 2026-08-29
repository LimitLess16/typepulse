import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";

const routes = ["", "typing-test", "blog", "about", "contact", "privacy", "terms", ...articles.map((article) => `blog/${article.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://typepulse.app";
  return routes.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
