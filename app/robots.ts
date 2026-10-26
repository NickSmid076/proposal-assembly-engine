import type { MetadataRoute } from "next";

// Disallow everything. There is deliberately no sitemap.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
