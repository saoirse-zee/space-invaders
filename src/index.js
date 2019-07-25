import { component } from './component.js'

const config = {
    buttonLabel: 'hey there',
}

function rootComponent() {
    return component(config)
}

document.body.appendChild(rootComponent())
