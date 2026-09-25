import type { Metadata, Viewport } from "next";
import RootShell from "@/components/root-shell";
import { rootMetadata, viewport as sharedViewport } from "@/lib/seo";

export const metadata: Metadata = rootMetadata("es");
export const viewport: Viewport = sharedViewport;

export default function RootLayout({ children }: LayoutProps<"/es">) {
  return <RootShell locale="es">{children}</RootShell>;
}
