import type { Metadata } from "next";
import ServicesIndexPage, { servicesIndexCopy } from "@/components/pages/services-index";
import { servicesIndexPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: servicesIndexPath,
  locale: "en",
  title: servicesIndexCopy.en.title,
  description: servicesIndexCopy.en.description,
});

export default function Page() {
  return <ServicesIndexPage locale="en" />;
}
