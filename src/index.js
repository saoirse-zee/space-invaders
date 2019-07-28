import { render } from './render.js'
import { canvas } from './html/canvas'
import { update } from './update'
import { initState } from './init.js'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './config.json'

let state = initState()
document.body.appendChild(canvas(CANVAS_WIDTH, CANVAS_HEIGHT))
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
    // log(state)
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
