document.querySelectorAll('.slider').forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    const prev = slider.querySelector('.prev');
    const next = slider.querySelector('.next');
    let current = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);
    setInterval(nextSlide, 5000); // Cambio automático
});