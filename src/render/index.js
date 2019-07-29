import { clearCanvas } from "./clearCanvas";
import { renderLaser } from "./renderLaser";
import { renderMissile } from "./renderMissile";
import { renderInvader } from "./renderInvader";
import { renderLog } from "./renderLog";

export function render(state) {
  renderLog(state);

  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");

  clearCanvas(ctx);
  state.invaders.forEach((invader, i) =>
    renderInvader(ctx, invader, state.clock, i)
  );
  state.missiles.forEach(missile => renderMissile(ctx, missile));
  renderLaser(ctx, state.laser, state.clock);
}
