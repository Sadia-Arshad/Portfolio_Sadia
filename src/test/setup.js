import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

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
