import React, { Component } from 'react';
import "./Table.css"

export default class Table extends Component {
  render() {
    return (
      <table>
        <tbody>
        {
          new Array(this.props.rows).fill(0).map((item, rowId) => (
            <tr key={rowId}>
              {
                new Array(this.props.columns).fill(0).map((item, colId) => (
                  <td key={colId + "," + rowId} tile={this.props.type} x={colId} y={rowId}>
                    <div>{
                    this.props.data[(rowId * this.props.columns) + colId] === -1 ? "" : this.props.data[(rowId * this.props.columns) + colId]
                    }</div>
                  </td>
                ))
              }
            </tr>
          ))
        }
        </tbody>
      </table>
    );
  }
}