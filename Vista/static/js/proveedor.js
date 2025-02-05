import putProveedor from "./services/ProveedorService.js";

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searcProveedor");

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.trim().toLowerCase();
        const rows = document.querySelectorAll("#proveedores_info tr");

        rows.forEach(row => {
            const proveedorID = row.children[1].textContent.toLowerCase();
            if (proveedorID.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
    
    fetch("/getProveedores")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("proveedores_info");
            tbody.innerHTML = ""; 

            data.forEach(proveedor => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${proveedor.proveedorID}</td>
                    <td>${proveedor.tiendaID}</td>
                    <td>${proveedor.nombreProveedor}</td>
                    <td>${proveedor.ciudad}</td>
                    <td>${proveedor.telefono}</td>
                    <td>
                        <button class="boton accion editar" data-proveedor='${JSON.stringify(proveedor)}'>
                            <img src="/static/images/mas.png" alt="Editar"> Editar
                        </button>
                    </td>
                    <td>
                        <button class="boton accion eliminar" data-id="${proveedor.proveedorID}" data-tienda="${proveedor.tiendaID}">
                            <img src="/static/images/basura.png" alt="Eliminar"> Delete
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            document.querySelectorAll(".boton.eliminar").forEach(button => {
                button.addEventListener("click", function () {
                    const proveedorID = this.getAttribute("data-id");
                    const tiendaID = this.getAttribute("data-tienda");
                    eliminarProducto(proveedorID, tiendaID);
                });
            });
            document.querySelectorAll(".boton.editar").forEach(button => {
                button.addEventListener("click", function () {
                    const proveedor = JSON.parse(this.getAttribute("data-proveedor"));
                    abrirModalEdicion(proveedor);
                });
            });
        })
        .catch(error => {
            console.error("Error al cargar los proveedores", error);
        });
});

function eliminarProducto(proveedorID, tiendaID) {
    if (confirm("¿Estás seguro de que deseas eliminar el proveedor?")) {
        fetch(`/deleteProveedor/${proveedorID}/${tiendaID}`, {
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
            console.error("Error al eliminar el proveedor", error);
        });
    }
}

function abrirModalEdicion(proveedor) {
    const modal = document.getElementById("modal-editar-proveedor");
    modal.classList.add("show");

    document.getElementById("edit-proveedorID").value = proveedor.proveedorID;
    document.getElementById("edit-tiendaID").value = proveedor.tiendaID;
    document.getElementById("edit-nombreProveedor").value = proveedor.nombreProveedor;
    document.getElementById("edit-ciudad").value = proveedor.ciudad;
    document.getElementById("edit-telefono").value = proveedor.telefono;
}

function cerrarModal() {
    document.getElementById("modal-editar-proveedor").classList.remove("show");
}

async function actualizarProveedor(event) {
    event.preventDefault();
    const form = document.getElementById("form-editar-proveedor");
    const formData = new FormData(form);
    const proveedor = Object.fromEntries(formData.entries());

    proveedor.telefono = parseInt(proveedor.telefono, 10);

    console.log("Proveedor a actualizar:", proveedor);
    
    try {
        const res = await putProveedor(proveedor);

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

document.getElementById("form-editar-proveedor").addEventListener("submit", actualizarProveedor);
document.getElementById("cerrar-modal-editar-proveedor").addEventListener("click", cerrarModal);