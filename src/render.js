import { CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_PADDING, INVADER_SIZE } from './config.json'

export function canvas() {
  const element = document.createElement('canvas')
  element.setAttribute('id', 'gameboard')
  element.setAttribute('width', CANVAS_WIDTH + CANVAS_PADDING)
  element.setAttribute('height', CANVAS_HEIGHT + CANVAS_PADDING)
  return element
}

export function render(state) {
  const canvas = document.getElementById('gameboard');
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
  const SIZE = 10
  const left = translateX(laser) - SIZE / 2;
  const top = translateY(0) - SIZE / 2;
  ctx.fillRect(
    left,
    top,
    SIZE,
    SIZE,
  );
}
function renderMissile(ctx, missile) {
  ctx.fillStyle = missile.alive ? 'white' : '#222'
  const SIZE = 10
  const left = translateX(missile.position[0]) - SIZE / 2;
  const top = translateY(missile.position[1]) - SIZE / 2;
  ctx.fillRect(
    left,
    top,
    SIZE,
    SIZE,
  );
}
function renderInvader(ctx, invader) {
  ctx.fillStyle = invader.alive ? 'white' : '#222'
  const SIZE = 30;
  const left = translateX(invader.position[0]) - INVADER_SIZE / 2;
  const top = translateY(invader.position[1]) - INVADER_SIZE / 2;
  
  // Body
  ctx.fillRect(
    left,
    top,
    SIZE,
    SIZE
  );
  
  // Eyes
  ctx.fillStyle = 'black'
  ctx.fillRect(
    left + SIZE / 6,
    top + SIZE / 3,
    SIZE / 6,
    SIZE / 6,
  );
  ctx.fillRect(
    left + SIZE / 6 * 4,
    top + SIZE / 3,
    SIZE / 6,
    SIZE / 6,
  );
}
function translateX(x) {
  return x + CANVAS_WIDTH / 2
}
function translateY(y) {
  return CANVAS_HEIGHT - y
}
