import { putClienteInfo } from "./services/ClienteService.js";

document.addEventListener("DOMContentLoaded", function () {

    // Función para cargar clientes con el filtro
    function cargarClientes(filtroID = "") {
        fetch("/getClienteInfo")
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById("clientes_info");
                tbody.innerHTML = ""; 

                data.forEach(clienteInfo => {
                    if (filtroID && !clienteInfo.clienteID.toString().includes(filtroID)) return; // Filtra por ID

                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td><input type="checkbox"></td>
                        <td>${clienteInfo.clienteID}</td>
                        <td>${clienteInfo.nombreCliente}</td>
                        <td>${clienteInfo.telefono}</td>
                        <td>${clienteInfo.ciudad}</td>
                        <td>
                            <button class="boton accion editar" data-clienteInfo='${JSON.stringify(clienteInfo)}'>
                                <img src="/static/images/mas.png" alt="Editar"> Editar
                            </button>
                        </td>
                        <td>
                            <button class="boton accion eliminar" data-id="${clienteInfo.clienteID}">
                                <img src="/static/images/basura.png" alt="Eliminar"> Delete
                            </button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });

                // Event listeners para los botones de editar y eliminar
                document.querySelectorAll(".boton.eliminar").forEach(button => {
                    button.addEventListener("click", function () {
                        const clienteID = this.getAttribute("data-id");
                        eliminarClienteInfo(clienteID);
                    });
                });

                document.querySelectorAll(".boton.editar").forEach(button => {
                    button.addEventListener("click", function () {
                        const clienteInfo = JSON.parse(this.getAttribute("data-clienteInfo"));
                        abrirModalEdicion(clienteInfo);
                    });
                });
            })
            .catch(error => {
                console.error("Error al cargar la información personal del cliente:", error);
            });
    }

    

    cargarClientes(); // Cargar clientes por defecto al inicio
    const searchInput = document.getElementById("searchCliente");

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.trim().toLowerCase();
        const rows = document.querySelectorAll("#clientes_info tr");

        rows.forEach(row => {
            const clienteID = row.children[1].textContent.toLowerCase();
            if (clienteID.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
    
});

function eliminarClienteInfo(clienteID) {
    if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
        fetch(`/deleteClienteInfo/${clienteID}`, {
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
            console.error("Error al eliminar la informacion personal del cliente:", error);
        });
    }
}

function abrirModalEdicion(clienteInfo) {
    const modal = document.getElementById("modal-editar-cliente-info");
    modal.classList.add("show");

    document.getElementById("edit-clienteID").value = clienteInfo.clienteID;
    document.getElementById("edit-nombreCliente").value = clienteInfo.nombreCliente;
    document.getElementById("edit-telefono").value = clienteInfo.telefono;
    document.getElementById("edit-ciudad").value = clienteInfo.ciudad;
}

function cerrarModal() {
    document.getElementById("modal-editar-cliente-info").classList.remove("show");
}

async function actualizarClienteInfo(event) {
    event.preventDefault();
    const form = document.getElementById("form-editar-cliente-info");
    const formData = new FormData(form);
    const clienteInfo = Object.fromEntries(formData.entries());

    clienteInfo.telefono = parseInt(clienteInfo.telefono, 10);

    console.log("Cliente Info a actualizar:", clienteInfo);
    
    try {
        const res = await putClienteInfo(clienteInfo)

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

document.getElementById("form-editar-cliente-info").addEventListener("submit", actualizarClienteInfo);
document.getElementById("cerrar-modal-editar-cliente-info").addEventListener("click", cerrarModal);
