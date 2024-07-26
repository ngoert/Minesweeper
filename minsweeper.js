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
      cell.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        handleContextMenu(i, j);
      });
    }
  }
    
// Function to handle cell click
function handleClick(row, col) {
  if (flags[row][col] || revealed[row][col]) return; // Do nothing if flagged or already revealed
  if (mines[row][col]) {
      // Game over, show mine
      revealAllMines();
      alert('Game over! You clicked on a mine.');
  } else {
      revealCell(row, col);
  }
}

// Function to handle right-click (context menu) for flagging
function handleContextMenu(row, col) {
  if (revealed[row][col]) return; // Do nothing if already revealed
  flags[row][col] = !flags[row][col];
  table.rows[row].cells[col].textContent = flags[row][col] ? '\u2691' : '';
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
  if (row < 0 || row >= numRows || col < 0 || col >= numCols || revealed[row][col] || flags[row][col]) return;

  revealed[row][col] = true;
  const cell = table.rows[row].cells[col];
  let mineCount = countAdjacentMines(row, col);

  cell.classList.add('revealed');
  if (mineCount === 0) {
      cell.textContent = '';
      for (let r = row - 1; r <= row + 1; r++) {
          for (let c = col - 1; c <= col + 1; c++) {
              if (r !== row || c !== col) {
                  revealCell(r, c);
              }
          }
      }
  } else {
      cell.textContent = mineCount;
  }
}

// Function to count the number of mines around a cell
function countAdjacentMines(row, col) {
  let count = 0;
  for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
          if (r >= 0 && r < numRows && c >= 0 && c < numCols && mines[r][c]) {
              count++;
          }
      }
  }
  return count;
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
