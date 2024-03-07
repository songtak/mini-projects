import React, { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Routes, Route, HashRouter } from "react-router-dom";

import _ from "lodash";

import MainRouter from "./MainRouter";
import { SajuPage, StampPage, MainPage, RemainDaysPage } from "./pages";

import "./Web.css";
import "./Mobile.css";

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        {/* <ScrollTop /> */}
        <Routes>
          <Route path="/" element={<RemainDaysPage />} />
          <Route path="/stamp" element={<StampPage />} />
          <Route path="/saju" element={<SajuPage />} />
          <Route path="/remaining-days" element={<RemainDaysPage />} />
        </Routes>
      </HashRouter>
      {/* <SajuPage /> */}
    </div>
  );
};

export default App;
