document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('graficaGanancias').getContext('2d');

    // Datos del gráfico
    const datosGanancias = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], // Meses
        datasets: [{
            label: 'Ganancias ($)',
            data: [10, 25, 15, 30, 8, 20], // Valores de cada mes
            backgroundColor: [
                'rgba(120, 100, 255, 0.6)',  // Ene (morado claro)
                'rgba(80, 200, 180, 0.6)',  // Feb (verde agua)
                'rgba(0, 0, 0, 0.8)',       // Mar (negro)
                'rgba(100, 150, 255, 0.7)', // Abr (azul claro)
                'rgba(150, 180, 255, 0.5)', // May (azul suave)
                'rgba(120, 220, 150, 0.6)'  // Jun (verde claro)
            ],
            borderRadius: 10, // Bordes redondeados
            borderWidth: 0 // Sin bordes
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
