import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, MapPin, Mail } from 'lucide-react'
import { profile } from '../data/portfolio.js'

const ease = [0.21, 0.47, 0.32, 0.98]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease },
})

/**
 * The "system" rows shown in the hero card — a truthful summary of the
 * areas Sadia manages, not fabricated metrics.
 */
const systemRows = [
  { label: 'WordPress', value: 'Development & Maintenance' },
  { label: 'Hosting', value: 'cPanel · SPanel · Linux' },
  { label: 'Domains & DNS', value: 'Records · Nameservers · SSL' },
  { label: 'Security', value: 'Wordfence · Cloudflare · Malware' },
  { label: 'Performance', value: 'Caching · Core Web Vitals' },
  { label: 'Deployment', value: 'Vercel · Render · Git' },
]

export default function Hero() {
  const [firstLine, rest] = profile.heading.split(' From Development to Deployment.')
  const secondLine = rest !== undefined ? 'From Development to Deployment.' : firstLine

  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden">
      {/* Subtle background accents only — kept restrained per design direction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[34rem] w-[34rem] rounded-full bg-accent/[0.05] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-sky-500/[0.04] blur-[120px]"
      />

      <div className="container-page relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-28">
        {/* Left — copy */}
        <div className="lg:col-span-7">
          <motion.p
            {...fadeUp(0)}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 pl-2 pr-4 text-xs font-medium text-slate-300"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            {profile.availability}
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            className="text-4xl font-bold leading-[1.08] tracking-tight text-paper sm:text-5xl lg:text-6xl"
          >
            {firstLine}{' '}
            <span className="text-accent">{secondLine}</span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.heroText}
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn-primary">
              View My Work
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn-secondary">
              Let's Connect
            </a>
          </motion.div>

          {/* Tech strip */}
          <motion.div {...fadeUp(0.32)} className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Core stack</p>
            <ul className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-slate-300">
              {profile.techStrip.map((tech, i) => (
                <li key={tech} className="flex items-center gap-2">
                  <span className="font-medium text-paper">{tech}</span>
                  {i < profile.techStrip.length - 1 && (
                    <span aria-hidden="true" className="text-accent/60">
                      •
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right — capability card */}
        <motion.div {...fadeUp(0.2)} className="lg:col-span-5">
          <div className="relative mx-auto max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl bg-gradient-to-b from-accent/10 via-transparent to-transparent"
            />
            <div className="card relative p-6 sm:p-7">
              {/* Card header */}
              <div className="flex items-center justify-between gap-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  <span className="inline-flex h-2 w-2 animate-pulse-dot rounded-full bg-emerald-400" aria-hidden="true" />
                  System Status
                </p>
                <span className="rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                  Live
                </span>
              </div>

              <div className="mt-5 border-t border-white/10" />

              <ul className="mt-2">
                {systemRows.map((row, i) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-4 border-b border-white/5 py-3"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    <span className="flex items-center gap-3 text-sm text-slate-200">
                      <CheckCircle2 size={16} className="shrink-0 text-accent" aria-hidden="true" />
                      {row.label}
                    </span>
                    <span className="text-right text-xs text-muted">{row.value}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <MapPin size={13} className="text-accent" aria-hidden="true" />
                  {profile.location}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <Mail size={13} className="text-accent" aria-hidden="true" />
                  {profile.email}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
