//! Imports
import { BIKES } from "./data.js";
import { debounce } from "./helpers.js";
// import {  getAllBikesService} from "./services/bike-service.js";
//! DOM Variables
const bikesContainer = document.querySelector(".bikes");
const searchInput = document.querySelector(".searchInput");
const sortIcon = document.querySelector(".sort-icon");
const sortOptions = document.querySelectorAll(".sort-opt");
const sortOptionsWrapper = document.querySelector(".sort-options");
const categoryIcon = document.querySelector(".category-icon");
const cateogoryOptionsContainer = document.querySelector(".category-options");
//! Variables
const CATEGORIES = ["All categories"];
// let BIKES = [];
// async function getAllBikes() {
//   try {
//     const data = await getAllBikesService()
//     BIKES = data?.data;
//   } catch (error) {
//     console.error("Error fetching bikes data:", error);
//   }
// }
BIKES.filter((bike) => {
  if (!CATEGORIES.includes(bike.category)) {
    CATEGORIES.push(bike.category);
  }
});

const sortingFunctions = {
  "price-ascending": (a, b) => a.price - b.price,
  "price-descending": (a, b) => b.price - a.price,
  "title-ascending": (a, b) => a.title.localeCompare(b.title),
  "title-descending": (a, b) => b.title.localeCompare(a.title),
};
//! bind elements
function bindBikes(bikes) {
  bikesContainer.innerHTML = "";
  bikes.forEach((bike) => {
    const bikeCard = document.createElement("div");
    bikeCard.classList.add("bikeCard");
    const imageBox = document.createElement("div");
    imageBox.classList.add("bike-image-box");
    const image = document.createElement("img");
    image.classList.add("bike-photo");
    image.src = bike.imagePath;
    image.alt = bike.title;
    imageBox.append(image);
    const h3 = document.createElement("h3");
    h3.classList.add("bike-title");
    h3.textContent = bike.title;
    const p = document.createElement("p");
    p.classList.add("bike-desc");
    p.textContent = bike.description;
    const span = document.createElement("span");
    span.classList.add("bike-price");
    span.textContent = `${bike.price}AZN`;
    bikeCard.addEventListener("click", () => {
      window.location.href = `bike.html?id=${bike.id}`;
    });
    bikeCard.append(imageBox, h3, p, span);
    bikesContainer.append(bikeCard);
  });
}
function bindCategory(categories) {
  cateogoryOptionsContainer.innerHTML = "";
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.classList.add("category-opt");
    div.textContent = category;
    div.addEventListener("click", () => {
      debouncedFilterByCategories(category);
    });
    cateogoryOptionsContainer.append(div);
  });
}
//!Debounced Event Listener Functions
//* search
function searchInputQuery(e) {
  const searchValue = e.target.value.toLowerCase();
  const filteredBikes = BIKES.filter((bike) => {
    return bike.title.toLowerCase().includes(searchValue);
  });
  bindBikes(filteredBikes);
}
const debouncedInputSearch = debounce(searchInputQuery);
//* sort
function sortByOptions(option) {
  sortOptionsWrapper.classList.remove("sort-active");
  const sortType = option.classList[0];
  const sortingFunction = sortingFunctions[sortType];
  if (sortingFunction) {
    const sortedBikes = BIKES.slice().sort(sortingFunction);
    bindBikes(sortedBikes);
  }
}
const debouncedSort = debounce(sortByOptions);
//* category
function filterByCategories(category) {
  cateogoryOptionsContainer.classList.remove("sort-active");
  if (category === "All categories") {
    bindBikes(BIKES);
  } else {
    const filteredCategoryBikes = BIKES.filter(
      (bike) => bike.category === category
    );
    bindBikes(filteredCategoryBikes);
  }
}
const debouncedFilterByCategories = debounce(filterByCategories);
//!event Listeners
searchInput.addEventListener("input", debouncedInputSearch);
categoryIcon.addEventListener("click", () => {
  cateogoryOptionsContainer.classList.toggle("sort-active");
});
sortIcon.addEventListener("click", () => {
  sortOptionsWrapper.classList.toggle("sort-active");
});
sortOptions.forEach((option) => {
  option.addEventListener("click", () => {
    debouncedSort(option);
  });
});
//! Initial function starts
async function initialRenderFunctions() {
  // await getAllBikes();
  bindBikes(BIKES);
  bindCategory(CATEGORIES);
}
window.addEventListener("DOMContentLoaded", initialRenderFunctions);

