import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const dateTime = document.querySelector("input#datetime-picker");
const timerHtml = document.querySelector(".timer");
const startBtn = document.querySelector("button[data-start]");

const days = document.querySelector("span[data-days]");
const hours = document.querySelector("span[data-hours]");
const minutes = document.querySelector("span[data-minutes]");
const seconds = document.querySelector("span[data-seconds]");

let timer = null;

startBtn.disabled = true;
timerHtml.style.color = "black";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateTime, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
   goTimer();
  timer = setInterval(goTimer, 1000);
});

function goTimer() {
    let countdown = new Date(dateTime.value) - new Date();

    if (countdown >= 0) {
        let timeObject = convertMs(countdown);
        days.textContent = addLeadingZero(timeObject.days);
        hours.textContent = addLeadingZero(timeObject.hours);
        minutes.textContent = addLeadingZero(timeObject.minutes);
        seconds.textContent = addLeadingZero(timeObject.seconds);
    }
}