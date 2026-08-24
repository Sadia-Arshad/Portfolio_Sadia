import { motion, useReducedMotion } from 'framer-motion'

/**
 * Reveal — a small scroll-reveal wrapper used across the site.
 * Animates content in once, gently, and respects prefers-reduced-motion.
 */
export default function Reveal({ children, delay = 0, y = 22, className }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
