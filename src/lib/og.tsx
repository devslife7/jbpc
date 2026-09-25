import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import business from "@/content/business.json";
import type { Locale } from "@/lib/i18n";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = `${business.name} — ${business.tagline}`;

const PURPLE = "#4b1988";
const CREAM = "#fffefa";
const MUTED = "#68636c";

const strapline: Record<Locale, string> = {
  en: "House & office cleaning · Northern Virginia, DC & Maryland",
  es: "Limpieza de casas y oficinas · Norte de Virginia, DC y Maryland",
};

async function logoDataUri() {
  const svg = await readFile(join(process.cwd(), "public/assets/logo-horizontal.svg"));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}

/** Shared Open Graph card used by every opengraph-image route. */
export async function renderOgImage({ title, subtitle, locale }: { title: string; subtitle?: string; locale: Locale }) {
  const logo = await logoDataUri();
  const titleSize = title.length > 48 ? 54 : title.length > 34 ? 62 : 72;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
          background: CREAM,
          color: "#292330",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" width={360} height={105} style={{ width: 360, height: 105 }} />
          <div style={{ display: "flex", fontSize: 24, color: MUTED, letterSpacing: 2, textTransform: "uppercase" }}>{business.experience}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 22, color: PURPLE, letterSpacing: 4, textTransform: "uppercase", fontWeight: 700 }}>{strapline[locale]}</div>
          <div style={{ display: "flex", fontSize: titleSize, lineHeight: 1.08, letterSpacing: -2, fontWeight: 600, color: PURPLE, maxWidth: 1000 }}>{title}</div>
          {subtitle ? <div style={{ display: "flex", fontSize: 28, lineHeight: 1.4, color: MUTED, maxWidth: 960 }}>{subtitle}</div> : null}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `2px solid ${PURPLE}22`, paddingTop: 26, fontSize: 26, color: MUTED }}>
          <div style={{ display: "flex", color: PURPLE, fontWeight: 700 }}>{business.contact.phone}</div>
          <div style={{ display: "flex" }}>{business.site.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
