import React, { Component, useCallback, useState, useEffect } from "react";
import Table from "./nonogram/Table";
import Solver from "../nonogram/NonogramSolver";



export default class Nonogram extends Component {
  constructor(props) {
    super(props);
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
    //let solver = new Solver(document, this.props.data);
    //solver.solve();
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <table style={{ backgroundColor: "transparent", width: "100%" }}>
          <tbody
            style={{
              borderWidth: "0em",
              borderStyle: "hidden",
              backgroundColor: "transparent",
            }}
          >
            <tr>
              <td style={{ border: 0, backgroundColor: "transparent" }}></td>
              <td style={{ border: 0, backgroundColor: "transparent" }}>
                <Table
                  columns={this.props.data["columns"]}
                  rows={this.props.data["columnLayers"]}
                  data={this.props.data["columnData"]}
                  type="col"
                />
              </td>
            </tr>
            <tr>
              <td style={{ border: 0, backgroundColor: "transparent" }}>
                <Table
                  columns={this.props.data["rowLayers"]}
                  rows={this.props.data["rows"]}
                  data={this.props.data["rowData"]}
                  type="row"
                />
              </td>
              <td style={{ border: 0, backgroundColor: "transparent" }}>
                <Table
                  columns={this.props.data["columns"]}
                  rows={this.props.data["rows"]}
                  data={new Array(
                    this.props.data["columns"] * this.props.data["rows"]
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
