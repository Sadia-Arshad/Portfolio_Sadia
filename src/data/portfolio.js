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

  title: 'WordPress Developer | Web & Hosting Specialist | React & DevOps Enthusiast',

  // Hero
  availability: 'Available for Web Development & Technical Projects',
  heading: 'Building Reliable Websites From Development to Deployment.',
  heroText:
    'WordPress Developer with 5+ years of practical experience in web development, hosting, domains, DNS, SSL, security and production troubleshooting — with growing expertise in React, DevOps and AI automation.',

  // Tech strip shown under the hero CTAs
  techStrip: ['WordPress', 'React', 'Vite', 'Tailwind', 'Git', 'Cloudflare', 'Linux', 'DevOps'],

  // Contact (from your CV — update if needed)
  email: 'misbahsadiach@gmail.com',
  phone: '+92 307 726 8618', // TODO: remove this line if you don't want your phone public
  location: 'Lahore, Pakistan',
  linkedin: 'https://www.linkedin.com/in/sadia-arshad-ch',
  // TODO: add your real GitHub profile URL below (e.g. https://github.com/yourusername)
  github: '#',
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
    "I'm a WordPress Developer with 5+ years of hands-on experience building, maintaining, troubleshooting and deploying websites — from a single landing page to production infrastructure.",
    'My work goes beyond WordPress development. I manage hosting environments, cPanel and SPanel, domains, DNS, SSL certificates, Cloudflare, server configuration, migrations, security and production troubleshooting. I also build modern frontends with React, Vite and Tailwind CSS, and ship with Git/GitHub on platforms like Vercel and Render.',
    "I'm currently deepening my skills in DevOps, cloud deployment, AI-assisted development and workflow automation.",
  ],
  stats: [
    { value: '5+', label: 'Years of Experience' },
    { value: '75+', label: 'Live Websites Deployed' },
    { value: 'BSCS', label: 'Computer Science · 2022' },
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

// ----------------------------------------------------------------------------
// Service-level stats (Ticket SLA band)
// ----------------------------------------------------------------------------
// A standalone metrics strip shown between the About section and Skills.
// Values are claims about service levels — keep them truthful to your real
// work before publishing.
export const serviceStats = {
  kicker: 'Service Levels',
  items: [
    { label: 'Ticket SLA', value: '98%', sub: 'Hosting support', tone: 'emerald' },
    { label: 'Sites Optimized', value: '120+', sub: 'Page builders', tone: 'indigo' },
    { label: 'Malware Cleanups', value: '400+', sub: 'Security & restore', tone: 'rose' },
    { label: 'Uptime', value: '99.9%', sub: 'Server care', tone: 'sky' },
  ],
}

// ----------------------------------------------------------------------------
// Skills
// ----------------------------------------------------------------------------
export const skills = {
  kicker: 'Skills',
  heading: 'A full-stack skill set around WordPress.',
  sub: 'From theme and plugin work to servers, DNS, security and modern frontend tooling — everything needed to own a website end to end.',
  groups: [
    {
      title: 'WordPress',
      icon: 'layers',
      tone: 'emerald',
      items: [
        'WordPress',
        'Elementor',
        'Elementor Pro',
        'Hello Elementor',
        'Theme Customization',
        'Plugin Management',
        'Website Maintenance',
        'WordPress Troubleshooting',
        'Website Migration',
      ],
    },
    {
      title: 'Hosting & Servers',
      icon: 'server',
      tone: 'sky',
      items: [
        'cPanel',
        'SPanel',
        'Linux / Ubuntu',
        'Apache',
        'LiteSpeed',
        'PHP-FPM',
        'CloudLinux',
        'PHP Configuration',
        'Server Resource Troubleshooting',
      ],
    },
    {
      title: 'Domains & DNS',
      icon: 'globe',
      tone: 'cyan',
      items: [
        'Domain Registration',
        'Domain Transfers',
        'DNS Records',
        'Nameservers',
        'DNS Troubleshooting',
        'SSL / AutoSSL',
        "Let's Encrypt",
        'Cloudflare',
      ],
    },
    {
      title: 'Security & Performance',
      icon: 'shield',
      tone: 'rose',
      items: [
        'Wordfence',
        'Sucuri',
        'VirusTotal',
        'Google Safe Browsing',
        'Cloudflare',
        'Website Security',
        'Malware Investigation',
        'Caching',
        'Website Performance Optimization',
      ],
    },
    {
      title: 'Development',
      icon: 'code',
      tone: 'violet',
      items: [
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'Vite',
        'Tailwind CSS',
        'Node.js',
        'Express',
        'Git',
        'GitHub',
      ],
    },
    {
      title: 'SEO & Maintenance',
      icon: 'search',
      tone: 'amber',
      items: [
        'Rank Math SEO',
        'Website Migrations',
        'Backups',
        'Technical SEO Basics',
        'Website Monitoring',
        'QA & Troubleshooting',
      ],
    },
    {
      title: 'AI / Automation',
      icon: 'sparkles',
      tone: 'fuchsia',
      items: [
        'AI-Assisted Development',
        'AI Website Interfaces',
        'AI Trading Interface Development',
        'Website Monitoring Automation',
        'Workflow Automation',
        'AI-Based Productivity Solutions',
      ],
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
      period: 'Oct 2023 — Present',
      type: 'Full-time',
      summary:
        'Developing and operating WordPress platforms for financial trading, AI education and health clients across the UAE and Europe.',
      points: [
        'Designed and developed WordPress websites for financial trading, AI education and health platforms serving UAE and European clients',
        'Administered Linux web servers via SSH — file management, permissions and command-line troubleshooting',
        'Monitored and resolved Apache/Nginx/PHP error logs on live production sites',
        'Detected, isolated and removed malware and code injection attacks; restored and hardened server security',
        'Managed DNS records (A, CNAME, MX, TXT), domain routing, email setup and propagation troubleshooting',
        'Configured firewall rules and IP blocking/unblocking against DDoS and brute-force attacks',
        'Administered MySQL databases via terminal — queries, table repair, backup and restoration',
        'Managed the full hosting lifecycle: cPanel, domains, SSL/TLS install and renewal, uptime monitoring',
      ],
    },
    {
      role: 'Freelance WordPress Developer & Server Manager',
      company: 'Self-Employed',
      location: 'Remote · Pakistan',
      period: '2022 — Present',
      type: 'Freelance',
      summary:
        'Delivering complete WordPress builds and managing hosting and server infrastructure for clients in Switzerland, the USA and Pakistan.',
      points: [
        'Delivered complete WordPress websites for clients in Switzerland, the USA and Pakistan',
        'Managed server environments independently — SSH, cPanel, DNS, SSL and post-launch maintenance',
        'Resolved live emergencies — code injection, DNS failures, SSL expiry and downtime recovery',
        'Communicated technical work clearly with clients, hosting providers and team members',
      ],
    },
    {
      role: 'WordPress Developer',
      company: 'Enfotrix (Pvt.) Ltd',
      location: 'Sargodha, Pakistan',
      period: 'Sep 2021 — Sep 2023',
      type: 'Full-time',
      summary:
        'Built and maintained WordPress and WooCommerce websites across eCommerce, health and creative industries.',
      points: [
        'Built 10+ WordPress websites across eCommerce, health and creative industries',
        'Achieved 90–100 Google PageSpeed scores through server-side optimization and caching',
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
  heading: 'Selected work & live websites.',
  sub: 'A few of the projects I have designed, built and shipped.',
  items: [
    {
      name: 'AI Trading / TraderAI',
      tag: 'Web Application',
      description:
        'A modern AI trading assistant web application built with React and Vite — a routed, production-grade interface for trading dashboards, AI-assisted chart analysis and market tools.',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Git / GitHub', 'Render'],
      contribution:
        'Built the application end to end and shipped it to production: React routing, responsive dashboards, AI assistant interface, chart analysis UI, custom-domain configuration and performance / caching optimization.',
      url: 'https://ai-trader.trade/',
      github: 'https://github.com/ZeeTech-Pvt-Ltd/traderai',
    },
    {
      name: 'Production WordPress & Hosting Troubleshooting',
      tag: 'Case Study',
      description:
        'Real-world production troubleshooting across WordPress websites, hosting servers, DNS, SSL, PHP configuration, plugins, Cloudflare and performance.',
      tech: ['WordPress', 'cPanel / SPanel', 'Cloudflare', 'DNS', 'SSL', 'PHP-FPM', 'LiteSpeed'],
      contribution:
        'Resolved critical WordPress errors, PHP configuration and limit issues, plugin conflicts, SSL problems, DNS/SERVFAIL issues, PHP-FPM/resource problems and Cloudflare configuration — plus website migrations and hosting-provider support escalation.',
      url: '#', // TODO: add a case-study page link when available
      github: '#', // TODO: add the repository URL when available
    },
  ],
  liveSites: {
    title: 'Selected Live Websites',
    note: 'Production sites I have built and maintained for clients, listed in my professional CV.',
    // TODO: remove or edit any site below you no longer want listed.
    sites: [
      { name: 'threadstudioofficial.com', note: 'Fashion eCommerce — WooCommerce, Elementor Pro', url: 'https://threadstudioofficial.com' },
      { name: 'nomadlaw.ch', note: 'Swiss law firm — multilingual EN/DE, DNS & SSL', url: 'https://nomadlaw.ch' },
      { name: 'ai-trader.trade', note: 'AI trading education — hardened server, API integrated', url: 'https://ai-trader.trade/' },
      { name: 'zenon-flow.net', note: 'Investment platform — firewall, real-time data', url: 'https://zenon-flow.net' },
      { name: 'biogenie.dz', note: 'French skincare eCommerce — WooCommerce, optimized', url: 'https://biogenie.dz' },
      { name: 'equranschool.com', note: 'Islamic education — SSH-managed, multi-timezone', url: 'https://equranschool.com' },
      { name: 'glucose-support.com', note: 'Health eCommerce — malware cleaned, optimized', url: 'https://glucose-support.com' },
      { name: 'gain-oilprofit.com', note: 'Oil trading — live financial data, server admin', url: 'https://gain-oilprofit.com' },
      { name: 'forexfury.bot', note: 'Forex automation — plugin integration, market feeds', url: 'https://forexfury.bot' },
      { name: 'site-trust.com', note: 'Business review platform — security hardened', url: 'https://site-trust.com' },
    ],
  },
}

// ----------------------------------------------------------------------------
// Services
// ----------------------------------------------------------------------------
export const services = {
  kicker: 'Services',
  heading: 'What I can help you with.',
  sub: 'End-to-end web services — from building a WordPress site to keeping it fast, secure and online.',
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
      description: 'Modern, responsive frontends with React, Vite and Tailwind CSS — deploy-ready on Vercel.',
      points: ['React + Vite applications', 'Tailwind CSS UI', 'Deployment to Vercel / Render'],
    },
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
  formNote: 'This form opens your email app with the message ready to send — no backend required.',
}

export const footer = {
  name: 'Sadia Arshad',
  title: 'WordPress Developer | Web & Hosting Specialist',
  copyright: '© 2026 Sadia Arshad. All rights reserved.',
}
