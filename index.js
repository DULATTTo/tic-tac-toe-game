const CELLS_COUNT = 9
const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const board = document.getElementById("board")
board.append(createCells())

const cellElements = document.querySelectorAll(".cell")

const menu = document.getElementById("menu")
const playBotButton = document.getElementById("playBotButton")
const playFriendButton = document.getElementById("playFriendButton")
const winningMessage = document.getElementById("winningMessage")
const winningMessageTextElement = document.querySelector(".winning-message-text")
const restartButton = document.getElementById("restartButton")
restartButton.addEventListener("click", startGame)

playBotButton.addEventListener("click", setSinglePlayer)
playFriendButton.addEventListener("click", setMultiplayer)

let isSinglePlayer
let isXTurn

startGame()

function setSinglePlayer() {
  isSinglePlayer = true
  hideMenu() 
}

function setMultiplayer() {
  isSinglePlayer = false
  hideMenu()
}

function hideMenu() {
  menu.classList.add("hide")
}

function createCells() {
  const fragment = document.createDocumentFragment()

  for (let i = 0; i < CELLS_COUNT; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    fragment.append(cell)
  }

  return fragment
}

function startGame() {
  isSinglePlayer = false
  menu.classList.remove("hide")
  isXTurn = true
  setBoardHoverClass()
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener("click", handleClick)
    cell.addEventListener("click", handleClick, { once: true })
  })
  winningMessage.classList.remove("show")
  if (isSinglePlayer) {
    botTurn()
  }
}


function handleClick(e) {
  const cell = e.target
  const currentClass = isXTurn ? X_CLASS : CIRCLE_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (checkDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
    isSinglePlayer && botTurn()
  }
}


function endGame(isDraw) {
  if (isDraw) {
    winningMessageTextElement.textContent = `Draw!`
  } else {
    winningMessageTextElement.textContent = `${isXTurn ? "X's" : "O's"} Wins!`
  }
  winningMessage.classList.add("show")
}


function checkDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function setBoardHoverClass() {
  board.classList.remove(CIRCLE_CLASS)
  board.classList.remove(X_CLASS)
  
  if (isXTurn) {
    board.classList.add(X_CLASS)
  } else {
    board.classList.add(CIRCLE_CLASS)
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}


function swapTurns() {
  isXTurn = !isXTurn
}


function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(comnination => {
    return comnination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function botTurn() {
  const botsCurrentClass = isXTurn ? X_CLASS : CIRCLE_CLASS
  const emptyCells =  [...cellElements].filter(cell => {
      return !(cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS))
  })
  const randomIndex = Math.floor( Math.random() * emptyCells.length )
  placeMark(emptyCells[randomIndex], botsCurrentClass)
  if (checkWin(botsCurrentClass)) {
      endGame(false)
  } else if (checkDraw()) {
      endGame(true)
  } else {
      swapTurns()
      setBoardHoverClass()
  }
}