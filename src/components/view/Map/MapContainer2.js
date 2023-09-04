import React, { useRef, useEffect, useState } from "react";

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
    console.log("Container", container);
    const map = new kakao.maps.Map(container.current, options);

    //marker
    const displayMarker = (place) => {
      console.log("place", place.place_name);
      // infowindow
      let infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${place.place_name}</div>`,
        removable: true,
      });
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
      });

      kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });

      marker.setMap(map);
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

function MapContainer(props) {
  const [map, setMap] = useState();
  console.log("MapContainer", props);

  //지도를 담을 영역의 DOM 레퍼런스
  const container = useRef(null);

  //infowindow
  let infowindow = new kakao.maps.InfoWindow({
    content: '<div style="padding:5px;">이큐비알홀딩스</div>',
    removable: true,
  });

  // marker function
  const DrawMarker = (pos) => {
    const imagesize = new kakao.maps.Size(24, 35);
    const markerImg = new kakao.maps.MarkerImage(
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      imagesize
    );
    console.log("container", container);
    const marker = new kakao.maps.Marker({
      map: new kakao.maps.Map(container.current, options),
      position: new kakao.maps.LatLng(pos.x, pos.y),
      title: pos.place_name,
      iamge: markerImg,
    });
  };

  function displayMarker(pos) {
    const marker = new kakao.maps.Marker({
      position: eqbrCoord,
      clickable: true,
    });
  }

  useEffect(() => {
    console.log("useEffect", props.markers.length);

    const map = new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴

    const marker = new kakao.maps.Marker({
      position: eqbrCoord,
      clickable: true,
    });

    props.markers.map(() => {
      DrawMarker(props.markers);
    });

    kakao.maps.event.addListener(marker, "click", () => {
      infowindow.open(map, marker);
    });

    marker.setMap(map);
  }, [props.markers]);

  return (
    <div
      className="map"
      style={{ width: "900px", height: "900px" }}
      ref={container}
    ></div>
  );
}

export default MapContainer;
