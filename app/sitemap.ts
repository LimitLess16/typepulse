import type { MetadataRoute } from "next";

const routes = ["", "typing-test", "1-minute-test", "2-minute-test", "5-minute-test", "wpm-test", "typing-practice", "login", "register"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://typepulse.app";
  return routes.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
