import { MISSILE_VELOCITY, LASER_POSITION_Y, BOUNDARY, INVADER_SPACING } from "./config.json";

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

  // Move missiles
  missiles = missiles.map(m => ({
    ...m,
    position: [m.position[0], m.position[1] + MISSILE_VELOCITY * delta]
  }));

  const invadersShouldSwitchDirection = 
    invaders
      .filter(invader => invader.alive)
      .reduce((result, invader) => {
        const nearLeftWall = invader.position[0] < -BOUNDARY;
        const movingLeft = invaderVelocity < 0;
        if (nearLeftWall && movingLeft) {
          return true
        }
        const nearRightWall = invader.position[0] > BOUNDARY;
        const movingRight = invaderVelocity > 0;
        if (nearRightWall && movingRight) {
          return true
        }
        return result
      }, false)
  
      
  // Move invaders
  const now = Date.now();
  const invadersShouldMove = now - state.invaderLastMove > 1000;
  let nextInvaders = invaders;
  if (invadersShouldMove) {
    invaderVelocity = invadersShouldSwitchDirection ? -invaderVelocity : invaderVelocity
    const distX = invadersShouldSwitchDirection ? 0 : invaderVelocity * delta
    const distY = invadersShouldSwitchDirection ? -INVADER_SPACING : 0
    nextInvaders = invaders.map(invader => ({
      ...invader,
      position: [
        invader.position[0] + distX,
        invader.position[1] + distY,
      ]
    }));
    invaderLastMove = now;
  }

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
    invaders: nextInvaders,
    missiles,
    invaderLastMove,
    invaderVelocity
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