import { canvas, render } from './render.js'
import { log } from './log.js'

document.body.appendChild(canvas())

const { requestAnimationFrame } = window

const MISSILE_VELOCITY = 0.3

let state = {
    userAction: '',
    clock: 0,
    laser: 0,
    invader: {
        lastMove: Date.now(),
        position: 0,
    },
    missiles: [],
}

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
    log(state)
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

function update(state, delta) {
    let userAction = state.userAction
    let missiles = state.missiles
    let laser = state.laser

    if (state.userAction === 'right') {
        laser = laser + 10
        userAction = ''
    }
    if (state.userAction === 'left') {
        laser = laser - 10
        userAction = ''
    }
    if (state.userAction === 'fire') {
        missiles.push([laser, 0])
        userAction = ''
    }

    missiles = missiles.map(m => [
        m[0],
        m[1] + MISSILE_VELOCITY * delta,
    ])
    
    let invader = state.invader
    const now = Date.now()
    if (now - state.invader.lastMove > 1000) {
        invader = {
            lastMove: now,
            position: state.invader.position + 5
        }
    }

    const nextState = {...state, laser, userAction, invader, missiles};
    return nextState
}
