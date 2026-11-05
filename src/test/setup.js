import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Unmount between tests.
afterEach(() => cleanup())

// --- jsdom lacks browser APIs that framer-motion needs ---

// useReducedMotion() calls window.matchMedia
if (typeof window.matchMedia !== 'function') {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

// The Reviews section fetches approved reviews on mount. Unit tests must never
// reach the network - a real request makes runs slow and intermittently flaky,
// and it would fail on a machine without internet. Every test gets an empty,
// already-resolved response.
globalThis.fetch = vi.fn(async () => ({
  ok: true,
  status: 200,
  json: async () => [],
}))

// whileInView (Reveal, Hero) and Navbar's scroll-spy use IntersectionObserver
if (typeof window.IntersectionObserver === 'undefined') {
  class MockIntersectionObserver {
    constructor(callback) {
      this.callback = callback
    }
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  window.IntersectionObserver = MockIntersectionObserver
}
