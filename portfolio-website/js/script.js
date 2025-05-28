// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Ensure the theme toggle button exists before adding listeners
    if (themeToggle) {
        // Check for saved theme preference or default to 'professional'
        const currentTheme = localStorage.getItem('theme') || 'professional';
        body.setAttribute('data-theme', currentTheme);

        // Update toggle button text/state if needed (example)
        // themeToggle.textContent = currentTheme === 'professional' ? 'Fun Mode' : 'Pro Mode';


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

            // Update toggle button text/state if needed (example)
            // themeToggle.textContent = newTheme === 'professional' ? 'Fun Mode' : 'Pro Mode';


            // Optional: Add some fun effects when switching to fun mode
            if (newTheme === 'fun') {
                // Make sure createSparkles is defined elsewhere or define it here
                if (typeof createSparkles === 'function') {
                    createSparkles();
                } else {
                    console.log('createSparkles function is not defined, but fun mode activated!');
                    // You could add a simple placeholder effect here if createSparkles isn't ready
                    // For example, a quick body flash or console message
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

// Placeholder or example for createSparkles function
// You'll need to implement this function to actually create sparkles
/*
function createSparkles() {
    console.log('Sparkle effect activated!');
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle'); // You'll need to style this class in CSS
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.animationDuration = Math.random() * 1 + 0.5 + 's'; // Vary duration
        document.body.appendChild(sparkle);
        setTimeout(() => {
            sparkle.remove();
        }, 1500); // Remove sparkles after animation
    }
}

// Example CSS for .sparkle (add to your stylesheet):
// .sparkle {
//     position: fixed;
//     width: 10px;
//     height: 10px;
//     background-color: #FFD700; // Gold color
//     border-radius: 50%;
//     pointer-events: none;
//     animation: sparkle-animation 1s forwards;
//     z-index: 9999;
// }

// @keyframes sparkle-animation {
//     0% { transform: scale(1); opacity: 1; }
//     100% { transform: scale(0); opacity: 0; }
// }
*/