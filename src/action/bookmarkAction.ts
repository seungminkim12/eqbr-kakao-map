/**
 * 북마크에 추가하는 유저 액션
 * @param {\} place
 * @returns
 */
export const addBookmarkAction = (place) => {
  //저장되어 있는 북마크 가져옴
  const savedBookmarkData = JSON.parse(
    localStorage.getItem("eqbrBookmark") || ""
  );
  // const savedBookmarkData = savedBookmark(storeState());
  //하나도 없는 case
  if (savedBookmarkData.length <= 0) {
    localStorage.setItem(
      "eqbrBookmark",
      JSON.stringify([{ ...place, regDate: new Date() }])
    );

    // storeDispatch(addBookmarks({ ...place, regDate: new Date().toString() }));
    return;
  }
  // 즐겨찾기에 추가한 데이터
  const id = place.id;
  // 기존 데이터와 중복 비교
  const checkId = savedBookmarkData.findIndex((data) => id === data.id);
  //중복 있을때 기존 데이터 삭제
  if (checkId >= 0) {
    savedBookmarkData.splice(checkId, 1);
  }

  //중복 제거한 기존 데이터 + 새로 추가할 데이터 추가
  localStorage.setItem(
    "eqbrBookmark",
    JSON.stringify([...savedBookmarkData, { ...place, regDate: new Date() }])
  );
  // storeDispatch(
  //   addBookmarks([
  //     ...savedBookmarkData,
  //     { ...place, regDate: new Date().toString() },
  //   ])
  // );
};

/**
 * 로컬스토리지에 저장되어 있는 북마크 지움
 * @param {*} id
 */
export const removeBookmarkAction = (id) => {
  //저장되어 있는 북마크 가져옴
  const savedFavorData = JSON.parse(localStorage.getItem("eqbrBookmark") || "");
  if (savedFavorData) {
    const checkId = savedFavorData.findIndex((data) => id === data.id);
    if (checkId >= 0) {
      savedFavorData.splice(checkId, 1);
    }
    localStorage.setItem("eqbrBookmark", JSON.stringify([...savedFavorData]));
  }
};
