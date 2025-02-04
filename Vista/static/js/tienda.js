import putTienda from "./services/TiendaService.js";
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".boton.accion.editar").forEach(button => {
        button.addEventListener("click", function () {
            const tienda = JSON.parse(this.getAttribute("data-tienda"));
            abrirModalEdicion(tienda);
        });
    });
});

function abrirModalEdicion(tienda) {
    const modal = document.getElementById("modal-editar-tienda");
    modal.classList.add("show");

    document.getElementById("edit-tiendaID").value = tienda.tiendaID;
    document.getElementById("edit-nombreTienda").value = tienda.nombreTienda;
    document.getElementById("edit-ubicacion").value = tienda.ubicacion;
    document.getElementById("edit-telefono").value = tienda.telefono;
}

function cerrarModal() {
    document.getElementById("modal-editar-tienda").classList.remove("show");
}

async function actualizarTienda(event) {
    event.preventDefault();
    const form = document.getElementById("form-editar-tienda");
    const formData = new FormData(form);
    const tienda = Object.fromEntries(formData.entries());

    tienda.telefono = parseInt(tienda.telefono, 10);

    console.log("Tienda a actualizar:", tienda);
    
    try {
        const res = await putTienda(tienda);

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

document.getElementById("form-editar-tienda").addEventListener("submit", actualizarTienda);
document.getElementById("cerrar-modal-editar-tienda").addEventListener("click", cerrarModal);