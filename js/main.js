// InfoGames - Script principal
console.log('🎮 InfoGames cargado correctamente');
console.log('Página informativa sobre videojuegos desplegada con Docker');

// Funcionalidad del Carrusel de Consolas
// Scroll helpers: move exactly one card per click
function getTrackFromButton(button) {
  const carousel = button.closest('.carousel');
  return carousel ? carousel.querySelector('.carousel-track') : null;
}

function getScrollStep(track) {
  const firstItem = track ? track.querySelector('.carousel-item') : null;
  if (!firstItem) return 200; // fallback
  const itemWidth = firstItem.getBoundingClientRect().width;
  const style = window.getComputedStyle(track);
  const gapRaw = parseFloat(style.gap);
  const gap = isNaN(gapRaw) ? 0 : gapRaw;
  return itemWidth + gap;
}

function nextConsole(button) {
  const track = getTrackFromButton(button);
  if (!track) return;
  const step = getScrollStep(track);
  track.scrollBy({ left: step, behavior: 'smooth' });
  // Update buttons after motion
  setTimeout(() => updateScrollButtons(track), 120);
}

function prevConsole(button) {
  const track = getTrackFromButton(button);
  if (!track) return;
  const step = getScrollStep(track);
  track.scrollBy({ left: -step, behavior: 'smooth' });
  // Update buttons after motion
  setTimeout(() => updateScrollButtons(track), 120);
}

// Agregar efectos adicionales de interactividad
document.addEventListener('DOMContentLoaded', function() {
  const carouselItems = document.querySelectorAll('.carousel-item');
  
  carouselItems.forEach(item => {
    item.addEventListener('click', function() {
      const consoleName = this.querySelector('p').textContent;
      const year = this.querySelector('.year').textContent;
      console.log(`🎮 Consola seleccionada: ${consoleName} (${year})`);
    });
  });

  // Monitorear scroll del carrusel para mostrar/ocultar botones si es necesario
  const tracks = document.querySelectorAll('.carousel-track');
  tracks.forEach(track => {
    updateScrollButtons(track);
    track.addEventListener('scroll', function() {
      updateScrollButtons(this);
    });
  });

  // On resize, recompute and update buttons
  window.addEventListener('resize', () => {
    document.querySelectorAll('.carousel-track').forEach(updateScrollButtons);
  });

  // Keyboard support: left/right arrows within carousel
  document.querySelectorAll('.carousel').forEach(carousel => {
    carousel.tabIndex = 0;
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        const btn = carousel.querySelector('.carousel-btn.next');
        if (btn) nextConsole(btn);
      } else if (e.key === 'ArrowLeft') {
        const btn = carousel.querySelector('.carousel-btn.prev');
        if (btn) prevConsole(btn);
      }
    });
  });
});

function updateScrollButtons(track) {
  const carousel = track.closest('.carousel');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');

  const epsilon = 5; // tolerance for fractional pixels
  const isAtStart = track.scrollLeft <= epsilon;
  const isAtEnd = (track.scrollLeft + track.clientWidth) >= (track.scrollWidth - epsilon);

  // Hide/disable buttons if no overflow
  const hasOverflow = track.scrollWidth > track.clientWidth + 1;
  if (prevBtn) {
    prevBtn.disabled = isAtStart || !hasOverflow;
    prevBtn.style.visibility = hasOverflow ? 'visible' : 'hidden';
  }
  if (nextBtn) {
    nextBtn.disabled = isAtEnd || !hasOverflow;
    nextBtn.style.visibility = hasOverflow ? 'visible' : 'hidden';
  }
}
