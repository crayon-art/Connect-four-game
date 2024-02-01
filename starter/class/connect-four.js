const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand("w", "up", this.up.bind(this));
    Screen.addCommand("s", "down", this.down.bind(this));
    Screen.addCommand('a', 'move cursor left', this.left.bind(this));
    Screen.addCommand('d', 'move cursor right', this.right.bind(this));
    Screen.addCommand('e', 'make a move', this.placeMove.bind(this));

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  up() {
    // Move cursor up
    this.cursor.resetBackgroundColor();
    this.cursor.up();
    this.cursor.setBackgroundColor();
    this.renderGrid();
  }

  down() {
    this.cursor.resetBackgroundColor();
    this.cursor.down();
    this.cursor.setBackgroundColor();
    this.renderGrid();
  }

  left(){
  //move cursor left
  this.cursor.resetBackgroundColor();
  this.cursor.left();
  this.cursor.setBackgroundColor();
  this.renderGrid();
  }

  right(){
    //move cursor left
    this.cursor.resetBackgroundColor();
    this.cursor.right();
    this.cursor.setBackgroundColor();
    this.renderGrid();
    }

    placeMove(){
          // Check if the selected cell is empty before placing a move
          if (this.grid[this.cursor.row][this.cursor.col] === ' ') {
            this.grid[this.cursor.row][this.cursor.col] = this.playerTurn;

          // Check for a win or tie after placing the move
          const winner = ConnectFour.checkWin(this.grid);
          if (winner) {
           ConnectFour.endGame(winner);
          } else {

            // Switch player turn
            this.playerTurn = (this.playerTurn === 'O') ? 'X' : 'O';

            // Update the message to show the current player's turn
            Screen.setMessage(`Player ${this.playerTurn}'s turn`);

            // Render the updated grid
            this.renderGrid();
          }
          }
    }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    let count=0;

    //check for match horizontally
    for (let row of grid){
      for (let i=0; i<row.length-3; i++){
        if (row[i] === row[i + 1] && row[i + 1] === row[i + 2] && row[i + 2] === row[i + 3] && row[i] !== ' '){
          return row[i];
        }
      }
    }

    //check for match vertically
    for (let i=0; i<grid[0].length; i++){
      for (let j=0; j<grid.length-3; j++){
        if (grid[j][i]===grid[j+1][i]&&grid[j+1][i]===grid[j+2][i]&&grid[j+2][i]===grid[j+3][i]&&grid[j][i]!==` `){
          return grid[j][i];
        }
      }
    }


    //check for match diagonally
    for (let i = 0; i < grid.length - 3; i++) {
      for (let j = 0; j < grid[0].length - 3; j++) {
        if (grid[i][j] === grid[i + 1][j + 1]&&grid[i + 1][j + 1]=== grid[i + 2][j + 2]&&grid[i + 2][j + 2] === grid[i + 3][j + 3] && grid[i][j] !== ' ') {
          return grid[i][j];
        }
      }
    }
    for (let i = 0; i < grid.length - 3; i++) {
      for (let j = 3; j < grid[0].length; j++) {
        if (grid[i][j] === grid[i + 1][j - 1]&& grid[i + 1][j - 1]=== grid[i + 2][j - 2] &&grid[i + 2][j - 2]=== grid[i + 3][j - 3] && grid[i][j] !== ' ') {
          return grid[i][j];
        }
      }
    }

    //check for tie
    for (let i=0; i<grid.length; i++){
      for (let j=0; j<grid[0].length; j++){
        if (grid[i][j]!==` `){
          count+=1;
        }
      }
    }
    if (count===(grid.length*grid[0].length)){
      return "T";
    }

    else return false;
  }

  renderGrid() {
    // Clear the screen and redraw the grid with X and O
    Screen.clear();

    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        Screen.setGrid(row, col, this.grid[row][col]);
      }
    }
    this.cursor.setBackgroundColor();
    Screen.render();
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
