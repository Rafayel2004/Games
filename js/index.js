const forms = document.querySelectorAll(".form-check-input");
const div = document.querySelector(".container");function cardCreator(count, number){
    if(document.getElementsByClassName("gameContainer").item(0) != null){
        let removeDiv = document.getElementsByClassName("gameContainer");
        removeDiv.item(0).remove();
    }
    let main = document.createElement("div")
    main.className = "gameContainer row";
    for (let i = 0; i < count/2; i++){
        let divImage1 = document.createElement("div")
        let image = document.createElement("img")
        let cardBack = document.createElement("img")
        divImage1.className = "memoryCard";
        divImage1.style.width = 100/number + "%";
        divImage1.dataset.image = cardsNameArray[i];
        cardBack.src = "image/cardBack.jpg";
        cardBack.className = "back";
        // console.log("image/" + cardsNameArray[1] + ".jpg")
        image.src = "image/" +  cardsNameArray[i] +".jpg"
        image.className = "front"
        divImage1.appendChild(cardBack);
        divImage1.appendChild(image);
        main.appendChild(divImage1)
        let divImage2 = divImage1.cloneNode(true);
        main.appendChild(divImage2)
    }
    div.appendChild(main)
    cardsEven()

}
function cardsEven() {
    let cards = document.querySelectorAll(".memoryCard");
    cards.forEach(card => card.addEventListener("click", flip));
    suffle(cards)
}
let cardsNameArray = ["bootstrap" ,"csharp", "c++","github","javascript","jquery","laravel","nodejs","vue","react","ruby","php","python","sass","vscode"]
forms.forEach(form => form.addEventListener("click", checkRadio));
let isFlipped = false;
let firstCard, secondCard;
let lock = false;

function checkRadio (){
    if(this.value == 4){
        cardCreator(12 ,this.value)
    }
    if(this.value == 5){
        cardCreator(20,this.value)
    }
    if(this.value == 6){
        cardCreator(30,this.value)
    }
}
function flip() {
    if (lock) return;
    if (this === firstCard) return;
    this.classList.add("flip");
    if (!isFlipped) {
        isFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    check();
}
function check() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? success() : fail();
}
function success() {
    firstCard.removeEventListener("click", flip);
    secondCard.removeEventListener( "click", flip);
    reset();
}
function fail() {
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove ("flip");
        reset();
    }, 1000);
}
function reset() {
    [isFlipped, lock] = [false, false];
    [firstCard, secondCard] = [null, null];
}
function suffle(cards) {
    cards.forEach( card => {
        let position = Math.floor(Math.random() * 16);
        card.style.order = position;
    });
}