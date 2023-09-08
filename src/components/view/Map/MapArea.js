import React, { useRef, useEffect, useState } from "react";
import {
  createMap,
  KAKAO_DISPLAY_MARKER,
  KAKAO_SET_CUSTOMOVERLAY,
} from "../../../module/kakao-api";

// let map = null;

// const bounds = new kakao.maps.LatLngBounds();

const MapArea = (props) => {
  console.log("map Area", props);

  //지도를 담을 영역의 DOM 레퍼런스
  const container = useRef(null);
  // const [keepMarkers, setKeepMarkers] = useState([]);
  const [customOverlays, setCustomOverlays] = useState([]);

  //eqbr 마커 생성을 위한 useEffect
  useEffect(() => {
    // map = new kakao.maps.Map(container.current, options);
    //맵을 그리는 함수
    createMap(container);
    //지도 생성 및 객체 리턴

    // const marker = new kakao.maps.Marker({
    //   map,
    //   position: eqbrCoord,
    //   clickable: true,
    // });

    // marker.setMap(map);
  }, []);

  //검색결과 마커 생성을 위한 useEffect
  //marker
  // const displayMarker = (place) => {
  //   const imagesize = new kakao.maps.Size(24, 35);
  //   const markerImg = new kakao.maps.MarkerImage(
  //     "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
  //     imagesize
  //   );
  //   const position = new kakao.maps.LatLng(+place.y, +place.x);

  //   bounds.extend(position);

  //   const marker = new kakao.maps.Marker({
  //     map,
  //     position,
  //     title: place.place_name,
  //     image: markerImg,
  //     clickable: true,
  //   });

  //   addCustomOverlay(place, marker);

  //   map.setBounds(bounds);

  //   marker.setMap(map);

  //   setKeepMarkers((keepMarkers) => [...keepMarkers, marker]);
  // };

  const setOverlay = (overlay, keepMarkers) => {
    keepMarkers = overlay;
  };

  useEffect(() => {
    //렌더링 시 커스텀 오버레이 열리는 현상 방지
    if (props.keepMarkers && props.keepMarkers.length > 0) {
      console.log("props.keepMarkers", props.keepMarkers);
      // keepMarkers.forEach((keepMarker) => {
      //   console.log("keepMarker", keepMarker);
      //   keepMarker.setMap(null);
      // });
      // setKeepMarkers([]);
    }
    //
    console.log("props.markers", props.markers);
    props.markers &&
      props.markers.map((marker) => {
        props.setKeepMarkers([...props.keepMarkers, marker]);
        KAKAO_DISPLAY_MARKER(marker, setOverlay);
        // addCustomOverlay(place, marker);
        // KAKAO_SET_CUSTOMOVERLAY(place, marker);
        // KAKAO_SET_CUSTOMOVERLAY(marker);
        // displayMarker(marker);
      });
  }, [props.markers]);

  return (
    <div
      className="map"
      style={{ width: "100vw", height: "100vh" }}
      ref={container}
    ></div>
  );
};

export default MapArea;
