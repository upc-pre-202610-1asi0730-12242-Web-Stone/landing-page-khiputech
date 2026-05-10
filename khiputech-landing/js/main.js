/* =============================================
   HERO SLIDER — autoplay + transición suave
   ============================================= */

(function () {
  const INTERVAL = 5000; // ms entre slides

  const slides  = document.querySelectorAll('.slide');
  const thumbs  = document.querySelectorAll('.thumb');
  const dots    = document.querySelectorAll('.dot');
  const bars    = document.querySelectorAll('.thumb-bar');

  if (!slides.length) return;

  let current  = 0;
  let timer    = null;
  let barTimer = null;

  /* Activa el slide indicado */
  function goTo(index) {
    // Quitar activo anterior
    slides[current].classList.remove('active');
    thumbs[current].classList.remove('active');
    dots[current].classList.remove('active');

    // Resetear barra de progreso anterior
    bars[current].style.transition = 'none';
    bars[current].style.width = '0%';

    current = (index + slides.length) % slides.length;

    // Activar nuevo
    slides[current].classList.add('active');
    thumbs[current].classList.add('active');
    dots[current].classList.add('active');

    // Animar barra de progreso del thumb activo
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bars[current].style.transition = `width ${INTERVAL}ms linear`;
        bars[current].style.width = '100%';
      });
    });
  }

  /* Autoplay */
  function startAutoplay() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  /* Click en miniaturas */
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      goTo(i);
      startAutoplay(); // reinicia el timer al hacer click manual
    });
  });

  /* Pausa al hacer hover en el slider */
  const slider = document.querySelector('.hero-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', startAutoplay);
  }

  /* Init */
  goTo(0);
  startAutoplay();
})();