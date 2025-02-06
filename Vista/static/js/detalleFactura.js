function fetchDetalleFacturas() {
    fetch("/api/facturas")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }

            const tbody = document.getElementById("detalleFactura_info");
            tbody.innerHTML = ""; 

            data.forEach(factura => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${factura.facturaID}</td>
                    <td>${factura.clienteID}</td>
                    <td>${factura.tiendaID}</td>
                    <td>${factura.empleadoID}</td>
                    <td>${factura.fechaFactura}</td>
                    <td>${factura.metodoPago}</td>
                    <td>${factura.total}</td>
                    <td>
                        <button class="boton accion agregar" data-factura-id="${factura.facturaID}">
                            <img src="/static/images/mas.png" alt="Agregar"> Generar factura
                        </button>
                    </td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error cargando facturas:", error));
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searcDetalle");

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.trim().toLowerCase();
        const rows = document.querySelectorAll(".tabla_detalleFacturas tbody tr");

        rows.forEach(row => {
            const detalleID = row.children[1].textContent.toLowerCase(); 
            if (detalleID.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});
