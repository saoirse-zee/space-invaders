import { CANVAS_WIDTH, LASER_SIZE, LASER_POSITION_Y } from '../config'
import { translateX, translateY } from './utils'

export function renderLaser(ctx, laser) {
  ctx.fillStyle = 'white';
  const renderSize = LASER_SIZE * CANVAS_WIDTH
  const left = translateX(laser) - renderSize / 2;
  const top = translateY(LASER_POSITION_Y) - renderSize / 2;
  ctx.fillRect(
    left,
    top,
    renderSize,
    renderSize,
  );
}