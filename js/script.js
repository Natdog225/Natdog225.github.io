// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Ensure the theme toggle button exists before adding listeners
    if (themeToggle) {
        // Check for saved theme preference or default to 'professional'
        const currentTheme = localStorage.getItem('theme') || 'professional';
        body.setAttribute('data-theme', currentTheme);

        // Ensure button has proper structure for CSS text switching
        if (!themeToggle.querySelector('.toggle-text')) {
            // If no toggle-text span exists, create one
            const toggleText = document.createElement('span');
            toggleText.className = 'toggle-text';
            themeToggle.appendChild(toggleText);
        }

        // Fallback: Update button text directly if CSS method isn't working
        function updateButtonText(theme) {
            const toggleTextSpan = themeToggle.querySelector('.toggle-text');
            if (toggleTextSpan) {
                // CSS handles this via ::after pseudo-element, but we can add fallback
                if (!getComputedStyle(toggleTextSpan, ':after').content || 
                    getComputedStyle(toggleTextSpan, ':after').content === 'none') {
                    // CSS pseudo-element isn't working, use direct text
                    themeToggle.textContent = theme === 'professional' ? 'Fun Mode' : 'Professional';
                }
            } else {
                // No span, just set button text directly
                themeToggle.textContent = theme === 'professional' ? 'Fun Mode' : 'Professional';
            }
        }

        // Set initial button text
        updateButtonText(currentTheme);

        // Theme toggle click handler
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'professional' ? 'fun' : 'professional';

            // Add a little animation to the button
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);

            // Switch theme
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update button text
            updateButtonText(newTheme);

            // Optional: Add some fun effects when switching to fun mode
            if (newTheme === 'fun') {
                // Make sure createSparkles is defined elsewhere or define it here
                if (typeof createSparkles === 'function') {
                    createSparkles();
                } else {
                    console.log('🎉 Fun mode activated!');
                    // Simple fallback effect - brief body highlight
                    body.style.transition = 'box-shadow 0.3s ease';
                    body.style.boxShadow = '0 0 20px rgba(0, 191, 178, 0.3)';
                    setTimeout(() => {
                        body.style.boxShadow = 'none';
                    }, 600);
                }
            }
        });
    } else {
        console.warn("Theme toggle button with ID 'themeToggle' not found.");
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link'); // Assuming your nav links have this class
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Check if it's an internal link
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault(); // Only prevent default for actual internal fragment links
                const targetId = href.substring(1); // Remove #
                const targetSection = document.getElementById(targetId); // More reliable for IDs

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    console.warn(`Smooth scroll target section with ID '${targetId}' not found.`);
                }
            }
            // If it's a full URL or just '#', let the browser handle it or do nothing
        });
    }); // Closing forEach for navLinks

}); // Closing DOMContentLoaded listener

// Enhanced createSparkles function using your new color palette
function createSparkles() {
    console.log('✨ Sparkle effect activated!');
    const colors = ['#00bfb2', '#f87060', '#f0f3bd', '#028090']; // Your fun theme colors
    
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.position = 'fixed';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.width = '8px';
        sparkle.style.height = '8px';
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = `sparkle-animation ${Math.random() * 1 + 0.8}s forwards`;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 2000); // Remove sparkles after animation
    }
}

// Add sparkle animation styles dynamically if they don't exist
if (!document.querySelector('#sparkle-styles')) {
    const style = document.createElement('style');
    style.id = 'sparkle-styles';
    style.textContent = `
        @keyframes sparkle-animation {
            0% { 
                transform: scale(1) rotate(0deg); 
                opacity: 1; 
            }
            50% { 
                transform: scale(1.5) rotate(180deg); 
                opacity: 0.8; 
            }
            100% { 
                transform: scale(0) rotate(360deg); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(style);
}