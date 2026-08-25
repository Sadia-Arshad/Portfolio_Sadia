import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from './Contact'

// jsdom throws on `window.location.href = …` (navigation not implemented),
// so replace it with a stub whose setter records the target we can assert on.
const hrefs = []
Object.defineProperty(window, 'location', {
  configurable: true,
  writable: true,
  value: {
    get href() {
      return 'http://localhost/'
    },
    set href(v) {
      hrefs.push(v)
    },
  },
})

describe('Contact', () => {
  beforeEach(() => {
    hrefs.length = 0
  })

  it('renders the real GitHub and LinkedIn links', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: /github\.com\/Sadia-Arshad/i })).toHaveAttribute(
      'href',
      'https://github.com/Sadia-Arshad',
    )
    expect(screen.getByRole('link', { name: /linkedin\.com\/in\/sadia-arshad-ch/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/sadia-arshad-ch',
    )
  })

  it('submitting the form opens the prefilled mailto link', async () => {
    const user = userEvent.setup()
    const { container } = render(<Contact />)

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello!')
    fireEvent.submit(container.querySelector('form'))

    expect(hrefs.length).toBe(1)
    expect(hrefs[0]).toMatch(/^mailto:misbahsadiach@gmail\.com\?subject=/)
    expect(hrefs[0]).toContain('Project%20enquiry')
    expect(screen.getByRole('status')).toHaveTextContent(/email app should have opened/i)
  })
})
