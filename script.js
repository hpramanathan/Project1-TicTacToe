let cells = document.querySelectorAll(".cell");
console.log(cells)

// First we create a variable that will store our game status information
const gameStatus = document.querySelector(".status");

// Then we create 2 variables to represent the two players 
const playerOneSymbol = "X";
const playerTwoSymbol = "O";
console.log(cells[0])

let eachGamePlayersChoices = []

// We also need to create a variable of all the winning combinations by index number of our playing grid
const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

let isPlayerOneTurn = true

// A function that adds event listeners to each game cell when it's clicked
function handleCellClick(event) {
    console.log(isPlayerOneTurn == true)
    if (isPlayerOneTurn) {
        event.target.innerHTML = playerOneSymbol
        eachGamePlayersChoices.push(parseInt(event.target.dataset.cellIndex))
        console.log(eachGamePlayersChoices)
        isPlayerOneTurn = false
    } else  {
    event.target.innerHTML = playerTwoSymbol
    isPlayerOneTurn = true
    }
    // isPlayerOneTurn = !isPlayerOneTurn                           // Instead of line 32 and 35.
    event.target.removeEventListener("click", handleCellClick)
}

cells.forEach(function(cell) {
    cell.addEventListener("click", handleCellClick)
});

function checkForWinOrTie() {

}

// Tell me the indexes that a player has clicked on
