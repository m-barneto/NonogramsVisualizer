const TileState = {
  Empty: 0,
  Filled: 1,
  Flagged: 2
};

class Tile {
  constructor(x, y, document) {
    this.x = x;
    this.y = y;
    this.state = TileState.Empty;
    this.element = document.querySelectorAll("[tile=board][x='" + x + "'][y='" + y + "']");
  }

  setState(state) {
    this.state = state;
    switch(state) {
      case TileState.Empty:
        break;
      case TileState.Filled:
        break;
      case TileState.Flagged:
        break;
    }
  }
}

class Board {

  constructor(data, document) {
    this.data = data;
    this.document = document;

    this.columns = data['columns'];
    this.rows = data['rows'];

    this.board = [];
    for (let x = 0; x < this.columns; x++) {
      let row = [];
      for (let y = 0; y < this.rows; y++) {
        row.push(new Tile(x, y, document));
      }
      this.board.push(row);
    }
  }
}

export default class Solver {
  constructor(document, data) {
    this.document = document;
    this.data = data;
    this.board = new Board(data, document);
  }
  
  shadeCompletedRows(colSums, colNumTiles, rowSums, rowNumTiles) {
    let colSpaceTaken = {};
    let rowSpaceTaken = {};
  
    for (let col in colSums) {
      let spaceTaken = colSums[col];
      if (colNumTiles[col] > 0) {
        spaceTaken += colNumTiles[col] - 1;
      }
      colSpaceTaken[col] = spaceTaken;
    }
  
    for (let row in rowSums) {
      let spaceTaken = rowSums[row];
      if (rowNumTiles[row] > 0) {
        spaceTaken += rowNumTiles[row] - 1;
      }
      rowSpaceTaken[row] = spaceTaken;
    }
  
    for (let col in colSpaceTaken) {
      if (colSpaceTaken[col] === Number(this.data["rows"])) {
        let colInstructionTiles = this.document.querySelectorAll("[tile=col][x='" + col + "']");
        colInstructionTiles.forEach(tile => {
          tile.childNodes[0].style.color = "#999";
        });
  
        let tiles = this.document.querySelectorAll("[tile=board][x='" + col + "']");
        tiles.forEach(tile => {
          tile.childNodes[0].style.backgroundColor = "#999";
        });
      }
    }
  
    for (let row in rowSpaceTaken) {
      if (rowSpaceTaken[row] === Number(this.data["columns"])) {
        let rowInstructionTiles = this.document.querySelectorAll("[tile=row][y='" + row + "']");
        rowInstructionTiles.forEach(tile => {
          tile.childNodes[0].style.color = "#999";
        });
  
        let tiles = this.document.querySelectorAll("[tile=board][y='" + row + "']");
        tiles.forEach(tile => {
          tile.childNodes[0].style.backgroundColor = "#999";
        });
      }
    }
  }
  
  async solve(data, document) {
      console.log('reee');
      console.log("Get sum of all columns and rows");
      let colSums = {};
      let colNumTiles = {};
      let rowSums = {};
      let rowNumTiles = {};
  
      // Gets all top level column tiles
      let colTiles = this.document.querySelectorAll("[tile=col][y='0']");
      // Iterate over them and sum the values
      colTiles.forEach(tile => {
        let colId = tile.getAttribute("x");
        if (!(colId in colSums) || !(colId in colNumTiles)) {
          colSums[colId] = 0;
          colNumTiles[colId] = 0;
        }
  
        // Get all tiles in column
        let columnChildren = this.document.querySelectorAll("[tile=col][x='" + colId + "']");
        columnChildren.forEach(colChild => {
          colSums[colId] += Number(colChild.childNodes[0].innerHTML);
          if (Number(colChild.childNodes[0].innerHTML !== "")) {
            colNumTiles[colId] += 1;
          }
        });
      });
      
      // Gets all leftmost row tiles
      let rowTiles = this.document.querySelectorAll("[tile=row][x='0']");
      // Iterate over them and sum the values
      rowTiles.forEach(tile => {
        let rowId = tile.getAttribute("y");
        if (!(rowId in rowSums) || !(rowId in rowNumTiles)) {
          rowSums[rowId] = 0;
          rowNumTiles[rowId] = 0;
        }
  
        // Get all tiles in row
        let rowChildren = this.document.querySelectorAll("[tile=row][y='" + rowId + "']");
        rowChildren.forEach(rowChild => {
          rowSums[rowId] += Number(rowChild.childNodes[0].innerHTML);
          if (Number(rowChild.childNodes[0].innerHTML !== "")) {
            rowNumTiles[rowId] += 1;
          }
        });
      });
      this.shadeCompletedRows(colSums, colNumTiles, rowSums, rowNumTiles);
      // Go through each column and check the board to see if it's acceptable
  }
}