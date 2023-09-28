 // Function to create the game board
 function createBoard() {
    const board = document.querySelector('.board');

    // Clear the board
    board.innerHTML = '';

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      board.appendChild(cell);
    }
  }

  // Initialize the game
  function initGame() {
    createBoard();

    // Variables to track game state
    let boardState = Array(9).fill('');
    let currentPlayer = 'X';
    let gameOver = false;

    // Function to handle player's move
    function handleMove(event) {
      const index = event.target.dataset.index;

      // Check if the cell is already occupied or the game is over
      if (boardState[index] !== '' || gameOver) {
        return;
      }

      // Update the board state
      boardState[index] = currentPlayer;
      event.target.textContent = currentPlayer;

      // Check for a winning combination
      if (checkWinner(currentPlayer)) {
        showResult(`${currentPlayer} wins!`);
        gameOver = true;
        return;
      }

      // Check for a tie game
      if (boardState.every((cell) => cell !== '')) {
        showResult("It's a tie!");
        gameOver = true;
        return;
      }

      // Switch players
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

      // If the current player is the computer (O), make its move
      if (currentPlayer === 'O' && !gameOver) {
        setTimeout(makeComputerMove, 500);
      }
    }

    // Function to make the computer's move
    function makeComputerMove() {
      // Find an empty cell randomly
      const emptyCells = boardState.reduce((acc, cell, index) => {
        if (cell === '') {
          acc.push(index);
        }
        return acc;
      }, []);

      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const computerMove = emptyCells[randomIndex];

      // Update the board state and UI
      boardState[computerMove] = currentPlayer;
      const cell = document.querySelector(`.cell[data-index="${computerMove}"]`);
      cell.textContent = currentPlayer;

      // Check for a winning combination
      if (checkWinner(currentPlayer)) {
        showResult(`${currentPlayer} wins!`);
        gameOver = true;
        return;
      }

      // Check for a tie game
      if (boardState.every((cell) => cell !== '')) {
        showResult("It's a tie!");
        gameOver = true;
        return;
      }

      // Switch players
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Function to check for a winning combination
    function checkWinner(player) {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      return winningCombos.some((combo) =>
        combo.every((index) => boardState[index] === player)
      );
    }

    // Function to display game result
    function showResult(message) {
      const messageElement = document.querySelector('.message');
      messageElement.textContent = message;
    }

    // Event listener for player's move
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => cell.addEventListener('click', handleMove));
  }
  // Function to reset the game board
function resetGame() {
  // Clear the board state
  boardState = Array(9).fill('');
  // Clear the cell content on the UI
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => (cell.textContent = ''));
  // Clear the message
  showResult('');
  // Reset the current player to 'X'
  currentPlayer = 'X';
  // Reset the game over status
  gameOver = false;
}

// Event listener for the "Restart" button
const restartButton = document.querySelector('.restart-button');
restartButton.addEventListener('click', resetGame);


  // Start the game
  initGame();