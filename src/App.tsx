import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import _ from "lodash";

import MainRouter from "./MainRouter";
import { SajuPage, StampPage, MainPage } from "./pages";

import "./Web.css";
import "./Mobile.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <ScrollTop /> */}
        <Routes>
          {/* <Route path="/*" element={<MainRouter />} /> */}
          <Route path="/*" element={<StampPage />} />
          <Route path="/" />
          <Route path="/main" element={<MainPage />} />
          <Route path="/saju" element={<SajuPage />} />
        </Routes>
      </BrowserRouter>
      {/* <SajuPage /> */}
    </div>
  );
};

export default App;
