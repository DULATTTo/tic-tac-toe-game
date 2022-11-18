const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
let xTurn

const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")

startGame()

function startGame() {
    xTurn = true
    cellElements.forEach(cell => {
        cell.addEventListener("click", handleClick, { once: true })
    })
    setBoardHoverClass()
}


function handleClick(e) {
    const cell = e.target
    const currentClass = xTurn ? X_CLASS : CIRCLE_CLASS
    placeMark(cell, currentClass)
    swapTurns()
    setBoardHoverClass()
}

function setBoardHoverClass() {
    board.classList.remove(CIRCLE_CLASS)
    board.classList.remove(X_CLASS)
    
    if (xTurn) {
        board.classList.add(X_CLASS)
    } else {
        board.classList.add(CIRCLE_CLASS)
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}


function swapTurns() {
    xTurn = !xTurn
}