import { addBookmarkAction } from "action/bookmarkAction";
import {
  openKakaoMapDetailAction,
  openKakaoMapNavigationAction,
} from "action/mapAction";
import React, { useState } from "react";

import "./PlaceDetail.scss";

function PlaceDetail(props) {
  //북마크 버튼 핸들러
  function bookmarkButtonHandler(place) {
    addBookmarkAction(place);
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
              openKakaoMapDetailAction(props.place);
            }}
          >
            상세정보로 이동
          </button>
        </span>
        <span>
          <button
            className="place-button"
            onClick={() => {
              bookmarkButtonHandler(props.place);
            }}
          >
            즐겨찾기 추가
          </button>
        </span>
        <span>
          <button
            className="place-button"
            onClick={() => {
              openKakaoMapNavigationAction(props.place);
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
