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


// ================= TYPING EFFECT =================

const typingText = document.querySelector(".typing-text");

const words = [
    "Frontend Expert",
    "Backend Engineer",
    "Full Stack Developer",
    "Creative Web Designer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex++);
        if (charIndex > currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1000);
            return;
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 80);
}

typeEffect();

// ================= SMOOTH FLOATING IMAGE ANIMATION =================

const floatingImage = document.getElementById("floatingImage");

let start = null;
const floatHeight = 20; // how far it moves (px)
const floatSpeed = 0.002; // smaller = slower

function floatAnimation(timestamp) {

    if (!start) start = timestamp;

    const progress = timestamp - start;

    // Sine wave movement
    const offset = Math.sin(progress * floatSpeed) * floatHeight;

    floatingImage.style.transform = `translateY(${offset}px)`;

    requestAnimationFrame(floatAnimation);
}

requestAnimationFrame(floatAnimation);


// ================= TRUSTED GLOBAL / SCROLL COUNTERS =================
const counters = document.querySelectorAll(".counter");
const statItems = document.querySelectorAll(".stat-item");

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            
            // Add visible class for fade-in + slide-up
            entry.target.classList.add("visible");

            // Animate the counter
            const counter = entry.target.querySelector(".counter");
            const target = +counter.getAttribute("data-target");
            let current = 0;
            
            const updateCounter = () => {
                const increment = target / 1500; // smaller = slower
                if(current < target){
                    current += increment;
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();

            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe each stat-item
statItems.forEach(item => observer.observe(item));


// ================= TOOLS / SKILLS ANIMATION =================
const toolItems = document.querySelectorAll(".tool-item");

const toolObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const item = entry.target;
            const level = item.getAttribute("data-level");
            item.style.setProperty('--level', `${level}%`);
            item.style.setProperty('--width', `${level}%`);
            item.querySelector('::after');
            item.style.setProperty('width', `${level}%`);
            item.classList.add("animate");
            observer.unobserve(item);
        }
    });
}, { threshold: 0.5 });

toolItems.forEach(item => toolObserver.observe(item));

// Animate the ::after width using JS
toolItems.forEach(item => {
    const level = item.getAttribute("data-level");
    item.style.setProperty('--level', `${level}%`);
    item.addEventListener('mouseenter', () => {
        item.style.setProperty('--width', `${level}%`);
    });
});



// ================= CTA SCROLL ANIMATION =================
const ctaSection = document.querySelector(".cta-section");

const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            ctaSection.style.opacity = "1";
            ctaSection.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.3 });

ctaSection.style.opacity = "0";
ctaSection.style.transform = "translateY(40px)";
ctaSection.style.transition = "all 1s ease";

ctaObserver.observe(ctaSection);