import { onDelete } from "./onDelete";
import { onEdit } from "./onEdit";
import { onPlay } from "./onPlay";
import { createControlBtn } from "./createControlBtn";

export function createControlsContainerElm() {
  const controlsContainerElm = document.createElement("div");
  controlsContainerElm.className = "bookmark-controls";
  createControlBtn("play", controlsContainerElm, onPlay);
  createControlBtn("delete", controlsContainerElm, onDelete);
  createControlBtn("edit", controlsContainerElm, onEdit);
  return controlsContainerElm;
}
