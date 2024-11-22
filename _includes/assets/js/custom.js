document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".appoinment-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission
      // Custom redirect logic
      fetch("/", {
        method: "POST",
        body: new FormData(form),
      })
        .then(() => {
          window.location.href = "/thank-you/";
        })
        .catch((error) => console.error("Form submission error:", error));
    });
  }
});
