import { CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_PADDING, INVADER_SIZE, MISSILE_SIZE, LASER_SIZE, LASER_POSITION_Y } from './config.json'

export function render(state) {
  const canvas = document.getElementsByTagName('canvas')[0]
  const ctx = canvas.getContext('2d');
  
  clearCanvas(ctx);
  state.invaders.forEach(invader => renderInvader(ctx, invader))
  state.missiles.forEach(missile => renderMissile(ctx, missile))
  renderLaser(ctx, state.laser);
}

function clearCanvas(ctx) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, CANVAS_WIDTH + CANVAS_PADDING, CANVAS_HEIGHT + CANVAS_PADDING);
}
function renderLaser(ctx, laser) {
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
function renderMissile(ctx, missile) {
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
function renderInvader(ctx, invader) {
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
function translateX(x) {
  const stateWidth = 2
  const scaleFactor = CANVAS_WIDTH / stateWidth
  return scaleFactor * x + CANVAS_WIDTH / 2
}
function translateY(y) {
  const stateWidth = 2
  const scaleFactor = CANVAS_WIDTH / stateWidth
  return -scaleFactor * y + CANVAS_WIDTH / 2
}
function renderInvaderDev(ctx, invader) {
  ctx.strokeStyle = invader.alive ? 'pink' : 'green'
  const radius = INVADER_SIZE / 2 * CANVAS_WIDTH
  const x = translateX(invader.position[0])
  const y = translateY(invader.position[1])
  // Body
  ctx.beginPath()
  ctx.ellipse(
    x,
    y,
    radius,
    radius,
    0,
    0,
    2 * Math.PI
  )
  ctx.stroke()
}