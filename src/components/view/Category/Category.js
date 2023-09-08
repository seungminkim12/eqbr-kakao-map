import React, { useState } from "react";
import { searchPlaceByCategory } from "../../../action/user_action";
import { CATEGORY_OBJ } from "../../../asset/category.type";
import withSearchCB from "../HOC/withSearchCB";

function Category(props) {
  console.log("category", props);
  //카테고리 버튼 클릭 체크
  const [btnActive, setBtnActive] = useState();

  //카테고리 버튼 클릭 핸들러
  function cateBtnClickHandler(e) {
    setBtnActive(e.target.value);

    // 카테고리로 검색하는 유저 액션
    searchPlaceByCategory(e.target.id, props.placeSearchCB, props.currentPage);
  }
  return (
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
  );
}

export default withSearchCB(Category);
