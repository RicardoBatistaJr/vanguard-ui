var cardList = JSON.parse(localStorage["cardList"]);
var selectedCard = localStorage["selectedCard"];

cardList.map((card) => {
  if (card.id == selectedCard) {
    const cardImage = "<img id=" + card.id + ' src="' + card.imageurl + '">';
    document.querySelector("#div-cards").innerHTML += cardImage;

    document.getElementById("name").innerHTML = card.name;
    document.getElementById("clan").innerHTML = card.clan;
    document.getElementById("effect").innerHTML = card.effect;
    document.getElementById("flavor").innerHTML = card.flavor;
  }
});
