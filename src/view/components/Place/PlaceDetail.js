import React, { useState } from "react";
import {
  addPlaceInBookmark,
  openKakaoMapDetail,
  openKakaoMapNavigation,
} from "../../../action/user_action";

import "../../styles/PlaceDetail.scss";

function PlaceDetail(props) {
  //북마크 버튼 핸들러
  function bookmarkButtonHandler(place) {
    addPlaceInBookmark(place);
  }

  return (
    <>
      <div>{props.place.address_name}</div>
      <div>{props.place.phone}</div>
      <div>
        <span>
          <button
            className="place-button"
            onClick={() => {
              openKakaoMapDetail(props.place);
            }}
          >
            상세정보로 이동
          </button>
        </span>
        <span>
          <button
            className="place-button"
            onClick={() => {
              bookmarkButtonHandler(props.place, props.setBookmark);
            }}
          >
            즐겨찾기 추가
          </button>
        </span>
        <span>
          <button
            className="place-button"
            onClick={() => {
              openKakaoMapNavigation(props.place);
            }}
          >
            길찾기
          </button>
        </span>
      </div>
    </>
  );
}

export default PlaceDetail;
