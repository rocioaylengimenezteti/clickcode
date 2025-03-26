// Espera a que el contenido del DOM se haya cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function () {
    // Cargar noticias
    fetch("./data/noticias.json")
        .then(response => response.json()) // Convertir respuesta a JSON
        .then(noticias => {
            let contenedor = document.getElementById("contenedor-noticias"); // Obtener contenedor
            contenedor.innerHTML = ""; // Limpiar contenido inicial

            // Recorrer noticias y agregar al contenedor
            noticias.forEach(noticia => {
                let noticiaHTML = `
                    <div class="noticia">
                        <h3>${noticia.titulo}</h3>
                        <p>${noticia.descripcion}</p>
                        <small>${noticia.fecha}</small>
                    </div>
                `;
                contenedor.innerHTML += noticiaHTML; // Agregar noticia al contenedor
            });
        })
        .catch(error => console.error("Error cargando noticias:", error)); // Mostrar error en consola
});
