import {putEmpleadoInfo} from "./services/EmpleadoService.js";

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
                        <button class="boton accion editar" data-empleadoInfo='${JSON.stringify(empleadoInfo)}'>
                            <img src="/static/images/mas.png" alt="Editar"> Editar
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
            document.querySelectorAll(".boton.editar").forEach(button => {
                button.addEventListener("click", function () {
                    const empleadoInfo = JSON.parse(this.getAttribute("data-empleadoInfo"));
                    abrirModalEdicion(empleadoInfo);
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

function abrirModalEdicion(empleado) {
    const modal = document.getElementById("modal-editar-empleadoInfo");
    modal.classList.add("show");

    document.getElementById("edit-empleadoID").value = empleado.empleadoID;
    document.getElementById("edit-nombreEmp").value = empleado.nombreEmp;
    document.getElementById("edit-telefono").value = empleado.telefono;
    document.getElementById("edit-correo").value = empleado.correo;
}

function cerrarModal() {
    document.getElementById("modal-editar-empleadoInfo").classList.remove("show");
}

async function actualizarEmpleadoInfo(event) {
    event.preventDefault();
    const form = document.getElementById("form-editar-empleadoInfo");
    const formData = new FormData(form);
    const empleado = Object.fromEntries(formData.entries());

    empleado.telefono = parseInt(empleado.telefono, 10);

    console.log("Informacion Empleado a actualizar:", empleado);
    
    try {
        const res = await putEmpleadoInfo(empleado);

        if (res.message) {
            alert(res.message);
            cerrarModal();
            location.reload();
        } else {
            alert("Error: " + res.error);
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("form-editar-empleadoInfo").addEventListener("submit", actualizarEmpleadoInfo);
document.getElementById("cerrar-modal-editar-empleadoInfo").addEventListener("click", cerrarModal);
