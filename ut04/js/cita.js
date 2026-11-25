
// Seleccionar los campos del formulario
const fecha = document.getElementById("fecha");
const crearCuenta = document.getElementById("crear-cuenta");
const cuenta = document.getElementById("cuenta");
const clave = document.getElementById("clave");
const confirmar = document.getElementById("confirmar");
const averia = document.getElementById("averia");

// Establecer mañana como fecha mínima
const manana = new Date();
manana.setDate(manana.getDate() + 1);

fecha.min = manana.getFullYear() + "-" +
    String(manana.getMonth() + 1).padStart(2, "0") + "-" +
    String(manana.getDate()).padStart(2, "0");

// Impedir reservas los domingos
fecha.addEventListener("input", function () {
    const dia = new Date(fecha.value + "T00:00:00");

    if (dia.getDay() === 0) {
        fecha.setCustomValidity("El taller cierra los domingos.");
    } else {
        fecha.setCustomValidity("");
    }
});

// Activar la cuenta opcional
crearCuenta.addEventListener("change", function () {
    cuenta.disabled = !crearCuenta.checked;

    if (crearCuenta.checked) {
        clave.focus();
    }
});

// Validar las contraseñas
function validarClaves() {
    const patron = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/;

    if (!patron.test(clave.value)) {
        clave.setCustomValidity(
            "Mínimo 8 caracteres, letras y números."
        );
    } else {
        clave.setCustomValidity("");
    }

    if (clave.value !== confirmar.value) {
        confirmar.setCustomValidity(
            "Las contraseñas no coinciden."
        );
    } else {
        confirmar.setCustomValidity("");
    }
}

clave.addEventListener("input", validarClaves);
confirmar.addEventListener("input", validarClaves);

// Crear contador de caracteres
const contador = document.createElement("p");
contador.textContent = "0 / 500 caracteres";
averia.after(contador);

// Actualizar el contador al escribir
averia.addEventListener("input", function () {
    contador.textContent =
        averia.value.length + " / 500 caracteres";
});

// Restablecer las validaciones al limpiar
fecha.form.addEventListener("reset", function () {
    fecha.setCustomValidity("");
    clave.setCustomValidity("");
    confirmar.setCustomValidity("");
    cuenta.disabled = true;
    contador.textContent = "0 / 500 caracteres";
});
