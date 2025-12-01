function switchTab(tabName) {
    // Hide all tab contents
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.tab-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Add active class to clicked button
    event.target.classList.add('active');

    // Restart typewriter effect when switching to home
    if (tabName === 'home') {
        startTypewriter();
    }
}

// Certificate Modal Functions
function openCertModal(imageSrc, title, issuer) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalCertImage');
    const modalTitle = document.getElementById('modalCertTitle');
    const modalIssuer = document.getElementById('modalCertIssuer');
    
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    modalTitle.textContent = title;
    modalIssuer.textContent = issuer;
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    modal.style.display = 'none';
    
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
}

// Badge Modal Functions
function openBadgeModal(event, imageSrc, title) {
    event.stopPropagation();
    const modal = document.getElementById('badgeModal');
    const modalImg = document.getElementById('modalBadgeImage');
    const modalTitle = document.getElementById('modalBadgeTitle');
    
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    modalTitle.textContent = title;
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeBadgeModal() {
    const modal = document.getElementById('badgeModal');
    modal.style.display = 'none';
    
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const certModal = document.getElementById('certModal');
    const badgeModal = document.getElementById('badgeModal');
    if (event.target === certModal) {
        closeCertModal();
    }
    if (event.target === badgeModal) {
        closeBadgeModal();
    }
}

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCertModal();
        closeBadgeModal();
    }
});

// Typewriter Effect
let hasTyped = false;

function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.add('finished');
            if (callback) callback();
        }
    }
    type();
}

function showBubblesOneByOne() {
    const skillsBubbles = document.getElementById('skillsBubbles');
    const homeLocation = document.getElementById('homeLocation');
    
    skillsBubbles.style.display = 'flex';
    
    // Show location after bubbles animation
    setTimeout(() => {
        homeLocation.style.display = 'flex';
        homeLocation.style.opacity = '0';
        homeLocation.style.animation = 'bubbleAppear 0.5s ease forwards';
    }, 600);
}

function startTypewriter() {
    const nameElement = document.getElementById('nameTypewriter');
    const subtitleElement = document.getElementById('subtitleTypewriter');
    const skillsBubbles = document.getElementById('skillsBubbles');
    const homeLocation = document.getElementById('homeLocation');
    
    // Reset everything
    nameElement.textContent = '';
    subtitleElement.textContent = '';
    skillsBubbles.style.display = 'none';
    homeLocation.style.display = 'none';
    nameElement.classList.remove('finished');
    subtitleElement.classList.remove('finished');
    
    // Type name first
    typeWriter(nameElement, 'Sathvik Merugu', 100, () => {
        // After name is done, type subtitle
        setTimeout(() => {
            typeWriter(subtitleElement, 'Student at Parul University', 80, () => {
                // After subtitle is done, show bubbles
                setTimeout(() => {
                    showBubblesOneByOne();
                }, 300);
            });
        }, 200);
    });
}

// Start typewriter on page load
window.addEventListener('DOMContentLoaded', () => {
    startTypewriter();
    initializeCarousels();
});

// Carousel Functionality
function initializeCarousels() {
    const carousels = document.querySelectorAll('.project-carousel');
    
    carousels.forEach(carousel => {
        const dotsContainer = carousel.querySelector('.carousel-dots');
        const slides = carousel.querySelectorAll('.carousel-slide');
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            dot.onclick = () => goToSlide(carousel, index);
            dotsContainer.appendChild(dot);
        });
        
        // Auto-play carousel
        let autoPlayInterval = setInterval(() => {
            moveSlide(carousel.querySelector('.carousel-btn.next'), 1);
        }, 4000);
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                moveSlide(carousel.querySelector('.carousel-btn.next'), 1);
            }, 4000);
        });
    });
}

function moveSlide(button, direction) {
    const carousel = button.closest('.project-carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

function goToSlide(carousel, index) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}