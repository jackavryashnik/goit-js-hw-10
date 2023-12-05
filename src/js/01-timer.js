import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'https://cdn.jsdelivr.net/npm/izitoast@1/+esm';

const dateInput = document.querySelector('#datetime-picker');
const dateBtn = document.querySelector('button[data-start]');
const values = document.querySelectorAll('.value');
let userSelectedDate;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    isDateValid(this.defaultDate);
    userSelectedDate = new Date(selectedDates);
  },
};

flatpickr(dateInput, options);
dateBtn.setAttribute('disabled', '');
dateBtn.addEventListener('click', () => {
  handleTimerUpdate();
  intervalId = setInterval(handleTimerUpdate, 1000);
});

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

function isDateValid(currentDate) {
  if (userSelectedDate <= currentDate) {
    dateBtn.setAttribute('disabled', '');
    iziToast.error({
      timeout: 5000,
      position: 'topRight',
      title: 'Error',
      message: 'Please choose a date in the future',
    });
  } else {
    dateBtn.removeAttribute('disabled');
  }
}

function handleTimerUpdate() {
  const timeObj = convertMs(userSelectedDate - Date.now());
  const objKeys = Object.keys(timeObj);
  
  if (userSelectedDate - Date.now() <= 0) {
    values.forEach(value => (value.innerHTML = '00'));
    clearInterval(intervalId);
    return;
  }

  for (let i = 0; i < objKeys.length; i++) {
    values[i].innerHTML = addLeadingZero(String(timeObj[objKeys[i]]));
  }
  if (userSelectedDate <= Date.now()) {
    clearInterval(intervalId);
  }
}
