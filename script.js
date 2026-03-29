const buttons = document.querySelectorAll(".btn");

buttons.forEach(function (button) {
  if (!button.closest(".hero")) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const buttonText = button.textContent.trim();
      alert(buttonText + " button clicked!");
    });
  }
});
