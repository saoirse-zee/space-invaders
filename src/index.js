const { requestAnimationFrame } = window

let state = {
    userAction: '',
    clock: 0,
    laser: 0,
    invader: {
        lastMove: Date.now(),
        position: 0,
    },
}

function step() {
    requestAnimationFrame(function() {
        // update
        state = update(state);
        // render
        render(state);
        requestAnimationFrame(step) // ?
    })
}

// Handlers
document.body.addEventListener('keydown', function(event) {
    console.log(event.keyCode)
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

function update(state) {
    let userAction = state.userAction
    
    let laser = state.laser
    if (state.userAction === 'right') {
        laser = laser + 1
        userAction = ''
    }
    if (state.userAction === 'left') {
        laser = laser - 1
        userAction = ''
    }

    let invader = state.invader
    const now = Date.now()
    if (now - state.invader.lastMove > 1000) {
        invader = {
            lastMove: now,
            position: state.invader.position + 1
        }
    }

    const nextState = {...state, laser, userAction, invader};
    return nextState
}

function render(state) {
    document.body.innerText = JSON.stringify(state, null, 2)
}
