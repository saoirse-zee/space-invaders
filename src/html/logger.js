export function logger() {
  const element = document.createElement('div')
  element.setAttribute('id', 'logger')
  element.style.fontFamily = 'monospace'
  element.style.color = 'green'
  element.style.padding = '0 100px'
  return element
}