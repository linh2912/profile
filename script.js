// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('hide');
});

// Intersection Observer for smooth animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('section-title')) {
                const parent = entry.target.closest('section');
                if (parent) {
                    const items = parent.querySelectorAll('.skills-item, .project-card, .form-group');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.section-title, .skills-item, .project-card, .form-group').forEach(el => {
    observer.observe(el);
});

// Enhanced Mobile Menu
const navMenu = document.querySelector('.nav-menu');
const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close');
const navLinks = document.querySelectorAll('.nav-link');

// Show Menu with staggered animation
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
}

// Hide Menu
if (navClose) {
    navClose.addEventListener('click', () => {
        closeMenu();
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('show-menu') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
        closeMenu();
    }
});

function closeMenu() {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = ''; // Restore scrolling
}

// Hide Menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Smooth scroll with enhanced animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerOffset = 50;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update active state with delay
            setTimeout(() => {
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }, 800);
        }
    });
});

// Enhanced Parallax Effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeContent = document.querySelector('.home-content');
    const delta = scrolled - lastScrollTop;

    if (homeContent) {
        const speed = 0.3;
        const opacity = 1 - (scrolled * 0.002);
        const scale = 1 - (scrolled * 0.0005);

        homeContent.style.transform = `translateY(${scrolled * speed}px) scale(${scale})`;
        homeContent.style.opacity = opacity > 0 ? opacity : 0;
    }

    lastScrollTop = scrolled;
});

// Form submission with enhanced animation
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formGroups = contactForm.querySelectorAll('.form-group');

        // Add loading state with slide effect
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Slide out animation for form fields
        formGroups.forEach((group, index) => {
            setTimeout(() => {
                group.style.transform = 'translateX(-20px)';
                group.style.opacity = '0.5';
            }, index * 100);
        });

        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success animation
        submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
        submitButton.style.backgroundColor = '#22c55e';

        // Reset form with slide in animation
        setTimeout(() => {
            contactForm.reset();
            submitButton.innerHTML = 'Send Message';
            submitButton.style.backgroundColor = '';
            submitButton.disabled = false;

            // Slide in animation for form fields
            formGroups.forEach((group, index) => {
                setTimeout(() => {
                    group.style.transform = '';
                    group.style.opacity = '';
                }, index * 100);
            });
        }, 2000);
    });
}

// Active section highlight
function activeLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activeLink);
