export function logger() {
  const element = document.createElement('div')
  element.setAttribute('id', 'logger')
  element.style.fontFamily = 'monospace'
  return element
}