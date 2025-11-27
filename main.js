// Main JavaScript - Handles UI interactions and coordination
class LosPrimasosApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initLoader();
        this.initMobileMenu();
        this.initCustomCursor();
        this.initSmoothScrolling();
        this.initFormHandling();
        this.initFloatingElements();
    }

    bindEvents() {
        window.addEventListener('load', () => {
            this.hideLoader();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Navigation scroll effect
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const nav = document.querySelector('.navigation');
            
            if (currentScrollY > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
                nav.style.backdropFilter = 'blur(30px)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.9)';
                nav.style.backdropFilter = 'blur(20px)';
            }

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    initLoader() {
        const loader = document.querySelector('.page-loader');
        const loaderBar = document.querySelector('.loader-bar');
        
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            loaderBar.style.width = `${progress}%`;
        }, 100);
    }

    hideLoader() {
        const loader = document.querySelector('.page-loader');
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'visible';
            }, 500);
        }, 2000);
    }

    initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        let menuOpen = false;

        const toggleMenu = () => {
            menuOpen = !menuOpen;
            mobileMenu.style.right = menuOpen ? '0' : '-100%';
            
            // Animate toggle icon
            const spans = menuToggle.querySelectorAll('span');
            if (menuOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        };

        menuToggle.addEventListener('click', toggleMenu);

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu();
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (menuOpen && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    initCustomCursor() {
        const cursor = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (window.innerWidth <= 768) return; // Disable on mobile

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            // Smooth cursor movement
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;

            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            cursorOutline.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .service-card, .cta-button');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorOutline.style.transform += ' scale(1.5)';
                cursorOutline.style.background = 'rgba(255, 107, 53, 0.1)';
            });

            element.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(1.5)', '');
                cursorOutline.style.background = 'transparent';
            });
        });
    }

    initSmoothScrolling() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navHeight = document.querySelector('.navigation').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initFormHandling() {
        const form = document.getElementById('contact-form');
        const submitBtn = document.querySelector('.form-submit');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Animate submit button
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.style.background = 'rgba(255, 107, 53, 0.6)';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                // Reset form
                form.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(135deg, #ff6b35, #f39c12)';
                    submitBtn.disabled = false;
                }, 3000);
                
                // Show success message (you can customize this)
                console.log('Form submitted:', data);
            }, 2000);
        });

        // Form input animations
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }

    initFloatingElements() {
        const floatingElements = document.querySelectorAll('.float-element');
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 0.02;
                const x = mouseX * speed * 100;
                const y = mouseY * speed * 100;
                
                gsap.to(element, {
                    duration: 1,
                    x: x,
                    y: y,
                    ease: "power2.out"
                });
            });
        });
    }

    handleResize() {
        // Handle responsive changes
        if (window.innerWidth <= 768) {
            document.querySelector('.custom-cursor').style.display = 'none';
        } else {
            document.querySelector('.custom-cursor').style.display = 'block';
        }
    }
}

// Utility functions
const utils = {
    // Throttle function for performance optimization
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Debounce function for performance optimization
    debounce: (func, wait, immediate) => {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth number counter animation
    animateNumber: (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
};

// Performance optimizations
const performance = {
    // Lazy load images
    lazyLoadImages: () => {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    },

    // Preload critical resources
    preloadResources: () => {
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    new LosPrimasosApp();
    
    // Initialize performance optimizations
    performance.lazyLoadImages();
    performance.preloadResources();
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        gsap.globalTimeline.pause();
    } else {
        // Resume animations when tab becomes visible
        gsap.globalTimeline.resume();
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LosPrimasosApp, utils, performance };
}