const api = "https://api.punkapi.com/v2/beers";
const formElement = document.querySelector("form");
const mainElement = document.querySelector("div.main");

//formElement.addEventListener("submit", onSubmit);

function getData(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => console.log(error));
}

function render(data) {
  const ulElement = document.createElement("ul");
  ulElement.addEventListener("click", onUlClicked);
  for (let i = 0; i < data.length; i++) {
    const beer = data[i];

    const liElement = document.createElement("li");
    liElement.setAttribute("name", beer.id);
    liElement.textContent = beer.name;
    ulElement.appendChild(liElement);
  }
  mainElement.appendChild(ulElement);
}

function onUlClicked(evt) {
  const id = evt.target.getAttribute("name");
  const url = `info.html?name=${id}`;
  document.location.href = url;
}

/*Följande e maddys randomkod
const rutaElement = document.querySelector(".ruta");
const api = "https://api.punkapi.com/v2/beers/random";
const onBtn = document.querySelector("button");
("image_url"); //hänvisning till kodraden

onBtn.addEventListener("click", getData);

function getData() {
  while (rutaElement.firstChild) {
    rutaElement.removeChild(rutaElement.firstChild);
  }
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      render(data);

      console.log(data[0].id);
    });
}

function render(data) {
  const beer = data[0];
  const name = beer.name;
  const image = beer.image_url;

  const h1Tag = document.createElement("h1");
  const img = document.createElement("img");

  h1Tag.textContent = name;
  img.src = image;

  rutaElement.appendChild(h1Tag);
  rutaElement.appendChild(img);
}

function onUlClicked(evt) {
  /* function see more för att komma till en annan sida där mer info
 om ölen visas upp

  const id = evt.target.getAttribute("name");
  const url = `myView.html?name=${id}`;
  document.location.href = url;
}
*/
