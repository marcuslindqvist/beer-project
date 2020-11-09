let api = "https://api.punkapi.com/v2/beers/random";
let formElement = document.querySelector("form");
let mainElement = document.querySelector("div.main");
let onBtn = document.querySelector("button.random");
let beerInfoName = document.querySelector("p.beer-info-name");
let beerInfoImage = document.querySelector(
  "body > div.wrapper > main > section.beer-info-box > div > img"
);
let moreInfoTag = document.querySelector("p.beer-info-more");
let beerID;

onBtn.addEventListener("click", randomButton);

moreInfoTag.addEventListener("click", moreInfoClicked);

getData(api, renderBeerInfo);

function randomButton() {
  getData(api, renderBeerInfo);
}
function getData(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => console.log(error));
}

function renderBeerInfo(data) {
  const beer = data[0];
  beerID = beer.id;
  const name = beer.name;
  let image;
  beerInfoName.textContent = name;

  if (beer.image_url) {
    image = beer.image_url;
  } else {
    image = "media/black-beer-flask-lores.png";
  }
  beerInfoImage.src = image;
}

function moreInfoClicked(evt) {
  debugger;
  const url = `info.html?name=${beerID}`;
  document.location.href = url;
}
