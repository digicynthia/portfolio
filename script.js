// Smooth scroll for in-page navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", targetId);
  });
});

// Theme toggle (light/dark)
const themeToggle = document.getElementById("themeToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(mode) {
  document.documentElement.dataset.theme = mode;
  localStorage.setItem("otc-theme", mode);
  if (themeToggle) {
    themeToggle.textContent = mode === "dark" ? "🌙" : "☀️";
  }
}

const savedTheme = localStorage.getItem("otc-theme");
if (savedTheme) {
  setTheme(savedTheme);
} else if (prefersDark.matches) {
  setTheme("dark");
} else {
  setTheme("light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
  });
}

// Project filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter || "all";

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      const category = card.dataset.category || "";
      const matches =
        filter === "all" || category.split(" ").includes(filter.toLowerCase());
      card.classList.toggle("is-hidden", !matches);
    });
  });
});

// Simple contact form interaction (frontend only)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in all fields.";
      formStatus.classList.remove("success");
      formStatus.classList.add("error");
      return;
    }

    formStatus.textContent =
      "Thank you for reaching out. I’ll get back to you shortly.";
    formStatus.classList.remove("error");
    formStatus.classList.add("success");
    contactForm.reset();
  });
}

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

