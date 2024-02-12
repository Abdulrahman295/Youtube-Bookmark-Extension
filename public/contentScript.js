console.log("contentScript.js loaded");

let leftControls, player;
let currentVideoId;
let progressBar;

chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
  console.log("message arrived at content script");
  const { type, value, videoId } = obj;
  if (type === "NEW") {
    currentVideoId = videoId;
    newVideoLoaded();
  }
});

const newVideoLoaded = async () => {
  let bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
  if (!bookmarkBtnExists) {
    let bookmarkBtn = createBookmarkBtn();
    appendBookmarkBtn(bookmarkBtn);
    bookmarkBtn.addEventListener("click", addNewBookmark);
  }
};

const createBookmarkBtn = () => {
  let bookmarkBtn = document.createElement("img");
  bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
  bookmarkBtn.className = "ytp-button " + "bookmark-btn";
  bookmarkBtn.title = "Click here to create a bookmark";
  return bookmarkBtn;
};

const appendBookmarkBtn = (btn) => {
  leftControls = document.getElementsByClassName("ytp-left-controls")[0];
  player = document.getElementsByClassName("video-stream")[0];
  leftControls.appendChild(btn);
};

const addNewBookmark = () => {
  let currentTime = player.currentTime;
  let content = prompt("Enter a note for this bookmark");
  let newBookmark = {
    time: formatTime(currentTime),
    content: content ? content : "",
  };
  insertMarkerAt(currentTime, content);

  console.log(newBookmark);
};

const formatTime = (seconds) => {
  let date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substring(11, 19);
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
  marker.style.left = `${
    (currentTime / player.duration) * progressBar.offsetWidth
  }px`;
  marker.title = content;
  progressBar.appendChild(marker);
};
