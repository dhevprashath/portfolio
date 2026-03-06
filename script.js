/* ========================================
   RETRO PIXEL ART PORTFOLIO - SCRIPT.JS
   ======================================== */

// ========================================
// START SCREEN FUNCTIONALITY
// ========================================
const startScreen = document.getElementById('start-screen');
const gameInterface = document.getElementById('game-interface');
const startPrompt = document.querySelector('.start-prompt');

// Sound effect using Web Audio API (optional, creates a retro beep)
function playStartSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create oscillator for retro sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Retro game startup sound
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(554, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
    } catch (e) {
        // Audio not supported, continue silently
    }
}

// Start game function
function startGame() {
    playStartSound();
    startScreen.classList.add('hidden');
    gameInterface.classList.remove('hidden');
}

// Click to start
startPrompt.addEventListener('click', startGame);

// Also start on any key press
document.addEventListener('keydown', (e) => {
    if (!startScreen.classList.contains('hidden')) {
        startGame();
    }
});

// Also start on spacebar specifically
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !startScreen.classList.contains('hidden')) {
        e.preventDefault();
        startGame();
    }
});

// ========================================
// GAME MENU NAVIGATION
// ========================================
const menuItems = document.querySelectorAll('.menu-item');
const gameSections = document.querySelectorAll('.game-section');

// Menu item click handler
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetSection = item.getAttribute('data-section');
        
        // Play menu select sound
        playMenuSelectSound();
        
        // Update active menu item
        menuItems.forEach(menuItem => menuItem.classList.remove('active'));
        item.classList.add('active');
        
        // Show corresponding section
        gameSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetSection) {
                section.classList.add('active');
            }
        });
    });
    
    // Keyboard navigation
    item.addEventListener('mouseenter', () => {
        playMenuHoverSound();
    });
});

// Menu navigation sound
function playMenuHoverSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
    } catch (e) {
        // Continue silently
    }
}

function playMenuSelectSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    } catch (e) {
        // Continue silently
    }
}

// ========================================
// KEYBOARD NAVIGATION IN MENU
// ========================================
let currentMenuIndex = 0;

document.addEventListener('keydown', (e) => {
    if (startScreen.classList.contains('hidden')) {
        const visibleMenuItems = Array.from(menuItems).filter(item => 
            item.closest('.game-menu')
        );
        
        if (e.key === 'ArrowDown' || e.key === 's') {
            e.preventDefault();
            currentMenuIndex = Math.min(currentMenuIndex + 1, visibleMenuItems.length - 1);
            updateMenuSelection(visibleMenuItems);
        } else if (e.key === 'ArrowUp' || e.key === 'w') {
            e.preventDefault();
            currentMenuIndex = Math.max(currentMenuIndex - 1, 0);
            updateMenuSelection(visibleMenuItems);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            visibleMenuItems[currentMenuIndex].click();
        }
    }
});

function updateMenuSelection(items) {
    items.forEach((item, index) => {
        if (index === currentMenuIndex) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
}

// ========================================
// EASTER EGG - KONAMI CODE
// ========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
let konamiIndex = 0;
const easterEgg = document.getElementById('easter-egg');

document.addEventListener('keydown', (e) => {
    // Check for Konami code
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            // Konami code entered!
            showEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
    
    // Alternative: Press 'K' to toggle easter egg (for accessibility/testing)
    if (e.key === 'k' || e.key === 'K') {
        showEasterEgg();
    }
});

function showEasterEgg() {
    playEasterEggSound();
    easterEgg.classList.remove('hidden');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        easterEgg.classList.add('hidden');
    }, 5000);
}

function playEasterEggSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Victory fanfare
        const notes = [523, 659, 784, 1047];
        
        notes.forEach((freq, i) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.3);
            
            oscillator.start(audioContext.currentTime + i * 0.15);
            oscillator.stop(audioContext.currentTime + i * 0.15 + 0.3);
        });
    } catch (e) {
        // Continue silently
    }
}

// Close easter egg on click
easterEgg.addEventListener('click', () => {
    easterEgg.classList.add('hidden');
});

// ========================================
// QUEST CARD HOVER EFFECTS
// ========================================
const questCards = document.querySelectorAll('.quest-card');

questCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        playCardHoverSound();
    });
});

function playCardHoverSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.03);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.03);
    } catch (e) {
        // Continue silently
    }
}

// ========================================
// BUTTON CLICK EFFECTS
// ========================================
const buttons = document.querySelectorAll('button, .quest-btn, .social-btn, .submit-btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        playButtonClickSound();
    });
});

function playButtonClickSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Continue silently
    }
}

// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animations to sections
document.querySelectorAll('.game-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// ========================================
// FORM SUBMISSION HANDLING
// ========================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // FormSubmit will handle the submission
        playButtonClickSound();
    });
}

// ========================================
// TERMINAL TYPEWRITER EFFECT
// ========================================
const terminalTexts = document.querySelectorAll('.terminal-text');
let typingIndex = 0;

function typeWriter() {
    if (typingIndex < terminalTexts.length) {
        const text = terminalTexts[typingIndex].textContent;
        terminalTexts[typingIndex].textContent = '';
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                terminalTexts[typingIndex].textContent += text[charIndex];
                charIndex++;
            } else {
                clearInterval(typeInterval);
                typingIndex++;
                setTimeout(typeWriter, 500);
            }
        }, 50);
    }
}

// Start typing effect after game starts
document.addEventListener('click', function startTypingOnce() {
    if (startScreen.classList.contains('hidden')) {
        typeWriter();
        document.removeEventListener('click', startTypingOnce);
    }
}, { once: true });

// ========================================
// CURSOR EFFECT (Retro trailing cursor)
// ========================================
document.addEventListener('mousemove', (e) => {
    createCursorTrail(e);
});

function createCursorTrail(e) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: #00ff41;
        pointer-events: none;
        z-index: 9997;
        opacity: 0.6;
    `;
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 100);
}

// ========================================
// PARALLAX EFFECT (Subtle)
// ========================================
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelectorAll('.game-section.active').forEach(section => {
        section.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// ========================================
// SKILL ITEMS ANIMATION
// ========================================
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    }, index * 100);
});

// ========================================
// QUEST CARDS STAGGERED ANIMATION
// ========================================
questCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 150);
});

// ========================================
// PREVENT SCROLL ON START SCREEN
// ========================================
startScreen.addEventListener('wheel', (e) => {
    if (!startScreen.classList.contains('hidden')) {
        e.preventDefault();
    }
}, { passive: false });

// ========================================
// ADD KEYBOARD SHORTCUTS INFO
// ========================================
console.log('%c🎮 RETRO PORTFOLIO', 'font-size: 20px; color: #00ff41;');
console.log('%cKeyboard Shortcuts:', 'font-size: 14px; color: #00d4ff;');
console.log('- Arrow Keys / WASD: Navigate menu');
console.log('- Enter: Select menu item');
console.log('- Space: Start game');
console.log('- K: Secret easter egg');
console.log('%c🔐 Easter Egg: ↑ ↑ ↓ ↓ ← → ← →', 'font-size: 12px; color: #ff00ff;');

// ========================================
// MOBILE TOUCH SUPPORT
// ========================================
// Add touch support for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Throttle scroll events
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
});
