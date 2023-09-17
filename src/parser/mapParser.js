import {
  displayMarkerFromServer,
  renderMapFromServer,
  resetMarkerFromServer,
} from "server/module/kakao-api";

export const renderMapParser = (container, isImageMap) => {
  renderMapFromServer(container, isImageMap);
};

export const displayMarkerParser = (place, isImageMap) => {
  displayMarkerFromServer(place, isImageMap);
};

export const resetMarkerParser = () => {
  resetMarkerFromServer();
};
