// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initializeNavigation()
  initializeThemeToggle()
  initializeNewsletterForm()
  initializeContactForm()
  initializeAnimations()
  initializeStatsCounter()
})

// Navigation functionality
function initializeNavigation() {
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      }
    })
  }
}

// Theme toggle functionality
function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light"
  body.setAttribute("data-theme", currentTheme)

  // Update theme toggle icon
  updateThemeIcon(currentTheme)

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      body.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
      updateThemeIcon(newTheme)
    })
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
    const icon = themeToggle.querySelector("i")
    if (theme === "dark") {
      icon.className = "fas fa-sun"
    } else {
      icon.className = "fas fa-moon"
    }
  }
}

// Newsletter form functionality
function initializeNewsletterForm() {
  const newsletterForm = document.getElementById("newsletter-form")
  const newsletterMessage = document.getElementById("newsletter-message")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("newsletter-email").value

      if (validateEmail(email)) {
        // Simulate API call
        showNewsletterMessage("Thank you for subscribing! You'll receive our latest updates.", "success")
        newsletterForm.reset()
      } else {
        showNewsletterMessage("Please enter a valid email address.", "error")
      }
    })
  }
}

function showNewsletterMessage(message, type) {
  const newsletterMessage = document.getElementById("newsletter-message")
  if (newsletterMessage) {
    newsletterMessage.textContent = message
    newsletterMessage.className = `newsletter-message ${type}`

    // Clear message after 5 seconds
    setTimeout(() => {
      newsletterMessage.textContent = ""
      newsletterMessage.className = "newsletter-message"
    }, 5000)
  }
}

// Contact form functionality
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    const inputs = contactForm.querySelectorAll("input, textarea")

    // Add real-time validation
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this)
      })

      input.addEventListener("input", function () {
        clearFieldError(this)
      })
    })

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (validateContactForm()) {
        submitContactForm()
      }
    })
  }
}

function validateContactForm() {
  const name = document.getElementById("name")
  const email = document.getElementById("email")
  const subject = document.getElementById("subject")
  const message = document.getElementById("message")

  let isValid = true

  if (!validateField(name)) isValid = false
  if (!validateField(email)) isValid = false
  if (!validateField(subject)) isValid = false
  if (!validateField(message)) isValid = false

  return isValid
}

function validateField(field) {
  const value = field.value.trim()
  const fieldName = field.name
  let isValid = true
  let errorMessage = ""

  // Clear previous errors
  clearFieldError(field)

  // Required field validation
  if (!value) {
    errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`
    isValid = false
  } else {
    // Specific field validations
    switch (fieldName) {
      case "name":
        if (value.length < 2) {
          errorMessage = "Name must be at least 2 characters long."
          isValid = false
        }
        break
      case "email":
        if (!validateEmail(value)) {
          errorMessage = "Please enter a valid email address."
          isValid = false
        }
        break
      case "subject":
        if (value.length < 5) {
          errorMessage = "Subject must be at least 5 characters long."
          isValid = false
        }
        break
      case "message":
        if (value.length < 10) {
          errorMessage = "Message must be at least 10 characters long."
          isValid = false
        }
        break
    }
  }

  if (!isValid) {
    showFieldError(field, errorMessage)
  }

  return isValid
}

function showFieldError(field, message) {
  const formGroup = field.closest(".form-group")
  const errorElement = formGroup.querySelector(".error-message")

  formGroup.classList.add("error")
  errorElement.textContent = message
}

function clearFieldError(field) {
  const formGroup = field.closest(".form-group")
  const errorElement = formGroup.querySelector(".error-message")

  formGroup.classList.remove("error")
  errorElement.textContent = ""
}

function submitContactForm() {
  const submitBtn = document.querySelector(".submit-btn")
  const formMessage = document.getElementById("form-message")

  // Show loading state
  submitBtn.classList.add("loading")
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    // Reset button state
    submitBtn.classList.remove("loading")
    submitBtn.disabled = false

    // Show success message
    formMessage.innerHTML = "Thank you for your message! We'll get back to you soon."
    formMessage.className = "form-message success"

    // Reset form
    document.getElementById("contact-form").reset()

    // Clear message after 5 seconds
    setTimeout(() => {
      formMessage.innerHTML = ""
      formMessage.className = "form-message"
    }, 5000)
  }, 2000)
}

// Email validation utility
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Animation functionality
function initializeAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".article-card, .team-member, .stat-item")
  animateElements.forEach((element) => {
    observer.observe(element)
  })
}

// Stats counter animation
function initializeStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number")

  const observerOptions = {
    threshold: 0.5,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  statNumbers.forEach((stat) => {
    observer.observe(stat)
  })
}

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"))
  const duration = 2000 // 2 seconds
  const increment = target / (duration / 16) // 60 FPS
  let current = 0

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current).toLocaleString()
  }, 16)
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  } else {
    header.style.boxShadow = "0 1px 2px 0 rgb(0 0 0 / 0.05)"
  }
})

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Close mobile menu with Escape key
  if (e.key === "Escape") {
    const navMenu = document.querySelector(".nav-menu")
    const navToggle = document.querySelector(".nav-toggle")
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    }
  }
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  } else {
    header.style.boxShadow = "0 1px 2px 0 rgb(0 0 0 / 0.05)"
  }
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)
