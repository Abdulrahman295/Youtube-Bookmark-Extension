console.log("background.js loaded");

chrome.runtime.onInstalled.addListener(async () => {
  for (const cs of chrome.runtime.getManifest().content_scripts) {
    for (const tab of await chrome.tabs.query({ url: cs.matches })) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: cs.js,
      });
    }
  }
});

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
