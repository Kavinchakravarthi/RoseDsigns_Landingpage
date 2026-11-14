const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");
const year = document.querySelector("#current-year");
const heroVideo = document.querySelector(".hero-art__video");

if (heroVideo) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const syncHeroVideo = () => {
    if (prefersReducedMotion.matches) {
      heroVideo.pause();
      return;
    }

    heroVideo.play().catch((error) => {
      console.error("The hero video could not start playing.", error);
    });
  };

  syncHeroVideo();
  prefersReducedMotion.addEventListener("change", syncHeroVideo);
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      menuToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
      menuToggle.focus();
    }
  });
}
