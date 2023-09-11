// const content = `
// <div class="wrap">
//   <div class="info">
//       <div class="title">
//           ${place.place_name}
//           <span class="overlay_close"  title="닫기"></span>
//       </div>
//       <div class="overlay_body">
//           <div class="desc">
//               <div class="ellipsis">${place.road_address_name}</div>
//               <div class="jibun ellipsis">${place.address_name}</div>
//               <div>${place.phone}</div>
//             </div>
//         </div>
//     </div>
// </div>   `;

const callback = function (result, status, pagination) {
  //최초 검색 했음
  setIsSearched(true);
  if (status === getSearchResultSuccess) {
    setSearchResult(result);
    props.setMarkers([...result]);
  } else if (status === getSearchResultNone) {
    // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
    console.log("ZERO_RESULT");
    setSearchResult([]);
  } else if (status === getSearchResultFail) {
    // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
    console.log("error");
  }
};

const placeSearchCB = (data, status, pagination) => {
  //최초 검색 했음
  setIsSearched(true);
  if (status === getSearchResultSuccess) {
    setSearchResult(data);
    props.setMarkers([...data]);
  } else if (status === getSearchResultNone) {
    // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
    console.log("ZERO_RESULT");
    setSearchResult([]);
  } else if (status === getSearchResultFail) {
    // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
    console.log("error");
  }
};





console.log(
  "props.searchResult.length",
  props.searchResult.length
);
console.log("idx", idx);
console.log(
  "props.lastResultElementRef",
  props.lastResultElementRef
);

return  props.searchResult.length === idx - 1 ? (                                    
    {/* <li
    style={{ border: "1px solid black" }}
    onClick={moreInfoClickHandler}
    id={item.id}
    key={item.id}
    ref={props.lastResultElementRef}
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
  </li> */}
    <div                      
      ref={props.lastResultElementRef}
    >
      test
    </div>                                    
) : (                  
    <div
      style={{ border: "1px solid black" }}
      onClick={moreInfoClickHandler}
      id={item.id}
      key={item.id}
      className='place-summary'
    >    
    <details>
      <summary>
        <div>{item.place_name}</div>
        <div>{item.address_name}</div>
        <div>
        {item.category_group_name}
        </div>                        
      </summary>
      {item.id === isMoreInfo ? (
              // <SearchMoreInfo place={item} />
              <PlaceSummary place={item} />
            ) : (
              ""
            )}
      </details>                                         
        {/* <ul>
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
        </ul>                     */}                  
     </div>
)  




<div className="container">      
      <div className="bmk-content-container">
        <div className="bookmark-container">
          <div className="bookmark-items">
            <div>장소이름</div>
            <div>도로명주소</div>
            <div>번호</div>
            <div>즐겨찾기해제버튼</div>
          </div>

          

          <div class="bmk-loadmore-button">
            <button>more</button>
          </div>
        </div>
        <div className="imagemap-container">
          <div className="map">Map</div>
        </div>
      </div>
    </div>


























