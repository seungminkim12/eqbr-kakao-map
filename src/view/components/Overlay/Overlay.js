import {
  addBookmarkAction,
  openKakaoMapDetail,
  openKakaoMapNavigation,
} from "action/userAction";

function Overlay(place, closefn) {
  console.log("overlay place", place);
  const content = `  
  <div class ='wrap' id=${place.id}>
  <div class='info'>
    <div class='title'>        
    ${place.place_name}
    <span class='close' onClick=${closefn}></span>
    </div>
    <div class='overlay_body'>
      <div class='desc'>
        <div class='phone'>${place.phone}</div>
        <div class='ellipse'>${place.road_address_name}</div>
        <div class='jibun ellipse'>${place.road_address_name}</div>
        <div class='overlay-buttons-fam'>
          <button class='overlay-buttons' onClick=${() =>
            addBookmarkAction(place)}>즐겨찾기</button>
          <button class='overlay-buttons' onClick=${() =>
            openKakaoMapDetail(place)}>상세보기</button>
          <button class='overlay-buttons' onClick=${() =>
            openKakaoMapNavigation(place)}>길찾기</button>
        </div>
      </div>
    </div>
  </div>
</div>`;

  return content;
}

export default Overlay;
