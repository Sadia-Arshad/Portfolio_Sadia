// ============================================================================
// Supabase REST client for the client review system
// ----------------------------------------------------------------------------
// Talks to PostgREST directly with fetch instead of pulling in
// @supabase/supabase-js, which is ~30-40 KB gzipped for the two requests this
// page makes. Keeping it out of the bundle protects the critical path the site
// was optimised for.
//
// Security lives in the database, not here. The publishable key is public by
// design, so Row Level Security decides what an anonymous visitor can read and
// write. This module never sends a secret or service-role key.
// ============================================================================

const RAW_URL = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// The configured URL ends in /rest/v1/, so trim the trailing slash before
// appending a table name.
const BASE_URL = (RAW_URL || '').replace(/\/+$/, '')

export const isConfigured = Boolean(BASE_URL && KEY)

export class ReviewApiError extends Error {
  constructor(status, body) {
    super(body?.message || `Request failed with status ${status}`)
    this.name = 'ReviewApiError'
    this.status = status
    this.code = body?.code
  }
}

function headers(extra = {}) {
  return {
    // PostgREST authenticates with apikey; the key is a publishable key, not a
    // JWT, so it does not belong in a Bearer token.
    apikey: KEY,
    'Content-Type': 'application/json',
    ...extra,
  }
}

async function readError(res) {
  const body = await res.json().catch(() => null)
  return new ReviewApiError(res.status, body)
}

/**
 * Approved reviews, newest first. RLS already restricts anonymous reads to
 * status = 'approved'; the filter here just makes the intent explicit and lets
 * the database use the partial index.
 */
export async function fetchApprovedReviews({ limit = 24 } = {}) {
  if (!isConfigured) throw new Error('Supabase is not configured')

  const query = new URLSearchParams({
    select: 'id,name,company,rating,message,created_at',
    status: 'eq.approved',
    order: 'created_at.desc',
    limit: String(limit),
  })

  const res = await fetch(`${BASE_URL}/reviews?${query}`, { headers: headers() })
  if (!res.ok) throw await readError(res)
  return res.json()
}

/**
 * Creates a review. `status` is sent explicitly as 'pending' so the row can
 * never arrive approved; the insert policy enforces the same rule server-side.
 */
export async function submitReview(payload) {
  if (!isConfigured) throw new Error('Supabase is not configured')

  const res = await fetch(`${BASE_URL}/reviews`, {
    method: 'POST',
    headers: headers({ Prefer: 'return=minimal' }),
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw await readError(res)
}
