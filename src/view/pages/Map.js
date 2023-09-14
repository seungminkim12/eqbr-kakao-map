import React, { useState } from "react";
import MapArea from "../components/Map/MapArea";
import SearchArea from "../components/Search/SearchArea";

import "../styles/Map.scss";

function Map(props) {
  // //marker 들의 장소 데이터
  // const [markersData, setMarkersData] = useState([]);
  //marker 객체
  const [markers, setMarkers] = useState([]);
  const [keepMarkers, setKeepMarkers] = useState([]);
  // 커스텀 오버레이 담고 있음
  const [overlays, setOverlays] = useState([]);
  //searchRequest
  const [isSearchRequest, setIsSearchRequest] = useState(false);

  return (
    <div className="content-container">
      <SearchArea
        markers={markers}
        // markersData={markersData}
        // setMarkersData={setMarkersData}
        bookmark={props.bookmark}
        overlays={overlays}
        isSearchRequest={isSearchRequest}
        setMarkers={setMarkers}
        setOverlays={setOverlays}
        setIsSearchRequest={setIsSearchRequest}
      />
      <MapArea
        markers={markers}
        keepMarkers={keepMarkers}
        overlays={overlays}
        setKeepMarkers={setKeepMarkers}
        setOverlays={setOverlays}
      />
    </div>
  );
}

export default Map;
