import React, { useState, useEffect, useRef } from "react";
import { removePlaceInBookmark } from "../../action/user_action";
import "./BookmarkArea.scss";

function BookmarkArea(props) {
  const { bookmarkList } = props;
  const confirmDelBookmark = useRef(null);
  console.log("props", props);
  console.log("bookmarkList", bookmarkList);

  function deleteBookmarkBtnHandler(e, place) {
    console.log("id", place.id);
    console.log("confirmDelBookmark", confirmDelBookmark);
    if (place.id !== confirmDelBookmark.current) {
      console.log("diff");
      e.target.innerText = "즐겨찾기 추가";
      confirmDelBookmark.current = place.id;
    } else {
      console.log("same");
      e.target.innerText = "즐겨찾기 해제";
      confirmDelBookmark.current = null;
    }
  }

  useEffect(() => {
    return () => {
      console.log("confirmDelBookmark", confirmDelBookmark);
      removePlaceInBookmark(confirmDelBookmark.current);
    };
  }, []);

  return (
    <div className="bookmark-container">
      {bookmarkList && bookmarkList.length > 0 ? (
        bookmarkList.map((sb, idx) => (
          <>
            <div className="bookmark-items">
              <div className="bmk-info-family">
                <div>{idx}</div>
                <div>{sb.place_name}</div>
                <div>{sb.road_address_name}</div>
                <div>{sb.phone}</div>
                <div>{sb.category_group_name}</div>
              </div>

              <div className="bmk-button-family">
                <div>
                  <button
                    className="bookmark-button"
                    onClick={(e) => deleteBookmarkBtnHandler(e, sb)}
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
          </>
        ))
      ) : (
        <div>
          <div>
            <h1>즐겨찾기에 추가된 장소가 없습니다.</h1>
          </div>
          <div>
            <button>추가하러 가기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookmarkArea;
