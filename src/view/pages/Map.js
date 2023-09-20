import React, { useState, createContext } from "react";
import MapArea from "../components/Map/MapArea";
import SearchArea from "../components/Search/SearchArea";

import "./Map.scss";

//Context API
export const SearchResultsContext = createContext(null);

function Map() {
  const [searchResults, setSearchResults] = useState([]);
  //searchRequest
  const [isSearchRequest, setIsSearchRequest] = useState(false);

  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      <div className="content-container">
        <SearchArea
          isSearchRequest={isSearchRequest}
          setIsSearchRequest={setIsSearchRequest}
        />
        <MapArea />
      </div>
    </SearchResultsContext.Provider>
  );
}

export default Map;
