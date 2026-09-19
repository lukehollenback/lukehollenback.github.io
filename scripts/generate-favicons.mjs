// Renders the raster fallbacks for public/favicon.svg. Run after editing the SVG:
//   node scripts/generate-favicons.mjs
// Safari ignores SVG favicons and requests /favicon.ico; iOS wants a PNG touch icon.
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = readFileSync('public/favicon.svg');
const renderPng = (size) => sharp(svg, { density: 72 * (size / 64) * 4 }).resize(size, size).png().toBuffer();

/** An ICO file may wrap a single PNG: a 6-byte header, one 16-byte directory entry, then the image. */
function icoFromPng(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt16LE(1, 10); // color planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(header.length, 18); // image offset
  return Buffer.concat([header, png]);
}

writeFileSync('public/favicon.ico', icoFromPng(await renderPng(48), 48));

// The touch icon gets an opaque background and padding: iOS crops to a rounded square and fills transparency with black.
const mark = await renderPng(132);
const touchIcon = await sharp({ create: { width: 180, height: 180, channels: 4, background: '#ffffff' } })
  .composite([{ input: mark, gravity: 'center' }])
  .png()
  .toBuffer();
writeFileSync('public/apple-touch-icon.png', touchIcon);
