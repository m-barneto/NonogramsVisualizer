import React, { Component } from 'react';
import Table from './Table';

export default class Nonogram extends Component {
  constructor(props) {
    super(props);
    this.data = JSON.parse("{\"hasColor\":false,\"columns\":9,\"rows\":7,\"colors\":0,\"columnLayers\":3,\"rowLayers\":2,\"colorCodes\":[],\"rowData\":[-1,9,1,1,1,1,1,1,-1,9,-1,1,-1,3],\"columnData\":[-1,-1,-1,1,-1,1,-1,-1,-1,-1,1,1,1,1,1,1,1,-1,5,1,1,1,3,1,1,1,5],\"rowColorData\":[],\"columnColorData\":[]}");
  }
  
  render() {
    return (
      <div>
        <table>
          <tbody>
            {// Top row
            }
            <tr>
              {// Top left
              }
              <td></td>
              {// Columns
              }
              <td>
              <Table columns={this.data["columns"]} rows={this.data["columnLayers"]} data={this.data["columnData"]}/>
              </td>
            </tr>
            {// Bottom row
            }
            <tr>
              {// Rows
              }
              <td>
                <Table columns={this.data["rowLayers"]} rows={this.data["rows"]} data={this.data["rowData"]}/>
              </td>
              {// Data
              }
              <td>
                <Table columns={this.data["columns"]} rows={this.data["rows"]} data={new Array(this.data["columns"] * this.data["rows"]).fill(-1)}/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
