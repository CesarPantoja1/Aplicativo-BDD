document.addEventListener("DOMContentLoaded", function () {
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
                        <button class="boton accion agregar">
                            <img src="/static/images/mas.png" alt="Agregar"> Editar
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
