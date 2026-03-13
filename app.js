/* ============================================
   RAKSHANA 24/7 — Application Logic
   ============================================ */

(function () {
  'use strict';

  // ─── Page Loader ───────────────────────────────────────
  window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 500);
      }, 400);
    }
  });

  // ─── Scroll Progress Bar ───────────────────────────────
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) {
      scrollProgress.style.width = progress + '%';
    }
  }

  // ─── Navbar Scroll Effect ──────────────────────────────
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  // ─── Mobile Menu Toggle ────────────────────────────────
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ─── Smooth Scroll for Anchor Links ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // ─── Scroll Reveal (Intersection Observer) ─────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ─── Pipeline Steps Animation ──────────────────────────
  const pipelineSteps = document.querySelectorAll('.pipeline-step');

  const pipelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 150);
          pipelineObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  pipelineSteps.forEach((step) => pipelineObserver.observe(step));

  // ─── Animated Counter ──────────────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const exact = el.dataset.exact;

    if (exact !== undefined) {
      el.textContent = prefix + exact + suffix;
      return;
    }

    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  statNumbers.forEach((el) => counterObserver.observe(el));

  // ─── Law Search / Filter ───────────────────────────────
  const lawSearchInput = document.getElementById('lawSearchInput');
  const lawCards = document.querySelectorAll('.law-card');

  if (lawSearchInput && lawCards.length) {
    lawSearchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();

      lawCards.forEach((card) => {
        const keywords = (card.dataset.keywords || '').toLowerCase();
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const body = card.querySelector('p:not(.law-sections)')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.law-tag'))
          .map((t) => t.textContent.toLowerCase())
          .join(' ');

        const searchText = keywords + ' ' + title + ' ' + body + ' ' + tags;

        if (!query || searchText.includes(query)) {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            if (!searchText.includes(lawSearchInput.value.toLowerCase().trim())) {
              card.style.display = 'none';
            }
          }, 250);
        }
      });
    });
  }

  // ─── Report Form Handler ───────────────────────────────
  const reportForm = document.getElementById('reportForm');
  const btnSubmitReport = document.getElementById('btnSubmitReport');

  if (reportForm && btnSubmitReport) {
    reportForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const type = document.getElementById('reportType').value;
      const description = document.getElementById('reportDescription').value;

      if (!type) {
        showToast('Please select an incident type.', 'warning');
        return;
      }

      if (!description.trim()) {
        showToast('Please describe what happened.', 'warning');
        return;
      }

      // Simulate submission
      btnSubmitReport.disabled = true;
      btnSubmitReport.innerHTML = `
        <svg class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 0.8s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
        </svg>
        Encrypting & Submitting…
      `;

      setTimeout(() => {
        btnSubmitReport.disabled = false;
        btnSubmitReport.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Report Submitted ✓
        `;
        btnSubmitReport.style.background = '#22C55E';

        showToast('Report submitted anonymously and encrypted.', 'success');

        // Reset after delay
        setTimeout(() => {
          reportForm.reset();
          btnSubmitReport.innerHTML = `
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2L17 6V10C17 15 13.8 19 10 20C6.2 19 3 15 3 10V6L10 2Z"/></svg>
            Submit Anonymous Report
          `;
          btnSubmitReport.style.background = '';
        }, 3000);
      }, 2000);
    });
  }

  // ─── Toast Notification ────────────────────────────────
  function showToast(message, type = 'info') {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach((t) => t.remove());

    const toast = document.createElement('div');
    toast.className = 'toast';

    const colors = {
      success: '#22C55E',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#7B2BE0',
    };

    const icons = {
      success: '✓',
      warning: '⚠',
      error: '✕',
      info: 'ℹ',
    };

    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0F172A;
      color: #F8FAFC;
      padding: 16px 24px;
      border-radius: 12px;
      font-family: 'Noto Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 9999;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      border-left: 4px solid ${colors[type]};
      max-width: 400px;
    `;

    toast.innerHTML = `
      <span style="
        width: 28px; height: 28px;
        border-radius: 50%;
        background: ${colors[type]}20;
        color: ${colors[type]};
        display: flex; align-items: center; justify-content: center;
        font-weight: 700; font-size: 14px; flex-shrink: 0;
      ">${icons[type]}</span>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
      });
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // ─── Dashboard Shield Animation ────────────────────────
  const shieldCircle = document.querySelector('.shield-circle');
  if (shieldCircle) {
    const shieldObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            shieldCircle.style.animation = 'pulse 2s ease-in-out 3';
            shieldObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    shieldObserver.observe(shieldCircle);
  }

  // ─── Active Nav Link Highlighting ──────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a');

  function highlightNavLink() {
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinksAll.forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + sectionId) {
            link.style.color = 'var(--color-primary)';
          }
        });
      }
    });
  }

  // ─── Scroll Event Listener (Throttled) ─────────────────
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        handleNavbarScroll();
        highlightNavLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // ─── Initial Calls ─────────────────────────────────────
  updateScrollProgress();
  handleNavbarScroll();

  // ─── PWA Service Worker Registration ───────────────────
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .then((registration) => {
          console.log('ServiceWorker registered:', registration.scope);
        })
        .catch((err) => {
          console.log('ServiceWorker registration failed:', err);
        });
    });
  }
})();
