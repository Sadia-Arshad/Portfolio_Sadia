# Sadia Arshad — Portfolio

A production-ready personal portfolio website for **Sadia Arshad**, a WordPress Developer & Web & Hosting Specialist. Built with **React + Vite + Tailwind CSS**, this is a fast, single-page, fully responsive site designed for recruiters, clients and international remote opportunities.

![Stack](https://img.shields.io/badge/React-18-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss)

---

## 1. Project Overview

The site presents Sadia's professional profile, skills, experience, projects, services and contact details. It uses a premium dark-first developer aesthetic (deep navy + emerald accent) with subtle micro-interactions — no heavy gradients or over-animation.

Highlights:

- **Single page** with anchor navigation (no router needed — deploys anywhere safely).
- **Scroll-spy navbar** with a working mobile hamburger menu.
- **Service-level metrics band** (Ticket SLA · Sites Optimized · Malware Cleanups · Uptime) between About and Skills — edit values in `src/data/portfolio.js` → `serviceStats`.
- **Download CV** button that serves `public/Sadia-Arshad-CV.pdf`.
- **Contact form** that opens the visitor's email app (no backend).
- All content lives in **`src/data/portfolio.js`** so you can edit it in one place.
- SEO meta, Open Graph and Twitter card tags included.
- Fully keyboard-accessible with visible focus states and `prefers-reduced-motion` support.

## 2. Tech Stack

| Purpose        | Technology                              |
| -------------- | --------------------------------------- |
| UI             | React 18                                |
| Build tool     | Vite 5                                  |
| Styling        | Tailwind CSS 3                          |
| Icons          | lucide-react                            |
| Animations     | framer-motion (subtle, reduced-motion aware) |
| CV PDF         | pdfkit (dev-time generator, `build:cv`) |

No backend, no external runtime dependencies beyond the four above.

## 3. Installation

```bash
npm install
```

## 4. Development

```bash
npm run dev
```

Open the printed URL (usually `http://localhost:5173`).

## 5. Production Build

```bash
npm run build
```

The production bundle is written to the standard Vite `dist/` directory.

Preview it locally:

```bash
npm run preview
```

Sanity-check that the whole page renders without errors (headless render smoke test):

```bash
npm run check:render
```

## 6. GitHub Deployment

1. Push this folder to a GitHub repository:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. On GitHub, go to **Settings → Pages** and choose **"GitHub Actions"** or **"Deploy from a branch"** pointing at `main`.
3. Add a workflow (or just connect the repo to Vercel — see below). For GitHub Pages you'll want a `base` path — use [Vercel](#7-vercel-deployment) for a zero-config deployment.

## 7. Vercel Deployment

This project is ready to deploy to Vercel with zero configuration:

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your GitHub repo.
3. Vercel auto-detects **Vite** and sets:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Click **Deploy**. Done.

Every push to `main` now deploys automatically. (Optional: set a custom domain under **Settings → Domains**.)

## 8. How to Replace the CV

The **Download CV** button serves `public/Sadia-Arshad-CV.pdf`.

**Option A — replace the file directly (easiest):**
Delete `public/Sadia-Arshad-CV.pdf` and drop in your own PDF with the same filename. Nothing else changes.

**Option B — regenerate from the site content:**
The PDF is generated from the same data as the website:

```bash
npm run build:cv
```

It writes `public/Sadia-Arshad-CV.pdf` using `src/data/portfolio.js` (profile, experience, skills, projects). Edit that file first, then re-run.

> **Important:** the generated PDF merges your two CVs and presents **5+ years** of experience, using the contact details from your CV. If your final CV differs, just replace the PDF (Option A).

## 9. How to Update Email / Social Links

Open **`src/data/portfolio.js`** and edit the `profile` object:

```js
email: 'misbahsadiach@gmail.com',
phone: '+92 307 726 8618',        // remove if you don't want it public
linkedin: 'https://www.linkedin.com/in/sadia-arshad-ch',
github: '#',                      // TODO: add your real GitHub URL
```

Search the file for `TODO` to find every placeholder.

## 10. How to Add New Projects

1. Open **`src/data/portfolio.js`** → the `projects.items` array.
2. Copy an existing object and change the fields:

   ```js
   {
     name: 'My New Project',
     tag: 'Web Application',
     description: 'Short description.',
     tech: ['React', 'Vite'],
     contribution: 'What you did.',
     url: '#',      // TODO: add live URL
     github: '#',   // TODO: add repo URL
   },
   ```

3. For live client sites, add to `projects.liveSites.sites`.

Buttons stay visibly **disabled** until you add a real URL — the `#` is only a temporary placeholder (marked with TODO comments).

## 11. Project Structure

```
public/
  Sadia-Arshad-CV.pdf          ← Download CV target
  favicon.svg
scripts/
  generate-cv.js               ← npm run build:cv
src/
  components/
    Navbar.jsx   Hero.jsx      About.jsx      Stats.jsx
    Skills.jsx   Experience.jsx              Projects.jsx
    Services.jsx Contact.jsx   Footer.jsx    Reveal.jsx
    SectionHeading.jsx
  data/
    portfolio.js               ← ALL site content
  App.jsx   main.jsx   index.css
index.html                     ← SEO meta tags
vite.config.js  tailwind.config.js  postcss.config.js
```

## 12. Notes & TODO Checklist

- [ ] Add your real **GitHub** URL in `src/data/portfolio.js`.
- [ ] Add live project links (`projects.items[].url`) when available.
- [ ] Add a 1200×630 share image and update `og:image` / `twitter:image` in `index.html`.
- [ ] Replace the placeholder `og:url` in `index.html` with your real domain after deploying.
- [ ] Optionally remove the public **phone** number if you prefer not to show it.
- [ ] Review the **Selected Live Websites** list and remove any you don't want public.
