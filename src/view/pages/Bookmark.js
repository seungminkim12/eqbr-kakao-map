import React, { useEffect, useState, useRef } from "react";
import BookmarkArea from "../components/Bookmark/BookmarkArea";
import BookmarkMapArea from "../components/Bookmark/BookmarkMapArea";
import {
  KAKAO_CREATE_MAP,
  KAKAO_DISPLAY_MARKER,
} from "../../server/module/kakao-api";

import "../styles/Bookmark.scss";

function Bookmark() {
  //저장된 북마크
  let bookmark = null;
  //저장된 북마크 state
  const [savedBookmark, setSavedBookmark] = useState([]);
  const content = 10;
  const [bookmarkList, setBookmarkList] = useState([]);
  let firstContent = 1;
  const [lastContent, setLastContent] = useState(content);
  const [currentBmkPage, setCurrentBmkPage] = useState(1);
  // const [totalPage, setTotalPage] = useState(1);
  // const [isLoadMore, setIsLoadMore] = useState(false);

  //이미지 지도 컨테이너
  const staticMapContainer = useRef(null);

  /**
   * 북마크
   */
  const handleBookmark = () => {
    //북마크 가져옴
    bookmark = JSON.parse(localStorage.getItem("eqbrFavorite"));

    if (!bookmark || bookmark.length < 0) {
      return;
    }
    //북마크 솔팅
    const sortedBookmark = bookmark.sort((a, b) => {
      return new Date(b.regDate) - new Date(a.regDate);
    });
    //페이징에 쓸 마지막 페이지 계산
    // setTotalPage(Math.floor(sortedBookmark.length / content));

    //페이징 함수
    handlePaging(sortedBookmark);

    setSavedBookmark(sortedBookmark);
  };

  //페이징 함수
  const handlePaging = (sortedBookmark) => {
    //북마크 페이징
    setLastContent(lastContent + content);
    firstContent = lastContent - content;

    setCurrentBmkPage(currentBmkPage + 1);
    //솔팅 & 페이징된 북마크 state에 저장
    setBookmarkList([
      ...bookmarkList,
      ...sortedBookmark.slice(firstContent, lastContent),
    ]);
  };

  //더보기 버튼 클릭 핸들러
  const loadMoreButtonHandler = () => {
    // setIsLoadMore(true);

    handlePaging(savedBookmark);
    savedBookmark.map((sb) => {
      // displayMarker(sb);
    });

    // setIsLoadMore(false);
  };

  //북마크해제 버튼 핸들러
  function bmkReleaseHandler(bmkid) {
    console.log("bmkid", bmkid);
  }

  useEffect(() => {
    handleBookmark();
    /**
     * 이미지 지도
     */
    KAKAO_CREATE_MAP(staticMapContainer, true);

    // const markerList = JSON.parse(localStorage.getItem("eqbrFavoriteSorted"));
    // const markerList = savedBookmark;

    // markerList.map((bmk) => {
    //   console.log("bmk", bmk);
    //   KAKAO_DISPLAY_MARKER(bmk, null, null);
    // });
  }, []);

  useEffect(() => {
    bookmarkList.map((bmk) => {
      KAKAO_DISPLAY_MARKER(bmk, null, null);
    });
  }, [bookmarkList]);

  return (
    <>
      <div className="bmk-content-container">
        {bookmarkList && bookmarkList.length > 0 ? (
          <div>
            <div className="bookmark-title-container">
              <h1>즐겨찾기</h1>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="bookmark-container">
          <BookmarkArea bookmarkList={bookmarkList} />
          {bookmarkList &&
          bookmarkList.length >= 10 &&
          savedBookmark.length !== bookmarkList.length ? (
            <button
              id="loadMoreButton"
              onClick={() => {
                loadMoreButtonHandler();
              }}
            >
              더보기
            </button>
          ) : (
            ""
          )}
        </div>

        <BookmarkMapArea ref={staticMapContainer} />
      </div>
    </>
  );
}

export default Bookmark;
