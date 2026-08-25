import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders all navigation links', () => {
    render(<Navbar />)
    for (const label of ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Services', 'Contact']) {
      // Each label appears in both the desktop and mobile menus.
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0)
    }
  })

  it('links Download CV to the real PDF', () => {
    render(<Navbar />)
    const cv = screen.getAllByRole('link', { name: /Download CV/i })
    expect(cv.length).toBeGreaterThan(0)
    for (const el of cv) expect(el).toHaveAttribute('href', '/Sadia-Arshad-CV.pdf')
  })

  it('toggles the mobile menu via the hamburger button', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
  })
})
