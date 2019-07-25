const { requestAnimationFrame } = window

const MISSILE_VELOCITY = 0.1

let state = {
    userAction: '',
    clock: 0,
    laser: 0,
    invader: {
        lastMove: Date.now(),
        position: 0,
    },
    missile: 0
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
    let missile = state.missile
    let laser = state.laser

    if (state.userAction === 'right') {
        laser = laser + 1
        userAction = ''
    }
    if (state.userAction === 'left') {
        laser = laser - 1
        userAction = ''
    }
    if (state.userAction === 'fire') {
        missile = 0
        userAction = ''
    }

    missile = missile + MISSILE_VELOCITY
    

    let invader = state.invader
    const now = Date.now()
    if (now - state.invader.lastMove > 1000) {
        invader = {
            lastMove: now,
            position: state.invader.position + 1
        }
    }

    const nextState = {...state, laser, userAction, invader, missile};
    return nextState
}

function render(state) {
    document.body.innerText = JSON.stringify(state, null, 2)
}
