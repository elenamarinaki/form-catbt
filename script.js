const name = document.querySelector('#name');
const email = document.querySelector('#email');
const date = document.querySelector('#date');
const phone = document.querySelector('#phone');
const warnings = document.querySelectorAll('.warning');
const submitData = document.querySelector('#submit-data');

function init() {
  name.value = '';
  email.value = '';
  date.value = 'dd/mm/yyyy';
  phone.value = '';

  warnings.forEach((x) => x.classList.add('hide'));
}

// ------------------------- NAME VALIDATION
function validateName() {
  if (name.value.length > 30) {
    name.classList.add('highlight');
    warnings[0].classList.remove('hide');
  } else {
    name.classList.remove('highlight');
    warnings[0].classList.add('hide');
  }
}

// ------------------------- EMAIL VALIDATION
function validateEmail() {
  const reEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!reEmail.test(email.value)) {
    email.classList.add('highlight');
    warnings[1].classList.remove('hide');
  } else {
    email.classList.remove('highlight');
    warnings[1].classList.add('hide');
  }
}

function validatePhone() {
  const rePhone = /^((\(\+44\))|0)[0-9]{10}/;

  if (!rePhone.test(phone.value)) {
    phone.classList.add('highlight');
    warnings[3].classList.remove('hide');
  } else {
    phone.classList.remove('highlight');
    warnings[3].classList.add('hide');
  }
}

// ------------------------- SUBMIT FORM
function submitForm() {
  if (
    name.value === '' ||
    email.value === '' ||
    date.value === 'dd/mm/yyyy' ||
    phone.value === ''
  ) {
    warnings[4].classList.remove('hide');
  } else {
    warnings[4].classList.add('hide');
  }
}

window.addEventListener('load', init);
name.addEventListener('input', validateName);
email.addEventListener('input', validateEmail);
phone.addEventListener('input', validatePhone);
submitData.addEventListener('click', submitForm);
