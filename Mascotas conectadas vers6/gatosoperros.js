document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector(".contenedor_sliders");
  let mascotasData = [];

  // Leer selección previa de localStorage y filtrar automáticamente SIN marcar checkboxes
  const seleccion = JSON.parse(localStorage.getItem("seleccion"));

  // Acordeón con rotación de flecha
  document.querySelectorAll('.contd_categoriaunitaria').forEach(unitaria => {
    const p = unitaria.querySelector('p');
    const checkboxes = Array.from(unitaria.querySelectorAll('label'));
    // Ocultar por defecto
    checkboxes.forEach(lab => lab.style.display = 'none');
    p.style.cursor = 'pointer';
    p.addEventListener('click', () => {
      const abierto = unitaria.classList.toggle('p-abierto');
      checkboxes.forEach(lab => lab.style.display = abierto ? 'block' : 'none');
    });
  });
  // Mostrar todos los filtros al cargar
  setTimeout(() => {
    document.querySelectorAll('.contd_categoriaunitaria').forEach(unitaria => {
      unitaria.classList.add('p-abierto');
      unitaria.querySelectorAll('label').forEach(lab => lab.style.display = 'block');
    });
  }, 100);

  // Cargar datos de mascotas
  fetch("data/mascotas.json")
    .then(res => res.json())
    .then(mascotas => {
      mascotasData = mascotas;
      if (seleccion && (seleccion.tipo || seleccion.edad)) {
        // Filtrar por tipo y edad según localStorage
        const filtradas = mascotasData.filter(m => {
          const tipoOK = seleccion.tipo ? m.tipo === seleccion.tipo : true;
          const edadOK = seleccion.edad ? m.edad === seleccion.edad : true;
          return tipoOK && edadOK;
        });
        renderMascotas(filtradas);
      } else {
        renderMascotas(mascotasData);
      }
    })
    .catch(error => {
      console.error("Error cargando mascotas:", error);
      contenedor.innerHTML = "<p>Error al cargar los datos.</p>";
    });

  // Filtrar al hacer click en el botón
  document.getElementById('btn-filtrar').addEventListener('click', () => {
    const tipos = getChecked(['gato', 'perro']);
    const edades = getChecked(['cachorro', 'joven', 'adulto', 'abuelo', 'indiferente']);
    const tamanos = getChecked(['grande', 'mediano', 'chico']);
    const colores = getChecked(['negro', 'Blanco', 'Manchado']);

    let filtradas = mascotasData.filter(m => {
      // Tipo
      const tipoOK = tipos.length ? tipos.includes(m.tipo) : true;
      // Edad
      let edadOK = true;
      if (edades.length && !edades.includes('indiferente')) {
        edadOK = edades.includes(m.edad);
      }
      // Tamaño
      const tamanoOK = tamanos.length ? tamanos.includes(m.tamano) : true;
      // Color (case-insensitive)
      const colorOK = colores.length ? colores.some(c => m.color.toLowerCase() === c.toLowerCase()) : true;
      return tipoOK && edadOK && tamanoOK && colorOK;
    });
    renderMascotas(filtradas);
  });

  function getChecked(ids) {
    return ids.filter(id => {
      const el = document.getElementById(id);
      return el && el.checked;
    });
  }

  function renderMascotas(mascotas) {
    contenedor.innerHTML = '';
    if (mascotas.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron mascotas que coincidan.</p>";
      return;
    }
    mascotas.forEach(m => {
      const box = document.createElement("div");
      box.className = "slider_box";
      const slides = m.imagenes.map((img, idx) => `
        <div class="slide${idx === 0 ? " active" : ""}">
          <img src="${img}" alt="${m.nombre}" />
        </div>
      `).join("");
      box.innerHTML = `
        <div class="slider">
          <button class="prev">&#10094;</button>
          <div class="slides_container">
            ${slides}
          </div>
          <button class="next">&#10095;</button>
        </div>
        <h2 class="Titulo">${m.nombre}</h2>
        <p>${m.descripcion}</p>
        <p><b>Tamaño:</b> ${m.tamano} | <b>Color:</b> ${m.color} | <b>Edad:</b> ${m.edad}</p>
        <button class="btn-adoptar" onclick="adoptar(${m.id})">Adoptar</button>
      `;
      contenedor.appendChild(box);
    });
    // Slider funcionalidad para cada slider generado
    document.querySelectorAll('.slider').forEach(slider => {
      const slides = slider.querySelectorAll('.slide');
      const prev = slider.querySelector('.prev');
      const next = slider.querySelector('.next');
      let current = 0;
      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.classList.remove('active');
          if (i === index) {
            slide.classList.add('active');
          }
        });
      }
      function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
      }
      function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
      }
      next.addEventListener('click', nextSlide);
      prev.addEventListener('click', prevSlide);
      setInterval(nextSlide, 5000);
    });
  }
});

function adoptar(id) {
  localStorage.setItem("adoptar_id", id);
  window.location.href = "form_adopcion.html";
}

// Redirección al hacer click en logo superior o footer
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.contd_logo')?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  document.querySelector('.logofooter')?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Redirección para botones superiores
  document.querySelector('.Adopcion')?.addEventListener('click', () => {
    window.location.href = 'index.html#adopcion';
  });
  document.querySelector('.Apadrinamiento')?.addEventListener('click', () => {
    window.location.href = 'index.html#apadrinamiento';
  });
  // Redirección para Log In
  document.querySelector('.logIn')?.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

  // Filtro solo gatos
  document.getElementById('link-gatos')?.addEventListener('click', e => {
    e.preventDefault();
    // Desmarcar todos los checkboxes de tipo
    document.getElementById('perro').checked = false;
    document.getElementById('gato').checked = true;
    // Lanzar el filtro
    document.getElementById('btn-filtrar').click();
  });
  // Filtro solo perros
  document.getElementById('link-perros')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('gato').checked = false;
    document.getElementById('perro').checked = true;
    document.getElementById('btn-filtrar').click();
  });
});
