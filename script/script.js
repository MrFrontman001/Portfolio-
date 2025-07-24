// Skills Progress Animation
const skills = document.querySelectorAll('.skill-card');
const observerOptions = {
    root: null,
    threshold: 0.1
};

const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start) + "%";
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressValueElement = entry.target.querySelector('.progress-value');
            const target = parseInt(progressValueElement.dataset.percent);
            const progressRing = entry.target.querySelector('.progress-ring__fill');
            
            animateValue(progressValueElement, 0, target, 1000);
            progressRing.style.strokeDashoffset = 339 * (1 - target / 100);
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
skills.forEach(skill => observer.observe(skill));

// Space Background Elements
function createStars() {
    const starContainer = document.querySelector('.space-container');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            animation-duration: ${Math.random() * 2 + 1}s;
        `;
        starContainer.appendChild(star);
    }
}

function createAsteroids() {
    const asteroidContainer = document.querySelector('.space-container');
    for (let i = 0; i < 10; i++) {
        const asteroid = document.createElement('div');
        asteroid.classList.add('asteroid');
        const size = Math.random() * 30 + 20;
        asteroid.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            animation-duration: ${Math.random() * 5 + 5}s;
        `;
        asteroidContainer.appendChild(asteroid);
    }
}

// Projects Filtering System
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');

    const filterProjects = (filter) => {
        projectCards.forEach(card => {
            const categories = card.dataset.category.split(' ');
            const shouldShow = filter === 'all' || categories.includes(filter);
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            if (shouldShow) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.dataset.filter);
        });
    });

    document.querySelector('.filter-button[data-filter="all"]').click();
}

// Testimonials Carousel
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.dots-container');
    let currentTestimonial = 0;

    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });

    function showTestimonial(index) {
        testimonials[currentTestimonial].classList.remove('active');
        dotsContainer.children[currentTestimonial].classList.remove('active');
        
        currentTestimonial = (index + testimonials.length) % testimonials.length;
        
        testimonials[currentTestimonial].classList.add('active');
        dotsContainer.children[currentTestimonial].classList.add('active');
    }

    document.querySelector('.prev-btn').addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
    });

    setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 8000);
}

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    createAsteroids();
    initProjectFilters();
    initTestimonialCarousel();
});
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href'); // Get the target section ID
            const targetSection = document.querySelector(targetId); // Select the target section

            // Fade out the current section
            const currentSection = document.querySelector('.fade-in');
            if (currentSection) {
                currentSection.classList.remove('fade-in');
                currentSection.classList.add('fade-out');
            }

            // Wait for the fade-out animation to finish before scrolling
            setTimeout(() => {
                // Scroll to the target section smoothly
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Align the top of the section with the top of the viewport
                });

                // Fade in the target section
                targetSection.classList.remove('fade-out');
                targetSection.classList.add('fade-in');
            }, 500); // Match this timeout with the fade-out duration
        });
    });

//Optional: Add fade-in class to the first section on page load
    document.addEventListener('DOMContentLoaded', function() {
        const firstSection = document.querySelector('.about'); // Change this to your first section
        firstSection.classList.add('fade-in');
    });
    //Optional: Add fade-in class to the first section on page load
    document.addEventListener('DOMContentLoaded', function() {
        const firstSection = document.querySelector('.skills'); // Change this to your first section
        firstSection.classList.add('fade-in');
    });
    document.addEventListener('DOMContentLoaded', function() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active'); // Toggle the active class
        });
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        const sections = document.querySelectorAll('section'); // Select all sections

        const observerOptions = {
            root: null,
            threshold: 0.1 // Trigger when 10% of the section is visible
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active'); // Add active class to trigger animation
                    observer.unobserve(entry.target); // Stop observing the section after it has been animated
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => {
            section.classList.add('fade-in'); // Add fade-in class to all sections
            observer.observe(section); // Start observing each section
        });
    });
