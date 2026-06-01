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


// Contact form handling (Real backend connection)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // 1. EXTRAER LOS VALORES DE LOS INPUTS (Esto faltaba en tu captura)
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const msgBox = document.getElementById('formMessage');

      // 2. Validación básica en el front
      if (!name || !email || !message) {
        msgBox.textContent = 'Por favor completá todos los campos.';
        msgBox.style.color = '#ff8b8b';
        return;
      }
      
      msgBox.style.color = '';
      msgBox.textContent = 'Enviando mensaje...';

      // Creamos el objeto con los datos recolectados
      const formData = { name, email, message };

      // Enviamos los datos a FormSubmit
      fetch('https://formsubmit.co/ajax/dantelezcano05@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          form.reset();
          msgBox.style.color = '#8b9374'; // Tu verde oliva
          msgBox.textContent = '¡Gracias por tu mensaje! Te responderé pronto.';
        } else {
          throw new Error('Error en el envío');
        }
      })
      .catch(error => {
        console.error(error);
        msgBox.style.color = '#ff8b8b';
        msgBox.textContent = 'Hubo un problema al enviar. Intentalo de nuevo.';
      });
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

