import React, { useState, useRef } from "react";
import { CATEGORY_OBJ } from "../../../config/kakao-config";

const { kakao } = window;

function SearchContainer(props) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [keywordCheck, setKeywordCheck] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const inputRef = useRef(null);
  const [btnActive, setBtnActive] = useState();

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
    const places = new window.kakao.maps.services.Places();
    const callback = function (result, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log("result", result);
        setSearchResult(result);
        props.setMarkers([...result]);
      }
    };
    const options = {
      location: new window.kakao.maps.LatLng(
        37.510901492192744,
        127.04499359218127
      ),
    };
    places.keywordSearch(searchInputValue, callback, options);
  }

  //카테고리 버튼 클릭 핸들러
  function cateBtnClickHandler(e) {
    console.log("target", e.target.value);
    setBtnActive(e.target.value);
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
