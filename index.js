// Button vars
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

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

// Timer functionality
function count() {
  time.milli++; // Increase milliseconds by 1;

  if (time.milli < 100) { // If milli is less than 100, then
    
    if (time.milli < 10) { // check if milli is less than ten,
      milli.innerHTML = `0${time.milli}`; // in which case append the 0,
    } else { // but otherwise just pass the milli to the html;
      milli.innerHTML = time.milli;
    }

  } else if (time.milli === 100) { // If milli is 100, then
    time.milli = 0; // reset milli to 0
    milli.innerHTML = "00"; // and the html;

    time.seconds++; // Increase seconds by 1;

    if (time.seconds < 60) { // If seconds is less than 60

      if (time.seconds < 10) { // check if milli is less than 10,
        seconds.innerHTML = `0${time.seconds}`; // in which case append the 0,
      } else { // but otherwise just pass the seconds to the html;
        seconds.innerHTML = time.seconds;
      }

    } else if (time.seconds === 60) { // If seconds is 60, then

      time.seconds = 0; // reset seconds to 0
      seconds.innerHTML = "00"; // and the html;

      time.minutes++; // Increase minutes by 1;

      if (time.minutes < 10) { // Check if minutes is less than 10,
        minutes.innerHTML = `0${time.minutes}`; // in which case append the 0,
      } else { // but otherwise just pass the minutes to the html;
        minutes.innerHTML = time.minutes;
      }

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

// Add event listeners to buttons to call the functions above
startBtn.addEventListener("click", startWatch);
stopBtn.addEventListener("click", stopWatch);
resetBtn.addEventListener("click", resetWatch);
