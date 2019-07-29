import { isHit } from "./isHit";

export function destroyInvaders(missiles, invaders) {
  return invaders.map(getNextInvader(missiles));
}

function getNextInvader(missiles) {
  return invader => {
    const isMissileHit = missile => isHit(missile, invader);
    const hits = missiles.map(isMissileHit).filter(result => result === true);

    return hits.length > 0 ? { ...invader, alive: false } : invader;
  };
}
