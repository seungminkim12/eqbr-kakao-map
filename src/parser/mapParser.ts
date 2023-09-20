import {
  eqbrCoord,
  getOverLayFromServer,
  GET_SEARCH_RESULT_FAIL,
  GET_SEARCH_RESULT_NONE,
  GET_SEARCH_RESULT_SUCCESS,
  searchPlaceByCategoryFromServer,
  searchPlaceByKeywordFromServer,
  displayMarkerFromServer,
  renderMapFromServer,
  resetMarkerFromServer,
} from "module/kakao-api";
import { parserController } from "./utils/parserController";

const searchOptions = {
  location: eqbrCoord,
  size: 10,
};

export const renderMapParser = (container: any, isImageMap: boolean) =>
  parserController(() => {
    renderMapFromServer(container, isImageMap);
  });

export const displayMarkerParser = (place: any, isImageMap: boolean) =>
  parserController(() => {
    displayMarkerFromServer(place, isImageMap);
  });

export const resetMarkerParser = () =>
  parserController(() => {
    resetMarkerFromServer();
  });

export const searchPlaceByKeywordParser = (keyword: string, page: number) =>
  parserController(async () => {
    const result = await searchPlaceByKeywordFromServer(keyword, {
      ...searchOptions,
      page,
    });
    const { data, status, pagination } = result;
    let parsedResult = {
      data: [],
      currentPage: page,
    };
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
  });

export const searchPlaceByCategoryParser = (category: string, page: number) =>
  parserController(async () => {
    const result = await searchPlaceByCategoryFromServer(category, {
      ...searchOptions,
      page,
    });
    const { data, status, pagination } = result;
    // let parsedResult = {};
    let parsedResult = {
      data: null,
      currentPage: page,
    };
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
  });

export const getOverLayParser = (currentId) =>
  parserController(() => {
    getOverLayFromServer(currentId);
  });
