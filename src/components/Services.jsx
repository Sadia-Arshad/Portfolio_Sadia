import { Check, Code2, Globe, LayoutTemplate, RefreshCw, Server, ShieldCheck, Wrench, Zap } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading.jsx'
import { services } from '../data/portfolio.js'

const serviceIcons = {
  layout: LayoutTemplate,
  wrench: Wrench,
  refresh: RefreshCw,
  server: Server,
  globe: Globe,
  shield: ShieldCheck,
  zap: Zap,
  code: Code2,
}

export default function Services() {
  return (
    <section id="services" aria-label="Services" className="section bg-[#0E1726]">
      <div className="container-page">
        <SectionHeading kicker={services.kicker} heading={services.heading} sub={services.sub} align="center" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((service, i) => {
            const Icon = serviceIcons[service.icon] ?? LayoutTemplate
            return (
              <Reveal key={service.title} delay={(i % 4) * 0.06}>
                <article className="card flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-card-hover">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-paper">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                  <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check size={13} className="shrink-0 text-accent" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
