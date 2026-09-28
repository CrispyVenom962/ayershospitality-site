/* Google Analytics loads only after a visitor opts in. */
(() => {
  const key = 'ayers_analytics_consent';
  const id = 'G-2Q0CN0H8TW';
  const pt = /^\/pt(?:-|\.|\/)/.test(location.pathname);
  const labels = pt ? {
    message: 'Podemos usar Google Analytics para perceber como o site é utilizado. Só será ativado se aceitar.',
    accept: 'Aceitar análise', decline: 'Recusar', settings: 'Preferências de análise', policy: 'Política de privacidade'
  } : {
    message: 'May we use Google Analytics to understand how visitors use this site? It runs only if you accept.',
    accept: 'Accept analytics', decline: 'Decline', settings: 'Analytics preferences', policy: 'Privacy policy'
  };
  let loaded = false;
  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', id, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
  }
  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach(part => {
      const name = part.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      const domains = ['', location.hostname, '.' + location.hostname, '.ayershospitality.com'];
      domains.forEach(domain => {
        document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
      });
    });
  }
  function makeButton(text, action, className) {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = text; b.className = className;
    b.addEventListener('click', action);
    return b;
  }
  function hidePanel() { document.getElementById('analytics-consent')?.remove(); }
  function save(value) {
    try { localStorage.setItem(key, value); } catch (_) {}
    hidePanel();
    if (value === 'accepted') loadAnalytics();
    else { clearAnalyticsCookies(); if (loaded) location.reload(); }
  }
  function showPanel() {
    if (document.getElementById('analytics-consent')) return;
    const panel = document.createElement('aside');
    panel.id = 'analytics-consent'; panel.setAttribute('aria-label', labels.settings);
    const p = document.createElement('p'); p.textContent = labels.message;
    const link = document.createElement('a');
    link.href = pt ? '/pt-privacidade.html' : '/privacy.html'; link.textContent = labels.policy;
    p.append(' ', link);
    const actions = document.createElement('div'); actions.className = 'consent-actions';
    actions.append(makeButton(labels.decline, () => save('declined'), 'consent-decline'));
    actions.append(makeButton(labels.accept, () => save('accepted'), 'consent-accept'));
    panel.append(p, actions); document.body.appendChild(panel);
  }
  document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.foot-legal');
    if (footer) {
      const b = makeButton(labels.settings, showPanel, 'consent-settings');
      footer.appendChild(b);
    }
    let decision;
    try { decision = localStorage.getItem(key); } catch (_) {}
    if (decision === 'accepted') loadAnalytics();
    else if (decision !== 'declined') showPanel();
  });
})();
