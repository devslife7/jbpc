import type { Metadata } from "next";
import HomePage from "@/components/home-page";
import { home } from "@/content/home";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/",
  locale: "es",
  title: { absolute: home.es.metaTitle },
  description: home.es.metaDescription,
});

export default function Page() {
  return <HomePage locale="es" />;
}
