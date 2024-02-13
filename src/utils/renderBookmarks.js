import { createBookmarkElm } from "./createBookmarkElm";
export function renderBookmarks(bookmarksArray) {
  const bookmarksElm = document.getElementById("bookmarks");
  bookmarksElm.innerHTML = ``;
  if (bookmarksArray.length > 0) {
    console.log("bookmarksArray: ", bookmarksArray);
    for (let i = 0; i < bookmarksArray.length; i++) {
      const newBookmarkElm = createBookmarkElm(bookmarksArray[i]);
      bookmarksElm.appendChild(newBookmarkElm);
    }
  } else {
    bookmarksElm.innerHTML = `<i class = "row">No bookmarks to show  </i>`;
  }
}
