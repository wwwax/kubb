const burgerBtn = document.querySelector('.burger_btn');
const menuMobile = document.querySelector('.menu-mobile');
let isMenuMobileOpen = false;

burgerBtn.addEventListener('click', onBurgerBtnClick);

function onBurgerBtnClick() {
  if (!isMenuMobileOpen) {
    burgerBtn.classList.add('active');
    menuMobile.classList.add('active');
    isMenuMobileOpen = true;
  } else {
    burgerBtn.classList.remove('active');
    menuMobile.classList.remove('active');
    isMenuMobileOpen = false;
  }
}
