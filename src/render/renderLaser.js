import { CANVAS_WIDTH, LASER_SIZE } from "../config";
import { translateX, translateY } from "./utils";

export function renderLaser(ctx, laser, clock) {
  const renderSize = LASER_SIZE * CANVAS_WIDTH;
  const x = translateX(laser.position[0]);
  const y = translateY(laser.position[1]);
  const left = x - renderSize / 2;
  const top = y - renderSize / 4;
  const width = renderSize;
  const height = width / 4;
  const hue = Math.sin(clock / 100) * 50;
  ctx.fillStyle = `hsla(${hue}, 100%, 50%)`;
  ctx.fillRect(left, top, width, height);

  renderMover();

  function renderMover() {
    ctx.fillStyle = `hsla(${255 - hue}, 100%, 50%)`;
    const pathLength = renderSize * 0.2; // Stay within bounds of body
    const offsetX = Math.sin(clock / 30) * pathLength;
    const radius = (LASER_SIZE * CANVAS_WIDTH) / 5;
    const rotation = Math.PI;
    const startAngle = 0;
    const endAngle = Math.PI;
    ctx.beginPath();
    ctx.ellipse(x + offsetX, y, radius, radius, rotation, startAngle, endAngle);
    ctx.fill();
  }
}
