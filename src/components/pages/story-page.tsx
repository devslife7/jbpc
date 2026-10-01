import ContactSection from "@/components/contact-section";
import StorySection from "@/components/story-section";
import JsonLd from "@/components/json-ld";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { home } from "@/content/home";
import { ui } from "@/content/ui-strings";
import type { Locale } from "@/lib/i18n";
import { storyPath } from "@/lib/routes";
import { webPageGraph } from "@/lib/structured-data";

export default function StoryPage({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd data={webPageGraph({ path: storyPath, locale, name: ui[locale].nav.story, description: home[locale].story.paragraphs[0] })} />
      <SiteHeader locale={locale} path={storyPath} />
      <main id="main">
        <StorySection locale={locale} headingLevel="h1" />
        <ContactSection locale={locale} />
      </main>
      <SiteFooter locale={locale} path={storyPath} />
    </>
  );
}
