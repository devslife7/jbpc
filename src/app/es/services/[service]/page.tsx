import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/pages/service-page";
import { getServiceSeo, servicesSeo } from "@/content/services-seo";
import { servicePath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicesSeo.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/es/services/[service]">): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceSeo(slug);
  if (!service) notFound();
  const copy = service.copy.es;
  return buildMetadata({ path: servicePath(service.slug), locale: "es", title: copy.title, description: copy.description, keywords: copy.keywords });
}

export default async function Page({ params }: PageProps<"/es/services/[service]">) {
  const { service } = await params;
  return <ServicePage slug={service} locale="es" />;
}
