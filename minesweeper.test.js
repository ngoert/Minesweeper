// Mock Minesweeper program to test jest
const { revealAllMines, } = require('./game'); // Import the functions to be tested
describe('Minesweeper Game', () => {
  // Test case to verify that mines are revealed correctly
  test('Should reveal all mines when the game is over.', () => {
    // Mock table structure with cells
    const numRows = 8;
    const numCols = 8;
    // Initialize the table object
    const table = {
      rows: []
    };
     // Create the rows
     for (let i = 0; i < numRows; i++) {
      // Create a new row
      const row = { cells: [] };
      // Create cells for row
      for (let j = 0; j < numCols; j++) {
        // Create a new blank cell
        const cell = { textContent: '' };
        // Add the cell to the row
        row.cells.push(cell);
      }
      // Add the row to the table
      table.rows.push(row);
     }
    revealAllMines(table); // Reveal all mines on the table
    });
  });
