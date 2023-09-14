import React, { useState, useEffect } from "react";
import { searchPlaceByCategory } from "../../../action/user_action";
import withSearchCB from "../HOC/withSearchCB";
import { CATEGORY_OBJ } from "../../asset/category.type";
import { KAKAO_REMOVE_ALL_MARKER } from "../../../server/module/kakao-api";

import "../../styles/Category.scss";

function Category(props) {
  console.log("Cate props", props.searchResult);
  //카테고리 버튼 클릭 핸들러
  function cateBtnClickHandler(e) {
    props.setBtnActive(+e.target.value);
    props.setSearchCategory(e.target.id);

    //초기화 작업들
    props.setMarkers([]);
    props.setSearchResult();
    props.setCurrentPage(1);
    KAKAO_REMOVE_ALL_MARKER();
    props.setIsSearchRequest(false);
    props.setSearchInputValue();
  }

  useEffect(() => {
    // 카테고리로 검색하는 유저 액션
    searchPlaceByCategory(
      props.searchCategory,
      props.placeSearchCB,
      props.currentPage
    );
  }, [props.searchCategory]);

  return (
    <div className="category-form">
      {Object.entries(CATEGORY_OBJ).map(([key, value], idx) => {
        return (
          <>
            <button
              key={idx}
              id={key}
              value={idx}
              onClick={cateBtnClickHandler}
              className={
                "category-item cate-btn" +
                (idx === props.btnActive ? " active" : "")
              }
            >
              {value}
            </button>
          </>
        );
      })}
    </div>
  );
}

export default withSearchCB(Category);
