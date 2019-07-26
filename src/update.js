import { MISSILE_VELOCITY } from './config.json'

export function update(state, delta) {
  let userAction = state.userAction
  let missiles = state.missiles
  let laser = state.laser

  if (state.userAction === 'right') {
      laser = laser + 10
      userAction = ''
  }
  if (state.userAction === 'left') {
      laser = laser - 10
      userAction = ''
  }
  if (state.userAction === 'fire') {
      missiles.push([laser, 0])
      userAction = ''
  }

  missiles = missiles.map(m => [
      m[0],
      m[1] + MISSILE_VELOCITY * delta,
  ])
  
  let invader = state.invader
  const now = Date.now()
  if (now - state.invader.lastMove > 1000) {
      invader = {
          lastMove: now,
          position: state.invader.position + 5
      }
  }

  const nextState = {...state, laser, userAction, invader, missiles};
  return nextState
}
