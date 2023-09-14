import { getOverlayTemplate } from "../../view/asset/overlay.template";

const { kakao } = window;

export const eqbrCoord = new kakao.maps.LatLng(
  37.510901492192744,
  127.04499359218127
); //지도의 중심좌표.

let mapOptions = {
  //지도를 생성할 때 필요한 기본 옵션
  center: eqbrCoord,
  level: 3, //지도의 레벨(확대, 축소 정도)
};

const bounds = new kakao.maps.LatLngBounds();

// 카카오맵 검색
const places = new window.kakao.maps.services.Places();

let map = null;

let KAKAO_MARKERS = [];

// 카카오 api resonse status code
export const getSearchResultSuccess = kakao.maps.services.Status.OK;
export const getSearchResultNone = kakao.maps.services.Status.ZERO_RESULT;
export const getSearchResultFail = kakao.maps.services.Status.ERROR;

/**
 * 맵을 그리는 함수
 * @param {*} container
 * @param {*} isImageMap 이미지맵 여부
 */
export const KAKAO_CREATE_MAP = (container, isImageMap) => {
  mapOptions = isImageMap ? { ...mapOptions, draggable: false } : mapOptions;
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
export const KAKAO_DISPLAY_MARKER = (place, cb, overlays) => {
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

  if (cb) {
    KAKAO_MARKERS.push(marker);

    KAKAO_SET_CUSTOMOVERLAY(place, marker, cb, overlays);
  }

  map.setBounds(bounds);

  marker.setMap(map);
};

export const KAKAO_REMOVE_ALL_MARKER = () => {
  if (KAKAO_MARKERS.length > 0) {
    KAKAO_MARKERS.forEach((mk) => {
      mk.setMap(null);
    });
    KAKAO_MARKERS = [];
  }
};

/**
 * 카카오맵에 오버레이 설정하는 함수x
 * @param {*} place
 * @param {*} marker
 * @param {*} cb
 */
// export
const KAKAO_SET_CUSTOMOVERLAY = (place, marker, cb, overlays) => {
  const overlayTemplate = getOverlayTemplate(place);
  const overlayCloseBtn = overlayTemplate.querySelector(".close");
  // 마커 위에 커스텀오버레이를 표시합니다
  // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
  const overlay = new kakao.maps.CustomOverlay({
    content: overlayTemplate,
    map,
    position: marker.getPosition(),
  });

  // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
  kakao.maps.event.addListener(marker, "click", function () {
    const detailsNodes = document.getElementsByTagName("details");
    for (let i = 0; i < detailsNodes.length; i++) {
      detailsNodes[i].removeAttribute("open");
    }
    const detailsNode = document.getElementById(place.id).childNodes[0];
    if (detailsNode) {
      detailsNode.open = true;
    }
    overlay.setMap(map);
  });

  overlay.setMap(null);

  cb(overlay, marker);

  // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
  overlayCloseBtn.onclick = () => {
    overlay.setMap(null);
  };
};

export const KAKAO_DRAW_CUSTOMOVERLAY = (overlays, idx) => {
  overlays.map((overlay) => {
    overlay.setMap(null);
  });
  overlays[idx].setMap(map);
};
