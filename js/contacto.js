// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function () {
    // Coordenadas de Catarroja, Valencia
    const ubicacionEmpresa = [39.4022, -0.4005];

    // Crear el mapa con Leaflet
    let map = L.map("map").setView(ubicacionEmpresa, 15);

    // Agregar capa de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // Agregar marcador en la ubicación de la empresa
    L.marker(ubicacionEmpresa).addTo(map)
        .bindPopup("Mi Empresa - Catarroja, Valencia")
        .openPopup();

    // Solucionar problema de renderizado del mapa
    setTimeout(() => {
        map.invalidateSize();
    }, 500);
});

// Función para calcular la ruta hasta la empresa
function calcularRuta() {
    let direccion = document.getElementById("direccion").value;
    
    if (!direccion) {
        // Mostrar mensaje de error si no se ha introducido la dirección
        alert("Por favor, introduce tu dirección.");
        return;
    }

    // Abrir en Google Maps con la ruta
    let url = `https://www.google.com/maps/dir/${encodeURIComponent(direccion)}/Catarroja,Valencia`;
    window.open(url, "_blank");
}
