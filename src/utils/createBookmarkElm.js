import { createBookmarkHeaderElm } from "./createBookmarkHeaderElm";
import { createBookmarkcontentElm } from "./createBookmarkcontentELm";

export function createBookmarkElm(bookmarkObj) {
  const newBookmarkElm = document.createElement("div");
  newBookmarkElm.className = "bookmark";
  newBookmarkElm.id = "bookmark-" + bookmarkObj.time;
  newBookmarkElm.setAttribute("data-time", bookmarkObj.time);

  const bookmarkHeaderElm = createBookmarkHeaderElm(bookmarkObj);
  const bookmarkContentElm = createBookmarkcontentElm(bookmarkObj);
  newBookmarkElm.appendChild(bookmarkHeaderElm);
  newBookmarkElm.appendChild(bookmarkContentElm);

  return newBookmarkElm;
}
