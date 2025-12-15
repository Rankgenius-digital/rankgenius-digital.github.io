// ============================
// DOM Ready
// ============================
document.addEventListener('DOMContentLoaded', () => {

  // ============================
  // Mobile Menu Toggle
  // ============================
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav-bar');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Close mobile nav when a link is clicked
  const navLinks = document.querySelectorAll('#navMenu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });

  // ============================
  // Highlight Active Nav Link
  // ============================
  const currentPage = window.location.pathname.split("/").pop();
  const allLinks = document.querySelectorAll("nav a");

  allLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // ============================
  // Swiper Slider Initialization
  // ============================
  if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
    const swiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 40,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // ============================
  // Explore Buttons
  // ============================
  document.querySelectorAll('.explore-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = 'services.html';
    });
  });

  // ============================
  // Scroll Fade Animation
  // ============================
  const fadeElements = document.querySelectorAll(
    '.service-card, .tech-card, .ai-item, .why-choose, .hero-content'
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.2 }
  );

  fadeElements.forEach(el => observer.observe(el));

  // ============================
  // Smooth Scroll for Anchors
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================
  // About Card Scroll Fade
  // ============================
  document.addEventListener('scroll', () => {
    document.querySelectorAll('.about-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add('visible');
      }
    });
  });

  // ============================
  // Counter Animation (Stats Section)
  // ============================
  const counters = document.querySelectorAll('.counter');
  const speed = 100;

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const updateCount = () => {
        const count = +counter.innerText;
        const increment = target / speed;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = suffix === "K+" ? Math.round(target / 1000) + "K+" : target + suffix;
        }
      };
      updateCount();
    });
  }

  const section = document.querySelector('.stats-section');
  let started = false;

  if (section) {
    window.addEventListener('scroll', () => {
      const sectionTop = section.offsetTop - window.innerHeight + 100;
      if (!started && window.scrollY > sectionTop) {
        animateCounters();
        started = true;
      }
    });
  }

  // ============================
  // Google Sheet Form Submission
  // ============================
 
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbygvJQOBLBxSDptQD-4tD-KgsoN52G64N0IwPbo4thCis8UZkf27qsBd7eBCoPBgxbL/exec";

document.getElementById("consultForm").addEventListener("submit", function (e) {
  
  e.preventDefault();
  let valid = true;

  // Remove old errors
  document.querySelectorAll(".error-text").forEach(el => el.style.display = "none");

  // Get all values
  const name = document.getElementById("name");
  const number = document.getElementById("number");
  const email = document.getElementById("email");
  const url = document.getElementById("url");
  const industry = document.getElementById("industry");
  const enquire = document.getElementById("enquire");

  // Name Validation
  if (name.value.trim().length < 3) {
    showError(name, "Please enter a valid full name.");
    valid = false;
  }

  // Phone Validation (10 digits)
  if (!/^[0-9]{10}$/.test(number.value.trim())) {
    showError(number, "Enter a valid 10-digit phone number.");
    valid = false;
  }

  // Email Validation
  if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
    showError(email, "Please enter a valid email address.");
    valid = false;
  }

  // Website Validation (optional)
  if (url.value.trim() !== "" && !/^https?:\/\/.+\..+/.test(url.value.trim())) {
    showError(url, "Enter a valid website URL (http/https).");
    valid = false;
  }

  // Industry validation
  if (industry.value === "") {
    showError(industry, "Please select an industry.");
    valid = false;
  }

  // Enquiry validation
  if (enquire.value.trim().length < 10) {
    showError(enquire, "Please enter at least 10 characters.");
    valid = false;
  }

  // If valid — show thank you message
  if (valid) {
    document.getElementById("thankyou").innerHTML =
      "Thank you! Our team will contact you shortly.";
    document.getElementById("thankyou").style.display = "block";
    document.getElementById("consultForm").reset();
  }
});

// Function to show error message below input
function showError(inputField, message) {
  let error = document.createElement("div");
  error.className = "error-text";
  error.innerText = message;
  inputField.insertAdjacentElement("afterend", error);
  error.style.display = "block";
}

  // ============================
  // Call the function safely
  // ============================
  attachFormHandler();

  const consultBtn = document.querySelector('.btn.btn-accent');
  if (consultBtn) {
    consultBtn.addEventListener('click', () => {
      setTimeout(() => {
        attachFormHandler(); // reattach after form appears
      }, 500);
    });
  }
});


  // ============================
  // Button-to-Form & Calendly Mapping
  // ============================
  const formLink = "consultation.html";
  const calendlyLink = "https://calendly.com/rankgenius-digital/30min?month=2025-11"; // ✅ Your Live Calendly Link

  // Buttons leading to consultation form
  const mapToFormSelectors = [
    'a.btn.btn-accent[href="#"]',
    'a[href="#analyze"]',
    'a.book-meeting',
    '.get-free-consultation'
  ];

  mapToFormSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.addEventListener('click', (ev) => {
        ev.preventDefault();
        window.location.href = formLink;
      });
    });
  });

  // Buttons that open Calendly directly
  document.querySelectorAll('.btn-calendly, .book-meeting').forEach(b => {
    b.addEventListener('click', e => {
      e.preventDefault();
      window.open(calendlyLink, '_blank');
    });
  });



// 🌸 Smooth resize animation feedback 
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resizing");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resizing");
  }, 400);
});


// Optional: subtle fade during resize 
const style = document.createElement('style');
style.innerHTML = `
  body.resizing {
    transition: opacity 0.3s ease;
    opacity: 0.98; 
  }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card-dark").forEach((card, i) => {
    setTimeout(() => {
      card.style.opacity = "1";
    }, i * 80);
  });
});

let slider = document.getElementById("aiSlider");
let slides = document.getElementById("aiSlides");
let dots = document.querySelectorAll(".dot");

if (slider && slides && dots.length > 0) {
  
  let currentSlide = 0;

  function goToSlide(n) {
    currentSlide = n;

    const width = slider.offsetWidth;
    slides.style.transform = `translateX(-${n * width}px)`;

    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[n]) dots[n].classList.add("active");
  }

  // Auto Slide
  setInterval(() => {
    currentSlide = (currentSlide + 1) % dots.length;
    goToSlide(currentSlide);
  }, 4000);

  // Fix width on resize
  window.addEventListener("resize", () => goToSlide(currentSlide));

  // Initial slide
  goToSlide(0);
}

//testimonial slider
var testimonialSwiper = new Swiper(".testimonialSwiper", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centeredSlides: false,

  autoplay: {
      delay: 3000,
  },

  pagination: {
      el: ".swiper-pagination",
      clickable: true,
  },

  navigation: {
      nextEl: ".t-next",
      prevEl: ".t-prev",
  },

  breakpoints: {
      0: { slidesPerView: 1 },
      600: { slidesPerView: 2 },
      992: { slidesPerView: 3 }
  }
});

// AI Neon Slider
const aiSlides = document.getElementById("aiSlides");
const aiDots = document.querySelectorAll(".ai-dots .dot");

let aiIndex = 0;

function changeAISlide(n) {
  aiIndex = n;
  aiSlides.style.transform = `translateX(-${n * 100}%)`;

  aiDots.forEach(dot => dot.classList.remove("active"));
  aiDots[n].classList.add("active");
}

// Auto Slide every 3.5s
setInterval(() => {
  aiIndex = (aiIndex + 1) % aiDots.length;
  changeAISlide(aiIndex);
}, 3500);

// Dot Click
aiDots.forEach((dot, index) => {
  dot.addEventListener("click", () => changeAISlide(index));
});


window.addEventListener("scroll", function () {
  const nav = document.querySelector(".nav-bar");

  if (window.scrollY > 20) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});


(function(){
  // Only run if the page has dropdowns
  const dropdowns = document.querySelectorAll('.dropdown');

  // Handle click/tap to toggle (useful on mobile & touch devices)
  dropdowns.forEach(drop => {
    const btn = drop.querySelector('.drop-btn');
    const menu = drop.querySelector('.dropdown-menu');

    if (!btn || !menu) return;

    // click toggles
    btn.addEventListener('click', function(e){
      // prevent default if href="#"
      if (this.getAttribute('href') === '#') e.preventDefault();

      // toggle a class on the li
      const open = drop.classList.toggle('open'); // adds .open when opened

      // update menu state so CSS pointer-events/opacity apply
      if (open) {
        menu.style.pointerEvents = 'auto';
        menu.style.opacity = '1';
        menu.style.transform = 'translateY(0)';
      } else {
        menu.style.pointerEvents = 'none';
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(6px)';
      }
    });

    // close on outside click
    document.addEventListener('click', function(e){
      if (!drop.contains(e.target)) {
        drop.classList.remove('open');
        menu.style.pointerEvents = 'none';
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(6px)';
      }
    });

    // close on ESC
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') {
        drop.classList.remove('open');
        menu.style.pointerEvents = 'none';
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(6px)';
      }
    });
  });
})();






