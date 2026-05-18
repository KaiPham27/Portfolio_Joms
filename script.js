// DOM ELEMENTS

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link:not(.theme-toggle)');
const themeToggle = document.getElementById('theme-toggle');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// NAVIGATION - HAMBURGER MENU

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// DARK MODE TOGGLE

const currentTheme = localStorage.getItem('theme') || 'light-mode';
document.body.classList.add(currentTheme);
updateThemeIcon();

themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
    
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// SCROLL TO TOP BUTTON

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// SMOOTH SCROLLING FOR NAV LINKS

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#about') return;
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CONTACT FORM HANDLING

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showFormMessage('✅ Message sent successfully!', 'success');
            contactForm.reset();
        } else {
            showFormMessage('❌ Failed to send message.', 'error');
        }

    } catch (error) {
        showFormMessage('⚠️ Network error. Please try again.', 'error');
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// SKILL PROGRESS BARS ANIMATION

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar && !progressBar.classList.contains('animated')) {
                progressBar.classList.add('animated');
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(skillItem => {
    observer.observe(skillItem);
});

// ACTIVE NAV LINK HIGHLIGHT

window.addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// PAGE LOAD ANIMATIONS

window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeIn 1s ease-in-out';
    }
});

// PARALLAX EFFECT

document.addEventListener('mousemove', (e) => {
    const avatar = document.querySelector('.avatar');
    if (avatar && window.innerWidth > 768) {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 10;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 10;
        avatar.style.transform = `translateY(calc(-20px + ${mouseY}px))`;
    }
});

// UTILITY FUNCTIONS

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// DOWNLOAD RESUME

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.querySelector('.btn[download]');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            console.log('Resume download initiated');
        });
    }
});

// INITIALIZE ON PAGE LOAD

document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Portfolio loaded successfully!');
    initializeTooltips();
});

function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
        });
    });
}

// SCROLL ANIMATIONS

const scrollElements = document.querySelectorAll('.project-card, .experience-item, .skill-category');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};

const displayScrollElement = debounce(function() {
    scrollElements.forEach((element) => {
        if (elementInView(element, 1.25)) {
            element.classList.add('scrolled');
        }
    });
}, 100);

window.addEventListener('scroll', displayScrollElement);

const style = document.createElement('style');
style.textContent = `
    .project-card, .experience-item, .skill-category {
        opacity: 0;
        transition: opacity 0.6s ease-in-out;
    }
    .project-card.scrolled, .experience-item.scrolled, .skill-category.scrolled {
        opacity: 1;
    }
`;
document.head.appendChild(style);

displayScrollElement();

// VISITOR COUNTER

const visits = parseInt(localStorage.getItem('visitCount') || '0') + 1;
localStorage.setItem('visitCount', visits);
document.getElementById('visitor-count').textContent = visits;

// TYPING EFFECT
const texts = [
    "BSIT Student",
    "Frontend Developer",
    "Web Developer",
    "Problem Solver"
];

let i = 0;
let j = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
    const typingElement = document.getElementById("typing-text");

    if (!typingElement) return;

    currentText = texts[i];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, j--);
    } else {
        typingElement.textContent = currentText.substring(0, j++);
    }

    let speed = isDeleting ? 100: 140;

    if (!isDeleting && j === currentText.length) {
        speed = 2000;
        isDeleting = true;}

    else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % texts.length;
        speed = 500;  
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// ABOUT MODAL

const modal = document.getElementById('aboutModal');
const closeBtn = document.querySelector('.close');

document.querySelector('a[href="#about"]').addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector("#about").scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        modal.style.display = "flex";
    }, 500);
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});