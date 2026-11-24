// Emails you when someone views the portfolio.
// Required Netlify env vars: RESEND_API_KEY, NOTIFY_EMAIL
const BOT_RE = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|embedly|quora|whatsapp|telegram|discord|slack/i

export default async (req, context) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  const ua = req.headers.get('user-agent') || ''
  if (!ua || BOT_RE.test(ua)) return new Response(null, { status: 204 })

  let body = {}
  try { body = await req.json() } catch { /* ignore */ }

  const ip = context.ip || 'unknown'
  const geo = context.geo || {}

  // Network owner (ISP / company / university) — often tells you *who* is viewing
  let net = {}
  try {
    const r = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, { signal: AbortSignal.timeout(2500) })
    const j = await r.json()
    if (j.success) net = j.connection || {}
  } catch { /* lookup is optional */ }

  const place = [geo.city, geo.subdivision?.name, geo.country?.name].filter(Boolean).join(', ') || 'Unknown location'
  const org = net.org || net.isp || 'Unknown network'
  const clip = (v, n = 300) => String(v ?? '').slice(0, n)

  const text = [
    `Someone viewed your portfolio.`,
    ``,
    `Location:   ${place}`,
    `Coords:     ${geo.latitude ?? '?'}, ${geo.longitude ?? '?'}  (approximate)`,
    `Network:    ${org}${net.asn ? ` (AS${net.asn})` : ''}`,
    `IP:         ${ip}`,
    `Time:       ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET`,
    `Their TZ:   ${clip(body.timezone, 60) || geo.timezone || '?'}`,
    ``,
    `Page:       ${clip(body.path) || '/'}`,
    `Referrer:   ${clip(body.referrer) || 'Direct / none'}`,
    `Device:     ${clip(ua)}`,
    `Screen:     ${clip(body.screen, 30) || '?'}   Language: ${clip(body.language, 30) || '?'}`,
    ``,
    `Map: https://www.google.com/maps?q=${geo.latitude},${geo.longitude}`,
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
      subject: `👀 Portfolio view: ${place} — ${org}`,
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
