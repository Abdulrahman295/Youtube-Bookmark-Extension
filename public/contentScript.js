console.log("contentScript.js loaded");

let leftControls = document.getElementsByClassName("ytp-left-controls")[0];
let player = document.getElementsByClassName("video-stream")[0];
let progressBar = document.getElementsByClassName(
  "ytp-progress-bar-container"
)[0];
let currentVideoId;
let currentBookmarks = [];

chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
  console.log("message arrived at content script");
  const { type, bkmTime, videoId, newContent } = obj;
  if (type === "NEW") {
    currentVideoId = videoId;
    clearProgressBar();
    newVideoLoaded();
  }
  if (type === "PLAY") {
    player.currentTime = bkmTime;
  }
  if (type === "DELETE") {
    deleteBookmark(bkmTime);
    sendResponse({ currentBookmarks: currentBookmarks });
  }

  if (type === "EDIT") {
    editBookmark(bkmTime, newContent);
  }
});

const clearProgressBar = () => {
  progressBar = document.getElementsByClassName(
    "ytp-progress-bar-container"
  )[0];

  const markers = progressBar.querySelectorAll(".marker");
  markers.forEach((mrkr) => progressBar.removeChild(mrkr));
};

const newVideoLoaded = async () => {
  let bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
  if (!bookmarkBtnExists) {
    let bookmarkBtn = createBookmarkBtn();
    appendBookmarkBtn(bookmarkBtn);
    bookmarkBtn.addEventListener("click", addNewBookmark);
  }
  renderMarkers();
};

const createBookmarkBtn = () => {
  let bookmarkBtn = document.createElement("img");
  bookmarkBtn.src = chrome.runtime.getURL("assets/add.png");
  bookmarkBtn.className = "ytp-button " + "bookmark-btn";
  bookmarkBtn.title = "Click here to create a bookmark";
  bookmarkBtn.style.cursor = "pointer";
  bookmarkBtn.style.width = "27px";
  bookmarkBtn.style.height = "27px";
  bookmarkBtn.style.marginLeft = "2px";
  bookmarkBtn.style.marginRight = "2px";
  bookmarkBtn.style.padding = "4px";
  bookmarkBtn.style.display = "block";
  bookmarkBtn.style.marginTop = "auto";
  bookmarkBtn.style.marginBottom = "auto";
  return bookmarkBtn;
};

const appendBookmarkBtn = (btn) => {
  leftControls = document.getElementsByClassName("ytp-left-controls")[0];
  player = document.getElementsByClassName("video-stream")[0];
  leftControls.appendChild(btn);
};

const fetchBookmarks = async () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get([currentVideoId], (result) => {
      if (result[currentVideoId]) {
        result[currentVideoId] = JSON.parse(result[currentVideoId]);
        result[currentVideoId].forEach((bkm) => {
          bkm.time = parseFloat(bkm.time);
        });
        resolve(result[currentVideoId]);
      } else {
        resolve([]);
      }
    });
  });
};

const addNewBookmark = async () => {
  let currentTime = player.currentTime;
  let content = prompt("Enter a note for this bookmark");
  insertMarkerAt(currentTime, content);
  let newBookmark = {
    time: currentTime,
    content: content ? content : "",
  };
  console.log(currentVideoId);
  currentBookmarks = await fetchBookmarks();
  currentBookmarks.push(newBookmark);
  currentBookmarks.sort((a, b) => a.time - b.time);
  chrome.storage.sync
    .set({
      [currentVideoId]: JSON.stringify(currentBookmarks),
    })
    .then(() => {
      console.log("bookmark saved successfully!");
      console.log("current bookmarks: " + currentBookmarks);
    });

  console.log(newBookmark);
};

const deleteBookmark = (targetTime) => {
  currentBookmarks = currentBookmarks.filter((bkm) => bkm.time !== targetTime);
  currentBookmarks.sort((a, b) => a.time - b.time);
  console.log(currentBookmarks);
  chrome.storage.sync
    .set({
      [currentVideoId]: JSON.stringify(currentBookmarks),
    })
    .then(() => {
      console.log("bookmarks updated successfully!");
    });

  deleteMarkerAt(targetTime);
};

const deleteMarkerAt = (targetTime) => {
  const targetMarker = progressBar.querySelector(`[id="marker-${targetTime}"]`);
  console.log(targetMarker);
  targetMarker.parentNode.removeChild(targetMarker);
};

const editBookmark = (targetTime, newContent) => {
  currentBookmarks.forEach((bkm) => {
    if (bkm.time === targetTime) {
      bkm.content = newContent;
    }
  });

  chrome.storage.sync
    .set({
      [currentVideoId]: JSON.stringify(currentBookmarks),
    })
    .then(() => {
      console.log("bookmarks updated successfully!");
    });

  editMarkerAt(targetTime, newContent);
};

const editMarkerAt = (targetTime, newContent) => {
  const targetMarker = progressBar.querySelector(`[id="marker-${targetTime}"]`);
  targetMarker.title = newContent;
};

const insertMarkerAt = (currentTime, content) => {
  progressBar = document.getElementsByClassName(
    "ytp-progress-bar-container"
  )[0];
  let marker = document.createElement("div");
  marker.style.width = "7px";
  marker.style.height = "100%";
  marker.style.backgroundColor = "yellow";
  marker.style.position = "absolute";
  marker.style.zIndex = "1000";
  marker.style.left = `${(currentTime.toFixed(3) / player.duration) * 100}%`;
  marker.title = content;
  marker.style.cursor = "pointer";
  marker.id = "marker-" + currentTime;
  marker.className = "marker";
  progressBar.appendChild(marker);
};

const renderMarkers = async () => {
  currentBookmarks = await fetchBookmarks();
  currentBookmarks.forEach((bookmark) => {
    insertMarkerAt(bookmark.time, bookmark.content);
  });
};
