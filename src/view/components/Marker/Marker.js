import { displayMarkerAction } from "action/mapAction";
import React, { useEffect } from "react";

function Marker(props) {
  console.log("marker props.searchResult", props.searchResult);
  useEffect(() => {
    displayMarkerAction(props.searchResult, props.setOverlay, props.overlays);
  }, [props.searchResult]);
  return;
}

export default Marker;
