const burgerBtn = document.querySelector('.burger_btn');
const burgerMenu = document.querySelector('.burger_menu');

let isBurgerMenuOpen = false;

burgerBtn.addEventListener('click', onBurgerBtnClick);

function onBurgerBtnClick() {
  if (!isBurgerMenuOpen) {
    burgerBtn.classList.add('active');
    burgerMenu.classList.add('active');
    isBurgerMenuOpen = true;
  } else {
    burgerBtn.classList.remove('active');
    burgerMenu.classList.remove('active');
    isBurgerMenuOpen = false;
  }
}
