document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const cards = Array.from(document.querySelectorAll(".floating-card"));
  let currentIndex = 0;

  let startY = 0; // Starting position for drag
  let isDragging = false; // Dragging state

  // Function to update card state
  const updateCards = () => {
    cards.forEach((card) =>
      card.classList.remove("active", "previous", "next")
    );

    cards[currentIndex].classList.add("active");
    cards[(currentIndex - 1 + cards.length) % cards.length].classList.add(
      "previous"
    );
    cards[(currentIndex + 1) % cards.length].classList.add("next");
  };

  // Swipe functions
  const swipeUp = () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
  };

  const swipeDown = () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCards();
  };

  // Start dragging (touch or mouse)
  const onStart = (event) => {
    if (event.target.tagName.toLowerCase() === "img") {
      event.preventDefault();
    }

    isDragging = true;
    startY = event.touches ? event.touches[0].clientY : event.clientY;
    container.classList.add("dragging"); // add dragging animation
  };

  // End dragging
  const onEnd = (event) => {
    if (!isDragging) return;

    const endY = event.changedTouches
      ? event.changedTouches[0].clientY
      : event.clientY;
    const swipeDistance = startY - endY;

    if (swipeDistance > 10) {
      swipeUp();
    } else if (swipeDistance < -10) {
      swipeDown();
    }

    isDragging = false;
    container.classList.remove("dragging");
  };

  container.addEventListener("touchstart", onStart);
  container.addEventListener("touchend", onEnd);

  container.addEventListener("mousedown", onStart);
  container.addEventListener("mouseup", onEnd);

  updateCards();
});
