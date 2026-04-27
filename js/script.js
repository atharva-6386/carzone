// Smooth Scrolling with reduced motion support
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const selector = anchor.getAttribute("href");

        if (!selector || selector === "#") {
            return;
        }

        const target = document.querySelector(selector);

        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start"
        });
    });
});

// Contact Form Handling with Animation
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const car = String(formData.get("car") || "").trim();
        const message = String(formData.get("message") || "").trim();
        const successMessage = document.getElementById("successMessage");

        if (!name || !email || !phone || !car || !message || !successMessage) {
            alert("Please fill in all fields.");
            return;
        }

        successMessage.style.display = "block";
        successMessage.style.animation = "slideInDown 0.45s ease";
        contactForm.reset();

        setTimeout(() => {
            successMessage.style.animation = "slideOutUp 0.45s ease";
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 450);
        }, 3000);

        console.log("Form submitted:", { name, email, phone, car, message });
    });
}

// Scroll Animation Observer
const animatedCards = document.querySelectorAll(".brand-card, .car-card, .compare-card, .blog-card, .contact-form");

if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            instance.unobserve(entry.target);
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });

    animatedCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(28px)";
        card.style.transition = `opacity 0.6s ease ${index * 0.06}s, transform 0.6s ease ${index * 0.06}s`;
        observer.observe(card);
    });
} else {
    animatedCards.forEach((card) => {
        card.style.opacity = "1";
        card.style.transform = "none";
    });
}

// Active navigation highlight
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

// Image lazy loading with fade-in
document.querySelectorAll("img").forEach((img) => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.35s ease";

    const showImage = () => {
        img.style.opacity = "1";
    };

    if (img.complete) {
        showImage();
    } else {
        img.addEventListener("load", showImage, { once: true });
    }

    img.addEventListener("error", () => {
        img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%230f172a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23ffffff'%3ECar Image%3C/text%3E%3C/svg%3E";
        showImage();
    }, { once: true });
});

// Hero section setup
const hero = document.querySelector(".hero");
const heroTitle = document.querySelector(".hero-content h1");
if (hero && heroTitle) {
    hero.setAttribute("data-ready", "true");
}

// Dynamic CSS animations
const dynamicStyle = document.createElement("style");
dynamicStyle.textContent = `
    @keyframes slideInDown {
        from {
            transform: translateY(-18px);
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
            transform: translateY(-18px);
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
`;
document.head.appendChild(dynamicStyle);

// Service Worker registration
if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
            .then(() => console.log("CARZONE service worker registered"))
            .catch((error) => console.log("Service worker error:", error));
    });
}

console.log("🚗 CARZONE website loaded with animations!");
