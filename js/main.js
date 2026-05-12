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

// =============================================
// VALIDACIÓN FORMULARIO CONTACTO
// =============================================

document.querySelector('.btn-submit').addEventListener('click', function () {
  const campos = [
    { id: 'nombre',      label: 'Nombre completo',            tipo: 'texto' },
    { id: 'cargo',       label: 'Cargo',                      tipo: 'texto' },
    { id: 'institucion', label: 'Nombre del museo',           tipo: 'texto' },
    { id: 'correo',      label: 'Correo',                     tipo: 'email' },
    { id: 'telefono',    label: 'Teléfono',                   tipo: 'telefono' },
    { id: 'tipo',        label: 'Tipo de museo',              tipo: 'select' },
  ];

  limpiarErrores();

  let valido = true;

  campos.forEach(({ id, label, tipo }) => {
    const campo = document.getElementById(id);
    const valor = campo.value.trim();

    if (!valor) {
      mostrarError(campo, `${label} es obligatorio.`);
      valido = false;
      return;
    }

    if (tipo === 'email') {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(valor)) {
        mostrarError(campo, 'Ingresa un correo válido. Ej: nombre@museo.pe');
        valido = false;
      }
    }

    if (tipo === 'telefono') {
      const regexTel = /^[\d\s\+\-]{7,15}$/;
      if (!regexTel.test(valor)) {
        mostrarError(campo, 'Ingresa un teléfono válido. Ej: +51 999 888 777');
        valido = false;
      }
    }
  });

  if (valido) {
    mostrarExito();
  }
});

function mostrarError(campo, mensaje) {
  campo.classList.add('input-error');

  const error = document.createElement('span');
  error.className = 'error-msg';
  error.textContent = mensaje;

  campo.parentElement.appendChild(error);
}

function limpiarErrores() {
  document.querySelectorAll('.error-msg').forEach(e => e.remove());
  document.querySelectorAll('.input-error').forEach(e => e.classList.remove('input-error'));
}

function mostrarExito() {
  limpiarErrores();

  const form = document.querySelector('.contact__form');
  form.innerHTML = `
    <div class="success-msg">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1E6FD9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
      <h3>¡Mensaje enviado!</h3>
      <p>Nos pondremos en contacto contigo pronto.</p>
    </div>
  `;
}