import { Action, configureStore } from "@reduxjs/toolkit";

import searchResultsSlice from "../searchResults";
import bookmarksSlice from "../bookmarks";
import markersSlice from "../markers";
import searchOptionsSlice from "../searchOptions";

export const store = configureStore({
  reducer: {
    markers: markersSlice,
    searchResults: searchResultsSlice,
    bookmarks: bookmarksSlice,
    searchOptions: searchOptionsSlice,
  },
});

// export const storeDispatch = (action: Action) => store.dispatch(action);
export const storeDispatch = (action) => store.dispatch(action);
export const storeState = () => store.getState();
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
