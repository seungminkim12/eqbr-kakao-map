import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmark: [],
};

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmarks: (state, action) => {
      state.bookmark.push(action.payload);
    },
    deleteBookmarks: (state, action) => {
      state.bookmark.filter((bmk) => bmk.id !== action.payload);
    },
  },
});

//Selector
export const savedBookmark = (state) => {
  return state.bookmarks.bookmark;
};

//Action
export const { addBookmarks, deleteBookmarks } = bookmarksSlice.actions;

//Reducer
export default bookmarksSlice.reducer;
