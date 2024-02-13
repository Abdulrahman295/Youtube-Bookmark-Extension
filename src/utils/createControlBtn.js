export function createControlBtn(type, parentElm, callback) {
  const controlElm = document.createElement("img");
  controlElm.src = "../assets/" + type + ".png";
  controlElm.addEventListener("click", callback);
  parentElm.appendChild(controlElm);
}
