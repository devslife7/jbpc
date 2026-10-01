import type { Metadata } from "next";
import ContactPage from "@/components/pages/contact-page";
import { home } from "@/content/home";
import { ui } from "@/content/ui-strings";
import { contactPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: contactPath,
  locale: "es",
  title: ui.es.nav.contact,
  description: home.es.contact.body,
});

export default function Page() {
  return <ContactPage locale="es" />;
}
