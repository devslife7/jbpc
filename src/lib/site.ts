import business from "@/content/business.json";

const configured = process.env.NEXT_PUBLIC_SITE_URL || business.site.url;

/** Canonical site origin without a trailing slash. */
export const siteUrl = configured.replace(/\/+$/, "");

/**
 * True only for the production deployment. Preview deployments on Vercel set
 * VERCEL_ENV to "preview", and local `next start` has no VERCEL_ENV at all.
 */
export const isProductionSite = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
