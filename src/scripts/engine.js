const state = {
    score:{
        playScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1BOX: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector("#computer-cards"),
    },
    actions: {
        button: document.getElementById("next-duel"),
    }
};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
};

const pathImages = "./src/assets/icons/";

async function getRandomCardId() {
    const randomIndex = math.floor(math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("heigth", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if (fieldSide === playerSides.player1) {     
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(idCard);
        });

        cardImage.addEventListener("click", () => { 
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }
    
        return cardImage;
}

async function showHiddenCardFieldImages(value){

    if(value === true) {
        state.fieldCards.player.style.display = 'block';
        state.fieldCards.computer.style.display = 'block';
    }
     else if(value === false) {
        state.fieldCards.player.style.display = 'none';
        state.fieldCards.computer.style.display = 'none'; 
    }
}

async function hiddenCardDetails(){
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
}

async function setCardsField (cardId){
    
    await removeAllcardsImages();

    let computerCardId = await getRandomCardId();
    
    await showHiddenCardFieldsImages(true);
    
    // state.fieldCards.player.style.display = "block";
    // state.fieldCards.computer.style.display = "block";

    await hiddenCardDetails();

    // state.fieldCards.player.src = cardData[cardId].img;
    // state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults (cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);

}

async function checkDuelResults( playerCardId, computerCardId){
    
    let duelResults = "draw";
    await playerAudio(duelResults);
    let playerCard = cardData[playerCardId];

    if(playerCard.WinOf.includes(computerCardId)) {
        duelResults = "win";
        await playerAudio(duelResults);
        state.score.playerScore++;
    }

    if(playerCard.LoseOf.includes(ComputerCardId)) {
        duelResults = "lose";
        await playerAudio(duelResults);
        state.score.computerScore++;
    }
    await playerAudio(duelResults);

    return duelResults;
}

async function removeAllCardsImages() {
    let {computerBOX, player1BOX } = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1BOX.querySelectorAll("img");
    
    imgElements.forEach((img) => img.remove());
}

async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Atribute : " + cardData[index].type;
}

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LoseOf: [0]
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [1],
    },
];

async function drawCards(cardsNumbers, fieldSide){
    for (let i = 0; i < cardsNumbers; i++ ){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage (randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
        
    
    }
}

async function updateScore(){
        state.score.scoreBOX.innerText = `Win: ${state.score.playScore} | Lose: ${state.score.computerScore}`;
} 


async function drawButton(text){
    
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";

}

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

async function playAudio(status){
    const audio = new Audio (`./src/assets/audios/${status}.wav`);
    
    try{
        audio.play();
    } catch {}
   
}

function init() {
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.play();
}

init();