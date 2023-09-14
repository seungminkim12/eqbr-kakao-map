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
  const [isSearchResultReset, setIsSearchResultReset] = useState(false);
  // 검색결과 담는 state
  const [searchResult, setSearchResult] = useState([]);
  // 검색결과 pagination PageLayout
  const [currentPage, setCurrentPage] = useState(1);
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
        searchResult={searchResult}
        currentPage={currentPage}
        isSearchResultReset={isSearchResultReset}
        overlays={overlays}
        isSearchRequest={isSearchRequest}
        setMarkers={setMarkers}
        setSearchResult={setSearchResult}
        setCurrentPage={setCurrentPage}
        setIsSearchResultReset={setIsSearchResultReset}
        setOverlays={setOverlays}
        setIsSearchRequest={setIsSearchRequest}
      />
      <MapArea
        markers={markers}
        keepMarkers={keepMarkers}
        searchResult={searchResult}
        overlays={overlays}
        setKeepMarkers={setKeepMarkers}
        setSearchResult={setSearchResult}
        setOverlays={setOverlays}
      />
    </div>
  );
}

export default Map;
