import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  searchKeyword: "",
  searchCategory: "",
};

export const searchOptionsSlice = createSlice({
  name: "searchOptions",
  initialState,
  reducers: {
    plusCurrentPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    resetCurrentPage: (state) => {
      state.currentPage = 1;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    resetSearchKeyword: (state) => {
      state.searchKeyword = "";
    },
    setSearchCategory: (state, action) => {
      console.log("setCate", action);
      state.searchCategory = action.payload;
    },
    resetSearchCategory: (state) => {
      state.searchCategory = "";
    },
  },
});

// //Selector
export const searchKeyword = (state) => state.searchOptions.searchKeyword;
export const searchCategory = (state) => state.searchOptions.searchCategory;
export const currentPage = (state) => state.searchOptions.currentPage;

//Action
export const {
  plusCurrentPage,
  resetCurrentPage,
  setSearchKeyword,
  resetSearchKeyword,
  setSearchCategory,
  resetSearchCategory,
} = searchOptionsSlice.actions;

//Reducer
export default searchOptionsSlice.reducer;
