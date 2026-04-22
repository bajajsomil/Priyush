// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1200,
        once: true,
    });

    // Countdown Timer
    const weddingDate = new Date("July 6, 2026 00:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("countdown").innerHTML = "<h3>The Celebration has Begun!</h3>";
        }
    };

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollPos * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrollPos / 700);
    }
});
