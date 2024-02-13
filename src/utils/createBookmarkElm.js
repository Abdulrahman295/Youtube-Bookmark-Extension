import { createControlBtn } from "./createControlBtn";
import { onDelete } from "./onDelete";
import { onEdit } from "./onEdit";
import { onPlay } from "./onPlay";

export function createBookmarkElm(bookmarkObj) {
  const newBookmarkElm = document.createElement("div");
  newBookmarkElm.className = "bookmark";
  newBookmarkElm.id = "bookmark-" + bookmarkObj.time;
  newBookmarkElm.setAttribute("data-time", bookmarkObj.time);

  const bookmarkContentElm = document.createElement("div");
  bookmarkContentElm.className = "bookmark-content";
  bookmarkContentElm.textContent = `${formatTime(bookmarkObj.time)}\n${bookmarkObj.content}`;

  const controlsContainerElm = document.createElement("div");
  controlsContainerElm.className = "bookmark-controls";
  createControlBtn("play", controlsContainerElm, onPlay);
  createControlBtn("delete", controlsContainerElm, onDelete);
  createControlBtn("edit", controlsContainerElm, onEdit);

  newBookmarkElm.appendChild(bookmarkContentElm);
  newBookmarkElm.appendChild(controlsContainerElm);
  return newBookmarkElm;
}

function formatTime (seconds){
  let date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substring(11, 19);
};
