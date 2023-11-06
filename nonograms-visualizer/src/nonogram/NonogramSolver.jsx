const TileState = {
  Empty: 0,
  Filled: 1,
  Unknown: 2,
};

class Tile {
  constructor(x, y, document) {
    this.x = x;
    this.y = y;
    this.document = document;
    this.selector = "[tile=board][x='" + x + "'][y='" + y + "']";
    this.setState(TileState.Unknown);
  }

  setState(state) {
    let element = this.document.querySelectorAll(this.selector)[0];
    this.state = state;
    switch (state) {
      case TileState.Empty:
        element.childNodes[0].style.backgroundColor = "#999";
        element.childNodes[0].innerText = "";
        break;
      case TileState.Filled:
        element.childNodes[0].style.backgroundColor = "#333";
        element.childNodes[0].innerText = "";
        break;
      case TileState.Unknown:
        element.childNodes[0].style.backgroundColor = "";
        element.childNodes[0].innerText = "?";
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

    this.columns = Number(data["columns"]);
    this.rows = Number(data["rows"]);

    this.columnLayers = Number(data["columnLayers"]);
    this.rowLayers = Number(data["rowLayers"]);

    this.columnInst = [];
    this.rowInst = [];

    for (let i = 0; i < this.columnLayers; i++) {
      let colRow = [];
      for (let j = 0; j < this.columns; j++) {
        colRow.push(data["columnData"][i * this.columns + j]);
      }
      this.columnInst.push(colRow);
    }
    this.rowInst = [];
    for (let i = 0; i < this.rowLayers; i++) {
      let rowCol = [];
      for (let j = 0; j < this.rows; j++) {
        rowCol.push(data["rowData"][j * this.rowLayers + i]);
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
    this.board[x][y].setState(tileState);
  }

  getSingleColInstructions(colId) {
    let column = [];
    for (let i = 0; i < this.columnLayers; i++) {
      column.push(this.columnInst[i][colId]);
    }
    while (column.includes(-1)) {
      let i = column.indexOf(-1);
      if (i === -1) break;
      column.splice(i, 1);
    }
    return column;
  }

  getSingleRowInstructions(rowId) {
    let row = [];
    for (let i = 0; i < this.rowLayers; i++) {
      row.push(this.rowInst[i][rowId]);
    }
    while (row.includes(-1)) {
      let i = row.indexOf(-1);
      if (i === -1) break;
      row.splice(i, 1);
    }
    return row;
  }

  getNumberOfSpaces(idx, isRow) {
    let instructions = undefined;
    let length = undefined;

    if (isRow) {
      length = this.columns;
      instructions = this.getSingleRowInstructions(idx);
    } else {
      length = this.rows;
      instructions = this.getSingleColInstructions(idx);
    }

    let sumOfInstructions = 0;
    instructions.forEach((inst) => {
      sumOfInstructions += inst;
    });

    let spaceTakenUp = sumOfInstructions + instructions.length - 1;
    let numSpacesLeft = length - spaceTakenUp;
    return numSpacesLeft;
  }

  getInstructionAsGridSet(instr, gridLength) {
    let gridPerm = [];
    for (let i = 0; i < gridLength; i++) {
      gridPerm.push(TileState.Empty);
    }

    let currIdx = 0;
    for (let i = 0; i < instr.length; i++) {
      // get instruction value
      let inst = instr[i];
      // get space amount for this instruction
      let spaceBefore = i === 0 ? 0 : 1;

      for (let j = 0; j < spaceBefore; j++) {
        gridPerm[currIdx + j] = TileState.Empty;
      }
      currIdx += spaceBefore;

      for (let j = 0; j < inst; j++) {
        gridPerm[currIdx + j] = TileState.Filled;
      }
      currIdx += inst;
    }
    return gridPerm;
  }

  tryCompleteInstruction(idx, isRow) {
    let isCompletable = this.getNumberOfSpaces(idx, isRow) === 0;
    if (!isCompletable) return;

    // loop through tiles in row/col
    let gridSet = this.getInstructionAsGridSet(
      isRow
        ? this.getSingleRowInstructions(idx)
        : this.getSingleColInstructions(idx)
    );

    if (isRow) {
      for (let x = 0; x < this.columns; x++) {
        this.board[x][idx].setState(gridSet[x]);
      }
    } else {
      for (let y = 0; y < this.rows; y++) {
        this.board[idx][y].setState(gridSet[y]);
      }
    }
  }

  getGridSet(idx, isRow) {
    let gridSet = [];
    if (isRow) {
      for (let x = 0; x < this.columns; x++) {
        gridSet.push(this.board[x][idx].state);
      }
    } else {
      for (let y = 0; y < this.rows; y++) {
        gridSet.push(this.board[idx][y].state);
      }
    }
    return gridSet;
  }

  isCompatableSet(gridSet, idx, isRow) {
    let boardGridSet = this.getGridSet(idx, isRow);
    if (boardGridSet.length !== gridSet.length) {
      console.log(
        "Comparing board gridset to incorrect length permutation gridset"
      );
      return false;
    }

    for (let i = 0; i < gridSet.length; i++) {
      if (boardGridSet[i] === TileState.Unknown) continue;
      else {
        if (boardGridSet[i] !== gridSet[i]) return false;
      }
    }

    return true;
  }

  setFinalGridSet(gridSet, idx, isRow) {
    for (let i = 0; i < gridSet.length; i++) {
      if (isRow) {
        this.setTileState(i, idx, gridSet[i]);
      } else {
        this.setTileState(idx, i, gridSet[i]);
      }
    }
  }

  isSolved() {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (this.board[x][y].state === TileState.Unknown) return false;
      }
    }
    return true;
  }

  isEmpty() {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (this.board[x][y].state !== TileState.Unknown) {
          return false;
        }
      }
    }
    return true;
  }

  isRowEmpty(idx) {
    for (let x = 0; x < this.columns; x++) {
      if (this.board[x][idx].state !== TileState.Unknown) return false;
    }
    return true;
  }

  isColEmpty(idx) {
    for (let y = 0; y < this.rows; y++) {
      if (this.board[idx][y].state !== TileState.Unknown) return false;
    }
    return true;
  }
}

export default class Solver {
  constructor(document, data) {
    this.document = document;
    this.data = data;
    this.board = new Board(data, document);
    this.possibleColumnPerms = [];
    for (let x = 0; x < this.board.columns; x++) {
      this.possibleColumnPerms.push([]);
    }
    this.possibleRowPerms = [];
    for (let y = 0; y < this.board.rows; y++) {
      this.possibleRowPerms.push([]);
    }
  }

  isValidPermute(perm, maxVal) {
    // if 0 in place other than first slot, return false
    for (let i = 1; i < perm.length; i++) {
      if (perm[i] === 0) return false;
    }

    // sum up perm and if < maxVal we cool
    let sum = 0;
    for (let i = 0; i < perm.length; i++) {
      sum += perm[i];
    }
    if (sum > maxVal) return false;

    return true;
  }

  getPermutations(chars, length, maxVal) {
    let permutations = [];

    let password = [];
    for (let i = 0; i < length; i++) {
      password.push(0);
    }

    let chars_length = chars.length;
    let password_length = password.length;

    for (let i = 0; i < chars_length ** password_length; i++) {
      for (let i2 = 0; i2 < password_length; i2++) {
        if (password[i2] === chars_length) {
          password[i2 + 1]++;
          password[i2] = 0;
        }
      }

      let perm = [];
      let breakEarly = false;
      for (let i2 = 0; i2 < password_length; i2++) {
        if (i2 > 0 && chars[password[i2]] === "0") {
          breakEarly = true;
          break;
        }
        perm.push(chars[password[i2]]);
      }

      if (!breakEarly && this.isValidPermute(perm, maxVal)) {
        permutations.push(perm);
      }

      password[0]++;
    }
    return permutations;
  }

  translatePermsToGridFormat(instr, perms, gridLength) {
    let gridPerms = [];

    perms.forEach((perm) => {
      let gridPerm = [];
      for (let i = 0; i < gridLength; i++) {
        gridPerm.push(TileState.Empty);
      }

      let currIdx = 0;
      for (let i = 0; i < instr.length; i++) {
        // get instruction value
        let inst = instr[i];
        // get space amount for this instruction
        let spaceBefore = perm[i];

        for (let j = 0; j < spaceBefore; j++) {
          gridPerm[currIdx + j] = TileState.Empty;
        }
        currIdx += spaceBefore;

        for (let j = 0; j < inst; j++) {
          gridPerm[currIdx + j] = TileState.Filled;
        }
        currIdx += inst;
      }
      gridPerms.push(gridPerm);
    });
    return gridPerms;
  }

  findPermutations(instr, length) {
    let numGroups = instr.length;

    let sumOfInstructions = 0;
    instr.forEach((inst) => {
      sumOfInstructions += inst;
    });

    let numSpaces = length - sumOfInstructions;

    let values = [];
    for (let i = 0; i < numSpaces + 1; i++) {
      values.push(i);
    }

    let perms = this.getPermutations(values, numGroups, numSpaces);

    let gridPerms = this.translatePermsToGridFormat(instr, perms, length);
    console.log(gridPerms);
    return gridPerms;
  }

  shadeCompletedRows() {
    // Go through all instructions
    for (let col = 0; col < this.board.columns; col++) {
      this.board.tryCompleteInstruction(col, false);
    }
    for (let row = 0; row < this.board.rows; row++) {
      this.board.tryCompleteInstruction(row, true);
    }
  }

  getCommonOverlap(perms) {
    let common = [];
    for (let i = 0; i < perms[0].length; i++) {
      let value = perms[0][i];
      let isSame = true;

      for (let j = 1; j < perms.length; j++) {
        if (perms[j][i] === value) continue;
        else {
          isSame = false;
          break;
        }
      }
      if (isSame) {
        common[i] = value;
      } else {
        common[i] = TileState.Unknown;
      }
    }
    return common;
  }

  async getPossiblePerms() {
    // Go through all instructions
    for (let col = 0; col < this.board.columns; col++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      console.log("col: " + col);
      // get all possible perms and add it to our possible lists
      let possiblePerms = this.getCombinations(
        this.board.getSingleColInstructions(col),
        this.board.rows
      );
      possiblePerms.forEach((perm) => {
        this.possibleColumnPerms[col].push(perm);
      });
    }

    for (let row = 0; row < this.board.rows; row++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      console.log("row: " + row);
      let possiblePerms = this.getCombinations(
        this.board.getSingleRowInstructions(row),
        this.board.columns
      );

      possiblePerms.forEach((perm) => {
        this.possibleRowPerms[row].push(perm);
      });
    }
  }

  findCommonOverlaps() {
    for (let col = 0; col < this.board.columns; col++) {
      let common = this.getCommonOverlap(this.possibleColumnPerms[col]);
      for (let i = 0; i < common.length; i++) {
        if (common[i] !== TileState.Unknown) {
          this.board.setTileState(col, i, common[i]);
        }
      }
    }

    for (let row = 0; row < this.board.rows; row++) {
      let common = this.getCommonOverlap(this.possibleRowPerms[row]);
      for (let i = 0; i < common.length; i++) {
        if (common[i] !== TileState.Unknown) {
          this.board.setTileState(i, row, common[i]);
        }
      }
    }
  }

  finalizeSinglePerms() {
    for (let col = 0; col < this.board.columns; col++) {
      if (this.possibleColumnPerms[col].length === 1) {
        this.board.setFinalGridSet(
          this.possibleColumnPerms[col][0],
          col,
          false
        );
      }
    }
    for (let row = 0; row < this.board.rows; row++) {
      if (this.possibleRowPerms[row].length === 1) {
        this.board.setFinalGridSet(this.possibleRowPerms[row][0], row, true);
      }
    }
  }

  pruneInvalidPerms() {
    if (this.board.isEmpty()) return;
    // prune possiblerowperms that arent valid with current board
    // iterate over all rows/cols and loop through possible perms
    for (let col = 0; col < this.board.columns; col++) {
      console.log("col: " + col);
      console.log("perms: " + this.possibleColumnPerms[col].length);
      if (this.board.isColEmpty(col)) {
        console.log("Empty col, skipping.");
        continue;
      }
      for (let i = this.possibleColumnPerms[col].length - 1; i >= 0; i--) {
        if (
          !this.board.isCompatableSet(
            this.possibleColumnPerms[col][i],
            col,
            false
          )
        ) {
          this.possibleColumnPerms[col].splice(i, 1);
        }
      }
    }

    for (let row = 0; row < this.board.rows; row++) {
      console.log("row: " + row);
      console.log("perms: " + this.possibleRowPerms[row].length);
      if (this.board.isRowEmpty(row)) {
        console.log("Empty row, skipping.");
        continue;
      }
      for (let i = this.possibleRowPerms[row].length - 1; i >= 0; i--) {
        if (
          !this.board.isCompatableSet(this.possibleRowPerms[row][i], row, true)
        ) {
          this.possibleRowPerms[row].splice(i, 1);
        }
      }
    }
  }

  printRow(row) {
    console.log(row.map((i) => (i ? "$" : "-")).join(""));
  }

  requiredCells(nums) {
    return nums.reduce((sum, i) => sum + (i + 1), 0) - 1;
  }

  appendRow(init, pendingNums, rowSize, comb) {
    if (pendingNums.length === 0) {
      comb.push(init);
      return false;
    }
    const cellsRequired = this.requiredCells(pendingNums);
    if (cellsRequired > rowSize) {
      return false;
    }
    let gapSize = 0;
    const pNumsAux = pendingNums.slice(1);
    let space = rowSize;
    while (gapSize + cellsRequired <= rowSize) {
      space = rowSize;
      space -= gapSize;
      const prefix = [...init];
      for (let i = 0; i < gapSize; i++) {
        prefix.push(false);
      }
      for (let i = 0; i < pendingNums[0]; i++) {
        prefix.push(true);
        space--;
      }
      if (space > 0) {
        prefix.push(false);
        space--;
      }
      this.appendRow(prefix, pNumsAux, space, comb);
      gapSize++;
    }
    return true;
  }

  getCombinations(row, rowSize) {
    const comb = [];
    const init = [];
    this.appendRow(init, row, rowSize, comb);
    let perms = [];
    for (const r of comb) {
      while (r.length < rowSize) {
        r.push(false);
      }
      perms.push(r.map((i) => (i ? 1 : 0)));
    }
    return perms;
  }

  async solve(data, document) {
    this.shadeCompletedRows();
    console.log("finished shading");
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("starting perms");
    await this.getPossiblePerms();
    console.log("Finished creating possible perms");

    let iter = 0;
    while (!this.board.isSolved()) {
      iter++;
      console.log("Pruning invalid perms.");
      this.pruneInvalidPerms();
      console.log("Finding overlaps.");
      this.findCommonOverlaps();
      console.log("Finalizing single perms.");
      this.finalizeSinglePerms();
      console.log("Done finalizing.");
      console.log(iter);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    console.log("Solved in " + iter + " iterations.");
    // Loop through all perms and check against board to see if we should remove them from possibleperms lists
  }
}
