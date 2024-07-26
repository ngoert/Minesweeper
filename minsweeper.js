// setup game
const table = document.getElementById('myTable');
  const numRows = 8;
  const numCols = 8;
  const numMines = 10; // Number of mines to be randomly placed

  /* Create a 2D array to keep track of where mines are placed.
     When a mine is placed, the cell (`(mines[row][col])`) is set to true 
     This creates a new array with `numRows`. For each row, `Array(numCols).fill(false)` 
     creates an array of `numCols` elements filled with `false`. This initializes a 2D grid (`mines`) where 
     each cell represents whether a mine is present (`true`) or not (`false`).
     */
  let mines = Array.from({ length: numRows }, () => Array(numCols).fill(false));
  let flags = Array.from({ length: numRows }, () => Array(numCols).fill(false)); // Track flags

  // Generate the 8x8 table
  for (let i = 0; i < numRows; i++) {
    // Create row
    let row = table.insertRow();
    for (let j = 0; j < numCols; j++) {
        // Create singular cell (td)
      let cell = row.insertCell();
      // Click listener for each singular cell (td)
      cell.addEventListener('click', function() {
        // if flag
        if (flags[i][j]) return; // Do nothing if flagged
        // if mine
        if (mines[i][j]) {
          // Game over, show mine
          this.textContent = '\u25A0'; // Black square
          alert('Game over! You clicked on a mine.');
          revealAllMines();
        } else {
          // Print X if there is no mine
          this.textContent = 'X';
        }
    });
    
    // Cell listener for right-click
    cell.addEventListener('contextmenu', function(event) {
        // Right-click
        event.preventDefault();
        // Check to see if there is anything there already
        if (this.textContent === 'X') return; // Do nothing if already revealed
        // Toggle Flags
        flags[i][j] = !flags[i][j];
        // Update, can check & uncheck if neccessary
        this.textContent = flags[i][j] ? '\u2691': ''; // Flag
        // Adds flag if true, removes flag if false
        this.classList.toggle('flag', flags[i][j]);
    });
}
}
  // Randomly place mines on grid
  let placedMines = 0;
  while (placedMines < numMines) {
    // Randomly assign mines on grid
    let row = Math.floor(Math.random() * numRows);
    let col = Math.floor(Math.random() * numCols);
    // Checks to see if mine is not already there
    if (!mines[row][col]) {
        // Mark singular square if there is a mine
      mines[row][col] = true;
      // Increment for mines
      placedMines++;
    }
  }
  // Function to reveal all mines when game over
  function revealAllMines() {
    // Go thorugh each singular square
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (mines[i][j]) {
            // Reveals a mine
          table.rows[i].cells[j].textContent = '\u25A0'; // Black square
        }
      }
    }
  }
