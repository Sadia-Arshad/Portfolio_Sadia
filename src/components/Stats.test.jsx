import { render, screen } from '@testing-library/react'
import Stats from './Stats'

describe('Stats', () => {
  it('renders the four service metrics', () => {
    render(<Stats />)
    for (const label of ['Ticket SLA', 'Sites Optimized', 'Malware Cleanups', 'Uptime']) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
    for (const value of ['98%', '120+', '400+', '99.9%']) {
      expect(screen.getByText(value)).toBeInTheDocument()
    }
  })
})
