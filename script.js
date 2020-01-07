const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
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

const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = winningMessageElement.querySelector('[data-winning-message-text]')
const cellElements = document.querySelectorAll('[data-cell]')
const restartButton = document.getElementById('restartButton')
const board = document.getElementById('board')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  winningMessageElement.classList.remove('show')
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleCellClick)
    cell.addEventListener('click', handleCellClick, { once: true })
  })
  setBoardHoverClass()
}

function handleCellClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (isWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurn()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`
  }
  winningMessageElement.classList.add('show')
}

function swapTurn() {
  circleTurn = !circleTurn
}

function placeMark(cell, classToAdd) {
  cell.classList.add(classToAdd)
}

function isWin(classToCheck) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(classToCheck)
    })
  })
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}