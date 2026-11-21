import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import FrontendProjects from './components/FrontendProjects.jsx'
import Services from './components/Services.jsx'

// Client Reviews is intentionally not rendered. The Supabase project is
// reachable and the table has the expected columns, but the insert policy
// still rejects anonymous submissions with 42501, so the form would show an
// error to every visitor. The component, its data and the Supabase client are
// kept intact: fix the RLS policy (README section 13), then re-import <Reviews/>
// below and restore the nav link.
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink text-paper">
      {/* Gold accent line across the very top of the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-transparent via-accent/80 to-transparent"
      />

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <FrontendProjects />
        <Services />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
