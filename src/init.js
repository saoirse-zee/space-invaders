import { INVADER_SPACING } from './config.json'

export function initState() {
    return {
        userAction: '',
        clock: 0,
        laser: 0,
        invaderLastMove: Date.now(),
        invaders: initInvaders(),
        missiles: [],
        invaderVelocity: 0.005,
    };
}

function initInvaders() {
  const invaders = []
  
  for (let i = 0; i < 5; i++) {
    const y = INVADER_SPACING * i
    const offset = i / 500; // To make the velocity switch work 🤷🏻‍♀️
    for (let j = 1; j <= 5; j++) {
      const x = INVADER_SPACING * j
      invaders.push({
        position: [x + offset,y],
        alive: true,
        type: getType(i)
      })
      invaders.push({
        position: [-x + offset,y],
        alive: true,
        type: getType(j)
      })
    }
    invaders.push({
      position: [offset,y],
      alive: true,
      type: getType(i)
    })
  }
  
  return invaders
}

function getType(rowIndex) {
  const mapRowToType = {
    1: 'small',
    2: 'medium',
    3: 'medium',
    4: 'large',
    5: 'large',
  }
  return mapRowToType[rowIndex]
}