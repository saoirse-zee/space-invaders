import { canvas, render } from './render.js'
import { update } from './update.js'
import { initState } from './init.js'
import { log } from './log.js'

let state = initState()
document.body.appendChild(canvas())
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
