import { useState } from "react";
import {
  getSearchResultFail,
  getSearchResultNone,
  getSearchResultSuccess,
} from "../../../module/kakao-api";

function withSearchCB(InnerComponent) {
  // props는 App.jsx 부모에서 prop로 전달한 데이터
  return (props) => {
    //검색 최초 실행 여부 (검색결과 없다는 UI 처리 플래그)
    const [isSearched, setIsSearched] = useState(false);

    // // 검색결과 담는 state
    // const [searchResult, setSearchResult] = useState([]);

    // const [markers, setMarkers] = useState([]);

    //장소 검색 콜백
    const placeSearchCB = (data, status, pagination) => {
      //최초 검색 했음
      setIsSearched(true);
      if (status === getSearchResultSuccess) {
        // props.setSearchResult([...props.searchResult, ...data]);

        // 속성 값으로 다음 페이지가 있는지 확인하고
        if (pagination.hasNextPage) {
          props.setSearchResult([...props.searchResult, ...data]);
          props.setMarkers([...props.markers, ...data]);
          props.setCurrentPage(props.currentPage + 1);
        }
        // setSearchResult(data);
        // setMarkers([...data]);
      } else if (status === getSearchResultNone) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
        console.log("ZERO_RESULT");
        props.setSearchResult([]);
        // setSearchResult([]);
      } else if (status === getSearchResultFail) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
        console.log("error");
      }
    };

    return (
      <InnerComponent
        {...{
          ...props,
          isSearched,
          //   searchResult,
          //   markers,
          placeSearchCB,
        }}
      />
    );
  };
}

export default withSearchCB;
