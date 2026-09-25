import { getServiceSeo, servicesSeo } from "@/content/services-seo";
import { ogAlt, ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return servicesSeo.map((service) => ({ service: service.slug }));
}

export default async function Image({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const copy = (getServiceSeo(slug) ?? servicesSeo[0]).copy.es;
  return renderOgImage({ title: copy.h1, subtitle: copy.description, locale: "es" });
}
