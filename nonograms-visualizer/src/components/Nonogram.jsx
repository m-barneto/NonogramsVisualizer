import React, { Component } from 'react';
import Table from './Table';

export default class Nonogram extends Component {
  constructor(props) {
    super(props);
    this.data = JSON.parse("{\"hasColor\":false,\"columns\":9,\"rows\":7,\"colors\":0,\"columnLayers\":3,\"rowLayers\":2,\"colorCodes\":[],\"rowData\":[-1,9,1,1,1,1,1,1,-1,9,-1,1,-1,3],\"columnData\":[-1,-1,-1,1,-1,1,-1,-1,-1,-1,1,1,1,1,1,1,1,-1,5,1,1,1,3,1,1,1,5],\"rowColorData\":[],\"columnColorData\":[]}");
    this.start();
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getColumn(colId) {
    
  }

  getRow(rowid) {

  }

  start = async() => {
    console.log("Waiting for table to populate.");
    while (document.querySelectorAll("Table").length === 0) {
      await this.sleep(500);
    }
    console.log("Get sum of all columns and rows");
    let colSums = {};
    let colNumTiles = {};
    let rowSums = {};
    let rowNumTiles = {};

    // Gets all top level column tiles
    let colTiles = document.querySelectorAll("[tile=col][y='0']");
    // Iterate over them and sum the values
    colTiles.forEach(tile => {
      let colId = tile.getAttribute("x");
      if (!(colId in colSums) || !(colId in colNumTiles)) {
        colSums[colId] = 0;
        colNumTiles[colId] = 0;
      }

      // Get all tiles in column
      let columnChildren = document.querySelectorAll("[tile=col][x='" + colId + "']");
      columnChildren.forEach(colChild => {
        colSums[colId] += Number(colChild.childNodes[0].innerHTML);
        if (Number(colChild.childNodes[0].innerHTML !== "")) {
          colNumTiles[colId] += 1;
        }
      });
    });
    
    // Gets all leftmost row tiles
    let rowTiles = document.querySelectorAll("[tile=row][x='0']");
    // Iterate over them and sum the values
    rowTiles.forEach(tile => {
      let rowId = tile.getAttribute("y");
      if (!(rowId in rowSums) || !(rowId in rowNumTiles)) {
        rowSums[rowId] = 0;
        rowNumTiles[rowId] = 0;
      }

      // Get all tiles in row
      let rowChildren = document.querySelectorAll("[tile=row][y='" + rowId + "']");
      rowChildren.forEach(rowChild => {
        rowSums[rowId] += Number(rowChild.childNodes[0].innerHTML);
        if (Number(rowChild.childNodes[0].innerHTML !== "")) {
          rowNumTiles[rowId] += 1;
        }
      });
    });

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
        let colInstructionTiles = document.querySelectorAll("[tile=col][x='" + col + "']");
        colInstructionTiles.forEach(tile => {
          tile.childNodes[0].style.color = "#999";
        });

        let tiles = document.querySelectorAll("[tile=board][x='" + col + "']");
        tiles.forEach(tile => {
          tile.childNodes[0].style.backgroundColor = "#999";
        });
      }
    }

    for (let row in rowSpaceTaken) {
      if (rowSpaceTaken[row] === Number(this.data["columns"])) {
        let rowInstructionTiles = document.querySelectorAll("[tile=row][y='" + row + "']");
        rowInstructionTiles.forEach(tile => {
          tile.childNodes[0].style.color = "#999";
        });

        let tiles = document.querySelectorAll("[tile=board][y='" + row + "']");
        tiles.forEach(tile => {
          tile.childNodes[0].style.backgroundColor = "#999";
        });
      }
    }

    // Go through each column and check the board to see if it's acceptable
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>
                <Table columns={this.data["columns"]} rows={this.data["columnLayers"]} data={this.data["columnData"]} type="col"/>
              </td>
            </tr>
            <tr>
              <td>
                <Table columns={this.data["rowLayers"]} rows={this.data["rows"]} data={this.data["rowData"]} type="row"/>
              </td>
              <td>
                <Table columns={this.data["columns"]} rows={this.data["rows"]} data={new Array(this.data["columns"] * this.data["rows"]).fill(-1)} type="board"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
