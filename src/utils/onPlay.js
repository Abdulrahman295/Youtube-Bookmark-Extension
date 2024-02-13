import { getActiveTab } from "./getActiveTab";

export async function onPlay(e) {
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("data-time");
  const activeTab = await getActiveTab();
  chrome.tabs.sendMessage(
    activeTab.id,
    { type: "PLAY", bkmTime: bookmarkTime },
    (response) => {
      if (response) console.log(response.message);
    }
  );
}
