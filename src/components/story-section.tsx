import Image from "next/image";
import { Sparkle } from "@/components/icons";
import { home } from "@/content/home";
import type { Locale } from "@/lib/i18n";

export default function StorySection({ locale, headingLevel = "h2" }: { locale: Locale; headingLevel?: "h1" | "h2" }) {
  const story = home[locale].story;
  const Heading = headingLevel;

  return (
    <section className="story-section" id="our-story" aria-labelledby="story-title">
      <div className="container story-layout">
        <div className="story-photo" data-reveal data-reveal-delay="0">
          <span className="story-dots story-dots-top" aria-hidden="true" />
          <span className="story-dots story-dots-bottom" aria-hidden="true" />
          <div className="story-blob">
            <Image src="/assets/story-owner-detailed.webp" alt={story.imageAlt} fill sizes="(max-width: 760px) 100vw, 550px" />
          </div>
        </div>
        <div className="story-copy" data-reveal data-reveal-delay="120">
          <p className="eyebrow"><Sparkle /> {story.eyebrow}</p>
          <Heading id="story-title">{story.title}</Heading>
          {story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="story-signoff"><Sparkle /><span>{story.signoff}</span></div>
        </div>
      </div>
    </section>
  );
}
