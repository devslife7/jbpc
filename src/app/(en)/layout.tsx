import type { Metadata, Viewport } from "next";
import RootShell from "@/components/root-shell";
import { rootMetadata, viewport as sharedViewport } from "@/lib/seo";

export const metadata: Metadata = rootMetadata("en");
export const viewport: Viewport = sharedViewport;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <RootShell locale="en">{children}</RootShell>;
}
