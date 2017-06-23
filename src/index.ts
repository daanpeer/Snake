import { Snake, Direction } from './Snake';

const canvas =  <HTMLCanvasElement> document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const fps = 60;
let now;
let then = Date.now();
let elapsed = 0;
const fpsInterval = 1000/fps;

const snake = new Snake({ width: ctx.canvas.width, height: ctx.canvas.height }, 10);
const draw = () => {
  ctx.fillStyle = '#2c3e50'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  snake.draw(ctx)
  ctx.stroke();
}

const game = () => {
  if (!snake.death()) {
    draw();
    snake.move();
  }
}
draw();

document.onkeydown = (e) => {
  switch (e.key) {
    case 'a':
      snake.setDirection(Direction.Left)
      break;
    case 'w':
      snake.setDirection(Direction.Up)
      break;
    case 'd':
      snake.setDirection(Direction.Right)
      break;
    case 's':
      snake.setDirection(Direction.Down)
      break;
  }
};

const loop = () => {
  now = Date.now();
  elapsed = now - then;
  if (elapsed >= fpsInterval) {
    game();
    then = Date.now();
  }
  window.requestAnimationFrame(loop);
}

loop();
