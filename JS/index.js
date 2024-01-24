//Player class to track player name and score stats

class Player {
    #wins = 0;
    #draws = 0;
    #lose = 0;

    constructor (name) {
        this.name = name;
    }

    getWins() {
        return this.#wins;
    }

    setWins() {
        this.#wins += 1;
    }
    
    getDraws() {
        return this.#draws;
    }

    setDraws() {
        this.#draws += 1;
    } 

    getLose() {
        return this.#lose;
    }

    setLose() {
        this.#lose += 1;
    }

    getTotalGamesPlayed() {
        return this.#wins + this.#draws + this.#lose;
    }
}

//GAME LOGIC

//Game set-up

let compPlayer = new Player("Computer");
let humanPlayer;

//Variables
const gameChoice = ["Rock","Paper","Scissors"];
let result = null;
let inPlay = false;

//Make choices
function playGame(pc) {
    let compChoice = gameChoice[Math.floor(Math.random() * 3)];
    let playerChoice = pc;

    //Find out result
    if(compChoice===playerChoice) { //draw
        compPlayer.setDraws();
        humanPlayer.setDraws();
        updateResult(compChoice,playerChoice,2);
    } else if(compChoice==="Rock") {
        if(playerChoice==="Paper") {
            humanPlayerWin(compChoice,playerChoice,0); //player wins
        } else {
            compPlayerWin(compChoice,playerChoice,1); //computer wins
        }
    } else if(compChoice==="Paper") {
        if(playerChoice==="Scissors") {
            humanPlayerWin(compChoice,playerChoice,0); //player wins
        } else {
            compPlayerWin(compChoice,playerChoice,1); //computer wins
        }
    } else if(compChoice==="Scissors") {
        if(playerChoice==="Rock") {
            //player wins
            humanPlayerWin(compChoice,playerChoice,0);
        } else {
            compPlayerWin(compChoice,playerChoice,1); //computer wins
        }
    }
}

//Helper functions

//Updates the result string
function updateResult(cc,pc,outcome) {
    
    result = "Computer: " + cc + " Player: " + pc;

    switch(outcome) {
        case 0: // human player win
            result += " " + humanPlayer.name + " WINS!";
            return result;
            break;
        case 1: // human player lose
            result += " " + humanPlayer.name + " LOSES!";
            return result;
            break;
        case 2: // draw
            result += " It's a DRAW!";
            return result;
            break;
    }
}

//Human player win
function humanPlayerWin(cc,pc,outcome) {
    humanPlayer.setWins();
    compPlayer.setLose();
    updateResult(cc,pc,outcome);
}

//Computer player win
function compPlayerWin(cc,pc,outcome) {
    humanPlayer.setLose();
    compPlayer.setWins();
    updateResult(cc,pc,outcome);
}

//Interaction with page

let nameOutput = document.getElementById("gameSection_name");
let nameForm = document.getElementById("playerForm");
let nameFormSubmit = document.getElementById("nameFormSubmit");

nameForm.addEventListener('click', (event) => {
    event.preventDefault();
});

nameFormSubmit.addEventListener('click',() => {
    try {
        let nameInput = document.getElementById("playerName").value;
        if(nameInput==="") throw "No name entered";
        nameOutput.innerHTML = "Ready to play " + nameInput;
        humanPlayer = new Player(nameInput); 
        inPlay = true;
        playerForm.style.display = "none";
        playerFormH3.style.display = "none";
        gameForm.style.display = "flex";
    }
    catch(err) {
        alert(err);
    } 
});

let gameForm = document.getElementById("gameForm");
let playerForm = document.getElementById("playerForm");
let playerFormH3 = document.getElementById("playerFormH3");
let nextGameForm = document.getElementById("nextGameForm");
let newGameBtn = document.getElementById("nextGameFormNewGameBtn");
let gameSectionResult = document.getElementById("gameSectionResult");
let rockBtn = document.getElementById("gameFormRockBtn");
let paperBtn = document.getElementById("gameFormPaperBtn");
let scissorBtn = document.getElementById("gameFormScissorBtn");

newGameBtn.addEventListener('click',newGameBtnAction);
rockBtn.addEventListener('click',() => {gameBtn(gameChoice[0])});
paperBtn.addEventListener('click',() => {gameBtn(gameChoice[1])});
scissorBtn.addEventListener('click',() => {gameBtn(gameChoice[2])});

function gameBtn(pc) {
    if(humanPlayer!=null && inPlay) {
        playGame(pc);
        inPlay = false;
        nextGameForm.style.display = "flex";
        gameSectionResult.style.display = "flex";
        gameSectionResult.innerHTML = result;
    }
}

function newGameBtnAction() {
    inPlay = true;
    nextGameForm.style.display = "none";
    gameSectionResult.style.display = "none";
}

function newPlayerBtn() {
    //in here hide game sectiion and reshow new player section
}