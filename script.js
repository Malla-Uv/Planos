const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let startX, startY;
let mode = 'line';

function setMode(newMode) {
  mode = newMode;
}

canvas.addEventListener('mousedown', (e) => {
  startX = e.offsetX;
  startY = e.offsetY;
  drawing = true;
});

canvas.addEventListener('mouseup', (e) => {
  if (!drawing) return;
  drawing = false;
  const endX = e.offsetX;
  const endY = e.offsetY;

  if (mode === 'line') {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  } else if (mode === 'rect') {
    ctx.strokeRect(startX, startY, endX - startX, endY - startY);
  } else if (mode === 'isometric') {
    drawIsometricBox(startX, startY, endX - startX);
  }
});

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function download() {
  const link = document.createElement('a');
  link.download = 'plano.png';
  link.href = canvas.toDataURL();
  link.click();
}

// Dibujo isométrico simple
function drawIsometricBox(x, y, size) {
  const h = size / 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + h, y - h);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x + h, y + h);
  ctx.closePath();
  ctx.stroke();
}
