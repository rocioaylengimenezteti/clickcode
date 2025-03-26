// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle'); // Menú hamburguesa
    const navMenu = document.querySelector('.navbar ul'); // Menú de navegación
    const navLinks = document.querySelectorAll('.navbar ul li a'); // Enlaces del menú de navegación

    // Agrega un evento de clic al botón del menú hamburguesa para mostrar u ocultar el menú
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // Muestra u oculta el menú
        menuToggle.classList.toggle('open'); // Cambia el ícono del botón del menú
    });

    // Detectar la página actual y marcarla como activa
    navLinks.forEach(link => {
        // Si el enlace es igual a la URL actual, agrega la clase 'active'
        if (link.href === window.location.href) {
            link.classList.add('active');
        } else {
        // Si no, elimina la clase "active" para quitar el resaltado
            link.classList.remove('active');
        }
    });
});

