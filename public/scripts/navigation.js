const menuButton = document.querySelector(".navbar-toggler");
const navigationMenu = document.querySelector("#navbarSupportedContent");

if (menuButton && navigationMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigationMenu.classList.toggle("show");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigationMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        navigationMenu.classList.remove("show");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  });
}
