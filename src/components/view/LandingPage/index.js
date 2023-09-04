import React, { useState } from "react";
import SearchContainer from "../Search/SearchContainer";
import MapContainer from "../Map/MapContainer";

function LandingPage() {
  const [markers, setMarkers] = useState([]);

  return (
    <div style={{ display: "flex", overflow: "none", paddingTop: "50px" }}>
      <SearchContainer setMarkers={setMarkers} markers={markers} />
      <MapContainer markers={markers} />
    </div>
  );
}

export default LandingPage;
