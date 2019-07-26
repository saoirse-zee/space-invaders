import { CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_PADDING } from './config.json'

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

  // Clear canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, CANVAS_WIDTH + CANVAS_PADDING, CANVAS_HEIGHT + CANVAS_PADDING)
  
  // Invader
  renderInvader(ctx, state.invader);
  
  // Missile
  ctx.fillStyle = 'rgb(200, 0, 0)';
  state.missiles.forEach(missile => {
    ctx.fillRect(translateX(missile[0]), translateY(missile[1]), 5, 15);
  })
  
  // Laser
  ctx.fillRect(translateX(state.laser), translateY(0), 10, 10);
}

function renderInvader(ctx, invader) {
  ctx.fillStyle = invader.alive ? 'rgb(200, 0, 0)' : 'gray'
  ctx.fillRect(translateX(invader.position), 10, 50, 50);
}

function translateX(x) {
  return x + CANVAS_WIDTH / 2
}
function translateY(y) {
  return CANVAS_HEIGHT - y
}
