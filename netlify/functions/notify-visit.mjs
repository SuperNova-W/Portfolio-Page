// Emails you when someone views the portfolio: approximate city, time, timezone and referring site.
// Required Netlify env vars: RESEND_API_KEY, NOTIFY_EMAIL
const BOT_RE = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|embedly|quora|whatsapp|telegram|discord|slack/i

export default async (req, context) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  const ua = req.headers.get('user-agent') || ''
  if (!ua || BOT_RE.test(ua)) return new Response(null, { status: 204 })

  let body = {}
  try { body = await req.json() } catch { /* ignore */ }

  const geo = context.geo || {}
  const place = [geo.city, geo.subdivision?.name, geo.country?.name].filter(Boolean).join(', ') || 'Unknown location'
  const timezone = String(body.timezone || geo.timezone || 'Unknown').slice(0, 60)
  const time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })

  // Where they came from: the referring site, or a ?ref= tag on a link you shared
  let source = 'Direct (typed URL, bookmark, or an app that hides it)'
  try {
    const host = new URL(String(body.referrer || '')).hostname.replace(/^www\./, '')
    const self = new URL(req.url).hostname.replace(/^www\./, '')
    if (host && host !== self) source = host
  } catch { /* no referrer */ }
  const tag = String(body.ref || '').slice(0, 60)
  if (tag) source = `${tag} (via ?ref link)` + (source.startsWith('Direct') ? '' : `, from ${source}`)

  const text = [
    `Someone viewed your portfolio.`,
    ``,
    `Location:  ${place}`,
    `Time:      ${time} ET`,
    `Timezone:  ${timezone}`,
    `Came from: ${source}`,
  ].join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.NOTIFY_FROM || 'Portfolio Alerts <onboarding@resend.dev>',
      to: process.env.NOTIFY_EMAIL,
      subject: `Portfolio view: ${place}`,
      text,
    }),
  })

  if (!res.ok) console.error('Resend error', res.status, await res.text())
  return new Response(null, { status: 204 })
}

export const config = {
  path: '/api/visit',
  // Stops anyone from spamming your inbox by hammering the endpoint
  rateLimit: { windowLimit: 3, windowSize: 60, aggregateBy: ['ip', 'domain'] },
}
