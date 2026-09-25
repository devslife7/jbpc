# J&B icon and logo exports

Regenerate from `public/assets/logo-horizontal.svg` with `npm run icons`.

- `src/app/favicon.ico`: 16, 32, 48 and 64 px browser-tab frames.
- `src/app/icon.svg` and `src/app/icon.png`: scalable and 512 px website icons, automatically linked by Next.js.
- `src/app/apple-icon.png`: opaque 180 px Apple touch icon.
- `icon-192.png` / `icon-512.png`: standard web-app icons.
- `icon-maskable-512.png`: opaque Android icon with the mark inside the circular safe area.
- `social-profile.png` / `social-profile.jpg`: 1024 px square exports with room for circular profile crops.
- `public/assets/logo-mark.svg`: transparent, vector symbol without lettering.
- `public/assets/logo-horizontal.png`: transparent full-logo export, also used by sharing cards.

Open Graph cards are generated at 1200 × 630 for both languages and for each service and area page. Next.js supplies these images to Twitter/X metadata as well. Keep the original vector logo as the source of truth; do not edit generated raster files individually.
