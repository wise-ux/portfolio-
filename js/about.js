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

// ================= TERMINAL TYPING =================

const terminalSection = document.querySelector(".about-terminal");
const typingText = document.getElementById("typing-text");

const text = "Building structured, scalable, and performance-driven digital systems.";

let index = 0;
let hasTyped = false;

function typeEffect() {
    if (index < text.length) {
        typingText.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 145);
    } else {
        document.querySelector(".cursor").style.animation = "none";
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasTyped) {
            terminalSection.classList.add("visible");
            setTimeout(() => {
                typeEffect();
            }, 500);
            hasTyped = true;
        }
    });
}, { threshold: 0.5 });

observer.observe(terminalSection);