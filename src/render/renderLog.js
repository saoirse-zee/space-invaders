export function renderLog(content, isVisible) {
  if (!isVisible) {
    return;
  }
  const logger = document.getElementById("logger");
  logger.innerHTML = JSON.stringify(content, null, 2).slice(0, 200) + "···";
}
