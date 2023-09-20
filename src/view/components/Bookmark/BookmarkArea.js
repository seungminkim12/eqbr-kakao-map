import React, { useState, useEffect, useRef } from "react";
import { removePlaceInBookmark } from "../../../action/userAction";
import "./BookmarkArea.scss";

function BookmarkArea(props) {
  const { bmk, idx } = props;
  const confirmDelBookmark = useRef(null);

  function deleteBookmarkBtnHandler(e, place) {
    if (place.id !== confirmDelBookmark.current) {
      e.target.innerText = "즐겨찾기 추가";
      confirmDelBookmark.current = place.id;
    } else {
      e.target.innerText = "즐겨찾기 해제";
      confirmDelBookmark.current = null;
    }
  }

  useEffect(() => {
    return () => {
      removePlaceInBookmark(confirmDelBookmark.current);
    };
  }, []);

  return (
    <div className="bookmark-items">
      <div className="bmk-info-family">
        <div>{idx}</div>
        <div>{bmk.place_name}</div>
        <div>{bmk.road_address_name}</div>
        <div>{bmk.phone}</div>
        <div>{bmk.category_group_name}</div>
      </div>

      <div className="bmk-button-family">
        <div>
          <button
            className="bookmark-button"
            onClick={(e) => deleteBookmarkBtnHandler(e, bmk)}
          >
            즐겨찾기 해제
          </button>
        </div>
        <div>
          <button className="bookmark-button">상세정보로 이동</button>
        </div>
        <div>
          <button className="bookmark-button">길찾기로 이동</button>
        </div>
      </div>
    </div>
  );
}

export default BookmarkArea;
