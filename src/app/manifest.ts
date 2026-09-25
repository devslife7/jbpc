import type { MetadataRoute } from "next";
import business from "@/content/business.json";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.legalName,
    short_name: "J&B Cleaning",
    description: business.description,
    start_url: "/",
    id: "/",
    scope: "/",
    display: "standalone",
    lang: "en",
    background_color: "#fffefa",
    theme_color: "#4b1988",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
