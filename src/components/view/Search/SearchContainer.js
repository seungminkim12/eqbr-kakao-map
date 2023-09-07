import React, { useState, useRef, useEffect } from "react";
import { CATEGORY_OBJ } from "../../../config/kakao-config";
import SearchMoreInfo from "./SearchMoreInfo";

const { kakao } = window;

const options = {
  location: new window.kakao.maps.LatLng(
    37.510901492192744,
    127.04499359218127
  ),
  page: 45,
};

function SearchContainer(props) {
  const [searchInputValue, setSearchInputValue] = useState("");
  // 검색결과 담는 state
  const [searchResult, setSearchResult] = useState([]);
  //검색버튼 dom
  const searchBtnRef = useRef(null);
  //카테고리 버튼 클릭 체크
  const [btnActive, setBtnActive] = useState();
  // 카카오맵 검색
  const places = new window.kakao.maps.services.Places();
  // 더보기 클릭여부
  const [isMoreInfo, setIsMoreInfo] = useState();
  //검색 최초 실행 여부
  const [isSearched, setIsSearched] = useState(false);

  //검색 input change 핸들러
  function onSearchIPChange(e) {
    setSearchInputValue(e.target.value);
  }

  //검색 버튼 클릭 핸들러
  function searchClickHandler(e) {
    e.preventDefault();

    const callback = function (result, status, pagination) {
      //최초 검색 했음
      setIsSearched(true);
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResult(result);
        props.setMarkers([...result]);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
        console.log("ZERO_RESULT");
        setSearchResult([]);
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
        console.log("error");
      }
    };

    places.keywordSearch(searchInputValue, callback, options);
  }

  //카테고리 버튼 클릭 핸들러
  function cateBtnClickHandler(e) {
    setBtnActive(e.target.value);

    const placeSearchCB = (data, status, pagination) => {
      //최초 검색 했음
      setIsSearched(true);
      if (status === kakao.maps.services.Status.OK) {
        setSearchResult(data);
        props.setMarkers([...data]);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
        console.log("ZERO_RESULT");
        setSearchResult([]);
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
        console.log("error");
      }
    };

    places.categorySearch(e.target.id, placeSearchCB, options, {
      useMapBounds: true,
    });
  }

  //더보기 클릭 핸들러
  function moreInfoClickHandler(e, idx) {
    setIsMoreInfo(e.currentTarget.id);
  }

  return (
    <>
      <span
        style={{
          width: "250px",
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
          <div
            style={{
              overflowX: "scroll",
              whiteSpace: "nowrap",
              width: "250px",
            }}
            className="x-scroll"
          >
            {Object.entries(CATEGORY_OBJ).map(([key, value], idx) => (
              <button
                key={idx}
                id={key}
                value={idx}
                onClick={cateBtnClickHandler}
                className={"cate-btn" + (idx === btnActive ? " active" : "")}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            height: "1000px",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowY: "scroll", height: "500px" }}>
            <ul style={{}}>
              {/* key 값이 안들어감 */}
              {searchResult.length > 0 ? (
                searchResult.map((item, idx) => {
                  return (
                    <>
                      <li
                        style={{ border: "1px solid black" }}
                        onClick={moreInfoClickHandler}
                        id={item.id}
                      >
                        <div key={item} className="result-list">
                          <ul>
                            <li>{item.place_name}</li>
                            <li>{item.address_name}</li>
                            <li>{item.category_group_name}</li>
                            <li>
                              {item.id === isMoreInfo ? (
                                <SearchMoreInfo place={item} />
                              ) : (
                                ""
                              )}
                            </li>
                          </ul>
                        </div>
                      </li>
                    </>
                  );
                })
              ) : isSearched ? (
                <div> 검색 결과가 없습니다.</div>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </span>
    </>
  );
}

export default SearchContainer;
