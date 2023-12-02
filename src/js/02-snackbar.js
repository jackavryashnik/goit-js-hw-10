import iziToast from 'https://cdn.jsdelivr.net/npm/izitoast@1/+esm';

const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault();
  let delayInput = document.querySelector('input[name="delay"]');
  let delay = delayInput.value;
  showToast(delay);
  delayInput.value = '';
});

function createPromise(fulfilled, rejected) {
  if (fulfilled) {
    return Promise.resolve('Fulfilled');
  } else if (rejected) {
    return Promise.reject('Rejected');
  }
}

function showToast(delay) {
  const fulfilled = document.querySelector('input[value="fulfilled"]').checked;
  const rejected = document.querySelector('input[value="rejected"]').checked;

  setTimeout(() => {
    createPromise(fulfilled, rejected)
      .then(() =>
        iziToast.success({
          icon: '',
          timeout: 5000,
          position: 'topRight',
          message: `✅ Fulfilled promise in ${delay}ms`,
        })
      )
      .catch(() =>
        iziToast.error({
          icon: '',
          timeout: 5000,
          position: 'topRight',
          message: `❌ Rejected promise in ${delay}ms`,
        })
      );
  }, delay);
}
