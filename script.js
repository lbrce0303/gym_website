const bookingButtons = document.querySelectorAll("[data-booking]");
const bookingModal = document.getElementById("bookingModal");
const bookingForm = document.getElementById("bookingForm");
const bookingTitle = document.getElementById("bookingTitle");
const closeBooking = document.getElementById("closeBooking");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const dateInput = document.getElementById("date");

let selectedPlan = "";

const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.id = "email";
emailInput.placeholder = "Email address";
bookingForm.insertBefore(emailInput, dateInput);

const style = document.createElement("style");
style.textContent = `
  .input-error {
    border: 2px solid #ff7b7b;
    outline: none;
  }

  .error-text {
    color: #ff9a9a;
    font-size: 0.85rem;
    margin: 6px 0 10px;
  }
`;
document.head.appendChild(style);

function createError(input) {
  const error = document.createElement("p");
  error.className = "error-text";
  error.hidden = true;
  input.insertAdjacentElement("afterend", error);
  return error;
}

const errors = {
  name: createError(nameInput),
  phone: createError(phoneInput),
  email: createError(emailInput),
  date: createError(dateInput)
};

function showError(input, box, message) {
  input.classList.add("input-error");
  box.textContent = message;
  box.hidden = false;
}

function hideError(input, box) {
  input.classList.remove("input-error");
  box.textContent = "";
  box.hidden = true;
}

function clearErrors() {
  hideError(nameInput, errors.name);
  hideError(phoneInput, errors.phone);
  hideError(emailInput, errors.email);
  hideError(dateInput, errors.date);
}

function validateName() {
  const value = nameInput.value.trim();

  if (value === "") {
    showError(nameInput, errors.name, "Please enter your name.");
    return false;
  }

  if (value.length < 3) {
    showError(nameInput, errors.name, "Name must be at least 3 characters.");
    return false;
  }

  if (!/^[A-Za-z ]+$/.test(value)) {
    showError(nameInput, errors.name, "Name can contain only letters and spaces.");
    return false;
  }

  hideError(nameInput, errors.name);
  return true;
}

function validatePhone() {
  const value = phoneInput.value.replace(/\D/g, "");

  phoneInput.value = value;

  if (value === "") {
    showError(phoneInput, errors.phone, "Please enter your phone number.");
    return false;
  }

  if (value.length !== 10) {
    showError(phoneInput, errors.phone, "Phone number must be exactly 10 digits.");
    return false;
  }

  if (!/^[6-9]\d{9}$/.test(value)) {
    showError(phoneInput, errors.phone, "Enter a valid 10-digit mobile number.");
    return false;
  }

  if (/^(\d)\1{9}$/.test(value)) {
    showError(phoneInput, errors.phone, "Phone number cannot be all the same digit.");
    return false;
  }-

  hideError(phoneInput, errors.phone);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();

  if (value === "") {
    showError(emailInput, errors.email, "Please enter your email.");
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    showError(emailInput, errors.email, "Please enter a valid email address.");
    return false;
  }

  hideError(emailInput, errors.email);
  return true;
}

function validateDate() {
  const value = dateInput.value;

  if (value === "") {
    showError(dateInput, errors.date, "Please choose a booking date.");
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(value + "T00:00:00");

  if (selectedDate <= today) {
    showError(dateInput, errors.date, "Booking date must be in the future.");
    return false;
  }

  hideError(dateInput, errors.date);
  return true;
}

function openModal(planName) {
  selectedPlan = planName;
  bookingTitle.textContent = planName + " Booking";
  clearErrors();
  bookingForm.reset();
  bookingModal.classList.add("show");
}

function closeModal() {
  bookingModal.classList.remove("show");
}

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
dateInput.min = tomorrow.toISOString().split("T")[0];

bookingButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    openModal(button.dataset.booking);
  });
});

nameInput.addEventListener("input", validateName);
phoneInput.addEventListener("input", validatePhone);
emailInput.addEventListener("input", validateEmail);
dateInput.addEventListener("change", validateDate);

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const validName = validateName();
  const validPhone = validatePhone();
  const validEmail = validateEmail();
  const validDate = validateDate();

  if (!selectedPlan) {
    alert("Please choose a plan first.");
    return;
  }

  if (!validName || !validPhone || !validEmail || !validDate) {
    return;
  }

  alert("Booking confirmed for " + selectedPlan + ". We will contact you soon.");
  bookingForm.reset();
  clearErrors();
  closeModal();
});

closeBooking.addEventListener("click", closeModal);

bookingModal.addEventListener("click", function (event) {
  if (event.target === bookingModal) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});
