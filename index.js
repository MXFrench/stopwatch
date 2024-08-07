// Button vars
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

// Timer element vars
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milli = document.getElementById("milli");

// Lap element vars
const lapMinutes = document.getElementById("lapMinutes");
const lapSeconds = document.getElementById("lapSeconds");
const lapMilli = document.getElementById("lapMilli");

const lapVar = document.getElementsByClassName("lap");
const lapsNode = document.querySelector(".laps");
let firstLap = true;

// Time var
let time = {
  milli: 0,
  seconds: 0,
  minutes: 0
};

// Lap time var
let lapTime = {
  milli: 0,
  seconds: 0,
  minutes: 0
}

// Interval var
let timeIntervalId;
let lapTimeIntervalId;

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

// Lap timer functionality
function countLap() {
  lapTime.milli++; // Increase milliseconds by 1;

  if (lapTime.milli < 100) { // If milli is less than 100, then
    
    lapMilli.innerHTML = addZero(lapTime.milli);

  } else if (lapTime.milli === 100) { // If milli is 100, then
    lapTime.milli = 0; // reset milli to 0
    lapMilli.innerHTML = "00"; // and the html;

    lapTime.seconds++; // Increase seconds by 1;

    if (lapTime.seconds < 60) { // If seconds is less than 60

      lapSeconds.innerHTML = addZero(lapTime.seconds);

    } else if (lapTime.seconds === 60) { // If seconds is 60, then

      lapTime.seconds = 0; // reset seconds to 0
      lapSeconds.innerHTML = "00"; // and the html;

      lapTime.minutes++; // Increase minutes by 1;

      lapMinutes.innerHTML = addZero(lapTime.minutes);

    }

  }
}

// Starts the watch
function startWatch() {
  // Start main watch
  if (!timeIntervalId) {
    timeIntervalId = setInterval(count, 10);
  }
  // Start lap watch
  if (!lapTimeIntervalId) {
    lapTimeIntervalId = setInterval(countLap, 10);
  }
}

// Stops the watch
function stopWatch() {
  // Stop the main clock
  clearInterval(timeIntervalId);
  timeIntervalId = null;
  // Stop the lap clock
  clearInterval(lapTimeIntervalId);
  lapTimeIntervalId = null;
}

// Function to delete lap items
function resetLapTable() {
  // Delete the children from the laps container, but keep the laps header and first lap row
  lapsNode.replaceChildren(lapsNode.firstElementChild, lapsNode.firstElementChild.nextElementSibling);

  // Hide laps container with the class "hidden"
  lapsNode.classList.add("hidden");

  // Reset the firstLap variable to true
  firstLap = true;
}

// Resets the lap watch
function resetLapWatch() {
  lapTime = {
    milli: 0,
    seconds: 0,
    minutes: 0
  };
  lapMilli.innerHTML = "00";
  lapSeconds.innerHTML = "00";
  lapMinutes.innerHTML = "00";
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

  // And reset the lap watch
  resetLapWatch();

  // Delete extra lap items
  resetLapTable();
}

// Lap the watch
function lapWatch() {
  // Open Laps element if not opened
  if (lapsNode.classList.contains("hidden")) {
    lapsNode.classList.remove("hidden");
  }

  // Add new lap element with lap
  const newLapTime = `${addZero(lapTime.minutes)}:${addZero(lapTime.seconds)}:${addZero(lapTime.milli)}`;
  if (firstLap) { // If it's the first lap, just replace the text in the first lap row
    lapsNode.lastElementChild.lastElementChild.innerHTML = newLapTime;
    firstLap = false;
  } else { // Otherwise, clone the last lap row, update time, and append it
    const lapNode = lapsNode.lastElementChild;
    const newLap = lapNode.cloneNode(true);
    newLap.lastElementChild.innerHTML = newLapTime;
    newLap.firstElementChild.innerHTML = `Lap ${lapVar.length}`;
    lapsNode.appendChild(newLap);  
  }

  // Reset lap time
  resetLapWatch();
}

// Add event listeners to buttons to call the functions above
startBtn.addEventListener("click", startWatch);
stopBtn.addEventListener("click", stopWatch);
resetBtn.addEventListener("click", resetWatch);
lapBtn.addEventListener("click", lapWatch);
