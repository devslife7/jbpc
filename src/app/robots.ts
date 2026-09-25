import type { MetadataRoute } from "next";
import { absoluteUrl, isProductionSite, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite) {
    // Preview deployments and local builds must never be indexed.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
