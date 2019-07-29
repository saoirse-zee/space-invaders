import { canvas } from "../html/canvas";
import { logger } from "../html/logger";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../config";

export function initCanvas() {
  document.body.style.backgroundColor = "black";
  document.body.style.display = "flex";
  document.body.style.flexDirection = "column";
  const gameboard = canvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  gameboard.style.margin = "auto";
  document.body.appendChild(gameboard);
  document.body.appendChild(logger());
}
