import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Bookmark from "../page/Bookmark";
import ErrorPage from "../page/ErrorPage";
import Map from "../page/Map";
import PageLayout from "./PageLayout";

function Navigation() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Navigate replace to="/map" />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/bookmark" element={<Bookmark />}></Route>
      </Route>
      <Route path="/*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default Navigation;
