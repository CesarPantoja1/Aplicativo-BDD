document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".boton.agregar").addEventListener("click", function () {
        insertarProducto();
    });
});

function insertarProducto() {
    const filas = document.querySelectorAll("tbody tr");
    filas.forEach(fila => {
        const productoID = fila.children[0].innerText.trim();
        const tiendaID = fila.children[1].innerText.trim();
        const proveedorID = fila.children[2].innerText.trim();
        const nombreProducto = fila.children[3].innerText.trim();
        const precioProducto = fila.children[4].innerText.trim();
        const stockProducto = fila.children[5].innerText.trim();

        if (!productoID || !tiendaID || !proveedorID || !nombreProducto || !precioProducto || !stockProducto) {
            alert("Por favor, complete todos los campos antes de registrar el producto.");
            return;
        }

        const productoData = {
            productoID: parseInt(productoID),
            tiendaID: parseInt(tiendaID),
            proveedorID: parseInt(proveedorID),
            nombreProducto: nombreProducto,
            precioProducto: parseFloat(precioProducto),
            stockProducto: parseInt(stockProducto),
        };

        fetch("/insertProducto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productoData)
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
        .catch(error => console.error("Error al insertar cliente:", error));
    });
}