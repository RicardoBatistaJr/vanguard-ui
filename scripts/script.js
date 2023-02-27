const urlByObject = "http://localhost:8080/v1/getCardsByObject?";
const urlById = "http://localhost:8080/v1/getCardById?";

function searchSubmit() {
  const value = document.getElementById("cardType").value;
  const type = document.getElementById("selector").value;
  if (type == "id") {
    searchById();
  } else {
    searchByType(1, value, type);
  }
}

async function searchById() {
  const cardId = document.getElementById("cardType").value;
  const response = await fetch(
    `${urlById}` +
      new URLSearchParams({
        id: cardId,
      })
  );
  mapImages(response);
}

async function searchByType(page, value, type) {
  localStorage["currentPage"] = page;
  localStorage["currentValue"] = value;
  localStorage["currentType"] = type;

  const clanParam = new URLSearchParams({
    clan: value,
    page: page,
  });
  const nameParam = new URLSearchParams({
    name: value,
    page: page,
  });
  const gradeParam = new URLSearchParams({
    grade: value,
    page: page,
  });

  switch (type) {
    case "clan":
      const clanResponse = await fetch(`${urlByObject}` + clanParam);
      mapImages(clanResponse);
      break;
    case "name":
      const nameResponse = await fetch(`${urlByObject}` + nameParam);
      mapImages(nameResponse);
      break;
    case "grade":
      const gradeResponse = await fetch(`${urlByObject}` + gradeParam);
      mapImages(gradeResponse);
      break;
  }
  clearButtons();
  nextAndPreviousButtons();
}

function clearButtons() {
  var e = document.getElementById("nextButtonId");
  var e2 = document.getElementById("previousButtonId");
  if (typeof e != "undefined" && e != null) {
    e.remove();
  }
  if (typeof e2 != "undefined" && e2 != null) {
    e2.remove();
  }
}

function nextAndPreviousButtons() {
  var page = localStorage["currentPage"];
  var value = localStorage["currentValue"];
  var type = localStorage["currentType"];

  const nextBtn = document.createElement("button");
  nextBtn.innerHTML = "Próximo";
  nextBtn.id = "nextButtonId";
  nextBtn.className = "previous-next-button";
  nextBtn.onclick = function onClick() {
    nextPage = Number(page) + 1;
    searchByType(nextPage, value, type);
  };

  const previousBtn = document.createElement("button");
  previousBtn.innerHTML = "Anterior";
  previousBtn.id = "previousButtonId";
  previousBtn.className = "previous-next-button";
  previousBtn.onclick = function onClick() {
    previousPage = Number(page) - 1;
    searchByType(previousPage, value, type);
  };

  var div = document.querySelector("#general-div");

  if (page > 1) {
    div.appendChild(previousBtn);
    div.appendChild(nextBtn);
  } else {
    div.appendChild(nextBtn);
  }
}

async function mapImages(response) {
  const data = await response.json();
  var list = [];
  if (Array.isArray(data)) {
    list = data;
  } else {
    list.push(data);
  }
  localStorage["cardList"] = JSON.stringify(list);
  document.querySelector("#div-cards").innerHTML = "";
  list.map((card) => {
    const element =
      "<img id=" +
      card.id +
      ' src="' +
      card.imageurl +
      '" onclick="cardDetails(\' ' +
      card.id +
      "')\">";
    const cardName = "<h2>Busca</h2>";
    document.querySelector("#div-cards").innerHTML += element;
    document.querySelector("#div-cards").innerHTML += cardName;
  });
}

function cardDetails(id) {
  localStorage["selectedCard"] = id;
  window.location = "cardDetails.html";
}
