// Welcome Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-invitation');
    if(openBtn) {
        openBtn.addEventListener('click', function() {
            // Hide welcome screen
            document.getElementById('welcome-screen').classList.add('hidden');
            // Allow scrolling
            document.body.classList.remove('no-scroll');
            
            // Trigger a massive confetti burst!
            var duration = 3 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            var interval = setInterval(function() {
                var timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                var particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);

            // Refresh AOS animations after the overlay is gone
            setTimeout(() => {
                AOS.refresh();
            }, 500);
        });
    }
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    once: false, // whether animation should happen only once - while scrolling down
    offset: 100, // offset (in px) from the original trigger point
});

// Floating Hearts Generator
function createHearts() {
    const container = document.getElementById('hearts-container');
    const heartCount = 15; // Number of hearts

    for (let i = 0; i < heartCount; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Randomize position, size, and animation duration
        let leftPosition = Math.random() * 100;
        let animDuration = Math.random() * 10 + 10; // 10s to 20s
        let animDelay = Math.random() * 15; // 0s to 15s

        heart.style.left = leftPosition + 'vw';
        heart.style.animationDuration = animDuration + 's';
        heart.style.animationDelay = animDelay + 's';
        
        container.appendChild(heart);
    }
}

createHearts();

// Sparkle Generator
function createSparkles() {
    const container = document.getElementById('sparkles');
    if (!container) return;
    const sparkleCount = 30;

    for (let i = 0; i < sparkleCount; i++) {
        let sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        let leftPosition = Math.random() * 100;
        let topPosition = Math.random() * 100;
        let size = Math.random() * 4 + 2;
        let animDuration = Math.random() * 2 + 2;
        let animDelay = Math.random() * 5;

        sparkle.style.left = leftPosition + 'vw';
        sparkle.style.top = topPosition + 'vh';
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        sparkle.style.animationDuration = animDuration + 's';
        sparkle.style.animationDelay = animDelay + 's';
        
        container.appendChild(sparkle);
    }
}

createSparkles();

// Countdown Timer
const weddingDate = new Date("Jun 18, 2026 07:30:00").getTime();

const countdownTimer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in elements
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdown").innerHTML = "<div style='font-size:1.5rem;font-weight:bold;color:var(--primary-color)'>Just Married!</div>";
    }
}, 1000);

// Confetti Button Effect
document.getElementById('blessingBtn').addEventListener('click', function() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // Change button text temporarily
    const btn = this;
    const originalText = btn.innerHTML;
    btn.innerHTML = "நன்றி! / Thank you! ❤️";
    setTimeout(() => {
        btn.innerHTML = originalText;
    }, 3000);
});
