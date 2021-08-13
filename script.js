const name = document.querySelector('#name');
const email = document.querySelector('#email');
const date = document.querySelector('#date');
const phone = document.querySelector('#phone');
const warnings = document.querySelectorAll('.warning');
const submitData = document.querySelectorAll('#submit-data');

function init() {
  name.value = '';
  email.value = '';
  date.value = 'dd/mm/yyyy';
  phone.value = '';

  warnings.forEach((x) => x.classList.add('hide'));
}

// ------------------------- EMAIL VALIDATION
function validateEmail() {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email.value)) {
    email.classList.add('warning');
    warnings[1].classList.remove('hide');
  } else {
    email.classList.remove('warning');
    warnings[1].classList.add('hide');
  }
}

// ------------------------- SUBMIT FORM
function submitForm() {
  alert('form submitted!');
}

window.addEventListener('load', init);
email.addEventListener('input', validateEmail);
submitData.addEventListener('click', submitForm);
