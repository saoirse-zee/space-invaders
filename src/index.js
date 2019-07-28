import { render } from './render'
import { canvas } from './html/canvas'
import { logger } from './html/logger'
import { update } from './update'
import { initState } from './init'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './config'

let state = initState()
document.body.appendChild(canvas(CANVAS_WIDTH, CANVAS_HEIGHT))
document.body.appendChild(logger())
const { requestAnimationFrame } = window
let lastStepTimestamp = 0
let delta = 0
const TIMESTEP = 1000 / 60

function step(timestamp = 0) {
    delta += timestamp - lastStepTimestamp
    lastStepTimestamp = timestamp
    while(delta >= TIMESTEP) {
        state = update(state, TIMESTEP);
        delta -= TIMESTEP
    }
    render(state);
    requestAnimationFrame(step)
}

// Handlers
document.body.addEventListener('keydown', function(event) {
    if (event.keyCode === 37) {
        state.userAction = 'left'
    }
    if (event.keyCode === 39) {
        state.userAction = 'right'
    }
    if (event.keyCode === 32) {
        state.userAction = 'fire'
    }
})

step()
