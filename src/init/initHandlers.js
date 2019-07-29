import { state } from "../index";

export function initHandlers() {
  document.body.addEventListener("keydown", function(event) {
    if (event.keyCode === 37) {
      state.userAction = "left";
    }
    if (event.keyCode === 39) {
      state.userAction = "right";
    }
    if (event.keyCode === 32) {
      state.userAction = "fire";
    }
  });
}
