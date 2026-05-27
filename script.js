document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Hero Background Slow Zoom
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) hero.classList.add('loaded');
    }, 100);

    // 3. Scroll Reveal Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 4. Reviews Carousel Logic
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    const dotsContainer = document.getElementById('carouselDots');

    if (track && prevBtn && nextBtn) {
        const cards = Array.from(track.children);
        let currentIndex = 0;
        let autoPlayInterval;

        // Function to determine how many cards are visible
        const getVisibleCardsCount = () => {
            return window.innerWidth > 768 ? 2 : 1;
        };

        const getMaxIndex = () => {
            return cards.length - getVisibleCardsCount();
        };

        // Create navigation dots
        const createDots = () => {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const visibleCount = getVisibleCardsCount();
            const totalDots = cards.length - visibleCount + 1;
            
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    resetAutoPlay();
                });
                dotsContainer.appendChild(dot);
            }
        };

        const updateCarousel = () => {
            const visibleCount = getVisibleCardsCount();
            // Bound index
            if (currentIndex < 0) currentIndex = 0;
            const maxIndex = cards.length - visibleCount;
            if (currentIndex > maxIndex) currentIndex = maxIndex;

            // Calculate translation percentage
            const cardWidthPercent = visibleCount === 2 ? 50 : 100;
            const translation = currentIndex * cardWidthPercent;
            
            track.style.transform = `translateX(-${translation}%)`;

            // Update dots
            if (dotsContainer) {
                const dots = Array.from(dotsContainer.children);
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateCarousel();
        };

        const nextSlide = () => {
            const maxIndex = cards.length - getVisibleCardsCount();
            if (currentIndex >= maxIndex) {
                currentIndex = 0; // Wrap around
            } else {
                currentIndex++;
            }
            updateCarousel();
        };

        const prevSlide = () => {
            if (currentIndex <= 0) {
                currentIndex = cards.length - getVisibleCardsCount(); // Wrap around
            } else {
                currentIndex--;
            }
            updateCarousel();
        };

        // Event listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        // Initialize dots & alignment on window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                createDots();
                updateCarousel();
            }, 100);
        });

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        };

        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };

        // Initialize
        createDots();
        updateCarousel();
        startAutoPlay();
    }
});
