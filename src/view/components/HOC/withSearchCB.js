import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { currentPage, plusCurrentPage } from "store/searchOptions";

import {
  GET_SEARCH_RESULT_FAIL,
  GET_SEARCH_RESULT_NONE,
  GET_SEARCH_RESULT_SUCCESS,
} from "../../../server/module/kakao-api";
import { setSearchResults } from "../../../store/searchResults";
// import {
//   addSearchResults,
//   setSearchResults,
// } from "../../../store/searchResults";
import { storeDispatch } from "../../../store/util";

function withSearchCB(InnerComponent) {
  // props는 App.jsx 부모에서 prop로 전달한 데이터
  return (props) => {
    //검색 최초 실행 여부 (검색결과 없다는 UI 처리 플래그)
    const [isSearched, setIsSearched] = useState(false);
    //현재페이지 selector
    // const searchCurrentPage = useSelector(currentPage);
    const navigate = useNavigate();
    //장소 검색 콜백
    const placeSearchCB = (data, status, pagination) => {
      if (status === GET_SEARCH_RESULT_SUCCESS) {
        // props.setIsSearchRequest(false);
        // props.setSearchResult([...props.searchResult, ...data]);
        setIsSearched(true);
        // 속성 값으로 다음 페이지가 있는지 확인하고
        if (pagination.hasNextPage) {
          props.setIsSearchRequest(false);

          //   storeDispatch(addSearchResults(data));
          props.setMarkers([...props.markers, ...data]);
          //   storeDispatch(plusCurrentPage());
        } else {
          //   if (searchCurrentPage === pagination.last) {
          //     props.setIsSearchRequest(true);
          //     storeDispatch(addSearchResults(data));
          //     props.setMarkers([...props.markers, ...data]);
          //   }
        }
      } else if (status === GET_SEARCH_RESULT_NONE) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
        console.log("ZERO_RESULT");
      } else if (status === GET_SEARCH_RESULT_FAIL) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
        console.log("error");
        navigate("/about");
      }
    };

    return (
      <InnerComponent
        {...{
          ...props,
          isSearched,
          placeSearchCB,
        }}
      />
    );
  };
}

export default withSearchCB;
