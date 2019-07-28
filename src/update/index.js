import { LASER_POSITION_Y } from "../config.json";
import { moveMissiles } from './moveMissiles.js'
import { moveInvaders } from './moveInvaders.js'
import { destroyPlayerMissiles } from './destroyPlayerMissiles.js'
import { destroyInvaders } from './destroyInvaders.js'
import { removeDeadMissiles } from './removeDeadMissiles.js'

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

  let nextMissiles = moveMissiles(missiles, delta)
  
  let {
    nextInvaders,
    nextInvaderVelocity,
    nextInvaderLastMove
  } = moveInvaders(invaders, invaderVelocity, invaderLastMove, delta)

  nextMissiles = destroyPlayerMissiles(nextMissiles, nextInvaders)
  nextInvaders = destroyInvaders(nextMissiles, nextInvaders)
  nextMissiles = removeDeadMissiles(nextMissiles)

  const nextState = {
    ...state,
    laser,
    userAction,
    missiles: nextMissiles,
    invaders: nextInvaders,
    invaderVelocity: nextInvaderVelocity,
    invaderLastMove: nextInvaderLastMove
  };
  return nextState;
}