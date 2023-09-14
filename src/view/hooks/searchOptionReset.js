import React from "react";
import { storeDispatch } from "store/util";
import { deleteSearchResults } from "store/searchResults";
import { resetCurrentPage } from "store/searchOptions";

export default function searchOptionReset() {
  storeDispatch(deleteSearchResults());
  storeDispatch(resetCurrentPage());
}
