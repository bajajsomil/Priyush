document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic'
    });

    // Custom Cursor tracking
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    // Disable on touch devices
    if(window.matchMedia("(any-pointer: fine)").matches) {
        if (cursor && follower) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                // Add a slight delay to the follower
                setTimeout(() => {
                    follower.style.left = e.clientX + 'px';
                    follower.style.top = e.clientY + 'px';
                }, 80);
            });
        }
    } else {
        if(cursor) cursor.style.display = 'none';
        if(follower) follower.style.display = 'none';
    }

    // Countdown Timer Logic
    const weddingDate = new Date("July 6, 2026 00:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            const countdownEl = document.getElementById("countdown");
            if (countdownEl) {
                countdownEl.innerHTML = "<h3 class='script-quote' style='grid-column: 1/-1;'>The Celebration has Begun!</h3>";
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const setTime = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val.toString().padStart(2, '0');
        };

        setTime("days", days);
        setTime("hours", hours);
        setTime("minutes", minutes);
        setTime("seconds", seconds);
    };

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);

    // Music Control
    const musicBtn = document.getElementById('music-control');
    let isPlaying = false;
    const audio = new Audio();
    audio.loop = true;
    audio.src = "https://archive.org/download/Mangalyam/Mangalyam.mp3";

    // Add class for custom cursor scaling when hovering a links and buttons
    const interactables = document.querySelectorAll('a, button, .music-btn');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(cursor) cursor.classList.add('custom-cursor-target');
        });
        el.addEventListener('mouseleave', () => {
            if(cursor) cursor.classList.remove('custom-cursor-target');
        });
    });

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (!isPlaying) {
                audio.play().catch(e => console.log("Audio play blocked"));
                musicBtn.querySelector('.music-icon').innerText = "🔊";
                musicBtn.classList.add('pulse-glow');
            } else {
                audio.pause();
                musicBtn.querySelector('.music-icon').innerText = "🎵";
                musicBtn.classList.remove('pulse-glow');
            }
            isPlaying = !isPlaying;
        });
    }
});

// Parallax for Hero Image slightly moving on scroll
window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollPos * 0.25}px)`;
        heroContent.style.opacity = 1 - (scrollPos / 800);
    }
});
