import {
  addBookmarkAction,
  addPlaceInBookmark,
  openKakaoMapDetail,
  openKakaoMapNavigation,
} from "../../action/userAction";

export const getOverlayTemplate = (place) => {
  //개선 필요
  const content = document.createElement("div");
  content.className = "wrap";
  content.id = place.id;
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
  phoneDiv.className = "phone";
  phoneDiv.innerText = place.phone;

  const overlayAddBmkButton = document.createElement("button");
  overlayAddBmkButton.className = "overlay-buttons";
  overlayAddBmkButton.innerText = "즐겨찾기";
  overlayAddBmkButton.onclick = () => {
    addBookmarkAction(place);
  };

  const overLayDetailButton = document.createElement("button");
  overLayDetailButton.className = "overlay-buttons";
  overLayDetailButton.innerText = "상세보기";
  overLayDetailButton.onclick = () => {
    openKakaoMapDetail(place);
  };

  const overLayNavButton = document.createElement("button");
  overLayNavButton.className = "overlay-buttons";
  overLayNavButton.innerText = "길찾기";
  overLayNavButton.onclick = () => {
    openKakaoMapNavigation(place);
  };

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "overlay-buttons-fam";
  buttonsDiv.appendChild(overlayAddBmkButton);
  buttonsDiv.appendChild(overLayDetailButton);
  buttonsDiv.appendChild(overLayNavButton);

  titleDiv.appendChild(closeSpan);
  infoDiv.appendChild(titleDiv);

  descDiv.appendChild(phoneDiv);
  descDiv.appendChild(ellipDiv);
  descDiv.appendChild(jibunDiv);
  descDiv.appendChild(buttonsDiv);

  overlayBody.appendChild(descDiv);

  infoDiv.appendChild(overlayBody);
  content.appendChild(infoDiv);

  return content;
};
