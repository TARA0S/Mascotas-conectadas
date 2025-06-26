document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector(".contenedor_sliders");
  const seleccion = JSON.parse(localStorage.getItem("seleccion")); // trae tipo y edad

  fetch("data/mascotas.json")
    .then(res => res.json())
    .then(mascotas => {
      const filtradas = mascotas.filter(m => {
        const tipoOK = seleccion?.tipo ? m.tipo === seleccion.tipo : true;
        const edadOK = seleccion?.edad ? m.edad === seleccion.edad : true;
        return tipoOK && edadOK;
      });

      if (filtradas.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron mascotas que coincidan.</p>";
        return;
      }

      filtradas.forEach(m => {
        const box = document.createElement("div");
        box.className = "slider_box";
        box.innerHTML = `
          <div class="slider">
            <div class="slide active">
              <img src="${m.imagen}" alt="${m.nombre}" />
            </div>
          </div>
          <h2 class="Titulo">${m.nombre}</h2>
          <p>${m.descripcion}</p>
          <button class="btn-adoptar" onclick="adoptar(${m.id})">Adoptar</button>
        `;
        contenedor.appendChild(box);
      });
    })
    .catch(error => {
      console.error("Error cargando mascotas:", error);
      contenedor.innerHTML = "<p>Error al cargar los datos.</p>";
    });
});

function adoptar(id) {
  localStorage.setItem("adoptar_id", id);
  window.location.href = "form_adopcion.html";
}
