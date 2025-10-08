const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const replayBtn = document.getElementById('replayBtn');

const box = 20;
const canvasSize = 400;
let snake;
let food;
let dx;
let dy;
let score;
let gameLoop;

function initGame() {
  snake = [{ x: 160, y: 200 }];
  dx = box;
  dy = 0;
  score = 0;
  food = generateFood();
  scoreEl.textContent = `Score: ${score}`;
  clearInterval(gameLoop);
  gameLoop = setInterval(updateGame, 100);
}

function generateFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
  };
}

function updateGame() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Game Over conditions
  if (
    head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameLoop);
    alert('Game Over!');
    return;
  }

  snake.unshift(head);

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreEl.textContent = `Score: ${score}`;
    food = generateFood();
  } else {
    snake.pop(); // Remove tail
  }

  drawGame();
}

function drawGame() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Draw snake
  ctx.fillStyle = 'green';
  snake.forEach(part => ctx.fillRect(part.x, part.y, box, box));

  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && dx === 0) {
    dx = -box;
    dy = 0;
  } else if (e.key === 'ArrowRight' && dx === 0) {
    dx = box;
    dy = 0;
  } else if (e.key === 'ArrowUp' && dy === 0) {
    dx = 0;
    dy = -box;
  } else if (e.key === 'ArrowDown' && dy === 0) {
    dx = 0;
    dy = box;
  }
  function initGame() {
  snake = [{ x: 160, y: 200 }];
  dx = box;
  dy = 0;
  score = 0;
  food = generateFood();
  scoreEl.textContent = `Score: ${score}`;
  clearInterval(gameLoop);
  gameLoop = setInterval(updateGame, 200); // <- Slowed down here
}

});

replayBtn.addEventListener('click', initGame);

// Start game on load
initGame();
