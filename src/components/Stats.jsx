import Reveal from './Reveal'
import { serviceStats } from '../data/portfolio.js'

/**
 * Tone → text colour. Kept as a static lookup so Tailwind can see the
 * full class names (dynamic strings get purged).
 */
const toneClass = {
  emerald: 'text-emerald-300',
  indigo: 'text-indigo-300',
  rose: 'text-rose-300',
  sky: 'text-sky-300',
}

/**
 * Stats — a compact service-level metrics band (Ticket SLA, sites optimized,
 * malware cleanups, uptime). Mirrors the metric tiles on jahirul.com.bd:
 * a label, a bold value and a colour-coded sub-label per tile.
 */
export default function Stats() {
  return (
    <section aria-label="Service metrics" className="py-10 sm:py-14">
      <div className="container-page">
        <Reveal>
          <p className="section-label mb-6 flex justify-center">
            <span aria-hidden="true" className="h-px w-6 bg-accent/70" />
            {serviceStats.kicker}
          </p>

          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {serviceStats.items.map((stat) => (
              <div
                key={stat.label}
                className="card flex flex-col gap-2.5 p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{stat.label}</dt>
                <dd className="flex flex-col gap-1.5">
                  <span className="text-3xl font-bold tracking-tight text-paper sm:text-4xl">{stat.value}</span>
                  <span className={`text-sm font-medium ${toneClass[stat.tone] ?? 'text-slate-300'}`}>{stat.sub}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
