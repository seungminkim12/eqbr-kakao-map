import React, { useState, createContext } from "react";
import MapArea from "../components/Map/MapArea";
import SearchArea from "../components/Search/SearchArea";

import "../styles/Map.scss";
import { Provider } from "react-redux";
//Context API
export const SearchResultsContext = createContext(null);

function Map() {
  const [searchResults, setSearchResults] = useState([]);
  const [keepMarkers, setKeepMarkers] = useState([]);
  // 커스텀 오버레이 담고 있음
  const [overlays, setOverlays] = useState([]);
  //searchRequest
  const [isSearchRequest, setIsSearchRequest] = useState(false);

  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      <div className="content-container">
        <SearchArea
          // markers={markers}
          // markersData={markersData}
          // setMarkersData={setMarkersData}
          // setMarkers={setMarkers}
          // setOverlays={setOverlays}
          // overlays={overlays}
          // bookmark={props.bookmark}
          isSearchRequest={isSearchRequest}
          setIsSearchRequest={setIsSearchRequest}
        />
        <MapArea
        // markers={markers}
        // keepMarkers={keepMarkers}
        // overlays={overlays}
        // setKeepMarkers={setKeepMarkers}
        // setOverlays={setOverlays}
        />
      </div>
    </SearchResultsContext.Provider>
  );
}

export default Map;
