import { CANVAS_WIDTH } from '../config'

export function translateX(x) {
  const stateWidth = 2
  const scaleFactor = CANVAS_WIDTH / stateWidth
  return scaleFactor * x + CANVAS_WIDTH / 2
}

export function translateY(y) {
  const stateWidth = 2
  const scaleFactor = CANVAS_WIDTH / stateWidth
  return -scaleFactor * y + CANVAS_WIDTH / 2
}