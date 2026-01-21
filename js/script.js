// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Contact Form Handling with Animation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const car = document.getElementById('car').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !phone || !car || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show success message with animation
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        successMessage.style.animation = 'slideInDown 0.5s ease';
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOutUp 0.5s ease';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 500);
        }, 5000);
        
        console.log('Form submitted:', { name, email, phone, car, message });
    });
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) rotate(0deg)';
        }
    });
}, observerOptions);

// Observe all cards with staggered animation
document.querySelectorAll('.brand-card, .car-card, .compare-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) rotate(-2deg)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Active navigation highlight
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// Animated button effects
document.querySelectorAll('.btn, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease';
    });
    
    button.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Image lazy loading fallback with fade-in
document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';

    // Check if image is already loaded (cached or fast loading)
    if (img.complete) {
        img.style.opacity = '1';
    }

    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });

    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%232a2a2a"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23ffffff"%3ECar Image%3C/text%3E%3C/svg%3E';
        this.style.opacity = '1';
    });
});

// Add floating animation to cards on hover
document.querySelectorAll('.brand-card, .car-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'float 2s ease-in-out infinite';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
});

// Dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            transform: translateY(-50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutUp {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(-15px) scale(1.02);
        }
        50% {
            transform: translateY(-20px) scale(1.02);
        }
    }
    
    @keyframes shimmer {
        0% {
            background-position: -1000px 0;
        }
        100% {
            background-position: 1000px 0;
        }
    }
`;
document.head.appendChild(style);

// Add sparkle effect on button clicks
document.querySelectorAll('.btn, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '5px';
        sparkle.style.height = '5px';
        sparkle.style.borderRadius = '50%';
        sparkle.style.background = 'white';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.animation = 'sparkleAnimation 0.6s ease-out';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 600);
    });
});

// Sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(4) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    navbar.style.transition = 'transform 0.3s ease';
    lastScroll = currentScroll;
});

// Add typing effect to hero text
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 500);
}

console.log('🚗 CARZONE website loaded with animations!');
