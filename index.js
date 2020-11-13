let api = "https://api.punkapi.com/v2/beers/random";
let onBtn = document.querySelector("button.random");
let beerInfoName = document.querySelector("p.beer-info-name");
let beerInfoImage = document.querySelector("div.beer-info-img > img");
let moreInfoTag = document.querySelector("p.beer-info-more");
let beerID;

getData(api, renderBeerInfo);

onBtn.addEventListener("click", randomButton);

moreInfoTag.addEventListener("click", moreInfoClicked);

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
  const url = `info.html?name=${beerID}`;
  document.location.href = url;
}
