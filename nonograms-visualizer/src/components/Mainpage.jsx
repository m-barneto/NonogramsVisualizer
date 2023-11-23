import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Nonogram from "./Nonogram.jsx";
import axios from "axios";
import Table from "./nonogram/Table";

export default function Mainpage() {
  const [spinner, setSpinner] = useState(false);
  const [data, setData] = useState(null);

  function search(query) {
    //setSpinner(true);
    setData(JSON.parse('{"hasColor":false,"columns":20,"rows":20,"colors":0,"columnLayers":6,"rowLayers":4,"colorCodes":[],"rowData":[-1,-1,6,6,-1,-1,8,7,-1,1,3,3,-1,-1,-1,5,-1,3,2,2,3,2,1,3,2,2,2,2,-1,2,3,2,-1,1,2,1,-1,-1,2,1,-1,1,3,1,-1,-1,-1,10,-1,-1,-1,18,-1,-1,1,17,-1,-1,-1,13,-1,-1,8,3,-1,4,1,3,-1,3,4,1,-1,4,2,1,6,3,1,4],"columnData":[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,2,-1,-1,-1,-1,-1,-1,-1,2,2,2,-1,-1,-1,1,-1,-1,3,1,2,1,2,2,-1,1,1,2,2,2,3,3,3,-1,2,3,4,-1,2,2,3,2,2,1,-1,1,1,2,3,5,5,6,2,4,10,6,5,4,4,3,3,1,2,1,1,1,1,1,1,1,1,1,6,9,1,1,1,5,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"rowColorData":[],"columnColorData":[]}'));
    console.log(data);
    return;

    let id = query.split("/").at(-1);
    axios
      .get("https://localhost:7026/nonograms/" + id)
      .then(function (response) {
        setSpinner(false);
        console.log(response["data"]);
        setData(JSON.parse(response["data"]));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <main className="container mt-3">
        <div className="bg-secondary-subtle p-2 mt-4 rounded-3">
          <SearchBar search={search}></SearchBar>
        </div>
        <div
          className="bg-secondary-subtle p-5 mt-4 rounded-3 d-flex align-items-center justify-content-center"
        >
          {spinner && (
            <img
              className="img-fluid"
              src="https://i.redd.it/yxw4e70jmgl71.gif"
              style={{ height: "15rem" }}
            ></img>
          )}
          {data && <Nonogram data={data}></Nonogram>}
        </div>
      </main>
    </div>
  );
}
