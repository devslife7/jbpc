import type { Metadata } from "next";
import AreasIndexPage, { areasIndexCopy } from "@/components/pages/areas-index";
import { areasIndexPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: areasIndexPath,
  locale: "en",
  title: areasIndexCopy.en.title,
  description: areasIndexCopy.en.description,
});

export default function Page() {
  return <AreasIndexPage locale="en" />;
}
