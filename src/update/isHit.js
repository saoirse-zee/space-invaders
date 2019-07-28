import { INVADER_SIZE } from '../config'

/**
 * 
 * @param {GameEntity} missile - A player missile
 * @param {GameEntity} invader
 */
export function isHit(missile, invader) {
  const result = distance(missile, invader) < INVADER_SIZE
  return result
}

/**
 * Find the distance between two game entities
 * 
 * @param {GameEntity} a - A missile, invader, or player
 * @param {GameEntity} b - A missile, invader, or player
 */
function distance(a, b) {
  const distX = a.position[0] - b.position[0]
  const distY = a.position[1] - b.position[1]
  const dist = Math.abs(
    Math.sqrt(
      distX**2 + distY**2
    )
  )
  return dist
}