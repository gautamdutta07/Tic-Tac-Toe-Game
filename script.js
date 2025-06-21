const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let cells = [];

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
    cells[i] = cell;
  }
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(index) {
  if (!gameActive || cells[index].textContent !== "") return;

  cells[index].textContent = currentPlayer;
  checkWinner();
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWinner() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      statusText.textContent = `Player ${cells[a].textContent} wins! 🎉`;
      drawWinLine(cells[a], cells[c]);
      gameActive = false;
      return;
    }
  }

  if (cells.every(cell => cell.textContent !== "")) {
    statusText.textContent = "It's a draw! 🤝";
    gameActive = false;
  }
}

function drawWinLine(startCell, endCell) {
  const line = document.createElement("div");
  line.classList.add("win-line");

  const boardRect = board.getBoundingClientRect();
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();

  const x1 = startRect.left + startRect.width / 2 - boardRect.left;
  const y1 = startRect.top + startRect.height / 2 - boardRect.top;
  const x2 = endRect.left + endRect.width / 2 - boardRect.left;
  const y2 = endRect.top + endRect.height / 2 - boardRect.top;

  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  line.style.width = `${length}px`;
  line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
  line.style.transformOrigin = "left center";

  board.appendChild(line);
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  document.querySelectorAll(".win-line").forEach(line => line.remove());
  createBoard();
}

restartBtn.addEventListener("click", restartGame);

// Initialize the board
createBoard();
