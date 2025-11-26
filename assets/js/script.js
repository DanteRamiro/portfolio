// script.js - minimal JS for nav toggle, year update and contact form
document.addEventListener('DOMContentLoaded', function () {
  // update years
  const yrs = document.querySelectorAll('#year, #year-2, #year-3, #year-4');
  yrs.forEach(el => { if (el) el.textContent = new Date().getFullYear(); });

  // Nav toggles (for the four different headers)
  function makeToggle(btnId, navId) {
    const btn = document.getElementById(btnId);
    const nav = document.getElementById(navId);
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
      const isShown = nav.style.display === 'block';
      nav.style.display = isShown ? 'none' : 'block';
    });
    // close when clicking outside
    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !nav.contains(e.target)) {
        nav.style.display = 'none';
      }
    });
  }
  makeToggle('nav-toggle','nav');
  makeToggle('nav-toggle-2','nav-2');
  makeToggle('nav-toggle-3','nav-3');
  makeToggle('nav-toggle-4','nav-4');

  // Contact form handling (front-end only)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const msgBox = document.getElementById('formMessage');

      // basic validation
      if (!name || !email || !message) {
        msgBox.textContent = 'Por favor completá todos los campos.';
        msgBox.style.color = '#ff8b8b';
        return;
      }
      // simulate send (since no backend)
      msgBox.style.color = '';
      msgBox.textContent = 'Enviando...';

      // small delay to simulate network
      setTimeout(() => {
        form.reset();
        msgBox.style.color = '';
        msgBox.textContent = 'Gracias por tu mensaje. Te responderé pronto.';
      }, 800);
    });
  }

  // Simple accessibility: close nav with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ['nav','nav-2','nav-3','nav-4'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
    }
  });
});
