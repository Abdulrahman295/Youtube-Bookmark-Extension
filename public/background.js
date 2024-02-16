console.log("background.js loaded");

chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const videoUrl = new URL(tab.url);
    const urlParameters = new URLSearchParams(videoUrl.search);
    console.log(urlParameters.get("v") + " is the video id");
    console.log("current tabId is " + tabId);
    chrome.tabs.sendMessage(
      tabId,
      { type: "NEW", videoId: urlParameters.get("v") },
      (response) => {
        if (response) console.log(response.message);
      }
    );
  }
});

chrome.webNavigation.onCommitted.addListener(async (details) => {
  if (
    ["reload", "link", "typed", "generated"].includes(details.transitionType) &&
    details.url.includes("youtube.com/watch")
  ) {
    const videoUrl = new URL(details.url);
    const urlParameters = new URLSearchParams(videoUrl.search);
    console.log("current tab is loaded with ID = " + details.tabId);
    chrome.scripting
      .executeScript({
        target: { tabId: details.tabId },
        files: ["contentScript.js"],
      })
      .then(() => {
        chrome.tabs.sendMessage(
          details.tabId,
          { type: "NEW", videoId: urlParameters.get("v") },
          (response) => {
            if (response) console.log(response.message);
          }
        );
      });
  }
});
