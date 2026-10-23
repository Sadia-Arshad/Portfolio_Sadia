// ============================================================================
// CV generator - one page PDF
// ----------------------------------------------------------------------------
// Builds public/Sadia-Arshad-CV.pdf, the file the portfolio's "View CV" button
// opens. It is deliberately a single A4 page and a single column of linear
// text, so applicant tracking systems parse it in the order it reads.
//
// All copy lives in scripts/cv-content.mjs, shared with the Word generator so
// the two documents cannot drift apart.
//
//   npm run build:cv
// ============================================================================

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import PDFDocument from 'pdfkit'
import { cv } from './cv-content.mjs'

// Dark text on white, with one deep teal accent for structure and links.
// Everything here is chosen for contrast: no light greens or greys that fade
// on a printout.
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
  margins: { top: 30, bottom: 28, left: MARGIN, right: MARGIN },
  bufferPages: true,
  info: { Title: 'Sadia Arshad - CV', Author: cv.name },
})

// --- helpers ----------------------------------------------------------------

function section(title) {
  doc.moveDown(0.46)
  doc.font('Helvetica-Bold').fontSize(10.8).fillColor(ACCENT).text(title.toUpperCase())
  doc.moveDown(0.12)
  doc.moveTo(MARGIN, doc.y)
    .lineTo(PAGE_W - MARGIN, doc.y)
    .strokeColor(RULE)
    .lineWidth(0.7)
    .stroke()
  doc.moveDown(0.24)
}

function paragraph(str, size = 10.5) {
  doc.font('Helvetica').fontSize(size).fillColor(BODY)
  doc.text(str, MARGIN, doc.y, { width: CONTENT_W, lineGap: 2.3 })
}

function bullet(str) {
  doc.font('Helvetica').fontSize(10.5).fillColor(BODY)
  doc.text(`-  ${str}`, MARGIN + 10, doc.y, { width: CONTENT_W - 10, lineGap: 1.8 })
  doc.moveDown(0.1)
}

// A skills bullet with the category in bold, so a recruiter skimming the page
// can find a category without reading every line. The text is still one linear
// string for an ATS; only the weight changes.
function skill(label, items) {
  doc.font('Helvetica').fontSize(10.5).fillColor(BODY)
  doc.text('-  ', MARGIN + 10, doc.y, { continued: true, width: CONTENT_W - 10 })
  doc.font('Helvetica-Bold').fillColor(INK).text(`${label}: `, { continued: true })
  doc.font('Helvetica').fillColor(BODY).text(items, { lineGap: 1.8 })
  doc.moveDown(0.1)
}

// Renders one line made of segments, each optionally a clickable URL. PDFKit's
// `link` paints a rectangle over the text box, so the width of every segment is
// measured before it is drawn.
function linkRow(y, parts, { size = 9.2, color = MUTED } = {}) {
  let x = MARGIN
  for (const part of parts) {
    doc
      .font(part.bold ? 'Helvetica-Bold' : 'Helvetica')
      .fontSize(size)
      .fillColor(part.url ? ACCENT : part.color || color)
    const width = doc.widthOfString(part.text)
    doc.text(part.text, x, y, { lineBreak: false })
    if (part.url) doc.link(x, y - 1, width, size + 3, part.url)
    x += width
  }
  // `lineBreak: false` deliberately leaves doc.y untouched, so advance it here
  // or the next block draws straight on top of this line.
  doc.y = y + size * 1.35
}

// Title on its own line, then employer, location and dates on the next - linear
// text, so an ATS reads the role before the dates rather than beside them.
function role({ title, company, location, dates, points }) {
  doc.font('Helvetica-Bold').fontSize(11.2).fillColor(INK)
  doc.text(title, MARGIN, doc.y, { width: CONTENT_W })
  doc.moveDown(0.07)
  doc.font('Helvetica').fontSize(9.3).fillColor(MUTED)
  doc.text(`${company}, ${location}  |  ${dates}`, MARGIN, doc.y, { width: CONTENT_W })
  doc.moveDown(0.16)
  for (const point of points) bullet(point)
  doc.moveDown(0.24)
}

function project({ name, stack, live, repo, contribution }) {
  linkRow(doc.y, [
    { text: name, bold: true, color: INK },
    { text: `  |  ${stack}  |  `, color: MUTED },
    { text: live.label, url: live.url },
    { text: '  |  ' },
    { text: repo.label, url: repo.url },
  ])
  doc.moveDown(0.52)
  doc.font('Helvetica').fontSize(10).fillColor(BODY)
  doc.text(contribution, MARGIN, doc.y, { width: CONTENT_W, lineGap: 2.0 })
  doc.moveDown(0.24)
}

// --- header -----------------------------------------------------------------

doc.font('Helvetica-Bold').fontSize(24).fillColor(INK)
doc.text(cv.name, MARGIN, doc.y, { width: CONTENT_W })

doc.moveDown(0.1)
doc.font('Helvetica-Bold').fontSize(10.4).fillColor(ACCENT)
doc.text(cv.title, MARGIN, doc.y, { width: CONTENT_W })

doc.moveDown(0.24)
for (const line of cv.contactLines) {
  linkRow(doc.y, line)
  doc.moveDown(0.45)
}
doc.moveDown(-0.1)

// --- professional summary ----------------------------------------------------

section('Professional Summary')
paragraph(cv.summary)

// --- core skills -------------------------------------------------------------

section('Core Skills')
for (const [label, items] of cv.skills) skill(label, items)

// --- experience --------------------------------------------------------------

section('Professional Experience')
for (const item of cv.roles) role(item)

// --- selected projects -------------------------------------------------------

section('Selected Projects')
for (const item of cv.projects) project(item)

// --- education ---------------------------------------------------------------

section('Education & Certification')
for (const line of cv.education) bullet(line)

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
