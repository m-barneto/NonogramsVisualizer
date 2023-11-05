import React, { Component } from "react";
import Table from "./Table";
import Solver from "../nonogram/NonogramSolver";

export default class Nonogram extends Component {
  constructor(props) {
    super(props);
    this.data = JSON.parse(
      '{"hasColor":false,"columns":5,"rows":7,"colors":0,"columnLayers":3,"rowLayers":2,"colorCodes":[],"rowData":[-1,3,1,1,-1,3,-1,1,-1,1,-1,2,-1,3],"columnData":[-1,1,-1,-1,-1,1,1,1,1,-1,1,2,5,1,1],"rowColorData":[],"columnColorData":[]}'
    );
    this.start();
  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  start = async () => {
    console.log("Waiting for table to populate.");
    while (document.querySelectorAll("Table").length === 0) {
      await this.sleep(100);
    }
    let solver = new Solver(document, this.data);
    solver.solve();
  };

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>
                <Table
                  columns={this.data["columns"]}
                  rows={this.data["columnLayers"]}
                  data={this.data["columnData"]}
                  type="col"
                />
              </td>
            </tr>
            <tr>
              <td>
                <Table
                  columns={this.data["rowLayers"]}
                  rows={this.data["rows"]}
                  data={this.data["rowData"]}
                  type="row"
                />
              </td>
              <td>
                <Table
                  columns={this.data["columns"]}
                  rows={this.data["rows"]}
                  data={new Array(
                    this.data["columns"] * this.data["rows"]
                  ).fill(-1)}
                  type="board"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
