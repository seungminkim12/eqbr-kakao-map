import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmark: [],
};

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    setBookmarks: (state, action) => {
      console.log("action.payload", action);
      state.bookmark.push(action.payload);
    },
    deleteBookmarks: (state, action) => {
      state.bookmark.filter((bmk) => bmk.id !== action.payload);
    },
  },
});

//Selector
export const bookmark = (state) => {
  return state.bookmarks.bookmark;
};

//Action
export const { setBookmarks, deleteBookmarks } = bookmarksSlice.actions;

//Reducer
export default bookmarksSlice.reducer;
