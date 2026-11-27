// Sends one visit ping per browser session (production only).
// (Named neutrally on purpose: ad blockers like Brave Shields block files named 'track…'.)
// Visit your site once with ?notrack to stop getting emails for your own views.
export function notifyMe() {
  if (!import.meta.env.PROD) return
  try {
    if (new URLSearchParams(location.search).has('notrack')) localStorage.setItem('noTrack', '1')
    if (localStorage.getItem('noTrack') === '1' || sessionStorage.getItem('visitLogged')) return
    sessionStorage.setItem('visitLogged', '1')
  } catch { /* storage blocked — still log */ }

  fetch('/api/visit', {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer,
      ref: new URLSearchParams(location.search).get('ref') || new URLSearchParams(location.search).get('utm_source') || '',
    }),
  }).catch(() => {})
}
