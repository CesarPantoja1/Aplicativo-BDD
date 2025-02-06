import { putEmpleadoLaboral } from "./services/EmpleadoService.js";

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".boton.remoto").addEventListener("click", function () {
        mostrarEmpleadoRemoto();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".boton.local").addEventListener("click", function () {
        mostrarEmpleadoLocal();
    });
});

function mostrarEmpleadoRemoto() {
    // Cargar los datos de empleados al inicio
    fetch("/getEmpleadoRemoto")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("empleados_laboral");
            const searchInput = document.getElementById("searchEmpleadoLab");

            // Función para renderizar los empleados en la tabla
            function renderEmpleados(empleados) {
                tbody.innerHTML = ""; // Limpiar la tabla antes de llenarla
                empleados.forEach(empleadoLaboral => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td><input type="checkbox"></td>
                        <td>${empleadoLaboral.empleadoID}</td>
                        <td>${empleadoLaboral.tiendaID}</td>
                        <td>${empleadoLaboral.salario}</td>
                        <td>${empleadoLaboral.cargo}</td>
                        <td>${empleadoLaboral.fechaIngreso}</td>
                        <td>
                            <button class="boton accion editar" data-empleadoLaboral='${JSON.stringify(empleadoLaboral)}'>
                                <img src="/static/images/mas.png" alt="Editar"> Editar
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

                // Agregar los eventos de eliminación y edición
                agregarEventosBotones();
            }

            // Filtrar los empleados según el texto ingresado
            function filtrarEmpleados() {
                const searchTerm = searchInput.value.toLowerCase();
                const empleadosFiltrados = data.filter(empleado => {
                    return empleado.empleadoID.toString().includes(searchTerm); // Filtrar por ID de empleado
                });
                renderEmpleados(empleadosFiltrados); // Renderizar los empleados filtrados
            }

            // Evento para realizar la búsqueda mientras se escribe
            searchInput.addEventListener("input", filtrarEmpleados);

            // Llamar a renderEmpleados al cargar la página para mostrar todos los empleados inicialmente
            renderEmpleados(data);
        })
        .catch(error => {
            console.error("Error al cargar la informacion laboral de los empleados", error);
        });

    // Función para agregar eventos de los botones de eliminar y editar
    function agregarEventosBotones() {
        document.querySelectorAll(".boton.eliminar").forEach(button => {
            button.addEventListener("click", function () {
                const empleadoID = this.getAttribute("data-id");
                const tiendaID = this.getAttribute("data-tienda");
                eliminarProducto(empleadoID, tiendaID);
            });
        });

        document.querySelectorAll(".boton.editar").forEach(button => {
            button.addEventListener("click", function () {
                const empleadoLaboral = JSON.parse(this.getAttribute("data-empleadoLaboral"));
                abrirModalEdicion(empleadoLaboral);
            });
        });
    }
}

function mostrarEmpleadoLocal() {
    // Cargar los datos de empleados al inicio
    fetch("/getEmpleadoLocal")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("empleados_laboral");
            const searchInput = document.getElementById("searchEmpleadoLab");

            // Función para renderizar los empleados en la tabla
            function renderEmpleados(empleados) {
                tbody.innerHTML = ""; // Limpiar la tabla antes de llenarla
                empleados.forEach(empleadoLaboral => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td><input type="checkbox"></td>
                        <td>${empleadoLaboral.empleadoID}</td>
                        <td>${empleadoLaboral.tiendaID}</td>
                        <td>${empleadoLaboral.salario}</td>
                        <td>${empleadoLaboral.cargo}</td>
                        <td>${empleadoLaboral.fechaIngreso}</td>
                        <td>
                            <button class="boton accion editar" data-empleadoLaboral='${JSON.stringify(empleadoLaboral)}'>
                                <img src="/static/images/mas.png" alt="Editar"> Editar
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

                // Agregar los eventos de eliminación y edición
                agregarEventosBotones();
            }

            // Filtrar los empleados según el texto ingresado
            function filtrarEmpleados() {
                const searchTerm = searchInput.value.toLowerCase();
                const empleadosFiltrados = data.filter(empleado => {
                    return empleado.empleadoID.toString().includes(searchTerm); // Filtrar por ID de empleado
                });
                renderEmpleados(empleadosFiltrados); // Renderizar los empleados filtrados
            }

            // Evento para realizar la búsqueda mientras se escribe
            searchInput.addEventListener("input", filtrarEmpleados);

            // Llamar a renderEmpleados al cargar la página para mostrar todos los empleados inicialmente
            renderEmpleados(data);
        })
        .catch(error => {
            console.error("Error al cargar la informacion laboral de los empleados", error);
        });

    // Función para agregar eventos de los botones de eliminar y editar
    function agregarEventosBotones() {
        document.querySelectorAll(".boton.eliminar").forEach(button => {
            button.addEventListener("click", function () {
                const empleadoID = this.getAttribute("data-id");
                const tiendaID = this.getAttribute("data-tienda");
                eliminarProducto(empleadoID, tiendaID);
            });
        });

        document.querySelectorAll(".boton.editar").forEach(button => {
            button.addEventListener("click", function () {
                const empleadoLaboral = JSON.parse(this.getAttribute("data-empleadoLaboral"));
                abrirModalEdicion(empleadoLaboral);
            });
        });
    }

}


document.addEventListener("DOMContentLoaded", function () {
    // Cargar los datos de empleados al inicio
    fetch("/getEmpleadoLaboral")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("empleados_laboral");
            const searchInput = document.getElementById("searchEmpleadoLab");

            // Función para renderizar los empleados en la tabla
            function renderEmpleados(empleados) {
                tbody.innerHTML = ""; // Limpiar la tabla antes de llenarla
                empleados.forEach(empleadoLaboral => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td><input type="checkbox"></td>
                        <td>${empleadoLaboral.empleadoID}</td>
                        <td>${empleadoLaboral.tiendaID}</td>
                        <td>${empleadoLaboral.salario}</td>
                        <td>${empleadoLaboral.cargo}</td>
                        <td>${empleadoLaboral.fechaIngreso}</td>
                        <td>
                            <button class="boton accion editar" data-empleadoLaboral='${JSON.stringify(empleadoLaboral)}'>
                                <img src="/static/images/mas.png" alt="Editar"> Editar
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

                // Agregar los eventos de eliminación y edición
                agregarEventosBotones();
            }

            // Filtrar los empleados según el texto ingresado
            function filtrarEmpleados() {
                const searchTerm = searchInput.value.toLowerCase();
                const empleadosFiltrados = data.filter(empleado => {
                    return empleado.empleadoID.toString().includes(searchTerm); // Filtrar por ID de empleado
                });
                renderEmpleados(empleadosFiltrados); // Renderizar los empleados filtrados
            }

            // Evento para realizar la búsqueda mientras se escribe
            searchInput.addEventListener("input", filtrarEmpleados);

            // Llamar a renderEmpleados al cargar la página para mostrar todos los empleados inicialmente
            renderEmpleados(data);
        })
        .catch(error => {
            console.error("Error al cargar la informacion laboral de los empleados", error);
        });

    // Función para agregar eventos de los botones de eliminar y editar
    function agregarEventosBotones() {
        document.querySelectorAll(".boton.eliminar").forEach(button => {
            button.addEventListener("click", function () {
                const empleadoID = this.getAttribute("data-id");
                const tiendaID = this.getAttribute("data-tienda");
                eliminarProducto(empleadoID, tiendaID);
            });
        });

        document.querySelectorAll(".boton.editar").forEach(button => {
            button.addEventListener("click", function () {
                const empleadoLaboral = JSON.parse(this.getAttribute("data-empleadoLaboral"));
                abrirModalEdicion(empleadoLaboral);
            });
        });
    }

});

 // Función para eliminar un empleado
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

// Función para abrir el modal de edición
function abrirModalEdicion(empleadoLaboral) {
    const modal = document.getElementById("modal-editar-empleado-laboral");
    modal.classList.add("show");

    document.getElementById("edit-empleadoID").value = empleadoLaboral.empleadoID;
    document.getElementById("edit-tiendaID").value = empleadoLaboral.tiendaID;
    document.getElementById("edit-salario").value = empleadoLaboral.salario;
    document.getElementById("edit-cargo").value = empleadoLaboral.cargo;
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById("modal-editar-empleado-laboral").classList.remove("show");
}

    // Función para actualizar un empleado
async function actualizarEmpleadoLaboral(event) {
    event.preventDefault();
    const form = document.getElementById("form-editar-empleado-laboral");
    const formData = new FormData(form);
    const empleadoLaboral = Object.fromEntries(formData.entries());
    empleadoLaboral.salario = parseFloat(empleadoLaboral.salario);
    console.log("Empleado laboral a actualizar:", empleadoLaboral);
    try {
        const res = await putEmpleadoLaboral(empleadoLaboral);
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
document.getElementById("form-editar-empleado-laboral").addEventListener("submit", actualizarEmpleadoLaboral);
document.getElementById("cerrar-modal-empleado-laboral").addEventListener("click", cerrarModal);