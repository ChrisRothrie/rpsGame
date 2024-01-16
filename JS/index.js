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

//Create the players

let compPlayer = new Player("Computer");
let humanPlayer = new Player("Chris"); 

//Gme logic

//Variables
let inPlay = true;
const gameChoice = ["Rock","Paper","Scissors"];
let result = null;

//Make choices
let compChoice = gameChoice[Math.floor(Math.random() * 3)];
let playerChoice = gameChoice[2]; //based on button entry

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

console.log(result);
console.log(compPlayer);
console.log(humanPlayer);

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