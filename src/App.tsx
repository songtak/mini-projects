import React, { useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import _ from "lodash";

import MainRouter from "./MainRouter";
import ScrollToTop from "./libs/ScrollToTop";

import "./Web.css";
import "./Mobile.css";

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<MainRouter />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
