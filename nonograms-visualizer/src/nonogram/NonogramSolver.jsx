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
        this.element.childNodes[0].style.backgroundColor = "#000";
        break;
      case TileState.Filled:
        this.element.childNodes[0].style.backgroundColor = "#999";
        break;
      case TileState.Flagged:
        
        break;
      default:
        console.log("Error tile state not valid.");
        break;
    }
  }
}

class Board {
  constructor(data, document) {
    this.data = data;
    this.document = document;

    this.columns = Number(data['columns']);
    this.rows = Number(data['rows']);

    this.columnLayers = Number(data['columnLayers']);
    this.rowLayers = Number(data['rowLayers']);

    this.columnInst = [];
    this.rowInst = [];

    for (let i = 0; i < this.columnLayers; i++) {
      let colRow = [];
      for (let j = 0; j < this.columns; j++) {
        colRow.push(data['columnData'][i * this.columns + j]);
      }
      this.columnInst.push(colRow);
    }
    this.rowInst = [];
    for (let i = 0; i < this.rowLayers; i++) {
      let rowCol = [];
      for (let j = 0; j < this.rows; j++) {
        rowCol.push(data['rowData'][j * this.rowLayers + i])
      }
      this.rowInst.push(rowCol);
    }

    this.board = [];
    for (let x = 0; x < this.columns; x++) {
      let row = [];
      for (let y = 0; y < this.rows; y++) {
        row.push(new Tile(x, y, document));
      }
      this.board.push(row);
    }
  }

  setTileState(x, y, tileState) {
    this.board[x][y].state = tileState;
  }

  getColumnInstructions(layer) {
    return this.columnInst[layer];
  }

  getSingleColInstructions(colId) {
    let column = [];
    for (let i = 0; i < this.columnLayers; i++) {
      column.push(this.columnInst[i][colId]);
    }
    return column;
  }

  getRowInstructions(layer) {
    return this.rowInst[layer];
  }

  getSingleRowInstructions(rowId) {
    let row = [];
    for (let i = 0; i < this.rowLayers; i++) {
      row.push(this.rowInst[i][rowId]);
    }
    return row;
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
      let colSums = {};
      let colNumTiles = {};
      let rowSums = {};
      let rowNumTiles = {};
  
      // Gets all top level column tiles
      let colTiles = this.board.getColumnInstructions(0);

      // Iterate over them and sum the values
      for (let i = 0; i < colTiles.length; i++) {
        let colId = i;
        if (!(colId in colSums) || !(colId in colNumTiles)) {
          colSums[colId] = 0;
          colNumTiles[colId] = 0;
        }
  
        // Get all tiles in column
        let columnChildren = this.board.getSingleColInstructions(colId);
        columnChildren.forEach(colChild => {
          if (colChild === -1) return;
          colSums[colId] += Number(colChild);
          if (Number(colChild !== -1)) {
            colNumTiles[colId] += 1;
          }
        });
      }
      
      // Gets all leftmost row tiles
      let rowTiles = this.board.getRowInstructions(0);
      
      // Iterate over them and sum the values
      for (let i = 0; i < rowTiles.length; i++) {
        let rowId = i;
        if (!(rowId in rowSums) || !(rowId in rowNumTiles)) {
          rowSums[rowId] = 0;
          rowNumTiles[rowId] = 0;
        }
  
        // Get all tiles in row
        let rowChildren = this.board.getSingleRowInstructions(rowId);
        rowChildren.forEach(rowChild => {
          if (rowChild === -1) return;
          rowSums[rowId] += Number(rowChild);
          if (Number(rowChild !== -1)) {
            rowNumTiles[rowId] += 1;
          }
        });
      }
      this.shadeCompletedRows(colSums, colNumTiles, rowSums, rowNumTiles);
      // Go through each column and check the board to see if it's acceptable
  }
}