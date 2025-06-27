document.addEventListener("DOMContentLoaded", () => {
  const id = localStorage.getItem("adoptar_id");
  const info = document.getElementById("info-mascota");

  fetch("data/mascotas.json")
    .then(res => res.json())
    .then(data => {
      const mascota = data.find(m => m.id == id);
      if (mascota) {
        // Carrusel de imágenes
        const slides = mascota.imagenes.map(function(img, idx) {
          return `<div class="slide${idx === 0 ? " active" : ""}">
            <img src="${img}" alt="${mascota.nombre}" />
          </div>`;
        }).join("");
        info.innerHTML = `
          <h3>Adoptás a: ${mascota.nombre}</h3>
          <div class="carrusel-container">
            <button id="prev-slide">&#8592;</button>
            <div class="carrusel-slides">${slides}</div>
            <button id="next-slide">&#8594;</button>
          </div>
          <p>${mascota.descripcion}</p>
        `;
        // Lógica del carrusel
        const slideElements = info.querySelectorAll('.slide');
        let current = 0;
        function showSlide(idx) {
          slideElements.forEach((el, i) => {
            el.classList.toggle('active', i === idx);
          });
        }
        info.querySelector('#prev-slide').addEventListener('click', () => {
          current = (current - 1 + slideElements.length) % slideElements.length;
          showSlide(current);
        });
        info.querySelector('#next-slide').addEventListener('click', () => {
          current = (current + 1) % slideElements.length;
          showSlide(current);
        });
      }
    });

  document.getElementById("form-adopcion").addEventListener("submit", e => {
    e.preventDefault();
    alert("Gracias por enviar tu solicitud 🐾");
    localStorage.removeItem("adoptar_id");
    window.location.href = "index.html";
  });
});
// Puedes agregar estilos CSS para .carrusel-container, .carrusel-slides y .slide.active en tu archivo CSS para mejorar la apariencia.
