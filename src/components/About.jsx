import Reveal from './Reveal'
import SectionHeading from './SectionHeading.jsx'
import { about } from '../data/portfolio.js'

export default function About() {
  return (
    <section id="about" aria-label="About me" className="section bg-[#0E1726]">
      <div className="container-page">
        <SectionHeading kicker={about.kicker} heading={about.heading} />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Narrative + quick facts */}
          <Reveal>
            <div className="space-y-5">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="leading-relaxed text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-2">
              {about.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{fact.label}</dt>
                  <dd className="text-sm font-medium text-paper">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Stat tiles */}
          <Reveal delay={0.1}>
            <div className="grid h-full grid-cols-2 gap-4">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="card flex flex-col justify-between gap-3 p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="text-3xl font-bold tracking-tight text-accent sm:text-4xl">{stat.value}</span>
                  <span className="text-sm font-medium text-slate-300">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
