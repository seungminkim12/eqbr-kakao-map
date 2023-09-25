import {
  displayMarkerAction,
  renderMapAction,
  zoomMapAction,
} from "action/mapAction";
import React, { useRef, useEffect, useState, useContext } from "react";
import { SearchResultsContext } from "view/pages/Map";

import "./MapArea.scss";

const MapArea = (props) => {
  //지도를 담을 영역의 DOM 레퍼런스
  const container = useRef(null);
  const { searchResults } = useContext(SearchResultsContext);

  //eqbr 마커 생성을 위한 useEffect
  useEffect(() => {
    renderMapAction(container, false);
  }, []);

  useEffect(() => {
    searchResults &&
      searchResults.map((searchResult) => {
        displayMarkerAction(searchResult, false);
      });
  }, [searchResults]);

  const handleZoomBtnHandler = (e) => {
    console.log("e.target.id", e.currentTarget.id);
    const zoomType = e.currentTarget.id === "zoomInBtn" ? true : false;
    zoomMapAction(zoomType);
  };

  return (
    <>
      <div className="map-container" ref={container}></div>
      <div className="custom_zoomcontrol radius_border">
        <span onClick={handleZoomBtnHandler} id="zoomInBtn">
          <img
            src={
              "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
            }
            alt={"확대"}
          />
        </span>
        <span onClick={handleZoomBtnHandler} id="zoomOutBtn">
          <img
            src={
              "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
            }
            alt={"축소"}
          />
        </span>
      </div>
    </>
  );
};

export default MapArea;
