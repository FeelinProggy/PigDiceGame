class Player{
    name!:string;
    score!:number;

    constructor(name:string){
        this.name = name;
        this.score = 0;
    }
}

let player1:Player;
let player2:Player;
let currentPlayer:Player;

window.onload = function(){
    let newGameBtn = document.getElementById("new_game") as HTMLButtonElement;
    newGameBtn.onclick = createNewGame;

    (<HTMLButtonElement>document.getElementById("roll")).onclick = rollDie;

    (<HTMLButtonElement>document.getElementById("hold")).onclick = holdDie;
}

/**
 * Validates name input and creates a new player object
 * @param player - using the HTML id to get the HTMLInputElement value
 *   and then using that value to name and create the new Player object
 * @returns a new Player object
 */
function getPlayer(player):Player | null{
    let hasValidName = false;

    let playerTextBox = (<HTMLInputElement>document.getElementById(player));
    let playerName:string = playerTextBox.value;
    
    if(playerName.trim() != ""){
        hasValidName = true;
    }
    else {
        alert( player + " must enter a name to play!");
        return null;
    }

    if (hasValidName){
        let newPlayer = new Player(playerName);
        return newPlayer;
    }
    else {
        return null;
    }
}

function createNewGame(){
    
    player1 = getPlayer("player1");
    player2 = getPlayer("player2");
    
    if (player1 != null && player2 != null){
        //if both players do have a name start the game!
        (<HTMLElement>document.getElementById("turn")).classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        //lock in player names and then change players
        (<HTMLInputElement>document.getElementById("player1")).setAttribute("disabled", "disabled");
        (<HTMLInputElement>document.getElementById("player2")).setAttribute("disabled", "disabled");
        changePlayers();
    }    
}

function changePlayers():void{
       
    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if(currentPlayer == player1){
        currentPlayer = player2;
    }
    else{
        currentPlayer = player1;
    }

    (<HTMLElement>document.getElementById("current")).innerText = currentPlayer.name;
}

/**
 * rollDie function calls generateRandomValue() to simulate the rolling die,
 * displays the roll result and running total, and changes players if the roll is 1.
 */
function rollDie():void{
    let currTotalDisplay = (<HTMLInputElement>document.getElementById("total"));
    let currTotal = parseInt(currTotalDisplay.value);
    let dieDisplay = (<HTMLInputElement>document.getElementById("die"));
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let playerRoll = generateRandomValue(1, 6);

    // display the roll result
    dieDisplay.value = playerRoll.toString();

    //if the roll is 1
    if (playerRoll == 1){
        //  reset current total to 0
        currTotalDisplay.value = "0";
        //  change players
        changePlayers();
    }
    else{
        // keep a running total of the rolls
        currTotal += playerRoll;
        // display the current total
        currTotalDisplay.value = currTotal.toString();
    }
    let potentialScore = currentPlayer.score + currTotal;

    if (potentialScore >= 20){
        holdDie();
        changePlayers();
        declareWinner(currentPlayer);
    }
}
/**
 * 
 */
function holdDie():void{
    //get the current turn total
    let currTotalDisplay = (<HTMLInputElement>document.getElementById("total"));
    let currTotal = parseInt(currTotalDisplay.value);
    
    //determine who the current player is
    currentPlayer.name = (<HTMLElement>document.getElementById("current")).innerText;

    if(currentPlayer.name == player1.name){
        player1.score += currTotal;
        (<HTMLInputElement>document.getElementById("score1")).value = player1.score.toString();
    }
    else{
        player2.score += currTotal;
        (<HTMLInputElement>document.getElementById("score2")).value = player2.score.toString();
    }
    //add the current turn total to the player's total score

    //reset the turn total to 0
    currTotalDisplay.value = "0";
    //change players
    changePlayers();
}

// Generates a random number between the min and max values inclusive
function generateRandomValue(minValue:number, maxValue:number):number{
    // Math.random() generates a decimal between 0 and 1. Multiplying by the range
    // will give a decimal/percentage between 0 and range. Math.floor() removes the
    // decimal adding one will make the range inclusive of the max value.
    var random = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    
    return random;
}

function declareWinner(winner:Player){
    
    alert(winner.name + " wins! \nScore: " + winner.score + "\n\nLet's play again!");
    location.reload();
}