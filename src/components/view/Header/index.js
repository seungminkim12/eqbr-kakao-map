import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [selectedBtn, setSelectedBtn] = useState("map");

  //menu btn click handler
  function menuBtnHandler(e) {
    setSelectedBtn(e.target.id);
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "50px",
        width: "100%",
        display: "flex",
        backgroundColor: "#4B8FFF",
        zIndex: 2,
        alignItems: "center",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100px",
          justifyContent: "center",
          justifyItems: "center",
          textAlign: "center",
        }}
      >
        logo
      </div>

      <Link to="/map" className="page-link">
        <div
          style={{ width: "50px" }}
          className={"menu-btn" + (selectedBtn === "map" ? " select" : "")}
          id="map"
          onClick={menuBtnHandler}
        >
          지도
        </div>
      </Link>
      <Link to="/bookmark" className="page-link">
        <div
          style={{ width: "60px" }}
          className={"menu-btn" + (selectedBtn === "bookmark" ? " select" : "")}
          id="bookmark"
          onClick={menuBtnHandler}
        >
          즐겨찾기
        </div>
      </Link>
    </header>
  );
}

export default Header;
