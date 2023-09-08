import {
  eqbrCoord,
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

export const searchPlaceByKeyword = (keyword, callback, page) => {
  KAKAO_SEARCH_PLACE_BY_KEYWORD(keyword, callback, { ...searchOptions, page });
};

export const searchPlaceByCategory = (category, callback, page) => {
  KAKAO_SEARCH_PLACE_BY_CATEGORY(category, callback, {
    ...searchOptions,
    page,
  });
};

export const openKakaoMapDetail = (place) => {
  const pathURL = `https://place.map.kakao.com/${place.id}`;
  window.open(pathURL);
};

export const openKakaoMapNavigation = (place) => {
  const pathURL = `https://map.kakao.com/link/to/${place.place_name},${place.y},${place.x}/from/${eqbrName},${eqbrY},${eqbrX}`;
  window.open(pathURL);
};
