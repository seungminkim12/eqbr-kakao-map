import React from "react";
import "../../styles/BookmarkMapArea.scss";

export default React.forwardRef(function BookmarkMapArea(props, ref) {
  return (
    <div className="imagemap-container">
      <div className="map">지도</div>
      <div
        id="staticMap"
        style={{ width: "70vw", height: "60vh" }}
        ref={ref}
      ></div>
    </div>
  );
});
