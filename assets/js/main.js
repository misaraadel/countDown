const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 12;
const ALERT_THRESHOLD = 7;
const timeOut_THRESHOLD = 1;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "purple",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "blue",
    threshold: ALERT_THRESHOLD
  },
  timeOut:{
    color: "red",
    threshold: timeOut_THRESHOLD
  }
};

const IdName = ['app' , 'user'];

const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let i = 0;

for(i=0 ; i<= IdName.length ; i++){
  document.getElementById(IdName[i]).innerHTML = `<div class="count-box base-timer green" id="baseColor">
  <div class="icon">
    <img src="assets/images/icon.svg" alt="">
  </div>
    <svg class="base-timer__svg" viewBox="0 0 100 100" width="150" height="150" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          class="base-timer__path-remaining ${remainingPathColor}"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label count">${formatTime(
      timeLeft
    )}</span>

  <h4 class="name">
      eman
  </h4>
  </div>
  `;

    startTimer();

  function onTimesUp() {
    clearInterval(timerInterval);
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
      );
      setCircleDasharray();
      setRemainingPathColor(timeLeft);

      if (timeLeft === 0) {
        onTimesUp();
      }
    }, 1000);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info , timeOut } = COLOR_CODES;
    if (timeLeft <= timeOut.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(alert.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(timeOut.color);

      document
        .getElementById("baseColor")
        .classList.remove(alert.color);
      document
        .getElementById("baseColor")
        .classList.add(timeOut.color);
      document.getElementById("base-timer-label").innerHTML = "overtime";
    }else if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);

      document
          .getElementById("baseColor")
          .classList.remove(warning.color);
      document

        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);

      document
        .getElementById("baseColor")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);

      document
        .getElementById("baseColor")
        .classList.remove(info.color);
      document
        .getElementById("baseColor")
        .classList.add(warning.color);
    }
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }

}


