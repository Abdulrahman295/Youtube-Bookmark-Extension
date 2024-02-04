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

const newVideoLoaded = () => {
  const bookmarkBtn = document.getElementsByClassName("bookmark-btn")[0];
  console.log(bookmarkBtn);
};
