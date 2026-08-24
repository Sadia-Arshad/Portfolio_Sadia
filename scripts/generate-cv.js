// ============================================================================
// CV generator
// ----------------------------------------------------------------------------
// Builds public/Sadia-Arshad-CV.pdf from the same content used by the website
// (src/data/portfolio.js), so the CV and the site never drift apart.
//
//   npm run build:cv
//
// The output PDF is what the "Download CV" button serves. Edit the content in
// src/data/portfolio.js (or replace the generated file with your own design)
// and re-run the script.
// ============================================================================

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import PDFDocument from 'pdfkit'
import { profile, experience, projects, skills } from '../src/data/portfolio.js'

const ACCENT = '#34D399'
const INK = '#0B1220'
const DARK = '#1E293B'
const GRAY = '#64748B'
const MUTE = '#94A3B8'
const RULE = '#E2E8F0'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outFile = path.resolve(__dirname, '..', 'public', 'Sadia-Arshad-CV.pdf')

const MARGIN = 46
const PAGE_W = 595.28 // A4 width pt
const CONTENT_W = PAGE_W - MARGIN * 2

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 44, bottom: 44, left: MARGIN, right: MARGIN },
  bufferPages: true,
  info: { Title: 'Sadia Arshad — CV', Author: profile.name },
})

// --- layout helpers (single source of truth: doc.y) ------------------------
function ensure(h) {
  if (doc.y + h > doc.page.height - 48) doc.addPage()
}

function rule(color = RULE) {
  doc.moveTo(MARGIN, doc.y)
    .lineTo(PAGE_W - MARGIN, doc.y)
    .strokeColor(color)
    .lineWidth(0.6)
    .stroke()
}

function section(title) {
  ensure(30)
  doc.moveDown(0.5)
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(ACCENT).text(title.toUpperCase())
  doc.moveDown(0.35)
  rule()
  doc.moveDown(0.5)
}

function text(str, { size = 9.5, color = DARK, bold = false, gap = 1.5 } = {}) {
  doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(size).fillColor(color)
  doc.text(str, MARGIN, doc.y, { width: CONTENT_W, lineGap: gap })
  doc.moveDown(0.35)
}

function bullets(items) {
  for (const item of items) {
    ensure(14)
    doc.font('Helvetica').fontSize(9).fillColor(DARK)
    doc.text(`•  ${item}`, MARGIN + 12, doc.y, { width: CONTENT_W - 12, lineGap: 1.5 })
    doc.moveDown(0.28)
  }
}

// --- header ----------------------------------------------------------------
doc.font('Helvetica-Bold').fontSize(22).fillColor(INK).text(profile.name.toUpperCase())
doc.moveDown(0.2)
doc.font('Helvetica-Bold').fontSize(10).fillColor(ACCENT).text(profile.title)
doc.moveDown(0.4)
rule(RULE)
doc.moveDown(0.5)

doc.font('Helvetica').fontSize(8.5).fillColor(GRAY)
doc.text(
  `${profile.email}  |  ${profile.phone}  |  ${profile.location}  |  ${profile.linkedin.replace('https://', '')}`,
  MARGIN,
  doc.y,
  { width: CONTENT_W, lineGap: 1 },
)
doc.moveDown(1)

// --- professional summary ---------------------------------------------------
section('Professional Summary')
text(
  `WordPress Developer and Web & Hosting Specialist with ${profile.yearsExperience} years of hands-on experience building, maintaining, troubleshooting and deploying websites — from single landing pages to production infrastructure. Strong practical experience with WordPress, Elementor, cPanel/SPanel, domains, DNS, SSL, Cloudflare, hosting migrations and website security, plus modern React/Vite projects, Git/GitHub workflows and production deployment with an ongoing focus on DevOps, AI automation and cloud technologies.`,
)

// --- core skills ------------------------------------------------------------
section('Core Skills')
for (const group of skills.groups) {
  ensure(12)
  doc.font('Helvetica-Bold').fontSize(9).fillColor(DARK).text(group.title)
  const lineY = doc.y
  doc.font('Helvetica').fontSize(8.8).fillColor(GRAY)
  doc.text(group.items.join('  •  '), MARGIN + 96, lineY, { width: CONTENT_W - 96, lineGap: 1.5 })
  doc.moveDown(0.45)
}

// --- professional experience -------------------------------------------------
section('Professional Experience')

for (const job of experience.items) {
  ensure(24)
  const roleW = CONTENT_W - 132
  const roleY = doc.y

  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(INK).text(job.role, MARGIN, roleY, { width: roleW })
  doc.font('Helvetica').fontSize(8.5).fillColor(MUTE)
  doc.text(job.period, MARGIN + roleW, roleY, { width: 132, align: 'right' })
  doc.y = Math.max(doc.y, roleY)
  doc.moveDown(0.15)

  doc.font('Helvetica-Bold').fontSize(8.8).fillColor(ACCENT).text(`${job.company}  —  ${job.location}`)
  doc.moveDown(0.1)
  doc.font('Helvetica-Oblique').fontSize(8.8).fillColor(GRAY).text(job.summary, MARGIN, doc.y, { width: CONTENT_W })
  doc.moveDown(0.25)

  bullets(job.points)
  doc.moveDown(0.4)
}

// --- selected projects -------------------------------------------------------
section('Selected Projects')
for (const project of projects.items) {
  ensure(14)
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(INK).text(project.name)
  doc.moveDown(0.12)
  doc.font('Helvetica').fontSize(8.8).fillColor(DARK)
  doc.text(project.contribution, MARGIN, doc.y, { width: CONTENT_W, lineGap: 1.5 })
  doc.moveDown(0.3)
}

// Selected live sites (one line each, wrapped)
ensure(14)
doc.font('Helvetica-Bold').fontSize(9.5).fillColor(INK).text('Selected Live Websites')
doc.moveDown(0.12)
doc.font('Helvetica').fontSize(8.8).fillColor(DARK)
doc.text(
  projects.liveSites.sites.map((site) => site.name).join('   •   '),
  MARGIN,
  doc.y,
  { width: CONTENT_W, lineGap: 1.5 },
)

// --- education ----------------------------------------------------------------
section('Education & Professional Development')
bullets([
  'BS Computer Science (BSCS) — completed 2022',
  'DevOps Certificate — practical learning in deployment, Linux, servers, Git and DevOps workflows',
  'Currently developing skills in DevOps, cloud deployment, AI-assisted development and automation',
])

// --- languages -----------------------------------------------------------------
section('Languages')
doc.font('Helvetica').fontSize(9).fillColor(DARK)
doc.text('English — Professional   •   Urdu — Native   •   Punjabi — Native   •   Arabic — Basic', MARGIN, doc.y, { width: CONTENT_W })
doc.moveDown(1.2)

// --- career focus ---------------------------------------------------------------
section('Career Focus')
text(
  'Interested in roles combining web development, WordPress engineering, hosting/server administration, DevOps and AI automation. Strongest value comes from practical production troubleshooting and the ability to manage a website from development through hosting, DNS, SSL, security and deployment.',
)

// --- footer on every page --------------------------------------------------------
const range = doc.bufferedPageRange()
for (let i = 0; i < range.count; i++) {
  doc.switchToPage(range.start + i)
  doc.font('Helvetica').fontSize(7.5).fillColor(MUTE)
  doc.text(
    `${profile.name} — Professional CV`,
    MARGIN,
    doc.page.height - 28,
    { width: CONTENT_W, align: 'center' },
  )
}

doc.end()

const stream = fs.createWriteStream(outFile)
doc.pipe(stream)
stream.on('finish', () => {
  console.log(`✓ CV generated → ${path.relative(process.cwd(), outFile)}`)
})
stream.on('error', (err) => {
  console.error('✗ Failed to write CV:', err.message)
  process.exit(1)
})
