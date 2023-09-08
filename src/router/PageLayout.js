import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/view/Header/Header";

function PageLayout() {
  return (
    <>
      <div style={{ height: "100%" }}>
        <div style={{ display: "flex", overflow: "none" }}>
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default PageLayout;
