<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Business information

Use `src/content/business.json` as the source of truth for public business information and reusable business copy. Read it before changing business content. Import it into site components rather than duplicating facts. The `notes` object identifies confirmed facts, provisional copy, and missing details. Keep draft claims provisional; do not invent missing facts. Social URLs are `null` until provided; do not render active social links for placeholders. Keep this file limited to public information.
