// NAVIGATION

const burgerBtn = document.querySelector('.burger_btn');
const menu = document.querySelector('.menu');
const body = document.querySelector('body');
let isMenuOpen = false;

burgerBtn.addEventListener('click', onBurgerBtnClick);

function onBurgerBtnClick() {
  if (!isMenuOpen) {
    burgerBtn.classList.add('active');
    menu.classList.add('active');
    body.classList.add('lock');
    isMenuOpen = true;
  } else {
    burgerBtn.classList.remove('active');
    menu.classList.remove('active');
    body.classList.remove('lock');
    isMenuOpen = false;
  }
}

// SWIPER

new Swiper('.image-slider');
