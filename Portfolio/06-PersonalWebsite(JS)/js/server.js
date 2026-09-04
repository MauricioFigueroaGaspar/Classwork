document.addEventListener("DOMContentLoaded", function () {

    // Buscamos el formulario y la tabla dentro de la sección "schedule"
    const form = document.querySelector("#schedule form");
    const table = document.querySelector("#schedule table");

    form.addEventListener("submit", function (event) {
        // Para que no se recargue la página
        event.preventDefault();

        // Recibimos los datos
        const date = document.getElementById("date").value;
        const start = document.getElementById("start").value;
        const end = document.getElementById("end").value;
        const activity = document.getElementById("activity").value;
        const place = document.getElementById("place").value;
        const notes = document.getElementById("notes").value;
        const flag = document.getElementById("flag").value;
        const isBusy = document.getElementById("busy").checked;

        // Para imprimir bien el tipo seleccionado
        const typeSelect = document.getElementById("type");
        const type = typeSelect.options[typeSelect.selectedIndex].text;

        // Para que el estatus salga bien
        let status;
        if (isBusy) status = '<span class="icon-busy">🔴 Busy</span>';
        else status = '<span class="icon-free">🟢 Free</span>';

        // Nueva fila con datos
        const newRow = document.createElement("tr");
        newRow.innerHTML =
        "<td>" + date + "</td>" +
        "<td>" + start + "</td>" +
        "<td>" + end + "</td>" +
        "<td>" + activity + "</td>" +
        "<td>" + place + "</td>" +
        "<td>" + type + "</td>" +
        "<td>" + notes + "</td>" +
        "<td>" + status + "</td>";

        // Color del flag
        newRow.firstElementChild.style.borderLeft = "6px solid " + flag;

        // Agregramos la fila abajo
        table.appendChild(newRow);

        // Reseteamos el formulario
        form.reset();
    });

});