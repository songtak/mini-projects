import React, { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import _ from "lodash";

import MainRouter from "./MainRouter";
import { SajuPage, StampPage, MainPage, RemainDaysPage } from "./pages";

import "./Web.css";
import "./Mobile.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        {/* <ScrollTop /> */}
        <Routes>
          {/* <Route path="/*" element={<MainRouter />} /> */}
          {/* <Route path="/*" element={<StampPage />} /> */}
          {/* <Route path="/" /> */}
          <Route path="/main" element={<MainPage />} />
          <Route path="/saju" element={<SajuPage />} />
          <Route path="/remaining-days" element={<RemainDaysPage />} />
        </Routes>
      </Router>
      {/* <SajuPage /> */}
    </div>
  );
};

export default App;
