document.addEventListener("DOMContentLoaded", function () {
    cargarProductos();
    cargarOpciones("/api/clientes", "clientes_tienda");
    cargarOpciones("/api/empleados", "empleados_tienda");
    cargarOpciones("/api/tiendas", "tiendas");

    obtenerNumeroFactura();
    asignarFechaActual();
    cargarProductos();

    document.querySelector('input[list="tiendas"]').addEventListener("change", function () {
        let tiendaSeleccionada = this.value.trim();
        console.log("Tienda seleccionada:", tiendaSeleccionada);
        if (tiendaSeleccionada) {
            cargarOpciones(`/api/clientes/${tiendaSeleccionada}`, "clientes_tienda");
            cargarOpciones(`/api/empleados/${tiendaSeleccionada}`, "empleados_tienda");
            cargarOpciones(`/api/productos/${tiendaSeleccionada}`, "articulos");
            
        }

    });

    document.querySelector("input[list='articulos']").addEventListener("change", function () {
        obtenerPrecioProducto(this.value);
    });

    document.querySelector('input[list="clientes_tienda"]').addEventListener("change", function () {
        obtenerTelefono("/api/cliente/", this.value, "cliente_telefono");
    });

    document.querySelector('input[list="empleados_tienda"]').addEventListener("change", function () {
        obtenerTelefono("/api/empleado/", this.value, "empleado_telefono");
    });

    document.querySelector(".cantidad").addEventListener("input", function () {
        actualizarSubtotal(this);
    });

    document.getElementById("agregar-producto").addEventListener("click", function () {
        agregarNuevaFila();
    });

    document.querySelector(".articulos tbody").addEventListener("change", function (event) {
        if (event.target.classList.contains("articulo")) {
            obtenerPrecioProducto(event.target);
        }
    });

    document.querySelector(".articulos tbody").addEventListener("input", function (event) {
        if (event.target.classList.contains("cantidad")) {
            actualizarSubtotal(event.target);
        }
    });

    
});

function cargarOpciones(endpoint, datalistID) {
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            let datalist = document.getElementById(datalistID);
            datalist.innerHTML = "";  // Limpiar las opciones actuales
            data.forEach(item => {
                let option = document.createElement("option");
                option.value = item.nombre.trim();
                datalist.appendChild(option);
            });
        })
        .catch(error => console.error(`Error al cargar ${datalistID}:`, error));
}

function obtenerTelefono(endpoint, nombre, idTelefono) {
    if (!nombre.trim()) return; 

    fetch(endpoint + encodeURIComponent(nombre))
        .then(response => response.json())
        .then(data => {
            let telefonoElemento = document.getElementById(idTelefono);
            if (data.telefono) {
                telefonoElemento.textContent = data.telefono; 
            } else {
                telefonoElemento.textContent = "No disponible"; 
            }
        })
        .catch(error => console.error(`Error al obtener teléfono para ${nombre}:`, error));
}


function obtenerNumeroFactura() {
    fetch("/api/proxima_factura")
        .then(response => response.json())
        .then(data => {
            if (data.numero_factura) {
                document.getElementById("numero_factura").textContent = data.numero_factura;
            }
        })
        .catch(error => console.error("Error al obtener número de factura:", error));
}

function asignarFechaActual() {
    const hoy = new Date();
    const fechaFormateada = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
    document.getElementById("fecha_factura").textContent = fechaFormateada;
}

function cargarProductos() {
    fetch("/api/productos_tienda")
        .then(response => response.json())
        .then(data => {
            let datalist = document.getElementById("articulos");
            datalist.innerHTML = ""; 

            if (data.error) {
                console.error("Error al cargar productos:", data.error);
                return;
            }

            data.forEach(item => {
                let option = document.createElement("option");
                option.value = item.nombre.trim(); 
                datalist.appendChild(option);
            });

            console.log("Productos cargados:", data.length);
        })
        .catch(error => console.error("Error al obtener productos:", error));
}

function obtenerPrecioProducto(inputProducto) {
    let nombreProducto = inputProducto.value.trim();
    if (!nombreProducto) return; 

    fetch("/api/producto_precio/" + encodeURIComponent(nombreProducto))
        .then(response => response.json())
        .then(data => {
            let fila = inputProducto.closest("tr");

            if (data.precio) {
                fila.querySelector(".precio").textContent = `$${data.precio.toFixed(2)}`;
                actualizarSubtotal(fila.querySelector(".cantidad")); 
            } else {
                fila.querySelector(".precio").textContent = "$0.00";
                fila.querySelector(".subtotal").textContent = "$0.00";
            }
        })
        .catch(error => console.error("Error al obtener precio del producto:", error));
}

function actualizarSubtotal(inputCantidad) {
    let fila = inputCantidad.closest("tr"); 
    let cantidad = parseInt(inputCantidad.value) || 1; 
    let precio = parseFloat(fila.querySelector(".precio").textContent.replace("$", "")) || 0; 
    let subtotal = cantidad * precio; 

    fila.querySelector(".subtotal").textContent = `$${subtotal.toFixed(2)}`;
    actualizarTotal(); 
}

function actualizarTotal() {
    let total = 0;
    document.querySelectorAll(".subtotal").forEach(subtotal => {
        total += parseFloat(subtotal.textContent.replace("$", "")) || 0;
    });

    document.querySelector(".total p").textContent = `$${total.toFixed(2)}`; 
}

function agregarNuevaFila() {
    let tabla = document.querySelector(".articulos tbody");

    // Crear nueva fila
    let nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
        <td>
            <input list="articulos" name="articulo" class="articulo" placeholder="Selecciona un producto...">
        </td>
        <td>
            <input type="number" class="cantidad" value="1" min="1" step="1">
        </td>
        <td class="precio">$0.00</td>
        <td class="subtotal">$0.00</td>
    `;

    tabla.appendChild(nuevaFila);
}