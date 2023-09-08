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
