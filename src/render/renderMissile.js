import { CANVAS_WIDTH, MISSILE_SIZE } from '../config.json'
import { translateX, translateY } from './utils'

export function renderMissile(ctx, missile) {
  ctx.fillStyle = missile.alive ? 'white' : '#222'
  const renderSize = MISSILE_SIZE * CANVAS_WIDTH
  const left = translateX(missile.position[0]) - renderSize / 2;
  const top = translateY(missile.position[1]) - renderSize / 2;
  ctx.fillRect(
    left,
    top,
    renderSize,
    renderSize,
  );
}