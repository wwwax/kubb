const burgerBtn = document.querySelector('.burger_btn');
const menu = document.querySelector('.menu');
let isMenuOpen = false;

burgerBtn.addEventListener('click', onBurgerBtnClick);

function onBurgerBtnClick() {
  if (!isMenuOpen) {
    burgerBtn.classList.add('active');
    menu.classList.add('active');
    isMenuOpen = true;
  } else {
    burgerBtn.classList.remove('active');
    menu.classList.remove('active');
    isMenuOpen = false;
  }
}
