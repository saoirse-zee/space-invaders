export function canvas() {
  const element = document.createElement('canvas')
  element.setAttribute('id', 'gameboard')
  element.setAttribute('width', 400)
  element.setAttribute('height', 400)
  return element
}

export function render(state) {
  const canvas = document.getElementById('gameboard');
  const ctx = canvas.getContext('2d');

  // Clear canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400)
  
  // Invader
  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(state.invader.position, 10, 50, 50);
  
  // Invader
  ctx.fillRect(state.laser, 370, 30, 10);
  
  // Missile
  ctx.fillRect(200, 370 - state.missile, 3, 10);
}
