
// Seleccionar la fecha de nacimiento
const nacimiento = document.getElementById("nacimiento");

// Comprobar la edad del participante
nacimiento.addEventListener("input", function () {

    nacimiento.setCustomValidity("");

    if (!nacimiento.value) return;

    const hoy = new Date();
    const fecha = new Date(nacimiento.value + "T00:00:00");

    let edad = hoy.getFullYear() - fecha.getFullYear();

    const mes = hoy.getMonth() - fecha.getMonth();

    // Comprobar si ya ha cumplido años
    if (mes < 0 || (mes === 0 &&
        hoy.getDate() < fecha.getDate())) {
        edad--;
    }

    // Validación personalizada
    if (edad < 16) {
        nacimiento.setCustomValidity(
            "Debes tener al menos 16 años para participar."
        );
    } else {
        nacimiento.setCustomValidity("");
    }
});

// Limpiar el mensaje al restablecer el formulario
nacimiento.form.addEventListener("reset", function () {
    nacimiento.setCustomValidity("");
});
