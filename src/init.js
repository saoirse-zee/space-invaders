export function initState() {
    return {
        userAction: '',
        clock: 0,
        laser: 0,
        invaderLastMove: Date.now(),
        invaders: initInvaders(),
        missiles: [],
    };
}

function initInvaders() {
  const invaders = []
  const spacing = 1 / 7
  
  for (let i = 0; i < 5; i++) {
    const y = spacing * i
    for (let i = 1; i <= 5; i++) {
      const x = spacing * i
      invaders.push({
        position: [x,y],
        alive: true,
        type: getType(i)
      })
      invaders.push({
        position: [-x,y],
        alive: true,
        type: getType(i)
      })
    }
    invaders.push({
      position: [0,y],
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