import { isHit } from "./isHit";

export function destroyPlayerMissiles(missiles, invaders) {
  const nextMissiles = missiles.map(missile => {
    invaders
      .filter(invader => invader.alive)
      .forEach(invader => {
        if (isHit(missile, invader)) {
          missile.alive = false;
        }
      });
    return missile;
  });
  return nextMissiles;
}
