import printMe from './print.js'
import './style.css'

export function component(config) {
    const element = document.createElement('div')
    const gameBoard = svg()
    element.appendChild(gameBoard)
    return element
}

function svg() {
    const element = document.createElement('svg')
    // element.setAttribute('viewBox', "0 0 100 100")
    element.setAttribute('xmlns', "http://www.w3.org/2000/svg")
    element.setAttribute('width', '100')
    element.setAttribute('height', '100')
    element.setAttribute('stroke', 'pink')
    element.setAttribute('fill', 'aliceblue')
    element.appendChild(invader({x: 10, y: 10}))
    element.appendChild(invader({x: 20, y: 20}))
    element.appendChild(text())
    element.appendChild(text())
    return element
}

function invader({x, y}) {
    const element = document.createElement('circle')
    element.setAttribute('cx', x)
    element.setAttribute('cy', y)
    element.setAttribute('r', '5')
    element.setAttribute('fill', 'pink')
    return element
}

function text() {
    const element = document.createElement('text')
    element.innerText = 'hi'
    return element
}

