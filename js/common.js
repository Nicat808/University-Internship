const burgerMenuToggler = document.querySelector(".burger-menu");
const burgerMenuWrapper = document.querySelector(".burger-menu-wrapper");
const burgerMenuCloser = document.querySelector(".burger-menu-closer");
burgerMenuToggler.addEventListener("click", () => {
  burgerMenuWrapper.classList.add("burger-menu-active");
});
burgerMenuCloser.addEventListener("click", () => {
  burgerMenuWrapper.classList.remove("burger-menu-active");
});

//Dark-Light-mode-switch
const darkModeToggler = document.querySelector(".dark-mode-wrapper");
const darkModeMobileToggler = document.querySelector(".dark-mode-wrapper-mobile");
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  return localStorageTheme ? localStorageTheme : (systemSettingDark.matches ? "dark" : "light");
}
//get current theme
function getCurrentTheme(){
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
  return currentThemeSetting
}
//Initial switching for OS preferences
function setInitialTheme() {
  document.querySelector("html").setAttribute("data-theme", getCurrentTheme());
}
window.addEventListener("DOMContentLoaded", setInitialTheme);
//switching modes
let currentThemeSetting = getCurrentTheme()
darkModeToggler.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  document.querySelector("html").setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  currentThemeSetting = newTheme;
});
darkModeMobileToggler.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  document.querySelector("html").setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  currentThemeSetting = newTheme;
});