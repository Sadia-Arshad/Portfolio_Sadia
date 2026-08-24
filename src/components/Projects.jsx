import { ExternalLink, Github, Globe, Tag } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading.jsx'
import { projects } from '../data/portfolio.js'

/**
 * Renders a project button. When the URL is still "#", the button renders in a
 * disabled state with a TODO comment in the data file so it's easy to wire up.
 */
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

export default function Projects() {
  // Three projects → 3-column grid; two → balanced 2-column grid.
  const projectCols = projects.items.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
  return (
    <section id="projects" aria-label="Projects" className="section">
      <div className="container-page">
        <SectionHeading kicker={projects.kicker} heading={projects.heading} sub={projects.sub} />

        {/* Main project cards */}
        <div className={`mt-14 grid gap-5 ${projectCols}`}>
          {projects.items.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.08}>
              <article className="card flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-card-hover">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                    <Tag size={11} aria-hidden="true" />
                    {project.tag}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-paper">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Key contribution</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.contribution}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                  <ProjectLink href={project.url} label="View Project" icon={ExternalLink} type="project" />
                  <ProjectLink href={project.github} label="GitHub" icon={Github} type="GitHub" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Selected live websites */}
        <Reveal>
          <div className="mt-16 border-t border-white/10 pt-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-paper">{projects.liveSites.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{projects.liveSites.note}</p>
              </div>
            </div>

            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {projects.liveSites.sites.map((site) => (
                <li key={site.name}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-accent/40 hover:bg-white/[0.05]"
                  >
                    <Globe size={15} className="shrink-0 text-accent" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-paper">{site.name}</span>
                      <span className="block truncate text-xs text-muted">{site.note}</span>
                    </span>
                    <ExternalLink
                      size={13}
                      className="shrink-0 text-slate-500 transition-colors group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
