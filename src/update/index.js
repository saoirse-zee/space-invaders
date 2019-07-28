import { moveLaser } from './moveLaser'
import { moveMissiles } from './moveMissiles'
import { moveInvaders } from './moveInvaders'
import { destroyPlayerMissiles } from './destroyPlayerMissiles'
import { destroyInvaders } from './destroyInvaders'
import { removeDeadMissiles } from './removeDeadMissiles'
import { MOVE_BOOST } from '../config'

export function update(state, delta) {
  let { userAction, missiles, laser, invaders, invaderLastMove, invaderVelocity } = state;

  // Handle user input
  if (userAction === "right") {
    return ({
      ...state,
      laser: {
        ...laser,
        vx: laser.vx + MOVE_BOOST,
      },
      userAction: ''
    })
  }
  if (userAction === "left") {
    return ({
      ...state,
      laser: {
        ...laser,
        vx: laser.vx - MOVE_BOOST,
      },
      userAction: ''
    })
  }
  if (userAction === "fire") {
    missiles.push({
      position: laser.position,
      alive: true
    })
    return ({
      ...state,
      missiles,
      userAction: ''
    })
  }

  const nextLaser = moveLaser(laser, delta);

  let nextMissiles = moveMissiles(missiles, delta)
  
  let {
    nextInvaders,
    nextInvaderVelocity,
    nextInvaderLastMove
  } = moveInvaders(invaders, invaderVelocity, invaderLastMove, delta)

  nextMissiles = destroyPlayerMissiles(nextMissiles, nextInvaders)
  nextInvaders = destroyInvaders(nextMissiles, nextInvaders)
  nextMissiles = removeDeadMissiles(nextMissiles)
  const nextUserAction = ''

  const nextState = {
    ...state,
    laser: nextLaser,
    userAction: nextUserAction,
    missiles: nextMissiles,
    invaders: nextInvaders,
    invaderVelocity: nextInvaderVelocity,
    invaderLastMove: nextInvaderLastMove
  };
  return nextState;
}
