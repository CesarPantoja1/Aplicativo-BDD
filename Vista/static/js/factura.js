const cerrarModal = document.getElementById('cerrar');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".boton.remoto").addEventListener("click", function () {
        mostrarFacturaRemoto();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".boton.local").addEventListener("click", function () {
        mostrarFacturaLocal();
    });
});


function mostrarFacturaRemoto() {
    fetch("/api/facturasRemoto")
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("Error:", data.error);
            return;
        }

        const tbody = document.querySelector(".tabla_facturas tbody");
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


function mostrarFacturaLocal() {
    fetch("/api/facturasLocal")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }

            const tbody = document.querySelector(".tabla_facturas tbody");
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


document.addEventListener("click", function (event) {
    if (event.target.closest(".agregar")) {
        abrirFactura(event.target.closest("button").dataset.facturaId);
    }
});

cerrarModal.addEventListener('click', () => {
    modal.classList.remove('open');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    modal.classList.remove('open');
    overlay.classList.remove('active');
});

document.addEventListener("DOMContentLoaded", function () {
    fetchFacturas();
});

function fetchFacturas() {
    fetch("/api/facturas")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }

            const tbody = document.querySelector(".tabla_facturas tbody");
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

function abrirFactura(facturaID) {
    console.log(`Solicitud de apertura de factura con ID: ${facturaID}`);
    fetch(`/api/factura/${facturaID}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }

            console.log("Datos extraídos de la factura:", data); // Log para ver la información extraída

            console.log("Factura:");
            console.log(`ID: ${data.factura.facturaID}`);
            console.log(`Fecha: ${data.factura.fechaFactura}`);
            console.log(`Método de Pago: ${data.factura.metodoPago}`);
            console.log(`Total: ${data.factura.total}`);

            console.log("Cliente:");
            console.log(`Nombre: ${data.cliente.nombreCliente}`);
            console.log(`Teléfono: ${data.cliente.telefono}`);
            console.log(`Tienda: ${data.factura.tiendaID == 1 ? "Quito" : "Cumbayá"}`);

            console.log("Detalles de productos:");
            data.detalles.forEach(detalle => {
                console.log(`Producto: ${detalle.nombreProducto}`);
                console.log(`Cantidad: ${detalle.cantidad}`);
                console.log(`Precio: $${detalle.precio.toFixed(2)}`);
                console.log(`Subtotal: $${(detalle.cantidad * detalle.precio).toFixed(2)}`);
            });

            console.log("Empleado:");
            console.log(`Nombre: ${data.empleado.nombreEmp}`);
            console.log(`Teléfono: ${data.empleado.telefono}`);



            document.querySelector(".detalles p:nth-child(1) strong").textContent = `N°${data.factura.facturaID}`;
            document.querySelector(".detalles p:nth-child(2) strong").textContent = data.factura.fechaFactura;

            const clienteInfo = document.querySelector(".cliente_info");
            clienteInfo.innerHTML = `
                <h2>INFORMACIÓN DEL CLIENTE</h2>
                <p><strong>Nombre:</strong> ${data.cliente.nombreCliente}</p>
                <p><strong>Número:</strong> ${data.cliente.telefono}</p>
                <p><strong>Tienda:</strong> ${data.factura.tiendaID == 1 ? "Quito" : "Cumbayá"}</p>
            `;

            const articulosTbody = document.querySelector(".articulos tbody");
            articulosTbody.innerHTML = ""; 

            data.detalles.forEach(detalle => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${detalle.nombreProducto}</td> <!-- Mostrar el nombre del producto -->
                    <td>${detalle.cantidad}</td>
                    <td>$${detalle.precio.toFixed(2)}</td>
                    <td>$${(detalle.cantidad * detalle.precio).toFixed(2)}</td>
                `;
                articulosTbody.appendChild(row);
            });

            document.querySelector(".total p").textContent = `$${data.factura.total.toFixed(2)}`;

            const pagoInfo = document.querySelector(".pago");
            pagoInfo.innerHTML = `
                <h2>INFORMACIÓN DE PAGO</h2>
                <p><strong>Tipo:</strong> ${data.factura.metodoPago}</p>
                <p><strong>Nombre del empleado:</strong> ${data.empleado.nombreEmp}</p>
                <p><strong>Número de teléfono:</strong> ${data.empleado.telefono}</p>
            `;

            modal.classList.add('open');
            overlay.classList.add('active');
        })
        .catch(error => console.error("Error al cargar los detalles de la factura:", error));
}


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searcFactura");

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.trim().toLowerCase();
        const rows = document.querySelectorAll(".tabla_facturas tbody tr");

        rows.forEach(row => {
            const facturaID = row.children[1].textContent.toLowerCase();
            if (facturaID.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});
