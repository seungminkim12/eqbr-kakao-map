import React, { forwardRef } from "react";

const ImageMap = forwardRef((props, ref) => {
  return (
    <>
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          visibility:
            props.savedBookmark && props.savedBookmark.length > 0
              ? "visible"
              : "hidden",
        }}
      >
        <div style={{}}>지도</div>
        <div
          id="staticMap"
          ref={ref}
          style={{
            // width: "100vw",
            // height: "100vh",
            width: "1000px",
            height: "500px",
            maxWidth: "2048px",
            maxHeight: "2048px",
          }}
        >
          지도영역
        </div>
      </div>
    </>
  );
});

export default ImageMap;
