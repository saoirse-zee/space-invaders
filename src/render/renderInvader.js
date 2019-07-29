import { CANVAS_WIDTH, INVADER_SIZE } from "../config";
import { translateX, translateY } from "./utils";

export function renderInvader(ctx, invader, clock, i) {
  const x = translateX(invader.position[0]);
  const y = translateY(invader.position[1]);

  if (invader.alive) {
    renderBody(x, y, clock);
    renderEye(x, y, clock);
    renderEye(x, y, clock + i * 20);
  } else {
    renderGhost(x, y, clock, i);
  }

  function renderBody(x, y, clock) {
    const rotation = ((Math.PI * clock) / 2000) * i;

    // Body
    ctx.fillStyle = `hsla(46, 10%, 10%)`;
    const baseRadius = INVADER_SIZE * CANVAS_WIDTH;
    ctx.beginPath();
    ctx.ellipse(x, y, baseRadius, baseRadius, rotation, 0, Math.PI * 2);
    ctx.fill();

    // Colorful wedge
    ctx.fillStyle = `hsla(${i}, 100%, 50%)`;
    renderWedge(x, y, -rotation / 2, baseRadius);

    // Black wedge, which just serves as a mask
    ctx.fillStyle = `hsla(46, 100%, 0%)`;
    renderWedge(x, y, rotation + 1, baseRadius * 1.1);

    function renderWedge(x, y, rotation, radius) {
      const startAngle = 0;
      const endAngle = Math.PI * 0.7;
      ctx.beginPath();
      ctx.ellipse(x, y, radius, radius, rotation, startAngle, endAngle);
      ctx.fill();
    }
  }

  function renderEye(x, y, clock) {
    ctx.fillStyle = `hsla(333, 100%, 100%, 0.7)`;
    const pathLength = INVADER_SIZE * CANVAS_WIDTH * 0.8; // Stay within bounds of body
    const offsetX = Math.sin(clock / 30) * pathLength;
    const offsetY = (Math.cos(clock / 50) * pathLength) / 3;
    const radius = (INVADER_SIZE * CANVAS_WIDTH) / 5;
    const rotation = 0;
    const startAngle = 0;
    const endAngle = Math.PI * 2;
    ctx.beginPath();
    ctx.ellipse(
      x + offsetX,
      y + offsetY,
      radius,
      radius,
      rotation,
      startAngle,
      endAngle
    );
    ctx.fill();
  }

  function renderGhost(x, y, clock, i) {
    ctx.fillStyle = `hsla(333, 100%, 100%, 0.5)`;
    const pathLength = INVADER_SIZE * CANVAS_WIDTH * 5; // Wander outside bounds of body
    const offsetX = (Math.sin(clock / (10 * i)) * pathLength) / 2;
    const offsetY = Math.cos(clock / (20 * i)) * pathLength;
    const radius = (INVADER_SIZE * CANVAS_WIDTH) / 10;
    const rotation = 0;
    const startAngle = 0;
    const endAngle = Math.PI * 2;
    ctx.beginPath();
    ctx.ellipse(
      x + offsetX,
      y + offsetY,
      radius,
      radius,
      rotation,
      startAngle,
      endAngle
    );
    ctx.fill();
  }
}
