class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}
let player1;
let player2;
function generateRandomValue(minValue, maxValue) {
    var random = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    return random;
}
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
function changePlayers() {
    let currentPlayerName = document.getElementById("current").innerText;
    if (currentPlayerName == player1.name) {
        currentPlayerName = player2.name;
    }
    else {
        currentPlayerName = player1.name;
    }
    document.getElementById("current").innerText = currentPlayerName;
}
window.onload = function () {
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
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
function rollDie() {
    let currTotalDisplay = document.getElementById("total");
    let currTotal = parseInt(currTotalDisplay.value);
    let playerRoll = generateRandomValue(1, 6);
    if (playerRoll == 1) {
        currTotalDisplay.value = "0";
        changePlayers();
    }
    else {
        currTotal += playerRoll;
        currTotalDisplay.value = currTotal.toString();
    }
}
function holdDie() {
    changePlayers();
}
