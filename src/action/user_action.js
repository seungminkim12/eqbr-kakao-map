import {
  eqbrCoord,
  KAKAO_DRAW_CUSTOMOVERLAY,
  KAKAO_SEARCH_PLACE_BY_CATEGORY,
  KAKAO_SEARCH_PLACE_BY_KEYWORD,
} from "../module/kakao-api";

const searchOptions = {
  location: eqbrCoord,
  size: 10,
};

const eqbrName = "이큐비알홀딩스";
const eqbrY = "37.510901492192744";
const eqbrX = "127.04499359218127";

/**
 * 키워드 검색 유저 액션
 * @param {*} keyword
 * @param {*} callback
 * @param {*} page
 */
export const searchPlaceByKeyword = (keyword, callback, page, searchCall) => {
  KAKAO_SEARCH_PLACE_BY_KEYWORD(
    keyword,
    callback,
    { ...searchOptions, page },
    searchCall
  );
};

/**
 * 카테고리 검색 유저 액션
 * @param {*} category
 * @param {*} callback
 * @param {*} page
 */
export const searchPlaceByCategory = (category, callback, page, searchCall) => {
  KAKAO_SEARCH_PLACE_BY_CATEGORY(
    category,
    callback,
    {
      ...searchOptions,
      page,
    },
    searchCall
  );
};

export const addPlaceInBookmark = (place) => {
  //저장되어 있는 북마크 가져옴
  const savedFavorData = JSON.parse(localStorage.getItem("eqbrFavorite"));

  //하나도 없는 case
  if (!savedFavorData) {
    localStorage.setItem(
      "eqbrFavorite",
      JSON.stringify([{ ...place, regDate: new Date() }])
    );
    return;
  }
  // 즐겨찾기에 추가한 데이터
  const id = place.id;
  // 기존 데이터와 중복 비교
  const checkId = savedFavorData.findIndex((data) => id === data.id);
  //중복 있을때 기존 데이터 삭제
  if (checkId >= 0) {
    savedFavorData.splice(checkId, 1);
  }

  //중복 제거한 기존 데이터 + 새로 추가할 데이터 추가
  localStorage.setItem(
    "eqbrFavorite",
    JSON.stringify([...savedFavorData, { ...place, regDate: new Date() }])
  );
};

export const removePlaceInBookmark = (id) => {
  console.log("id", id);
  //저장되어 있는 북마크 가져옴
  const savedFavorData = JSON.parse(localStorage.getItem("eqbrFavorite"));
  if (savedFavorData) {
    const checkId = savedFavorData.findIndex((data) => id === data.id);
    if (checkId >= 0) {
      savedFavorData.splice(checkId, 1);
    }
    localStorage.setItem("eqbrFavorite", JSON.stringify([...savedFavorData]));
  }
};

/**
 * 카카오맵 상세보기 버튼
 * @param {*} place
 */
export const openKakaoMapDetail = (place) => {
  const pathURL = `https://place.map.kakao.com/${place.id}`;
  window.open(pathURL);
};

/**
 * 카카오맵 길찾기 버튼
 * @param {*} place
 */
export const openKakaoMapNavigation = (place) => {
  const pathURL = `https://map.kakao.com/link/to/${place.place_name},${place.y},${place.x}/from/${eqbrName},${eqbrY},${eqbrX}`;
  window.open(pathURL);
};

/**
 * Place 영역 클릭시 해당되는 오버레이 띄우기
 * @param {*} currentId
 * @param {*} overlays
 */
export const getOverlayAfterClick = (currentId, overlays) => {
  let currentIdx = null;
  overlays.forEach((overlay, idx) => {
    if (overlay.cc.id === currentId) {
      currentIdx = idx;
    }
  });
  KAKAO_DRAW_CUSTOMOVERLAY(overlays, currentIdx);
};
