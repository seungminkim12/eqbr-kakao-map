import { getOverlayTemplate } from "view/components/overlay.template";

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

let bounds = new kakao.maps.LatLngBounds();

// 카카오맵 검색
const places = new window.kakao.maps.services.Places();

let map = null;

let KAKAO_MARKERS = [];

let KAKAO_OVERLAYS = [];

// 카카오 api resonse status code
export const GET_SEARCH_RESULT_SUCCESS = kakao.maps.services.Status.OK;
export const GET_SEARCH_RESULT_NONE = kakao.maps.services.Status.ZERO_RESULT;
export const GET_SEARCH_RESULT_FAIL = kakao.maps.services.Status.ERROR;

/**
 * 맵을 그리는 함수
 * @param {*} container
 * @param {*} isImageMap 이미지맵 여부
 */
export const renderMap = (container, isImageMap) => {
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
const searchPlaceByKeyword = async (keyword, searchOptions) => {
  const promisedKeywordSearch = () => {
    return new Promise((resolve, reject) => {
      places.keywordSearch(
        keyword,
        (data, status, pagination) => {
          resolve({ data, status, pagination });
        },
        searchOptions,
        {
          useMapBounds: true,
        }
      );
    });
  };
  const result = await promisedKeywordSearch();
  return result;
};

/**
 * 카테고리로 검색하는 함수
 * @param {*} category
 * @param {*} callback
 */
const searchPlaceByCategory = async (category, searchOptions) => {
  const promisedCategorySearch = () => {
    return new Promise((resolve, reject) => {
      places.categorySearch(
        category,
        (data, status, pagination) => {
          resolve({ data, status, pagination });
        },
        searchOptions,
        {
          useMapBounds: true,
        }
      );
    });
  };

  const result = await promisedCategorySearch();
  return result;
};

/**
 * 카카오맵에 마커 그리는 함수
 * @param {*} place
 */
// cb, overlays
export const displayMarker = (place, isImageMap) => {
  const imagesize = new kakao.maps.Size(24, 35);
  const markerImg = new kakao.maps.MarkerImage(
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
    imagesize
  );
  const position = new kakao.maps.LatLng(+place.y, +place.x);
  // bounds = new kakao.maps.LatLngBounds();
  bounds.extend(position);
  const marker = new kakao.maps.Marker({
    map,
    position,
    title: place.place_name,
    image: markerImg,
    clickable: true,
  });
  if (!isImageMap) {
    KAKAO_MARKERS.push(marker);
    setOverlay(place, marker);
  }

  // , cb, overlays

  // if (cb) {

  // }
  map.setBounds(bounds);

  marker.setMap(map);
};

export const resetMarker = () => {
  if (KAKAO_MARKERS.length > 0) {
    KAKAO_MARKERS.forEach((mk) => {
      mk.setMap(null);
    });
    KAKAO_OVERLAYS.forEach((ov) => {
      ov.setMap(null);
    });
    KAKAO_MARKERS = [];
    KAKAO_OVERLAYS = [];
  }
};

/**
 * 카카오맵에 오버레이 설정하는 함수x
 * @param {*} place
 * @param {*} marker
 * @param {*} cb
 */

const setOverlay = (place, marker, overlays) => {
  // const testFunc = () => {
  //   return <testoverlay />;
  // };
  // const testTemplage = testFunc();
  const overlayTemplate = getOverlayTemplate(place);
  const overlayCloseBtn = overlayTemplate.querySelector(".close");
  // 마커 위에 커스텀오버레이를 표시합니다
  // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
  const overlay = new kakao.maps.CustomOverlay({
    content: overlayTemplate,
    // content: testTemplage,
    map,
    position: marker.getPosition(),
    zIndex: 99,
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
    KAKAO_OVERLAYS.forEach((ov) => {
      ov.setMap(null);
    });
    overlay.setMap(map);
  });

  overlay.setMap(null);

  KAKAO_OVERLAYS.push(overlay);

  // , cb
  // cb(overlay, marker);

  // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
  overlayCloseBtn.onclick = () => {
    overlay.setMap(null);
  };
};

export const KAKAO_DRAW_CUSTOMOVERLAY = (overlays, idx) => {
  if (!overlays || overlays.length <= 0) {
    return;
  }
  overlays.map((overlay) => {
    overlay.setMap(null);
  });
  overlays[idx].setMap(map);
};

const getOverLay = (currentId) => {
  // overlays &&
  //   overlays.forEach((overlay, idx) => {
  //     if (overlay.cc.id === currentId) {
  //       currentIdx = idx;
  //     }
  //   });c
  let currentIdx = null;
  KAKAO_OVERLAYS &&
    KAKAO_OVERLAYS.forEach((ov, idx) => {
      ov.setMap(null);
      if (ov.cc.id === currentId) {
        currentIdx = idx;
      }
    });

  // if (!overlays || overlays.length <= 0) {
  //   return;
  // }
  // KAK.map((overlay) => {
  //   overlay.setMap(null);
  // });
  KAKAO_OVERLAYS[currentIdx].setMap(map);
};

export {
  renderMap as renderMapFromServer,
  displayMarker as displayMarkerFromServer,
  resetMarker as resetMarkerFromServer,
  searchPlaceByCategory as searchPlaceByCategoryFromServer,
  searchPlaceByKeyword as searchPlaceByKeywordFromServer,
  getOverLay as getOverLayFromServer,
};
