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

//
function generateRandomValue(minValue:number, maxValue:number):number{

    var random = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    
    //TODO: use random to generate a number between min and max

    return random;
}

// Validates and creates a new player based on the player name
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

function changePlayers():void{
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;
    
    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if(currentPlayerName == player1.name){
        currentPlayerName = player2.name;
    }
    else{
        currentPlayerName = player1.name;
    }

    (<HTMLElement>document.getElementById("current")).innerText = currentPlayerName;
}

window.onload = function(){
    let newGameBtn = document.getElementById("new_game") as HTMLButtonElement;
    newGameBtn.onclick = createNewGame;

    (<HTMLButtonElement>document.getElementById("roll")).onclick = rollDie;

    (<HTMLButtonElement>document.getElementById("hold")).onclick = holdDie;
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

function rollDie():void{
    let currTotalDisplay = (<HTMLInputElement>document.getElementById("total"));
    let currTotal = parseInt(currTotalDisplay.value);
    let dieDisplay = (<HTMLInputElement>document.getElementById("die"));
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let playerRoll = generateRandomValue(1, 6);

    //if the roll is 1
    if (playerRoll == 1){
        //  reset current total to 0
        currTotalDisplay.value = "0";
        //  change players
        changePlayers();
    }
    else{
        currTotal += playerRoll;
        currTotalDisplay.value = currTotal.toString();
    }
    
    dieDisplay.value = playerRoll.toString();
}

function holdDie():void{
    //get the current turn total
    let currTotalDisplay = (<HTMLInputElement>document.getElementById("total"));
    let currTotal = parseInt(currTotalDisplay.value);
    
    //determine who the current player is
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;

    if(currentPlayerName == player1.name){
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