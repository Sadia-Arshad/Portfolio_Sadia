// ============================================================================
// CV generator - editable Word document
// ----------------------------------------------------------------------------
// Writes public/Sadia-Arshad-CV.docx from the same content as the PDF
// (scripts/cv-content.mjs), so the two can never disagree.
//
// No dependency is used: a .docx is an OPC package, which is a ZIP of XML
// parts, so this file writes the four parts and then zips them with a small
// purpose-built writer. Hyperlinks are real Word hyperlinks, not just coloured
// text, so they stay clickable after editing.
//
//   npm run build:cv:docx
// ============================================================================

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { cv } from './cv-content.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outFile = path.resolve(__dirname, '..', 'public', 'Sadia-Arshad-CV.docx')

const INK = '0B1220'
const BODY = '1E293B'
const MUTED = '475569'
const ACCENT = '0F766E'

// --- ZIP writer --------------------------------------------------------------

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

// DOS timestamp for the archive entries: 2026-10-23 00:00. A zeroed DOS date
// means month 0, day 0, which some readers treat as a corrupt archive.
const DOS_DATE = ((2026 - 1980) << 9) | (10 << 5) | 23
const DOS_TIME = 0

function zipArchive(entries) {
  const localParts = []
  const centralParts = []
  let offset = 0

  for (const { name, data } of entries) {
    const nameBuf = Buffer.from(name, 'utf8')
    const crc = crc32(data)
    const deflated = zlib.deflateRawSync(data, { level: 9 })
    const useDeflate = deflated.length < data.length
    const body = useDeflate ? deflated : data
    const method = useDeflate ? 8 : 0

    const local = Buffer.alloc(30)
    local.writeUInt32LE(0x04034b50, 0)
    local.writeUInt16LE(20, 4)
    local.writeUInt16LE(0, 6)
    local.writeUInt16LE(method, 8)
    local.writeUInt16LE(DOS_TIME, 10)
    local.writeUInt16LE(DOS_DATE, 12)
    local.writeUInt32LE(crc, 14)
    local.writeUInt32LE(body.length, 18)
    local.writeUInt32LE(data.length, 22)
    local.writeUInt16LE(nameBuf.length, 26)
    local.writeUInt16LE(0, 28)

    const central = Buffer.alloc(46)
    central.writeUInt32LE(0x02014b50, 0)
    central.writeUInt16LE(20, 4)
    central.writeUInt16LE(20, 6)
    central.writeUInt16LE(0, 8)
    central.writeUInt16LE(method, 10)
    central.writeUInt16LE(DOS_TIME, 12)
    central.writeUInt16LE(DOS_DATE, 14)
    central.writeUInt32LE(crc, 16)
    central.writeUInt32LE(body.length, 20)
    central.writeUInt32LE(data.length, 24)
    central.writeUInt16LE(nameBuf.length, 28)
    central.writeUInt16LE(0, 30)
    central.writeUInt16LE(0, 32)
    central.writeUInt16LE(0, 34)
    central.writeUInt16LE(0, 36)
    central.writeUInt32LE(0, 38)
    central.writeUInt32LE(offset, 42)

    localParts.push(local, nameBuf, body)
    centralParts.push(central, nameBuf)
    offset += local.length + nameBuf.length + body.length
  }

  const centralBuf = Buffer.concat(centralParts)
  const eocd = Buffer.alloc(22)
  eocd.writeUInt32LE(0x06054b50, 0)
  eocd.writeUInt16LE(0, 4)
  eocd.writeUInt16LE(0, 6)
  eocd.writeUInt16LE(entries.length, 8)
  eocd.writeUInt16LE(entries.length, 10)
  eocd.writeUInt32LE(centralBuf.length, 12)
  eocd.writeUInt32LE(offset, 16)
  eocd.writeUInt16LE(0, 20)

  return Buffer.concat([...localParts, centralBuf, eocd])
}

// --- OOXML helpers -----------------------------------------------------------

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Every hyperlink needs a relationship entry; collect them as we build.
const relationships = []
function relId(url) {
  const existing = relationships.findIndex((r) => r.url === url)
  if (existing !== -1) return `rIdL${existing + 1}`
  relationships.push({ url })
  return `rIdL${relationships.length}`
}

// Word sizes are half-points: 21 = 10.5pt.
const run = (text, { bold = false, size = 21, color = BODY, underline = false } = {}) =>
  `<w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>${
    bold ? '<w:b/>' : ''
  }<w:color w:val="${color}"/>${underline ? '<w:u w:val="single"/>' : ''}<w:sz w:val="${size}"/><w:szCs w:val="${size}"/></w:rPr><w:t xml:space="preserve">${esc(
    text,
  )}</w:t></w:r>`

const linkRun = (text, url, { size = 18, color = ACCENT } = {}) =>
  `<w:hyperlink r:id="${relId(url)}" w:history="1"><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:color w:val="${color}"/><w:u w:val="single"/><w:sz w:val="${size}"/><w:szCs w:val="${size}"/></w:rPr><w:t xml:space="preserve">${esc(
    text,
  )}</w:t></w:r></w:hyperlink>`

const para = (runs, { before = 0, after = 0, line = 240, rule = false } = {}) =>
  `<w:p><w:pPr><w:spacing w:before="${before}" w:after="${after}" w:line="${line}" w:lineRule="auto"/>${
    rule ? `<w:pBdr><w:bottom w:val="single" w:sz="4" w:space="1" w:color="CBD5E1"/></w:pBdr>` : ''
  }</w:pPr>${runs}</w:p>`

const section = (title) =>
  para(run(title.toUpperCase(), { bold: true, size: 22, color: ACCENT }), {
    before: 170,
    after: 40,
    rule: true,
  })

const bullet = (runs, extra = {}) =>
  para(run('-  ', { size: 21 }) + runs, { after: 12, ...extra })

// --- document body -----------------------------------------------------------

const body = []

body.push(para(run(cv.name, { bold: true, size: 48, color: INK }), { after: 0, line: 240 }))
body.push(para(run(cv.title, { bold: true, size: 21, color: ACCENT }), { after: 60 }))

for (const line of cv.contactLines) {
  const runs = line.map((part) =>
    part.url
      ? linkRun(part.text, part.url)
      : run(part.text, { size: 18, color: MUTED }),
  )
  body.push(para(runs.join(''), { after: 12 }))
}

body.push(section('Professional Summary'))
body.push(para(run(cv.summary, { size: 21 }), { after: 30 }))

body.push(section('Core Skills'))
for (const [label, items] of cv.skills) {
  body.push(
    bullet(
      run(label + ': ', { bold: true, size: 21, color: INK }) + run(items, { size: 21 }),
    ),
  )
}

body.push(section('Professional Experience'))
for (const item of cv.roles) {
  body.push(
    para(run(item.title, { bold: true, size: 22, color: INK }), { before: 80, after: 0 }),
  )
  body.push(
    para(run(`${item.company}, ${item.location}  |  ${item.dates}`, { size: 19, color: MUTED }), {
      after: 30,
    }),
  )
  for (const point of item.points) body.push(bullet(run(point, { size: 21 })))
}

body.push(section('Selected Projects'))
for (const item of cv.projects) {
  const facts =
    run(item.name, { bold: true, size: 21, color: INK }) +
    run(`  |  ${item.stack}  |  `, { size: 18, color: MUTED }) +
    linkRun(item.live.label, item.live.url) +
    run('  |  ', { size: 18 }) +
    linkRun(item.repo.label, item.repo.url)
  body.push(para(facts, { before: 100, after: 20 }))
  body.push(para(run(item.contribution, { size: 20 }), { after: 60 }))
}

body.push(section('Education & Certification'))
for (const line of cv.education) body.push(bullet(run(line, { size: 21 })))

const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>${body.join(
  '',
)}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="600" w:right="800" w:bottom="560" w:left="800" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr></w:body></w:document>`

const documentRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${relationships
  .map(
    (r, i) =>
      `<Relationship Id="rIdL${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${esc(
        r.url,
      )}" TargetMode="External"/>`,
  )
  .join('')}</Relationships>`

const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`

const packageRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`

const archive = zipArchive([
  { name: '[Content_Types].xml', data: Buffer.from(contentTypes, 'utf8') },
  { name: '_rels/.rels', data: Buffer.from(packageRels, 'utf8') },
  { name: 'word/document.xml', data: Buffer.from(documentXml, 'utf8') },
  { name: 'word/_rels/document.xml.rels', data: Buffer.from(documentRels, 'utf8') },
])

fs.writeFileSync(outFile, archive)
console.log(
  `✓ Word CV generated -> ${path.relative(process.cwd(), outFile)} (${relationships.length} links)`,
)
