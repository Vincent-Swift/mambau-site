// Language: the root page sends first-time visitors to the version that
// matches their browser's language and region (same rules as the app:
// region first, then language, then English). An explicit pick wins.
(() => {
  const KEY = 'mam-lang';
  const supported = ['vi', 'en', 'hi', 'ar'];
  const regions = { VN: 'vi', IN: 'hi', SA: 'ar', AE: 'ar', EG: 'ar', US: 'en' };
  const store = {
    get() { try { return localStorage.getItem(KEY); } catch { return null; } },
    set(v) { try { localStorage.setItem(KEY, v); } catch { /* private mode */ } },
  };

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-lang]');
    if (link) store.set(link.dataset.lang);
  });

  if (location.pathname !== '/') return;
  const chosen = store.get();
  const pick = chosen && supported.includes(chosen) ? chosen : guess();
  if (pick !== 'vi') location.replace(`/${pick}/${location.hash}`);

  function guess() {
    const tags = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
    for (const tag of tags) {
      const region = (tag.split('-')[1] || '').toUpperCase();
      if (regions[region]) return regions[region];
    }
    for (const tag of tags) {
      const lang = tag.split('-')[0].toLowerCase();
      if (supported.includes(lang)) return lang;
    }
    return 'en';
  }
})();
