export function createControlBtn(type, parentElm, callback) {
  const controlElm = document.createElement("img");
  controlElm.addEventListener("mouseover", () => {
    controlElm.style.cursor = "pointer";
    controlElm.style.opacity = "0.6";
  });
  controlElm.addEventListener("mouseout", () => {
    controlElm.style.opacity = "1";
  });
  controlElm.src = "../assets/" + type + ".png";
  controlElm.addEventListener("click", callback);
  parentElm.appendChild(controlElm);
}
