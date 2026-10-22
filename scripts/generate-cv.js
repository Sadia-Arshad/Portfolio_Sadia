// ============================================================================
// CV generator - one page
// ----------------------------------------------------------------------------
// Builds public/Sadia-Arshad-CV.pdf, the file the portfolio's "View CV" button
// opens. It is deliberately a single A4 page and a single column of linear
// text, so applicant tracking systems parse it in the order it reads.
//
// Contact details and the role facts come from src/data/portfolio.js. The
// bullet points are a condensed subset of that file's experience entries - the
// website has room for detail, one page does not - so update both when a role
// changes.
//
//   npm run build:cv
// ============================================================================

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import PDFDocument from 'pdfkit'
import { profile } from '../src/data/portfolio.js'

// Dark text on white, with one deep teal accent for structure. Everything here
// is chosen for contrast: no light greens or greys that fade on a printout.
const INK = '#0B1220'
const BODY = '#1E293B'
const MUTED = '#475569'
const ACCENT = '#0F766E'
const RULE = '#CBD5E1'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outFile = path.resolve(__dirname, '..', 'public', 'Sadia-Arshad-CV.pdf')

const MARGIN = 40
const PAGE_W = 595.28
const CONTENT_W = PAGE_W - MARGIN * 2

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 34, bottom: 30, left: MARGIN, right: MARGIN },
  bufferPages: true,
  info: { Title: 'Sadia Arshad - CV', Author: profile.name },
})

// --- helpers ----------------------------------------------------------------

function section(title) {
  doc.moveDown(0.8)
  doc.font('Helvetica-Bold').fontSize(10.8).fillColor(ACCENT).text(title.toUpperCase())
  doc.moveDown(0.18)
  doc.moveTo(MARGIN, doc.y)
    .lineTo(PAGE_W - MARGIN, doc.y)
    .strokeColor(RULE)
    .lineWidth(0.7)
    .stroke()
  doc.moveDown(0.48)
}

function paragraph(str, size = 10.5) {
  doc.font('Helvetica').fontSize(size).fillColor(BODY)
  doc.text(str, MARGIN, doc.y, { width: CONTENT_W, lineGap: 2.3 })
}

function bullet(str) {
  doc.font('Helvetica').fontSize(10.5).fillColor(BODY)
  doc.text(`-  ${str}`, MARGIN + 10, doc.y, { width: CONTENT_W - 10, lineGap: 2.2 })
  doc.moveDown(0.24)
}

// A skills bullet with the category in bold, so a recruiter skimming the page
// can find a category without reading every line. The text is still one linear
// string for an ATS; only the weight changes.
function skill(label, items) {
  doc.font('Helvetica').fontSize(10.5).fillColor(BODY)
  doc.text('-  ', MARGIN + 10, doc.y, { continued: true, width: CONTENT_W - 10 })
  doc.font('Helvetica-Bold').fillColor(INK).text(`${label}: `, { continued: true })
  doc.font('Helvetica').fillColor(BODY).text(items, { lineGap: 2.2 })
  doc.moveDown(0.24)
}

// Title on its own line, then employer, location and dates on the next - linear
// text, so an ATS reads the role before the dates rather than beside them.
function role({ title, company, location, dates, points }) {
  doc.font('Helvetica-Bold').fontSize(11).fillColor(INK)
  doc.text(title, MARGIN, doc.y, { width: CONTENT_W })
  doc.moveDown(0.08)
  doc.font('Helvetica').fontSize(9.2).fillColor(MUTED)
  doc.text(`${company}, ${location}  |  ${dates}`, MARGIN, doc.y, { width: CONTENT_W })
  doc.moveDown(0.25)
  for (const point of points) bullet(point)
  doc.moveDown(0.42)
}

// --- header -----------------------------------------------------------------

doc.font('Helvetica-Bold').fontSize(25).fillColor(INK)
doc.text(profile.name.toUpperCase(), MARGIN, doc.y, { width: CONTENT_W })

doc.moveDown(0.12)
doc.font('Helvetica-Bold').fontSize(10.6).fillColor(ACCENT)
doc.text('WordPress Developer & Web Hosting Specialist', MARGIN, doc.y, { width: CONTENT_W })

doc.moveDown(0.3)
doc.font('Helvetica').fontSize(9.2).fillColor(MUTED)
doc.text(`${profile.email}  |  ${profile.phone}  |  ${profile.location}`, MARGIN, doc.y, {
  width: CONTENT_W,
  lineGap: 1,
})
doc.moveDown(0.08)
doc.text(
  `${profile.linkedin.replace('https://', '')}  |  ${profile.github.replace('https://', '')}  |  Office GitHub: ${profile.officeGithub.replace('https://', '')}`,
  MARGIN,
  doc.y,
  { width: CONTENT_W, lineGap: 1 },
)

// --- professional summary ----------------------------------------------------

section('Professional Summary')
paragraph(
  'WordPress Developer and Web Hosting Specialist with 5+ years building, maintaining and troubleshooting business websites, eCommerce stores and landing pages. Hands-on across WordPress, WooCommerce, Elementor, cPanel, DNS, SSL and malware removal, with current work in React, Next.js and AI-assisted development.',
)

// --- core skills -------------------------------------------------------------

section('Core Skills')
skill(
  'WordPress & eCommerce',
  'WordPress, WooCommerce, Elementor, Elementor Pro, theme and plugin management, website migration, backups.',
)
skill('Hosting & Domains', 'cPanel, SPanel, Linux/Ubuntu, DNS records, domain management, SSL, Cloudflare.')
skill(
  'Security & Support',
  'malware investigation and removal, Wordfence, server hardening, PHP error troubleshooting, resource and CPU investigations.',
)
skill(
  'Frontend & AI',
  'HTML, CSS, JavaScript, React, Next.js, Vite, Tailwind CSS, Git/GitHub, AI-assisted development.',
)

// --- experience --------------------------------------------------------------

section('Professional Experience')

role({
  title: 'WordPress Developer & Linux Server Administrator',
  company: 'Zeetech (Pvt.) Ltd',
  location: 'Lahore, Pakistan',
  dates: 'Oct 2023 - Present',
  points: [
    'Build and maintain WordPress sites for trading, AI education and health clients across the UAE and Europe.',
    'Administer Linux servers via SSH, investigate PHP and Apache error logs and resolve live production incidents.',
    'Remove malware and code injection, then restore and harden server security.',
    'Manage DNS records, SSL installs and renewals, cPanel hosting and uptime monitoring.',
  ],
})

role({
  title: 'WordPress Developer & Server Manager',
  company: 'Freelance',
  location: 'Remote, Pakistan',
  dates: '2022 - Present',
  points: [
    'Deliver complete WordPress builds for clients in Switzerland, the USA and Pakistan.',
    'Manage hosting independently, covering SSH, cPanel, DNS, SSL and post-launch maintenance.',
    'Resolve live emergencies including code injection, DNS failures and downtime recovery.',
  ],
})

role({
  title: 'WordPress Developer',
  company: 'Enfotrix (Pvt.) Ltd',
  location: 'Sargodha, Pakistan',
  dates: 'Sep 2021 - Sep 2023',
  points: [
    'Built 10+ WordPress websites across eCommerce, health and creative industries.',
    'Developed WooCommerce stores with payment gateway integration.',
    'Improved Google PageSpeed scores to 90-100 through server-side optimisation and caching.',
  ],
})

// --- selected projects -------------------------------------------------------

section('Selected Projects')
bullet('Zephgain: pre-rendered React site for an AI trading platform, with per-route SEO and structured data.')
bullet('AI Pro App: multi-page React build for an AI crypto research platform, with static pre-rendering.')
bullet('TraderAI: React and Vite trading dashboard shipped to production on Render.')

// --- education ---------------------------------------------------------------

section('Education & Certification')
bullet('BS Computer Science (BSCS), completed 2022.')
bullet('DevOps Certificate, covering Linux, Git and deployment workflows.')

// --- write -------------------------------------------------------------------

doc.end()

const stream = fs.createWriteStream(outFile)
doc.pipe(stream)
stream.on('finish', () => {
  console.log(`✓ CV generated -> ${path.relative(process.cwd(), outFile)}`)
})
stream.on('error', (err) => {
  console.error('✗ Failed to write CV:', err.message)
  process.exit(1)
})
