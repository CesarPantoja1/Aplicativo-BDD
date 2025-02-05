import putProduct from "./services/ProductoService.js";

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searcProducto");

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.trim().toLowerCase();
        const rows = document.querySelectorAll("#productos_info tr");

        rows.forEach(row => {
            const productoID = row.children[1].textContent.toLowerCase();
            if (productoID.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });

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
                        <button class="boton accion editar" data-producto='${JSON.stringify(producto)}'>
                            <img src="/static/images/mas.png" alt="Editar"> Editar
                        </button>
                    </td>
                    <td>
                        <button class="boton accion eliminar" data-id="${producto.productoID}" data-tienda="${producto.tiendaID}">
                            <img src="/static/images/basura.png" alt="Eliminar"> Delete
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            document.querySelectorAll(".boton.eliminar").forEach(button => {
                button.addEventListener("click", function () {
                    const productoID = this.getAttribute("data-id");
                    const tiendaID = this.getAttribute("data-tienda");
                    eliminarProducto(productoID, tiendaID);
                });
            });

            document.querySelectorAll(".boton.editar").forEach(button => {
                button.addEventListener("click", function () {
                    const producto = JSON.parse(this.getAttribute("data-producto"));
                    abrirModalEdicion(producto);
                });
            });
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
});

function eliminarProducto(productoID, tiendaID) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        fetch(`/deleteProducto/${productoID}/${tiendaID}`, {
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
            console.error("Error al eliminar el producto:", error);
        });
    }
}

function abrirModalEdicion(producto) {
    const modal = document.getElementById("modal-editar-producto");
    modal.classList.add("show");

    document.getElementById("edit-productoID").value = producto.productoID;
    document.getElementById("edit-tiendaID").value = producto.tiendaID;
    document.getElementById("edit-proveedorID").value = producto.proveedorID;
    document.getElementById("edit-nombreProducto").value = producto.nombreProducto;
    document.getElementById("edit-precioProducto").value = producto.precioProducto;
    document.getElementById("edit-stockProducto").value = producto.stockProducto;
}

function cerrarModal() {
    document.getElementById("modal-editar-producto").classList.remove("show");
}

async function actualizarProducto(event) {
    event.preventDefault();
    const form = document.getElementById("form-editar-producto");
    const formData = new FormData(form);
    const producto = Object.fromEntries(formData.entries());

    producto.precioProducto = parseFloat(producto.precioProducto);
    producto.stockProducto = parseInt(producto.stockProducto, 10);

    console.log("Producto a actualizar:", producto);
    
    try {
        const res = await putProduct(producto);

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

document.getElementById("form-editar-producto").addEventListener("submit", actualizarProducto);
document.getElementById("cerrar-modal").addEventListener("click", cerrarModal);