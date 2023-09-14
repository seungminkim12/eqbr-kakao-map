import React, { useState, useEffect } from "react";

import withSearchCB from "../HOC/withSearchCB";
import { KAKAO_REMOVE_ALL_MARKER } from "../../../server/module/kakao-api";

import "../../styles/Category.scss";
import { storeDispatch } from "store/util";
import { resetCurrentPage, setSearchCategory } from "store/searchOptions";
import searchOptionReset from "view/hooks/searchOptionReset";

function Category(props) {
  //카테고리 버튼 클릭 핸들러
  function cateBtnClickHandler(e) {
    //초기화 작업
    searchOptionReset();

    props.setBtnActive(+e.target.value);
    storeDispatch(setSearchCategory(e.target.id));

    //초기화 작업들
    props.setMarkers([]);
    KAKAO_REMOVE_ALL_MARKER();
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

export default withSearchCB(Category);
