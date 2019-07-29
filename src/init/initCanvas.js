import { canvas } from "../html/canvas";
import { logger } from "../html/logger";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../config";

export function initCanvas() {
  document.body.style.backgroundColor = "black";
  document.body.appendChild(canvas(CANVAS_WIDTH, CANVAS_HEIGHT));
  document.body.appendChild(logger());
}
