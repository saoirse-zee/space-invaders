export function renderLog(content) {
  const logger = document.getElementById("logger");
  logger.innerHTML = JSON.stringify(content, null, 2).slice(0, 200) + "···";
}
