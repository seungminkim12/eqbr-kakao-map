import React, { useRef, useEffect, useState } from "react";
// import options from "../../../config/kakao-config";

const { kakao } = window;

const eqbrCoord = new kakao.maps.LatLng(37.51086544448419, 127.04501336409375); //지도의 중심좌표.

const options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: eqbrCoord,
  level: 3, //지도의 레벨(확대, 축소 정도)
};

const MapContainer = (props) => {
  //지도를 담을 영역의 DOM 레퍼런스
  const container = useRef(null);

  useEffect(() => {
    //지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(container.current, options);

    //marker
    const displayMarker = (place) => {
      const imagesize = new kakao.maps.Size(24, 35);
      const markerImg = new kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
        imagesize
      );

      const marker = new kakao.maps.Marker({
        map: new kakao.maps.Map(container.current, options),
        position: new kakao.maps.LatLng(place.x, place.y),
        title: place.place_name,
        image: markerImg,
        clickable: true,
      });

      // infowindow
      let infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${place.place_name}</div>`,
        removable: true,
      });

      //marker infowindow event listener
      kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });
      if (props.markers.length > 1) marker.setMap(map);
      // marker.setMap(map);
    };

    props.markers.map((marker) => {
      displayMarker(marker);
    });
  }, [props.markers]);

  return (
    <div
      className="map"
      style={{ width: "900px", height: "900px" }}
      ref={container}
    ></div>
  );
};

export default MapContainer;
