const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard}){
    if(cardOne !== clickedCard && !disableDeck){
        clickedCard.classList.add("flip");
        if(!cardOne){
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2){
    if(img1 === img2){
        matched++;
        if(matched==8){
            setTimeout(() => {
               return shuffleCard(); 
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(()=>{
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400)

    setTimeout(()=>{
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200)
}

function shuffleCard(){
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9];
    arr.sort(()=> Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i)=>{
        card.classList.remove("flip");
        let gifTag = card.querySelector(".back-view img");
        gifTag.src = `img/img-${arr[i]}.gif`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach(card =>{
    cardTwo.addEventListener("click", flipCard);
});