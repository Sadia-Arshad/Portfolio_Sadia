import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')

const app = (
  <React.StrictMode>
    {/* Respects the user's prefers-reduced-motion setting for all animations. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>
)

// `npm run build` pre-renders <App/> into index.html (see scripts/prerender.mjs),
// so a production container already holds the markup and we hydrate it rather
// than rebuild it. The dev server serves an empty shell, so fall back to a
// plain client render there.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app)
} else {
  ReactDOM.createRoot(container).render(app)
}
