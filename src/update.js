import { MISSILE_VELOCITY, INVADER_SIZE } from "./config.json";

export function update(state, delta) {
  let userAction = state.userAction;
  let missiles = state.missiles;
  let laser = state.laser;

  if (state.userAction === "right") {
    laser = laser + 10;
    userAction = "";
  }
  if (state.userAction === "left") {
    laser = laser - 10;
    userAction = "";
  }
  if (state.userAction === "fire") {
    missiles.push({
      position: [laser, 0],
      alive: true,
    });
    userAction = "";
  }

  missiles = missiles.map(m => (
    {
      ...m,
      position: [
        m.position[0],
        m.position[1] + MISSILE_VELOCITY * delta,
      ]
    }
  ));

  const now = Date.now();
  const invaderShouldMove = now - state.invader.lastMove > 1000
  const invader = invaderShouldMove
      ? {
          ...state.invader,
          lastMove: now,
          position: [
            state.invader.position[0] + 5,
            state.invader.position[1],
          ] 
        }
      : state.invader

  // Detect missile hit
  missiles
    .filter(missile => missile.alive)
    .forEach(missile => {
      const isMissileHit = (
        Math.abs(missile.position[0] - invader.position[0]) < INVADER_SIZE / 2 &&
        Math.abs(missile.position[1] - invader.position[1]) < INVADER_SIZE / 2
      )
      if (isMissileHit) {
        invader.alive = false
        missile.alive = false
      }
    })

  const nextState = { ...state, laser, userAction, invader, missiles };
  return nextState;
}
