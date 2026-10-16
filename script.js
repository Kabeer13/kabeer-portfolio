(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Content remains visible if JavaScript or IntersectionObserver is unavailable.
  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-motion');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    $$('.reveal').forEach(element => revealObserver.observe(element));
  }

  const menuToggle = $('#menu-toggle');
  const nav = $('#site-nav');
  const closeNav = () => {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
  };
  menuToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  $$('#site-nav a').forEach(link => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeNav();
    const target = event.target;
    const typing = target instanceof HTMLElement && (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable);
    if (event.key === '/' && !typing && !$('#project-dialog')?.open) {
      event.preventDefault();
      $('#garage')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      window.setTimeout(() => $('#project-search')?.focus(), reducedMotion ? 0 : 250);
    }
  });

  const progress = $('#scroll-progress');
  const updateProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${maxScroll > 0 ? Math.min(100, window.scrollY / maxScroll * 100) : 0}%`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });

  const ignition = $('#ignition');
  ignition?.addEventListener('click', () => {
    const active = ignition.getAttribute('aria-pressed') !== 'true';
    ignition.setAttribute('aria-pressed', String(active));
    const mode = $('#mode-value');
    const rpm = $('#rpm-value');
    const label = $('#ignition-label');
    if (mode) mode.textContent = active ? 'IGNITION / LIVE' : 'BUILD / REPEAT';
    if (rpm) rpm.textContent = active ? '09400' : '07200';
    if (label) label.textContent = active ? 'EXPERIENCE ACTIVE' : 'START THE EXPERIENCE';
    document.querySelector('.hero')?.classList.toggle('engine-on', active);
  });

  const cards = $$('.project-card');
  const filters = $$('.filter');
  const search = $('#project-search');
  const projectCount = $('#project-count');
  const noResults = $('#no-results');
  let activeFilter = 'all';
  function filterProjects() {
    const query = (search?.value || '').trim().toLowerCase();
    let count = 0;
    cards.forEach(card => {
      const categoryMatches = activeFilter === 'all' || card.dataset.category === activeFilter;
      const text = `${card.dataset.repo || ''} ${card.dataset.description || ''} ${card.dataset.stack || ''} ${card.textContent || ''}`.toLowerCase();
      const matches = categoryMatches && (!query || text.includes(query));
      card.hidden = !matches;
      if (matches) count++;
    });
    filters.forEach(button => {
      const active = button.dataset.filter === activeFilter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (projectCount) projectCount.textContent = String(count).padStart(2, '0');
    if (noResults) noResults.hidden = count > 0;
  }
  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filterProjects();
  }));
  search?.addEventListener('input', filterProjects);
  $('#reset-search')?.addEventListener('click', () => {
    activeFilter = 'all';
    if (search) search.value = '';
    filterProjects();
    search?.focus();
  });
  filterProjects();

  const dialog = $('#project-dialog');
  const dialogClose = $('#dialog-close');
  const copyToast = $('#toast');
  let toastTimeout;
  const announce = message => {
    if (!copyToast) return;
    copyToast.textContent = message;
    copyToast.classList.add('visible');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => copyToast.classList.remove('visible'), 2300);
  };
  function openProject(card) {
    if (!card) return;
    const fill = (selector, text) => { const node = $(selector); if (node) node.textContent = text; };
    fill('#dialog-number', String(card.dataset.number || '01').padStart(3, '0'));
    fill('#dialog-title', card.dataset.repo || 'Project dossier');
    fill('#dialog-description', card.dataset.description || 'Open the source repository to review the current implementation.');
    fill('#dialog-stack', card.dataset.stack || 'See repository for current details.');
    const link = $('#dialog-link');
    if (link) link.href = card.dataset.url || 'https://github.com/Kabeer13';
    if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
    else if (link) window.open(link.href, '_blank', 'noopener,noreferrer');
  }
  $$('.project-open').forEach(button => button.addEventListener('click', () => openProject(button.closest('.project-card'))));
  dialogClose?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  // A small tilt is used only with a precise mouse; no layout-affecting transforms on touch screens.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer && !reducedMotion) {
    $$('.project-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        if (card.hidden || event.buttons) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateX(${-y * 1.6}deg) rotateY(${x * 1.8}deg) translateY(-3px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }
})();
