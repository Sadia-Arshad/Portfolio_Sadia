// ============================================================================
// Icon generator
// ----------------------------------------------------------------------------
// Draws the "SA" monogram from public/favicon.svg into the PNG sizes a
// web manifest and iOS need. Browsers that support SVG favicons keep using the
// crisp vector; these cover manifest icons, Android home screens and Safari's
// apple-touch-icon.
//
//   npm run build:icons
//
// The SVG is written inline rather than read from favicon.svg so the icon's
// background fills the whole canvas - a maskable icon must not have its content
// clipped when Android applies a circular mask, so the monogram is drawn at a
// smaller ratio than the tile.
// ============================================================================

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '..', 'public')

const BG = '#0B1220'
const ACCENT = '#34D399'
const INK = '#F8FAFC'

// `pad` is the tile inset as a fraction of the canvas. Manifest icons use a
// larger inset so the mark survives Android's circular mask; the Apple touch
// icon is shown unmasked, so it fills more of the square.
function svg(size, pad) {
  const inner = size - pad * 2
  const fontSize = Math.round(inner * 0.5)
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${BG}"/>
  <rect x="${pad + 0.5}" y="${pad + 0.5}" width="${inner - 1}" height="${inner - 1}" rx="${Math.round(inner * 0.22)}" fill="none" stroke="${ACCENT}" stroke-opacity="0.35"/>
  <text x="${size / 2}" y="${size / 2 + fontSize * 0.36}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="${INK}" text-anchor="middle">SA</text>
</svg>`
}

const targets = [
  { file: 'icon-192.png', size: 192, pad: 14 },
  { file: 'icon-512.png', size: 512, pad: 38 },
  { file: 'apple-touch-icon.png', size: 180, pad: 6 },
]

for (const { file, size, pad } of targets) {
  const out = path.join(outDir, file)
  await sharp(Buffer.from(svg(size, pad))).png().toFile(out)
  console.log(`✓ ${file} (${size}x${size})`)
}

console.log(`✓ Icons written to ${path.relative(process.cwd(), outDir)}`)
