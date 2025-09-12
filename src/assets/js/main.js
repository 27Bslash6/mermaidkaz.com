/**
 * MermaidKaz - Main JavaScript
 * Professional mermaid website functionality
 */

(function() {
  'use strict';

  // DOM Ready handler
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // Initialize all functionality when DOM is ready
  ready(function() {
    initMobileMenu();
    initSmoothScroll();
    initScrollToTop();
    initFormValidation();
    initLazyLoading();
    initAccessibilityEnhancements();
    initPerformanceOptimizations();
  });

  /**
   * Mobile Menu Functionality
   */
  function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle menu visibility
      navMenu.classList.toggle('show');
      
      // Update ARIA attributes
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle hamburger animation
      menuToggle.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Smooth Scrolling for Internal Links
   */
  function initSmoothScroll() {
    // Get all internal links that start with #
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just #
        if (href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          // Calculate offset for fixed header
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          // Smooth scroll to target
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update focus for accessibility
          target.focus({ preventScroll: true });
          
          // Close mobile menu if open
          const navMenu = document.querySelector('nav ul');
          const menuToggle = document.querySelector('.mobile-menu-toggle');
          if (navMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      });
    });
  }

  /**
   * Scroll to Top Button
   */
  function initScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--mermaid-primary);
      color: var(--mermaid-white);
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(scrollButton);

    // Show/hide button based on scroll position
    function toggleScrollButton() {
      if (window.pageYOffset > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.visibility = 'visible';
      } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.visibility = 'hidden';
      }
    }

    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Listen for scroll events
    window.addEventListener('scroll', toggleScrollButton);
  }

  /**
   * Form Validation Enhancement
   */
  function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Real-time validation feedback
        input.addEventListener('blur', function() {
          validateField(this);
        });
        
        input.addEventListener('input', function() {
          // Clear error state on input
          this.classList.remove('error');
          const errorMsg = this.parentNode.querySelector('.error-message');
          if (errorMsg) {
            errorMsg.remove();
          }
        });
      });
      
      // Form submission validation
      form.addEventListener('submit', function(e) {
        let isValid = true;
        
        inputs.forEach(input => {
          if (!validateField(input)) {
            isValid = false;
          }
        });
        
        if (!isValid) {
          e.preventDefault();
          // Focus first invalid field
          const firstError = form.querySelector('.error');
          if (firstError) {
            firstError.focus();
          }
        }
      });
    });
  }

  /**
   * Validate individual form field
   */
  function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';

    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    field.classList.remove('error');

    // Required field validation
    if (required && !value) {
      errorMessage = 'This field is required.';
      isValid = false;
    }
    // Email validation
    else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address.';
        isValid = false;
      }
    }
    // Phone validation
    else if (type === 'tel' && value) {
      const phoneRegex = /^[\+]?[\s\-\(\)0-9]{10,}$/;
      if (!phoneRegex.test(value)) {
        errorMessage = 'Please enter a valid phone number.';
        isValid = false;
      }
    }

    // Display error message
    if (!isValid) {
      field.classList.add('error');
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = errorMessage;
      errorElement.style.cssText = 'color: #dc3545; font-size: 0.875rem; margin-top: 0.25rem;';
      field.parentNode.appendChild(errorElement);
    }

    return isValid;
  }

  /**
   * Lazy Loading for Images
   */
  function initLazyLoading() {
    // Only proceed if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: load all images immediately
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.add('loaded');
      });
      return;
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  /**
   * Accessibility Enhancements
   */
  function initAccessibilityEnhancements() {
    // Add skip navigation functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Keyboard navigation for custom elements
    const customButtons = document.querySelectorAll('[role="button"]:not(button)');
    customButtons.forEach(button => {
      button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });

    // ARIA live region for dynamic content updates
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);

    // Expose announce function globally for dynamic updates
    window.announce = function(message) {
      const liveRegion = document.getElementById('live-region');
      if (liveRegion) {
        liveRegion.textContent = message;
        // Clear after announcement
        setTimeout(() => {
          liveRegion.textContent = '';
        }, 1000);
      }
    };
  }

  /**
   * Performance Optimizations
   */
  function initPerformanceOptimizations() {
    // Preload critical resources
    const criticalLinks = [
      '/assets/css/main.css',
      'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
    ];

    criticalLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });

    // Resource hints for external domains
    const resourceHints = [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'dns-prefetch', href: '//tidycal.com' }
    ];

    resourceHints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      document.head.appendChild(link);
    });

    // Service Worker registration (if available)
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed, but that's okay
      });
    }
  }

  /**
   * Utility Functions
   */

  // Debounce function for performance
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

  // Throttle function for scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  // Expose utilities globally if needed
  window.MermaidKaz = {
    debounce,
    throttle,
    announce: window.announce
  };

})();