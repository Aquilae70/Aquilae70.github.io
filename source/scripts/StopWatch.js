const RED = '#e25300';
const GREEN = '#0dbc00';
const YELLOW = '#b4590a';

let Running = false;
const TimeObj = {
  timeStart: 0,
  last: 0,
  pause: 0,
};

const startButton = document.querySelector('.start');
const recordButton = document.querySelector('.record');
const pauseButton = document.querySelector('.pause');

const MillisecondDom = document.querySelector('.millisecond');
const SecondDom = document.querySelector('.second');
const MinuteDom = document.querySelector('.minute');
const recordDom = document.getElementById('records');

const FormatTimeString = (time) => (time > 9 ? time : `0${time}`);
const FormatMilliseconds = (milliseconds) => parseInt(milliseconds / 10);
const FormatTime = (date) => ({
  m: FormatTimeString(date.getMinutes()),
  s: FormatTimeString(date.getSeconds()),
  mill: FormatTimeString(FormatMilliseconds(date.getMilliseconds())),
});

const RenderTime = (date) => {
  const {m, s, mill} = FormatTime(date);
  MillisecondDom.innerText = mill;
  MinuteDom.innerText = m;
  SecondDom.innerText = s;
};

const CalculateGap = (now) => {
  const gap = new Date(now - TimeObj.last);
  return {gapS: gap.getSeconds(), gapM: gap.getMinutes()};
};

//view
pauseButton.style.display = 'none';
recordButton.style.display = 'none';

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

//controller
const RunTimeInterval = () => {
  setTimeout(() => {
    const date = new Date(Date.now() - TimeObj.timeStart);
    if (Running) {
      RenderTime(date);
      RunTimeInterval();
    } else TimeObj.pause = date;
  }, 10);
};

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
