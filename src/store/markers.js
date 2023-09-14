import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  marker: [],
};

export const markersSlice = createSlice({
  name: "markers",
  initialState,
  reducers: {
    setMarkers: (state, action) => {
      state.marker.push(action.payload);
    },
    deleteMarkers: (state, action) => {
      state.marker.splice(0);
    },
  },
});

//Selector
export const markers = (state) => {
  return state.markers.marker;
};

//Action
export const { setMarkers, deleteMarkers } = markersSlice.actions;

//Reducer
export default markersSlice.reducer;
