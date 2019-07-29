import { CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_PADDING } from "../config";

export function clearCanvas(ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(
    0,
    0,
    CANVAS_WIDTH + CANVAS_PADDING,
    CANVAS_HEIGHT + CANVAS_PADDING
  );
}
