document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".boton.agregar").addEventListener("click", function () {
        insertarCliente();
    });
});

function insertarCliente() {
    const filas = document.querySelectorAll("tbody tr");
    filas.forEach(fila => {
        const clienteID = fila.children[0].innerText.trim();
        const nombreCliente = fila.children[1].innerText.trim();
        const telefono = fila.children[2].innerText.trim();
        const ciudad = fila.children[3].innerText.trim();
        const tipoMembresia = fila.children[4].innerText.trim();
        const estado = fila.children[5].innerText.trim();
        const puntos = fila.children[6].innerText.trim();

        if (!clienteID || !nombreCliente || !telefono || !ciudad || !tipoMembresia || !estado || !puntos) {
            alert("Por favor, complete todos los campos antes de registrar el cliente.");
            return;
        }

        const clienteData = {
            clienteID: parseInt(clienteID),
            nombreCliente: nombreCliente,
            telefono: parseInt(telefono),
            ciudad: ciudad,
            tipoMembresia: tipoMembresia,
            estado: estado,
            puntos: parseInt(puntos)
        };

        fetch("/insertCliente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clienteData)
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
