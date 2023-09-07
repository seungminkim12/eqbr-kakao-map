import React, { useState } from "react";
import {
  pathButtonClickHandler,
  moreInfoButtonHandler,
} from "../../utils/CommonFunction";

function SearchMoreInfo(props) {
  //북마크 버튼 핸들러
  function bookmarkButtonHandler(place, setBookmark) {
    //저장되어 있는 북마크 가져옴
    const savedFavorData = JSON.parse(localStorage.getItem("eqbrFavorite"));
    //하나도 없는 case
    if (!savedFavorData) {
      localStorage.setItem(
        "eqbrFavorite",
        JSON.stringify([{ ...place, regDate: new Date() }])
      );
      return;
    }
    // 즐겨찾기에 추가한 데이터
    const id = place.id;
    // 기존 데이터와 중복 비교
    const checkId = savedFavorData.findIndex((data) => id === data.id);
    //중복 있을때 기존 데이터 삭제
    if (checkId >= 0) {
      savedFavorData.splice(checkId, 1);
    }

    //중복 제거한 기존 데이터 + 새로 추가할 데이터 추가
    localStorage.setItem(
      "eqbrFavorite",
      JSON.stringify([...savedFavorData, { ...place, regDate: new Date() }])
    );
  }

  return (
    <>
      <span>
        <button
          className="more-info-button"
          onClick={() => {
            moreInfoButtonHandler(props.place);
          }}
        >
          상세정보로 이동
        </button>
      </span>
      <span>
        <button
          className="bookmark-button"
          onClick={() => {
            bookmarkButtonHandler(props.place, props.setBookmark);
          }}
        >
          즐겨찾기 추가
        </button>
      </span>
      <span>
        <button
          className="path-button"
          onClick={() => {
            pathButtonClickHandler(props.place);
          }}
        >
          길찾기
        </button>
      </span>
    </>
  );
}

export default SearchMoreInfo;
