import { resetMarkerAction } from "action/mapAction";
import React, { useState, useEffect, useContext } from "react";
import { SearchResultsContext } from "view/pages/Map";

import "../../styles/Category.scss";

function Category(props) {
  const { setSearchResults } = useContext(SearchResultsContext);
  //카테고리 버튼 클릭 핸들러
  function cateBtnClickHandler(e) {
    //카테고리 버튼 클릭 체크
    props.setBtnActive(+e.target.value);
    props.setSearchCategoryValue(e.target.id);

    //초기화 작업들
    props.setSearchCurrentPage(1);
    setSearchResults([]);
    // props.setMarkers([]);
    // KAKAO_REMOVE_ALL_MARKER();
    resetMarkerAction();
    props.setIsSearchRequest(false);
  }

  return (
    <button
      id={props.id}
      value={props.idx}
      onClick={cateBtnClickHandler}
      className={
        "category-item cate-btn" +
        (props.idx === props.btnActive ? " active" : "")
      }
    >
      {props.value}
    </button>
  );
}

export default Category;
