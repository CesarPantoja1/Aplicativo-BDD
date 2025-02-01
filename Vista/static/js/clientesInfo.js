document.addEventListener("DOMContentLoaded", function () {
    fetch("/getClienteInfo")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("clientes_info");
            tbody.innerHTML = ""; 

            data.forEach(clienteInfo => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${clienteInfo.clienteID}</td>
                    <td>${clienteInfo.nombreCliente}</td>
                    <td>${clienteInfo.telefono}</td>
                    <td>${clienteInfo.ciudad}</td>
                    <td>
                        <button class="boton accion agregar">
                            <img src="/static/images/mas.png" alt="Agregar"> Editar
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

            document.querySelectorAll(".boton.eliminar").forEach(button => {
                button.addEventListener("click", function () {
                    const clienteID = this.getAttribute("data-id");
                    eliminarClienteInfo(clienteID);
                });
            });
        })
        .catch(error => {
            console.error("Error al cargar la informacion personal del cliente:", error);
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
