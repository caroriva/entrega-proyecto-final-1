const toggleButton = document.querySelector(".toggle-menu");
const navbarList = document.querySelector(".navbar-list");
const navbarLinks = document.querySelectorAll(".navbar-list a");

toggleButton.addEventListener("click", toggleMenu);

function toggleMenu() {
  navbarList.classList.toggle("show");
}

navbarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarList.classList.contains("show")) {
      toggleMenu();
    }
  });
});
