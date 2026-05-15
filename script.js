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

// Audio Control
function initAudioControl() {
    const audio = document.getElementById('background-music');
    const musicBtn = document.getElementById('music-control');
    
    if (!audio || !musicBtn) return;

    // Try to play immediately (will be muted initially)
    audio.play().catch(error => {
        console.log('Autoplay blocked - will play on interaction');
    });

    // Unmute and ensure playing on first user interaction
    const unmuteOnInteraction = () => {
        audio.muted = false;
        audio.play().then(() => {
            musicBtn.classList.add('playing');
            musicBtn.querySelector('.icon').innerText = '🎵';
        });
        document.removeEventListener('click', unmuteOnInteraction);
        document.removeEventListener('touchstart', unmuteOnInteraction);
    };

    document.addEventListener('click', unmuteOnInteraction);
    document.addEventListener('touchstart', unmuteOnInteraction);

    musicBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent trigger the unmuteOnInteraction if still active
        if (audio.paused) {
            audio.muted = false;
            audio.play();
            musicBtn.classList.remove('paused');
            musicBtn.classList.add('playing');
            musicBtn.querySelector('.icon').innerText = '🎵';
        } else {
            audio.pause();
            musicBtn.classList.remove('playing');
            musicBtn.classList.add('paused');
            musicBtn.querySelector('.icon').innerText = '🔇';
        }
    });
}

initAudioControl();

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

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightboxBtn = document.querySelector('.close-lightbox');
const galleryImages = document.querySelectorAll('.gallery-img, .couple-img');

if (lightbox) {
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightboxImg.src = this.src;
            document.body.style.overflow = 'hidden';
        });
    });

    closeLightboxBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// RSVP Modal Logic
const rsvpModal = document.getElementById('rsvp-modal');
const blessingBtn = document.getElementById('blessingBtn');
const closeModalBtn = document.querySelector('.close-modal');
const rsvpForm = document.getElementById('rsvp-form');
const formSuccess = document.getElementById('form-success');

if(blessingBtn && rsvpModal) {
    blessingBtn.addEventListener('click', function(e) {
        e.preventDefault();
        rsvpModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

if(closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
        rsvpModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            rsvpForm.style.display = 'block';
            formSuccess.style.display = 'none';
            rsvpForm.reset();
        }, 300);
    });
}

window.addEventListener('click', function(e) {
    if (e.target === rsvpModal) {
        rsvpModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

if(rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = "Sending... ⏳";
        submitBtn.disabled = true;

        const guestName = document.getElementById('guest-name').value;
        const guestMessage = document.getElementById('guest-message').value;

        // --- FORM COLLECTION SETUP ---
        // 1. Go to https://formspree.io/ and create a free account
        // 2. Create a new form
        // 3. Copy the 8-character form ID from the URL they give you
        // 4. Replace 'YOUR_FORM_ID' below with that ID
        const formspreeEndpoint = "https://formspree.io/f/mlgzkaqj";

        fetch(formspreeEndpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: guestName,
                Message: guestMessage
            })
        }).then(response => {
            if (response.ok || formspreeEndpoint.includes("YOUR_FORM_ID")) {
                // If it succeeds (or if you are just testing without an ID yet)
                rsvpForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Confetti!
                var duration = 3 * 1000;
                var animationEnd = Date.now() + duration;
                var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10001 };

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

                setTimeout(() => {
                    rsvpModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    setTimeout(() => {
                        rsvpForm.style.display = 'block';
                        formSuccess.style.display = 'none';
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        rsvpForm.reset();
                    }, 300);
                }, 4000);
            } else {
                alert("Oops! There was a problem submitting your wishes. Please try again.");
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        }).catch(error => {
            // Note: If testing locally without a valid form ID, it might fall here
            if(formspreeEndpoint.includes("YOUR_FORM_ID")) {
                alert("To actually collect responses, please replace 'YOUR_FORM_ID' in script.js with a real Formspree ID!");
            } else {
                alert("Oops! There was a problem submitting your wishes. Please check your connection.");
            }
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}
