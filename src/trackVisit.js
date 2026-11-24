// Sends one visit ping per browser session (production only).
// Visit your site once with ?notrack to stop getting emails for your own views.
export function trackVisit() {
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
      path: location.pathname,
      referrer: document.referrer,
      screen: `${screen.width}x${screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }),
  }).catch(() => {})
}
