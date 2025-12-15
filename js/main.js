// Carrusel 3D basado en índice por generación (JS puro)
console.log('🎮 InfoGames cargado (Carrusel 3D)');

function getTrackFromButton(button) {
  const carousel = button.closest('.carousel');
  return carousel?.querySelector('.carousel-track');
}

  function getItems(track) { return Array.from(track.querySelectorAll('.carousel-item')); }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function applyStates(carousel) {
    const track = carousel.querySelector('.carousel-track');
    if (!track) return;
    const items = getItems(track);
    const n = items.length;
    let idx = Number(carousel.dataset.index || 0);
    if (!Number.isFinite(idx)) idx = 0;
    idx = clamp(idx, 0, Math.max(0, n - 1));
    carousel.dataset.index = String(idx);

    for (const it of items) it.classList.remove('active','prev','next','hidden');
    const active = items[idx];
    const prev = items[idx - 1];
    const next = items[idx + 1];
    if (active) active.classList.add('active');
    if (prev) prev.classList.add('prev');
    if (next) next.classList.add('next');
    items.forEach((it, i) => { if (i !== idx && i !== idx-1 && i !== idx+1) it.classList.add('hidden'); });

    const header = carousel.querySelector('.carousel-header');
    const prevBtn = header?.querySelector('.prev');
    const nextBtn = header?.querySelector('.next');
    if (prevBtn) prevBtn.disabled = (idx <= 0);
    if (nextBtn) nextBtn.disabled = (idx >= n - 1);
  }

  function nextConsole(button) {
    const track = getTrackFromButton(button);
    if (!track) return;
    const carousel = track.closest('.carousel');
    const items = getItems(track);
    let idx = Number(carousel.dataset.index || 0);
    idx = clamp(idx + 1, 0, items.length - 1);
    carousel.dataset.index = String(idx);
    applyStates(carousel);
  }

  function prevConsole(button) {
    const track = getTrackFromButton(button);
    if (!track) return;
    const carousel = track.closest('.carousel');
    const items = getItems(track);
    let idx = Number(carousel.dataset.index || 0);
    idx = clamp(idx - 1, 0, items.length - 1);
    carousel.dataset.index = String(idx);
    applyStates(carousel);
  }

  function initCarousel3D() {
    const carousels = Array.from(document.querySelectorAll('.carousel'));
    carousels.forEach(c => {
      if (!c.dataset.index) c.dataset.index = '0';
      applyStates(c);
      c.tabIndex = 0;
      c.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          const btn = c.querySelector('.carousel-header .next');
          nextConsole(btn);
        } else if (e.key === 'ArrowLeft') {
          const btn = c.querySelector('.carousel-header .prev');
          prevConsole(btn);
        }
      });
      const track = c.querySelector('.carousel-track');
      getItems(track).forEach((item, i) => {
        item.addEventListener('click', () => { c.dataset.index = String(i); applyStates(c); });
      });
      window.addEventListener('resize', () => applyStates(c));
    });
  }

document.addEventListener('DOMContentLoaded', initCarousel3D);
