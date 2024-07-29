class Minesweeper {
  // Constructor initializes the game with the table ID, number of rows, columns, and mines
  constructor(tableId, numRows, numCols, numMines) {
    // Get the table element by its ID
    this.table = document.getElementById(tableId);
    // Set the number of rows for the grid
    this.numRows = numRows;
    // Set the number of columns for the grid
    this.numCols = numCols;
    // Set the number of mines to be randomly placed on grid
    this.numMines = numMines;
    /* Create a 2D array to keep track of where mines are placed.
     When a mine is placed, the cell (`(mines[row][col])`) is set to true 
     This creates a new array with `numRows`. For each row, `Array(numCols).fill(false)` 
     creates an array of `numCols` elements filled with `false`. This initializes a 2D grid (`mines`) where 
     each cell represents whether a mine is present (`true`) or not (`false`).
     */
    this.mines = Array.from({ length: numRows }, () => Array(numCols).fill(false));
    // Track flagged cells
    this.flags = Array.from({ length: numRows }, () => Array(numCols).fill(false));
    // Track revealed cells
    this.revealed = Array.from({ length: numRows }, () => Array(numCols).fill(false));
    this.initialize(); // Set up the game
  }
  // Initialize the game: generate the table and place mines
  initialize() {
    this.generateTable(); // Create the HTML table
    this.placeMines(); // Randomly place mines on the grid
    }

    generateTable() {
      // Generate the 8x8 table
      for (let i = 0; i < this.numRows; i++) {
        // Create row
        let row = table.insertRow();
        for (let j = 0; j < this.numCols; j++) {
          // Create singular cell (td)
          let cell = row.insertCell();
          cell.classList.add('cell');
          // Click listener for each singular cell (td)
          cell.addEventListener('click', function() {
            this.handleClick(i, j);
          });
          // Handle right-click
          cell.addEventListener('contextmenu', function(event) {
            // Prevent menu from popping up from right-click
            event.preventDefault();
            // Call function for whatever cell was clicked
            this.handleContextMenu(i, j);
          });
        }
      }
    }
    placeMines(){
      // Randomly place mines on grid
      let placedMines = 0;
      while (placedMines < this.numMines) {
        // Randomly assign mines on grid
        let row = Math.floor(Math.random() * this.numRows);
        let col = Math.floor(Math.random() * this.numCols);
        // Checks to see if mine is not already there
        if (!this.mines[row][col]) {
          // Mark singular square if there is a mine
          this.mines[row][col] = true;
          // Increment for mines
          placedMines++;
        }
      }
    }
    
    // Function to handle cell click
    handleClick(row, col) {
      // Check if the cell is flagged or already revealed
      // If either is true, do nothing and exit
      if (this.flags[row][col] || this.revealed[row][col]) return;
      // Check if the cell contains a mine
      if (this.mines[row][col]) {
        // Game over, show mine
        this.revealAllMines();
        alert('Game over! You clicked on a mine.');
      } else {
        // If the cell does not contain a mine, reveal the cell and its adjacent cells if needed
        this.revealCell(row, col);
      }
    }
    
    // Function to handle right-click (context menu) for flagging
    handleContextMenu(row, col) {
      // Check if the cell is already revealed
      // If the cell is revealed, do nothing and exit the function
      if (this.revealed[row][col]) return;
      // Toggle the flag
      // If the cell was flagged, unflag it and vice versa
      this.flags[row][col] = !this.flags[row][col];
      // Update the cell's text content based on the flag status
      // If the cell is flagged, set its text content to the flag symbol;
      // otherwise, set it to an empty string
      this.table.rows[row].cells[col].textContent = this.flags[row][col] ? '\u2691' : '';
    }
    
    // Function to reveal a cell and its adjacent cells if needed
    revealCell(row, col) {
      // Check if the cell is out of bounds or already revealed, or if it's flagged
      // If any of these conditions are true, do nothing and exit the function
      if (row < 0 || row >= this.numRows || col < 0 || col >= this.numCols || this.revealed[row][col] || this.flags[row][col]) return;
      // Mark the cell as revealed
      this.revealed[row][col] = true;
      // Get a reference to the cell in the table
      const cell = this.table.rows[row].cells[col];
      // Count the number of adjacent mines around this cell
      let mineCount = this.countAdjacentMines(row, col);
      // Change background color to indicate it has been revealed
      cell.classList.add('revealed');
      // If cell has no adjacent mines
      if (mineCount === 0) {
        // Clears anything that is in the cell to an empty string
        cell.textContent = '';
        // Loop through all adjacent cells
        for (let r = row - 1; r <= row + 1; r++) {
          for (let c = col - 1; c <= col + 1; c++) {
            // Skip the current cell itself
            if (r !== row || c !== col) {
              // Recursively reveal the adjacent cells
              this.revealCell(r, c);
            }
          }
        }
      } else {
        // If there are adjacent mines, display the number of mines in the cell
        cell.textContent = mineCount;
      }
    }
    
    // Function to count the number of mines around a cell
    countAdjacentMines(row, col) {
      // counter for adjacent mines
      let count = 0;
      // Iterate over the 3x3 grid surrounding the specified cell
      // r ranges from one row above to one row below the cell
      for (let r = row - 1; r <= row + 1; r++) {
        // c ranges from one column to the left to one column to the right of the cell
        for (let c = col - 1; c <= col + 1; c++) {
          // Check if the neighboring cell is within bounds of the grid
          // and if it contains a mine
          if (r >= 0 && r < this.numRows && c >= 0 && c < this.numCols && this.mines[r][c]) {
            // Increment the counter if the neighboring cell contains a mine
            count++;
          }
        }
      }
      // return total count
      return count;
    }
    
    // Function to reveal all mines when game over
    revealAllMines() {
      // Go thorugh each singular square
      for (let i = 0; i < this.numRows; i++) {
        for (let j = 0; j < this.numCols; j++) {
          if (this.mines[i][j]) {
            // Reveals a mine
            const cell = this.table.rows[i].cells[j];
            cell.textContent = '\u25A0'; // Black square
            cell.classList.add('mine');
          }
        }
      }
    }
  }
  
  // Initialize the game after the DOM content is loaded
  document.addEventListener('DOMContentLoaded', () => {
    const game = new Minesweeper('myTable', 8, 8, 10); // Create a new Minesweeper game instance
    });