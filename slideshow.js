let currentSlide = 0;
const totalSlides = 28; // For 28 images
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
let touchStartX = 0;
let touchEndX = 0;
let backgroundMusic = null;
let musicStarted = false;

// Initialize the slideshow
function initSlideshow() {
    // Create indicators if they don't exist
    const indicatorContainer = document.querySelector('.indicator-container') || createIndicatorContainer();
    
    // Clear existing indicators
    indicatorContainer.innerHTML = '';
    
    // Create new indicators for all 28 slides
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.onclick = () => showSlide(i);
        indicatorContainer.appendChild(indicator);
    }
    
    // Initialize background music
    initBackgroundMusic();
    
    // Show the first slide
    showSlide(0);
    
    // Add touch event listeners with error handling
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', handleTouchStart, false);
        slideshowContainer.addEventListener('touchend', handleTouchEnd, false);
        
        // Add click/touch event to start music
        slideshowContainer.addEventListener('click', startBackgroundMusic, false);
    } else {
        console.error('Slideshow container not found');
    }
}

// Create indicator container if it doesn't exist
function createIndicatorContainer() {
    const container = document.createElement('div');
    container.className = 'indicator-container';
    document.querySelector('.slideshow-container').appendChild(container);
    return container;
}

// Handle touch start event
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    
    // Start music on first interaction
    startBackgroundMusic();
}

// Handle touch end event
function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDistance = touchStartX - touchEndX;
    
    // Use a threshold of 50px for swipe detection
    if (swipeDistance > 50) {
        nextSlide();
    } else if (swipeDistance < -50) {
        prevSlide();
    }
}

// Initialize background music
function initBackgroundMusic() {
    backgroundMusic = document.getElementById('background-music');
    if (!backgroundMusic) {
        backgroundMusic = document.createElement('audio');
        backgroundMusic.id = 'background-music';
        backgroundMusic.src = 'blue_hair.mp4';
        backgroundMusic.loop = false; // Only play once
        document.body.appendChild(backgroundMusic);
    }
}

// Start background music (only happens once)
function startBackgroundMusic() {
    if (backgroundMusic && !musicStarted) {
        backgroundMusic.play().then(() => {
            musicStarted = true;
        }).catch(error => {
            console.error('Music playback failed:', error);
        });
    }
}

// Show a specific slide
function showSlide(n) {
    // Handle out of bounds
    if (n >= totalSlides) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = n;
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    
    // Update all indicators
    const updatedIndicators = document.querySelectorAll('.indicator');
    for (let i = 0; i < updatedIndicators.length; i++) {
        updatedIndicators[i].classList.remove('active');
    }
    
    // Show current slide and update indicator
    if (slides[currentSlide]) {
        slides[currentSlide].style.display = 'block';
    }
    
    if (updatedIndicators[currentSlide]) {
        updatedIndicators[currentSlide].classList.add('active');
    }
    
    // Update caption to "enz"
    updateCaption();
}

// Update caption text
function updateCaption() {
    const captionElement = document.querySelector('.slide-caption');
    if (captionElement) {
        captionElement.textContent = 'enz';
    } else {
        // Create caption if it doesn't exist
        const currentSlideElement = slides[currentSlide];
        if (currentSlideElement) {
            const caption = document.createElement('div');
            caption.className = 'slide-caption';
            caption.textContent = 'enz';
            currentSlideElement.appendChild(caption);
        }
    }
}

// Go to next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Go to previous slide
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
        startBackgroundMusic();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
        startBackgroundMusic();
    }
});

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', initSlideshow);