document.addEventListener("DOMContentLoaded", function () {
    fetch("/getEmpleadoLaboral")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("empleados_laboral");
            tbody.innerHTML = ""; 

            data.forEach(empleadoLaboral => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${empleadoLaboral.empleadoID}</td>
                    <td>${empleadoLaboral.tiendaID}</td>
                    <td>${empleadoLaboral.salario}</td>
                    <td>${empleadoLaboral.cargo}</td>
                    <td>${empleadoLaboral.fechaIngreso}</td>
                    <td>
                        <button class="boton accion agregar">
                            <img src="/static/images/mas.png" alt="Agregar"> Editar
                        </button>
                    </td>
                    <td>
                        <button class="boton accion eliminar" data-id="${empleadoLaboral.empleadoID}" data-tienda="${empleadoLaboral.tiendaID}">
                            <img src="/static/images/basura.png" alt="Eliminar"> Delete
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            document.querySelectorAll(".boton.eliminar").forEach(button => {
                button.addEventListener("click", function () {
                    const empleadoID = this.getAttribute("data-id");
                    const tiendaID = this.getAttribute("data-tienda");
                    eliminarProducto(empleadoID, tiendaID);
                });
            });
        })
        .catch(error => {
            console.error("Error al cargar la informacion laboral de los empleados", error);
        });
});

function eliminarProducto(empleadoID, tiendaID) {
    if (confirm("¿Estás seguro de que deseas eliminar la informacion laboral de los empleados?")) {
        fetch(`/deleteEmpleadoLaboral/${empleadoID}/${tiendaID}`, {
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
            console.error("Error al eliminar la informacion laboral de los empleados", error);
        });
    }
}
