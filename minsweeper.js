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
  let revealed = Array.from({ length: numRows }, () => Array(numCols).fill(false));

  // Generate the 8x8 table
  for (let i = 0; i < numRows; i++) {
    // Create row
    let row = table.insertRow();
    for (let j = 0; j < numCols; j++) {
        // Create singular cell (td)
      let cell = row.insertCell();
      cell.classList.add('cell');
      // Click listener for each singular cell (td)
      cell.addEventListener('click', function() {
        handleClick(i, j);
      });
      // Handle right-click
      cell.addEventListener('contextmenu', function(event) {
        // Prevent menu from popping up from right-click
        event.preventDefault();
        // Call function for whatever cell was clicked
        handleContextMenu(i, j);
      });
    }
  }
    
// Function to handle cell click
function handleClick(row, col) {
  // Check if the cell is flagged or already revealed
  // If either is true, do nothing and exit
  if (flags[row][col] || revealed[row][col]) return;
  // Check if the cell contains a mine
  if (mines[row][col]) {
      // Game over, show mine
      revealAllMines();
      alert('Game over! You clicked on a mine.');
  } else {
    // If the cell does not contain a mine, reveal the cell and its adjacent cells if needed
      revealCell(row, col);
  }
}

// Function to handle right-click (context menu) for flagging
function handleContextMenu(row, col) {
  // Check if the cell is already revealed
  // If the cell is revealed, do nothing and exit the function
  if (revealed[row][col]) return;
  // Toggle the flag
  // If the cell was flagged, unflag it and vice versa
  flags[row][col] = !flags[row][col];
  // Update the cell's text content based on the flag status
  // If the cell is flagged, set its text content to the flag symbol;
  // otherwise, set it to an empty string
  table.rows[row].cells[col].textContent = flags[row][col] ? '\u2691' : '';
  // Toggle the 'flag' class on the cell based on the flag status
  // This will allow for visual styling of flagged cells (e.g., red color)
  table.rows[row].cells[col].classList.toggle('flag', flags[row][col]);
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

// Function to reveal a cell and its adjacent cells if needed
function revealCell(row, col) {
  // Check if the cell is out of bounds or already revealed, or if it's flagged
  // If any of these conditions are true, do nothing and exit the function
  if (row < 0 || row >= numRows || col < 0 || col >= numCols || revealed[row][col] || flags[row][col]) return;
  // Mark the cell as revealed
  revealed[row][col] = true;
  // Get a reference to the cell in the table
  const cell = table.rows[row].cells[col];
  // Count the number of adjacent mines around this cell
  let mineCount = countAdjacentMines(row, col);
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
                  revealCell(r, c);
              }
          }
      }
  } else {
      // If there are adjacent mines, display the number of mines in the cell
      cell.textContent = mineCount;
  }
}

// Function to count the number of mines around a cell
function countAdjacentMines(row, col) {
  // counter for adjacent mines
  let count = 0;
  // Iterate over the 3x3 grid surrounding the specified cell
  // r ranges from one row above to one row below the cell
  for (let r = row - 1; r <= row + 1; r++) {
    // c ranges from one column to the left to one column to the right of the cell
      for (let c = col - 1; c <= col + 1; c++) {
        // Check if the neighboring cell is within bounds of the grid
        // and if it contains a mine
          if (r >= 0 && r < numRows && c >= 0 && c < numCols && mines[r][c]) {
            // Increment the counter if the neighboring cell contains a mine
              count++;
          }
      }
  }
  // return total count
  return count;
}



  // Function to reveal all mines when game over
  function revealAllMines() {
    // Go thorugh each singular square
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (mines[i][j]) {
            // Reveals a mine
            const cell = table.rows[i].cells[j];
            cell.textContent = '\u25A0'; // Black square
            cell.classList.add('mine');
        }
      }
    }
  }
