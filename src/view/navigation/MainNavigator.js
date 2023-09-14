import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Bookmark from "../pages/Bookmark";
import ErrorPage from "../pages/ErrorPage";
import Map from "../pages/Map";
import PageLayout from "../components/PageLayout";

function MainNavigator() {
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

export default MainNavigator;
