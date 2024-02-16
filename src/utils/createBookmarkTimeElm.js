export function createBookmarkTimeElm(bookmarkObj) {
  const bookmarkTimeElm = document.createElement("div");
  bookmarkTimeElm.className = "bookmark-time";
  bookmarkTimeElm.textContent = `${formatTime(bookmarkObj.time)}`;

  return bookmarkTimeElm;
}

function formatTime(seconds) {
  let date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substring(11, 19);
}
