import React, { useState } from "react";
import PlaceDetail from "./PlaceDetail";

import { getOverlayAfterClick } from "../../../action/user_action";

import "../../styles/Place.scss";

function Place(props) {
  console.log("Place props searchResult", props.searchResult);
  const [detailOpenId, setDetailOpenId] = useState("");

  //더보기 클릭 핸들러
  function moreInfoClickHandler(e) {
    setDetailOpenId(e.currentTarget.id);
    getOverlayAfterClick(e.currentTarget.id, props.overlays);
  }
  return (
    <>
      <div className="scroll-list-container">
        <div className="search-list">
          {/* key 값이 안들어감 */}
          {props.searchResult && props.searchResult.length > 0 ? (
            props.searchResult.map((item, idx) => {
              return (
                <>
                  <div
                    onClick={moreInfoClickHandler}
                    id={item.id}
                    key={item.id}
                    className="place-summary"
                  >
                    <details
                      open={() => {
                        return item.id === detailOpenId;
                      }}
                    >
                      <summary>
                        <div>{idx}</div>
                        <div>{item.place_name}</div>
                        <div>{item.road_address_name}</div>
                        <div>{item.category_group_name}</div>
                      </summary>
                      <div className="place-detail">
                        <PlaceDetail place={item} />
                      </div>
                    </details>
                  </div>
                </>
              );
              // );
            })
          ) : props.isSearched ? (
            <div> 검색 결과가 없습니다.</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Place;
