import React, { useState } from "react";
import PlaceSummary from "./PlaceSummary";

function Place(props) {
  // 더보기 클릭여부
  const [isMoreInfo, setIsMoreInfo] = useState();

  //더보기 클릭 핸들러
  function moreInfoClickHandler(e, idx) {
    setIsMoreInfo(e.currentTarget.id);
  }
  return (
    <>
      <div style={{ width: "400px", height: "500px", overflowY: "scroll" }}>
        <ul style={{}}>
          {/* key 값이 안들어감 */}
          {props.searchResult && props.searchResult.length > 0 ? (
            props.searchResult.map((item, idx) => {
              return (
                <>
                  <li
                    style={{ border: "1px solid black" }}
                    onClick={moreInfoClickHandler}
                    id={item.id}
                    key={item.id}
                  >
                    <div className="result-list">
                      <ul>
                        <li>{item.place_name}</li>
                        <li>{item.address_name}</li>
                        <li>{item.category_group_name}</li>
                        <li>
                          {item.id === isMoreInfo ? (
                            // <SearchMoreInfo place={item} />
                            <PlaceSummary place={item} />
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
          ) : props.isSearched ? (
            <div> 검색 결과가 없습니다.</div>
          ) : (
            ""
          )}
        </ul>
      </div>
    </>
  );
}

export default Place;
