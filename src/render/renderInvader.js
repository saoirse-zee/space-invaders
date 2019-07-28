import { CANVAS_WIDTH, INVADER_SIZE } from '../config'
import { translateX, translateY } from './utils'

export function renderInvader(ctx, invader) {
  ctx.fillStyle = invader.alive ? 'white' : '#222'
  const renderSize = INVADER_SIZE * CANVAS_WIDTH
  const left = translateX(invader.position[0]) - renderSize / 2;
  const top = translateY(invader.position[1]) - renderSize / 2;
  
  // Body
  ctx.fillRect(
    left,
    top,
    renderSize,
    renderSize
  );
  
  // Eyes
  ctx.fillStyle = 'black'
  ctx.fillRect(
    left + renderSize / 6,
    top + renderSize / 3,
    renderSize / 6,
    renderSize / 6,
  );
  ctx.fillRect(
    left + renderSize / 6 * 4,
    top + renderSize / 3,
    renderSize / 6,
    renderSize / 6,
  );
}