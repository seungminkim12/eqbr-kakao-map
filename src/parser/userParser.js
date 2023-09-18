import {
  eqbrCoord,
  getOverLayFromServer,
  GET_SEARCH_RESULT_FAIL,
  GET_SEARCH_RESULT_NONE,
  GET_SEARCH_RESULT_SUCCESS,
  searchPlaceByCategoryFromServer,
  searchPlaceByKeywordFromServer,
} from "server/module/kakao-api";

const searchOptions = {
  location: eqbrCoord,
  size: 10,
};

export const searchPlaceByKeywordParser = async (keyword, page) => {
  const result = await searchPlaceByKeywordFromServer(keyword, {
    ...searchOptions,
    page,
  });
  const { data, status, pagination } = result;
  let parsedResult = {};
  if (status === GET_SEARCH_RESULT_SUCCESS) {
    if (pagination.hasNextPage) {
      parsedResult.data = data;
      parsedResult.currentPage = page + 1;
      return parsedResult;
    } else {
      if (page === pagination.last) {
        return { data };
      }
    }
  } else if (status === GET_SEARCH_RESULT_NONE) {
  } else if (status === GET_SEARCH_RESULT_FAIL) {
  }
};

export const searchPlaceByCategoryParser = async (category, page) => {
  const result = await searchPlaceByCategoryFromServer(category, {
    ...searchOptions,
    page,
  });
  const { data, status, pagination } = result;
  let parsedResult = {};
  if (status === GET_SEARCH_RESULT_SUCCESS) {
    if (pagination.hasNextPage) {
      parsedResult.data = data;
      parsedResult.currentPage = page + 1;
      return parsedResult;
    } else {
      if (page === pagination.last) {
        return { data };
      }
    }
  } else if (status === GET_SEARCH_RESULT_NONE) {
  } else if (status === GET_SEARCH_RESULT_FAIL) {
  }
};

export const getOverLayParser = (currentId) => {
  getOverLayFromServer(currentId);
};
