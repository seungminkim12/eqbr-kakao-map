import React, { useState, useRef, useEffect } from "react";
import Category from "../Category/Category";
import withSearchCB from "../HOC/withSearchCB";
import Place from "../Place/Place";
import { searchPlaceByKeyword } from "../../../action/user_action";

function SearchArea(props) {
  console.log("searchArea", props);
  const [searchInputValue, setSearchInputValue] = useState("");

  //검색버튼 dom
  const searchBtnRef = useRef(null);

  //검색 input change 핸들러
  function onSearchIPChange(e) {
    setSearchInputValue(e.target.value);
  }

  //검색 버튼 클릭 핸들러
  function searchClickHandler(e) {
    e.preventDefault();
    //키워드로 검색하는 유저 액션
    searchPlaceByKeyword(
      searchInputValue,
      props.placeSearchCB,
      props.currentPage
    );
  }

  return (
    <>
      <span
        style={{
          width: "300px",
          overflow: "hidden",
          height: "1000px",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <input
            type="text"
            placeholder={!searchInputValue ? "키워드를 입력해주세요" : ""}
            onChange={onSearchIPChange}
          />
          <input
            type="button"
            value="검색"
            onClick={searchClickHandler}
            ref={searchBtnRef}
            disabled={!searchInputValue}
          />
        </div>
        <div style={{ overflow: "hidden" }}>
          <Category
            searchResult={props.searchResult}
            setSearchResult={props.setSearchResult}
            markers={props.markers}
            setMarkers={props.setMarkers}
            isSearched={props.isSearched}
            currentPage={props.currentPage}
            setCurrentPage={props.setCurrentPage}
          />
        </div>
        <div
          style={{
            position: "absolute",
            height: "1000px",
            overflow: "hidden",
          }}
        >
          <Place
            searchResult={props.searchResult}
            setSearchResult={props.setSearchResult}
            isSearched={props.isSearched}
          />
        </div>
      </span>
    </>
  );
}

export default withSearchCB(SearchArea);
