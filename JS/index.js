import Player from "./player.js";

//GAME LOGIC

//Game set-up

const compPlayer = new Player("Computer");
let humanPlayer;
const players = [compPlayer];
//localStorage.setItem("players",JSON.stringify(players))

//Game variables
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
    
    result = "Computer: " + cc + "<br>" + humanPlayer.name + ": " + pc + "<br>";

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

//INTERATION WITH PAGE

//Elements
let nameOutput = document.getElementById("gameSection_name");
let nameForm = document.getElementById("playerForm");
let nameFormSubmit = document.getElementById("nameFormSubmit");
let gameForm = document.getElementById("gameForm");
let playerForm = document.getElementById("playerForm");
let playerFormH3 = document.getElementById("playerFormH3");
let nextGameForm = document.getElementById("nextGameForm");
let newGameBtn = document.getElementById("nextGameFormNewGameBtn");
let newPlayerBtn = document.getElementById("nextGameFormNewPlayerBtn");
let gameSectionResult = document.getElementById("gameSectionResult");
let rockBtn = document.getElementById("gameFormRockBtn");
let paperBtn = document.getElementById("gameFormPaperBtn");
let scissorBtn = document.getElementById("gameFormScissorBtn");
let scoreboard = document.getElementById("scoreboard");

//Scoreboard variables to be updated for the player
let newPlayerRow; //the row
let p; //position
let pl; //player name
let w; //wins
let d; //draws
let l; //losses
let numOfPlayers = 2;

//Event listners

//Removes form default behaviour
nameForm.addEventListener('click', (event) => {
    event.preventDefault();
});

//For the player submit button
nameFormSubmit.addEventListener('click',() => {
    try {
        //Get the name entered in the form
        let nameInput = document.getElementById("playerName").value;
        //Check a name entered and not blank and throw error
        if(nameInput==="") throw "No name entered";
        //If name good then update page and scoreboard followed by setting game to in play
        nameOutput.innerHTML = "Ready to play " + nameInput;
        humanPlayer = new Player(nameInput); 
        players.push(humanPlayer);
        inPlay = true;
        playerForm.style.display = "none";
        playerFormH3.style.display = "none";
        gameForm.style.display = "flex";

        newPlayerRow = scoreboard.insertRow();

        p = newPlayerRow.insertCell(0);
        pl = newPlayerRow.insertCell(1);
        w = newPlayerRow.insertCell(2);
        d = newPlayerRow.insertCell(3);
        l = newPlayerRow.insertCell(4);

        p.innerHTML = numOfPlayers;
        pl.innerHTML = humanPlayer.name;
        w.innerHTML = "0";
        d.innerHTML = "0";
        l.innerHTML = "0";

        //Incremement number of players so next person added at botton of the scoreboard
        ++numOfPlayers;
    }
    //catch error of no name entered
    catch(err) {
        alert(err);
    } 
});

newGameBtn.addEventListener('click',newGameBtnAction);
newPlayerBtn.addEventListener('click',newPlayerBtnAction);
rockBtn.addEventListener('click',() => {gameBtn(gameChoice[0])});
paperBtn.addEventListener('click',() => {gameBtn(gameChoice[1])});
scissorBtn.addEventListener('click',() => {gameBtn(gameChoice[2])});

//Button functions

//Submit the player's game choice
//Display the result
//Show the next game form
function gameBtn(pc) {
    if(humanPlayer!=null && inPlay) {
        playGame(pc);
        inPlay = false;
        nextGameForm.style.display = "flex";
        gameSectionResult.style.display = "flex";
        gameSectionResult.innerHTML = result;
        updateScoreBoard();
    }
}

//Start a new game
function newGameBtnAction() {
    inPlay = true;
    nextGameForm.style.display = "none";
    gameSectionResult.style.display = "none";
}

//Hide the game form
//Re-show the player form
function newPlayerBtnAction() {
    playerForm.style.display = "flex";
    playerFormH3.style.display = "flex";
    gameForm.style.display = "none";
    inPlay = false;
    nextGameForm.style.display = "none";
    gameSectionResult.style.display = "none";
}


//Update the scoreboard following the game
function updateScoreBoard() {

    //sort players array by who has the most wins
    players.sort((a,b) => b.getWins() - a.getWins());

    console.log(players);
    //make updates to scoreboard
    let rowToUpdate;

    for(let i=0;i<players.length;++i) {
        rowToUpdate = scoreboard.rows[i+1].cells;
        rowToUpdate[0].innerHTML = i+1;
        rowToUpdate[1].innerHTML = players[i].name;
        rowToUpdate[2].innerHTML = players[i].getWins();
        rowToUpdate[3].innerHTML = players[i].getDraws();
        rowToUpdate[4].innerHTML = players[i].getLose();
    }
}

//next task is storage and then recall it when page is reloaded