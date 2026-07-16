document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Logic
    const preloader = document.querySelector('.preloader');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const progressBar = document.querySelector('.progress-bar');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Fade out preloader
            gsap.to(preloader, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    preloader.style.display = 'none';
                    // Trigger hero animations
                    if(typeof window.initHeroAnimations === 'function') {
                        window.initHeroAnimations();
                    }
                }
            });
        }
        loadingPercentage.textContent = `${progress}%`;
        progressBar.style.width = `${progress}%`;
    }, 100);

    // 2. Navbar Scroll Effect & Mobile Menu
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle hamburger to cross animation
        const spans = navToggle.querySelectorAll('span');
        if(navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }
    });

    // 3. Typewriter Effect
    const phrases = ["AI & Machine Learning Student", "Backend Developer", "Java Developer", "MERN Stack Developer", "Problem Solver"];
    let phraseIndex = 0;
    let letterIndex = 0;
    let currentPhrase = "";
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter');

    function type() {
        if(!typewriterElement) return;

        if (isDeleting) {
            currentPhrase = phrases[phraseIndex].substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            currentPhrase = phrases[phraseIndex].substring(0, letterIndex + 1);
            letterIndex++;
        }

        typewriterElement.textContent = currentPhrase;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && letterIndex === phrases[phraseIndex].length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typewriter after a short delay
    setTimeout(type, 2000);

    // 4. 3D Tilt Effect on Cards
    const tiltElements = document.querySelectorAll('.hover-tilt');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Set css variables for glow effect
            el.style.setProperty('--mouse-x', `${x}px`);
            el.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
});
