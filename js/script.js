/* =========================================
   RESERVA ESPINOLA BARBER SHOP
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formReserva");

    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const servicio = document.getElementById("servicio");

    const dia = document.getElementById("dia");
    const mes = document.getElementById("mes");
    const anio = document.getElementById("anio");

    const hora = document.getElementById("hora");

    const avisoFecha = document.getElementById("avisoFecha");
    const mensaje = document.getElementById("mensaje");


    /* =========================================
       MESES
    ========================================== */

    const nombresMeses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];


    /* =========================================
       AÑOS 2026 - 2030
    ========================================== */

    const añoActual = new Date().getFullYear();

    const primerAño = Math.max(añoActual, 2026);

    for (let año = primerAño; año <= 2030; año++) {

        const opcion = document.createElement("option");

        opcion.value = año;
        opcion.textContent = año;

        anio.appendChild(opcion);
    }


    /* =========================================
       DÍAS 1 - 31
    ========================================== */

    for (let numero = 1; numero <= 31; numero++) {

        const opcion = document.createElement("option");

        opcion.value = numero;

        opcion.textContent = numero;

        dia.appendChild(opcion);
    }


    /* =========================================
       HORARIOS
    ========================================== */

    const horarios = [

        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",

        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00"

    ];


    /* =========================================
       NOMBRE DEL DÍA
    ========================================== */

    const nombresDias = [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado"
    ];


    /* =========================================
       CREAR FECHA
    ========================================== */

    function obtenerFecha() {

        if (
            dia.value === "" ||
            mes.value === "" ||
            anio.value === ""
        ) {
            return null;
        }

        const numeroDia = Number(dia.value);
        const numeroMes = Number(mes.value);
        const numeroAño = Number(anio.value);

        const fecha = new Date(
            numeroAño,
            numeroMes,
            numeroDia
        );

        /*
         * Verificamos que la fecha realmente exista.
         * Por ejemplo:
         * 31 de febrero NO es válido.
         */

        if (
            fecha.getFullYear() !== numeroAño ||
            fecha.getMonth() !== numeroMes ||
            fecha.getDate() !== numeroDia
        ) {
            return null;
        }

        return fecha;
    }


    /* =========================================
       FECHA BONITA
    ========================================== */

    function mostrarFechaBonita(fecha) {

        if (!fecha) {
            return "";
        }

        const diaTexto = fecha.getDate();

        const mesTexto =
            nombresMeses[fecha.getMonth()];

        const añoTexto =
            fecha.getFullYear();

        const diaSemana =
            nombresDias[fecha.getDay()];

        return (
            diaSemana.charAt(0).toUpperCase() +
            diaSemana.slice(1) +
            " " +
            diaTexto +
            " de " +
            mesTexto +
            " de " +
            añoTexto
        );
    }


    /* =========================================
       CARGAR HORARIOS
    ========================================== */

    function cargarHorarios() {

        hora.innerHTML = "";

        const opcionInicial =
            document.createElement("option");

        opcionInicial.value = "";

        opcionInicial.textContent =
            "Selecciona un horario";

        hora.appendChild(opcionInicial);


        horarios.forEach(function (horario) {

            const opcion =
                document.createElement("option");

            opcion.value = horario;

            opcion.textContent = horario;

            hora.appendChild(opcion);

        });

        hora.disabled = false;
    }


    /* =========================================
       ACTUALIZAR FECHA
    ========================================== */

    function actualizarFecha() {

        const fechaSeleccionada =
            obtenerFecha();


        /* =====================================
           SI TODAVÍA NO ESTÁ COMPLETA
        ====================================== */

        if (
            dia.value === "" ||
            mes.value === "" ||
            anio.value === ""
        ) {

            avisoFecha.textContent =
                "Selecciona el día, mes y año de tu visita.";

            avisoFecha.className =
                "aviso-fecha";

            hora.innerHTML =
                '<option value="">Selecciona primero una fecha</option>';

            hora.disabled = true;

            return;
        }


        /* =====================================
           FECHA INVÁLIDA
        ====================================== */

        if (!fechaSeleccionada) {

            avisoFecha.textContent =
                "La fecha seleccionada no es válida.";

            avisoFecha.className =
                "aviso-fecha fecha-error";

            hora.innerHTML =
                '<option value="">Selecciona una fecha válida</option>';

            hora.disabled = true;

            return;
        }


        /* =====================================
           DOMINGO
        ====================================== */

        if (fechaSeleccionada.getDay() === 0) {

            avisoFecha.textContent =
                "Los domingos estamos cerrados. Elige otro día.";

            avisoFecha.className =
                "aviso-fecha fecha-error";

            hora.innerHTML =
                '<option value="">Domingo cerrado</option>';

            hora.disabled = true;

            return;
        }


        /* =====================================
           FECHA MÍNIMA
        ====================================== */

        const hoy = new Date();

        hoy.setHours(0, 0, 0, 0);


        if (fechaSeleccionada < hoy) {

            avisoFecha.textContent =
                "No puedes seleccionar una fecha pasada.";

            avisoFecha.className =
                "aviso-fecha fecha-error";

            hora.innerHTML =
                '<option value="">Fecha no disponible</option>';

            hora.disabled = true;

            return;
        }


        /* =====================================
           TODO CORRECTO
        ====================================== */

        avisoFecha.textContent =
            "✓ " +
            mostrarFechaBonita(fechaSeleccionada);

        avisoFecha.className =
            "aviso-fecha fecha-ok";


        cargarHorarios();
    }


    /* =========================================
       CAMBIOS DE FECHA
    ========================================== */

    dia.addEventListener(
        "change",
        actualizarFecha
    );

    mes.addEventListener(
        "change",
        actualizarFecha
    );

    anio.addEventListener(
        "change",
        actualizarFecha
    );


    /* =========================================
       BOTONES "RESERVAR ESTE SERVICIO"
    ========================================== */

    const botonesServicio =
        document.querySelectorAll(".btn-servicio");


    botonesServicio.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const servicioElegido =
                boton.getAttribute("data-servicio");

            servicio.value =
                servicioElegido;


            const seccionReserva =
                document.getElementById("reserva");

            seccionReserva.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       ENVIAR RESERVA
    ========================================== */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =====================================
               VALIDAR NOMBRE
            ====================================== */

            const nombreCliente =
                nombre.value.trim();

            if (!nombreCliente) {

                mensaje.textContent =
                    "Por favor escribe tu nombre.";

                nombre.focus();

                return;
            }


            /* =====================================
               VALIDAR TELÉFONO
            ====================================== */

            const telefonoCliente =
                telefono.value.trim();

            if (!telefonoCliente) {

                mensaje.textContent =
                    "Por favor escribe tu número de teléfono.";

                telefono.focus();

                return;
            }


            /* =====================================
               VALIDAR SERVICIO
            ====================================== */

            if (!servicio.value) {

                mensaje.textContent =
                    "Por favor selecciona un servicio.";

                servicio.focus();

                return;
            }


            /* =====================================
               VALIDAR FECHA
            ====================================== */

            const fechaElegida =
                obtenerFecha();


            if (!fechaElegida) {

                mensaje.textContent =
                    "Por favor selecciona una fecha válida.";

                return;
            }


            /* =====================================
               DOMINGO
            ====================================== */

            if (fechaElegida.getDay() === 0) {

                mensaje.textContent =
                    "Los domingos estamos cerrados.";

                return;
            }


            /* =====================================
               FECHA PASADA
            ====================================== */

            const hoy = new Date();

            hoy.setHours(0, 0, 0, 0);


            if (fechaElegida < hoy) {

                mensaje.textContent =
                    "No puedes reservar una fecha pasada.";

                return;
            }


            /* =====================================
               VALIDAR HORA
            ====================================== */

            if (!hora.value) {

                mensaje.textContent =
                    "Por favor selecciona un horario.";

                hora.focus();

                return;
            }


            /* =====================================
               DATOS FINALES
            ====================================== */

            const servicioElegido =
                servicio.value;

            const fechaTexto =
                mostrarFechaBonita(fechaElegida);

            const horaElegida =
                hora.value;


            /* =====================================
               MENSAJE WHATSAPP
            ====================================== */

            const texto =

                "Hola, Espinola Barber Shop.%0A%0A" +

                "Quiero reservar una cita.%0A%0A" +

                "👤 Nombre: " +
                encodeURIComponent(nombreCliente) +
                "%0A" +

                "📱 Teléfono: " +
                encodeURIComponent(telefonoCliente) +
                "%0A" +

                "💈 Servicio: " +
                encodeURIComponent(servicioElegido) +
                "%0A" +

                "📅 Fecha: " +
                encodeURIComponent(fechaTexto) +
                "%0A" +

                "🕐 Hora: " +
                encodeURIComponent(horaElegida) +
                "%0A%0A" +

                "Muchas gracias.";


            /* =====================================
               NÚMERO WHATSAPP
            ====================================== */

            const numeroWhatsApp =
                "595974853370";


            /* =====================================
               URL WHATSAPP
            ====================================== */

            const url =
                "https://wa.me/" +
                numeroWhatsApp +
                "?text=" +
                texto;


            /* =====================================
               ABRIR WHATSAPP
            ====================================== */

            window.open(
                url,
                "_blank"
            );


            /* =====================================
               MENSAJE
            ====================================== */

            mensaje.textContent =
                "✓ Abriendo WhatsApp para confirmar tu reserva...";

        }
    );

});