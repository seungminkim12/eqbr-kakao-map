import React, { useState, useRef, useEffect, useCallback } from "react";
import Category from "../Category/Category";
import withSearchCB from "../HOC/withSearchCB";
import Place from "../Place/Place";
import {
  searchPlaceByKeyword,
  searchPlaceByCategory,
} from "../../action/user_action";

import "./SearchArea.scss";
import {
  KAKAO_DISPLAY_MARKER,
  KAKAO_REMOVE_ALL_MARKER,
  KAKAO_REMOVE_MARKER,
} from "../../module/kakao-api";

function SearchArea(props) {
  console.log("searchArea", props);
  const [searchInputValue, setSearchInputValue] = useState("");
  //카테고리 키워드
  const [searchCategory, setSearchCategory] = useState("");
  //카테고리 버튼 클릭 체크
  const [btnActive, setBtnActive] = useState();
  const searchInputRef = useRef(null);

  //검색버튼 dom
  const searchBtnRef = useRef(null);

  const scrollTarget = useRef(null);

  const timerDebounceRef = useRef(null);
  //검색 input change 핸들러
  function onSearchIPChange(e) {
    //state 초기화 작업들
    props.setMarkers([]);
    props.setSearchResult([]);
    props.setCurrentPage(1);
    KAKAO_REMOVE_ALL_MARKER();
    props.setIsSearchRequest(false);
    setBtnActive();

    setSearchInputValue(e.target.value);
  }

  //검색 버튼 클릭 핸들러
  function searchClickHandler(e) {
    e.preventDefault();

    if (!props.isSearchRequest) {
      props.setIsSearchRequest(true);
      searchPlaceByKeyword(
        searchInputValue,
        props.placeSearchCB,
        props.currentPage,
        props.isSearchRequest
      );
    }
  }

  useEffect(() => {
    //state 초기화 작업들
    props.setMarkers([]);
    props.setSearchResult([]);
    props.setCurrentPage(1);
    KAKAO_REMOVE_ALL_MARKER();
    props.setIsSearchRequest(false);
    setBtnActive();
  }, [searchCategory]);

  function handleDebounceScroll(e) {
    const { scrollHeight, scrollTop, offsetHeight } = e.target;
    if (timerDebounceRef.current) {
      clearTimeout(timerDebounceRef.current);
    }

    timerDebounceRef.current = setTimeout(() => {
      if (scrollHeight <= scrollTop + offsetHeight) {
        if (!props.isSearchRequest) {
          props.setIsSearchRequest(true);
          if (searchInputValue) {
            searchPlaceByKeyword(
              searchInputValue,
              props.placeSearchCB,
              props.currentPage,
              props.isSearchRequest
            );
          } else {
            searchPlaceByCategory(
              searchCategory,
              props.placeSearchCB,
              props.currentPage,
              props.isSearchRequest
            );
          }
        }
      }
    }, 500);
  }

  return (
    <>
      <div
        className="search-container"
        ref={scrollTarget}
        onScroll={handleDebounceScroll}
      >
        <div className="search-form">
          <input
            type="text"
            placeholder={!searchInputValue ? "키워드를 입력해주세요" : ""}
            onChange={onSearchIPChange}
            ref={searchInputRef}
            value={searchInputValue}
            className="search-bar"
          />
          <button
            onClick={searchClickHandler}
            ref={searchBtnRef}
            disabled={!searchInputValue}
            className="search-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>
        </div>
        <div className="category-form">
          <Category
            searchResult={props.searchResult}
            setSearchResult={props.setSearchResult}
            markers={props.markers}
            setMarkers={props.setMarkers}
            isSearched={props.isSearched}
            currentPage={props.currentPage}
            setCurrentPage={props.setCurrentPage}
            isSearchRequest={props.isSearchRequest}
            setIsSearchRequest={props.setIsSearchRequest}
            setSearchInputValue={setSearchInputValue}
            btnActive={btnActive}
            setBtnActive={setBtnActive}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
          />
        </div>
        <div
          className="scroll-container"
          // ref={scrollTarget}
        >
          <Place
            searchResult={props.searchResult}
            setSearchResult={props.setSearchResult}
            isSearched={props.isSearched}
            overlays={props.overlays}
          />
        </div>
      </div>
    </>
  );
}

export default withSearchCB(SearchArea);
