/**
 * SweepNspect Marketing Site JavaScript
 */

(function() {
    'use strict';

    // DOM Elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a nav link
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = document.querySelector('.nav').offsetHeight;
        const scrollPosition = window.scrollY + navHeight + 100;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Throttle scroll event for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            updateActiveNavLink();
        });
    });

    // Initialize
    updateActiveNavLink();

    // Demo screen rotation
    const demoScreens = document.querySelectorAll('.demo-screen');
    const indicators = document.querySelectorAll('.indicator');
    let currentScreen = 0;

    function rotateDemoScreen() {
        if (demoScreens.length === 0) return;

        // Remove active from current
        demoScreens[currentScreen].classList.remove('active');
        indicators[currentScreen].classList.remove('active');

        // Move to next
        currentScreen = (currentScreen + 1) % demoScreens.length;

        // Add active to new
        demoScreens[currentScreen].classList.add('active');
        indicators[currentScreen].classList.add('active');
    }

    // Rotate every 3 seconds
    if (demoScreens.length > 0) {
        setInterval(rotateDemoScreen, 3000);
    }

    // Contact form — mailto (no external services)
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var name = contactForm.querySelector('[name="name"]').value;
            var email = contactForm.querySelector('[name="email"]').value;
            var message = contactForm.querySelector('[name="message"]').value;

            var subject = encodeURIComponent('SweepNspect Contact — ' + name);
            var body = encodeURIComponent(
                'From: ' + name + ' (' + email + ')\n\n' + message
            );
            window.location.href = 'mailto:contact@sweepnspect.com?subject=' + subject + '&body=' + body;
        });
    }
})();
