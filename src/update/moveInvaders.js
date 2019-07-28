import { BOUNDARY, INVADER_SPACING } from "../config";

export function moveInvaders(invaders, invaderVelocity, delta) {
  const invadersShouldSwitchDirection = invaders
    .filter(invader => invader.alive)
    .reduce((result, invader) => {
      const nearLeftWall = invader.position[0] < -BOUNDARY;
      const movingLeft = invaderVelocity < 0;
      const nearRightWall = invader.position[0] > BOUNDARY;
      const movingRight = invaderVelocity > 0;
      
      if (nearLeftWall && movingLeft) {
        return true;
      }
      if (nearRightWall && movingRight) {
        return true;
      }
      return result;
    }, false);

  // Move invaders
  let nextInvaders = invaders;
  let nextInvaderVelocity = invaderVelocity;
  nextInvaderVelocity = invadersShouldSwitchDirection
    ? -invaderVelocity
    : invaderVelocity;
  const distX = invadersShouldSwitchDirection ? 0 : invaderVelocity * delta;
  const distY = invadersShouldSwitchDirection ? -INVADER_SPACING : 0;
  nextInvaders = invaders.map(invader => ({
    ...invader,
    position: [invader.position[0] + distX, invader.position[1] + distY]
  }));
  return ({
    nextInvaders,
    nextInvaderVelocity
  })
}
