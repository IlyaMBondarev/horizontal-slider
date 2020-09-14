let clientWidth = document.documentElement.clientWidth;
let slidersForCards = document.querySelectorAll('.slider_for_cards');

slidersForCards.forEach(slider => {
    let visibleWidthOfSlider = clientWidth - slider.offsetLeft;
    let rightBorderOfSlider = Math.floor(visibleWidthOfSlider / 600) - 1;
    let cardsContainer = slider.querySelector('.project_card_containers');
    let cards = cardsContainer.querySelectorAll('.project_card_items');
    let indexOfActiveYear = 0;
    let indexOfLeftSlide = 0;
    let marginLeftOfSlider = 0;
    let yearsBtns = slider.querySelectorAll('.link_years');
    let indexOfBeginOfCardsEachYear = [];
    let years = [];
    let currentYear = slider.querySelector('.slider_for_cards_current_year');
    let horizontalScrollBar = slider.querySelector('.slider_for_cards_horizontal_scrollbar');
    let horizontalScrollThumb = slider.querySelector('.slider_for_cards_horizontal_scrollthumb');
    horizontalScrollBar.style.minWidth = `${visibleWidthOfSlider}px`;
    horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
    yearsBtns.forEach(btn => years.push(btn.textContent));
    currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
    let j = 0;
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].dataset.year === years[j]) {
            indexOfBeginOfCardsEachYear.push(i);
            j++;
        }
    }
    for (let i = 0; i < yearsBtns.length; i++) {
        yearsBtns[i].addEventListener('click', () => {
            if (i !== indexOfActiveYear) {
                indexOfLeftSlide = indexOfBeginOfCardsEachYear[i];
                marginLeftOfSlider = indexOfLeftSlide * 600;
                if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 600) {
                    marginLeftOfSlider = cards.length * 600 - visibleWidthOfSlider + 100;
                }
                if (indexOfLeftSlide >= cards.length - rightBorderOfSlider) {
                    indexOfLeftSlide = cards.length - rightBorderOfSlider - 1;
                }
                cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
                horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
                yearsBtns[i].classList.add('active_years');
                yearsBtns[indexOfActiveYear].classList.remove('active_years');
                indexOfActiveYear = i;
                currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                if (indexOfActiveYear === 0) {
                    arrowLeft.classList.add('swiper-button-disabled');
                } else {
                    arrowLeft.classList.remove('swiper-button-disabled');
                }
                arrowRight.classList.remove('swiper-button-disabled');
            }
        })
    }
    let arrowLeft = slider.querySelector('.btn_slider_style_prev');
    let arrowRight = slider.querySelector('.btn_slider_style_next');
    arrowLeft.addEventListener('mousedown', () => {
        if (indexOfLeftSlide === 0) {
            arrowLeft.classList.add('swiper-button-disabled');
        }
        if (!(arrowLeft.classList.contains('swiper-button-disabled'))) {
            indexOfLeftSlide--;
            marginLeftOfSlider = indexOfLeftSlide * 600;
            if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 600) {
                marginLeftOfSlider = cards.length * 600 - visibleWidthOfSlider + 100;
            }
            cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
            horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
            if (arrowRight.classList.contains('swiper-button-disabled')) {
                arrowRight.classList.remove('swiper-button-disabled');
            }
            if (marginLeftOfSlider + visibleWidthOfSlider - 80 < indexOfBeginOfCardsEachYear[indexOfActiveYear] * 600) {
                yearsBtns[indexOfActiveYear].classList.remove('active_years');
                indexOfActiveYear--;
                currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                yearsBtns[indexOfActiveYear].classList.add('active_years');
            }
        }
    });
    arrowRight.addEventListener('mousedown', () => {
        if (indexOfLeftSlide >= cards.length - rightBorderOfSlider) {
            arrowRight.classList.add('swiper-button-disabled');
        }
        if (!(arrowRight.classList.contains('swiper-button-disabled'))) {
            indexOfLeftSlide++;
            marginLeftOfSlider = indexOfLeftSlide * 600;
            if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 600) {
                marginLeftOfSlider = cards.length * 600 - visibleWidthOfSlider + 100;
            }
            cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
            horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
            if (arrowLeft.classList.contains('swiper-button-disabled')) {
                arrowLeft.classList.remove('swiper-button-disabled');
            }
            if (marginLeftOfSlider + visibleWidthOfSlider - 100 > indexOfBeginOfCardsEachYear[indexOfActiveYear + 1] * 600) {
                yearsBtns[indexOfActiveYear].classList.remove('active_years');
                indexOfActiveYear++;
                currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                yearsBtns[indexOfActiveYear].classList.add('active_years');
            }
        }
    });
    cardsContainer.addEventListener('wheel', (event) => {
        event.preventDefault();

        if (event.deltaY < 0 && indexOfLeftSlide !== 0) {
            indexOfLeftSlide--;
            marginLeftOfSlider = indexOfLeftSlide * 600;
            if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 600) {
                marginLeftOfSlider = cards.length * 600 - visibleWidthOfSlider + 100;
            }
            cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
            horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
            if (arrowRight.classList.contains('swiper-button-disabled')) {
                arrowRight.classList.remove('swiper-button-disabled');
            }
            if (marginLeftOfSlider + visibleWidthOfSlider - 80 < indexOfBeginOfCardsEachYear[indexOfActiveYear] * 600) {
                yearsBtns[indexOfActiveYear].classList.remove('active_years');
                indexOfActiveYear--;
                currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                yearsBtns[indexOfActiveYear].classList.add('active_years');
            }
            if (indexOfLeftSlide === 0) {
                arrowLeft.classList.add('swiper-button-disabled');
            }
        } else if (event.deltaY > 0 && indexOfLeftSlide < cards.length - rightBorderOfSlider) {
            indexOfLeftSlide++;
            marginLeftOfSlider = indexOfLeftSlide * 600;
            if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 600) {
                marginLeftOfSlider = cards.length * 600 - visibleWidthOfSlider + 100;
            }
            cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
            horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
            if (arrowLeft.classList.contains('swiper-button-disabled')) {
                arrowLeft.classList.remove('swiper-button-disabled');
            }
            if (marginLeftOfSlider + visibleWidthOfSlider - 100 > indexOfBeginOfCardsEachYear[indexOfActiveYear + 1] * 600) {
                yearsBtns[indexOfActiveYear].classList.remove('active_years');
                indexOfActiveYear++;
                currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                yearsBtns[indexOfActiveYear].classList.add('active_years');
            }
            if (indexOfLeftSlide >= cards.length - rightBorderOfSlider) {
                arrowRight.classList.add('swiper-button-disabled');
            }
        }
    });
    let thumbMoving = 0;
    let elemLeft, x;
    document.addEventListener('mousemove', (event) => {
        if (thumbMoving) {
            elemLeft = horizontalScrollBar.offsetLeft;
            x = event.pageX - elemLeft;
            if (x >= 0) {
                horizontalScrollThumb.style.left = `${x - 8}px`;
                marginLeftOfSlider = (x * (cards.length * 600 - visibleWidthOfSlider + 100) / visibleWidthOfSlider) - 8;
                indexOfLeftSlide = Math.round(marginLeftOfSlider / 600);
                cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
            }
            if (marginLeftOfSlider + visibleWidthOfSlider - 80 < indexOfBeginOfCardsEachYear[indexOfActiveYear] * 600) {
                yearsBtns[indexOfActiveYear].classList.remove('active_years');
                indexOfActiveYear--;
                currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                yearsBtns[indexOfActiveYear].classList.add('active_years');
            }
            if (marginLeftOfSlider + visibleWidthOfSlider - 100 > indexOfBeginOfCardsEachYear[indexOfActiveYear + 1] * 600) {
                yearsBtns[indexOfActiveYear].classList.remove('active_years');
                indexOfActiveYear++;
                currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                yearsBtns[indexOfActiveYear].classList.add('active_years');
            }
        }
    });
    horizontalScrollThumb.addEventListener('mousedown', (event) => {
        cardsContainer.style.transition = 'margin-left 0s ease-in-out';
        horizontalScrollThumb.style.transition = 'left 0s ease-in-out';
        thumbMoving = 1;
    });

    document.addEventListener('mouseup', (event) => {
        cardsContainer.style.transition = 'margin-left 0.6s ease-in-out';
        horizontalScrollThumb.style.transition = 'left 0.6s ease-in-out';
        thumbMoving = 0;
        marginLeftOfSlider = indexOfLeftSlide * 600;
        if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 600) {
            marginLeftOfSlider = cards.length * 600 - visibleWidthOfSlider + 100;
        }
        cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
        horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
    })
})