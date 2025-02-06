document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".boton.agregar").addEventListener("click", function () {
        insertarProveedor();
    });
});

function insertarProveedor() {
    const filas = document.querySelectorAll("tbody tr");
    filas.forEach(fila => {
        const proveedorID = fila.children[0].innerText.trim();
        const tiendaID = fila.children[1].innerText.trim();
        const nombreProveedor = fila.children[2].innerText.trim();
        const ciudad = fila.children[3].innerText.trim();
        const telefono = fila.children[4].innerText.trim();

        if (!proveedorID || !tiendaID || !nombreProveedor || !ciudad || !telefono ) {
            alert("Por favor, complete todos los campos antes de registrar el proveedor.");
            return;
        }

        const proveedorData = {
            proveedorID: parseInt(proveedorID),
            tiendaID: parseInt(tiendaID),
            nombreProveedor: nombreProveedor,
            ciudad: ciudad,
            telefono: parseFloat(telefono),
        };

        fetch("/insertProveedor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proveedorData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert("✅ " + data.message);
                location.reload();  
            } else {
                alert("❌ Error: " + data.error);
            }
        })
        .catch(error => console.error("Error al insertar proveedor:", error));
    });
}