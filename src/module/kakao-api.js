import { getOverlayTemplate } from "../asset/overlay.template";

const { kakao } = window;

export const eqbrCoord = new kakao.maps.LatLng(
  37.510901492192744,
  127.04499359218127
); //지도의 중심좌표.

const mapOptions = {
  //지도를 생성할 때 필요한 기본 옵션
  center: eqbrCoord,
  level: 3, //지도의 레벨(확대, 축소 정도)
};

const bounds = new kakao.maps.LatLngBounds();

// 카카오맵 검색
const places = new window.kakao.maps.services.Places();

let map = null;

// 카카오 api resonse status code
export const getSearchResultSuccess = kakao.maps.services.Status.OK;
export const getSearchResultNone = kakao.maps.services.Status.ZERO_RESULT;
export const getSearchResultFail = kakao.maps.services.Status.ERROR;

/**
 * 맵 그리는 함수
 * @param {*} container
 */
export const createMap = (container) => {
  map = new kakao.maps.Map(container.current, mapOptions);
  //지도 생성 및 객체 리턴
  const marker = new kakao.maps.Marker({
    map,
    position: eqbrCoord,
    clickable: true,
  });

  marker.setMap(map);
};

/**
 * 키워드로 검색하는 함수
 * @param {*} keyword
 * @param {*} callback
 */
export const KAKAO_SEARCH_PLACE_BY_KEYWORD = (
  keyword,
  callback,
  searchOptions
) => {
  places.keywordSearch(keyword, callback, searchOptions, {
    useMapBounds: true,
  });
};

/**
 * 카테고리로 검색하는 함수
 * @param {*} category
 * @param {*} callback
 */
export const KAKAO_SEARCH_PLACE_BY_CATEGORY = (
  category,
  callback,
  searchOptions
) => {
  places.categorySearch(category, callback, searchOptions, {
    useMapBounds: true,
  });
};

/**
 * 카카오맵에 마커 그리는 함수
 * @param {*} place
 */
export const KAKAO_DISPLAY_MARKER = (place, cb) => {
  const imagesize = new kakao.maps.Size(24, 35);
  const markerImg = new kakao.maps.MarkerImage(
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
    imagesize
  );
  const position = new kakao.maps.LatLng(+place.y, +place.x);

  bounds.extend(position);

  const marker = new kakao.maps.Marker({
    map,
    position,
    title: place.place_name,
    image: markerImg,
    clickable: true,
  });

  KAKAO_SET_CUSTOMOVERLAY(place, marker, cb);

  map.setBounds(bounds);

  marker.setMap(map);
};

export const KAKAO_SET_CUSTOMOVERLAY = (place, marker, cb) => {
  console.log("marker", marker);
  const overlayTemplate = getOverlayTemplate(place);
  // const overlayTemplate = getOverlayTemplate(marker);
  const overlayCloseBtn = overlayTemplate.querySelector(".close");
  console.log("overlayTemplate", overlayTemplate.querySelector(".close"));
  // 마커 위에 커스텀오버레이를 표시합니다
  // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
  const overlay = new kakao.maps.CustomOverlay({
    content: overlayTemplate,
    map,
    position: marker.getPosition(),
  });

  // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
  kakao.maps.event.addListener(marker, "click", function () {
    overlay.setMap(map);
  });

  overlay.setMap(null);

  cb();

  // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
  overlayCloseBtn.onclick = () => {
    overlay.setMap(null);
  };
};
