import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { footer, profile } from '../data/portfolio.js'

const socials = [
  { label: 'GitHub', href: profile.github, icon: Github },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B1220]">
      <div className="container-page flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-sm font-bold tracking-[0.18em] text-paper">
            {footer.name.toUpperCase()}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-xs text-muted">{footer.title}</p>
        </div>

        <nav aria-label="Social links" className="flex items-center gap-2">
          {socials.map((social) => {
            const Icon = social.icon
            const disabled = social.href === '#' || !social.href
            if (disabled) {
              return (
                <span
                  key={social.label}
                  className="inline-flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-500"
                  title="TODO: add your GitHub URL in src/data/portfolio.js"
                >
                  <Icon size={16} aria-hidden="true" />
                  <span className="sr-only">{social.label}</span>
                </span>
              )
            }
            return (
              <a
                key={social.label}
                href={social.href}
                {...(social.label !== 'Email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={social.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
              >
                <Icon size={16} aria-hidden="true" />
                <span className="sr-only">{social.label}</span>
              </a>
            )
          })}

          <a
            href="#home"
            aria-label="Back to top"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent transition-colors hover:bg-accent hover:text-ink"
          >
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </nav>
      </div>

      <div className="border-t border-white/5 py-5">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-center text-xs text-muted sm:flex-row">
          <p>{footer.copyright}</p>
          <p>Built with React, Vite &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
