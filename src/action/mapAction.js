import {
  displayMarkerParser,
  renderMapParser,
  resetMarkerParser,
} from "../parser/mapParser";

export const renderMapAction = (container, isImageMap) => {
  renderMapParser(container, isImageMap);
};
// cb, overlays
export const displayMarkerAction = (place, isImageMap) => {
  displayMarkerParser(place, isImageMap);
};

export const resetMarkerAction = () => {
  resetMarkerParser();
};
