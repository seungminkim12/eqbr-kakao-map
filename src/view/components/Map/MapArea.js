import { displayMarkerAction, renderMapAction } from "action/mapAction";
import React, { useRef, useEffect, useState, useContext } from "react";
import { SearchResultsContext } from "view/pages/Map";

import "../../styles/MapArea.scss";
import Marker from "../Marker/Marker";

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

  return (
    <>
      <div className="map-container" ref={container}></div>
    </>
  );
};

export default MapArea;
