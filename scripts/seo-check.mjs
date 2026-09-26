// ============================================================================
// SEO check
// ----------------------------------------------------------------------------
// Validates the BUILT output in dist/, not the source. Run it after
// `npm run build`:
//
//   npm run check:seo
//
// The point is to catch the failures a screenshot review misses - a build that
// quietly stopped pre-rendering, a canonical that drifted from the sitemap, a
// JSON-LD block with a trailing comma, an OG image that no longer exists.
// ============================================================================

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')

let failed = 0
function check(name, ok, detail = '') {
  console.log(`${ok ? '✓' : '✗'} ${name}${detail && !ok ? ` - ${detail}` : ''}`)
  if (!ok) failed++
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null
}

// Attribute values are HTML-escaped in the source (`&amp;` for `&`), which
// inflates their apparent length. Decode before measuring anything a search
// engine will measure on the rendered page.
const decode = (s = '') =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

// Everything between <div id="root"> and its own closing tag. The app markup
// nests <div>s and Vite hoists the module <script> into <head>, so there is no
// following tag to anchor on - scan back from </body> instead of trying to
// balance tags with a regex.
function rootMarkup(source) {
  const open = source.indexOf('<div id="root">')
  if (open === -1) return null
  const afterOpen = open + '<div id="root">'.length
  const bodyEnd = source.indexOf('</body>', afterOpen)
  if (bodyEnd === -1) return null
  const closeAt = source.lastIndexOf('</div>', bodyEnd)
  if (closeAt === -1) return null
  return source.slice(afterOpen, closeAt)
}

// --- the built page ---------------------------------------------------------

const html = read(path.join(DIST, 'index.html'))

if (!html) {
  console.error('✗ dist/index.html not found - run `npm run build` first.')
  process.exit(1)
}

check('dist/index.html exists', true)

// Pre-render: #root must arrive with real markup, not an empty shell.
const rootInner = rootMarkup(html)
check(
  'page is pre-rendered (content inside #root)',
  !!rootInner && rootInner.trim().length > 5000,
  rootInner === null ? 'no #root found' : `only ${rootInner.trim().length} chars`,
)

// CSS is inlined, so no local stylesheet should still be blocking the render.
check('stylesheet inlined (no blocking local CSS link)', !/<link[^>]*rel="stylesheet"[^>]*href="\/assets\//.test(html))

const h1s = html.match(/<h1[\s>]/g) || []
check('exactly one <h1>', h1s.length === 1, `found ${h1s.length}`)

check('<html lang> set', /<html[^>]*\slang="[a-z-]+"/i.test(html))

// --- primary meta -----------------------------------------------------------

const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim())
check('title present', !!title)
check('title length 30-65', !!title && title.length >= 30 && title.length <= 65, `length ${title?.length}`)

const desc = decode(html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1])
check('meta description present', !!desc)
check(
  'description length 70-160',
  !!desc && desc.length >= 70 && desc.length <= 160,
  `length ${desc?.length}`,
)

const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/)?.[1]
check('canonical present', !!canonical)

check('robots meta present', /<meta\s+name="robots"[^>]*content="[^"]*index/i.test(html))

// --- social cards -----------------------------------------------------------

for (const prop of ['og:type', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt']) {
  check(`${prop} present`, new RegExp(`property="${prop}"`).test(html))
}
check('twitter:card present', /name="twitter:card"/.test(html))
check('twitter:image present', /name="twitter:image"/.test(html))

// The OG image is what every share preview renders - make sure it is real.
const ogImage = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1]
if (ogImage) {
  const ogPath = path.join(DIST, ogImage.replace(/^https?:\/\/[^/]+/, ''))
  check('og:image file exists in dist', fs.existsSync(ogPath), path.relative(ROOT, ogPath))
}

// --- icons and manifest -----------------------------------------------------

check('favicon.svg exists', fs.existsSync(path.join(DIST, 'favicon.svg')))
check('apple-touch-icon link present', /rel="apple-touch-icon"/.test(html))
check('apple-touch-icon.png exists', fs.existsSync(path.join(DIST, 'apple-touch-icon.png')))
check('manifest link present', /rel="manifest"/.test(html))

const manifestRaw = read(path.join(DIST, 'site.webmanifest'))
let manifest = null
try {
  manifest = JSON.parse(manifestRaw)
  check('site.webmanifest is valid JSON', true)
} catch {
  check('site.webmanifest is valid JSON', false)
}
if (manifest) {
  check('manifest has name and icons', !!manifest.name && Array.isArray(manifest.icons) && manifest.icons.length > 0)
  const iconsOk = manifest.icons.every((i) => fs.existsSync(path.join(DIST, i.src.replace(/^\//, ''))))
  check('every manifest icon file exists', iconsOk)
}

// --- structured data --------------------------------------------------------

const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
check('JSON-LD blocks present', ldBlocks.length > 0)

let ldOk = 0
const ldTypes = []
for (const block of ldBlocks) {
  try {
    const parsed = JSON.parse(block)
    ldOk++
    ldTypes.push(parsed['@type'])
  } catch {
    /* counted as a failure below */
  }
}
check(`every JSON-LD block parses (${ldOk}/${ldBlocks.length})`, ldOk === ldBlocks.length)
check('Person schema present', ldTypes.includes('Person'))

// --- crawl files ------------------------------------------------------------

const robots = read(path.join(DIST, 'robots.txt'))
check('robots.txt exists', !!robots)
check('robots.txt allows crawling', !!robots && /Allow:\s*\//.test(robots))
check('robots.txt points at the sitemap', !!robots && /Sitemap:\s*https?:\/\//.test(robots))

const sitemap = read(path.join(DIST, 'sitemap.xml'))
check('sitemap.xml exists', !!sitemap)

if (sitemap && canonical) {
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  check('sitemap has at least one URL', locs.length > 0)
  check('canonical appears in the sitemap', locs.includes(canonical), `canonical ${canonical}`)
  const origin = new URL(canonical).origin
  check(
    'every sitemap URL shares the canonical origin',
    locs.every((l) => l.startsWith(origin)),
  )
  check('sitemap has a lastmod', /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(sitemap))
}

// --- house style ------------------------------------------------------------

// The brief bans em dashes in copy; this catches one sneaking back in.
check('no em dashes in the shipped HTML', !html.includes('—'))
check(
  'no em dashes in robots/sitemap/manifest',
  ![robots, sitemap, manifestRaw].some((t) => t && t.includes('—')),
)

// --- summary ----------------------------------------------------------------

console.log('')
if (failed) {
  console.log(`✗ ${failed} SEO check(s) failed.`)
  process.exit(1)
}
console.log('✓ All SEO checks passed.')
