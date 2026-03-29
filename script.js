const bookingButtons = document.querySelectorAll("[data-booking]");
const bookingModal = document.getElementById("bookingModal");
const bookingForm = document.getElementById("bookingForm");
const bookingTitle = document.getElementById("bookingTitle");
const closeBooking = document.getElementById("closeBooking");

bookingButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    bookingTitle.textContent = button.dataset.booking + " Booking";
    bookingModal.classList.add("show");
  });
});

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();
  alert("Your booking request has been sent!");
  bookingForm.reset();
  bookingModal.classList.remove("show");
});

closeBooking.addEventListener("click", function () {
  bookingModal.classList.remove("show");
});
