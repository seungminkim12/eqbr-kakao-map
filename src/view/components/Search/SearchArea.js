import React, { useState, useRef, useEffect, useCallback } from "react";
import Category from "../Category/Category";
import withSearchCB from "../HOC/withSearchCB";
import Place from "../Place/Place";
import {
  searchPlaceByCategory,
  searchPlaceByKeyword,
} from "../../../action/user_action";
import { KAKAO_REMOVE_ALL_MARKER } from "../../../server/module/kakao-api";
import { useSelector } from "react-redux";
// import { searchResult } from "../../../store/searchResults.js";

import "../../styles/SearchArea.scss";
import { searchResult } from "../../../store/searchResults";
import { CATEGORY_OBJ } from "view/asset/category.type";
import {
  currentPage,
  resetCurrentPage,
  searchCategory,
  searchKeyword,
  searchOption,
  setSearchKeyword,
} from "store/searchOptions";
import { storeDispatch } from "store/util";
import { deleteSearchResults } from "store/searchResults";
import searchOptionReset from "view/hooks/searchOptionReset";

function SearchArea(props) {
  //검색 키워드 selector
  const searchKeywordValue = useSelector(searchKeyword);
  //카테고리 selector
  const searchCategoryValue = useSelector(searchCategory);
  //검색결과 selector
  const searchResults = useSelector(searchResult);
  //검색 페이지 selector
  const searchCurrentPage = useSelector(currentPage);
  //카테고리 버튼 클릭 체크
  const [btnActive, setBtnActive] = useState();

  //input DOM
  const searchInputRef = useRef(null);

  console.log("searchResults redux", searchResults);

  //검색버튼 dom
  const searchBtnRef = useRef(null);

  const scrollTarget = useRef(null);

  const timerDebounceRef = useRef(null);
  //검색 input change 핸들러
  function onSearchIPChange(e) {
    //state 초기화 작업들
    props.setMarkers([]);
    searchOptionReset();
    KAKAO_REMOVE_ALL_MARKER();
    props.setIsSearchRequest(false);
    setBtnActive();

    storeDispatch(setSearchKeyword(e.target.value));
  }

  //검색 버튼 클릭 핸들러
  function searchClickHandler(e) {
    e.preventDefault();

    if (!props.isSearchRequest) {
      props.setIsSearchRequest(true);
      searchPlaceByKeyword(
        searchKeywordValue,
        props.placeSearchCB,
        searchCurrentPage,
        props.isSearchRequest
      );
    }
  }

  useEffect(() => {
    //state 초기화 작업들
    props.setMarkers([]);
    searchOptionReset();
    KAKAO_REMOVE_ALL_MARKER();
    props.setIsSearchRequest(false);
    setBtnActive();
  }, []);

  useEffect(() => {
    console.log("UF ");
    if (searchCategoryValue) {
      // 카테고리로 검색하는 유저 액션
      searchPlaceByCategory(
        searchCategoryValue,
        props.placeSearchCB,
        searchCurrentPage
      );
    }
  }, [searchCategoryValue]);

  function handleDebounceScroll(e) {
    const { scrollHeight, scrollTop, offsetHeight } = e.target;
    if (timerDebounceRef.current) {
      clearTimeout(timerDebounceRef.current);
    }

    timerDebounceRef.current = setTimeout(() => {
      if (scrollHeight <= scrollTop + offsetHeight) {
        if (!props.isSearchRequest) {
          props.setIsSearchRequest(true);
          if (searchKeywordValue) {
            searchPlaceByKeyword(
              searchKeywordValue,
              props.placeSearchCB,
              searchCurrentPage,
              props.isSearchRequest
            );
          } else {
            searchPlaceByCategory(
              searchCategoryValue,
              props.placeSearchCB,
              searchCurrentPage,
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
            placeholder={!searchKeywordValue ? "키워드를 입력해주세요" : ""}
            onChange={onSearchIPChange}
            ref={searchInputRef}
            value={searchKeywordValue}
            className="search-bar"
          />
          <button
            onClick={searchClickHandler}
            ref={searchBtnRef}
            disabled={!searchKeywordValue}
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
          {Object.entries(CATEGORY_OBJ).map(([id, value], idx) => {
            return (
              <Category
                markers={props.markers}
                setMarkers={props.setMarkers}
                isSearched={props.isSearched}
                isSearchRequest={props.isSearchRequest}
                setIsSearchRequest={props.setIsSearchRequest}
                setBtnActive={setBtnActive}
                key={id}
                id={id}
                idx={idx}
                value={value}
              />
            );
          })}
        </div>
        <div
          className="scroll-container"
          // ref={scrollTarget}
        >
          <div className="scroll-list-container">
            <div className="search-list">
              {/* key 값이 안들어감 */}
              {searchResults && searchResults.length > 0 ? (
                searchResults.map((item, idx) => {
                  return <Place item={item} idx={idx} key={item.id} />;
                })
              ) : props.isSearched ? (
                <div> 검색 결과가 없습니다.</div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withSearchCB(SearchArea);
