let canvas = document.getElementById('сanvas'),
  ctx = canvas.getContext('2d');

let food = {
  x: randomFood(0, canvas.width - 10),
  y: randomFood(0, canvas.height - 10),
};

let snake = [
  { x: 200, y: 200 },
  { x: 180, y: 200 },
  { x: 160, y: 200 },
];
let dx = 0;
let dy = 0;
let step = 20;

let score = 3;

document.addEventListener('keydown', changeDirection, false);
//start game
main();

function main() {
  if (has_game_ended()) return alert('game over- reload to start again');
  setTimeout(function onTick() {
    draw();
    main();
  }, 100);
}
//key handlers
function changeDirection(e) {
  if (e.keyCode == 39) {
    direction = 'right';
  } else if (e.keyCode == 37) {
    direction = 'left';
  } else if (e.keyCode == 38) {
    direction = 'up';
  } else if (e.keyCode == 40) {
    direction = 'down';
  }
}
let direction = 'right';

function makeMove() {
  const goingUp = dy === -20;
  const goingDown = dy === 20;
  const goingRight = dx === 20;
  const goingLeft = dx === -20;
  if (direction === 'right' && !goingLeft) {
    dx = 20;
    dy = 0;
  } else if (direction === 'left' && !goingRight) {
    dx = -20;
    dy = 0;
  } else if (direction === 'up' && !goingDown) {
    dx = 0;
    dy = -20;
  } else if (direction === 'down' && !goingUp) {
    dx = 0;
    dy = 20;
  }
}
//snake
function drawSnake() {
  snake.forEach(drawSnakePart);
}
function drawSnakePart(snakePart) {
  ctx.beginPath();
  ctx.rect(snakePart.x, snakePart.y, step, step);
  ctx.strokestyle = 'darkblue';
  ctx.fillStyle = '#579936';
  ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
  ctx.fill();
  ctx.closePath();
}
function move_snake() {
  // Create the new Snake's head
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  //   const has_eaten_food = snake[0].x === food.x && snake[0].y === food.y;
  function isFoodEaten() {
    var XColl = false;
    var YColl = false;

    if (snake[0].x + 20 >= food.x && snake[0].x <= food.x + 20) XColl = true;
    if (snake[0].y + 20 >= food.y && snake[0].y <= food.y + 20) YColl = true;

    if (XColl & YColl) {
      return true;
    }
    return false;
  }

  if (isFoodEaten()) {
    // debugger;
    // Increase score
    score += 10;
    food.x = randomFood(0, canvas.width);
    food.y = randomFood(0, canvas.height);
    drawFood();
    //     food.y = randomFood(0, canvas.height);
    // Display score on screen
    document.getElementById('score').innerHTML = score;
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}

// food
function drawFood() {
  ctx.beginPath();
  ctx.rect(food.x, food.y, 10, 10);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}
function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > canvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function draw() {
  ctx.clearRect(0, 0, canvas.height, canvas.width);
  drawFood();
  makeMove();
  move_snake();
  drawSnake();
  //   throughWalls();
}

// function throughWalls() {
//   if (snake[0].x < 0) {
//     snake[0].x = canvas.step;
//   } else if (snake[0].y > canvas.step) {
//     snake[0].y = 0;
//   } else if (snake[0].y < 0) {
//     snake[0].y = canvas.step;
//   } else if (snake[0].x > canvas.step) {
//     snake[0].x = 0;
//   }
// }
