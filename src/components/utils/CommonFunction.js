//Q 버튼 핸들러 따로 처리 같이 처리?
//상세보기 버튼 클릭 핸들러
export function moreInfoButtonHandler(place) {
  const pathURL = `https://place.map.kakao.com/${place.id}`;
  window.open(pathURL);
}

//길찾기 버튼 클릭 핸들러
export function pathButtonClickHandler(place) {
  const pathURL = `https://map.kakao.com/link/to/${place.place_name},${place.y},${place.x}/from/이큐비알홀딩스,37.510901492192744,127.04499359218127`;
  window.open(pathURL);
}
