import { MISSILE_VELOCITY } from '../config'

export function moveMissiles(missiles, delta) {
  return missiles.map(m => ({
    ...m,
    position: [m.position[0], m.position[1] + MISSILE_VELOCITY * delta]
  }));
}