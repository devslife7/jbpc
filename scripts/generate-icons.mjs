// Rebuild browser, home-screen and shareable logo assets from the existing vector logo.
// Run: npm run icons
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const source = await readFile(new URL('../public/assets/logo-horizontal.svg', import.meta.url), 'utf8');
const business = JSON.parse(await readFile(new URL('../src/content/business.json', import.meta.url), 'utf8'));
const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
// The first seven purple paths and the violet paths left of x=810 form the original mark.
const groups = [...source.matchAll(/<g fill="([^"]+)">([\s\S]*?)<\/g>/g)];
const artwork = groups.map(([, color, content], index) => {
  const paths = [...content.matchAll(/<path\b[^>]*\/>/g)].map(([path]) => path);
  const markPaths = index === 0 ? paths.slice(0, 7) : paths.filter((path) => Number(path.match(/translate\(([\d.]+)/)?.[1]) < 810);
  return `<g fill="${color}">${markPaths.join('\n')}</g>`;
}).join('\n');
const label = `<title>${escapeXml(business.name)}</title>`;
const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="45 145 770 510" role="img">${label}${artwork}</svg>\n`;
function square(width, background, rounded = false) {
  const height = width * 510 / 770;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img">${label}<rect width="512" height="512" ${rounded ? 'rx="96"' : ''} fill="${background}"/><svg x="${(512-width)/2}" y="${(512-height)/2}" width="${width}" height="${height}" viewBox="45 145 770 510">${artwork}</svg></svg>\n`;
}
const icon = square(480, '#fffefa', true);
const touch = square(420, '#fffefa');
// Artwork stays inside the central 80%-diameter safe circle, including its corners.
const maskable = square(328, '#fffefa');
const root = new URL('../', import.meta.url);
const write = (path, data) => writeFile(new URL(path, root), data);
await mkdir(new URL('public/icons/', root), { recursive: true });
await write('public/assets/logo-mark.svg', mark);
await write('src/app/icon.svg', icon);
const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
for (const size of [16, 32, 48, 192, 512]) await write(`public/icons/icon-${size}.png`, await png(icon, size));
await write('src/app/icon.png', await png(icon, 512));
await write('src/app/apple-icon.png', await sharp(Buffer.from(touch)).resize(180).flatten({ background: '#fffefa' }).png().toBuffer());
await write('public/icons/icon-maskable-512.png', await sharp(Buffer.from(maskable)).resize(512).flatten({ background: '#fffefa' }).png().toBuffer());
await write('public/icons/social-profile.png', await png(maskable, 1024));
await write('public/icons/social-profile.jpg', await sharp(Buffer.from(maskable)).resize(1024).jpeg({ quality: 95 }).toBuffer());
await write('public/assets/logo-horizontal.png', await sharp(Buffer.from(source)).resize(1740).png().toBuffer());
// ICO directory with PNG frames for standard and high-density browser tabs.
const sizes = [16, 32, 48, 64];
const frames = await Promise.all(sizes.map((size) => png(icon, size)));
const header = Buffer.alloc(6 + 16 * frames.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index]; header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frame.length, entry + 8); header.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await write('src/app/favicon.ico', Buffer.concat([header, ...frames]));
console.log('Generated favicon, SVG/PNG icons, Apple and maskable icons, and shareable logo exports.');
