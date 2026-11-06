// ==========================================================================
// Theme Management (Dark / Light Mode)
// ==========================================================================
const themeToggleBtn = document.getElementById("theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Load saved theme from localStorage or fallback to system preference
const savedTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark" : "light");

if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
} else {
  document.documentElement.removeAttribute("data-theme");
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";

    if (newTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    localStorage.setItem("theme", newTheme);
  });
}

// ==========================================================================
// Mobile Menu Navigation
// ==========================================================================
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
      }
    });
  });
}

// ==========================================================================
// Active Link Highlight on Scroll
// ==========================================================================
const sections = document.querySelectorAll("section[id]");

function highlightActiveNav() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute("id");

    const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);
    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  });
}

window.addEventListener("scroll", highlightActiveNav);

// ==========================================================================
// Back To Top Button
// ==========================================================================
const backToTopBtn = document.getElementById("back-to-top");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 350) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ==========================================================================
// Dynamic Footer Year
// ==========================================================================
const yearElement = document.getElementById("current-year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ==========================================================================
// Contact Form Validation & Submission
// ==========================================================================
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const formFeedback = document.getElementById("form-feedback");

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).trim().toLowerCase());
}

// Clear individual errors on input
[nameInput, emailInput, messageInput].forEach((input) => {
  if (input) {
    input.addEventListener("input", () => {
      const errorEl = document.getElementById(`${input.id}-error`);
      if (errorEl) errorEl.textContent = "";
    });
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Name validation
    if (!nameInput.value.trim()) {
      nameError.textContent = "Please enter your name.";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    // Email validation
    if (!emailInput.value.trim()) {
      emailError.textContent = "Please enter your email address.";
      isValid = false;
    } else if (!validateEmail(emailInput.value)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // Message validation
    if (!messageInput.value.trim()) {
      messageError.textContent = "Please enter a message.";
      isValid = false;
    } else {
      messageError.textContent = "";
    }

    if (isValid) {
      formFeedback.textContent = "Thank you! Your message has been sent successfully.";
      formFeedback.className = "form-feedback success";

      contactForm.reset();

      setTimeout(() => {
        formFeedback.style.display = "none";
        formFeedback.className = "form-feedback";
      }, 5000);
    }
  });
}

// ==========================================================================
// Newsletter Subscription Form
// ==========================================================================
const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmail = document.getElementById("newsletter-email");
const newsletterFeedback = document.getElementById("newsletter-feedback");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (newsletterEmail && validateEmail(newsletterEmail.value)) {
      newsletterFeedback.textContent = "Thank you for subscribing!";
      newsletterFeedback.className = "newsletter-feedback success";
      newsletterEmail.value = "";

      setTimeout(() => {
        newsletterFeedback.style.display = "none";
        newsletterFeedback.className = "newsletter-feedback";
      }, 5000);
    } else {
      newsletterFeedback.textContent = "Please enter a valid email address.";
      newsletterFeedback.className = "newsletter-feedback error-msg";
      newsletterFeedback.style.display = "block";
    }
  });
}
