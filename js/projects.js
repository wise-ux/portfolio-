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

// ================= PROJECT FILTER FUNCTION =================
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // remove active from all buttons
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === "all" || card.dataset.category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// ================= PROJECT CARDS SCROLL =================
// const projectCards = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.5 });

projectCards.forEach(card => projectObserver.observe(card));


// ================= LOAD MORE PROJECTS =================
const loadMoreBtn = document.getElementById("loadMoreBtn");
let projectsVisible = 6; // number of projects initially shown

const allProjects = document.querySelectorAll(".project-card");

// Hide projects beyond initial
allProjects.forEach((project, index) => {
    if(index >= projectsVisible) project.style.display = "none";
});

// On button click
loadMoreBtn.addEventListener("click", () => {
    let next = projectsVisible + 3; // show 3 more at a time
    for(let i = projectsVisible; i < next && i < allProjects.length; i++){
        allProjects[i].style.display = "block";
        allProjects[i].classList.add("visible"); // trigger scroll animation
    }
    projectsVisible = next;

    // Hide button if all projects are visible
    if(projectsVisible >= allProjects.length) {
        loadMoreBtn.style.display = "none";
    }
});
