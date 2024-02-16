import { createBookmarkTimeElm } from "./createBookmarkTimeElm";
import { createControlsContainerElm } from "./createControlsContainerElm";

export function createBookmarkHeaderElm(bookmarkObj) {
  const bookmarkTimeElm = createBookmarkTimeElm(bookmarkObj);
  const controlsContainerElm = createControlsContainerElm();

  const bookmarkHeaderElm = document.createElement("div");
  bookmarkHeaderElm.className = "bookmark-header";
  bookmarkHeaderElm.appendChild(bookmarkTimeElm);
  bookmarkHeaderElm.appendChild(controlsContainerElm);

  return bookmarkHeaderElm;
}
