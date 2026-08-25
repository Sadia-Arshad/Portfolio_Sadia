import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the full page shell', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/Building Reliable Websites/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Skip to content/i })).toBeInTheDocument()
    for (const id of ['about', 'skills', 'experience', 'projects', 'services', 'contact']) {
      expect(document.getElementById(id)).toBeInTheDocument()
    }
  })
})
