import { MISSILE_VELOCITY } from "./config.json";

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
    missiles.push([laser, 0]);
    userAction = "";
  }

  missiles = missiles.map(m => [m[0], m[1] + MISSILE_VELOCITY * delta]);

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

  // Detect missile collision
  missiles.forEach(m => {
    const isMissileHit = (
      Math.abs(m[0] - invader.position[0]) < 20 &&
      Math.abs(m[1] - invader.position[1]) < 20
    )
    if (isMissileHit) {
      invader.alive = false
    }
  })

  const nextState = { ...state, laser, userAction, invader, missiles };
  return nextState;
}
