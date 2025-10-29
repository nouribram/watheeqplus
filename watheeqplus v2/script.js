let currentLanguage = 'ar';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    const html = document.documentElement;
    const langText = document.getElementById('lang-text');
    
    if (currentLanguage === 'en') {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        langText.textContent = 'AR';
        updateContent('en');
    } else {
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        langText.textContent = 'EN';
        updateContent('ar');
    }
}

function updateContent(lang) {
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(el => {
        const content = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = content;
        } else {
            el.textContent = content;
        }
    });

    const placeholderElements = document.querySelectorAll('[data-placeholder-ar][data-placeholder-en]');
    placeholderElements.forEach(el => {
        const placeholder = lang === 'ar' ? el.getAttribute('data-placeholder-ar') : el.getAttribute('data-placeholder-en');
        el.placeholder = placeholder;
    });
}

const magicCursor = document.querySelector('.magic-cursor');
document.addEventListener('mousemove', (e) => {
    magicCursor.style.left = e.clientX + 'px';
    magicCursor.style.top = e.clientY + 'px';
    magicCursor.style.opacity = '1';
});

function createParticles() {
    const container = document.querySelector('.particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = i % 2 === 0 ? '#D4AF37' : '#3B82F6';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.animation = `particle-float ${Math.random() * 10 + 5}s infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);
    }
}

createParticles();

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .timeline-item, .expertise-card, .testimonial-card, .pricing-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    fadeInObserver.observe(el);
});

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.textContent === '0') {
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    alert(currentLanguage === 'ar' 
        ? 'شكراً لتواصلك معنا! سنرد عليك قريباً.' 
        : 'Thank you for contacting us! We will reply soon.');
    
    contactForm.reset();
});

const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(currentLanguage === 'ar' 
        ? 'تم الاشتراك بنجاح!' 
        : 'Successfully subscribed!');
    newsletterForm.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showTestimonial(index) {
    testimonials.forEach((card, i) => {
        if (window.innerWidth <= 768) {
            card.style.display = i === index ? 'block' : 'none';
        }
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
}

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
mobileMenuToggle.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
    
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
});
/*
document.addEventListener('DOMContentLoaded', () => {
    const heroBackground = document.querySelector('.hero-background');
    
    const gradients = [
        'linear-gradient(135deg, #0A0E27 0%, #1E3A8A 50%, #0A0E27 100%)',
        'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #1E3A8A 100%)',
        'linear-gradient(135deg, #0A0E27 0%, #3B82F6 30%, #D4AF37 70%, #0A0E27 100%)'
    ];
    
    let currentGradient = 0;
    setInterval(() => {
        currentGradient = (currentGradient + 1) % gradients.length;
        heroBackground.style.background = gradients[currentGradient];
    }, 8000);
});
*/
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-hero-primary, .btn-hero-secondary, .btn-pricing, .btn-submit').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.left = e.offsetX - 50 + 'px';
        ripple.style.top = e.offsetY - 50 + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
