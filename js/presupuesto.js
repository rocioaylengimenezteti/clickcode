// Espera a que el contenido del DOM se haya cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona los elementos del formulario por su ID
    const form = document.getElementById("presupuestoForm"); // Formulario
    const producto = document.getElementById("producto"); // Selector de productos
    const plazo = document.getElementById("plazo"); // Selector de meses
    const extras = document.querySelectorAll(".extra");  // Lista de casillas de verificación (extras)
    const totalSpan = document.getElementById("total"); // Elemento donde se muestra el total
    const totalPresupuesto = document.getElementById("totalPresupuesto"); // Campo oculto para enviar el total
    const condiciones = document.getElementById("condiciones"); // Casilla de verificación de condiciones

    // Función para validar que el texto solo contenga letras y espacios
    function validarTexto(input, errorId, maxLength) {
        input.value = input.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
        if (input.value.length > maxLength) {
            document.getElementById(errorId).textContent = `Máximo ${maxLength} caracteres`;
        } else {
            document.getElementById(errorId).textContent = "";
        }
    }

    // Validación en tiempo real del nombre (máx. 15 caracteres)
    document.getElementById("nombre").addEventListener("input", function () {
        validarTexto(this, "errorNombre", 15);
    });

    
    // Validación en tiempo real de los apellidos (máximo 40 caracteres)
    document.getElementById("apellidos").addEventListener("input", function () {
        validarTexto(this, "errorApellidos", 40);
    });

    // Validación del teléfono (solo números y máximo 9 dígitos)
    document.getElementById("telefono").addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 9) {
            document.getElementById("errorTelefono").textContent = "Máximo 9 dígitos";
        } else {
            document.getElementById("errorTelefono").textContent = "";
        }
    });

    // Función para calcular el presupuesto total
    function calcularPresupuesto() {
        let total = parseFloat(producto.value);
        let descuento = 0;

        // Aplicar un 10% de descuento si el plazo es de 6 meses o más
        const meses = parseInt(plazo.value);
        if (meses >= 6) {
            descuento = total * 0.1; // 10% de descuento si son 6 meses o más
        }

        // Sumar extras seleccionados
        extras.forEach(extra => {
            if (extra.checked) {
                total += parseFloat(extra.value);
            }
        });
        // Restar el descuento aplicado
        total -= descuento;

        // Evitar valores negativos
        total = total < 0 ? 0 : total;

        // Mostrar el total en la página
        totalSpan.textContent = total.toFixed(2);
        totalPresupuesto.value = total.toFixed(2);
    }
    // Eventos para recalcular el presupuesto al cambiar los valores
    producto.addEventListener("change", calcularPresupuesto);
    plazo.addEventListener("input", calcularPresupuesto);
    extras.forEach(extra => {
        extra.addEventListener("change", calcularPresupuesto);
    });

    // Evento de envío del formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Verificar si se aceptaron las condiciones
        if (!condiciones.checked) {
            alert("Debes aceptar las condiciones para enviar el formulario.");
            return;
        }

        // Mensaje de confirmación con el presupuesto final
        alert("Formulario enviado con éxito. Presupuesto total: " + totalPresupuesto.value + "€");

        // Reiniciar el formulario y resetear el total mostrado
        form.reset();
        totalSpan.textContent = "0";
    });
});
