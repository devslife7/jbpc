import type { Metadata } from "next";
import HomePage from "@/components/home-page";
import { home } from "@/content/home";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/",
  locale: "en",
  title: { absolute: home.en.metaTitle },
  description: home.en.metaDescription,
});

export default function Page() {
  return <HomePage locale="en" />;
}
