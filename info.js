const infoHolder = document.querySelector("section.info-paragraphs");
const searchParams = new URLSearchParams(window.location.search);
const api = "https://api.punkapi.com/v2/beers";
const id = searchParams.get("name");
const page = `${api}/${id}`;

//getData(page, control);

class Beer {
  constructor(öl) {
    this.Namn = öl.name;
    this.Beskrivning = öl.description;
    this.Bild_url = öl.image_url;
    this.Alkoholhalt = öl.abv + " %";
    this.Volym = öl.volume.value + " " + öl.volume.unit;
    this.Humle = this.concatObj(öl.ingredients.hops);
    this.Malt = this.concatObj(öl.ingredients.malt);
    this.Jäst = öl.ingredients.yeast;
    this.Mat_tips = this.concatArr(öl.food_pairing);
    this.Brygg_tips = öl.brewers_tips + " Av: " + öl.contributed_by;
  }
  concatObj(råvara) {
    let totalRåvara = "";
    for (const p in råvara) {
      let amount = råvara[p].amount.value + " " + råvara[p].amount.unit + " ";
      totalRåvara += amount + råvara[p].name + ", ";
    }
    totalRåvara = totalRåvara.slice(0, -2) + ".";
    return totalRåvara;
  }

  concatArr(råvara) {
    let tipsLista = [];
    råvara.forEach((element) => {
      tipsLista += element + ", ";
    });
    tipsLista = tipsLista.slice(0, -2) + ".";
    return tipsLista;
  }

  throw(obj, printer, pCreator, createImg) {
    for (const property in obj) {
      printer(obj, property, pCreator, createImg);
    }
  }
}

class Control {
  constructor(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.eventMaker(data);
      })
      .catch((error) => console.log(error));
  }

  eventMaker(data) {
    const beer = new Beer(data[0]);
    beer.throw(beer, this.printer, this.pCreator, this.createImg);
  }

  printer(objekt, egenskap, pCreator, createImg) {
    const valueOfProperty = objekt[egenskap];

    if (egenskap == "Bild_url") {
      createImg(valueOfProperty);
    } else {
      let str = `${egenskap}: ${valueOfProperty}`;
      pCreator(str);
    }
  }

  pCreator(key) {
    let pElement = document.createElement("p");
    let pContent = document.createTextNode(key);
    pElement.appendChild(pContent);
    infoHolder.appendChild(pElement);
  }

  createImg(url) {
    debugger;
    let imgHolder = document.querySelector(".beer-info-img");
    let imgElement = document.createElement("img");
    if (url == null) {
      url = "media/black-beer-flask-lores.png";
    }
    imgElement.src = url;
    imgElement.height = 150; //set atributes like height, width mm.
    imgHolder.appendChild(imgElement);
  }
}

let köra = new Control(page);
