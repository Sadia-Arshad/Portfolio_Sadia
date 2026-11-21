// ============================================================================
// Portfolio content
// ----------------------------------------------------------------------------
// All of the text for the site lives in this one file so you can update it in
// a single place. Search for "TODO" to find every placeholder that still needs
// your real information (GitHub URL, project links, share image, etc.).
// ============================================================================

export const profile = {
  name: 'Sadia Arshad',
  firstName: 'Sadia',
  monogram: 'SA',

  title: 'WordPress Developer & Web Hosting Specialist',

  // Hero
  availability: 'Available for WordPress and hosting roles in Pakistan, Saudi Arabia and remote teams',
  // Split into two lines so the second half can carry the accent colour.
  headingLead: '5+ Years of Experience',
  headingAccent: 'Building, Managing & Securing Websites.',
  heroText:
    'WordPress Developer and Web Hosting Specialist with 5+ years of hands-on experience in WordPress, WooCommerce, cPanel and Linux hosting, DNS, SSL, Cloudflare and website security, plus AI-assisted frontend work in React and Next.js.',

  // Tech strip shown under the hero CTAs - mirrors the primary skill set.
  techStrip: ['WordPress', 'WooCommerce', 'cPanel', 'Linux', 'DNS', 'SSL', 'Cloudflare', 'Website Security'],

  // Contact (from your CV - update if needed)
  email: 'misbahsadiach@gmail.com',
  phone: '+92 307 726 8618', // TODO: remove this line if you don't want your phone public
  location: 'Lahore, Pakistan',
  linkedin: 'https://www.linkedin.com/in/sadia-arshad-ch',
  github: 'https://github.com/Sadia-Arshad',
  officeGithub: 'https://github.com/sadiaa-lab',
  cvPath: '/Sadia-Arshad-CV.pdf',

  yearsExperience: '5+',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

// ----------------------------------------------------------------------------
// About
// ----------------------------------------------------------------------------
export const about = {
  kicker: 'About Me',
  heading: 'WordPress, hosting and the full stack around it.',
  paragraphs: [
    "I'm a WordPress Developer with 5+ years of hands-on experience building, maintaining, troubleshooting and deploying websites - from a single landing page to production infrastructure.",
    'My work goes beyond WordPress development. I manage hosting environments, cPanel and SPanel, domains, DNS, SSL certificates, Cloudflare, server configuration, migrations, security and production troubleshooting. I also build modern frontends with React, Vite and Tailwind CSS, and ship with Git/GitHub on platforms like Vercel and Render.',
    "I'm currently deepening my skills in DevOps, cloud deployment, AI-assisted development and workflow automation.",
  ],
  // Only figures that can be backed up. Claims such as "75+ sites" and the
  // SLA/uptime percentages were removed because there are no records for them.
  stats: [
    { value: '5+', label: 'Years of Experience' },
    { value: 'BSCS', label: 'Computer Science, 2022' },
    { value: 'DevOps', label: 'Certificate' },
  ],
  facts: [
    { label: 'Name', value: 'Sadia Arshad' },
    { label: 'Focus', value: 'WordPress + Hosting Expertise' },
    { label: 'Degree', value: 'BS Computer Science (BSCS) · 2022' },
    { label: 'Certificate', value: 'DevOps Engineering' },
    { label: 'Location', value: 'Lahore, Pakistan' },
  ],
}

// The service-level metrics band (98% SLA, 120+ optimisations, 400+ malware
// cleanups, 99.9% uptime) was removed: none of those figures can be backed by
// records, so they should not appear on the site. The component that rendered
// it has been deleted rather than left as dead code.

// ----------------------------------------------------------------------------
// Skills
// ----------------------------------------------------------------------------
export const skills = {
  kicker: 'Skills',
  heading: 'WordPress and the hosting stack behind it.',
  sub: 'The core skill set is WordPress and the hosting, DNS and security work that keeps it online. Frontend and AI-assisted work is listed separately, at the level it is actually used.',
  groups: [
    {
      title: 'WordPress & WooCommerce',
      icon: 'layers',
      tone: 'emerald',
      items: [
        'WordPress',
        'WooCommerce',
        'Elementor',
        'Elementor Pro',
        'Theme Customization',
        'Plugin Management',
        'Website Maintenance',
        'Website Migration',
        'Backups',
      ],
    },
    {
      title: 'Hosting, DNS & Security',
      icon: 'server',
      tone: 'sky',
      items: [
        'cPanel',
        'SPanel',
        'Linux / Ubuntu',
        'DNS Records',
        'Domain Management',
        'SSL / Let’s Encrypt',
        'Cloudflare',
        'Website Security',
        'Malware Investigation & Removal',
        'Server Troubleshooting',
      ],
    },
    {
      title: 'Additional',
      icon: 'code',
      tone: 'violet',
      items: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'AI-Assisted Development',
      icon: 'sparkles',
      tone: 'fuchsia',
      items: ['Claude AI', 'React', 'Next.js', 'Git / GitHub', 'Vercel'],
    },
  ],
}

// ----------------------------------------------------------------------------
// Experience
// ----------------------------------------------------------------------------
export const experience = {
  kicker: 'Experience',
  heading: 'Five-plus years of production WordPress & hosting work.',
  sub: 'A timeline of practical, production experience across agencies, freelance work and direct client projects.',
  items: [
    {
      role: 'WordPress Developer & Linux Server Administrator',
      company: 'Zeetech (Pvt.) Ltd',
      location: 'Lahore, Pakistan',
      period: 'Oct 2023 - Present',
      type: 'Full-time',
      summary:
        'Developing and operating WordPress platforms for financial trading, AI education and health clients across the UAE and Europe.',
      points: [
        'Designed and developed WordPress websites for financial trading, AI education and health platforms serving UAE and European clients',
        'Administered Linux web servers via SSH - file management, permissions and command-line troubleshooting',
        'Monitored and resolved Apache/Nginx/PHP error logs on live production sites',
        'Detected, isolated and removed malware and code injection attacks; restored and hardened server security',
        'Managed DNS records (A, CNAME, MX, TXT), domain routing, email setup and propagation troubleshooting',
        'Configured firewall rules and IP blocking/unblocking against DDoS and brute-force attacks',
        'Administered MySQL databases via terminal - queries, table repair, backup and restoration',
        'Managed the full hosting lifecycle: cPanel, domains, SSL/TLS install and renewal, uptime monitoring',
      ],
    },
    {
      role: 'Freelance WordPress Developer & Server Manager',
      company: 'Self-Employed',
      location: 'Remote · Pakistan',
      period: '2022 - Present',
      type: 'Freelance',
      summary:
        'Delivering complete WordPress builds and managing hosting and server infrastructure for clients in Switzerland, the USA and Pakistan.',
      points: [
        'Delivered complete WordPress websites for clients in Switzerland, the USA and Pakistan',
        'Managed server environments independently - SSH, cPanel, DNS, SSL and post-launch maintenance',
        'Resolved live emergencies - code injection, DNS failures, SSL expiry and downtime recovery',
        'Communicated technical work clearly with clients, hosting providers and team members',
      ],
    },
    {
      role: 'WordPress Developer',
      company: 'Enfotrix (Pvt.) Ltd',
      location: 'Sargodha, Pakistan',
      period: 'Sep 2021 - Sep 2023',
      type: 'Full-time',
      summary:
        'Built and maintained WordPress and WooCommerce websites across eCommerce, health and creative industries.',
      points: [
        'Built WordPress websites across eCommerce, health and creative industries',
        'Developed WooCommerce stores with payment gateway integration',
        'Provided ongoing maintenance, server support and client technical assistance',
      ],
    },
  ],
}

// ----------------------------------------------------------------------------
// Projects
// ----------------------------------------------------------------------------
export const projects = {
  kicker: 'Projects',
  heading: 'WordPress and WooCommerce projects.',
  sub: 'Client sites I built, host and maintain, with the business purpose and the technical work behind each.',
  items: [
    {
      name: 'ThreadStudio',
      tag: 'WooCommerce Store',
      description:
        'Fashion eCommerce store built on WordPress with WooCommerce and Elementor Pro.',
      tech: ['WordPress', 'WooCommerce', 'Elementor Pro'],
      contribution:
        'Built and maintained the storefront: WooCommerce setup, Elementor Pro layouts, theme and plugin upkeep, and ongoing site maintenance.',
      url: 'https://threadstudioofficial.com',
      github: '#',
    },
    {
      name: 'Nomad Law',
      tag: 'Business Website',
      description:
        'Website for a Swiss law firm, delivered in English and German for a bilingual client base.',
      tech: ['WordPress', 'Bilingual EN/DE', 'DNS', 'SSL'],
      contribution:
        'Built the bilingual site and configured the .ch domain, DNS records and SSL for the Swiss market.',
      url: 'https://nomadlaw.ch',
      github: '#',
    },
    {
      name: 'BioGenie',
      tag: 'WooCommerce Store',
      description:
        'French-language skincare eCommerce store on WordPress and WooCommerce.',
      tech: ['WordPress', 'WooCommerce', 'Performance'],
      contribution:
        'Built and optimised the storefront, including WooCommerce setup and page speed work.',
      url: 'https://biogenie.dz',
      github: '#',
    },
    {
      name: 'eQuran School',
      tag: 'Education Website',
      description:
        'Online Islamic education website serving students across multiple timezones.',
      tech: ['WordPress', 'Linux / SSH', 'Hosting'],
      contribution:
        'Managed the site and its server over SSH, including hosting configuration and ongoing maintenance.',
      url: 'https://equranschool.com',
      github: '#',
    },
  ],
  liveSites: {
    title: 'Selected Live Websites',
    note: 'Additional production sites I have built and maintained for clients.',
    // TODO: remove or edit any site below you no longer want listed.
    sites: [
      { name: 'ai-trader.trade', note: 'AI trading education - hardened server, API integrated', url: 'https://ai-trader.trade/' },
      { name: 'zenon-flow.net', note: 'Investment platform - firewall, real-time data', url: 'https://zenon-flow.net' },
      { name: 'gain-oilprofit.com', note: 'Oil trading - live financial data, server admin', url: 'https://gain-oilprofit.com' },
      { name: 'forexfury.bot', note: 'Forex automation - plugin integration, market feeds', url: 'https://forexfury.bot' },
      { name: 'site-trust.com', note: 'Business review platform - security hardened', url: 'https://site-trust.com' },
      { name: 'ai-nobiloption.com', note: 'AI automated trading - 24/7 strategies, live signals', url: 'https://ai-nobiloption.com/' },
      { name: 'ausietraderai.com', note: 'AI crypto research - market data, charts, watchlists', url: 'https://ausietraderai.com/' },
      { name: 'ceravindo-platform.com', note: 'AI market research - crypto & multi-market analysis', url: 'https://ceravindo-platform.com/' },
      { name: 'forge-capmoor.net', note: 'Automated trading - explains its own reasoning', url: 'https://forge-capmoor.net/' },
      { name: 'memorifund-ai-platform.com', note: 'AI automated trading - 24/7 strategies, live signals', url: 'https://memorifund-ai-platform.com/' },
      { name: 'skywardinvexa-au.com', note: 'Multi-asset market access for Australian investors', url: 'https://skywardinvexa-au.com/' },
      { name: 'sovereign-kapitix.net', note: 'AI automated trading platform - Australia', url: 'https://sovereign-kapitix.net/' },
      { name: 'traderai-au.com', note: 'AI market analysis - patterns & trend tracking', url: 'https://traderai-au.com/' },
      { name: 'austeriosmart-up.com', note: 'AI automated trading - 24/7 strategies, live signals', url: 'https://austeriosmart-up.com/' },
      { name: 'fels-wertburgai.com', note: 'AI crypto research assistant - Australia', url: 'https://fels-wertburgai.com/' },
      { name: 'keen-accruvance.com', note: 'AI crypto trading platform & signals', url: 'https://keen-accruvance.com/' },
      { name: 'borsbryggeai.com', note: 'AI trading platform for Norway, Norwegian market', url: 'https://borsbryggeai.com/' },
      { name: 'cortextrade-dk.net', note: 'AI trading platform for Denmark, crypto, forex and stocks', url: 'https://cortextrade-dk.net/' },
      { name: 'krelixbardenai.com', note: 'AI market analysis for Germany, German market', url: 'https://krelixbardenai.com/' },
    ],
  },
}

// ----------------------------------------------------------------------------
// AI-assisted frontend projects
// ----------------------------------------------------------------------------
// Kept separate from the WordPress work on purpose: these are React and
// Next.js builds where Claude AI writes most of the code and I direct, review,
// adapt and deploy it. The copy says that plainly rather than implying
// independent senior-level React or Next.js engineering.
export const frontendProjects = {
  kicker: 'AI-Assisted Frontend',
  heading: 'AI-assisted React and Next.js projects.',
  sub: 'Frontend builds delivered with Claude AI as a development partner. These sit alongside the WordPress work, not in place of it.',
  workflow: [
    'I set the page structure, content and requirements, then work through the build with Claude AI.',
    'I review and adapt the generated code, handle responsive layout and SEO metadata, and deploy through Git and Vercel.',
    'These are AI-assisted builds. I do not present them as independent senior-level React or Next.js engineering.',
  ],
  items: [
    {
      name: 'TraderAI',
      stack: 'React, Vite, Tailwind CSS',
      description:
        'Trading dashboard interface for an AI trading education platform.',
      contribution:
        'Built the frontend with Claude AI assistance: responsive dashboard layouts, routed pages, chart analysis UI and production deployment on Render.',
      url: 'https://ai-trader.trade/',
      github: 'https://github.com/ZeeTech-Pvt-Ltd/traderai',
    },
    {
      name: 'Zephgain',
      stack: 'React, Vite',
      description:
        'Pre-rendered marketing site for an AI trading platform in the Australian market.',
      contribution:
        'Built the frontend with Claude AI assistance: clean-path routing, a pre-render pipeline that emits static HTML per route, per-route SEO metadata and a validated registration form.',
      url: 'https://zephgain-au.com/',
      github: 'https://github.com/ZeeTech-Pvt-Ltd/Zephgain',
    },
    {
      name: 'AI Pro App',
      stack: 'Next.js, React, Tailwind CSS',
      description:
        'Multi-page site for an AI crypto research and market education platform.',
      contribution:
        'Built the frontend with Claude AI assistance: multi-page routing, a post-build step that inlines CSS, an accessible FAQ accordion, legal modals and a validated form.',
      url: 'https://ai-proapp.com/',
      github: 'https://github.com/ZeeTech-Pvt-Ltd/AI-Pro-App',
    },
  ],
}

// ----------------------------------------------------------------------------
// Services
// ----------------------------------------------------------------------------
export const services = {
  kicker: 'Services',
  heading: 'What I can help you with.',
  sub: 'End-to-end web services - from building a WordPress site to keeping it fast, secure and online.',
  items: [
    {
      title: 'WordPress Development',
      icon: 'layout',
      description: 'Custom WordPress builds with Elementor Pro, clean themes and maintainable code.',
      points: ['Custom themes & Elementor Pro', 'WooCommerce stores', 'Plugin setup & customization'],
    },
    {
      title: 'WordPress Troubleshooting',
      icon: 'wrench',
      description: 'Fast diagnosis and fixing of errors, white screens, plugin conflicts and broken functionality.',
      points: ['Critical error fixes', 'Plugin conflict resolution', 'Log analysis & recovery'],
    },
    {
      title: 'Website Migration',
      icon: 'refresh',
      description: 'Safe migrations between hosts, domains and platforms with zero-downtime planning.',
      points: ['Host-to-host migrations', 'Domain & DNS moves', 'Backup & rollback planning'],
    },
    {
      title: 'Hosting & Server Management',
      icon: 'server',
      description: 'Hands-on management of cPanel/SPanel, Linux servers, PHP-FPM and resource troubleshooting.',
      points: ['cPanel / SPanel administration', 'Linux server administration', 'PHP & resource tuning'],
    },
    {
      title: 'Domain & DNS Management',
      icon: 'globe',
      description: 'Registration, transfers, DNS records, nameservers and email routing handled correctly.',
      points: ['Domain setup & transfers', 'A / CNAME / MX / TXT records', 'DNS troubleshooting'],
    },
    {
      title: 'SSL & Security Setup',
      icon: 'shield',
      description: 'SSL / Let’s Encrypt installs, Cloudflare setup, malware investigation and hardening.',
      points: ['SSL / AutoSSL installs', 'Cloudflare configuration', 'Malware & blacklist checks'],
    },
    {
      title: 'Performance Optimization',
      icon: 'zap',
      description: 'Speed, caching and Core Web Vitals optimization so sites load fast on every device.',
      points: ['Caching & CDN setup', 'PageSpeed & Core Web Vitals', 'Image & asset optimization'],
    },
    {
      title: 'React Frontend Development',
      icon: 'code',
      description: 'Modern, responsive frontends with React, Vite and Tailwind CSS - deploy-ready on Vercel.',
      points: ['React + Vite applications', 'Tailwind CSS UI', 'Deployment to Vercel / Render'],
    },
  ],
}

// ----------------------------------------------------------------------------
// Client Reviews
// ----------------------------------------------------------------------------
// Reviews are stored in Supabase and only appear here once approved. The
// section and form copy lives here with the rest of the site text.
export const reviews = {
  kicker: 'Client Reviews',
  heading: 'What clients say after launch.',
  sub: 'Feedback from people I have worked with. Every review is read before it appears here.',
  empty: 'No reviews yet. If we have worked together, yours would be the first.',
  formHead: 'Leave a review',
  formNote: 'Reviews are published after approval. Your email address is not collected.',
  success: 'Thank you. Your review has been sent and will appear once it is approved.',

  // Used by the form's project type select, so the value is saved verbatim.
  projectTypes: [
    'WordPress Website',
    'WooCommerce Store',
    'Website Migration',
    'Hosting & DNS',
    'Website Security',
    'React / Next.js Development',
    'Other',
  ],
}

// ----------------------------------------------------------------------------
// Contact
// ----------------------------------------------------------------------------
export const contact = {
  kicker: 'Contact',
  heading: "Let's work together.",
  sub: 'Have a project, a WordPress site that needs help, or a role you think I would fit? I would love to hear from you.',
  availability: 'Available for full-time roles, freelance projects and technical work.',
  formNote: 'This form opens your email app with the message ready to send - no backend required.',
}

export const footer = {
  name: 'Sadia Arshad',
  title: 'WordPress Developer | Web & Hosting Specialist',
  copyright: '© 2026 Sadia Arshad. All rights reserved.',
}
