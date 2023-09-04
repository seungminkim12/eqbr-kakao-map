import React, { useState } from "react";
import SearchContainer from "../Search/SearchContainer";
import MapContainer from "../Map/MapContainer";

function LandingPage() {
  const [markers, setMarkers] = useState([
    {
      x: 37.51086544448419,
      y: 127.04501336409375,
      place_name: "이큐비알홀딩스",
    },
  ]);
  return (
    <div style={{ display: "flex", overflow: "none", paddingTop: "50px" }}>
      <SearchContainer setMarkers={setMarkers} markers={markers} />
      <MapContainer markers={markers} />
    </div>
  );
}

export default LandingPage;
