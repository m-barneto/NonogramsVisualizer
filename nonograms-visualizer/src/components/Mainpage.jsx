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
    setSpinner(true);

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
          style={{ height: "1000px" }}
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
