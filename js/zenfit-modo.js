document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("zenfit-toggle-mode");
  const iconoModo = document.getElementById("icono-modo");
  const body = document.body;

  if (localStorage.getItem("zenfit-modo") === "claro") {
    body.classList.add("zenfit-light-mode");
    iconoModo.className = "bi bi-moon-stars-fill";
  } else {
    iconoModo.className = "bi bi-brightness-high-fill";
  }

 
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("zenfit-light-mode");
    const esClaro = body.classList.contains("zenfit-light-mode");

    if (esClaro) {
      iconoModo.className = "bi bi-moon-stars-fill";
    } else {
      iconoModo.className = "bi bi-brightness-high-fill";
    }

    localStorage.setItem("zenfit-modo", esClaro ? "claro" : "oscuro");
  });
});


const revelarObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revelarObserver.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.15 
});

const elementosOcultos = document.querySelectorAll('.efecto-revelar');

elementosOcultos.forEach((elemento) => {
  revelarObserver.observe(elemento);
});

