// Wait for preloader before firing hero animations
window.initHeroAnimations = function() {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    // Hero Text Reveal
    tl.fromTo('.hero-greeting', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo('.hero-name', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
    )
    .fromTo('.hero-subtitle', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
    )
    .fromTo('.hero-actions .btn', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" },
        "-=0.4"
    )
    .fromTo('.social-icons a', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.2"
    );

    // Initialize all ScrollTriggers after hero animation
    initScrollAnimations();
};

function initScrollAnimations() {
    // Reveal Text (Titles)
    const revealTitles = document.querySelectorAll('.reveal-text');
    revealTitles.forEach(title => {
        gsap.fromTo(title, 
            { y: 50, opacity: 0, visibility: 'hidden' },
            { 
                y: 0, 
                opacity: 1, 
                visibility: 'visible',
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Reveal Fade (Paragraphs, Cards)
    const revealFades = document.querySelectorAll('.reveal-fade');
    revealFades.forEach(el => {
        gsap.fromTo(el, 
            { y: 40, opacity: 0, visibility: 'hidden' },
            { 
                y: 0, 
                opacity: 1, 
                visibility: 'visible',
                duration: 0.8, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Reveal Image
    const revealImages = document.querySelectorAll('.reveal-image');
    revealImages.forEach(img => {
        gsap.fromTo(img,
            { scale: 0.8, opacity: 0, visibility: 'hidden' },
            {
                scale: 1,
                opacity: 1,
                visibility: 'visible',
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Skills Cloud Stagger
    gsap.fromTo('.skill-tag',
        { y: 30, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.skills-cloud',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
}

// Ensure GSAP works smoothly with responsive resizing
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
