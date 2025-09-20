// modal.js
let currentModalIndex = 0;

// Función para manejar los parámetros de la URL
function handleModalURLs() {
    // Obtener el parámetro 'modal' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const modalIndex = urlParams.get('modal');
    
    // Si hay un parámetro 'modal' en la URL, abrir el modal correspondiente
    if (modalIndex !== null && !isNaN(modalIndex)) {
        const index = parseInt(modalIndex);
        const obras = window.obrasData || [];
        if (index >= 0 && index < obras.length) {
            // Pequeño retraso para asegurar que el DOM esté listo
            setTimeout(() => openModal(index), 100);
        }
    }
    
    // Actualizar la URL cuando se abre un modal
    function updateURL(modalIndex) {
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('modal', modalIndex);
        window.history.pushState({}, '', newUrl);
    }
    
    // Limpiar la URL cuando se cierra el modal
    function clearURL() {
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete('modal');
        window.history.pushState({}, '', newUrl);
    }
    
    // Devolver las funciones que necesitarás usar
    return {
        updateURL,
        clearURL
    };
}

// Inicializar el manejo de URLs para modales
const modalURLHandler = handleModalURLs();

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

        // 🔹 Configuración del botón de like
        const likeBtn = document.getElementById("likeBtn");
        if (likeBtn) {
            // Resetear ícono a vacío para evitar ver el estado anterior
            likeBtn.classList.remove("bx bxs-heart");
            likeBtn.classList.add("bx bx-heart");

            // Guardar id de la obra
            likeBtn.dataset.workId = obra.id;

            // Actualizar contador y estado real desde Supabase
            if (typeof window.updateLikeUI === "function") {
                window.updateLikeUI();
            }
        }

        if (modalImageContainer) modalImageContainer.classList.remove('loading');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Actualizar la URL con el índice del modal
        modalURLHandler.updateURL(index);
    };

    img.onerror = function() {
        // fallback si no carga imagen
        document.getElementById('modalImage').src = '';
        if (modalImageContainer) modalImageContainer.classList.remove('loading');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Actualizar la URL con el índice del modal
        modalURLHandler.updateURL(index);
    };
}


function closeModal() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    modal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Limpiar la URL cuando se cierra el modal
    modalURLHandler.clearURL();
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
    
    // Manejar el botón de retroceso del navegador
    window.addEventListener('popstate', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const modalIndex = urlParams.get('modal');
        
        if (modalIndex === null) {
            // Si no hay parámetro 'modal', cerrar el modal
            closeModal();
        } else {
            // Si hay un parámetro 'modal', abrirlo
            const index = parseInt(modalIndex);
            const obras = window.obrasData || [];
            if (index >= 0 && index < obras.length) {
                openModal(index);
            }
        }
    });
});

// Llamar esta función cuando se cargue la página
window.addEventListener('load', function() {
    handleModalURLs();
});