document.addEventListener("DOMContentLoaded", function () {
    fetch("/getEmpleadoInfo")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("empleados_info");
            tbody.innerHTML = ""; 

            data.forEach(empleadoInfo => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${empleadoInfo.empleadoID}</td>
                    <td>${empleadoInfo.nombreEmp}</td>
                    <td>${empleadoInfo.telefono}</td>
                    <td>${empleadoInfo.correo}</td>
                    <td>
                        <button class="boton accion agregar">
                            <img src="/static/images/mas.png" alt="Agregar"> Editar
                        </button>
                    </td>
                    <td>
                        <button class="boton accion eliminar" data-id="${empleadoInfo.empleadoID}">
                            <img src="/static/images/basura.png" alt="Eliminar"> Delete
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            document.querySelectorAll(".boton.eliminar").forEach(button => {
                button.addEventListener("click", function () {
                    const empleadoID = this.getAttribute("data-id");
                    eliminarempleadoInfo(empleadoID);
                });
            });
        })
        .catch(error => {
            console.error("Error al cargar la informacion personal del empleado:", error);
        });
});

function eliminarempleadoInfo(empleadoID) {
    if (confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
        fetch(`/deleteEmpleadoInfo/${empleadoID}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                location.reload(); 
            } else {
                alert("Error: " + data.error);
            }
        })
        .catch(error => {
            console.error("Error al eliminar la informacion personal del empleado:", error);
        });
    }
}
