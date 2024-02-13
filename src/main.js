import { getActiveTab } from "./utils/getActiveTab.js";
import { getVideoId } from "./utils/getVideoId.js";
import { renderBookmarks } from "./utils/renderBookmarks.js";

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTab();
  if (activeTab.url && activeTab.url.includes("youtube.com/watch")) {
    const currentVideoId = getVideoId(activeTab.url);

    chrome.storage.sync.get([currentVideoId], (result) => {
      const currentBookmarks = result[currentVideoId]
        ? JSON.parse(result[currentVideoId])
        : [];
      renderBookmarks(currentBookmarks);
    });
  } else {
    const bookmarkContainer = document.getElementsByClassName("container")[0];
    bookmarkContainer.innerHTML = `<div class="title"> This is not a Youtube page. </div>`;
  }
});
