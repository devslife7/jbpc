import type { Metadata } from "next";
import ServicesIndexPage, { servicesIndexCopy } from "@/components/pages/services-index";
import { servicesIndexPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: servicesIndexPath,
  locale: "es",
  title: servicesIndexCopy.es.title,
  description: servicesIndexCopy.es.description,
});

export default function Page() {
  return <ServicesIndexPage locale="es" />;
}
