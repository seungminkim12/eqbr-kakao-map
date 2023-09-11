import React, { useState } from "react";
import MapArea from "../Map/MapArea";
import SearchArea from "../Search/SearchArea";

function Map(props) {
  const [markers, setMarkers] = useState([]);
  const [keepMarkers, setKeepMarkers] = useState([]);
  const [isSearchResultReset, setIsSearchResultReset] = useState(false);
  // 검색결과 담는 state
  const [searchResult, setSearchResult] = useState([]);
  // 검색결과 pagination PageLayout
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="content-container">
      <SearchArea
        setMarkers={setMarkers}
        markers={markers}
        bookmark={props.bookmark}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isSearchResultReset={isSearchResultReset}
        setIsSearchResultReset={setIsSearchResultReset}
      />

      <MapArea
        markers={markers}
        keepMarkers={keepMarkers}
        setKeepMarkers={setKeepMarkers}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
    </div>
  );
}

export default Map;
