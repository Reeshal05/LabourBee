
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('🐝 Labour Bee is buzzing! All systems ready.');

    
    
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
  
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                this.textContent = '☰';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '24px';
                navLinks.style.background = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.borderRadius = '12px';
                navLinks.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                this.textContent = '✕';
            }
        });

        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    mobileMenuBtn.textContent = '☰';
                }
            }
        });

      
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
                navLinks.style.background = 'transparent';
                navLinks.style.padding = '0';
                navLinks.style.boxShadow = 'none';
            } else {
                navLinks.style.display = 'none';
                mobileMenuBtn.textContent = '☰';
            }
        });
    }
    
  
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    

    const animatedElements = document.querySelectorAll(
        '.service-card, .provider-card, .feature-item, .stat-card, .service-detail, .commitment-card, .faq-item'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(element);
    });
    
   
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
          
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
        
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields! ⚠️', 'error');
                return;
            }
            
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address! 📧', 'error');
                return;
            }
            
            
            if (name.length < 2) {
                showNotification('Please enter your full name! 👤', 'error');
                return;
            }
            
     
            if (message.length < 10) {
                showNotification('Please write a more detailed message! ✍️', 'error');
                return;
            }
            
          
            showNotification('Thank you! We\'ll buzz back to you soon! 🐝💛', 'success');
            
            console.log('Form submitted:', { name, email, phone, subject, message });
            
           
            contactForm.reset();
        });
    }
    
   
    function showNotification(message, type = 'success') {
        
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
      
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: ${type === 'success' ? '#06D6A0' : '#EF476F'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-weight: 600;
            max-width: 400px;
        `;
        
        
        if (!document.getElementById('notificationStyles')) {
            const style = document.createElement('style');
            style.id = 'notificationStyles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
   
        document.body.appendChild(notification);
        
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    window.showNotification = showNotification;
    

    
    const providerBtns = document.querySelectorAll('.provider-btn');
    
    providerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const providerCard = this.closest('.provider-card');
            const providerName = providerCard.querySelector('.provider-name').textContent;
            const providerRole = providerCard.querySelector('.provider-role').textContent;
            
            showNotification(`Booking request sent to ${providerName} (${providerRole})! 🐝`, 'success');
            
            
            const originalText = this.textContent;
            this.textContent = '✓ Request Sent!';
            this.style.background = '#06D6A0';
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                this.style.transform = '';
            }, 2000);
        });
    });
    
  
    
    const serviceDetailBtns = document.querySelectorAll('.service-detail .btn-primary');
    
    serviceDetailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceDetail = this.closest('.service-detail');
            const serviceName = serviceDetail.querySelector('h2').textContent;
            
            showNotification(`Searching for ${serviceName} providers near you! 🔍`, 'success');
            
            
            const originalText = this.textContent;
            this.innerHTML = '⏳ Searching...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1500);
        });
    });
    
   
    
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #FDB833;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(253, 184, 51, 0.3);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s;
        z-index: 999;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });
    
   
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#F77F00';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#FDB833';
    });
    
   
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const navLinksArray = document.querySelectorAll('.nav-links a');
    navLinksArray.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    
    
    function animateCounter(element, target, duration = 2000) {
        const isStarRating = element.textContent.includes('★');
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                if (isStarRating) {
                    element.textContent = target + '★';
                } else {
                    element.textContent = formatNumber(target);
                }
                clearInterval(timer);
            } else {
                if (isStarRating) {
                    element.textContent = current.toFixed(1) + '★';
                } else {
                    element.textContent = formatNumber(Math.floor(current));
                }
            }
        }, 16);
    }
    
    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        return num + '+';
    }
    
    
    const statNumbers = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                
               
                if (text.includes('★')) {
                    const number = parseFloat(text.replace('★', ''));
                    if (!isNaN(number)) {
                        entry.target.textContent = '0.0★';
                        animateCounter(entry.target, number);
                    }
                }
               
                else if (text.includes('/')) {
                    
                    return;
                }
                
                else {
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (!isNaN(number)) {
                        entry.target.textContent = '0';
                        animateCounter(entry.target, number);
                    }
                }
                
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statObserver.observe(stat));
    
    
    
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    

    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', function() {
            const isActive = this.classList.contains('faq-active');
            
           
            faqItems.forEach(i => {
                i.classList.remove('faq-active');
                const p = i.querySelector('p');
                if (p) p.style.display = 'block';
            });
            
           
            if (!isActive) {
                this.classList.add('faq-active');
                this.style.borderLeft = '4px solid #FDB833';
            } else {
                this.style.borderLeft = 'none';
            }
        });
    });
    
   
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.3s';
            document.body.style.opacity = '1';
        }, 100);
    });
    

    
    console.log('%c🐝 Labour Bee', 'font-size: 24px; font-weight: bold; color: #FDB833;');
    console.log('%cBuilt with 💛 for the community', 'font-size: 14px; color: #2B2D42;');
    console.log('%cLooking for a job? Email us at: careers@labourbee.com', 'font-size: 12px; color: #06BEE1;');
});


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}