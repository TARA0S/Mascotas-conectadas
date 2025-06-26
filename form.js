document.addEventListener("DOMContentLoaded", () => {
  const id = localStorage.getItem("adoptar_id");
  const info = document.getElementById("info-mascota");

  fetch("data/mascotas.json")
    .then(res => res.json())
    .then(data => {
      const mascota = data.find(m => m.id == id);
      if (mascota) {
        info.innerHTML = `
          <h3>Adoptás a: ${mascota.nombre}</h3>
          <img src="${mascota.imagen}" style="width:200px; border-radius:10px;" />
          <p>${mascota.descripcion}</p>
        `;
      }
    });

  document.getElementById("form-adopcion").addEventListener("submit", e => {
    e.preventDefault();
    alert("Gracias por enviar tu solicitud 🐾");
    localStorage.removeItem("adoptar_id");
    window.location.href = "index.html";
  });
});
