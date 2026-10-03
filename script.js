const themeButton = document.querySelector(".theme-button");


const heroMessage = document.querySelector(".hero-small");
const workButton = document.querySelector(".primary-btn");

const menuButton = document.querySelector(".menu-button");
const navMenu = document.querySelector(".nav-menu");

const navLinks = document.querySelectorAll(".nav-menu a");

const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");


/* =========================
   HERO BUTTON
========================= */

workButton.addEventListener("click", (event) => {
    event.preventDefault();

    heroMessage.textContent = "THANKS FOR VISITING MY PORTFOLIO";
    heroMessage.classList.add("hero-message-active");
});


/* =========================
   MOBILE MENU
========================= */

menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const menuIsOpen = navMenu.classList.contains("active");

    if (menuIsOpen) {
        menuButton.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }
});


/* Close menu after clicking a link */

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});


/* =========================
   CONTACT FORM
========================= */

/* =========================
   CONTACT FORM
========================= */

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");


/* Validate name */

function validateName() {

    if (nameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        return false;
    }

    nameError.textContent = "";
    return true;
}


/* Validate email */

function validateEmail() {

    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Please enter your email.";
        return false;
    }

    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email.";
        return false;
    }

    emailError.textContent = "";
    return true;
}


/* Validate message */

function validateMessage() {

    if (messageInput.value.trim() === "") {
        messageError.textContent = "Please enter a message.";
        return false;
    }

    messageError.textContent = "";
    return true;
}


/* Validate while typing */

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
messageInput.addEventListener("input", validateMessage);


/* Submit form */

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const nameValid = validateName();
    const emailValid = validateEmail();
    const messageValid = validateMessage();

    if (!nameValid || !emailValid || !messageValid) {

        formMessage.textContent = "Please correct the errors above.";

        formMessage.classList.remove("success");
        formMessage.classList.add("error");

        return;
    }

    formMessage.textContent =
        `Thanks, ${nameInput.value.trim()}! Your message is ready to send.`;

    formMessage.classList.remove("error");
    formMessage.classList.add("success");

    contactForm.reset();
});

/* =========================
   DARK MODE
========================= */

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeButton.textContent = "☀️";
        themeButton.setAttribute("aria-label", "Switch to light mode");

        localStorage.setItem("theme", "dark");

    } else {

        themeButton.textContent = "🌙";
        themeButton.setAttribute("aria-label", "Switch to dark mode");

        localStorage.setItem("theme", "light");
    }

});

/* Load saved theme */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeButton.textContent = "☀️";
    themeButton.setAttribute("aria-label", "Switch to light mode");
}

/* =========================
   SCROLL ANIMATIONS
========================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});


revealElements.forEach((element) => {
    observer.observe(element);
});
/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section");
const navigationLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            navigationLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.nav-link[href="#${entry.target.id}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });

}, {
    threshold: 0.45
});


sections.forEach((section) => {
    sectionObserver.observe(section);
});
/* =========================
   PROJECT FILTER
========================= */

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;


        /* Update active button */

        filterButtons.forEach((filterButton) => {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");


        /* Filter projects */

        projectCards.forEach((project) => {

            const projectCategory = project.dataset.category;

            if (
                selectedFilter === "all" ||
                selectedFilter === projectCategory
            ) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }

        });

    });

});