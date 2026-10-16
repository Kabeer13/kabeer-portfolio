(() => {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const preloader = $('#preloader');
  const loadPercent = $('#load-percent');
  const hero = $('.hero');
  const nav = $('#main-nav');
  const menuToggle = $('#menu-toggle');
  const dialog = $('#project-dialog');
  const toast = $('#toast');
  const cards = $$('.project-card');
  const filterButtons = $$('.filter-btn');
  const searchInput = $('#project-search');
  let selectedCard = null;
  let toastTimer = null;
  let introDone = false;

  // Intro: short, skippable and never required to reach the content.
  function finishIntro() {
    if (introDone) return;
    introDone = true;
    preloader?.classList.add('done');
    document.body.classList.add('intro-complete');
    window.setTimeout(() => { if (preloader) preloader.hidden = true; }, 900);
  }
  if (preloader && !reducedMotion) {
    let counter = 1;
    const countTimer = window.setInterval(() => {
      counter = Math.min(100, counter + Math.ceil(Math.random() * 13));
      if (loadPercent) loadPercent.textContent = String(counter).padStart(3, '0');
      if (counter >= 100) window.clearInterval(countTimer);
    }, 95);
    window.setTimeout(finishIntro, 1350);
  } else finishIntro();
  $('#skip-intro')?.addEventListener('click', finishIntro);
  preloader?.addEventListener('click', event => { if (event.target === preloader) finishIntro(); });

  // Navigation and scroll state.
  function updateHeader() {
    const header = $('#site-header');
    header?.classList.toggle('scrolled', window.scrollY > 35);
    const bar = $('#scroll-progress-bar');
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  menuToggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  $$('#main-nav a').forEach(link => link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('keydown', event => {
    const target = event.target;
    const typing = target instanceof HTMLElement && (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable);
    if (event.key === '/' && !typing && !dialog?.open) {
      event.preventDefault();
      $('#garage')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      window.setTimeout(() => searchInput?.focus(), reducedMotion ? 0 : 350);
      showToast('ARCHIVE SEARCH READY — FIND A BUILD');
    }
    if (event.key === 'Escape') {
      nav?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  // Scroll-reveal entries; section content remains visible if JS/Observer isn't available.
  const revealTargets = $$('.reveal');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach(target => revealObserver.observe(target));
  } else revealTargets.forEach(target => target.classList.add('in-view'));

  // Active navigation state based on the visible section.
  if ('IntersectionObserver' in window) {
    const sections = ['about', 'garage', 'skills', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        $$('#main-nav a').forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('current', active);
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
  }

  // Ignition is a deliberate interactive detail, not a blocking intro.
  const ignition = $('#ignition-button');
  ignition?.addEventListener('click', () => {
    const on = ignition.getAttribute('aria-pressed') !== 'true';
    ignition.setAttribute('aria-pressed', String(on));
    hero?.classList.toggle('engine-on', on);
    const readout = $('#mode-readout');
    const rpm = $('#rpm-value');
    if (readout) readout.textContent = on ? 'IGNITION / LIVE' : 'BUILD / REPEAT';
    if (rpm) rpm.textContent = on ? '09400' : '07200';
    showToast(on ? 'IGNITION ON — THE ARCHIVE IS LIVE' : 'IGNITION OFF — TAKE YOUR TIME');
  });

  // Project archive: filters and live search can be combined.
  let currentFilter = 'all';
  function applyProjectFilters() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const categoryMatch = currentFilter === 'all' || card.dataset.category === currentFilter;
      const haystack = [card.dataset.repo, card.dataset.description, card.dataset.stack, card.textContent].join(' ').toLowerCase();
      const queryMatch = !query || haystack.includes(query);
      const show = categoryMatch && queryMatch;
      card.hidden = !show;
      if (show) visible++;
    });
    filterButtons.forEach(button => {
      const active = button.dataset.filter === currentFilter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const countEl = $('#project-count');
    if (countEl) countEl.textContent = String(visible).padStart(2, '0');
    const noResults = $('#no-results');
    if (noResults) noResults.hidden = visible > 0;
  }
  filterButtons.forEach(button => button.addEventListener('click', () => {
    currentFilter = button.dataset.filter || 'all';
    applyProjectFilters();
  }));
  searchInput?.addEventListener('input', applyProjectFilters);
  $('#reset-search')?.addEventListener('click', () => {
    currentFilter = 'all';
    if (searchInput) searchInput.value = '';
    applyProjectFilters();
    searchInput?.focus();
  });
  applyProjectFilters();

  // Project dossier modal. All outgoing links point to the original public repository.
  function openProject(card) {
    selectedCard = card;
    const number = card.dataset.number || '01';
    $('#dialog-index').textContent = String(number).padStart(3, '0');
    $('#dialog-title').textContent = card.dataset.repo || 'Project dossier';
    $('#dialog-description').textContent = card.dataset.description || 'Open the source repository to inspect the current implementation.';
    $('#dialog-stack').textContent = card.dataset.stack || 'See repository for current details.';
    const link = $('#dialog-link');
    link.href = card.dataset.url || 'https://github.com/Kabeer13';
    link.innerHTML = `<span>OPEN SOURCE REPOSITORY</span><b>↗</b>`;
    if (typeof dialog?.showModal === 'function') dialog.showModal();
    else window.open(link.href, '_blank', 'noopener,noreferrer');
  }
  $$('.project-open').forEach(button => {
    button.addEventListener('click', () => openProject(button.closest('.project-card')));
  });
  $('#dialog-close')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog?.addEventListener('close', () => { selectedCard = null; });
  $('#dialog-copy')?.addEventListener('click', async () => {
    if (!selectedCard) return;
    const repo = selectedCard.dataset.repo || 'Kabeer13';
    try {
      await navigator.clipboard.writeText(repo);
      showToast(`COPIED: ${repo}`);
    } catch {
      const helper = document.createElement('textarea');
      helper.value = repo;
      helper.setAttribute('readonly', '');
      helper.style.position = 'absolute'; helper.style.left = '-9999px';
      document.body.appendChild(helper); helper.select();
      const copied = document.execCommand('copy'); helper.remove();
      showToast(copied ? `COPIED: ${repo}` : 'COPY UNAVAILABLE — SELECT THE PROJECT NAME');
    }
  });

  // Mouse spotlight and restrained tilt make the archive feel tactile on desktop.
  const cursor = $('.cursor-orb');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer && !reducedMotion) {
    document.body.classList.add('cursor-ready');
    window.addEventListener('pointermove', event => {
      if (cursor) cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%,-50%)`;
      const card = event.target.closest?.('.project-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
      }
    }, { passive: true });
    $$('a, button, .project-card').forEach(target => {
      target.addEventListener('pointerenter', () => cursor?.classList.add('active'));
      target.addEventListener('pointerleave', () => cursor?.classList.remove('active'));
    });
    $$('.project-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        if (card.hidden || event.buttons) return;
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - .5;
        const py = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(900px) rotateX(${-py * 2.8}deg) rotateY(${px * 3.2}deg) translateY(-2px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
    $$('.magnetic').forEach(element => {
      element.addEventListener('pointermove', event => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * .06;
        const y = (event.clientY - rect.top - rect.height / 2) * .06;
        element.style.transform = `translate(${x}px, ${y}px)`;
      });
      element.addEventListener('pointerleave', () => { element.style.transform = ''; });
    });
  }

  // Gentle parallax on the cinematic car image; disabled on touch/reduced-motion devices.
  if (hero && finePointer && !reducedMotion) {
    hero.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      const bg = $('.hero-image', hero);
      if (bg) bg.style.transform = `scale(1.06) translate(${x * -9}px, ${y * -5}px)`;
    });
    hero.addEventListener('pointerleave', () => {
      const bg = $('.hero-image', hero);
      if (bg) bg.style.transform = '';
    });
  }
})();
