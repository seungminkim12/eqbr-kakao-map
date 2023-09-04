import React, { useState, useRef } from "react";
import { CATEGORY_OBJ } from "../../../config/kakao-config";

const { kakao } = window;

const options = {
  location: new window.kakao.maps.LatLng(
    37.510901492192744,
    127.04499359218127
  ),
};

function SearchContainer(props) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [keywordCheck, setKeywordCheck] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const inputRef = useRef(null);
  const [btnActive, setBtnActive] = useState();

  const places = new window.kakao.maps.services.Places();

  //input change
  function onSearchIPChange(e) {
    if (e.target.value.length > 0) {
      if (inputRef.current) inputRef.current.disabled = false;
    } else {
      if (inputRef.current) inputRef.current.disabled = true;
    }
    setSearchInputValue(e.target.value);
  }

  //검색 버튼 클릭 핸들러
  function searchClickHandler(e) {
    e.preventDefault();
    console.log("in");
    if (!searchInputValue) {
      setKeywordCheck(false);
      return;
    }

    const callback = function (result, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log("result", result);
        setSearchResult(result);
        props.setMarkers([...result]);
      }
    };

    places.keywordSearch(searchInputValue, callback, options);
  }

  //카테고리 버튼 클릭 핸들러
  function cateBtnClickHandler(e) {
    setBtnActive(e.target.value);

    const placeSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResult(data);
        props.setMarkers([...data]);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    };

    places.categorySearch(e.target.id, placeSearchCB, options, {
      useMapBounds: true,
    });
  }

  return (
    <>
      <span style={{ width: "200px" }}>
        <div style={{}}>
          <input
            type="text"
            placeholder={keywordCheck ? "키워드" : "키워드를 입력 해 주세요."}
            onChange={onSearchIPChange}
          />
          <input
            type="button"
            value="검색"
            onClick={searchClickHandler}
            ref={inputRef}
          />
        </div>
        <div style={{}}>
          <div
            style={{
              overflowX: "scroll",
              whiteSpace: "nowrap",
              width: "200px",
            }}
            className="x-scroll"
          >
            {Object.entries(CATEGORY_OBJ).map(([key, value], idx) => (
              <button
                key={idx}
                id={key}
                value={idx}
                onClick={cateBtnClickHandler}
                className={"cate-btn" + (idx == btnActive ? " active" : "")}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div style={{}}>
          <div style={{}}>
            <ul style={{}}>
              {searchResult &&
                searchResult.map((item, idx) => {
                  //   DrawMarker(item);
                  return (
                    <>
                      <li key={idx}>
                        <div>
                          <ul>
                            <li>{item.place_name}</li>
                            <li>{item.address_name}</li>
                            <li>{item.category_group_name}</li>
                          </ul>
                        </div>
                      </li>
                    </>
                  );
                })}
            </ul>
          </div>
        </div>
      </span>
    </>
  );
}

export default SearchContainer;
