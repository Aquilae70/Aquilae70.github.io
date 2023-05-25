const KeyFormat = (x, y) => `${x}+${y}`;
const KeyDeFormat = (s) => s.split('+').map((e) => parseInt(e));
const MineCount = 10;
const Square = 10;
const RoundIndex = (x, y) => [
  [x - 1, y - 1],
  [x - 1, y + 1],
  [x - 1, y],
  [x, y - 1],
  [x, y + 1],
  [x + 1, y - 1],
  [x + 1, y],
  [x + 1, y + 1],
];
class MineSweeper {
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
  InitMine(item) {
    this.gridSet.delete(item.key);
    for (let i = 1; i <= MineCount; i++) {
      const random = Array.from(this.gridSet)[Math.floor(Math.random() * this.gridSet.size)];
      this.gridSet.delete(random);
      const [x, y] = KeyDeFormat(random);
      this.grid[x][y].isMine = true;
      this.AddCount(x, y);
    }
  }
  Check(item) {
    const stack = [KeyDeFormat(item.key)];
    const check = new Set(KeyDeFormat(item.key).toString());
    while (stack.length > 0) {
      RoundIndex(stack[0][0], stack[0][1]).forEach((coordinate) => {
        var _a, _b;
        const [x, y] = coordinate;
        if (((_a = this.grid[x]) === null || _a === void 0 ? void 0 : _a[y]) && !check.has(coordinate.toString())) {
          this.grid[x][y].checked = true;
          ((_b = this.grid[x]) === null || _b === void 0 ? void 0 : _b[y].count) === 0 && stack.push([x, y]);
          this.cutFlag(this.grid[x][y]);
        }
        check.add(coordinate.toString());
      });
      stack.shift();
    }
  }
  AddCount(x, y) {
    RoundIndex(x, y).forEach((coordinate) => {
      var _a;
      const [x1, y1] = coordinate;
      ((_a = this.grid[x1]) === null || _a === void 0 ? void 0 : _a[y1]) && this.grid[x1][y1].count++;
    });
  }
  cutFlag(item) {
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
    clickItem(item) {
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
      } else {
        this.CheckWin();
      }
      this.Sweeper.cutFlag(item);
    },
    CheckWin() {
      let flat = [];
      for (let items of this.Sweeper.grid) flat = [...flat, ...items];
      if (flat.filter((e) => e.checked).length === Square * Square - MineCount) {
        this.win = true;
        this.Sweeper.clearCheck();
      }
    },
    clickRight(e, item) {
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
