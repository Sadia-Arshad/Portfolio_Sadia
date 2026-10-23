// ============================================================================
// CV content - single source of truth
// ----------------------------------------------------------------------------
// Both the PDF (generate-cv.js) and the Word document (generate-cv-docx.mjs)
// render from this module, so the two files can never drift apart. Contact
// details come from src/data/portfolio.js.
//
// Every stack written against a project was checked against that project's own
// package.json. Do not add Next.js to a project unless the repo depends on it.
// ============================================================================

import { profile } from '../src/data/portfolio.js'

export const cv = {
  name: profile.name.toUpperCase(),
  title: 'WordPress & WooCommerce Developer | Web Hosting & Security Specialist',

  // Each line is a list of segments; a segment with a `url` becomes a link.
  contactLines: [
    [
      { text: profile.email, url: `mailto:${profile.email}` },
      { text: '  |  ' },
      { text: profile.phone, url: `tel:${profile.phone.replace(/\s/g, '')}` },
      { text: '  |  ' },
      { text: profile.location },
    ],
    [
      { text: 'portfolio-sadia-rho.vercel.app', url: 'https://portfolio-sadia-rho.vercel.app/' },
      { text: '  |  ' },
      { text: 'linkedin.com/in/sadia-arshad-ch', url: profile.linkedin },
      { text: '  |  ' },
      { text: 'github.com/Sadia-Arshad', url: profile.github },
    ],
    [
      { text: 'Work GitHub (company account): ' },
      { text: 'github.com/sadiaa-lab', url: profile.officeGithub },
    ],
  ],

  summary:
    'WordPress and WooCommerce developer with 5+ years building, maintaining and securing business websites, online stores and landing pages. Hands-on across Elementor, cPanel, DNS, SSL and malware removal, with project experience in React, Next.js and AI-assisted development.',

  skills: [
    [
      'WordPress & WooCommerce',
      'WordPress, WooCommerce, Elementor, Elementor Pro, theme and plugin management, website migration, backups, website maintenance.',
    ],
    [
      'Hosting & Domains',
      'cPanel, SPanel, Linux/Ubuntu, DNS records, domain management, SSL, Cloudflare.',
    ],
    [
      'Security & Support',
      'malware investigation and removal, Wordfence, server hardening, PHP error troubleshooting, resource and CPU investigations, website monitoring.',
    ],
    [
      'Frontend & AI',
      'HTML, CSS, JavaScript, React, Next.js, Vite, Tailwind CSS, Git/GitHub, AI-assisted development with Claude.',
    ],
  ],

  roles: [
    {
      title: 'WordPress Developer & Linux Server Administrator',
      company: 'Zeetech (Pvt.) Ltd',
      location: 'Lahore, Pakistan',
      dates: 'Oct 2023 - Present',
      points: [
        'Build and maintain WordPress and WooCommerce sites for trading, AI education and health clients across the UAE and Europe.',
        'Administer Linux servers via SSH, investigate PHP and Apache error logs and resolve live production incidents.',
        'Remove malware and code injection, then restore and harden server security.',
        'Manage DNS records, SSL installs and renewals, cPanel hosting and uptime monitoring.',
      ],
    },
    {
      title: 'WordPress Developer & Server Manager (Part-time, Remote)',
      company: 'Freelance',
      location: 'Remote, Pakistan',
      dates: '2022 - Present',
      points: [
        'Deliver complete WordPress builds for clients in Switzerland, the USA and Pakistan, alongside full-time roles.',
        'Manage hosting independently, covering SSH, cPanel, DNS, SSL and post-launch maintenance.',
        'Resolve live emergencies including code injection, DNS failures and downtime recovery.',
      ],
    },
    {
      title: 'WordPress Developer',
      company: 'Enfotrix (Pvt.) Ltd',
      location: 'Sargodha, Pakistan',
      dates: 'Sep 2021 - Sep 2023',
      points: [
        'Built 10+ WordPress websites across eCommerce, health and creative industries.',
        'Developed WooCommerce stores with payment gateway integration.',
        'Provided ongoing maintenance, server support and client technical assistance.',
      ],
    },
  ],

  projects: [
    {
      name: 'Zephgain',
      stack: 'React, Vite',
      live: { label: 'zephgain-au.com', url: 'https://zephgain-au.com/' },
      repo: {
        label: 'github.com/ZeeTech-Pvt-Ltd/Zephgain',
        url: 'https://github.com/ZeeTech-Pvt-Ltd/Zephgain',
      },
      contribution:
        'Pre-rendered marketing site for an AI trading platform, with per-route SEO and structured data.',
    },
    {
      name: 'AI Pro App',
      stack: 'Next.js, React, Tailwind',
      live: { label: 'ai-proapp.com', url: 'https://ai-proapp.com/' },
      repo: {
        label: 'github.com/ZeeTech-Pvt-Ltd/AI-Pro-App',
        url: 'https://github.com/ZeeTech-Pvt-Ltd/AI-Pro-App',
      },
      contribution:
        'Multi-page Next.js build for an AI crypto research platform, with static pre-rendering and legal pages.',
    },
    {
      name: 'TraderAI',
      stack: 'React, Vite, Tailwind',
      live: { label: 'ai-trader.trade', url: 'https://ai-trader.trade/' },
      repo: {
        label: 'github.com/ZeeTech-Pvt-Ltd/traderai',
        url: 'https://github.com/ZeeTech-Pvt-Ltd/traderai',
      },
      contribution:
        'Trading dashboard interface with responsive layouts, routing and production deployment on Render.',
    },
  ],

  education: [
    'BS Computer Science (BSCS), completed 2022.',
    'DevOps Certificate, covering Linux, Git and deployment workflows.',
  ],
}
