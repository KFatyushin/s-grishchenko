//= ../../../node_modules/swiper/swiper-bundle.js

// Advantage Slides
let advantageSlides = new Swiper('.advantage-slides__container', {
    slidesPerView: 2,
    spaceBetween: 20,
    speed: 600,

    breakpoints: {
        0: {
            slidesPerView: 1,
        },

        575: {
            slidesPerView: 2,
        },
    },

    pagination: {
        el: '.advantage-pagination',
    },

    navigation: {
        prevEl: '.advantage-arrows .slides-arrows__prev',
        nextEl: '.advantage-arrows .slides-arrows__next',
    },
});

// Questions switch
let questionsBTN = jQuery('.questions-list__top');
questionsBTN.on('click', function () {
    if (jQuery(this).siblings().css('display') === 'block') {
        questionsBTN.siblings().slideUp();
        questionsBTN.removeClass('active');
    } else {
        // open
        questionsBTN.siblings().slideUp();
        jQuery(this).siblings().slideToggle();

        // active btn
        questionsBTN.removeClass('active');
        jQuery(this).toggleClass('active');
    }
});

// Menu switch
let hamburger = jQuery('.hamburger');
let menuClose = jQuery('.navbar-mb-menu__close');
let menuOverlay = jQuery('.navbar-mb-menu__overlay');
let menuLink = jQuery('.navbar-menu li a');

const menuSwitch = (arrClick, large) => {
    if (large) {
        arrClick.forEach((item) => {
            item.on('click', function () {
                jQuery('.navbar-mb-menu').toggle('');
            });
        })
    } else {
        arrClick.forEach((item) => {
            item.off();
        })
    }
};

// Services Slides
let servicesContent = undefined;
function swiperToggle() {
    let screenWidth = jQuery(window).width();
    if(screenWidth < 767 && servicesContent == null) {
        servicesContent = new Swiper('.services-tabs-content', {
            slidesPerView: 'auto',

            navigation: {
                prevEl: '.services-arrows .slides-arrows__prev',
                nextEl: '.services-arrows .slides-arrows__next',
            },
        });

        // mobile menu
        menuSwitch([hamburger, menuClose, menuOverlay, menuLink], true);

    } else if (screenWidth > 766 && servicesContent != null) {
        servicesContent.forEach(
            element => element.destroy()
        );
        servicesContent = null;

        // mobile menu
        menuSwitch([hamburger, menuClose, menuOverlay, menuLink], false);
    }
}
swiperToggle();
jQuery(window).on('resize', function(){
    swiperToggle();
});

// Services Tabs
jQuery('.services-tabs-btns__item').on('click', function () {
    let currTab = jQuery(this).index();

    jQuery('.services-tabs-btns__item').removeClass('active');
    jQuery(this).addClass('active');

    jQuery('.services-tabs-content').removeClass('active');
    jQuery('.services-tabs-content').eq(currTab).addClass('active');
});
jQuery('.services-tabs-content__item').on('click', function () {
    jQuery('.services-popup').toggleClass('active');
});
jQuery('.services-popup__close').on('click', function () {
    jQuery('.services-popup').removeClass('active');
});
jQuery('.services-popup__overlay').on('click', function () {
    jQuery('.services-popup').removeClass('active');
});

jQuery('.services-tabs-content__item').on('click', function () {
    let addPopupSlides = `
        <div class="services-popup-slides-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide services-popup-slides-container__img">
                    <img src="assets/img/services/aen1.jpg">
                </div>
        
                <div class="swiper-slide services-popup-slides-container__img">
                    <img src="assets/img/services/aen1.jpg">
                </div>
        
                <div class="swiper-slide services-popup-slides-container__img">
                    <img src="assets/img/services/aen1.jpg">
                </div>
            </div>
        </div>
        
        <div class="services-popup-slides-tabs">
            <div class="swiper-wrapper">
                <div class="swiper-slide services-popup-slides-tabs__img">
                    <img src="assets/img/services/aen1.jpg">
                </div>
        
                <div class="swiper-slide services-popup-slides-tabs__img">
                    <img src="assets/img/services/aen1.jpg">
                </div>
        
                <div class="swiper-slide services-popup-slides-tabs__img">
                    <img src="assets/img/services/aen1.jpg">
                </div>
            </div>
        </div>
        
        <div class="slides-arrows services-popup-arrows">
            <button class="slides-arrows__item slides-arrows__prev">
                <div class="arrow"></div>
            </button>
        
            <button class="slides-arrows__item slides-arrows__next">
                <div class="arrow"></div>
            </button>
        </div>`;
    jQuery('.services-popup-slides').html(addPopupSlides);

    let servicesPopupTabs = new Swiper('.services-popup-slides-tabs', {
        slidesPerView: 3,
    });
    let servicesPopupContent = new Swiper('.services-popup-slides-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },

        thumbs: {
            swiper: servicesPopupTabs
        },

        navigation: {
            prevEl: '.services-popup-arrows .slides-arrows__prev',
            nextEl: '.services-popup-arrows .slides-arrows__next',
        },
    });
    servicesPopupContent.controller.control = servicesPopupTabs;

    let popupIMG = jQuery('.services-popup__img img')[0];
    let popupMainIMG = jQuery(this).find('.services-tabs-content__img img')[0];
    let popupAdditionalIMG = jQuery(this).find('.services-img-list')[0] ? jQuery(this).find('.services-img-list img') : null;
    let popupSlidesList = document.querySelectorAll('.services-popup-slides-container__img img');
    let popupSlidesTabsList = document.querySelectorAll('.services-popup-slides-tabs__img img');
    let popupTitle = jQuery(this).find('.services-tabs-content__title')[0];
    let popupMade = jQuery(this).find('.services-made')[0];

    let imgSmall = jQuery(this).hasClass('services-tabs-content__item_small');

    // console.log(!popupAdditionalIMG);

    if (imgSmall && popupAdditionalIMG) {
        jQuery('.services-popup__block').addClass('services-popup-img-small');

        jQuery('.services-popup__block').removeClass('services-popup-img-small-noSlides');
        jQuery('.services-popup__block').removeClass('services-popup-img-big-noSlides');
    } else if (imgSmall) {
        jQuery('.services-popup__block').addClass('services-popup-img-small-noSlides');

        jQuery('.services-popup__block').removeClass('services-popup-img-small');
        jQuery('.services-popup__block').removeClass('services-popup-img-big-noSlides');
    } else if (!popupAdditionalIMG) {
        jQuery('.services-popup__block').addClass('services-popup-img-big-noSlides');

        jQuery('.services-popup__block').removeClass('services-popup-img-small');
        jQuery('.services-popup__block').removeClass('services-popup-img-small-noSlides');
    } else {
        jQuery('.services-popup__block').removeClass('services-popup-img-small');
        jQuery('.services-popup__block').removeClass('services-popup-img-small-noSlides');
        jQuery('.services-popup__block').removeClass('services-popup-img-big-noSlides');
    }

    jQuery('.services-popup__title')[0].textContent = popupTitle.textContent;

    if (popupMade) {
        jQuery('.services-popup__made').css({'display' : 'block'});
        jQuery('.services-popup__made').html('Что сделано: ' + popupMade.textContent);
    } else {
        jQuery('.services-popup__made').css({'display' : 'none'});
        jQuery('.services-popup__made').html('');
    }

    // console.log(popupAdditionalIMG);

    if (popupAdditionalIMG) {
        jQuery('.services-popup-slides').removeClass('no-active');
        popupIMG.parentNode.classList.add('no-active');
        // console.log(popupIMG);

        let arrIMG = [];
        arrIMG.push(popupMainIMG);

        for (let i = 0; popupAdditionalIMG.length > i; i++) {
            arrIMG.push(popupAdditionalIMG[i]);
        }

        for (let i = 0; popupSlidesList.length > i; i++) {
            let imgItem = arrIMG[i];

            // console.log(imgItem);

            if (imgItem) {
                popupSlidesList[i].parentNode.classList.remove('no-active');
                popupSlidesTabsList[i].parentNode.classList.remove('no-active');

                popupSlidesList[i].src = imgItem.currentSrc;
                popupSlidesTabsList[i].src = imgItem.currentSrc;
            } else {
                popupSlidesList[i].parentNode.classList.add('no-active');
                popupSlidesTabsList[i].parentNode.classList.add('no-active');
            }
        }
    } else {
        popupIMG.parentNode.classList.remove('no-active');
        jQuery('.services-popup-slides').addClass('no-active');

        popupIMG.src = popupMainIMG.currentSrc;
    }
});

// Popup
jQuery('.navbar-contact__order').on('click', function () {
    jQuery('.popup').fadeToggle();
    jQuery('.popup').css({'display' : 'flex'});
});
jQuery('.contact__order').on('click', function () {
    jQuery('.popup').fadeToggle();
    jQuery('.popup').css({'display' : 'flex'});
});
jQuery('.popup__close').on('click', function () {
    jQuery('.popup').fadeToggle();
});
jQuery('.popup__overlay').on('click', function () {
    jQuery('.popup').fadeToggle();
});