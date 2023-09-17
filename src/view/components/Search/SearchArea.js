import React, { useState, useRef, useEffect, useContext } from "react";
import Category from "../Category/Category";
import Place from "../Place/Place";

import { KAKAO_REMOVE_ALL_MARKER } from "../../../server/module/kakao-api";
import { useSelector } from "react-redux";
// import { searchResult } from "../../../store/searchResults.js";

import "../../styles/SearchArea.scss";
import { searchResult } from "../../../store/searchResults";
import { CATEGORY_OBJ } from "view/asset/category.type";
// import {
//   currentPage,
//   resetCurrentPage,
//   searchCategory,
//   searchKeyword,
//   searchOption,
//   setSearchKeyword,
// } from "store/searchOptions";
import { storeDispatch } from "store/util";
import { deleteSearchResults } from "store/searchResults";
import searchOptionReset from "view/hooks/searchOptionReset";
import { SearchResultsContext } from "../../pages/Map";
import {
  searchPlaceByKeywordAction,
  searchPlaceByCategoryAction,
} from "action/userAction";
import { resetMarkerAction } from "action/mapAction";

function SearchArea(props) {
  //검색 input state
  const [searchInputValue, setSearchInputValue] = useState("");
  //검색 키워드 state
  const [searchKeywordValue, setSearchKeywordValue] = useState("");
  //검색 키워드 state
  const [searchCategoryValue, setSearchCategoryValue] = useState("");
  //검색결과 state
  // const [searchResults, setSearchResults] = useState([]);
  //검색 페이지 state
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);

  const [isSearchRequest, setIsSearchRequest] = useState(false);

  const { searchResults, setSearchResults } = useContext(SearchResultsContext);

  //카테고리 버튼 클릭 체크
  const [btnActive, setBtnActive] = useState();

  const [result, setResult] = useState();

  //input DOM
  const searchInputRef = useRef(null);

  //검색버튼 dom
  const searchBtnRef = useRef(null);

  const scrollTarget = useRef(null);

  const timerDebounceRef = useRef(null);

  //검색 input change 핸들러
  function onSearchIPChange(e) {
    setSearchInputValue(e.target.value);
    //state 초기화 작업들
    // props.setMarkers([]);
    searchOptionReset();
    // KAKAO_REMOVE_ALL_MARKER();
    resetMarkerAction();
    props.setIsSearchRequest(false);
    setBtnActive();
  }

  //검색 버튼 클릭 핸들러
  function searchClickHandler(e) {
    e.preventDefault();
    setSearchKeywordValue(searchInputValue);
    // if (!isSearchRequest) {
    //   setIsSearchRequest(true);
    //   searchPlaceByKeywordAction(searchKeywordValue, searchCurrentPage);
    // }
  }

  useEffect(() => {
    //state 초기화 작업들
    // props.setMarkers([]);
    searchOptionReset();
    resetMarkerAction();
    // KAKAO_REMOVE_ALL_MARKER();
    props.setIsSearchRequest(false);
    setBtnActive();
  }, []);

  useEffect(() => {
    if (searchCategoryValue) {
      // 카테고리로 검색하는 유저 액션
      const asyncSearchPlaceByCategoryAction = async () => {
        const result = await searchPlaceByCategoryAction(
          searchCategoryValue,
          searchCurrentPage
        );
        result &&
          setSearchResults([
            ...(searchResults ? searchResults : []),
            ...result.data,
          ]);
      };
      asyncSearchPlaceByCategoryAction();
    } else if (searchKeywordValue) {
      const asyncSearchPlaceByKeywordAction = async () => {
        const result = await searchPlaceByKeywordAction(
          searchKeywordValue,
          searchCurrentPage
        );
        result &&
          setSearchResults([
            ...(searchResults ? searchResults : []),
            ...result.data,
          ]);
      };

      asyncSearchPlaceByKeywordAction();
    }
  }, [searchCategoryValue, searchKeywordValue]);

  useEffect(() => {
    searchResults && searchResults.length > 0
      ? setSearchCurrentPage((prev) => prev + 1)
      : setSearchCurrentPage(1);
    setIsSearchRequest(false);
  }, [searchResults]);

  function handleDebounceScroll(e) {
    const { scrollHeight, scrollTop, offsetHeight } = e.target;
    if (timerDebounceRef.current) {
      clearTimeout(timerDebounceRef.current);
    }

    timerDebounceRef.current = setTimeout(async () => {
      if (scrollHeight <= scrollTop + offsetHeight) {
        if (!isSearchRequest) {
          setIsSearchRequest(true);
          if (searchKeywordValue) {
            const result = await searchPlaceByKeywordAction(
              searchKeywordValue,
              searchCurrentPage,
              props.isSearchRequest
            );
            result &&
              setSearchResults([
                ...(searchResults ? searchResults : []),
                ...result.data,
              ]);
          } else {
            const result = await searchPlaceByCategoryAction(
              searchCategoryValue,
              searchCurrentPage,
              props.isSearchRequest
            );
            result &&
              setSearchResults([
                ...(searchResults ? searchResults : []),
                ...result.data,
              ]);
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
          {Object.entries(CATEGORY_OBJ).map(([id, value], idx) => {
            return (
              <Category
                // markers={props.markers}
                // setMarkers={props.setMarkers}
                // isSearched={props.isSearched}
                // isSearchRequest={props.isSearchRequest}
                setIsSearchRequest={props.setIsSearchRequest}
                btnActive={btnActive}
                setBtnActive={setBtnActive}
                setSearchCategoryValue={setSearchCategoryValue}
                setSearchCurrentPage={setSearchCurrentPage}
                // setSearchResults={setSearchResults}
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

export default SearchArea;
