import { act } from 'react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App'

/**
 * The production build pre-renders <App/> into index.html (scripts/prerender.mjs)
 * and main.jsx hydrates that markup, so the app now renders twice: once on the
 * server during the build, once in the browser. Anything that resolves
 * differently between those two passes - a browser-only value read during
 * render, a random id, viewport-dependent markup - surfaces as a hydration
 * mismatch, which React reports through console.error.
 *
 * This renders the same tree both ways and asserts React stays quiet.
 */
const tree = () => (
  <MotionConfig reducedMotion="user">
    <App />
  </MotionConfig>
)

describe('hydration', () => {
  it('hydrates the pre-rendered markup without mismatches', async () => {
    const app = tree()
    const container = document.createElement('div')
    container.innerHTML = renderToString(app)
    document.body.appendChild(container)

    const logged = []
    const spy = vi.spyOn(console, 'error').mockImplementation((...args) => {
      logged.push(args.map(String).join(' '))
    })

    let root
    try {
      await act(async () => {
        root = hydrateRoot(container, app)
      })
    } finally {
      spy.mockRestore()
    }

    await act(async () => {
      root.unmount()
    })
    container.remove()

    const mismatches = logged.filter((line) =>
      /hydrat|did not match|did not expect server|server rendered/i.test(line),
    )
    expect(mismatches).toEqual([])
  })
})
