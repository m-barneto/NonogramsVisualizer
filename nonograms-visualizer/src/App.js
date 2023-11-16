import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import Mainpage from "./components/Mainpage";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Mainpage />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
