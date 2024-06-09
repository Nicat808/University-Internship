const favouritesContainer = document.querySelector(".favs-wrapper")

const favourites = JSON.parse(localStorage.getItem("favouritesArray")) || []

function bindFavourites(favs) {
  if (favs.length === 0) {
    favouritesContainer.innerHTML = "Favourites is empty ..."
    return
  }
  favouritesContainer.innerHTML = ""
  favs.forEach((fav)=>{
    const layout = document.createElement("div")
    layout.className = "favBox"
    const imageBox = document.createElement("div")
    imageBox.className = "imageBox"
    imageBox.addEventListener("click",()=>{
      window.location.href = `bike.html?id=${fav.id}`;
    })
    const img = document.createElement("img")
    img.src = fav.imagePath;
    img.alt = fav.title;
    const name = document.createElement("h3")
    name.textContent = fav.title
    const desc = document.createElement("p")
    desc.textContent = fav.description
    const price = document.createElement("span")
    price.textContent = `${fav.price} AZN`

    imageBox.append(img)
    layout.append(imageBox,name,desc,price)
    favouritesContainer.append(layout)


  })

  
}


async function initialRenderFunctions() {
  bindFavourites(favourites)
  }
  window.addEventListener("DOMContentLoaded", initialRenderFunctions);