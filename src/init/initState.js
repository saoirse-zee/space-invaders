import { LASER_POSITION_Y, INITIAL_INVADER_VELOCITY } from "../config";
import { initInvaders } from "./initInvaders";

export function initState() {
  return {
    userAction: "",
    clock: 0,
    laser: {
      position: [0, LASER_POSITION_Y],
      vx: 0
    },
    invaders: initInvaders(),
    missiles: [],
    invaderVelocity: INITIAL_INVADER_VELOCITY
  };
}
