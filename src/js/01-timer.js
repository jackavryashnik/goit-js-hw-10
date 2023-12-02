import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'https://cdn.jsdelivr.net/npm/izitoast@1/+esm';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const dateInput = document.querySelector('#datetime-picker');
const dateBtn = document.querySelector('button[data-start]');
const values = document.querySelectorAll('.value');
let userSelectedDate;
let intervalId;

dateBtn.setAttribute('disabled', '');
dateBtn.addEventListener('click', () => {
  setTimer();
  intervalId = setInterval(setTimer, 1000);
});

flatpickr(dateInput, options);

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

const addLeadingZero = value => value.padStart(2, '0');

function isDateValid() {
  userSelectedDate = new Date(dateInput.value);

  if (userSelectedDate <= Date.now()) {
    dateBtn.setAttribute('disabled', '');
      iziToast.error({
        timeout: 5000,
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future'
    });
  } else {
    dateBtn.removeAttribute('disabled');
  }
}

function setTimer() {
  const timeObj = convertMs(userSelectedDate - Date.now());
  const objKeys = Object.keys(timeObj);
  for (let i = 0; i < objKeys.length; i++) {
    values[i].innerHTML = addLeadingZero(String(timeObj[objKeys[i]]));
  }
  if (userSelectedDate <= Date.now()) {
    clearInterval(intervalId);
  }
}

dateInput.addEventListener('input', isDateValid);
