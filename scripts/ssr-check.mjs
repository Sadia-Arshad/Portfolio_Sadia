// Quick render smoke-test: mounts the full app via Vite SSR and renders it to
// a string. Any render-time crash (bad import, undefined data, bad hook usage)
// will throw here. Not a substitute for a browser check, but catches most
// runtime errors without one.
import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const html = renderToString(React.createElement(App))
  const checks = [
    ['navbar', html.includes('id="mobile-menu"')],
    ['hero heading', html.includes('Building Reliable Websites')],
    ['about', html.includes('id="about"')],
    ['service stats', html.includes('Ticket SLA') && html.includes('Malware Cleanups')],
    ['skills', html.includes('id="skills"')],
    ['experience', html.includes('id="experience"')],
    ['projects', html.includes('id="projects"')],
    ['services', html.includes('id="services"')],
    ['contact', html.includes('id="contact"')],
    ['footer', html.includes('Sadia Arshad. All rights reserved')],
    ['download CV link', html.includes('/Sadia-Arshad-CV.pdf')],
    ['skip link', html.includes('Skip to content')],
  ]
  let failed = false
  for (const [name, ok] of checks) {
    console.log(`${ok ? '✓' : '✗'} ${name}`)
    if (!ok) failed = true
  }
  console.log(`Rendered length: ${html.length} chars`)
  process.exit(failed ? 1 : 0)
} catch (err) {
  console.error('✗ Render failed:', err)
  process.exit(1)
} finally {
  await server.close()
}
