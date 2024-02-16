export function createBookmarkcontentElm(bookmarkObj) {
  const bookmarkContentElm = document.createElement("div");
  bookmarkContentElm.className = "bookmark-content";
  bookmarkContentElm.textContent = bookmarkObj.content;

  bookmarkContentElm.addEventListener("click", () => {
    if (
      window
        .getComputedStyle(bookmarkContentElm)
        .getPropertyValue("text-overflow") === "ellipsis"
    ) {
      bookmarkContentElm.style.textOverflow = "unset";
      bookmarkContentElm.style.wordBreak = "break-all";
    } else {
      bookmarkContentElm.style.textOverflow = "ellipsis";
      bookmarkContentElm.style.wordBreak = "unset";
    }
  });

  return bookmarkContentElm;
}
