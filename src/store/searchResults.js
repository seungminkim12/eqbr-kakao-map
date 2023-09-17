import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   searchResult: [],
// };

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: [],
  // initialState,
  reducers: {
    addSearchResults: (state, action) => {
      return state.concat(action.payload);
    },
    deleteSearchResults: (state, action) => {
      // state.searchResult.splice(0);
      state.splice(0);
    },
  },
});

//Selector
// export const searchResult = (state: RootState) => {
//   // return state.searchResults.searchResult;
//   return state.searchResults;
// };
export const searchResult = (state) => {
  // return state.searchResults.searchResult;
  return state.searchResults;
};

//Action
export const { addSearchResults, deleteSearchResults } =
  searchResultsSlice.actions;

//Reducer
export default searchResultsSlice.reducer;
