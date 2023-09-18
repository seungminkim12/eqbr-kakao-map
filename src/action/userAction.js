import {
  getOverLayParser,
  searchPlaceByCategoryParser,
  searchPlaceByKeywordParser,
} from "parser/userParser";
import { storeDispatch, storeState } from "../store/util/index";
import {
  eqbrCoord,
  KAKAO_DRAW_CUSTOMOVERLAY,
} from "../server/module/kakao-api";
import { addBookmarks, savedBookmark } from "store/bookmarks";

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
export const searchPlaceByKeywordAction = async (keyword, page) => {
  const result = await searchPlaceByKeywordParser(keyword, page);
  return result ? result : null;
};

/**
 * 카테고리 검색 유저 액션
 * @param {*} category
 * @param {*} callback
 * @param {*} page
 */
export const searchPlaceByCategoryAction = async (category, page) => {
  const result = await searchPlaceByCategoryParser(category, page);
  return result ? result : null;
};

/**
 * 북마크에 추가하는 유저 액션
 * @param {\} place
 * @returns
 */
export const addBookmarkAction = (place) => {
  //저장되어 있는 북마크 가져옴
  const savedBookmarkData = JSON.parse(localStorage.getItem("eqbrBookmark"));
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
export const removePlaceInBookmark = (id) => {
  //저장되어 있는 북마크 가져옴
  const savedFavorData = JSON.parse(localStorage.getItem("eqbrBookmark"));
  if (savedFavorData) {
    const checkId = savedFavorData.findIndex((data) => id === data.id);
    if (checkId >= 0) {
      savedFavorData.splice(checkId, 1);
    }
    localStorage.setItem("eqbrBookmark", JSON.stringify([...savedFavorData]));
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
 * 북마크 추가하러가기 액션
 */
export const goToMapAction = () => {
  // navigate("/map");
  // // window.history.pushState("", "", "/map");
  // window.location("/map");
  // useGoToPage("/map");
};

/**
 * Place 영역 클릭시 해당되는 오버레이 띄우기
 * @param {*} currentId
 * @param {*} overlays
 */
export const getOverlayAction = (currentId, overlays) => {
  getOverLayParser(currentId);
};
