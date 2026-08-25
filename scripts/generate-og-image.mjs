// Generates public/og-image.png — the 1200×630 Open Graph / Twitter share image.
// Run once locally: npm run build:og  → then commit the PNG.
// (Vercel serves the committed PNG; no rasterization needed at build time.)
import sharp from 'sharp'

const W = 1200
const H = 630

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B1220"/>
      <stop offset="1" stop-color="#111827"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.85" cy="0.1" r="0.5">
      <stop offset="0" stop-color="#34D399" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#34D399" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.05" cy="0.95" r="0.45">
      <stop offset="0" stop-color="#38BDF8" stop-opacity="0.12"/>
      <stop offset="1" stop-color="#38BDF8" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow1)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>

  <!-- emerald accent top bar -->
  <rect x="0" y="0" width="${W}" height="4" fill="#34D399"/>

  <!-- monogram -->
  <rect x="100" y="150" width="120" height="120" rx="28" fill="#34D399"/>
  <text x="160" y="238" font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="800" fill="#0B1220" text-anchor="middle">SA</text>

  <!-- name + role -->
  <text x="100" y="420" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="800" fill="#F8FAFC">Sadia Arshad</text>
  <text x="100" y="486" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="600" fill="#34D399">WordPress Developer · Web &amp; Hosting Specialist</text>

  <!-- footer -->
  <text x="100" y="560" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#94A3B8">portfolio-sadia-rho.vercel.app</text>
</svg>
`

await sharp(Buffer.from(svg))
  .resize(W, H)
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile('public/og-image.png')

console.log('✓ public/og-image.png written (1200×630)')
