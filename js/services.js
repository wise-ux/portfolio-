// ================= HAMBURGER MENU FUNCTION =================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ================= DARK / LIGHT THEME TOGGLE =================
const themeToggle = document.getElementById("themeToggle");

// Check saved theme from localStorage
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    // Save theme preference
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "🔆";
    }
});

// ================= HERO HIGHLIGHTS TYPING =================
const highlightsText = document.getElementById("typing-highlights");
const highlights = [
    "Web Development",
    "Python Backend",
    "UX/UI Design",
    "SQL Databases",
    "Clean Code",
    "Responsive Design"
];

let highlightIndex = 0;
let charIndex = 0;

function typeHighlight() {
    const currentText = highlights[highlightIndex];
    if (charIndex < currentText.length) {
        highlightsText.innerHTML += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeHighlight, 150);
    } else {
        setTimeout(eraseHighlight, 1500); // wait before erasing
    }
}

function eraseHighlight() {
    const currentText = highlights[highlightIndex];
    if (charIndex > 0) {
        highlightsText.innerHTML = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseHighlight, 80);
    } else {
        highlightIndex = (highlightIndex + 1) % highlights.length;
        setTimeout(typeHighlight, 500);
    }
}

// Start when page loads
document.addEventListener("DOMContentLoaded", typeHighlight);


// ================= SERVICES SCROLL ANIMATION =================
const scrollElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.5 });

scrollElements.forEach(el => observer.observe(el));

// ================= WHY CHOOSE SCROLL ANIMATION =================
const chooseCards = document.querySelectorAll(".choose-card");

const chooseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.5 });

chooseCards.forEach(card => chooseObserver.observe(card));