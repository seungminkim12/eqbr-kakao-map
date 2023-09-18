import React, { useState } from "react";
import PlaceDetail from "./PlaceDetail";

import {
  getOverlayAction,
  getOverlayAfterClick,
} from "../../../action/userAction";

import "../../styles/Place.scss";

function Place(props) {
  const [detailOpenId, setDetailOpenId] = useState("");

  //더보기 클릭 핸들러
  function moreInfoClickHandler(e) {
    // 더보기 UX
    const detailsNodes = document.getElementsByTagName("details");
    for (let i = 0; i < detailsNodes.length; i++) {
      detailsNodes[i].removeAttribute("open");
    }
    setDetailOpenId(e.currentTarget.id);
    getOverlayAction(e.currentTarget.id);
  }

  return (
    <>
      <div
        onClick={moreInfoClickHandler}
        id={props.item.id}
        key={props.item.id}
        className="place-summary"
      >
        <details
          open={() => {
            return props.item.id === detailOpenId;
          }}
        >
          <summary>
            <div>{props.idx}</div>
            <div>{props.item.place_name}</div>
            <div>{props.item.road_address_name}</div>
            <div>{props.item.category_group_name}</div>
          </summary>
          <div className="place-detail">
            <PlaceDetail place={props.item} />
          </div>
        </details>
      </div>
    </>
  );
}

export default Place;
