/* =========================================
   FORMULARIO DE RESERVA
========================================= */

const formulario = document.getElementById("formReserva");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function (evento) {

    // Evita que la página se recargue
    evento.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = document.getElementById("servicio").value;
    const fecha = document.getElementById("fecha").value;


    // Verificar que todos los campos estén completos
    if (
        nombre === "" ||
        telefono === "" ||
        servicio === "" ||
        fecha === ""
    ) {

        mensaje.textContent = "Por favor, completa todos los campos.";

        return;
    }


    // Crear mensaje de confirmación
    mensaje.textContent =
        "¡Reserva realizada correctamente, " +
        nombre +
        "!";


    // Mostrar los datos en la consola
    console.log("Nueva reserva:");
    console.log("Nombre:", nombre);
    console.log("Teléfono:", telefono);
    console.log("Servicio:", servicio);
    console.log("Fecha:", fecha);


    // Limpiar el formulario
    formulario.reset();

});


/* =========================================
   FECHA MÍNIMA PARA LA RESERVA
========================================= */

const campoFecha = document.getElementById("fecha");

// Obtener la fecha actual
const hoy = new Date();

// Convertir la fecha al formato YYYY-MM-DD
const año = hoy.getFullYear();

const mes = String(hoy.getMonth() + 1).padStart(2, "0");

const dia = String(hoy.getDate()).padStart(2, "0");

const fechaActual = `${año}-${mes}-${dia}`;

// No permitir fechas anteriores a hoy
campoFecha.min = fechaActual;


/* =========================================
   MENÚ DE NAVEGACIÓN
========================================= */

const enlaces = document.querySelectorAll(".nav a");

enlaces.forEach(function (enlace) {

    enlace.addEventListener("click", function () {

        console.log(
            "Sección seleccionada:",
            enlace.textContent
        );

    });

});