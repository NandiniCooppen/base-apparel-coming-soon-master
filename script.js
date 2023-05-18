// Getting DOM elements
const container = document.getElementById('new-content'),
      emailContainer = document.getElementById('email-content'),
      form = document.querySelector('form'),
      emailInput = document.querySelector('input[type="email"]'),
      errorMsg = document.querySelector('small'),
      errorIcon = document.createElement('span'),
      subscribeButton = document.querySelector('button');

// Add error icon class
errorIcon.classList.add('error-icon');

// Initial state for error message
let errorMessageDisplayed = false;

// Handle email input event
emailInput.addEventListener('input', () => {
  const email = emailInput.value;
  if (email.length >= 3) {
    if (isValidEmail(email)) {
      handleValidEmail();
    } else {
      handleInvalidEmail();
    }
  }
});

// Handle form submission
form.addEventListener('submit', event => {
  event.preventDefault();
  const email = emailInput.value;
  if (isValidEmail(email)) {
    showSubscriptionSuccess();
  }
});

// Handle valid email input
const handleValidEmail = () => {
  emailInput.classList.remove('invalid');
  emailInput.classList.add('valid');
  errorMsg.style.visibility = 'hidden';
  errorIcon.style.visibility = 'hidden';
  subscribeButton.disabled = false;

  if (errorMessageDisplayed) {
    errorMsg.classList.remove('animate__fadeInDown', 'animate__repeat-1');
    errorMessageDisplayed = false;
  }
};

// Handle invalid email input
const handleInvalidEmail = () => {
  emailInput.classList.remove('valid');
  emailInput.classList.add('invalid');
  errorMsg.classList.add('animate__animated', 'animate__fadeInDown', 'animate__delay-1s');
  subscribeButton.disabled = true;

  if (!errorMessageDisplayed) {
    errorMsg.innerHTML = 'Please enter a valid email address.';
    subscribeButton.parentNode.insertBefore(errorIcon, subscribeButton);
    errorMessageDisplayed = true;
  }

  errorMsg.style.visibility = 'visible';
  errorIcon.style.visibility = 'visible';
  errorMsg.classList.add('animate__fadeInDown', 'animate__repeat-1');
};

// Validate email format
const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Show subscription success message
const showSubscriptionSuccess = () => {
  container.innerHTML = '<h1 class="subscribe-ok">Thank you for subscribing!</h1>';
};