// We create a reference variable to the reset button and game status text element
let resetButton = document.getElementById("restartButton")
let statusText = document.getElementById("statusText")

let cells = document.querySelectorAll(".cell");
// console.log(cells)

// First we create a variable that will store our game status information
// const gameStatus = document.querySelector(".status");

// Then we create 2 variables to represent the two players 
const playerOneSymbol = "X";
const playerTwoSymbol = "O";
// console.log(cells[0])

let playerOneChoices = []
let playerTwoChoices = []
let isPlayerOneTurn = true

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

// This function adds event listeners to each game cell when it's clicked.
function addCellEventListeners() {
    cells.forEach(function(cell) {
        cell.addEventListener("click", handleCellClick)
    });
}
addCellEventListeners()

// This function removes the event listeners from the cells once they've been clicked.
function removeCellEventListeners() {
    cells.forEach(function(cell) {
        cell.removeEventListener("click", handleCellClick)
    });
}

// This function checks whether a player has won or if there is a tie.
function checkForWinOrTie(playerChoices) {
    const winner = winningCombos.some((winningCombo) => {
        return winningCombo.every((number) => {
            return playerChoices.includes(number)
        })  
    })
    return winner
}

/* I need a function that adds event listeners to each game cell when it's clicked.
During gamelay, if three of the symbols are in a particular combination then a winner can be declared.
If the positions of one player's symbols match any of the winning combinations, a winner can be declared. */

// This function handles what happens each time there's a click event on a game cell.
function handleCellClick(event) {
    // console.log(isPlayerOneTurn == true)
    let gameEndStatus
    if (isPlayerOneTurn) {
        event.target.innerHTML = playerOneSymbol
        statusText.innerHTML = "It's Player 2's Turn"
        playerOneChoices.push(parseInt(event.target.dataset.cellIndex))
        let isWinner = checkForWinOrTie(playerOneChoices)
        if (isWinner) {
            gameEndStatus = "Player 1 Wins"
            statusText.innerHTML = "PLAYER 1 WON"
        }
        // console.log(playerOneChoices)
        isPlayerOneTurn = false
    } else  {
    event.target.innerHTML = playerTwoSymbol
    statusText.innerHTML = "It's Player 1's Turn"
    playerTwoChoices.push(parseInt(event.target.dataset.cellIndex))
    let isWinner = checkForWinOrTie(playerTwoChoices)
    if (isWinner) {
        gameEndStatus = "Player 2 Wins"
        statusText.innerHTML = "PLAYER 2 WON"
    }
    isPlayerOneTurn = true
    // console.log(playerTwoChoices)
    }
    let numberOfBoxesClicked = playerOneChoices.length + playerTwoChoices.length
    if (!gameEndStatus && numberOfBoxesClicked === 9) {
        statusText.innerHTML = "IT'S A TIE"
        // console.log("Tie")
    }

    if (gameEndStatus) {
        removeCellEventListeners()
        // console.log(gameEndStatus)
    }

    // isPlayerOneTurn = !isPlayerOneTurn                           // Instead of line 32 and 35.
    event.target.removeEventListener("click", handleCellClick)
}

// This function resets the game to its initial state.
function resetGame() {
    // New Game Status Text
    statusText.innerHTML = "New Game, let's go! It's Player 1's Turn."

    // The cells innerHTML needs to be emptied of its X's and O's
    cells.forEach((cell) => {cell.innerHTML = ""})

    // This adds all the event listeners back again so they can be clicked and their choices stored with the function above
    addCellEventListeners()

    // This resets the PlayerXChoices arrays, back to empty
    playerOneChoices = []
    playerTwoChoices = []

    // This sets the first player upon reset to Player 1
    isPlayerOneTurn = true
}

// This adds an event listener to the Restart Game button when it's clicked and calls the resetGame function just above
resetButton.addEventListener("click", resetGame)

