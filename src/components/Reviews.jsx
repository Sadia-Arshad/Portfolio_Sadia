import { useEffect, useState } from 'react'
import { Loader2, Send, Star } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading.jsx'
import { reviews } from '../data/portfolio.js'
import { fetchApprovedReviews, isConfigured, submitReview } from '../lib/supabase.js'

const EMPTY_FORM = { name: '', company: '', projectType: '', rating: 0, message: '' }

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-slate-500 transition-colors focus:border-accent/60 focus:outline-none'

const errorClass = 'mt-1.5 text-xs font-medium text-rose-300'

function validate(form) {
  const found = {}
  const name = form.name.trim()
  const message = form.message.trim()

  if (name.length < 2) found.name = 'Please enter your name.'
  if (name.length > 80) found.name = 'Please keep your name under 80 characters.'
  if (form.company.trim().length > 120) found.company = 'Please keep the company name under 120 characters.'
  if (!form.projectType) found.projectType = 'Please choose a project type.'
  if (!form.rating) found.rating = 'Please choose a rating.'
  if (message.length < 20) found.message = 'Please write at least 20 characters.'
  if (message.length > 1200) found.message = 'Please keep your review under 1200 characters.'

  return found
}

function describeError(err) {
  if (err?.status === 401 || err?.status === 403) {
    return 'The review service rejected this request. Please try again later.'
  }
  if (err?.code === '42501') {
    return 'The review service is not accepting submissions right now. Please try again later.'
  }
  if (err?.status === 404) {
    return 'The review service is unavailable right now. Please try again later.'
  }
  if (err instanceof TypeError) {
    return 'Could not reach the review service. Check your connection and try again.'
  }
  return 'Something went wrong. Please try again, or email me directly.'
}

function formatDate(iso) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

function Stars({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          className={n <= rating ? 'fill-accent text-accent' : 'text-slate-600'}
        />
      ))}
    </span>
  )
}

export default function Reviews() {
  const [items, setItems] = useState([])
  const [listState, setListState] = useState('loading')
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  // Reviews are fetched only here, after mount. The build pre-renders <App/>
  // with renderToString, which never runs effects, so nothing is fetched at
  // build time and no stale list is baked into the HTML.
  useEffect(() => {
    let cancelled = false

    if (!isConfigured) {
      setListState('error')
      return undefined
    }

    fetchApprovedReviews()
      .then((data) => {
        if (cancelled) return
        setItems(Array.isArray(data) ? data : [])
        setListState('ready')
      })
      .catch(() => {
        if (cancelled) return
        setListState('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleRating = (value) => {
    setForm((prev) => ({ ...prev, rating: value }))
    setErrors((prev) => ({ ...prev, rating: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setSubmitState('idle')
      setSubmitMessage('')
      return
    }

    setSubmitState('submitting')
    setSubmitMessage('')

    const payload = {
      name: form.name.trim(),
      company: form.company.trim() || null,
      project_type: form.projectType,
      rating: Number(form.rating),
      message: form.message.trim(),
      // Explicit, so the row can never arrive approved. The insert policy
      // enforces the same rule on the server.
      status: 'pending',
    }

    try {
      try {
        await submitReview(payload)
      } catch (err) {
        // The table does not have a project_type column yet. Save the review
        // without it rather than lose the whole submission.
        if (err?.code === '42703' && /project_type/i.test(err.message || '')) {
          const { project_type: _ignored, ...withoutProjectType } = payload
          await submitReview(withoutProjectType)
          console.warn(
            '[reviews] Saved without project_type: the column is missing. See README section 13.',
          )
        } else {
          throw err
        }
      }

      setSubmitState('success')
      setSubmitMessage(reviews.success)
      setForm(EMPTY_FORM)
      setErrors({})
    } catch (err) {
      setSubmitState('error')
      setSubmitMessage(describeError(err))
    }
  }

  const busy = submitState === 'submitting'

  return (
    <section id="reviews" aria-label="Client Reviews" className="section">
      <div className="container-page">
        <SectionHeading kicker={reviews.kicker} heading={reviews.heading} sub={reviews.sub} />

        {/* Approved reviews */}
        <div className="mt-12">
          {listState === 'loading' && (
            <p className="flex items-center gap-2 text-sm text-muted" role="status">
              <Loader2 size={15} className="animate-spin" aria-hidden="true" />
              Loading reviews
            </p>
          )}

          {listState === 'error' && (
            <p className="text-sm text-muted">
              Reviews are unavailable right now. Please check back shortly.
            </p>
          )}

          {listState === 'ready' && items.length === 0 && (
            <p className="text-sm text-muted">{reviews.empty}</p>
          )}

          {listState === 'ready' && items.length > 0 && (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((review, index) => (
                <li key={review.id}>
                  <Reveal delay={index * 0.05}>
                    <article className="card flex h-full flex-col p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span role="img" aria-label={`Rated ${review.rating} out of 5`}>
                          <Stars rating={review.rating} />
                        </span>
                        <span className="text-xs text-muted">{formatDate(review.created_at)}</span>
                      </div>

                      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                        {review.message}
                      </p>

                      <div className="mt-5 border-t border-white/10 pt-4">
                        <p className="text-sm font-semibold text-paper">{review.name}</p>
                        {review.company && (
                          <p className="mt-0.5 text-xs text-muted">{review.company}</p>
                        )}
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submission form */}
        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-paper">{reviews.formHead}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{reviews.formNote}</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-7 lg:col-span-3">
              {!isConfigured && (
                <p className="mb-5 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
                  Reviews are not configured. Set the Supabase environment variables to enable the
                  form.
                </p>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="review-name" className="mb-1.5 block text-sm font-medium text-slate-300">
                    Name
                  </label>
                  <input
                    id="review-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={errors.name ? 'true' : undefined}
                    aria-describedby={errors.name ? 'review-name-error' : undefined}
                    className={inputClass}
                  />
                  {errors.name && (
                    <p id="review-name-error" className={errorClass}>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="review-company" className="mb-1.5 block text-sm font-medium text-slate-300">
                    Company <span className="text-muted">(optional)</span>
                  </label>
                  <input
                    id="review-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company name"
                    value={form.company}
                    onChange={handleChange}
                    aria-invalid={errors.company ? 'true' : undefined}
                    aria-describedby={errors.company ? 'review-company-error' : undefined}
                    className={inputClass}
                  />
                  {errors.company && (
                    <p id="review-company-error" className={errorClass}>
                      {errors.company}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="review-project" className="mb-1.5 block text-sm font-medium text-slate-300">
                    Project type
                  </label>
                  <select
                    id="review-project"
                    name="projectType"
                    required
                    value={form.projectType}
                    onChange={handleChange}
                    aria-invalid={errors.projectType ? 'true' : undefined}
                    aria-describedby={errors.projectType ? 'review-project-error' : undefined}
                    className={inputClass}
                  >
                    <option value="">Choose a project type</option>
                    {reviews.projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p id="review-project-error" className={errorClass}>
                      {errors.projectType}
                    </p>
                  )}
                </div>

                <fieldset className="sm:col-span-2">
                  <legend className="mb-1.5 block text-sm font-medium text-slate-300">Rating</legend>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <label
                        key={value}
                        className="cursor-pointer rounded p-1 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent"
                      >
                        <input
                          type="radio"
                          name="rating"
                          value={value}
                          checked={form.rating === value}
                          onChange={() => handleRating(value)}
                          className="sr-only"
                        />
                        <Star
                          size={24}
                          aria-hidden="true"
                          className={
                            value <= form.rating
                              ? 'fill-accent text-accent'
                              : 'text-slate-500 transition-colors'
                          }
                        />
                        <span className="sr-only">
                          {value} star{value > 1 ? 's' : ''}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className={errorClass}>{errors.rating}</p>
                  )}
                </fieldset>

                <div className="sm:col-span-2">
                  <label htmlFor="review-message" className="mb-1.5 block text-sm font-medium text-slate-300">
                    Review
                  </label>
                  <textarea
                    id="review-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="What was the project, and how did it go?"
                    value={form.message}
                    onChange={handleChange}
                    aria-invalid={errors.message ? 'true' : undefined}
                    aria-describedby={errors.message ? 'review-message-error' : 'review-message-hint'}
                    className={inputClass}
                  />
                  <div className="mt-1.5 flex items-start justify-between gap-3">
                    {errors.message ? (
                      <p id="review-message-error" className={errorClass}>
                        {errors.message}
                      </p>
                    ) : (
                      <p id="review-message-hint" className="text-xs text-muted">
                        Minimum 20 characters.
                      </p>
                    )}
                    <p className="shrink-0 text-xs text-muted">{form.message.length}/1200</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="submit" disabled={busy} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                  {busy ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                      Sending
                    </>
                  ) : (
                    <>
                      <Send size={16} aria-hidden="true" />
                      Submit review
                    </>
                  )}
                </button>

                <p
                  role="status"
                  aria-live="polite"
                  className={`text-sm ${
                    submitState === 'success'
                      ? 'text-emerald-300'
                      : submitState === 'error'
                        ? 'text-rose-300'
                        : 'text-muted'
                  }`}
                >
                  {submitMessage}
                </p>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
