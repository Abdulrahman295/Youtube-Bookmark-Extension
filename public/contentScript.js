console.log("contentScript.js loaded");

let leftControls, player;
let currentVideoId;

chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
  console.log("message arrived at content script");
  const { type, value, videoId } = obj;
  if (type === "NEW") {
    currentVideoId = videoId;
    newVideoLoaded();
  }
});

const newVideoLoaded = async () => {
  let bookmarkBtn = document.getElementsByClassName("bookmark-btn")[0];
  if (!bookmarkBtn) {
    // create new btn
    bookmarkBtn = document.createElement("img");
    bookmarkBtn.src = chrome.runtime.getURL("public/ext-icon.png");
    bookmarkBtn.className = "ytp-button " + "bookmark-btn";
    bookmarkBtn.title = "Click here to create a bookmark";
    console.log(bookmarkBtn);

    // add new btn to the left controls
    leftControls = document.getElementsByClassName("ytp-left-controls")[0];
    player = document.getElementsByClassName("video-stream")[0];
    leftControls.appendChild(bookmarkBtn);
    bookmarkBtn.addEventListener("click", addNewBookmark);
  }
};

const addNewBookmark = () => {
  console.log("bookmark btn clicked");
};
