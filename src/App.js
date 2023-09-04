import React, { useState } from "react";
import Header from "./components/view/Header";
import MapContainer from "./components/view/Map/MapContainer";
import SearchContainer from "./components/view/Search/SearchContainer";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/view/LandingPage";
import Bookmark from "./components/view/bookmark";

function App() {
  return (
    <>
      <div style={{ height: "100%" }}>
        <div style={{ display: "flex", overflow: "none" }}>
          <Header />
        </div>

        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/map" element={<LandingPage />}></Route>
          <Route path="/bookmark" element={<Bookmark />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
