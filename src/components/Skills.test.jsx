import { render, screen } from '@testing-library/react'
import Skills from './Skills'

describe('Skills', () => {
  it('renders all skill group titles', () => {
    render(<Skills />)
    for (const title of [
      'WordPress',
      'Hosting & Servers',
      'Domains & DNS',
      'Security & Performance',
      'Development',
      'SEO & Maintenance',
      'AI / Automation',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    }
  })

  it('renders sample skill items', () => {
    render(<Skills />)
    expect(screen.getByText('cPanel')).toBeInTheDocument()
    expect(screen.getByText('Elementor Pro')).toBeInTheDocument()
  })
})
