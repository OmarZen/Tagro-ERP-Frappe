
var swiper = new Swiper('.clients-carousel', {
    // Optional parameters
    loop: true,
    autoplay: {
        delay: 2500,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

