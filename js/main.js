const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load the audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "sfx/dead.mp3";
eat.src = "sfx/eat.mp3";
up.src = "sfx/up.mp3";
left.src = "sfx/left.mp3";
right.src = "sfx/right.mp3";
down.src = "sfx/down.mp3";

// create the snake
let snake = [];
snake[0] = {
  x : 9 * box,
  y : 10 * box
}

// create the food
let food = {
  x : Math.floor(Math.random()*17+1) * box,
  y : Math.floor(Math.random()*15+3) * box,
}

// create the score
let score = 0;

// control the snake
let d;

document.addEventListener("keydown", direction);

function direction(event){
  let key = event.keyCode;
  if(key == 37 || key == 65 && d != "right"){
    left.play();
    d = "left";
  }else if(key == 38 || key == 87 && d != "down"){
    down.play();
    d = "up";
  }else if(key == 39 || key == 68 && d != "left"){
    right.play();
    d = "right";
  }else if(key == 40 || key == 83 && d != "up"){
    down.play();
    d = "down";
  }
}

// check collision function
function collision(head, array){
  for(let i = 0; i < array.length; i++){
    if(head.x == array[i].x && head.y == array[i].y){
      return true;
    }
  }
  return false;
}

// draw everything to the canvas
function draw(){
  ctx.drawImage(ground,0,0);

  for(let i = 0; i < snake.length; i++){
    ctx.fillStyle = (i == 0)? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.drawImage(foodImg, food.x, food.y);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if(d == "left") snakeX -= box;
  if(d == "up") snakeY -= box;
  if(d == "right") snakeX += box;
  if(d == "down") snakeY += box;

  // if the snake eats the food
  if(snakeX == food.x && snakeY == food.y){
    score++;
    eat.play();
    food = {
      x : Math.floor(Math.random()*17+1) * box,
      y : Math.floor(Math.random()*15+3) * box,
    }
    // we do not remove the tail
  }else{
    // remove the tail
    snake.pop();
  }

  // add new head
  let newHead = {
    x : snakeX,
    y : snakeY
  }

  // game over
  if(snakeX < 0 || snakeX > 18*box || snakeY < 2*box || snakeY > 18*box || collision(newHead, snake)){
    clearInterval(game);
    dead.play();
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Verdana";
  ctx.fillText(score, 2*box, 1.5*box);
  ctx.strokeStyle = "red";
  ctx.strokeRect(0, 0, 19*box, 2*box);
}

// call draw function every 100 ms
let game = setInterval(draw, 100);




























// END
