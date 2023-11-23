import React, { Component, useState, useCallback, useEffect, useRef } from "react";
import "./Table.css";


const useResize = (myRef) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  
  const handleResize = useCallback(() => {
      setWidth(myRef.current.offsetWidth)
      setHeight(myRef.current.offsetHeight)
  }, [myRef])

  useEffect(() => {
    window.addEventListener('load', handleResize)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('load', handleResize)
      window.removeEventListener('resize', handleResize)
    }
  }, [myRef, handleResize])

  return { width, height }
}

export default function Table(props) {
  const compRef = useRef();
  const {width, height} = useResize(compRef);
  const {rows, columns, data, type} = props;

  const getWidth = () => {
    console.log("w: " + width);
    return true;
  }

  return (
    <table style={{ width: "100%" }} ref={compRef}>
      <tbody
        style={{
          borderWidth: "0em",
          borderStyle: "hidden",
          width: "100%",
        }}
      >
        {getWidth() && new Array(rows).fill(0).map((item, rowId) => (
          <tr key={rowId}>
            {new Array(columns).fill(0).map((item, colId) => (
              <td
                key={colId + "," + rowId}
                tile={type}
                x={colId}
                y={rowId}
                style={{
                  border: 0,
                  backgroundColor: "transparent",
                }}
              >
                <div
                  className="rounded-1"
                  style={{ backgroundColor: "#343a40" }}
                >
                  {data[rowId * columns + colId] === -1
                    ? ""
                    : data[rowId * columns + colId]}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
class Table2 extends Component {
  constructor(props) {
    super(props);
  }

  getWidth() {
    return true;
  }

  render() {
    return (
      <table style={{ width: "100%" }}>
        <tbody
          style={{
            borderWidth: "0em",
            borderStyle: "hidden",
            width: "100%",
          }}
        >
          {this.getWidth() && new Array(this.props.rows).fill(0).map((item, rowId) => (
            <tr key={rowId}>
              {new Array(this.props.columns).fill(0).map((item, colId) => (
                <td
                  key={colId + "," + rowId}
                  tile={this.props.type}
                  x={colId}
                  y={rowId}
                  style={{
                    border: 0,
                    backgroundColor: "transparent",
                  }}
                >
                  <div
                    className="rounded-1"
                    style={{ backgroundColor: "#343a40" }}
                  >
                    {this.props.data[rowId * this.props.columns + colId] === -1
                      ? ""
                      : this.props.data[rowId * this.props.columns + colId]}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
