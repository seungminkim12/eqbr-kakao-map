import React, { useState, useEffect, useRef } from "react";
import { removePlaceInBookmark } from "../../../action/user_action";
import "../../styles/BookmarkArea.scss";

function BookmarkArea(props) {
  const { bookmarkList } = props;
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

  // <>
  //           <div className="bookmark-items">
  //             <div className="bmk-info-family">
  //               <div>{idx}</div>
  //               <div>{sb.place_name}</div>
  //               <div>{sb.road_address_name}</div>
  //               <div>{sb.phone}</div>
  //               <div>{sb.category_group_name}</div>
  //             </div>

  //             <div className="bmk-button-family">
  //               <div>
  //                 <button
  //                   className="bookmark-button"
  //                   onClick={(e) => deleteBookmarkBtnHandler(e, sb)}
  //                 >
  //                   즐겨찾기 해제
  //                 </button>
  //               </div>
  //               <div>
  //                 <button className="bookmark-button">상세정보로 이동</button>
  //               </div>
  //               <div>
  //                 <button className="bookmark-button">길찾기로 이동</button>
  //               </div>
  //             </div>
  //           </div>
  //         </>

  return (
    
      {bookmarkList && bookmarkList.length > 0 ? (
        bookmarkList.map((sb, idx) => (
          
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
  );
}

export default BookmarkArea;
