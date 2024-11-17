// function scrollProcess(direction) {
//   const carousel = document.querySelector(".process-carousel");
//   const scrollAmount = carousel.offsetWidth / 3; // Adjust to scroll by one item width
//   if (direction === "left") {
//     carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//   } else if (direction === "right") {
//     carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
//   }
// }

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
