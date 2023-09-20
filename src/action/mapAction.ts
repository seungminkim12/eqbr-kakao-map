//Map Service Action

// import {
//   displayMarkerParser,
//   renderMapParser,
//   resetMarkerParser,
//   searchPlaceByCategoryParser,
//   searchPlaceByKeywordParser,
//   getOverLayParser,
// } from "parser/mapParser_origin";
import {
  displayMarkerParser,
  renderMapParser,
  resetMarkerParser,
  searchPlaceByCategoryParser,
  searchPlaceByKeywordParser,
  getOverLayParser,
} from "parser/mapParser";
import { actionController } from "./utils/actionController";

const eqbrName = "이큐비알홀딩스";
const eqbrY = "37.510901492192744";
const eqbrX = "127.04499359218127";

export const renderMapAction = (container, isImageMap) =>
  actionController(() => {
    renderMapParser(container, isImageMap);
  });
// cb, overlays
export const displayMarkerAction = (place, isImageMap) =>
  actionController(() => {
    displayMarkerParser(place, isImageMap);
  });

export const resetMarkerAction = () =>
  actionController(() => {
    resetMarkerParser();
  });

/**
 * 키워드 검색 유저 액션
 * @param {*} keyword
 * @param {*} callback
 * @param {*} page
 */
export const searchPlaceByKeywordAction = (keyword, page) =>
  actionController(async () => {
    const result = await searchPlaceByKeywordParser(keyword, page);
    return result ? result : null;
  });

/**
 * 카테고리 검색 유저 액션
 * @param {*} category
 * @param {*} callback
 * @param {*} page
 */
export const searchPlaceByCategoryAction = (category, page) =>
  actionController(async () => {
    const result = await searchPlaceByCategoryParser(category, page);
    return result ? result : null;
  });

/**
 * 카카오맵 상세보기 버튼
 * @param {*} place
 */
export const openKakaoMapDetailAction = (place) =>
  actionController(() => {
    const pathURL = `https://place.map.kakao.com/${place.id}`;
    window.open(pathURL);
  });

/**
 * 카카오맵 길찾기 버튼
 * @param {*} place
 */
export const openKakaoMapNavigationAction = (place) =>
  actionController(() => {
    const pathURL = `https://map.kakao.com/link/to/${place.place_name},${place.y},${place.x}/from/${eqbrName},${eqbrY},${eqbrX}`;
    window.open(pathURL);
  });

/**
 * Place 영역 클릭시 해당되는 오버레이 띄우기
 * @param {*} currentId
 * @param {*} overlays
 */
export const getOverlayAction = (currentId, overlays) =>
  actionController(() => {
    getOverLayParser(currentId);
  });
