import React, { useEffect, useState, useRef } from "react";
import BookmarkArea from "../components/Bookmark/BookmarkArea";
import BookmarkMapArea from "../components/Bookmark/BookmarkMapArea";

import { useNavigate } from "react-router-dom";
import { displayMarkerAction, renderMapAction } from "action/mapAction";

import "./Bookmark.scss";

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

  //이미지 지도 컨테이너
  const staticMapContainer = useRef(null);

  const navigate = useNavigate();

  /**
   * 북마크
   */
  const handleBookmark = () => {
    //북마크 가져옴
    bookmark = JSON.parse(localStorage.getItem("eqbrBookmark"));

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
    //전체 북마크 임시 저장 state
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
    handlePaging(savedBookmark);
    savedBookmark.map((sb) => {
      // displayMarker(sb);
    });
  };

  function noBmkBtnHandler() {
    navigate("/map");
  }

  useEffect(() => {
    handleBookmark();
  }, []);

  useEffect(() => {
    bookmarkList.length > 0 && renderMapAction(staticMapContainer, true);
    bookmarkList.length > 0 &&
      bookmarkList.map((bmk) => {
        displayMarkerAction(bmk, true);
      });
  }, [bookmarkList]);

  return (
    <>
      <div className="bmk-content-container">
        {bookmarkList && bookmarkList.length > 0 && (
          <div>
            <div className="bookmark-title-container">
              <h1 className="bookmark-title">즐겨찾기</h1>
            </div>
          </div>
        )}

        <div className="bookmark-container">
          {bookmarkList && bookmarkList.length > 0 ? (
            bookmarkList.map((bmk, idx) => {
              return <BookmarkArea bmk={bmk} key={bmk.id} idx={idx} />;
            })
          ) : (
            <div className="no-bookmark-container">
              <div className="no-bookmark-title-section">
                <h1 className="bookmark-title">
                  즐겨찾기에 추가된 장소가 없습니다.
                </h1>
              </div>
              <div className="no-bookmark-button-section">
                <button
                  className="no-bookmark-button"
                  onClick={noBmkBtnHandler}
                >
                  추가하러 가기
                </button>
              </div>
            </div>
          )}
          {bookmarkList.length >= 10 &&
            savedBookmark.length !== bookmarkList.length && (
              <button
                id="loadMoreButton"
                onClick={() => {
                  loadMoreButtonHandler();
                }}
              >
                더보기
              </button>
            )}
        </div>
        {bookmarkList && bookmarkList.length > 0 && (
          <BookmarkMapArea ref={staticMapContainer} />
        )}
      </div>
    </>
  );
}

export default Bookmark;
