import type { Metadata } from "next";
import StoryPage from "@/components/pages/story-page";
import { home } from "@/content/home";
import { ui } from "@/content/ui-strings";
import { storyPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: storyPath,
  locale: "en",
  title: ui.en.nav.story,
  description: home.en.story.paragraphs[0],
});

export default function Page() {
  return <StoryPage locale="en" />;
}
