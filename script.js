const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider");

let counter = 0;
let isTransitioning = false;
let autoSlideInterval;
let sliderSections = [];
let allSlides = [];
let obrasData = [];
let currentModalIndex = 0;

// ✅ Cargar datos desde JSON y crear slides
function loadObrasData() {
    // Usar los datos proporcionados
    obrasData = [
      {
        "id": 1,
        "artista": "Fernando R",
        "nacionalidad": "Hondureña",
        "titulo": "Cerro Juana Lainez",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "Recordar la ciudad donde nací, Tegucigalpa, Honduras",
        "imagen": "imagenes/1.png"
      },
      {
        "id": 2,
        "artista": "Krisher",
        "nacionalidad": "Guatemalteca",
        "titulo": "La vida es un Cartucho",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "El cartucho es una flor muy conocida y tradicional de Guatemala. Se cultiva en las áreas frías, pues, al igual que el ser humano, depende del vital líquido que es el agua; sin la suficiente, muere. En agua puede mantenerse viva por más de ocho días después de ser cortada de la planta",
        "imagen": "imagenes/2.png"
      },
      {
        "id": 3,
        "artista": "Cirilo",
        "nacionalidad": "Mexicana",
        "titulo": "Azul, rojo amarillo, verde",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Abstracto geométrico",
        "significado": "Casa en Monterrey",
        "imagen": "imagenes/3.png"
      },
      {
        "id": 4,
        "artista": "Anónimo",
        "nacionalidad": "Hondureña",
        "titulo": "Sin título",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "Sin descripción",
        "imagen": "imagenes/4.png"
      },
      {
        "id": 5,
        "artista": "Hamilton",
        "nacionalidad": "Colombiana",
        "titulo": "Sin título",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "Sin descripción",
        "imagen": "imagenes/5.png"
      },
      {
        "id": 6,
        "artista": "Darwin C",
        "nacionalidad": "Colombiana",
        "titulo": "Sin título",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "Las montañas de mi bello Medellín",
        "imagen": "imagenes/6.png"
      },
      {
        "id": 7,
        "artista": "Ana G",
        "nacionalidad": "Hondureña",
        "titulo": "La naturaleza",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "Los paisajes de mi país",
        "imagen": "imagenes/7.png"
      },
      {
        "id": 8,
        "artista": "Ana Cristina",
        "nacionalidad": "Hondureña",
        "titulo": "Sin título",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "Sin descripción",
        "imagen": "imagenes/8.png"
      },
      {
        "id": 9,
        "artista": "Cristian H",
        "nacionalidad": "Colombiana",
        "titulo": "Sin título",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "El mejor país del mundo, Colombia",
        "imagen": "imagenes/9.png"
      },
      {
        "id": 11,
        "artista": "Jeferson G",
        "nacionalidad": "Hondureña",
        "titulo": "Sin título",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Expresionista simbólico",
        "significado": "Ganesha diosa hindú representa la paz interior y espiritual",
        "imagen": "imagenes/11.png"
      },
      {
        "id": 12,
        "artista": "Anónimo",
        "nacionalidad": "Hondureña",
        "titulo": "Sin título",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "Sin descripción",
        "imagen": "imagenes/12.png"
      },
      {
        "id": 13,
        "artista": "José A",
        "nacionalidad": "Mexicana",
        "titulo": "Representación de todo el mundo",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Simbólico",
        "significado": "Gente de todos los lugares",
        "imagen": "imagenes/13.png"
      },
      {
        "id": 14,
        "artista": "Juan Carlos",
        "nacionalidad": "Venezolana",
        "titulo": "Sin título",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "Sin descripción",
        "imagen": "imagenes/14.png"
      },
      {
        "id": 15,
        "artista": "Miguel Piña",
        "nacionalidad": "Colombiana",
        "titulo": "Sin título",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "Sin descripción",
        "imagen": "imagenes/15.png"
      },
      {
        "id": 16,
        "artista": "Eythan Reyes A",
        "nacionalidad": "Costarricense",
        "titulo": "Sin título",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "Un emigrante por el mundo buscando tranquilidad, un día tienes todo; al día siguiente abordas un avión y pasas a ser una estadística más…",
        "imagen": "imagenes/16.png"
      },
      {
        "id": 17,
        "artista": "Zahra",
        "nacionalidad": "Iraní",
        "titulo": "Architecture of Iran",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Arte arquitectónico conceptual",
        "significado": "I'm a painter and an urban planner, so for me, my identity means our beautiful culture and architecture, especially the ancient one",
        "imagen": "imagenes/17.png"
      },
      {
        "id": 18,
        "artista": "Fidel P",
        "nacionalidad": "Salvadoreña",
        "titulo": "3 Fronteras",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "Sin descripción",
        "imagen": "imagenes/18.png"
      },
      {
        "id": 19,
        "artista": "Dr. Joseph",
        "nacionalidad": "Iraní",
        "titulo": "Flagtooth",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Arte conceptual",
        "significado": "My job is my identity",
        "imagen": "imagenes/19.png"
      },
      {
        "id": 20,
        "artista": "Anónimo",
        "nacionalidad": "Nicaragüense",
        "titulo": "Sin título",
        "formato_medidas": "Vertical, 29 cm x 42 cm",
        "tipo_obra": "Pintura",
        "fecha_elaboracion": "7 - septiembre - 2025",
        "estilo": "Figurativo naïf",
        "significado": "Sin descripción",
        "imagen": "imagenes/20.png"
      }
    ];
    
    // Limpiar el slider
    slider.innerHTML = '';
    
    // Crear slides para cada obra
    obrasData.forEach(obra => {
        const slide = document.createElement('div');
        slide.className = 'slider-section';
        slide.dataset.id = obra.id;
        
        slide.innerHTML = `
            <img src="${obra.imagen}" alt="${obra.titulo}">
            <h2>${obra.titulo}</h2>
        `;
        
        // Añadir evento de clic para abrir el modal
        slide.addEventListener('click', () => {
            openModal(obra.id - 1); // Restamos 1 porque el array empieza en 0
        });
        
        slider.appendChild(slide);
    });
    
    // Actualizar referencias
    sliderSections = document.querySelectorAll(".slider-section");
    initCarousel();
}

// ✅ Inicializar carrusel
function initCarousel() {
    cloneSlides();
    updateSlidesList();
    counter = sliderSections.length; // Empezar después de los clones izquierdos
    moveSlider(false);
    startAutoSlide();
}

// ✅ Clonar slides para efecto infinito
function cloneSlides() {
    // Limpiar clones existentes
    const existingClones = slider.querySelectorAll('.cloned');
    existingClones.forEach(clone => clone.remove());
    
    // Clonar primeros slides al final
    for (let i = 0; i < 4; i++) {
        if (sliderSections[i]) {
            let firstClone = sliderSections[i].cloneNode(true);
            firstClone.classList.add('cloned');
            slider.appendChild(firstClone);
        }
    }
    
    // Clonar últimos slides al inicio
    for (let i = sliderSections.length - 1; i >= sliderSections.length - 4; i--) {
        if (sliderSections[i]) {
            let lastClone = sliderSections[i].cloneNode(true);
            lastClone.classList.add('cloned');
            slider.insertBefore(lastClone, slider.firstChild);
        }
    }
}

// ✅ Actualizar lista de slides
function updateSlidesList() {
    allSlides = document.querySelectorAll(".slider-section");
}

// ✅ Mover slider
function moveSlider(withTransition = true) {
    if (isTransitioning) return;
    
    if (allSlides.length === 0) return;
    
    const slideWidth = allSlides[0].offsetWidth + parseInt(getComputedStyle(allSlides[0]).marginRight) * 2;
    slider.style.transition = withTransition ? "transform 0.6s ease" : "none";
    slider.style.transform = `translateX(-${counter * slideWidth}px)`;
    
    if (withTransition) {
        isTransitioning = true;
        setTimeout(() => {
            isTransitioning = false;
            checkSlidePosition();
        }, 600);
    }
}

// ✅ Verificar posición del slide
function checkSlidePosition() {
    // Si está en los clones del final, saltar al inicio real
    if (counter >= allSlides.length - 4) {
        counter = sliderSections.length;
        moveSlider(false);
    }
    // Si está en los clones del inicio, saltar al final real
    else if (counter <= 0) {
        counter = sliderSections.length;
        moveSlider(false);
    }
}

// ✅ Movimiento a la derecha (siguiente slide)
function moveToRight() {
    if (isTransitioning) return;
    counter++;
    moveSlider();
    resetAutoSlide();
}

// ✅ Movimiento a la izquierda (slide anterior)
function moveToLeft() {
    if (isTransitioning) return;
    counter--;
    moveSlider();
    resetAutoSlide();
}

// ✅ Auto slide
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveToRight();
    }, 4000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// ✅ Abrir modal con la información de la obra
function openModal(index) {
    const modal = document.getElementById('imageModal');
    const obra = obrasData[index];
    
    if (!obra) return;
    
    // Guardar el índice actual para navegación
    currentModalIndex = index;
    
    // Añadir clase de carga
    const modalImageContainer = document.querySelector('.modal-image-container');
    modalImageContainer.classList.add('loading');
    
    // Precargar imagen
    const img = new Image();
    img.src = obra.imagen;
    img.onload = function() {
        // Actualizar contenido del modal
        document.getElementById('modalImage').src = obra.imagen;
        document.getElementById('modalTitle').textContent = obra.titulo;
        document.getElementById('modalArtista').textContent = obra.artista;
        document.getElementById('modalNacionalidad').textContent = obra.nacionalidad;
        document.getElementById('modalFormato').textContent = obra.formato_medidas;
        document.getElementById('modalTipoObra').textContent = obra.tipo_obra;
        document.getElementById('modalFecha').textContent = obra.fecha_elaboracion;
        document.getElementById('modalEstilo').textContent = obra.estilo;
        document.getElementById('modalSignificado').textContent = obra.significado;
        
        // Quitar clase de carga
        modalImageContainer.classList.remove('loading');
        
        // Mostrar modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevenir scroll en el fondo
    };
    
    img.onerror = function() {
        // Si hay error al cargar la imagen, mostrar igual el modal
        document.getElementById('modalImage').src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5Ij5JbWFnZW4gbm8gZW5jb250cmFkYTwvdGV4dD48L3N2Zz4=';
        document.getElementById('modalTitle').textContent = obra.titulo;
        document.getElementById('modalArtista').textContent = obra.artista;
        document.getElementById('modalNacionalidad').textContent = obra.nacionalidad;
        document.getElementById('modalFormato').textContent = obra.formato_medidas;
        document.getElementById('modalTipoObra').textContent = obra.tipo_obra;
        document.getElementById('modalFecha').textContent = obra.fecha_elaboracion;
        document.getElementById('modalEstilo').textContent = obra.estilo;
        document.getElementById('modalSignificado').textContent = obra.significado;
        
        // Quitar clase de carga
        modalImageContainer.classList.remove('loading');
        
        // Mostrar modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };
}

// ✅ Cerrar modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restaurar scroll
}

// ✅ Navegar al anterior en el modal
function prevModal() {
    let newIndex = currentModalIndex - 1;
    if (newIndex < 0) newIndex = obrasData.length - 1;
    openModal(newIndex);
}

// ✅ Navegar al siguiente en el modal
function nextModal() {
    let newIndex = currentModalIndex + 1;
    if (newIndex >= obrasData.length) newIndex = 0;
    openModal(newIndex);
}

// ✅ Event Listeners para el modal
document.querySelector('.close-modal').addEventListener('click', closeModal);
document.querySelector('.modal-nav.prev').addEventListener('click', prevModal);
document.querySelector('.modal-nav.next').addEventListener('click', nextModal);

// ✅ Cerrar modal al hacer clic fuera del contenido
document.getElementById('imageModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('imageModal')) {
        closeModal();
    }
});

// ✅ Navegación con teclado
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('imageModal');
    if (modal.classList.contains('show')) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') prevModal();
        if (e.key === 'ArrowRight') nextModal();
    }
});

// ✅ Event Listeners para el carrusel
btnRight.addEventListener("click", moveToRight);
btnLeft.addEventListener("click", moveToLeft);

// 📱 Swipe en móvil
let startX = 0, endX = 0;
let isDragging = false;

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    clearInterval(autoSlideInterval);
});

slider.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    endX = e.touches[0].clientX;
});

slider.addEventListener("touchend", () => {
    if (!isDragging) return;
    
    let diff = startX - endX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) moveToRight();
        else moveToLeft();
    }
    
    startX = 0;
    endX = 0;
    isDragging = false;
    resetAutoSlide();
});

// 🖱️ Evento de rueda del ratón
slider.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
        moveToRight();
    } else {
        moveToLeft();
    }
});

// 📏 Redimensionamiento de ventana
window.addEventListener("resize", () => {
    cloneSlides();
    updateSlidesList();
    counter = sliderSections.length;
    moveSlider(false);
});

// 🚀 Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadObrasData();
});

// Pausar auto slide cuando el mouse está sobre el carrusel
slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

slider.addEventListener('mouseleave', () => {
    resetAutoSlide();
});

// Prevenir comportamiento por defecto en touch devices
slider.addEventListener('touchmove', (e) => {
    if (isDragging) {
        e.preventDefault();
    }
}, { passive: false });