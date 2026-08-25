import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('links GitHub to the real profile', () => {
    render(<Footer />)
    const github = screen.getByRole('link', { name: 'GitHub' })
    expect(github).toHaveAttribute('href', 'https://github.com/Sadia-Arshad')
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows the copyright line', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2026 Sadia Arshad\. All rights reserved\./)).toBeInTheDocument()
  })
})
