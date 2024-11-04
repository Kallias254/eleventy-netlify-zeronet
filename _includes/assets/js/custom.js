function scrollProcess(direction) {
  const carousel = document.querySelector(".process-carousel");
  const scrollAmount = carousel.offsetWidth / 3; // Adjust to scroll by one item width
  if (direction === "left") {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else if (direction === "right") {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}
