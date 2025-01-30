document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".boton.agregar").addEventListener("click", function () {
        insertarEmpleado();
    });
});

function insertarEmpleado() {
    const filas = document.querySelectorAll("tbody tr");
    filas.forEach(fila => {
        const empleadoID = fila.children[0].innerText.trim();
        const tiendaID = fila.children[1].innerText.trim();
        const nombreEmp = fila.children[2].innerText.trim();
        const telefono = fila.children[3].innerText.trim();
        const correo = fila.children[4].innerText.trim();
        const salario = fila.children[5].innerText.trim();
        const cargo = fila.children[6].innerText.trim();
        const fechaIngreso = fila.children[7].innerText.trim();

        if (!empleadoID || !tiendaID || !nombreEmp || !telefono || !correo || !salario || !cargo || !fechaIngreso) {
            alert("Por favor, complete todos los campos antes de registrar el cliente.");
            return;
        }

        const empleadoData = {
            empleadoID: parseInt(empleadoID),
            tiendaID: parseInt(tiendaID),
            nombreEmp: nombreEmp,
            telefono: parseInt(telefono),
            correo: correo,
            salario: parseInt(salario),
            cargo: cargo,
            fechaIngreso: fechaIngreso ? new Date(fechaIngreso).toISOString().split('T')[0] : null
        };

        fetch("/insertEmpleado", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(empleadoData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert("✅ " + data.message);
                location.reload();  
            } else {
                alert("❌ Error: " + data.error);
            }
        })
        .catch(error => console.error("Error al insertar empleado:", error));
    });
}
