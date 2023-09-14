import React, { useState } from "react";
import PlaceDetail from "./PlaceDetail";

import { getOverlayAfterClick } from "../../../action/user_action";

import "../../styles/Place.scss";

function Place(props) {
  const [detailOpenId, setDetailOpenId] = useState("");

  //더보기 클릭 핸들러
  function moreInfoClickHandler(e) {
    setDetailOpenId(e.currentTarget.id);
    getOverlayAfterClick(e.currentTarget.id, props.overlays);
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
