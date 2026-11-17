// Reveal content as it scrolls into view, staggered within each group.
// Without JS, without IntersectionObserver or with reduced motion,
// everything is simply visible (the hiding CSS only applies under .js).
(() => {
  const root = document.documentElement;
  const items = document.querySelectorAll('.reveal');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  root.classList.add('js');

  // Siblings that enter together get an index for a short cascade.
  const seen = new Map();
  items.forEach((el) => {
    const group = el.parentElement;
    const index = seen.get(group) || 0;
    seen.set(group, index + 1);
    el.style.setProperty('--i', String(Math.min(index, 5)));
  });

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  items.forEach((el) => observer.observe(el));
})();
