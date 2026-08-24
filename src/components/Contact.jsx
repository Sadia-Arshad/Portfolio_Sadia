import { useState } from 'react'
import { Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading.jsx'
import { contact, profile } from '../data/portfolio.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * No backend on this site — the form opens the visitor's email app with the
   * message pre-filled. To use a form service instead (e.g. Formspree), swap
   * this handler for a fetch() call to your form endpoint.
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Project enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const contactLinks = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { label: 'LinkedIn', value: 'linkedin.com/in/sadia-arshad-ch', href: profile.linkedin, icon: Linkedin },
    {
      label: 'GitHub',
      value: 'github.com/yourusername', // TODO: update once you add your real GitHub URL in src/data/portfolio.js
      href: profile.github,
      icon: Github,
    },
    { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: Phone },
    { label: 'Location', value: profile.location, href: undefined, icon: MapPin },
  ]

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-slate-500 transition-colors focus:border-accent/60 focus:outline-none'

  return (
    <section id="contact" aria-label="Contact" className="section">
      <div className="container-page">
        <SectionHeading kicker={contact.kicker} heading={contact.heading} sub={contact.sub} />

        <div className="mt-14 grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Contact details */}
          <Reveal className="lg:col-span-2">
            <div className="card p-6 sm:p-7">
              <p className="flex items-center gap-2 text-sm font-medium text-paper">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                {contact.availability}
              </p>

              <ul className="mt-6 space-y-4">
                {contactLinks.map((link) => {
                  const Icon = link.icon
                  const inner = (
                    <span className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block truncate text-sm font-medium text-slate-200">{link.value}</span>
                      </span>
                    </span>
                  )
                  return (
                    <li key={link.label}>
                      {link.href && link.href !== '#' ? (
                        <a
                          href={link.href}
                          {...(link.label === 'LinkedIn' || link.label === 'GitHub'
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="block rounded-lg transition-colors hover:bg-white/[0.04]"
                        >
                          {inner}
                        </a>
                      ) : (
                        <span className="block cursor-not-allowed" aria-disabled="true" title="TODO: add your GitHub URL in src/data/portfolio.js">
                          {inner}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card p-6 sm:p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell me about your project or role…"
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="submit" className="btn-primary">
                  <Send size={15} aria-hidden="true" />
                  Send Message
                </button>
                <p className="text-xs text-muted">{contact.formNote}</p>
              </div>

              {sent && (
                <p role="status" className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  Your email app should have opened — thanks for reaching out!
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
