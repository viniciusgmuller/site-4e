/**
 * 4E - Consultoria em Educação
 * JavaScript Principal - Animações e Interações
 */

// ============================================
// GSAP Configuration
// ============================================
gsap.registerPlugin(ScrollTrigger);

// ============================================
// Loader Animation
// ============================================
const loader = document.getElementById('loader');
const loaderLogo = document.querySelector('.loader-logo');
const loaderProgress = document.getElementById('loader-progress');

window.addEventListener('load', () => {
  // Check if loader exists
  if (loader && loaderLogo && loaderProgress) {
    // Animate loader logo
    gsap.to(loaderLogo, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });

    // Animate progress bar
    gsap.to(loaderProgress, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut',
      onComplete: () => {
        // Hide loader
        gsap.to(loader, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => {
            loader.style.display = 'none';
            // Start page animations
            initPageAnimations();
          }
        });
      }
    });
  } else {
    // No loader - start animations immediately
    initPageAnimations();
  }
});

// ============================================
// Custom Cursor
// ============================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (cursor && cursorFollower) {
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let followerX = 0;
  let followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor animation
  function animateCursor() {
    // Cursor follows immediately
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Follower is delayed
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .service-card, .magnetic');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorFollower.classList.remove('hover');
    });
  });
}

// ============================================
// Header Scroll Effect
// ============================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================
// Mobile Menu
// ============================================
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ============================================
// Page Animations Init
// ============================================
function initPageAnimations() {
  // Hero animations
  animateHero();

  // Reveal animations
  initRevealAnimations();

  // Stats counter
  initStatsCounter();

  // Magnetic buttons
  initMagneticButtons();
}

// ============================================
// Hero Animations
// ============================================
function animateHero() {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroBadge = document.querySelector('.hero-badge');
  const heroCTA = document.querySelector('.hero-cta');
  const heroScroll = document.querySelector('.hero-scroll');

  if (!heroTitle) return;

  const words = heroTitle.querySelectorAll('.word');

  const tl = gsap.timeline({ delay: 0.5 });

  // Badge
  if (heroBadge) {
    tl.from(heroBadge, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  // Title words
  words.forEach((word, i) => {
    tl.to(word, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }, `-=${i > 0 ? 0.7 : 0}`);
  });

  // Subtitle
  if (heroSubtitle) {
    tl.from(heroSubtitle, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');
  }

  // CTA
  if (heroCTA) {
    tl.from(heroCTA.children, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');
  }

  // Scroll indicator
  if (heroScroll) {
    tl.from(heroScroll, {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.3');
  }
}

// ============================================
// Reveal Animations
// ============================================
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach(el => {
    // Check if element is already in viewport
    const rect = el.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight * 0.85;

    if (isInViewport) {
      // Element already visible - activate with small delay for stagger effect
      const delay = el.classList.contains('reveal-delay-1') ? 100 :
                    el.classList.contains('reveal-delay-2') ? 200 :
                    el.classList.contains('reveal-delay-3') ? 300 :
                    el.classList.contains('reveal-delay-4') ? 400 : 0;
      setTimeout(() => el.classList.add('active'), delay);
    } else {
      // Element not yet visible - use ScrollTrigger
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('active'),
        once: true
      });
    }
  });
}

// ============================================
// Stats Counter Animation
// ============================================
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number[data-count]');

  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(stat, {
          textContent: target,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function() {
            stat.textContent = Math.round(this.targets()[0].textContent);
            if (stat.textContent === target.toString() && stat.closest('.stat-item').querySelector('.stat-label').textContent.includes('%')) {
              stat.textContent += '%';
            } else if (stat.textContent === target.toString() && target >= 100) {
              stat.textContent += '+';
            }
          }
        });
      },
      once: true
    });
  });
}

// ============================================
// Magnetic Buttons
// ============================================
function initMagneticButtons() {
  const magneticElements = document.querySelectorAll('.magnetic');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 100
        },
        ease: 'power3.inOut'
      });
    }
  });
});

// ============================================
// Parallax Effect on Hero Orbs
// ============================================
const heroOrbs = document.querySelectorAll('.hero-gradient-orb');

if (heroOrbs.length > 0) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroOrbs.forEach((orb, i) => {
      const speed = 0.1 + (i * 0.05);
      gsap.to(orb, {
        y: scrolled * speed,
        duration: 0.5,
        ease: 'none'
      });
    });
  });
}

// ============================================
// Tabs Functionality
// ============================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');

    // Remove active class from all
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked
    button.classList.add('active');
    document.getElementById(tabId)?.classList.add('active');
  });
});

// ============================================
// Form Validation
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation
    const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#ef4444';
      } else {
        input.style.borderColor = '';
      }
    });

    if (isValid) {
      // Here you would typically send the form data
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      contactForm.reset();
    }
  });
}

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// ============================================
// Service Cards Tilt Effect
// ============================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
});

// ============================================
// Page Transition (for multi-page navigation)
// ============================================
const pageTransition = () => {
  const links = document.querySelectorAll('a:not([href^="#"]):not([href^="mailto"]):not([href^="tel"])');

  links.forEach(link => {
    // Only for internal links
    if (link.hostname === window.location.hostname) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.href;

        // Fade out animation
        gsap.to('main', {
          opacity: 0,
          y: -30,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            window.location.href = target;
          }
        });
      });
    }
  });
};

// Initialize page transition only if not on loader
if (!loader || loader.style.display === 'none') {
  pageTransition();
}

// ============================================
// Debug Mode (press 'D' key)
// ============================================
let debugMode = false;
document.addEventListener('keydown', (e) => {
  if (e.key === 'd' && e.ctrlKey) {
    debugMode = !debugMode;
    document.body.classList.toggle('debug-mode', debugMode);
    console.log('Debug mode:', debugMode ? 'ON' : 'OFF');
  }
});

// ============================================
// Performance: Disable animations on low-end devices
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  gsap.globalTimeline.timeScale(10); // Speed up all animations
  // Or disable completely:
  // gsap.globalTimeline.pause();
}

console.log('4E Website - Initialized');
console.log('Built with GSAP and creativity');
