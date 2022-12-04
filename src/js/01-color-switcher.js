const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
stopBtn.disabled = true;
let timerId = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  changeBackgroundColor();
  timerId = setInterval(changeBackgroundColor, 1000);
});
stopBtn.addEventListener('click', onClick => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBackgroundColor() {
  document.body.style.background = getRandomHexColor();
}
