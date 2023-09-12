import React, { useRef, useEffect, useState } from "react";
import { KAKAO_CREATE_MAP, KAKAO_DISPLAY_MARKER } from "../../module/kakao-api";

import "./MapArea.scss";

const MapArea = (props) => {
  console.log("map Area", props);

  //지도를 담을 영역의 DOM 레퍼런스
  const container = useRef(null);
  // const [keepMarkers, setKeepMarkers] = useState([]);

  //eqbr 마커 생성을 위한 useEffect
  useEffect(() => {
    KAKAO_CREATE_MAP(container, false);
  }, []);

  const setOverlay = (overlay, keepMarkers) => {
    // keepMarkers = overlay;
    props.setOverlays((prev) => [...prev, overlay]);
  };

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
    props.markers &&
      props.markers.map((marker) => {
        // props.setKeepMarkers([...props.keepMarkers, marker]);
        KAKAO_DISPLAY_MARKER(marker, setOverlay, props.overLays);
      });
  }, [props.markers]);

  return <div className="map-container" ref={container}></div>;
};

export default MapArea;
