const burgerBtn = document.querySelector(".burger_btn");
let isBurgerMenuOpen = false;

burgerBtn.addEventListener("click", onBurgerBtnClick);

function onBurgerBtnClick() {
  if (!isBurgerMenuOpen) {
    burgerBtn.classList.add("active");
    isBurgerMenuOpen = true;
  } else {
    burgerBtn.classList.remove("active");
    isBurgerMenuOpen = false;
  }
}
