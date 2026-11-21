import { ExternalLink, Github } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading.jsx'
import { frontendProjects } from '../data/portfolio.js'

function ProjectLink({ href, label, icon: Icon, type }) {
  const disabled = !href || href === '#'
  const Component = disabled ? 'span' : 'a'
  return (
    <Component
      {...(disabled ? {} : { href, target: '_blank', rel: 'noopener noreferrer' })}
      aria-disabled={disabled || undefined}
      title={disabled ? `Add a ${type} link in src/data/portfolio.js` : undefined}
      className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
        disabled
          ? 'cursor-not-allowed border-white/10 bg-white/5 text-slate-500'
          : 'border-accent/50 bg-accent/10 text-accent hover:bg-accent hover:text-ink'
      }`}
    >
      <Icon size={15} aria-hidden="true" />
      {label}
    </Component>
  )
}

/**
 * FrontendProjects - the React and Next.js work, kept in its own section so it
 * never reads as the main service. The workflow note at the top is deliberate:
 * these builds rely on Claude AI for most of the code, with review, adaptation
 * and deployment handled here.
 */
export default function FrontendProjects() {
  return (
    <section id="frontend" aria-label="AI-Assisted Frontend Projects" className="section">
      <div className="container-page">
        <SectionHeading
          kicker={frontendProjects.kicker}
          heading={frontendProjects.heading}
          sub={frontendProjects.sub}
        />

        <Reveal>
          <div className="card mt-10 p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              How these were built
            </p>
            <ul className="mt-4 space-y-2.5">
              {frontendProjects.workflow.map((line) => (
                <li key={line.slice(0, 24)} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {frontendProjects.items.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.08}>
              <article className="card flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-card-hover">
                <h3 className="text-lg font-semibold text-paper">{project.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">
                  {project.stack}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    My contribution
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {project.contribution}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                  <ProjectLink href={project.url} label="View Project" icon={ExternalLink} type="project" />
                  <ProjectLink href={project.github} label="GitHub" icon={Github} type="GitHub" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
