class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}
let player1;
let player2;
let currentPlayer;
let winningScore = 100;
window.onload = function () {
    let startGameBtn = document.getElementById("start_game");
    startGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function getPlayer(player) {
    let hasValidName = false;
    let playerTextBox = document.getElementById(player);
    let playerName = playerTextBox.value;
    if (playerName.trim() != "") {
        hasValidName = true;
    }
    else {
        alert(player + " must enter a name to play!");
        return null;
    }
    if (hasValidName) {
        let newPlayer = new Player(playerName);
        return newPlayer;
    }
    else {
        return null;
    }
}
function createNewGame() {
    player1 = getPlayer("player1");
    player2 = getPlayer("player2");
    if (player1 != null && player2 != null) {
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}
function changePlayers() {
    if (currentPlayer == player1) {
        currentPlayer = player2;
    }
    else {
        currentPlayer = player1;
    }
    document.getElementById("current").innerText = currentPlayer.name;
}
function rollDie() {
    let currTotalDisplay = document.getElementById("total");
    let currTotal = parseInt(currTotalDisplay.value);
    let dieDisplay = document.getElementById("die");
    let playerRoll = generateRandomValue(1, 6);
    roll.play();
    dieDisplay.value = playerRoll.toString();
    if (playerRoll == 1) {
        currTotalDisplay.value = "0";
        changePlayers();
    }
    else {
        currTotal += playerRoll;
        currTotalDisplay.value = currTotal.toString();
    }
    let potentialScore = currentPlayer.score + currTotal;
    if (potentialScore >= winningScore) {
        holdDie();
        win.play();
        setTimeout(function () {
            declareWinner(currentPlayer);
        }, 400);
    }
}
function holdDie() {
    let currTotalDisplay = document.getElementById("total");
    let currTotal = parseInt(currTotalDisplay.value);
    currentPlayer.name = document.getElementById("current").innerText;
    if (currentPlayer.name == player1.name) {
        player1.score += currTotal;
        document.getElementById("score1").value = player1.score.toString();
    }
    else {
        player2.score += currTotal;
        document.getElementById("score2").value = player2.score.toString();
    }
    currTotalDisplay.value = "0";
    if (currentPlayer.score < winningScore) {
        changePlayers();
    }
}
function generateRandomValue(minValue, maxValue) {
    var random = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    return random;
}
function declareWinner(winner) {
    alert(winner.name + " wins! \nScore: " + winner.score + "\n\nLet's play again!");
}
const roll = new Audio('../sounds/dice_roll.mp3');
const win = new Audio('../sounds/yay.mp3');
