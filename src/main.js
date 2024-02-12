import { hello } from "./utils/test.js";

document
  .getElementsByClassName("bookmark-btn")[0]
  .addEventListener("click", () => {
    hello();
  });
