// ============================================================================
// Post-build: pre-render + inline CSS
// ----------------------------------------------------------------------------
// `vite build` alone emits an empty shell - index.html ships `<div id="root">`
// with no content, so everything a crawler or a social scraper reads has to
// come from JavaScript. This step runs after the client build and does two
// things to dist/index.html:
//
//   1. Pre-render  - renders <App/> to a string with the same Vite SSR
//                    pipeline `check:render` already uses and bakes the markup
//                    into #root, so the shipped HTML contains the real page.
//                    main.jsx hydrates that markup instead of discarding it.
//   2. Inline CSS  - folds the built stylesheet into a <style> tag, removing
//                    the last render-blocking request from the critical path.
//                    The bundle is a few KB gzipped, so this is a net win.
//
//   npm run build        (runs vite build, then this)
// ============================================================================

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const indexPath = path.join(DIST, 'index.html')

if (!fs.existsSync(indexPath)) {
  console.error('✗ dist/index.html not found - run `vite build` first.')
  process.exit(1)
}

const server = await createServer({
  root: ROOT,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const appHtml = renderToString(React.createElement(App))

  const shell = fs.readFileSync(indexPath, 'utf8')
  const rootRe = /<div id="root">\s*<\/div>/

  if (!rootRe.test(shell)) {
    console.error('✗ Could not find an empty <div id="root"></div> in dist/index.html.')
    console.error('  Either the build already prerendered, or the markup changed.')
    process.exit(1)
  }

  // The prerendered markup goes inside #root. React hydrates it on load, so the
  // HTML a crawler reads and the DOM a visitor ends up with are the same page.
  let out = shell.replace(rootRe, `<div id="root">${appHtml}</div>`)

  // Fold the built stylesheet into the document, leaving no blocking CSS
  // request on the critical path. `href="/assets/..."` is the local bundle Vite
  // just emitted; the Google Fonts link is absolute https, so it is not matched.
  const cssRe = /<link[^>]*rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/
  const cssMatch = out.match(cssRe)
  let inlined = 0

  if (cssMatch) {
    const cssPath = path.join(DIST, cssMatch[1].replace(/^\//, ''))
    if (fs.existsSync(cssPath)) {
      const css = fs.readFileSync(cssPath, 'utf8')
      out = out.replace(cssRe, `<style>${css}</style>`)
      inlined = Math.round(css.length / 1024)
    }
  }

  fs.writeFileSync(indexPath, out)

  console.log(`✓ Pre-rendered ${appHtml.length} chars of markup into dist/index.html`)
  console.log(
    inlined
      ? `✓ Inlined ${inlined} KB of CSS - no render-blocking stylesheet left`
      : '! No local stylesheet found to inline - check dist/index.html',
  )
} catch (err) {
  console.error('✗ Pre-render failed:', err)
  process.exit(1)
} finally {
  await server.close()
}
