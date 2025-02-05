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
