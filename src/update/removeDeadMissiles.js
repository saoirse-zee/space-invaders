export function removeDeadMissiles(nextMissiles) {
  return nextMissiles.filter(m => m.alive);
}
