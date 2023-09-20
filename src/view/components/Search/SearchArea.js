import React, { useState, useRef, useEffect, useContext } from "react";
import Category from "../Category/Category";
import Place from "../Place/Place";

import { CATEGORY_OBJ } from "view/asset/category.type";
import { SearchResultsContext } from "../../pages/Map";

import {
  resetMarkerAction,
  searchPlaceByCategoryAction,
  searchPlaceByKeywordAction,
} from "action/mapAction";

import "./SearchArea.scss";

function SearchArea(props) {
  //검색 input state
  const [searchInputValue, setSearchInputValue] = useState("");
  //검색 키워드 state
  const [searchKeywordValue, setSearchKeywordValue] = useState("");
  //검색 키워드 state
  const [searchCategoryValue, setSearchCategoryValue] = useState("");
  //검색 페이지 state
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  //검색 API request 요청 플래그
  const [isSearchRequest, setIsSearchRequest] = useState(false);
  //검색결과 Context API
  const { searchResults, setSearchResults } = useContext(SearchResultsContext);

  //카테고리 버튼 클릭 체크
  const [btnActive, setBtnActive] = useState();

  //input DOM
  const searchInputRef = useRef(null);

  //검색버튼 dom
  const searchBtnRef = useRef(null);

  const timerDebounceRef = useRef(null);

  //검색 input change 핸들러
  function onSearchIPChange(e) {
    setSearchInputValue(e.target.value);

    //state 초기화 작업들
    resetMarkerAction();
    setIsSearchRequest(false);
    setBtnActive();
    setSearchResults([]);
    setSearchCategoryValue();
  }

  //검색 버튼 클릭 핸들러
  function searchClickHandler(e) {
    e.preventDefault();
    setSearchKeywordValue(searchInputValue);
    setSearchCurrentPage(1);
  }

  useEffect(() => {
    //state 초기화 작업들
    resetMarkerAction();
    setIsSearchRequest(false);
    setBtnActive();
  }, []);

  function setSearchResultsHandler(result) {
    if (!result.result) return;
    setSearchResults([
      ...(searchResults ? searchResults : []),
      ...result.result.data,
    ]);
  }

  useEffect(() => {
    // setSearchResults([]);
    if (searchCategoryValue) {
      // 카테고리로 검색하는 유저 액션
      const asyncSearchPlaceByCategoryAction = async () => {
        const result = await searchPlaceByCategoryAction(
          searchCategoryValue,
          searchCurrentPage
        );
        setSearchResultsHandler(result);
      };

      asyncSearchPlaceByCategoryAction();
    } else if (searchKeywordValue) {
      //키워드로 검색하는 유저 액션
      const asyncSearchPlaceByKeywordAction = async () => {
        const result = await searchPlaceByKeywordAction(
          searchKeywordValue,
          searchCurrentPage
        );
        setSearchResultsHandler(result);
      };

      asyncSearchPlaceByKeywordAction();
    }
  }, [searchCategoryValue, searchKeywordValue]);

  useEffect(() => {
    //검색 결과에 따른 현재 검색 페이지 설정
    searchResults && searchResults.length > 0
      ? setSearchCurrentPage((prev) => prev + 1)
      : setSearchCurrentPage(1);
    setIsSearchRequest(false);
  }, [searchResults]);

  //무한 스크롤 로직
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
              searchCurrentPage
            );
            setSearchResultsHandler(result);
          } else {
            const result = await searchPlaceByCategoryAction(
              searchCategoryValue,
              searchCurrentPage
            );
            setSearchResultsHandler(result);
          }
        }
      }
    }, 500);
  }

  return (
    <>
      <div className="search-container" onScroll={handleDebounceScroll}>
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
                setIsSearchRequest={setIsSearchRequest}
                btnActive={btnActive}
                setBtnActive={setBtnActive}
                setSearchCategoryValue={setSearchCategoryValue}
                setSearchCurrentPage={setSearchCurrentPage}
                key={id}
                id={id}
                idx={idx}
                value={value}
              />
            );
          })}
        </div>
        <div className="scroll-container">
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
