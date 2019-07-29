export function canvas(width, height) {
  const element = document.createElement("canvas");
  element.setAttribute("width", width);
  element.setAttribute("height", height);
  return element;
}
