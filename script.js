// Your web app's Firebase configuration

var firebaseConfig = {
  apiKey: 'AIzaSyAZuVZQeW8n06BlcVv20PKVLuY_IURz2-c',
  authDomain: 'form-data-2.firebaseapp.com',
  databaseURL:
    'https://form-data-2-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'form-data-2',
  storageBucket: 'form-data-2.appspot.com',
  messagingSenderId: '453118195250',
  appId: '1:453118195250:web:1ab98d85329e998455ee2b',
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

// ----------------- reference contactInfo collections
let contactInfo = firebase.database().ref('user-data');

// ----------------- retrieving info from the form
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const date = document.querySelector('#date');
const phone = document.querySelector('#phone');
const radioBtn = document.querySelectorAll('input[name="contact-option"]');
const warnings = document.querySelectorAll('.warning');
const warningsSubmit = document.querySelectorAll('.warningSubmit');
const submitData = document.querySelector('#submit-data');
const resetBtn = document.querySelector('#reset');
const submitMsg = document.querySelector('#submit-msg');
const modal = document.querySelector('#modal');

// this variable is going to ensure all fields have valid inputs before we submit the form
let validationFlag = true;

function init() {
  name.value = '';
  email.value = '';
  date.value = 'dd/mm/yyyy';
  phone.value = '';
  radioBtn.forEach((rBtn) => (rBtn.checked = false));

  name.classList.remove('highlight');
  email.classList.remove('highlight');
  date.classList.remove('highlight');
  phone.classList.remove('highlight');

  warnings.forEach((x) => x.classList.add('hide'));
  warningsSubmit.forEach((y) => y.classList.add('hide'));

  validationFlag = true;
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
  // const rePhone = /^((\(\+44\))|0)[0-9]{10}/;
  const rePhone =
    /^(\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)(44)\)?[\s-]?)?\(?0?(?:\)[\s-]?)?([1-9]\d{1,4}\)?[\d\s-]+)((?:x|ext\.?|\#)\d{3,4})?$/;

  if (!rePhone.test(phone.value)) {
    phone.classList.add('highlight');
    warnings[3].classList.remove('hide');
  } else {
    phone.classList.remove('highlight');
    warnings[3].classList.add('hide');
  }
}

// ------------------------- VALIDATE COMPLETE FORM
function allFieldsValid() {
  validationFlag = true;
  warnings.forEach((warning) => {
    if (!warning.classList.contains('hide')) validationFlag = false;
  });
  // if (radioBtn[0].checked === false && radioBtn[1].checked === false)
  //   validationFlag = false;

  return validationFlag;
}

// ------------------------- SUBMIT FORM
function submitForm(e) {
  e.preventDefault();

  // checking if all fields contain valid inputs
  allFieldsValid();

  if (
    name.value === '' ||
    email.value === '' ||
    date.value === 'dd/mm/yyyy' ||
    phone.value === '' ||
    (radioBtn[0].checked === false && radioBtn[1].checked === false)
  ) {
    warningsSubmit[0].classList.remove('hide');
  } else if (!validationFlag) {
    warningsSubmit[1].classList.remove('hide');
  } else {
    warningsSubmit.forEach((x) => x.classList.add('hide'));

    // check radio options
    let contactType = '';
    if (radioBtn[0].checked) contactType = 'email';
    else contactType = 'telephone';

    // saving to firebase
    saveToDatabase(
      name.value,
      email.value,
      date.value,
      phone.value,
      contactType
    );

    modal.style.display = 'block';
    // submitMsg.classList.remove('hide');
    init();
  }
}

function saveToDatabase(name, email, date, phone, contact) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    date: date,
    phone: phone,
    contactType: contact,
  });
}

// close modal
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = none;
  }
};

window.addEventListener('load', init);
name.addEventListener('input', validateName);
email.addEventListener('input', validateEmail);
phone.addEventListener('input', validatePhone);
submitData.addEventListener('click', submitForm);
resetBtn.addEventListener('click', init);
