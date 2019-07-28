import { BOUNDARY, LASER_FRICTION } from '../config'

export function moveLaser(laser, delta) {
  const laserDistX = laser.vx * delta
  const goingSooooSlow = Math.abs(laser.vx) < 0.00001;
  let nextVx = goingSooooSlow
    ? 0 // Let's just stop this thing
    : laser.vx * LASER_FRICTION // Slow it down
  let x = laser.position[0] + laserDistX
  let y = laser.position[1]
  const wallBounce = 0.0002
  if (laser.position[0] > BOUNDARY) {
    x = BOUNDARY
    nextVx = -wallBounce
  }
  if (laser.position[0] < -BOUNDARY) {
    x = -BOUNDARY
    nextVx = wallBounce
  }
  const nextLaser = {
    ...laser,
    position: [x, y],
    vx: nextVx
  };
  return nextLaser;
}
