import { Check, Code2, Globe, Layers, Search, Server, ShieldCheck, Sparkles } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading.jsx'
import { skills } from '../data/portfolio.js'

const skillIcons = {
  layers: Layers,
  server: Server,
  globe: Globe,
  shield: ShieldCheck,
  code: Code2,
  search: Search,
  sparkles: Sparkles,
}

/**
 * Per-category colour treatments. Full class strings are written out so
 * Tailwind can see them — never build these dynamically.
 * `from` is the gradient stop for the card's top accent bar.
 */
const tones = {
  emerald: {
    from: 'from-emerald-400/80',
    tile: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    check: 'text-emerald-400/80',
    num: 'text-emerald-400/50',
    glow: 'hover:shadow-[0_0_44px_-14px_rgba(52,211,153,0.45)]',
  },
  sky: {
    from: 'from-sky-400/80',
    tile: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
    check: 'text-sky-400/80',
    num: 'text-sky-400/50',
    glow: 'hover:shadow-[0_0_44px_-14px_rgba(56,189,248,0.45)]',
  },
  cyan: {
    from: 'from-cyan-400/80',
    tile: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300',
    check: 'text-cyan-400/80',
    num: 'text-cyan-400/50',
    glow: 'hover:shadow-[0_0_44px_-14px_rgba(34,211,238,0.45)]',
  },
  rose: {
    from: 'from-rose-400/80',
    tile: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
    check: 'text-rose-400/80',
    num: 'text-rose-400/50',
    glow: 'hover:shadow-[0_0_44px_-14px_rgba(251,113,133,0.45)]',
  },
  violet: {
    from: 'from-violet-400/80',
    tile: 'border-violet-400/30 bg-violet-400/10 text-violet-300',
    check: 'text-violet-400/80',
    num: 'text-violet-400/50',
    glow: 'hover:shadow-[0_0_44px_-14px_rgba(167,139,250,0.45)]',
  },
  amber: {
    from: 'from-amber-400/80',
    tile: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    check: 'text-amber-400/80',
    num: 'text-amber-400/50',
    glow: 'hover:shadow-[0_0_44px_-14px_rgba(251,191,36,0.45)]',
  },
  fuchsia: {
    from: 'from-fuchsia-400/80',
    tile: 'border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300',
    check: 'text-fuchsia-400/80',
    num: 'text-fuchsia-400/50',
    glow: 'hover:shadow-[0_0_44px_-14px_rgba(232,121,249,0.45)]',
  },
}

const fallbackTone = 'emerald'

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="section">
      <div className="container-page">
        <SectionHeading kicker={skills.kicker} heading={skills.heading} sub={skills.sub} align="center" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((group, i) => {
            const Icon = skillIcons[group.icon] ?? Layers
            const tone = tones[group.tone] ?? tones[fallbackTone]
            // Center the lone 7th card on the last row of the 3-column grid.
            const centeredLast = skills.groups.length % 3 !== 0 && i === skills.groups.length - 1

            return (
              <Reveal key={group.title} delay={(i % 3) * 0.07} className={centeredLast ? 'lg:col-start-2' : ''}>
                <div
                  className={`card relative h-full overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 ${tone.glow}`}
                >
                  {/* Coloured top accent bar */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${tone.from} to-transparent`}
                  />

                  {/* Header: icon + title + number badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${tone.tile}`}
                      >
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <h3 className="text-base font-semibold text-paper">{group.title}</h3>
                    </div>
                    <span className={`font-mono text-xs font-semibold ${tone.num}`} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300"
                      >
                        <Check size={12} className={tone.check} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
