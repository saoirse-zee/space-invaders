import { MISSILE_VELOCITY, INVADER_SIZE, LASER_POSITION_Y } from "./config.json";

export function update(state, delta) {
  let { userAction, missiles, laser, invaders, invaderLastMove } = state;
  const MOVE_DISTANCE = 1 / (7 * 5)

  if (state.userAction === "right") {
    laser = laser + MOVE_DISTANCE;
    userAction = "";
  }
  if (state.userAction === "left") {
    laser = laser - MOVE_DISTANCE;
    userAction = "";
  }
  if (state.userAction === "fire") {
    missiles.push({
      position: [laser, LASER_POSITION_Y],
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
      position: [invader.position[0] + MOVE_DISTANCE, invader.position[1]]
    }));
    invaderLastMove = now;
  }

  // Detect missile hit
  missiles
    .filter(missile => missile.alive)
    .forEach(missile => {
      nextInvaders
        .filter(invader => invader.alive)
        .forEach(invader => {
          if (isHit(missile, invader)) {
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

function isHit(missile, invader) {
  const hitArea = getHitArea(invader.type)
  const distX = Math.abs(missile.position[0] - invader.position[0])
  const distY = Math.abs(missile.position[1] - invader.position[1])
  return (
    distX < hitArea &&
    distY < hitArea
  )
}

function getHitArea(type) {
  const typeToSizeMap = {
    'small': 0.1,
    'medium': 0.1,
    'large': 0.1,
  }
  return typeToSizeMap[type]
}