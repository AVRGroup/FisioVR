let slideIndex = 1;

window.addEventListener('resize', () => {
    showDivs(slideIndex)
})

showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n)
}

function showDivs(n) {
    const slide = document.getElementsByClassName("slide");
    const display = window.innerWidth < 1024 ? 'none' : "inline-block"

    if (n > slide.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slide.length
    }
    for (let i = 0; i < slide.length; i++) {
        slide[i].style.display = display
    }
    slide[slideIndex - 1].style.display = "inline-block"
}

function openModal(n) {
    document.getElementById("modal-slideshow").style.display = "block"
    showModal(slideIndex = n);
}

function closeModal() {
    document.getElementById("modal-slideshow").style.display = "none"
}

function plusModal(n) {
    showModal(slideIndex += n);
}

function showModal(n) {
    const slide = document.getElementsByClassName("slide-modal");

    if (n > slide.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slide.length
    }
    for (let i = 0; i < slide.length; i++) {
        slide[i].style.display = "none"
    }
    slide[slideIndex - 1].style.display = "block"
}