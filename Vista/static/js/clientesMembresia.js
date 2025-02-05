import {putClienteMembresia} from "./services/ClienteService.js";

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchClienteMemb");

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.trim().toLowerCase();
        const rows = document.querySelectorAll("#clientes_membresia tr");

        rows.forEach(row => {
            const clienteID = row.children[1].textContent.toLowerCase();
            if (clienteID.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });

    fetch("/getClienteMembresia")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("clientes_membresia");
            tbody.innerHTML = ""; 

            data.forEach(clienteMembresia => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${clienteMembresia.clienteID}</td>
                    <td>${clienteMembresia.tiendaID}</td>
                    <td>${clienteMembresia.tipoMembresia}</td>
                    <td>${clienteMembresia.estado}</td>
                    <td>${clienteMembresia.puntos}</td>
                    <td>
                        <button class="boton accion editar" data-clienteMembresia='${JSON.stringify(clienteMembresia)}'>
                            <img src="/static/images/mas.png" alt="Editar"> Editar
                        </button>
                    </td>
                    <td>
                        <button class="boton accion eliminar" data-id="${clienteMembresia.clienteID}" data-tienda="${clienteMembresia.tiendaID}">
                            <img src="/static/images/basura.png" alt="Eliminar"> Delete
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            document.querySelectorAll(".boton.eliminar").forEach(button => {
                button.addEventListener("click", function () {
                    const clienteID = this.getAttribute("data-id");
                    const tiendaID = this.getAttribute("data-tienda");
                    eliminarProducto(clienteID, tiendaID);
                });
            });
            document.querySelectorAll(".boton.editar").forEach(button => {
                button.addEventListener("click", function () {
                    const clienteMembresia = JSON.parse(this.getAttribute("data-clienteMembresia"));
                    abrirModalEdicion(clienteMembresia);
                });
            });
        })
        .catch(error => {
            console.error("Error al cargar las membresias de los clientes:", error);
        });
});

function eliminarProducto(clienteID, tiendaID) {
    if (confirm("¿Estás seguro de que deseas eliminar la membresia del cliente?")) {
        fetch(`/deleteClienteMembresia/${clienteID}/${tiendaID}`, {
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
            console.error("Error al eliminar la membresia del cliente:", error);
        });
    }
}
function abrirModalEdicion(clienteMembresia) {
    const modal = document.getElementById("modal-editar-cliente-membresia");
    modal.classList.add("show");

    document.getElementById("edit-clienteID").value = clienteMembresia.clienteID;
    document.getElementById("edit-tiendaID").value = clienteMembresia.tiendaID;
    document.getElementById("edit-tipoMembresia").value = clienteMembresia.tipoMembresia;
    document.getElementById("edit-estado").value = clienteMembresia.estado;
    document.getElementById("edit-puntos").value = clienteMembresia.puntos;
}

function cerrarModal() {
    document.getElementById("modal-editar-cliente-membresia").classList.remove("show");
}

async function actualizarClienteMembresia(event) {
    event.preventDefault();
    const form = document.getElementById("form-editar-cliente-membresia");
    const formData = new FormData(form);
    const clienteMembresia = Object.fromEntries(formData.entries());

    clienteMembresia.puntos = parseInt(clienteMembresia.puntos, 10);

    console.log("Cliente Membresía a actualizar:", clienteMembresia);
    
    try {
        const res = await putClienteMembresia(clienteMembresia)

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

document.getElementById("form-editar-cliente-membresia").addEventListener("submit", actualizarClienteMembresia);
document.getElementById("cerrar-modal-editar-cliente-membresia").addEventListener("click", cerrarModal);
