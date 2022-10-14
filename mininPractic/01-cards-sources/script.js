"use strict";
function sliderPlugin(acitveElement = 0) {
    const slides = document.querySelectorAll('.slide');

    slides[acitveElement].classList.add('active');

    function clearActiveClasses() {
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });
    }

    for (const slide of slides) {
        slide.addEventListener('click', () => {
            clearActiveClasses();
            slide.classList.add('active');
        });
    }
}

sliderPlugin(2);


