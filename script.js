const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider"),
      sliderSection = document.querySelectorAll(".slider-section");

let counter = 0;
let visibleSlides = getVisibleSlides();

function getVisibleSlides() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 4; 
}

function moveSlider() {
    const widthImg = sliderSection[0].offsetWidth;
    slider.style.transform = `translateX(-${counter * widthImg}px)`;
    slider.style.transition = "all ease .6s";
}

function moveToRight() {
    if (counter < sliderSection.length - visibleSlides) {
        counter++;
    } else {
        counter = 0;
    }
    moveSlider();
}

function moveToLeft() {
    if (counter > 0) {
        counter--;
    } else {
        counter = sliderSection.length - visibleSlides;
    }
    moveSlider();
}

window.addEventListener("resize", () => {
    visibleSlides = getVisibleSlides();
    moveSlider(); 
});

btnRight.addEventListener("click", moveToRight);
btnLeft.addEventListener("click", moveToLeft);


let startX = 0;
let endX = 0;

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
});

slider.addEventListener("touchend", () => {
    let diff = startX - endX;

    if (Math.abs(diff) > 50) { 
        if (diff > 0) {
            moveToRight(); 
        } else {
            moveToLeft(); 
        }
    }

    startX = 0;
    endX = 0;
});
