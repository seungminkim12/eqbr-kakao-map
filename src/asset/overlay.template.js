export const getOverlayTemplate = (place) => {
  //개선 필요
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

  return content;
};
