// ================= Hamburger menu close on click =================
$(".menu-items a").click(function () {
    $("#checkbox").prop("checked", false);
});

// ================= Slider functionality =================
$(document).ready(function () {
    const slider = $('.slider');
    const images = $('.slider img');
    const dots = $('.dot');
    const totalImages = images.length;
    let currentIndex = 0;

    function updateSlider() {
        const offset = -currentIndex * 100;
        slider.css('transform', `translateX(${offset}%)`);
        dots.removeClass('active');
        dots.eq(currentIndex).addClass('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlider();
    }

    // Auto slide every 5 seconds
    let sliderTimer = setInterval(nextSlide, 5000);

    // Dot click event
    dots.click(function () {
        clearInterval(sliderTimer);
        currentIndex = $(this).index();
        updateSlider();
        sliderTimer = setInterval(nextSlide, 5000);
    });

    // Initialize first slide
    updateSlider();

    // ================= Swipe support for mobile =================
    let startX = 0;
    let endX = 0;

    slider.on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    });

    slider.on('touchmove', function(e) {
        endX = e.originalEvent.touches[0].clientX;
    });

    slider.on('touchend', function() {
        const threshold = 50;
        if (startX - endX > threshold) {
            nextSlide();
        } else if (endX - startX > threshold) {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSlider();
        }
        startX = 0;
        endX = 0;
    });
});
