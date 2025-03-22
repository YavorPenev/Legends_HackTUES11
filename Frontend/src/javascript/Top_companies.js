let index = 0;

function changeSlide(step) {
    const slides = document.querySelectorAll(".slide");
    index = (index + step + slides.length) % slides.length;
    document.querySelector(".carousel-inner").style.transform = `translateX(-${index * 100}%)`;
}
setInterval(() => changeSlide(1), 3000);