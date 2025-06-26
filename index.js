// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Obtener los elementos relevantes
    const perroBtn = document.querySelector(".contd_Perro");
    const gatoBtn = document.querySelector(".contd_Gato");
    const categoriasEdad = document.querySelector(".contd_categoriasedad");
    const categorias = document.querySelectorAll(".categorias");

    let seleccionGato = false;

    // Ocultar las categorías al inicio
    categoriasEdad.style.display = "none";

    // Función para mostrar las categorías
    const mostrarCategorias = (esGato) => {
        categoriasEdad.style.display = "flex";

        // Ocultar los botones de perro y gato
        perroBtn.style.display = "none";    
        gatoBtn.style.display = "none";
        seleccionGato = esGato;
    };

    // Agregar los listeners de clic
    perroBtn.addEventListener("click", () => mostrarCategorias(false));
    gatoBtn.addEventListener("click", () => mostrarCategorias(true));


    // Redirigir y crear vector de datos
    const mapaEdad = {
  "Cachorro menos de un 1 año": "cachorro",
  "Joven 1-5 años": "joven",
  "Adulto 5-9 años": "adulto",
  "Abuelo + de 10 años": "abuelo",
  "indiferente": ""
};

categorias.forEach(cat => {
  cat.addEventListener("click", () => {
    const texto = cat.textContent.trim();
    const edadReal = mapaEdad[texto] || "";

    const datosSeleccion = {
      tipo: seleccionGato ? "gato" : "perro",
      edad: edadReal
    };

    localStorage.setItem("seleccion", JSON.stringify(datosSeleccion));
    window.location.href = "gatosoperros.html";
  });
});


    // --- Animación scroll para secciones infoWeb ---
    const secciones = document.querySelectorAll('.quienesSomos, .queHacemos, .comoFunciona, .nuestrasMetas, .titulo-llamado, .contd_apadriadopcion');
    secciones.forEach(sec => sec.classList.add('aparecer-scroll'));

    function mostrarSeccionesScroll() {
        secciones.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight - 250) {
                sec.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', mostrarSeccionesScroll);
    mostrarSeccionesScroll();

    // Mostrar contd_cuerpoWeb y ocultar presentacion al hacer click en Adoptá o Apadriná
    const btnAdoptar = document.querySelectorAll("#btmadoptar, #btmadoptarbottom");
    const btnApadrinar = document.querySelectorAll("#btmapadrinar, #btmapadrinarbottom");
    const presentacion = document.querySelector(".presentacion");
    const cuerpoWeb = document.querySelector(".contd_cuerpoWeb");
    const contd_apadinamiento = document.querySelector(".contd_apadrinamiento");
    const contd_adopcion = document.querySelector(".contd_adopcion");

    function mostrarCuerpoWebApadrinar() {
        if (presentacion) presentacion.style.display = "none";
        if (cuerpoWeb) cuerpoWeb.style.display = "block";
        if (contd_apadinamiento) contd_apadinamiento.style.display = "block";
        if (contd_adopcion) contd_adopcion.style.display = "none";
    }
    function mostrarCuerpoWebAdopcion() {
        if (presentacion) presentacion.style.display = "none";
        if (cuerpoWeb) cuerpoWeb.style.display = "block";
        if (contd_adopcion) contd_adopcion.style.display = "block";
        if (contd_apadinamiento) contd_apadinamiento.style.display = "none";
    }
    // Asignar el evento a todos los botones de adoptar
    btnAdoptar.forEach(btn => {
        btn.addEventListener("click", mostrarCuerpoWebAdopcion);
    });
    // Asignar el evento a todos los botones de apadrinar
    btnApadrinar.forEach(btn => {
        btn.addEventListener("click", mostrarCuerpoWebApadrinar);
    });

    // Ocultar contd_cuerpoWeb al cargar la página
    if (cuerpoWeb) cuerpoWeb.style.display = "none";
    if (contd_apadinamiento) contd_apadinamiento.style.display = "none";
    if (contd_adopcion) contd_adopcion.style.display = "none";
});




