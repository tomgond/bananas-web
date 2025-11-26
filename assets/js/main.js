// Minimal interactions: mobile menu toggle and cross-page fade transitions.
(function () {
  const body = document.body;
  const nav = document.querySelector('nav.primary-nav');
  const toggle = document.querySelector('.menu-toggle');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Fade-out transitions on internal links
  const links = Array.from(document.querySelectorAll('a[href]')).filter((link) => {
    const href = link.getAttribute('href');
    if (!href) return false;
    const isAnchor = href.startsWith('#');
    const isExternal = /^https?:\/\//i.test(href) && !href.includes(location.host);
    const isMail = href.startsWith('mailto:') || href.startsWith('tel:');
    return !isAnchor && !isExternal && !isMail;
  });

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      // Allow middle-click or modifiers to open new tab as normal
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      const target = link.getAttribute('href');
      body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = target;
      }, 360);
    });
  });

  // Initial fade-in
  window.addEventListener('DOMContentLoaded', () => {
    body.classList.add('fade-enter');
  });
})();
