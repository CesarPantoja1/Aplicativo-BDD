document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".boton.remoto").addEventListener("click", function () {
        mostrarDetalleFacturaRemoto();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".boton.local").addEventListener("click", function () {
        mostrarDetalleFacturaLocal();
    });
});

function mostrarDetalleFacturaRemoto() {
    fetch("/api/detallefacturasRemoto")
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("Error:", data.error);
            return;
        }

        const tbody = document.getElementById("detalleFactura_info");
        tbody.innerHTML = ""; 

        data.forEach(detalleFactura => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${detalleFactura.numDetalle}</td>
                <td>${detalleFactura.tiendaID}</td>
                <td>${detalleFactura.facturaID}</td>
                <td>${detalleFactura.productoID}</td>
                <td>${detalleFactura.cantidad}</td>
                <td>${detalleFactura.precio}</td>
                <td>
                    <button class="boton accion agregar" data-factura-id="${detalleFactura.numDetalle}">
                        <img src="/static/images/mas.png" alt="Agregar"> Generar factura
                    </button>
                </td>
            `;

            tbody.appendChild(row);
        });
    })
    .catch(error => console.error("Error cargando facturas:", error));
}

function mostrarDetalleFacturaLocal() {
    fetch("/api/detallefacturasLocal")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }

            const tbody = document.getElementById("detalleFactura_info");
            tbody.innerHTML = ""; 

            data.forEach(detalleFactura => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${detalleFactura.numDetalle}</td>
                    <td>${detalleFactura.tiendaID}</td>
                    <td>${detalleFactura.facturaID}</td>
                    <td>${detalleFactura.productoID}</td>
                    <td>${detalleFactura.cantidad}</td>
                    <td>${detalleFactura.precio}</td>
                    <td>
                        <button class="boton accion agregar" data-factura-id="${detalleFactura.numDetalle}">
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
    fetch("/api/detallefacturas")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }

            const tbody = document.getElementById("detalleFactura_info");
            tbody.innerHTML = ""; 

            data.forEach(detalleFactura => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${detalleFactura.numDetalle}</td>
                    <td>${detalleFactura.tiendaID}</td>
                    <td>${detalleFactura.facturaID}</td>
                    <td>${detalleFactura.productoID}</td>
                    <td>${detalleFactura.cantidad}</td>
                    <td>${detalleFactura.precio}</td>
                    <td>
                        <button class="boton accion agregar" data-factura-id="${detalleFactura.numDetalle}">
                            <img src="/static/images/mas.png" alt="Agregar"> Generar factura
                        </button>
                    </td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error cargando facturas:", error));

});


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
