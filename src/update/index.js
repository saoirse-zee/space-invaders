import { LASER_POSITION_Y, BOUNDARY, INVADER_SPACING } from "../config.json";
import { moveMissiles } from './moveMissiles.js'
import { moveInvaders } from './moveInvaders.js'

export function update(state, delta) {
  let { userAction, missiles, laser, invaders, invaderLastMove, invaderVelocity } = state;
  const MOVE_DISTANCE = 1 / (7 * 5)

  // Handle user input
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

  missiles = moveMissiles(missiles, delta)
  
  const {
    nextInvaders,
    nextInvaderVelocity,
    nextInvaderLastMove
  } = moveInvaders(invaders, invaderVelocity, invaderLastMove, delta)

  // Detect missile hit, and destroy if needed
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
    missiles,
    invaders: nextInvaders,
    invaderVelocity: nextInvaderVelocity,
    invaderLastMove: nextInvaderLastMove
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