---
title: Stop Watch
categories:
  - Code Implementation
lang: en
comments: true
mathjax: false
date: 2023-08-23 15:01:14
updated: {{updated}}
---

<!-- markdownlint-disable MD033 -->

<style>
  body {
    font-family: "Arial", sans-serif;
  }

  #container {
    width: 4em;
    margin: 50px auto;
    font-size: 10rem;
  }

  #time {
    display: flex;
  }

  #buttons {
    display: flex;
    margin: 50px auto;
    justify-content: space-evenly;

    >div {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
      background-color: transparent;
      outline: 0;
      border: 0;
      margin: 0;
      cursor: pointer;
      text-decoration: none;
      font-weight: 800;
      font-size: 0.875rem;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      text-transform: uppercase;
      min-width: 64px;
      padding: 6px 16px;
      border-radius: 4px;
      transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      color: #fff;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
      width: 100px;
      background-color: rgb(7, 99, 213);
      opacity: 0.85;
    }

    >div:hover {
      opacity: 1;
    }

    .start {
      background-color: #0dbc00;
    }

    .pause {
      background-color: #b4590a;
    }

  }

  #records {
    margin: 0;
    >li {
      display: flex;
      margin: 15px;
      justify-content: space-between;
      font-weight: 400;
      font-size: 1rem;
    }
  }
</style>
<div id="container">
  <div id="time">
    <div class="minute digit">00</div>
    <div class="symbol">:</div>
    <div class="second digit">00</div>
    <div class="symbol">:</div>
    <div class="millisecond digit">00</div>
  </div>
  <div id="buttons">
    <div class="start">start</div>
    <div class="record">record</div>
    <div class="pause">pause</div>
  </div>
  <ul id="records"></ul>
</div>
</body>
<script src="/scripts/StopWatch.js"></script>

A Stop watch implementation, maybe it can help you improve your time management ability.

<!-- more -->

## Code Implementation

### Running Function

```js
const RunTimeInterval = () => {
  setTimeout(() => {
    const date = new Date(Date.now() - TimeObj.timeStart);
    if (Running) {
      RenderTime(date);
      RunTimeInterval();
    } else TimeObj.pause = date;
  }, 10);
};
```

### Controllers & EventListener

```js
startButton.addEventListener('click', () => {
  if (!Running) {
    TimeObj.timeStart = Date.now();
    TimeObj.last = 0;
    RunTimeInterval();
    Running = true;
    StartButtonToStop();
  } else {
    Running = false;
    StartButtonToRestart();
  }
});

recordButton.addEventListener('click', () => {
  const now = Date.now() - TimeObj.timeStart;
  const {gapS, gapM} = CalculateGap(now);
  TimeObj.last = now;
  AddNewRecord(now, gapS, gapM);
});

pauseButton.addEventListener('click', () => {
  if (Running) {
    Running = false;
    PauseButtonToContinue();
  } else {
    Running = true;
    pauseDiff = Date.now() - TimeObj.timeStart - TimeObj.pause;
    TimeObj.timeStart += pauseDiff;
    RunTimeInterval();
    PauseButtonToPause();
  }
});
```

### Views & DOM Manipulate

```js
const StartButtonToStop = () => {
  recordDom.innerHTML = '';
  startButton.innerHTML = 'stop';
  startButton.style.backgroundColor = RED;
  pauseButton.style.display = 'inline-flex';
  recordButton.style.display = 'inline-flex';
};

const StartButtonToRestart = () => {
  startButton.innerHTML = 'restart';
  startButton.style.backgroundColor = GREEN;
  pauseButton.style.display = 'none';
  recordButton.style.display = 'none';
};

const PauseButtonToContinue = () => {
  startButton.style.display = 'none';
  recordButton.style.display = 'none';
  pauseButton.innerText = 'Continue';
  pauseButton.style.backgroundColor = GREEN;
};

const PauseButtonToPause = () => {
  pauseButton.innerText = 'pause';
  pauseButton.style.backgroundColor = YELLOW;
  startButton.style.display = 'inline-flex';
  recordButton.style.display = 'inline-flex';
};

const AddNewRecord = (now, gapS, gapM) => {
  const recordLi = document.createElement('li');
  const {m, s, mill} = FormatTime(new Date(now));
  recordLi.innerHTML = `<div class="record-time">${m} : ${s} : ${mill}</div>
    <div class="gap" style="color: rgb(0, 30, 122);">${gapM}min ${gapS}s</div>`;
  recordDom.appendChild(recordLi);
};
```
