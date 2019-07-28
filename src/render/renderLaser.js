import { CANVAS_WIDTH, LASER_SIZE } from '../config'
import { translateX, translateY } from './utils'

export function renderLaser(ctx, laser) {
  ctx.fillStyle = 'white';
  const renderSize = LASER_SIZE * CANVAS_WIDTH
  const left = translateX(laser.position[0]) - renderSize / 2;
  const top = translateY(laser.position[1]) - renderSize / 2;
  ctx.fillRect(
    left,
    top,
    renderSize,
    renderSize,
  );
}