import { render } from "./render";
import { update } from "./update";
import { initState } from "./init/initState";
import { initCanvas } from "./init/initCanvas";
import { initHandlers } from "./init/initHandlers";

export let state = initState();

const { requestAnimationFrame } = window;
let lastStepTimestamp = 0;
let delta = 0;
const TIMESTEP = 1000 / 60;

function step(timestamp = 0) {
  delta += timestamp - lastStepTimestamp;
  lastStepTimestamp = timestamp;
  while (delta >= TIMESTEP) {
    state = update(state, TIMESTEP);
    delta -= TIMESTEP;
  }
  render(state);
  requestAnimationFrame(step);
}

initCanvas();
initHandlers();
step();
