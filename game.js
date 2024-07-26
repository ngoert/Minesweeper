/* Simplified Minesweeper version to integrate Jest */

// Constants for the game
const numRows = 8; // Number of rows in the grid
const numCols = 8; // Number of columns in the grid
const numMines = 10; // Number of mines to be randomly placed

// Create a 2D array to keep track of where mines are placed
let mines = Array.from({ length: numRows }, () => Array(numCols).fill(false));

// Function to reveal all mines when the game is over
function revealAllMines(table) {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (mines[i][j]) { // If there is a mine at this position
        table.rows[i].cells[j].textContent = '\u25A0'; // Set cell content to a black square (mine icon)
      }
    }
  }
}

// Export functions for testing
module.exports = {
  revealAllMines, // Function to reveal all mines
};
