document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects
    const hoverables = document.querySelectorAll('a, .hotspot');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '50px';
            cursorOutline.style.height = '50px';
            cursorOutline.style.backgroundColor = 'rgba(215, 25, 32, 0.1)';
            cursorOutline.style.borderColor = 'var(--color-red)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'rgba(0,0,0,0.5)';
        });
    });

    // Scroll Reveal
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        // section.classList.add('hidden'); // Optional: disable for now to avoid layout shift issues with 3D
        observer.observe(section);
    });

    // Glitch Effect
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        const originalText = glitchText.getAttribute('data-text');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*';

        glitchText.addEventListener('mouseover', () => {
            let iterations = 0;
            const interval = setInterval(() => {
                glitchText.innerText = originalText
                    .split('')
                    .map((letter, index) => {
                        if (index < iterations) return originalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                if (iterations >= originalText.length) clearInterval(interval);
                iterations += 1 / 3;
            }, 30);
        });
    }

    // Number Scramble
    const specs = document.querySelectorAll('.spec-item .value');
    const specObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.innerText;
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
                let iterations = 0;

                const interval = setInterval(() => {
                    target.innerText = finalValue
                        .split('')
                        .map((letter, index) => {
                            if (index < iterations) return finalValue[index];
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');

                    if (iterations >= finalValue.length) clearInterval(interval);
                    iterations += 1 / 5;
                }, 50);
                specObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    specs.forEach(spec => specObserver.observe(spec));

    // Hotspot Interaction
    const hotspots = document.querySelectorAll('.hotspot');
    const infoBox = document.createElement('div');
    infoBox.classList.add('hotspot-info');
    document.body.appendChild(infoBox);

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('mouseenter', () => {
            const info = hotspot.getAttribute('data-info');
            infoBox.innerText = info;
            infoBox.style.opacity = '1';
            infoBox.style.transform = 'translateY(0)';

            // Position fixed relative to viewport for simplicity in full screen
            infoBox.style.bottom = '4rem';
            infoBox.style.right = '4rem';
            infoBox.style.left = 'auto';
            infoBox.style.top = 'auto';
        });

        hotspot.addEventListener('mouseleave', () => {
            infoBox.style.opacity = '0';
            infoBox.style.transform = 'translateY(20px)';
        });
    });

    // Fix for custom cursor over iframes
    // We can't track mouse over iframe, so we hide the custom cursor via CSS (opacity: 0)
    // and let the system cursor take over.
    // This script ensures the custom cursor comes back when leaving the iframe.
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        iframe.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
    });

    // Technical Flyouts Trigger
    const techOverlays = document.querySelectorAll('.tech-overlay');
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.3 });

    techOverlays.forEach(overlay => {
        // Observe the parent machine card to trigger the overlay
        techObserver.observe(overlay.parentElement);
    });
});
