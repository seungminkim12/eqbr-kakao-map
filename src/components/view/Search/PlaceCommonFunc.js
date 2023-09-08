import React from "react";

function PlaceCommonFunc(props) {
  //장소 검색 콜백
  const placeSearchCB = (data, status, pagination) => {
    console.log("pagination", pagination);
    //최초 검색 했음
    setIsSearched(true);
    if (status === getSearchResultSuccess) {
      propssetSearchResult(data);
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
  return <></>;
}

export default PlaceCommonFunc;
