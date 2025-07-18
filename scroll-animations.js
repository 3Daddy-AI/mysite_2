// Advanced Scroll Animations
function initAdvancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Apply different animation types to different sections
    const linksSection = document.querySelector('#links');
    if (linksSection) {
        linksSection.classList.add('section-slide-left');
        observer.observe(linksSection);
    }

    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        aboutSection.classList.add('section-fade-up');
        observer.observe(aboutSection);
    }

    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.classList.add('section-slide-right');
        observer.observe(contactSection);
    }

    // Animate link buttons with wave effect
    const linkButtons = document.querySelectorAll('.link-button');
    linkButtons.forEach((button, index) => {
        button.classList.add('link-wave');
        button.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(button);
    });

    // Animate cards
    const cards = document.querySelectorAll('.about-card, .stat-card');
    cards.forEach((card, index) => {
        card.classList.add('card-animate');
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // Animate form elements
    const formElements = document.querySelectorAll('.form-group, .submit-btn');
    formElements.forEach((element, index) => {
        element.classList.add('scroll-animate');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Smooth section transitions with progress indicator
    const sections = document.querySelectorAll('section');
    const progressBar = createProgressBar();
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

// Create progress bar for scroll indication
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00FFFF, #FF00FF);
        z-index: 9999;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px #00FFFF;
    `;
    document.body.appendChild(progressBar);
    return progressBar;
}
