function newAccordian(title, id) {
  let accordian = `
  <div class="accordion-item" id="item${id}">
      <h2 class="accordion-header" id="heading${id}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
              ${title}
          </button>
      </h2>
      <div id="collapse${id}" class="accordion-collapse collapse" aria-labelledby="heading${id}" data-bs-parent="#data">
      </div>
  </div>`;
  return accordian;
}

function newCarousel(id, innerId) {
  let carousel = `
  <div id="carousel${id}" class="carousel slide" data-bs-ride="carousel">
      <div id="${innerId}" class="carousel-inner">
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carousel${id}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carousel${id}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
      </button>
  </div>`
  return carousel;
}

function newCarouselInner(id, firstItem) {
  let carouselInner;
  if (firstItem) {
      carouselInner = `<div id=${id} class="carousel-item active"></div>`;
  }
  else {
      carouselInner = `<div id=${id} class="carousel-item"></div>`;
  }
  return carouselInner;
}

function newCard(item) {
  let card = `
  <div class="card">
      <img src="${item.enclosure.link}" class="card-img-top carousel-image" alt="image">
      <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${item.author}</h6>
          <p class="card-subtitle text-secondary">${item.pubDate}</p>
          <p class="card-text">${item.description}</p>
          <a href="${item.link}" class="stretched-link" target="_blank"></a>
      </div>
  </div>`;
  return card;
}

let getId = () => Math.random().toString(36).substr(2, 9);

async function populateData() {
  for (let x = 0; x < magazines.length; x++) {
      let url = magazines[x];
      //Getting API response for the corresponding url
      let apiResponse = await fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURI(url))
      //Fetching data from the response
      let fetchedData = await apiResponse.json()

      let accordianInnerId = getId();
      let accordian = newAccordian(fetchedData.feed.title, accordianInnerId);
      document.getElementById("data").innerHTML += accordian;
      if (x == 0) {
          document.getElementById("collapse" + accordianInnerId).classList.add("show");
      }

      let carouselId = getId();
      let carouselInnerId = getId();
      let carousel = newCarousel(carouselId, carouselInnerId);
      document.getElementById("collapse" + accordianInnerId).innerHTML += carousel;

      let cardItems = fetchedData.items
      for (let y in cardItems) {
          let cardId = getId();
          let carouselInner = newCarouselInner(cardId, y == 0);
          document.getElementById(carouselInnerId).innerHTML += carouselInner;

          let card=newCard(cardItems[y]);
          document.getElementById(cardId).innerHTML+=card;
      }
      
  }
}

populateData();