// script.js - minimal JS for nav toggle, year update and contact form
document.addEventListener('DOMContentLoaded', function () {
  // update years
  const yrs = document.querySelectorAll('#year, #year-2, #year-3, #year-4');
  yrs.forEach(el => { if (el) el.textContent = new Date().getFullYear(); });

// Nav toggle SOLO en mobile
function makeToggle(btnId, navId) {
  const btn = document.getElementById(btnId);
  const nav = document.getElementById(navId);
  if (!btn || !nav) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // SOLO en mobile (<980px)
    if (window.innerWidth <= 980) {
      const isShown = nav.style.display === 'block';
      nav.style.display = isShown ? 'none' : 'block';
    }
  });

  // Cerrar si clic fuera (solo mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 980) {
      if (!btn.contains(e.target) && !nav.contains(e.target)) {
        nav.style.display = 'none';
      }
    }
  });
}

makeToggle('nav-toggle','nav');
makeToggle('nav-toggle-2','nav-2');
makeToggle('nav-toggle-3','nav-3');
makeToggle('nav-toggle-4','nav-4');


// Buscamos el formulario en el HTML
  const form = document.getElementById('contactForm');
  
// Contact form handling (Direct HTML Submission)
  if (form) {
    form.addEventListener('submit', function (e) {
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const msgBox = document.getElementById('formMessage');

      // Si falta algún campo, frenamos el envío y mostramos error en rojo
      if (!name || !email || !message) {
        e.preventDefault(); // Evita que se envíe vacío
        msgBox.textContent = 'Por favor completá todos los campos.';
        msgBox.style.color = '#ff8b8b';
        return;
      }
      
      // Si todo está bien, NO ponemos e.preventDefault(). 
      // Dejamos que el HTML viaje directo a Formspree.
      msgBox.style.color = '#8b9374';
      msgBox.textContent = 'Enviando...';
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

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM listo ✔");

  const themeBtn = document.getElementById("theme-toggle");
  console.log("¿Existe el botón?", themeBtn);

  // si no existe el botón en esta página, no hacemos nada
  if (!themeBtn) return;

  // establecer tema inicial
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    themeBtn.textContent = "🌙";
  }

  // agregar el listener correctamente
  themeBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    themeBtn.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");

    console.log("Click OK → Tema cambiado:", isLight ? "light" : "dark");
  });
});

