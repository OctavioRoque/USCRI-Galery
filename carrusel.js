// carousel.js
const CLONE_COUNT = 4;
const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider");

let counter = 0;
let isTransitioning = false;
let sliderSections = []; // originales
let allSlides = [];      // originales + clones
let obrasData = [];

// Exponer obrasData globalmente para modal.js
function exposeObrasGlobal() {
    window.obrasData = obrasData;
}

// ✅ Asignar evento click para abrir modal a cualquier slide (clon u original)
function attachClickEvents(slides) {
    slides.forEach(slide => {
        slide.onclick = () => {
            const id = Number(slide.dataset.id);
            const index = obrasData.findIndex(o => o.id === id);
            if (index !== -1) {
                // usar la función global openModal (definida en modal.js)
                if (typeof window.openModal === 'function') window.openModal(index);
            }
        };
    });
}

// ✅ Cargar datos (usa tus objetos)
function loadObrasData() {
    obrasData = [
      /* pega aquí exactamente tu array de objetos (id, artista, imagen, etc.) */
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
        "id": 10,
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
        "id": 11,
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
        "id": 12,
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
        "id": 13,
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
        "id": 14,
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
        "id": 15,
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
        "id": 16,
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
        "id": 17,
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
        "id": 18,
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
        "id": 19,
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

    // Exponer globalmente (para modal.js)
    exposeObrasGlobal();

    // Limpiar y crear slides
    slider.innerHTML = '';
    obrasData.forEach(obra => {
        const slide = document.createElement('div');
        slide.className = 'slider-section';
        slide.dataset.id = obra.id;
        slide.innerHTML = `
            <img src="${obra.imagen}" alt="${obra.titulo}">
            <h2>${obra.titulo}</h2>
        `;
        slider.appendChild(slide);
    });

    // Guardar referencia a los originales (antes de clonar)
    sliderSections = Array.from(slider.querySelectorAll('.slider-section:not(.cloned)'));
    attachClickEvents(sliderSections);
    initCarousel();
}

// ✅ Inicializar carrusel
function initCarousel() {
    cloneSlides();
    updateSlidesList();
    counter = CLONE_COUNT; // empezar en el primer original (después de los clones left)
    moveSlider(false);
}

// ✅ Clonar slides (left and right)
function cloneSlides() {
    // eliminar clones previos
    slider.querySelectorAll('.cloned').forEach(c => c.remove());
    const originals = Array.from(slider.querySelectorAll('.slider-section:not(.cloned)'));

    // clonar últimos (para insertar al inicio) - loop descendente para mantener orden
    for (let i = originals.length - 1; i >= Math.max(0, originals.length - CLONE_COUNT); i--) {
        const clone = originals[i].cloneNode(true);
        clone.classList.add('cloned');
        slider.insertBefore(clone, slider.firstChild);
    }

    // clonar primeros (para añadir al final)
    for (let i = 0; i < Math.min(CLONE_COUNT, originals.length); i++) {
        const clone = originals[i].cloneNode(true);
        clone.classList.add('cloned');
        slider.appendChild(clone);
    }

    // reasignar click a clones también
    attachClickEvents(Array.from(slider.querySelectorAll('.cloned')));
}

// ✅ Actualizar lista completa de slides
function updateSlidesList() {
    allSlides = Array.from(slider.querySelectorAll('.slider-section'));
}

// ✅ Calcular ancho efectivo de un slide (incluye márgenes)
function getSlideWidth(slideEl) {
    const style = getComputedStyle(slideEl);
    const width = slideEl.getBoundingClientRect().width;
    const ml = parseFloat(style.marginLeft) || 0;
    const mr = parseFloat(style.marginRight) || 0;
    return width + ml + mr;
}

// ✅ Mover slider
function moveSlider(withTransition = true) {
    if (isTransitioning || allSlides.length === 0) return;

    const slideWidth = getSlideWidth(allSlides[0]);
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

// ✅ Ajuste al entrar en zona de clones (infinito bothways)
function checkSlidePosition() {
    const total = allSlides.length;
    const originalsCount = sliderSections.length;

    // Si entramos en los clones de la derecha (ej. indices >= total - CLONE_COUNT)
    if (counter >= total - CLONE_COUNT) {
        // nos movemos a la copia real correspondiente en el bloque de originales
        counter = counter - originalsCount;
        moveSlider(false);
    }
    // Si entramos en los clones de la izquierda (counter < CLONE_COUNT)
    else if (counter < CLONE_COUNT) {
        counter = counter + originalsCount;
        moveSlider(false);
    }
}

// ✅ Navegación pública
function moveToRight() {
    if (isTransitioning) return;
    counter++;
    moveSlider();
}
function moveToLeft() {
    if (isTransitioning) return;
    counter--;
    moveSlider();
}

// Listeners botones
btnRight.addEventListener("click", moveToRight);
btnLeft.addEventListener("click", moveToLeft);

// Touch (swipe)
let startX = 0, endX = 0, isDragging = false;
slider.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; isDragging = true; });
slider.addEventListener("touchmove", (e) => { if (isDragging) endX = e.touches[0].clientX; });
slider.addEventListener("touchend", () => {
    if (!isDragging) return;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) diff > 0 ? moveToRight() : moveToLeft();
    startX = 0; endX = 0; isDragging = false;
});

// Rueda del mouse
slider.addEventListener('wheel', (e) => {
    e.preventDefault();
    e.deltaY > 0 ? moveToRight() : moveToLeft();
}, { passive: false });

// Resize: intentar mantener la misma obra visible
function getCurrentOriginalIndex() {
    const originalsCount = sliderSections.length;
    return ((counter - CLONE_COUNT) % originalsCount + originalsCount) % originalsCount;
}
window.addEventListener("resize", () => {
    const currentOriginalIndex = getCurrentOriginalIndex();
    // volver a clonar (recrea clones con el DOM actualizado)
    cloneSlides();
    updateSlidesList();
    // colocar counter sobre el mismo original
    counter = CLONE_COUNT + currentOriginalIndex;
    moveSlider(false);
});

// Iniciar
document.addEventListener('DOMContentLoaded', () => loadObrasData());
