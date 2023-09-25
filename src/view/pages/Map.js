import React, { useState, createContext } from "react";
import MapArea from "../components/Map/MapArea";
import SearchArea from "../components/Search/SearchArea";

import "./Map.scss";

//Context API
export const SearchResultsContext = createContext(null);

function Map() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      <div className="content-container">
        <SearchArea />
        <MapArea />
      </div>
    </SearchResultsContext.Provider>
  );
}

export default Map;
