document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('graficaGanancias').getContext('2d');



    // Datos del gráfico
    const datosGanancias = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
            label: 'Ganancias ($)',
            data: [10, 25, 15, 30, 8, 20],
            backgroundColor: [
                'rgba(120, 100, 255, 0.6)',
                'rgba(80, 200, 180, 0.6)',
                'rgba(0, 0, 0, 0.8)',
                'rgba(100, 150, 255, 0.7)',
                'rgba(150, 180, 255, 0.5)',
                'rgba(120, 220, 150, 0.6)'
            ],
            borderRadius: 30,
            borderWidth: 0,
            barPercentage: 0.6,
        }]
    };

    // Configuración del gráfico
    const config = {
        type: 'bar',
        data: datosGanancias,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: (context) => `Ganancias: ${context.raw}K`
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    },
                    barPercentage: 0.1,
                    categoryPercentage: 0.8
                },
                y: {
                    grid: {
                        drawBorder: false,
                        color: 'rgba(200, 200, 200, 0.3)'
                    },
                    ticks: {
                        stepSize: 10,
                        callback: (value) => `${value}K`
                    },
                    beginAtZero: true
                }
            },
            layout: {
                padding: 20
            }
        }
    };


    new Chart(ctx, config);
});

const btnCasa = document.getElementById('home')
const btnClienteInfo = document.getElementById('clienteInfo')
const btnClienteMembresia = document.getElementById('clienteMembresia')
const btnEmpleadoInfo = document.getElementById('empleadoInfo')
const btnEmpleadoLaboral = document.getElementById('empleadoLaboral')
const btnProducto = document.getElementById('productos')
const btnProveedor = document.getElementById('proveedores')
const btnFactura = document.getElementById('facturas')
const btnDetalleFactura = document.getElementById('detalleFacturas')

btnCasa.addEventListener('click', (event) => {

    event.preventDefault();

    window.location.href = '/home';
});

btnClienteInfo.addEventListener('click', (event) => {

    event.preventDefault();

    window.location.href = '/clientesinfo';
});

btnClienteMembresia.addEventListener('click', (event) => {

    event.preventDefault();

    window.location.href = '/clientesLaboral';
});

btnEmpleadoInfo.addEventListener('click', (event) => {

    event.preventDefault();

    window.location.href = '/empleadosInfo';
});

btnEmpleadoLaboral.addEventListener('click', (event) => {

    event.preventDefault();

    window.location.href = '/empleadosLaboral';
});

btnProducto.addEventListener('click', (event) => {

    event.preventDefault();

    window.location.href = '/producto';
});

btnProveedor.addEventListener('click', (event) => {

    event.preventDefault();

    window.location.href = '/proveedor';
});

btnFactura.addEventListener('click', (event) => {

    event.preventDefault();

    window.location.href = '/factura';
});

btnDetalleFactura.addEventListener('click', (event) => {

    event.preventDefault();

    window.location.href = '/detalleFactura';
});

