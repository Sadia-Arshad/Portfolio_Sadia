import { Briefcase, MapPin } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading.jsx'
import { experience } from '../data/portfolio.js'

export default function Experience() {
  return (
    <section id="experience" aria-label="Work experience" className="section bg-[#0E1726]">
      <div className="container-page">
        <SectionHeading kicker={experience.kicker} heading={experience.heading} sub={experience.sub} />

        <div className="relative mt-14">
          {/* Vertical timeline line */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-[13px] top-2 w-px bg-gradient-to-b from-accent/60 via-white/15 to-transparent sm:left-[17px]"
          />

          <ol className="space-y-10">
            {experience.items.map((job, i) => (
              <Reveal key={job.role} delay={i * 0.08}>
                <li className="relative pl-10 sm:pl-16">
                  {/* Timeline dot */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-accent/40 bg-ink sm:h-[34px] sm:w-[34px]"
                  >
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </span>

                  <div className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-card-hover sm:p-7">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-paper">{job.role}</h3>
                        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-300">
                          <Briefcase size={14} className="text-accent" aria-hidden="true" />
                          <span className="font-medium">{job.company}</span>
                          <span aria-hidden="true" className="text-white/25">·</span>
                          <span className="inline-flex items-center gap-1 text-muted">
                            <MapPin size={13} aria-hidden="true" />
                            {job.location}
                          </span>
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <span className="rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                          {job.type}
                        </span>
                        <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300">
                          {job.period}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted">{job.summary}</p>

                    <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {job.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-slate-300">
                          <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
