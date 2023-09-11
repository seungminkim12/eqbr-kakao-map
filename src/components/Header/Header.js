import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";

function Header() {
  const [selectedBtn, setSelectedBtn] = useState("");
  const location = useLocation();
  //menu btn click handler
  function menuBtnHandler(e) {
    setSelectedBtn(e.target.id);
  }

  useEffect(() => {
    setSelectedBtn(location.pathname.replace("/", ""));
  }, []);

  return (
    // <header className="header">
    <div className="header">
      <span className="header-items">
        <h1>LOGO</h1>
      </span>

      <Link to="/map" className="page-link">
        <span
          className={
            "header-items menu-btn" + (selectedBtn === "map" ? " select" : "")
          }
          id="map"
          onClick={menuBtnHandler}
        >
          <h1>지도</h1>
        </span>
      </Link>
      <Link to="/bookmark" className="page-link">
        <div
          className={
            "header-items menu-btn" +
            (selectedBtn === "bookmark" ? " select" : "")
          }
          id="bookmark"
          onClick={menuBtnHandler}
        >
          <h1>즐겨찾기</h1>
        </div>
      </Link>
    </div>
    // </header>
  );
}

export default Header;
