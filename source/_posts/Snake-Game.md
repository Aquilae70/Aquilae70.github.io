---
title: Snake Game
tags:
  - Gaming
  - HTML5 Canvas
  - TypeScript
  - Object-oriented Programming (OOP)
categories:
  - Code Implementation
lang: en
comments: false
mathjax: false
date: 2023-05-18 13:22:03
excerpt: Click "Read More" and Play !
---

<!-- markdownlint-disable MD033 -->

## play

<style>
  #cover {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    position: absolute;
    width: 450px;
    height: 250px;
    background-color: rgb(10 24 84 / 34%);
    z-index: 10;
    padding-left: 50px;
    padding-top: 50px;
    margin: 0 auto;
  }
  .kt-keyboard-key {
    width: 30px;
    height: 30px;
    cursor: pointer;
    background-color: rgb(10 24 84 / 0%);
    color: #000000;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    display: inline-block;
    margin: 0;
  }
  .kt-red-key {
    background-color: #ffb095;
  }
  .kt-keyboard-container {
    display: flex;
  }
  #small-width {
    display: none;
  }
  @media (max-width: 500px) {
    #cover {
      display: none;
    }
    #wrap {
      display: none;
    }
    #small-width {
      display: block;
    }
  }
</style>
<div id="cover">
  <div style="color: white">
    Press keyboard
    <div style="padding: 0 20px; display: inline-block">
      <div class="kt-keyboard-container">
        <p class="kt-keyboard-key"></p>
        <p class="kt-keyboard-key kt-red-key">W</p>
        <p class="kt-keyboard-key"></p>
      </div>
      <div class="kt-keyboard-container">
        <p class="kt-keyboard-key kt-red-key">A</p>
        <p class="kt-keyboard-key kt-red-key">S</p>
        <p class="kt-keyboard-key kt-red-key">D</p>
      </div>
    </div>
    control direction
  </div>
  <div style="color: white; margin-top: 50px">
    Press enter
    <p class="kt-keyboard-key kt-red-key">↩︎</p>
    start game
  </div>
</div>
<div id="small-width">
Sorry, the game doesn't support small-width screens. :(
</div>
<canvas id="wrap" width="500" height="300" style="background: #202020"></canvas>
<script type="module" src="/scripts/SnakeGame.js"></script>

## Code Implementation

### Modal

#### Snake class

```ts
class Snake {
  head: SnakeNode;
  end: SnakeNode;
  constructor() {
    this.head = {x: 340, y: 140, before: null};
    this.end = {x: 320, y: 140, before: this.head};
  }
  MoveOn({x, y}: {x: DirectType; y: DirectType}) {
    this.head.before = {x: this.head.x + x * Square, y: this.head.y + y * Square, before: null};
    this.end = this.end.before!;
    this.head = this.head.before;
  }
  AddToEnd({x, y}: {x: DirectType; y: DirectType}) {
    this.end = {x: this.end.x - x * Square, y: this.end.y - y * Square, before: this.end};
  }
}
```

#### Grid class

```ts
class Grid {
  blanks: Set<string>;
  food: {x: number; y: number};
  constructor() {
    this.food = {x: 440, y: 140};
    this.blanks = new Set<string>();
    for (let x = 0; x < WrapRange.width; x += Square)
      for (let y = 0; y < WrapRange.height; y += Square) this.blanks.add(GridFormat(x, y));
  }
  AddBlank = ({x, y}: {x: number; y: number}) => this.blanks.add(GridFormat(x, y));
  DeleteBlank = ({x, y}: {x: number; y: number}) => this.blanks.delete(GridFormat(x, y));
  IsBlank = ({x, y}: {x: number; y: number}) => this.blanks.has(GridFormat(x, y));
  setFood() {
    const res = Array.from(this.blanks)[Math.floor(Math.random() * this.blanks.size)].split('+');
    this.food = {x: parseInt(res[0]), y: parseInt(res[1])};
  }
}
```

### Controller

```ts
class SnakeGame {
  snake: Snake;
  grid: Grid;
  direction: valueof<typeof DirectKey>;
  bumpSelf: boolean;
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
```

### View

```ts
let Game: null | SnakeGame = null;
const Wrap = (document.getElementById('wrap') as HTMLCanvasElement).getContext('2d')!;
const DrawRect = (x: number, y: number, color: string) => {
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
  if (event.key === 'Enter' && (!Game || !Game.Valid())) Init();

  Game && ValidateDirection(event.key, Game.direction) && (Game.direction = event.key);
});
```

### Others

#### Types

```ts
interface SnakeNode {
  x: number;
  y: number;
  before: SnakeNode | null;
}
type DirectType = 0 | 1 | -1;
type valueof<T> = T[keyof T];
const DirectKey = {UP: 'w', DOWN: 's', LEFT: 'a', RIGHT: 'd'};
const DirectMap: {[key: valueof<typeof DirectKey>]: {x: DirectType; y: DirectType}} = {
  [DirectKey.UP]: {y: -1, x: 0},
  [DirectKey.DOWN]: {y: 1, x: 0},
  [DirectKey.LEFT]: {y: 0, x: -1},
  [DirectKey.RIGHT]: {y: 0, x: 1},
};
```

#### Definition & Validation

```ts
const GridFormat = (x: number, y: number) => `${x}+${y}`;
const Square = 20;
const WrapRange = {width: 500, height: 300};

const ValidateDirection = (direct: valueof<typeof DirectKey>, curDirect: valueof<typeof DirectKey>) => {
  if (!DirectMap[direct]) return false;
  if (direct === DirectKey.UP && curDirect === DirectKey.DOWN) return false;
  if (direct === DirectKey.DOWN && curDirect === DirectKey.UP) return false;
  if (direct === DirectKey.LEFT && curDirect === DirectKey.RIGHT) return false;
  if (direct === DirectKey.RIGHT && curDirect === DirectKey.LEFT) return false;
  return true;
};
```
