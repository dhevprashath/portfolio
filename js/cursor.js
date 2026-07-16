document.addEventListener('DOMContentLoaded', () => {
    // Only init custom cursor on non-touch devices
    if(window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');
    
    if(!cursor || !cursorFollower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Main cursor follows instantly
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Smooth follow for the follower circle
    function animateCursor() {
        // Easing factor
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .hover-target');
    
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = 0;
        cursorFollower.style.opacity = 0;
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = 1;
        cursorFollower.style.opacity = 1;
    });
});
