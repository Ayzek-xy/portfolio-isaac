// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Animate the name in the header
    animateName();
    
    // Add scroll animations
    setupScrollAnimations();
    
    // Setup form validation
    setupFormValidation();
    
    // Add hover effects to project cards
    setupProjectCardInteractions();
    
    // Setup mobile menu toggle
    setupMobileMenu();
    
    // Animate progress bars when in view
    animateProgressBars();
});

// Function to animate the name with a typing effect
function animateName() {
    const nameElement = document.getElementById('animated-name');
    const name = nameElement.textContent;
    nameElement.textContent = '';
    
    let i = 0;
    const speed = 100; // typing speed in milliseconds
    
    function typeWriter() {
        if (i < name.length) {
            nameElement.textContent += name.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

// Function to set up scroll animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .about-text p, .skill-category');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each animated element
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Function to set up form validation
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('nameInput');
        const emailInput = document.getElementById('emailInput');
        const messageInput = document.getElementById('messageInput');
        
        let isValid = true;
        
        // Reset previous error states
        nameInput.style.borderColor = '';
        emailInput.style.borderColor = '';
        messageInput.style.borderColor = '';
        formMessage.textContent = '';
        formMessage.style.color = '';
        
        // Validate name
        if (!nameInput.value.trim()) {
            nameInput.style.borderColor = 'red';
            isValid = false;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailInput.style.borderColor = 'red';
            isValid = false;
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            messageInput.style.borderColor = 'red';
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            formMessage.textContent = 'Message envoyé avec succès!';
            formMessage.style.color = 'green';
            
            // Reset form
            contactForm.reset();
            
            // Clear message after 3 seconds
            setTimeout(() => {
                formMessage.textContent = '';
            }, 3000);
        } else {
            formMessage.textContent = 'Veuillez remplir tous les champs correctement.';
            formMessage.style.color = 'red';
        }
    });
}

// Function to set up project card interactions
function setupProjectCardInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.view-button').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.view-button').style.transform = 'scale(1)';
        });
    });
}

// Function to set up mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Function to animate progress bars when they come into view
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Add a scroll to top button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.textContent = '↑';
scrollToTopButton.style.position = 'fixed';
scrollToTopButton.style.bottom = '20px';
scrollToTopButton.style.right = '20px';
scrollToTopButton.style.padding = '10px 15px';
scrollToTopButton.style.backgroundColor = 'var(--primary-cyan)';
scrollToTopButton.style.color = 'var(--text-light)';
scrollToTopButton.style.border = 'none';
scrollToTopButton.style.borderRadius = '50%';
scrollToTopButton.style.cursor = 'pointer';
scrollToTopButton.style.opacity = '0';
scrollToTopButton.style.transition = 'opacity 0.3s';
scrollToTopButton.style.zIndex = '1000';
scrollToTopButton.style.fontSize = '20px';

document.body.appendChild(scrollToTopButton);

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.opacity = '1';
    } else {
        scrollToTopButton.style.opacity = '0';
    }
});

// Scroll to top when button is clicked
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});