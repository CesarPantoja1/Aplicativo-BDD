const abrirModal = document.getElementById('abrir');
const cerrarModal = document.getElementById('cerrar');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');

abrirModal.addEventListener('click', () => {
    modal.classList.add('open'); 
    overlay.classList.add('active');
});

cerrarModal.addEventListener('click', () => {
    modal.classList.remove('open');
    overlay.classList.remove('active');
});


overlay.addEventListener('click', () => {
    modal.classList.remove('open');
    overlay.classList.remove('active');
});

