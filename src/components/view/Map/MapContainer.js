import React, { useRef, useEffect, useState } from "react";

const { kakao } = window;

const eqbrCoord = new kakao.maps.LatLng(37.510901492192744, 127.04499359218127); //지도의 중심좌표.

const options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: eqbrCoord,
  level: 3, //지도의 레벨(확대, 축소 정도)
};
let map = null;

const bounds = new kakao.maps.LatLngBounds();

const MapContainer = (props) => {
  //지도를 담을 영역의 DOM 레퍼런스
  const container = useRef(null);
  const [keepMarkers, setKeepMarkers] = useState([]);
  const [customOverlays, setCustomOverlays] = useState([]);

  //eqbr 마커 생성을 위한 useEffect
  useEffect(() => {
    //지도 생성 및 객체 리턴
    map = new kakao.maps.Map(container.current, options);

    const marker = new kakao.maps.Marker({
      map,
      position: eqbrCoord,
      clickable: true,
    });

    marker.setMap(map);
  }, []);

  //커스텀오버레이 생성 함수
  function addCustomOverlay(place, marker) {
    // const content = `
    // <div class="wrap">
    //   <div class="info">
    //       <div class="title">
    //           ${place.place_name}
    //           <span class="overlay_close"  title="닫기"></span>
    //       </div>
    //       <div class="overlay_body">
    //           <div class="desc">
    //               <div class="ellipsis">${place.road_address_name}</div>
    //               <div class="jibun ellipsis">${place.address_name}</div>
    //               <div>${place.phone}</div>
    //             </div>
    //         </div>
    //     </div>
    // </div>   `;
    const content = document.createElement("div");
    content.className = "wrap";
    const infoDiv = document.createElement("div");
    infoDiv.className = "info";

    const titleDiv = document.createElement("div");
    titleDiv.className = "title";
    titleDiv.innerText = place.place_name;
    const closeSpan = document.createElement("span");
    closeSpan.className = "close";

    const overlayBody = document.createElement("div");
    overlayBody.className = "overlay_body";
    const descDiv = document.createElement("div");
    descDiv.className = "desc";

    const ellipDiv = document.createElement("div");
    ellipDiv.className = "ellipse";
    ellipDiv.innerText = place.road_address_name;

    const jibunDiv = document.createElement("div");
    jibunDiv.className = "jibun ellipse";
    jibunDiv.innerText = place.address_name;

    const phoneDiv = document.createElement("div");
    phoneDiv.className = place.phone;

    titleDiv.appendChild(closeSpan);
    infoDiv.appendChild(titleDiv);

    descDiv.appendChild(phoneDiv);
    descDiv.appendChild(ellipDiv);
    descDiv.appendChild(jibunDiv);
    overlayBody.appendChild(descDiv);

    infoDiv.appendChild(overlayBody);
    content.appendChild(infoDiv);

    // 마커 위에 커스텀오버레이를 표시합니다
    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    const overlay = new kakao.maps.CustomOverlay({
      content: content,
      map,
      position: marker.getPosition(),
    });

    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    kakao.maps.event.addListener(marker, "click", function () {
      overlay.setMap(map);
    });
    // setCustomOverlays([...customOverlays, overlay]);
    overlay.setMap(null);
    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
    // function closeOverlay() {
    //   overlay.setMap(null);
    // }
    // console.log("over_close", document.querySelector(".overlay_close"));
    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
    closeSpan.onclick = function closeOverlay() {
      overlay.setMap(null);
    };
  }

  //검색결과 마커 생성을 위한 useEffect
  //marker
  const displayMarker = (place) => {
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

    addCustomOverlay(place, marker);

    map.setBounds(bounds);

    marker.setMap(map);

    setKeepMarkers((keepMarkers) => [...keepMarkers, marker]);
  };

  useEffect(() => {
    if (keepMarkers.length > 0) {
      keepMarkers.forEach((keepMarker) => {
        keepMarker.setMap(null);
      });
      setKeepMarkers([]);
    }
    props.markers.map((marker) => {
      displayMarker(marker);
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

export default MapContainer;
