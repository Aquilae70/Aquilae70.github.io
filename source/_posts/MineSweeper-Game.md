---
title: MineSweeper Game
tags:
  - MineSweeper
  - Gaming
  - Vue
  - TypeScript
  - Object-oriented Programming (OOP)
categories:
  - Code Implementation
lang: en
comments: true
mathjax: false
date: 2023-05-25 15:01:06
updated: {{updated}}
---

<!-- markdownlint-disable MD033 -->

## Game Demo

<style>
  #app {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  .kt-row {
    display: flex;
    width: 450px;
  }
  .kt-item {
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    text-align: center;
    border: 2px outset #ececec;
    background: #c0c0c0;
  }
  .kt-checked {
    border: 1px solid #808080;
    border-width: 1px 0 0 1px;
  }
  .kt-sign:before {
    content: "🚩";
  }
  .kt-mine:before {
    content: "💣";
  }
  .kt-get:before {
    content: "✅";
  }
  .kt-bar {
    display: flex;
    display: flex;
    justify-content: space-between;
    padding: 2px;
    border: 2px solid #7B7B7B;
    background-color: #C0C0C0;
    margin-bottom: 5px;
    width: 300px;
    box-sizing: border-box;
    font-size: 20px;
    >p {
      display: inline-block;
      text-align: center;
      margin: 2px 5px;
      >span {
        margin-right: 10px
      }
    }
    >button {
      cursor: pointer;
      border-top: 2px solid #ffffff;
      border-right: 2px solid #7B7B7B;
      border-bottom: 2px solid #7B7B7B;
      border-left: 2px solid #ffffff;
    }
    >button:hover {
      cursor: pointer;
      background-color: #C0C0C0;

    }
  }
  .kt-content {
    width: 300px;
    margin: 0;
    font-family: 'Nosifer', cursive;
    font-size: 2rem;
    color: transparent;
    background: linear-gradient(to right, #ffef09, #ff0c0c, #ff0000);
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    position: relative;
    letter-spacing: 0.4rem;
  }
  .kt-content::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 64px;
    color: transparent;
    -webkit-text-stroke: 12px #000;
    z-index: -1;
  }
</style>
<script type="importmap">
   {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>
<div id="app">
  <div class="kt-bar">
    <p>
      <span v-html="`🚩: ${Sweeper.flag}`"></span>
      <span v-html="`💣: ${mineCount}`"></span>
    </p>
    <button class="kt-again" @click="Again">Again</button>
  </div>
  <div v-for="row in Sweeper.grid" class="kt-row">
    <div v-for="item in row" :key="item.key" @click="()=>clickItem(item)" class="kt-item"
      :class="{'kt-checked': item.checked, 'kt-get': item.checked&&item.sign&&item.isMine, 'kt-sign': item.sign, 'kt-mine': item.checked&&item.isMine}"
      @click.right="(e)=>clickRight(e,item)">
      <span v-html="item.checked && !item.sign && !item.isMine && item.count || ''"></span>
    </div>
  </div>
  <div style="text-align: center;" v-if="win">
    <p data-text="you win!!" class="kt-content">
      you win!!
    </p>
  </div>
  <p v-else><svg height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512" width="1em" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(.1 0 0 -.1 0 512)"><path d="m3870 5107c-49-23-88-60-106-100-27-60-28-316-1-365 80-147 273-146 349 3 26 49 36 222 19 306-26 124-159 203-261 156z"/><path d="m2100 4905c-432-61-822-255-1130-565-304-304-485-667-557-1110-16-103-18-181-18-770 0-712 1-735 61-972 155-620 614-1135 1210-1359 233-87 429-122 694-122 318-1 535 45 822 175 216 97 388 217 569 397 300 299 479 646 556 1076 16 90 18 172 18 805 0 634-2 715-18 805-77 430-259 785-553 1079-293 293-654 479-1074 553-123 21-449 26-580 8zm70-1370v-975h-690-690v255c0 275 11 387 54 550 151 564 618 1005 1196 1129 36 8 80 15 98 15l32 1zm1767-1552c-8-234-32-377-92-543-173-483-573-853-1069-989-247-68-552-70-806-6-432 108-815 420-1016 825-116 235-163 450-164 743v157h1577 1576z"/><path d="m4645 4901c-24-11-91-70-166-147-106-109-127-136-137-174-22-90 26-192 107-226 44-18 125-18 165 1 46 22 272 254 291 298 30 73 15 148-44 210-53 57-141 73-216 38z"/><path d="m4688 4131c-121-26-189-156-139-266 21-46 79-101 119-112 15-5 90-8 167-8 154 0 180 8 233 66 86 97 56 244-63 307-34 17-253 27-317 13z"/></g></svg>Right-click to sign flag🚩.</p>
</div>
<script type="module">
  import { createApp } from 'vue';
  import { MineSweeperComp } from '/scripts/MineSweeper.js';
  const App = createApp(MineSweeperComp).mount('#app');
</script>
<!--more-->

## Code Implementation

### Class

```ts
class MineSweeper {
  grid: MineGridType[][];
  gridSet: Set<string>;
  flag: number;
  track: Set<string>;
  constructor() {
    this.grid = [];
    this.gridSet = new Set();
    this.flag = 0;
    this.track = new Set();
    this.mounted();
  }
  mounted() {
    this.grid = [];
    this.gridSet = new Set();
    this.flag = 0;
    this.track = new Set();
    for (let x = 0; x < Square; x++)
      for (let y = 0; y < Square; y++) {
        const key = KeyFormat(x, y);
        this.grid[x] || (this.grid[x] = []);
        this.grid[x].push({isMine: false, key, checked: false, sign: false, count: 0});
        this.gridSet.add(key);
      }
  }
  InitMine(item: MineGridType) {
    this.gridSet.delete(item.key);
    for (let i = 1; i <= MineCount; i++) {
      const random = Array.from(this.gridSet)[Math.floor(Math.random() * this.gridSet.size)];
      this.gridSet.delete(random);
      const [x, y] = KeyDeFormat(random);
      this.grid[x][y].isMine = true;
      this.AddCount(x, y);
    }
  }
  Check(item: MineGridType) {
    const stack = [KeyDeFormat(item.key)];
    const check = new Set<string>(KeyDeFormat(item.key).toString());
    while (stack.length > 0) {
      RoundIndex(stack[0][0], stack[0][1]).forEach((coordinate) => {
        const [x, y] = coordinate;
        if (this.grid[x]?.[y] && !check.has(coordinate.toString())) {
          this.grid[x][y].checked = true;
          this.grid[x]?.[y].count === 0 && stack.push([x, y]);
          this.cutFlag(this.grid[x][y]);
        }
        check.add(coordinate.toString());
      });
      stack.shift();
    }
  }
  AddCount(x: number, y: number) {
    RoundIndex(x, y).forEach((coordinate) => {
      const [x1, y1] = coordinate;
      this.grid[x1]?.[y1] && this.grid[x1][y1].count++;
    });
  }
  cutFlag(item: MineGridType) {
    if (item.sign) {
      item.sign = false;
      this.flag--;
    }
  }
  clearCheck() {
    for (let x = 0; x < Square; x++)
      for (let y = 0; y < Square; y++) {
        this.grid[x][y].isMine && (this.grid[x][y].checked = true);
      }
  }
}
```

### Controller

```ts
export const MineSweeperComp = {
  data() {
    return {
      Sweeper: new MineSweeper(),
      get mineCount() {
        return MineCount;
      },
      win: false,
      init: true,
    };
  },
  methods: {
    clickItem(item: MineGridType) {
      item.checked = true;
      if (this.init) {
        this.Sweeper.InitMine(item);
        this.init = false;
      }
      if (item.count === 0) {
        this.Sweeper.Check(item);
      }
      if (item.isMine) {
        this.Sweeper.clearCheck();
      }
      this.Sweeper.cutFlag(item);
      this.CheckWin();
    },
    CheckWin() {
      let flat = [];
      for (let items of this.Sweeper.grid) flat = [...flat, ...items];
      if (flat.filter((e) => e.checked).length === Square * Square - MineCount) {
        this.win = true;
        this.Sweeper.clearCheck();
      }
    },
    clickRight(e: PointerEvent, item: MineGridType) {
      e.preventDefault();
      if (!item.checked) {
        if (item.sign) this.Sweeper.flag--;
        else this.Sweeper.flag++;
        item.sign = !item.sign;
        if (item.sign && item.isMine) this.Sweeper.track.add(item.key);
        if (!item.sign && item.isMine) this.Sweeper.track.delete(item.key);
      }
    },
    Again() {
      this.Sweeper.mounted();
      this.init = true;
      this.win = false;
    },
  },
};
```

### View (Power by Vue)

```html
  <div class="kt-bar">
    <p>
      <span v-html="`🚩: ${Sweeper.flag}`"></span>
      <span v-html="`💣: ${mineCount}`"></span>
    </p>
    <button class="kt-again" @click="Again">Again</button>
  </div>
  <div v-for="row in Sweeper.grid" class="kt-row">
    <div v-for="item in row" :key="item.key" @click="()=>clickItem(item)" class="kt-item"
      :class="{'kt-checked': item.checked, 'kt-get': item.checked&&item.sign&&item.isMine, 'kt-sign': item.sign, 'kt-mine': item.checked&&item.isMine}"
      @click.right="(e)=>clickRight(e,item)">
      <span v-html="item.checked && !item.sign && !item.isMine && item.count || ''"></span>
    </div>
  </div>
  <div style="text-align: center;" v-if="win">
    <p data-text="you win!!" class="kt-content">
      you win!!
    </p>
  </div>
  <script type="module">
    import { createApp } from 'vue';
    import { MineSweeperComp } from '/scripts/MineSweeper.js';
    const App = createApp(MineSweeperComp).mount('#app');
  </script>
```
