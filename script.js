const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider"),
      sliderSections = document.querySelectorAll(".slider-section");

let counter = 0;
let visibleSlides = getVisibleSlides();

// ✅ Clonar primeras y últimas N slides
for (let i = 0; i < visibleSlides; i++) {
    let firstClone = sliderSections[i].cloneNode(true);
    let lastClone = sliderSections[sliderSections.length - 1 - i].cloneNode(true);
    slider.appendChild(firstClone);              // clones al final
    slider.insertBefore(lastClone, slider.firstChild); // clones al inicio
}

// ✅ Recalcular lista de slides (con clones incluidos)
let allSlides = document.querySelectorAll(".slider-section");

// Posición inicial → después de los clones de la izquierda
counter = visibleSlides;
moveSlider(false);

function getVisibleSlides() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 4; 
}

function moveSlider(withTransition = true) {
    const widthSlide = slider.offsetWidth / visibleSlides;
    slider.style.transition = withTransition ? "all ease .6s" : "none";
    slider.style.transform = `translateX(-${counter * widthSlide}px)`;
}

function moveToRight() {
    counter++;
    moveSlider();

    // Fin del carrusel → salto al inicio real
    if (counter >= allSlides.length - visibleSlides) {
        setTimeout(() => {
            counter = visibleSlides;
            moveSlider(false);
        }, 600);
    }
}

function moveToLeft() {
    counter--;
    moveSlider();

    // Inicio del carrusel → salto al final real
    if (counter < visibleSlides) {
        setTimeout(() => {
            counter = allSlides.length - (visibleSlides);
            moveSlider(false);
        }, 600);
    }
}

window.addEventListener("resize", () => {
    visibleSlides = getVisibleSlides();
    moveSlider(false);
});

btnRight.addEventListener("click", moveToRight);
btnLeft.addEventListener("click", moveToLeft);

// 📱 Swipe en móvil
let startX = 0, endX = 0;

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
});

slider.addEventListener("touchend", () => {
    let diff = startX - endX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) moveToRight();
        else moveToLeft();
    }
    startX = 0;
    endX = 0;
});
