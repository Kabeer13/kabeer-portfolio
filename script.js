(() => {
  const nav = document.querySelector('.main-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const cards = [...document.querySelectorAll('.project-card')];
  const dialog = document.getElementById('project-dialog');
  const toast = document.querySelector('.toast');
  let activeCard = null;

  menuToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));

  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  }));

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function openProject(card, index) {
    activeCard = card;
    document.getElementById('dialog-index').textContent = String(index + 1).padStart(3, '0');
    document.getElementById('dialog-title').textContent = card.dataset.repo || 'Project';
    document.getElementById('dialog-description').textContent = card.dataset.description || 'Open the repository to inspect the source.';
    document.getElementById('dialog-stack').textContent = card.dataset.stack || 'See repository for details.';
    const link = document.getElementById('dialog-link');
    link.href = card.dataset.url || 'https://github.com/Kabeer13';
    link.innerHTML = `${card.dataset.repo === 'Car Decision System' ? 'OPEN GITHUB PROFILE' : 'OPEN SOURCE REPOSITORY'} <span>↗</span>`;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else window.open(link.href, '_blank', 'noopener');
    document.body.classList.add('dialog-open');
  }
  document.querySelectorAll('.inspect-btn').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    openProject(card, cards.indexOf(card));
  }));
  document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog?.addEventListener('close', () => { document.body.classList.remove('dialog-open'); activeCard = null; });

  // Small interaction: pressing / jumps to project search-like archive, Escape closes overlays.
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName) && !dialog.open) {
      event.preventDefault(); document.getElementById('garage').scrollIntoView({ behavior: 'smooth' });
      showToast('ARCHIVE READY — SELECT A BUILD TO INSPECT');
    }
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  const revealTargets = document.querySelectorAll('.section-heading, .about-layout, .garage-intro, .garage-toolbar, .project-card, .materials-head, .materials-grid, .contact-layout');
  revealTargets.forEach(target => target.classList.add('fade-in'));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    revealTargets.forEach(target => observer.observe(target));
  } else revealTargets.forEach(target => target.classList.add('in-view'));

  // If the GitHub API is reachable, keep the repository count in sync without making the site depend on it.
  fetch('https://api.github.com/users/Kabeer13/repos?per_page=100&sort=updated', { headers: { Accept: 'application/vnd.github+json' } })
    .then(response => { if (!response.ok) throw new Error('GitHub API unavailable'); return response.json(); })
    .then(repos => {
      const publicCount = repos.filter(repo => !repo.private).length;
      const allButton = document.querySelector('.filter-btn[data-filter="all"] span');
      if (allButton) allButton.textContent = String(cards.length).padStart(2, '0');
      const archiveLabel = document.querySelector('.archive-bottom .mono');
      if (archiveLabel && publicCount) archiveLabel.textContent = `CURRENT GITHUB PROFILE / ${publicCount} PUBLIC REPOSITORIES / FEATURED SELECTION BELOW`;
    })
    .catch(() => { /* The curated project archive works even when the API is unavailable. */ });
})();
