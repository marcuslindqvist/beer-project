const api = "https://api.punkapi.com/v2/beers?page=";
let currentPage = 1;
let url;
let urlAdd;
let searchString;
const formElement = document.querySelector("form");
const mainElement = document.querySelector("section.main");
const previous = document.querySelector("#prev");
const next = document.querySelector("#next");
let ulElement = document.querySelector(
  "body > div.wrapper > main > section > div.beer-info-img > ul"
);
let pageCount = document.querySelector("#current");
pageCount.innerHTML = 1;
formElement.addEventListener("submit", onSubmit);

function onSubmit(evt) {
  debugger;
  searchString = evt.target[0].value;
  urlAdd = `&per_page=10&beer_name=${searchString}`;
  url = api + currentPage + urlAdd;
  getData(url, render);
  evt.preventDefault();
}

function getData(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => console.log(error));
}

function render(data) {
  while (ulElement.firstChild) {
    ulElement.removeChild(ulElement.firstChild);
  }
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

//funktion för klick på list-item. skapar upp url som skickar till info-sidan
function onUlClicked(evt) {
  const id = evt.target.getAttribute("name");
  const url = `info.html?name=${id}`;
  document.location.href = url;
}

//bläddra sida bakåt
previous.onclick = function (evt) {
  if (currentPage !== 1) {
    url = api + (currentPage - 1) + urlAdd;
    getData(url, render);
    evt.preventDefault();
    currentPage--;
    pageCount.innerHTML--;
  }
};

//bläddra sida framåt
next.onclick = function (evt) {
  //förhindrar att man bläddrar förbi sista sidan
  if (ulElement.childElementCount == 10) {
    url = api + (currentPage + 1) + urlAdd;
    getData(url, render);
    evt.preventDefault();
    currentPage++;
    pageCount.innerHTML++;
  }
};
