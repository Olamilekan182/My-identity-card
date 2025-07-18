// Tab switching logic
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button);
  });
});

function activateTab(button) {
  const target = button.getAttribute("data-tab");

  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabContents.forEach((tab) => tab.classList.remove("active"));

  button.classList.add("active");
  document.getElementById(target).classList.add("active");
}

// Dark mode toggle
const darkToggle = document.getElementById("dark-toggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  // Change toggle button icon/text dynamically
  if (document.body.classList.contains("dark")) {
    darkToggle.textContent = "☀️ Light Mode";
  } else {
    darkToggle.textContent = "🌙 Dark Mode";
  }
});

// Typing effect for dev title
const roles = ["Frontend Developer", "UI Designer", "Creative Coder"];
let i = 0, j = 0, current = "", isDeleting = false;

function type() {
  const typingText = document.getElementById("typing-text");
  if (!typingText) return;

  if (i < roles.length) {
    if (!isDeleting && j <= roles[i].length) {
      current = roles[i].slice(0, j++);
    } else if (isDeleting && j >= 0) {
      current = roles[i].slice(0, j--);
    }

    typingText.textContent = current;

    if (j === roles[i].length + 5) isDeleting = true;
    if (j < 0) {
      isDeleting = false;
      i = (i + 1) % roles.length;
    }
  }

  setTimeout(type, isDeleting ? 60 : 100);
}

type();

// Swipe detection on card-wrapper for mobile smooth navigation
const cardWrapper = document.querySelector(".card-wrapper");

let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50; // Minimum px distance to count as swipe

cardWrapper.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

cardWrapper.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
});

function handleSwipeGesture() {
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) > swipeThreshold) {
    // Get current active tab index
    const activeIndex = Array.from(tabButtons).findIndex(btn => btn.classList.contains("active"));

    if (swipeDistance < 0) {
      // Swipe Left: go to next tab (loop)
      const nextIndex = (activeIndex + 1) % tabButtons.length;
      tabButtons[nextIndex].click();
    } else {
      // Swipe Right: go to previous tab (loop)
      const prevIndex = (activeIndex - 1 + tabButtons.length) % tabButtons.length;
      tabButtons[prevIndex].click();
    }
  }
}
