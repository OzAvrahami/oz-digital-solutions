'use strict';
const language = new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'he';
document.documentElement.lang = language;
document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
document.title = language === 'he' ? 'הצהרת נגישות — עוז אברהמי' : 'Accessibility statement — Oz Avrahami';
document.querySelectorAll('[data-language]').forEach(element => { element.hidden = element.dataset.language !== language; });
const switcher = document.querySelector('.statement-language');
switcher.href = language === 'he' ? '?lang=en' : '?lang=he';
switcher.lang = switcher.hreflang = language === 'he' ? 'en' : 'he';
switcher.textContent = language === 'he' ? 'EN' : 'עברית';
switcher.setAttribute('aria-label', language === 'he' ? 'Switch to English' : 'מעבר לעברית');
try {
  sessionStorage.setItem('oz-language', language);
  const preferences = JSON.parse(localStorage.getItem('oz-accessibility') || '{}');
  document.documentElement.classList.toggle('high-contrast', preferences.highContrast === true);
  document.documentElement.classList.toggle('motion-paused', preferences.paused === true || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
} catch {}
