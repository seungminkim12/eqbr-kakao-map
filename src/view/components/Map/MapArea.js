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

  // const setOverlay = (overlay, keepMarkers) => {
  //   // keepMarkers = overlay;
  //   props.setOverlays((prev) => [...prev, overlay]);
  // };

  useEffect(() => {
    //렌더링 시 커스텀 오버레이 열리는 현상 방지
    if (props.keepMarkers && props.keepMarkers.length > 0) {
      // keepMarkers.forEach((keepMarker) => {
      //   console.log("keepMarker", keepMarker);
      //   keepMarker.setMap(null);
      // });
      // setKeepMarkers([]);
    }
    //

    searchResults &&
      searchResults.map((searchResult) => {
        displayMarkerAction(searchResult, props.setOverlay, props.overlays);
      });
  }, [searchResults]);

  return (
    <>
      <div className="map-container" ref={container}></div>
    </>
  );
};

export default MapArea;
