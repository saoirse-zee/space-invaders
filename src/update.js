import { MISSILE_VELOCITY, INVADER_SIZE } from "./config.json";

export function update(state, delta) {
  let { userAction, missiles, laser, invaders, invaderLastMove } = state;

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
      alive: true
    });
    userAction = "";
  }

  missiles = missiles.map(m => ({
    ...m,
    position: [m.position[0], m.position[1] + MISSILE_VELOCITY * delta]
  }));

  const now = Date.now();
  const invaderShouldMove = now - state.invaderLastMove > 1000;
  let nextInvaders = invaders;
  if (invaderShouldMove) {
    nextInvaders = invaders.map(invader => ({
      ...invader,
      position: [invader.position[0] + 5, invader.position[1]]
    }));
    invaderLastMove = now;
  }

  // Detect missile hit
  missiles
    .filter(missile => missile.alive)
    .forEach(missile => {
      nextInvaders.forEach(invader => {
        const isMissileHit =
          Math.abs(missile.position[0] - invader.position[0]) <
            INVADER_SIZE / 2 &&
          Math.abs(missile.position[1] - invader.position[1]) <
            INVADER_SIZE / 2;
        if (isMissileHit) {
          invader.alive = false;
          missile.alive = false;
        }
      });
    });

  const nextState = {
    ...state,
    laser,
    userAction,
    invaders: nextInvaders,
    missiles,
    invaderLastMove
  };
  return nextState;
}
