let currentModalIndex = 0;

// ✅ Mostrar el modal con los datos de la obra
function showModal(obra) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    modalImg.src = obra.imagen;
    modalTitle.textContent = obra.titulo;
    modalDescription.textContent = obra.descripcion;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// ✅ Abrir modal y actualizar la URL
function openModal(index) {
    const obra = obrasData[index];
    if (!obra) return;

    currentModalIndex = index;

    // Agregar parámetro a la URL sin recargar
    const newUrl = `${window.location.origin}${window.location.pathname}?obra=${obra.id}`;
    history.pushState({ modalOpen: true }, '', newUrl);

    showModal(obra);
}

// ✅ Cerrar modal y limpiar la URL
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';

    // Quitar el parámetro "obra" de la URL
    const cleanUrl = window.location.origin + window.location.pathname;
    history.pushState({}, '', cleanUrl);
}

// ✅ Revisar la URL al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const obraId = params.get('obra');
    if (obraId) {
        const index = obrasData.findIndex(o => o.id == obraId);
        if (index !== -1) openModal(index);
    }
});

// ✅ Botones de navegación del modal
document.getElementById('prevBtn').addEventListener('click', () => {
    currentModalIndex = (currentModalIndex - 1 + obrasData.length) % obrasData.length;
    openModal(currentModalIndex);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentModalIndex = (currentModalIndex + 1) % obrasData.length;
    openModal(currentModalIndex);
});

// ✅ Cerrar modal al hacer clic en la X
document.querySelector('.close').addEventListener('click', closeModal);
