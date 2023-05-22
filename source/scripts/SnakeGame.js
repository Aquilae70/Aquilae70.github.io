/*
1. data structure about the snake
2. methods in snake: run, eat, keyboard control, end
3. random product food
4. background
*/
const DirectKey = {UP: 'w', DOWN: 's', LEFT: 'a', RIGHT: 'd'};
const DirectMap = {
  [DirectKey.UP]: {y: -1, x: 0},
  [DirectKey.DOWN]: {y: 1, x: 0},
  [DirectKey.LEFT]: {y: 0, x: -1},
  [DirectKey.RIGHT]: {y: 0, x: 1},
};
const GridFormat = (x, y) => `${x}+${y}`;
const Square = 20;
const WrapRange = {width: 760, height: 460};
class Snake {
  constructor() {
    this.head = {x: 340, y: 140, before: null};
    this.end = {x: 320, y: 140, before: this.head};
  }
  MoveOn({x, y}) {
    this.head.before = {x: this.head.x + x * Square, y: this.head.y + y * Square, before: null};
    this.end = this.end.before;
    this.head = this.head.before;
  }
  AddToEnd({x, y}) {
    this.end = {x: this.end.x - x * Square, y: this.end.y - y * Square, before: this.end};
  }
}
class Grid {
  constructor() {
    this.AddBlank = ({x, y}) => this.blanks.add(GridFormat(x, y));
    this.DeleteBlank = ({x, y}) => this.blanks.delete(GridFormat(x, y));
    this.IsBlank = ({x, y}) => this.blanks.has(GridFormat(x, y));
    this.food = {x: 440, y: 140};
    this.blanks = new Set();
    for (let x = 0; x < WrapRange.width; x += Square)
      for (let y = 0; y < WrapRange.height; y += Square) this.blanks.add(GridFormat(x, y));
  }
  setFood() {
    const res = Array.from(this.blanks)[Math.floor(Math.random() * this.blanks.size)].split('+');
    this.food = {x: parseInt(res[0]), y: parseInt(res[1])};
  }
}
class SnakeGame {
  constructor() {
    this.snake = new Snake();
    this.grid = new Grid();
    this.direction = DirectKey.RIGHT;
    this.bumpSelf = false;
  }
  get isFood() {
    return this.snake.head.x === this.grid.food.x && this.snake.head.y === this.grid.food.y;
  }
  Init() {
    this.grid.DeleteBlank(this.snake.head);
    this.grid.DeleteBlank(this.grid.food);
  }
  Move() {
    this.grid.AddBlank(this.snake.end);
    this.snake.MoveOn(DirectMap[this.direction]);
    this.bumpSelf = !this.grid.IsBlank(this.snake.head) && !this.isFood;
    this.grid.DeleteBlank(this.snake.head);
  }
  Eat() {
    this.snake.AddToEnd(DirectMap[this.direction]);
    this.grid.DeleteBlank(this.snake.end);
  }
  Food() {
    this.grid.setFood();
    this.grid.DeleteBlank(this.grid.food);
  }
  Valid() {
    const {x, y} = this.snake.head;
    const outEdge = y <= -Square || y >= WrapRange.height + Square || x <= -Square || x >= WrapRange.width + Square;
    return !outEdge && !this.bumpSelf;
  }
}
const ValidateDirection = (direct, curDirect) => {
  if (!DirectMap[direct]) return false;
  if (direct === DirectKey.UP && curDirect === DirectKey.DOWN) return false;
  if (direct === DirectKey.DOWN && curDirect === DirectKey.UP) return false;
  if (direct === DirectKey.LEFT && curDirect === DirectKey.RIGHT) return false;
  if (direct === DirectKey.RIGHT && curDirect === DirectKey.LEFT) return false;
  return true;
};
let Game = null;
const Wrap = document.getElementById('wrap').getContext('2d');
const DrawRect = (x, y, color) => {
  Wrap.fillStyle = color;
  Wrap.fillRect(x, y, Square, Square);
};
const Eat = () => {
  Game.Eat();
  DrawRect(Game.snake.end.x, Game.snake.end.y, '#eda563');
  Game.Food();
  DrawRect(Game.grid.food.x, Game.grid.food.y, '#63beed');
};
const Move = () => {
  DrawRect(Game.snake.end.x, Game.snake.end.y, '#202020');
  DrawRect(Game.snake.head.x, Game.snake.head.y, '#eda563');
  Game.Move();
  DrawRect(Game.snake.head.x, Game.snake.head.y, '#f44336');
  if (Game.isFood) Eat();
  if (Game.Valid()) setTimeout(() => Move(), 50);
  else document.getElementById('cover').style.display = 'block';
};
const Init = () => {
  Wrap.clearRect(0, 0, WrapRange.width, WrapRange.height);
  Game = new SnakeGame();
  DrawRect(Game.snake.head.x, Game.snake.head.y, '#eda563');
  DrawRect(Game.grid.food.x, Game.grid.food.y, '#63beed');
  Game.Init();
  document.getElementById('cover').style.display = 'none';
  Move();
};
window.addEventListener('keydown', (event) => {

  if (event.key.toLocaleLowerCase() === 'enter' && (!Game || !Game.Valid())) Init();
  Game && ValidateDirection(event.key, Game.direction) && (Game.direction = event.key.toLocaleLowerCase());
});
//# sourceMappingURL=SnakeGame.js.map
