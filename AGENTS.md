<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Business information

Use `src/content/business.json` as the source of truth for public business information and reusable business copy. Read it before changing business content. Import it into site components rather than duplicating facts. The `notes` object identifies confirmed facts, provisional copy, and missing details. Keep draft claims provisional; do not invent missing facts. Social URLs are `null` until provided; do not render active social links for placeholders. Keep this file limited to public information.

## SEO content and routes

The site has two root layouts: English at `src/app/(en)` and Spanish at `src/app/es`, both rendered through `src/components/root-shell.tsx`. Shared page components live in `src/components/pages/`. Route helpers (`localizePath`, `servicePath`, `cityPath`, `allPaths`) are in `src/lib/routes.ts`; metadata is built with `buildMetadata` in `src/lib/seo.ts`; schema.org graphs come from `src/lib/structured-data.ts` and deliberately omit `address`, `aggregateRating` and prices.

Search-facing copy is bilingual and provisional: `src/content/services-seo.ts` (services), `src/content/locations.ts` (16 service-area cities), `src/content/faqs.ts`, `src/content/home.ts`, `src/content/ui-strings.ts`, `src/content/form-strings.ts`. Keep facts in `business.json` and import them; city and service copy may use public place facts but must not claim an address, prices, guarantees, insurance, or numbers of past jobs. Adding a city means adding one record to `locations.ts`; it flows into the sitemap, footer, area pages, and structured data automatically.
