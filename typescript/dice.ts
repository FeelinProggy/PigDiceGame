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

function generateRandomValue(minValue:number, maxValue:number):number{
    var random = Math.random();
    
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
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)

    //if the roll is 1
    //  change players
    //  set current total to 0
    
    //if the roll is greater than 1
    //  add roll value to current total

    //set the die roll to value player rolled
    //display current total on form
}

function holdDie():void{
    //get the current turn total
    //determine who the current player is
    //add the current turn total to the player's total score

    //reset the turn total to 0

    //change players
    changePlayers();
}