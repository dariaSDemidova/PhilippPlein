document.addEventListener('DOMContentLoaded', () => {
    const menRadio = document.getElementById('men');
    const womenRadio = document.getElementById('women');
    const genderElements = document.querySelectorAll('[data-gender]');
    const cartIcons = document.querySelectorAll('.cart-icon');
    const modals = document.querySelectorAll('.modal');

    const toggleGender = () => {
        const selectedGender = menRadio.checked ? 'men' : 'women';
        genderElements.forEach(element => {
            if (element.getAttribute('data-gender') === selectedGender) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });
    };

    menRadio.addEventListener('change', toggleGender);
    womenRadio.addEventListener('change', toggleGender);

    toggleGender();

    cartIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const gender = menRadio.checked ? 'men' : 'women';
            const modal = icon.nextElementSibling.getAttribute('data-gender') === gender ? icon.nextElementSibling : icon.nextElementSibling.nextElementSibling;
            if (modal) {
                modal.classList.add('active');
            }
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target !== modal && !modal.contains(e.target) && e.target !== modal.previousElementSibling && !modal.previousElementSibling.contains(e.target)) {
                modal.classList.remove('active');
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const allCards = Array.from(document.querySelectorAll('.exclusive__card:not(.exclusive__card-static)'));
    const visibleCardsCount = 3;
    let currentIndex = 0;
    let currentGender = 'men';

    function filterCardsByGender(gender) {
        return allCards.filter(card => card.dataset.gender === gender);
    }

    function updateVisibleCards() {
        const cards = filterCardsByGender(currentGender);

        cards.forEach(card => {
            card.classList.add('exclusive__card-hidden');
        });

        for (let i = 0; i < visibleCardsCount; i++) {
            const index = (currentIndex + i) % cards.length;
            cards[index].classList.remove('exclusive__card-hidden');
            cards[index].style.order = i + 1;
        }
    }

    function showNextCard() {
        const cards = filterCardsByGender(currentGender);
        currentIndex = (currentIndex + 1) % cards.length;
        updateVisibleCards();
    }

    function switchGender(gender) {
        currentGender = gender;
        currentIndex = 0;
        updateVisibleCards();
    }

    document.querySelector('#men').addEventListener('click', function () {
        switchGender('men');
    });

    document.querySelector('#women').addEventListener('click', function () {
        switchGender('women');
    });

    setInterval(showNextCard, 3000);
    updateVisibleCards();
});



document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.best__slider-images img');
    const dots = document.querySelectorAll('.best__slider-dots .best__slider-dot');
    let currentIndex = 0;
    let currentGender = 'men';
    let intervalTime = 3000;
    let slideInterval;

    function filterSlidesByGender(gender) {
        return Array.from(slides).filter(slide => slide.dataset.gender === gender);
    }

    function showSlide(index, genderSlides) {
        genderSlides.forEach(slide => {
            slide.style.display = 'none';
        });

        genderSlides[index].style.display = 'block';
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function nextSlide() {
        const genderSlides = filterSlidesByGender(currentGender);
        currentIndex = (currentIndex + 1) % genderSlides.length;
        showSlide(currentIndex, genderSlides);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    function switchGender(gender) {
        currentGender = gender;
        currentIndex = 0;
        const genderSlides = filterSlidesByGender(gender);
        showSlide(currentIndex, genderSlides);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            stopSlideShow();
            currentIndex = parseInt(this.getAttribute('data-slide'));
            const genderSlides = filterSlidesByGender(currentGender);
            showSlide(currentIndex, genderSlides);
            startSlideShow();
        });
    });

    document.querySelector('#men').addEventListener('click', function () {
        switchGender('men');
    });

    document.querySelector('#women').addEventListener('click', function () {
        switchGender('women');
    });

    switchGender(currentGender);
    startSlideShow();
});