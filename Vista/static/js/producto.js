document.addEventListener("DOMContentLoaded", function () {
    fetch("/getProductos")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("productos_info");
            tbody.innerHTML = ""; 

            data.forEach(producto => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${producto.productoID}</td>
                    <td>${producto.tiendaID}</td>
                    <td>${producto.proveedorID}</td>
                    <td>${producto.nombreProducto}</td>
                    <td>${producto.precioProducto.toFixed(2)}</td>
                    <td>${producto.stockProducto}</td>
                    <td>
                        <button class="boton accion agregar">
                            <img src="/static/images/mas.png" alt="Agregar"> Editar
                        </button>
                    </td>
                    <td>
                        <button class="boton accion eliminar">
                            <img src="/static/images/basura.png" alt="Eliminar"> Delete
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
});
