import { getActiveTab } from "./getActiveTab";

export async function onEdit(e) {
  const newContent = prompt("Enter a new note for this bookmark");

  const bookmarkTime =
    e.target.parentNode.parentNode.parentNode.getAttribute("data-time");
  const bookmarkElm = document.getElementById("bookmark-" + bookmarkTime);

  const activeTab = await getActiveTab();

  if (newContent) {
    const bookmarkContentElm = bookmarkElm.querySelector(
      `[class="bookmark-content"]`
    );
    bookmarkContentElm.textContent = `${bookmarkTime}\n${newContent}`;

    chrome.tabs.sendMessage(
      activeTab.id,
      {
        type: "EDIT",
        bkmTime: parseFloat(bookmarkTime),
        newContent: newContent,
      },
      (response) => {
        if (response) console.log(response.message);
      }
    );
  }
}
