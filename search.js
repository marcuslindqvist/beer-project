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
ulElement.addEventListener("click", onUlClicked);

let pageCount = document.querySelector("#current");
pageCount.innerHTML = "";

formElement.addEventListener("submit", onSubmit);

let cache = [];

//Denna validerar datumsökningen. Kollar så inte bryggt före är ett äldre datum än bryggt efter. Kollar också så att bryggd före inte är tom.
function dateCheck(evt) {
  if (
    (evt.target[4].value !== "" && evt.target[3].value > evt.target[4].value) ||
    (evt.target[6].value !== "" && evt.target[5].value > evt.target[6].value)
  ) {
    alert(
      "Se till att: Bryggt före < bryggt efter. Att alk.procent lägre än < alk.procent högre än!"
    );
    return false;
  }
  return true;
}
//Denna gör om formatet på datumet från YYYY-MM till MM-YYYY som den behöver va i urlen
function reverseDate(evt) {
  let split = evt.target[i].value.split("-");
  let newDate = split[1] + "-" + split[0];
  urlAdd += evt.target[i].alt + newDate;
}

//Styr vad som händer när man trycker Submit
function onSubmit(evt) {
  currentPage = 1;
  cache = [];
  if (dateCheck(evt) !== false) {
    urlAdd = "&per_page=10";
    for (i = 0; i < evt.target.length - 1; i++) {
      if (evt.target[i].value == "") {
        continue;
      } else if (i == 3 || i == 4) {
        reverseDate(evt);
      } else {
        urlAdd += evt.target[i].alt + evt.target[i].value;
      }
    }
    url = api + currentPage + urlAdd;
    getData(url, render);
    evt.preventDefault();
  }
}

//Hämta data från punk API
function getData(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      cache.push(data);
      callback(data);
    })
    .catch((error) => console.log(error));
}
//Skapar upp objekt
function render(data) {
  //Tar bort existerande listobjekt
  while (ulElement.firstChild) {
    ulElement.removeChild(ulElement.firstChild);
  }

  for (let i = 0; i < data.length; i++) {
    const beer = data[i];

    const liElement = document.createElement("li");
    liElement.setAttribute("name", beer.id);
    liElement.textContent = beer.name;
    ulElement.appendChild(liElement);
  }
  pageCount.innerHTML = currentPage;
  mainElement.appendChild(ulElement);
}

//funktion för klick på list-item. skapar upp url som skickar till info-sidan
function onUlClicked(evt) {
  const id = evt.target.getAttribute("name");
  const url = `info.html?name=${id}`;
  document.location.href = url;
}

//bläddra bakåt
previous.onclick = function (evt) {
  if (currentPage !== 1) {
    url = api + (currentPage - 1) + urlAdd;
    currentPage--;
    let cacheResult = checkCache();
    if (cacheResult) {
      render(cacheResult);
    } else {
      getData(url, render);
    }
    evt.preventDefault();
    pageCount.innerHTML = currentPage;
  }
};

//bläddra framåt
next.onclick = function (evt) {
  //förhindrar att man bläddrar förbi sista sidan
  if (ulElement.childElementCount == 10) {
    url = api + (currentPage + 1) + urlAdd;
    currentPage++;
    let cacheResult = checkCache();
    if (cacheResult) {
      render(cacheResult);
    } else {
      getData(url, render);
    }
    evt.preventDefault();
    pageCount.innerHTML = currentPage;
  }
};

//Kollar ifall önskad sida är cachad
function checkCache() {
  for (i = 0; i < cache.length; i++) {
    if (currentPage == i + 1) {
      console.log(cache[i]);
      return cache[i];
    }
  }
}
