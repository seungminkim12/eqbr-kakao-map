import React, { useEffect, useState, useRef } from "react";
import {
  moreInfoButtonHandler,
  pathButtonClickHandler,
} from "../../utils/CommonFunction";
import ImageMap from "../Map/ImageMap";

const eqbrCoord = new kakao.maps.LatLng(37.510901492192744, 127.04499359218127); //지도의 중심좌표.

let map = null;

function Bookmark() {
  //저장된 북마크
  let bookmark = null;
  //저장된 북마크 state
  const [savedBookmark, setSavedBookmark] = useState([]);
  const content = 10;
  const [bookmarkList, setBookmarkList] = useState([]);
  let firstContent = 1;
  const [lastContent, setLastContent] = useState(content);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);

  console.log("bookmarkList", bookmarkList);
  //이미지 지도 컨테이너
  const staticMapContainer = useRef(null);
  console.log("staticMapContainer", staticMapContainer);

  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: eqbrCoord,
    level: 3, //지도의 레벨(확대, 축소 정도)
    draggable: false,
  };
  const bounds = new kakao.maps.LatLngBounds();

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
    setTotalPage(Math.floor(sortedBookmark.length / content));

    //페이징 함수
    handlePaging(sortedBookmark);

    setSavedBookmark(sortedBookmark);
  };

  //페이징 함수
  const handlePaging = (sortedBookmark) => {
    //북마크 페이징
    setLastContent(lastContent + content);
    firstContent = lastContent - content;

    setCurrentPage(currentPage + 1);
    //솔팅 & 페이징된 북마크 state에 저장
    setBookmarkList([
      ...bookmarkList,
      ...sortedBookmark.slice(firstContent, lastContent),
    ]);
  };

  //더보기 버튼 클릭 핸들러
  const loadMoreButtonHandler = () => {
    setIsLoadMore(true);

    handlePaging(savedBookmark);
    savedBookmark.map((sb) => {
      displayMarker(sb);
    });

    setIsLoadMore(false);
  };

  //마커 그리는 함수
  const displayMarker = (place) => {
    const imagesize = new kakao.maps.Size(24, 35);
    const markerImg = new kakao.maps.MarkerImage(
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      imagesize
    );

    const position = new kakao.maps.LatLng(+place.y, +place.x);
    console.log("map", map);
    const marker = new kakao.maps.Marker({
      map,
      position,
      image: markerImg,
      clickable: false,
    });
    bounds.extend(position);
    map.setBounds(bounds);

    marker.setMap(map);
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
    map = new kakao.maps.Map(staticMapContainer.current, options);
    console.log("map", map);
    // const markerList = JSON.parse(localStorage.getItem("eqbrFavoriteSorted"));
    const markerList = savedBookmark;
    markerList.map((bmk) => {
      displayMarker(bmk);
    });
  }, []);

  return (
    <div style={{ textAlign: "center", overflow: "auto" }}>
      {bookmarkList && bookmarkList.length > 0 ? (
        <div
          style={{
            position: "relative",
            // top: "100px",
            marginTop: "100px",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "fixed",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <h1>즐겨찾기</h1>
          </div>
        </div>
      ) : (
        ""
      )}
      <div style={{ marginTop: "100px" }}>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <ul>
            {bookmarkList && bookmarkList.length > 0 ? (
              bookmarkList.map((sb, idx) => (
                <>
                  <li>
                    <div className="card">
                      <div className="container">
                        <ul
                          className="bookmark-list"
                          style={{ textAlign: "center" }}
                        >
                          <li>{idx}</li>
                          <li>{sb.place_name}</li>
                          <li>{sb.road_address_name}</li>
                          <li>{sb.phone}</li>
                          <li>{sb.category_group_name}</li>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <li>
                              <div>
                                <button
                                  onClick={() => {
                                    bmkReleaseHandler(sb.id);
                                  }}
                                >
                                  즐겨찾기해제
                                </button>
                              </div>
                            </li>
                            <li>
                              <div>
                                <button
                                  onClick={() => moreInfoButtonHandler(sb)}
                                >
                                  상세정보로 이동
                                </button>
                              </div>
                            </li>
                            <li>
                              <span>
                                <button
                                  onClick={() => {
                                    pathButtonClickHandler(sb);
                                  }}
                                >
                                  길찾기로 이동
                                </button>
                              </span>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </li>
                </>
              ))
            ) : (
              <div style={{ marginTop: "200px" }}>
                <div>
                  <h1>즐겨찾기에 추가된 장소가 없습니다.</h1>
                </div>
                <div style={{ marginTop: "200px" }}>
                  <button style={{ width: "150px", height: "30px" }}>
                    추가하러 가기
                  </button>
                </div>
              </div>
            )}
          </ul>
          {bookmarkList && bookmarkList.length > 0 ? (
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

        <ImageMap
          savedBookmark={savedBookmark}
          bookmarkList={bookmarkList}
          map={map}
          ref={staticMapContainer}
        />
      </div>
    </div>
  );
}

export default Bookmark;
