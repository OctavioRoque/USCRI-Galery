// modal.js
let currentModalIndex = 0;

function openModal(index) {
    const modal = document.getElementById('imageModal');
    const obras = window.obrasData || [];
    const obra = obras[index];
    if (!obra) return;

    currentModalIndex = index;
    const modalImageContainer = document.querySelector('.modal-image-container');
    if (modalImageContainer) modalImageContainer.classList.add('loading');

    const img = new Image();
    img.src = obra.imagen;
    img.onload = function() {
        document.getElementById('modalImage').src = obra.imagen;
        document.getElementById('modalTitle').textContent = obra.titulo || '';
        document.getElementById('modalArtista').textContent = obra.artista || '';
        document.getElementById('modalNacionalidad').textContent = obra.nacionalidad || '';
        document.getElementById('modalFormato').textContent = obra.formato_medidas || '';
        document.getElementById('modalTipoObra').textContent = obra.tipo_obra || '';
        document.getElementById('modalFecha').textContent = obra.fecha_elaboracion || '';
        document.getElementById('modalEstilo').textContent = obra.estilo || '';
        document.getElementById('modalSignificado').textContent = obra.significado || '';

        if (modalImageContainer) modalImageContainer.classList.remove('loading');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    img.onerror = function() {
        // fallback si no carga imagen
        document.getElementById('modalImage').src = '';
        if (modalImageContainer) modalImageContainer.classList.remove('loading');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function prevModal() {
    const obras = window.obrasData || [];
    let newIndex = currentModalIndex - 1;
    if (newIndex < 0) newIndex = obras.length - 1;
    openModal(newIndex);
}
function nextModal() {
    const obras = window.obrasData || [];
    let newIndex = currentModalIndex + 1;
    if (newIndex >= obras.length) newIndex = 0;
    openModal(newIndex);
}

// Hacer funciones globales (para que carousel.js pueda llamarlas)
window.openModal = openModal;
window.closeModal = closeModal;
window.prevModal = prevModal;
window.nextModal = nextModal;

// Listeners del modal (asegúrate de que existen esos elementos en tu HTML)
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    const prevBtn = document.querySelector('.modal-nav.prev');
    const nextBtn = document.querySelector('.modal-nav.next');
    if (prevBtn) prevBtn.addEventListener('click', prevModal);
    if (nextBtn) nextBtn.addEventListener('click', nextModal);

    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        const m = document.getElementById('imageModal');
        if (!m || !m.classList.contains('show')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') prevModal();
        if (e.key === 'ArrowRight') nextModal();
    });
});
