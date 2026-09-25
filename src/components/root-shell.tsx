import type { ReactNode } from "react";
import JsonLd from "@/components/json-ld";
import ScrollReveals from "@/components/scroll-reveals";
import { type Locale, htmlLang } from "@/lib/i18n";
import { geistSans } from "@/lib/fonts";
import { businessGraph } from "@/lib/structured-data";
import "@/app/globals.css";
import "@/app/pages.css";

/** Shared <html>/<body> used by both root layouts (English at "/", Spanish at "/es"). */
export default function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={htmlLang[locale]} className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={businessGraph(locale)} />
        <ScrollReveals />
        {children}
      </body>
    </html>
  );
}
