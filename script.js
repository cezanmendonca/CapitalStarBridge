// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initTestimonials();
    setupMobileMenu();
    setupFormValidation();
    setupSmoothScrolling();
});

// Testimonials functionality
function initTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials-content');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Get all testimonial items
    const testimonials = document.querySelectorAll('.testimonial-item');
    
    if (testimonials.length > 0) {
        let currentIndex = 0;
        
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(item => {
                item.classList.remove('active');
            });
            
            // Show the selected testimonial
            testimonials[index].classList.add('active');
        }
        
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 7000);
    }
}

// Mobile menu functionality
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
}

// Form validation and submission
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                showStatus('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showStatus('Please enter a valid email address', 'error');
                return;
            }
            
            // Get form data
            const formData = {
                name: name,
                email: email,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: message
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            sendEmail(formData)
                .then(function(response) {
                    showStatus('Thank you for your message. We will get back to you soon!', 'success');
                    contactForm.reset();
                }, function(error) {
                    showStatus('There was an error sending your message. Please try again.', 'error');
                    console.error('EmailJS Error:', error);
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}

function showStatus(message, type) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = message;
    statusMessage.className = 'status-message ' + type;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 5000);
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.querySelector('nav ul').classList.remove('show');
            }
        });
    });
}