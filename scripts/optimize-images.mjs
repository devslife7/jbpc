// One-off asset optimizer: converts the large PNG photos in public/assets to
// WebP at display size so next/image has small, fast sources to work from.
// Run with `node scripts/optimize-images.mjs`. Safe to re-run: existing
// outputs are skipped. Pass --clean to delete the source PNGs afterwards.
import { access, unlink } from "node:fs/promises";
import sharp from "sharp";

const jobs = [
  { from: "public/assets/hero-cleaning-branded.png", to: "public/assets/hero-cleaning-branded.webp", quality: 88 },
  { from: "public/assets/story-owner-detailed.png", to: "public/assets/story-owner-detailed.webp", width: 1100, quality: 88 },
  { from: "public/assets/booking-cleaning.png", to: "public/assets/booking-cleaning.webp", quality: 85 },
  { from: "public/assets/before-after/before-after1.png", to: "public/assets/before-after/kitchen-before-after.webp", quality: 85 },
  { from: "public/assets/before-after/before-after2.png", to: "public/assets/before-after/bathroom-before-after.webp", quality: 85 },
  { from: "public/assets/before-after/before-after3.png", to: "public/assets/before-after/living-room-before-after.webp", quality: 85 },
  { from: "public/assets/background-texture.png", to: "public/assets/background-texture.webp", width: 900, quality: 80 },
];

const clean = process.argv.includes("--clean");

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

for (const job of jobs) {
  if (!(await exists(job.from))) { console.log(`skip (missing source) ${job.from}`); continue; }
  if (await exists(job.to)) {
    console.log(`skip (exists) ${job.to}`);
  } else {
    let image = sharp(job.from);
    if (job.width) image = image.resize({ width: job.width, withoutEnlargement: true });
    const info = await image.webp({ quality: job.quality, effort: 6 }).toFile(job.to);
    console.log(`wrote ${job.to} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
  }
  if (clean) { await unlink(job.from); console.log(`deleted ${job.from}`); }
}
