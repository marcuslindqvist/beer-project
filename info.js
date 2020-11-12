const infoHolder = document.querySelector("section.info-paragraphs");
const searchParams = new URLSearchParams(window.location.search);
const api = "https://api.punkapi.com/v2/beers";
const id = searchParams.get("name");
const page = `${api}/${id}`;

//getData(page, control);
class Beer {
  constructor(öl) {
    this.Name = öl.name;
    this.Description = öl.description;
    this.Brewers_tips = öl.brewers_tips + " Av: " + öl.contributed_by;
    this.Food_Pairing = this.concatArr(öl.food_pairing);
    this.Percentage = öl.abv + " %";
    this.Volume = öl.volume.value + " " + öl.volume.unit;
    this.Hops = this.concatObj(öl.ingredients.hops);
    this.Malt = this.concatObj(öl.ingredients.malt);
    this.Yeast = öl.ingredients.yeast;
    this.Bild_url = öl.image_url;
  }
  concatObj(råvara) {
    let totalRåvara = [];
    for (const p in råvara) {
      let amount = råvara[p].amount.value + " " + råvara[p].amount.unit + " ";
      totalRåvara.push(amount + råvara[p].name);
    }
    //totalRåvara = totalRåvara.slice(0, -2) + ".";
    return totalRåvara;
  }

  concatArr(råvara) {
    let tipsLista = [];
    råvara.forEach((element) => {
      tipsLista.push(element);
    });
    return tipsLista;
  }

  throw(obj, printer, pCreator, createImg, arrayLoop) {
    for (const property in obj) {
      printer(obj, property, pCreator, createImg, arrayLoop);
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
    beer.throw(
      beer,
      this.printer,
      this.pCreator,
      this.createImg,
      this.arrayLoop
    );
  }

  printer(objekt, egenskap, pCreator, createImg) {
    const valueOfProperty = objekt[egenskap];
    let rubrikClass = "rubrikClass";
    let hopsmalt = "groupP";
    if (egenskap == "Bild_url") {
      createImg(valueOfProperty);
    } else if (
      egenskap == "Hops" ||
      egenskap == "Malt" ||
      egenskap == "Food_Pairing"
    ) {
      let str = `${egenskap}: `;
      str = str.replace("_", " ");
      pCreator(str, rubrikClass);

      for (let i = 0; i < objekt[egenskap].length; i++) {
        str = `${valueOfProperty[i]}`;
        pCreator(str, hopsmalt);
      }
    } else {
      debugger;
      let rubrik = egenskap + ": ";
      rubrik = rubrik.replace("_", " ");
      pCreator(rubrik, rubrikClass);
      let str = valueOfProperty;
      pCreator(str, hopsmalt);
    }
  }

  pCreator(key, className) {
    let pElement = document.createElement("p");
    pElement.classList.add(className);
    let pContent = document.createTextNode(key);
    pElement.appendChild(pContent);
    infoHolder.appendChild(pElement);
  }

  createImg(url) {
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
