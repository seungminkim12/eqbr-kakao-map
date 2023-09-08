import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import LandingPage from "../components/view/LandingPage/LandingPage";
import Bookmark from "../components/view/Bookmark/BookmarkContainer";
import ErrorPage from "../page/ErrorPage";
import PageLayout from "./PageLayout";

function Navigation() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Navigate replace to="/map" />}></Route>
        <Route path="/map" element={<LandingPage />}></Route>
        <Route path="/bookmark" element={<Bookmark />}></Route>
      </Route>
      <Route path="/*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default Navigation;
