import { CANVAS_WIDTH, MISSILE_SIZE } from "../config";
import { translateX, translateY } from "./utils";

export function renderMissile(ctx, missile) {
  const x = translateX(missile.position[0]);
  const y = translateY(missile.position[1]);
  const color = `hsla(${255 - y}, 100%, 50%)`;
  ctx.fillStyle = missile.alive ? color : "#222";
  const radius = MISSILE_SIZE * CANVAS_WIDTH;
  const rotation = Math.PI;
  const startAngle = 0;
  const endAngle = Math.PI * 2;
  ctx.beginPath();
  ctx.ellipse(x, y, radius, radius, rotation, startAngle, endAngle);
  ctx.fill();
}
