document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute("href"); // Get the target section ID
            const targetElement = document.querySelector(targetId); // Find the target element

            if (targetElement) {
                // Scroll to the target element smoothly
                targetElement.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });

    // Review Slider Logic
    const reviewSlider = document.getElementById("reviewSlider");
    const reviewDotsContainer = document.getElementById("reviewDots");
    const reviewCards = Array.from(reviewSlider.children); // Get all review cards
    let currentIndex = 0;
    let autoSlideInterval;

    // Create dots for each review card
    reviewCards.forEach((_, index) => {
        const dot = document.createElement("span");
        // The styling for the dots (width, height, background, border-radius, etc.)
        // is now fully handled by the 'review-dots-container span' rule in style.css.
        // We only need to manage the 'active' class for the current dot.
        dot.addEventListener("click", () => {
            goToSlide(index);
            resetAutoSlide(); // Reset timer on manual navigation
        });
        reviewDotsContainer.appendChild(dot);
    });

    // Function to update the slider position and active dot
    function updateSlider() {
        // Calculate the translation based on the current index and card width.
        // Since we're ensuring each review card takes 100% width in CSS,
        // this will move the slider by one full card width at a time.
        const cardWidth = reviewCards[0].offsetWidth; // Get the actual rendered width of one card
        reviewSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Update active dot
        Array.from(reviewDotsContainer.children).forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add("active"); // Add the 'active' class for styling the current dot
            } else {
                dot.classList.remove("active"); // Remove 'active' class from other dots
            }
        });
    }

    // Go to a specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    // Move to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % reviewCards.length;
        updateSlider();
    }

    // Start auto-sliding
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Reset auto-slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Initial setup
    updateSlider(); // Set initial position and active dot
    startAutoSlide(); // Start auto-sliding when the page loads

    // Optional: Pause auto-slide on hover
    reviewSlider.addEventListener("mouseenter", () =>
        clearInterval(autoSlideInterval),
    );
    reviewSlider.addEventListener("mouseleave", startAutoSlide);

    // Handle window resize to re-calculate card width for accurate sliding
    window.addEventListener("resize", () => {
        updateSlider(); // Recalculate transform on resize
    });
});
