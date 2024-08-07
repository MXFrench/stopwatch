// Button vars
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

// Timer element vars
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milli = document.getElementById("milli");

// Time var
let time = {
  milli: 0,
  seconds: 0,
  minutes: 0
};

// Interval var
let timeIntervalId;

// Function for adding an extra zero if number is single digit
function addZero(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return `${num}`;
  }
}

// Timer functionality
function count() {
  time.milli++; // Increase milliseconds by 1;

  if (time.milli < 100) { // If milli is less than 100, then
    
    milli.innerHTML = addZero(time.milli);

  } else if (time.milli === 100) { // If milli is 100, then
    time.milli = 0; // reset milli to 0
    milli.innerHTML = "00"; // and the html;

    time.seconds++; // Increase seconds by 1;

    if (time.seconds < 60) { // If seconds is less than 60

      seconds.innerHTML = addZero(time.seconds);

    } else if (time.seconds === 60) { // If seconds is 60, then

      time.seconds = 0; // reset seconds to 0
      seconds.innerHTML = "00"; // and the html;

      time.minutes++; // Increase minutes by 1;

      minutes.innerHTML = addZero(time.minutes);

    }

  }
}

// Starts the watch
function startWatch() {
  if (!timeIntervalId) {
    timeIntervalId = setInterval(count, 10);
  }
}

// Stops the watch
function stopWatch() {
  clearInterval(timeIntervalId);
  timeIntervalId = null;
}

// Resets the watch
function resetWatch() {
  time = {
    milli: 0,
    seconds: 0,
    minutes: 0
  };
  milli.innerHTML = "00";
  seconds.innerHTML = "00";
  minutes.innerHTML = "00";
}

// Find the difference in times
function diffInTimes(lastTime, thisTime) {
  // console.log("Last time is " + lastTime);
  // console.log("This time is " + thisTime);
  // Find a way to subtract the times and return the difference;
  const lastTimeMilli = lastTime.slice(-2);

  const lastTimeB = {
    mil: parseInt(lastTime.slice(-2)),
    sec: parseInt(lastTime.slice(-5, -3)),
    min: parseInt(lastTime.slice(-8, -6)),
  }
  const thisTimeB = {
    mil: parseInt(thisTime.slice(-2)),
    sec: parseInt(thisTime.slice(-5, -3)),
    min: parseInt(thisTime.slice(-8, -6)),
  }

  const newTimeB = {
    mil: 0,
    sec: 0,
    min: 0
  }

  let milTime = thisTimeB.mil - lastTimeB.mil;
  if (milTime >= 0) {
    newTimeB.mil = milTime;
  } else {
    thisTimeB.sec--;
    let milTime2 = thisTimeB.mil*60;
    console.log("take note");
    console.log(milTime2 - lastTimeB.mil);
  }

}

let lastLapTime = "00:00:00";

// Lap the watch
function lapWatch() {
  const lapsElement = document.querySelector(".laps");
  if (lapsElement.classList.contains("hidden")) {
    lapsElement.classList.remove("hidden");
  }

  let lapTimeString = `${addZero(time.minutes)}:${addZero(time.seconds)}:${addZero(time.milli)}`;
  diffInTimes(lastLapTime, lapTimeString);
  lastLapTime = lapTimeString;
}

// Add event listeners to buttons to call the functions above
startBtn.addEventListener("click", startWatch);
stopBtn.addEventListener("click", stopWatch);
resetBtn.addEventListener("click", resetWatch);
lapBtn.addEventListener("click", lapWatch);