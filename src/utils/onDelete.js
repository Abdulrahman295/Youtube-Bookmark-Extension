import { getActiveTab } from "./getActiveTab";

export async function onDelete(e) {
  console.log("on Delete clicked!");
  const bookmarkTime =
    e.target.parentNode.parentNode.parentNode.getAttribute("data-time");
  const bookmarkElm = document.getElementById("bookmark-" + bookmarkTime);
  console.log(bookmarkElm);
  bookmarkElm.parentNode.removeChild(bookmarkElm);

  const activeTab = await getActiveTab();
  chrome.tabs.sendMessage(
    activeTab.id,
    { type: "DELETE", bkmTime: parseFloat(bookmarkTime) },
    (response) => {
      console.log(response.currentBookmarks);
      if (response && response.currentBookmarks.length === 0) {
        const bookmarksElm = document.getElementById("bookmarks");
        bookmarksElm.innerHTML = `<i class = "row">No bookmarks to show  </i>`;
      }
    }
  );
}
