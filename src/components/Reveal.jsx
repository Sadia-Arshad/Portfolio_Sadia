import { motion } from 'framer-motion'

/**
 * Reveal - a small scroll-reveal wrapper used across the site.
 * Animates content in once, gently. Reduced motion is handled globally by the
 * <MotionConfig reducedMotion="user"> wrapper in main.jsx, which drops the
 * transform and keeps the fade.
 *
 * `initial` is deliberately deterministic: useReducedMotion() resolves to null
 * while pre-rendering and to a real value on the client, so branching on it
 * here would produce markup that differs from the server's and break hydration.
 */
export default function Reveal({ children, delay = 0, y = 22, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
