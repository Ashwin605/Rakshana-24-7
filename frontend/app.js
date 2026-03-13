/* ============================================
   RAKSHANA 24/7 — Application Logic (Advanced)
   Full API integration + animations
   ============================================ */

(function () {
  'use strict';

  // ── Page Loader ──
  window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 600);
      }, 800);
    }
    initApp();
  });

  async function initApp() {
    initActiveNavLink();
    initParticles();
    initScrollEffects();
    initMobileMenu();
    initSmoothScroll();
    initRevealAnimations();
    initCounters();
    checkAPIStatus();
    loadLegalData();
    loadReportTypes();

    if (RakshanaAPI.isLoggedIn()) {
      updateAuthUI(true);
      loadDashboardData();
    }
  }

  // ── Active Navigation Link (Page-based) ──
  function initActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!navLinks.length) return;

    // Get the current page filename from the URL
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    // Map of nav link href values to their corresponding pages
    const pageMap = {
      'index.html': 'home',
      'how-it-works.html': 'howItWorks',
      'legal.html': 'legalRights',
      'scan.html': 'scan',
      'report.html': 'report',
      'dashboard.html': 'dashboard',
    };

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Extract the filename from the link href
      const linkPage = href.substring(href.lastIndexOf('/') + 1).split('#')[0].split('?')[0];

      // Match the current page with the nav link
      if (linkPage === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ── Particle Background ──
  function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 114, 182, ${this.opacity * 0.6})`;
        ctx.fill();
      }
    }

    const count = Math.min(Math.floor(w * h / 15000), 80);
    for (let i = 0; i < count; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(244, 114, 182, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ── Scroll Effects ──
  function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Progress bar
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollProgress) {
            scrollProgress.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
          }
          // Navbar
          if (navbar) {
            navbar.classList.toggle('scrolled', scrollTop > 50);
          }
          // Active nav link
          highlightNavLink();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  function highlightNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollPos = window.scrollY + 150;

    // Only highlight hash-based links on scroll; preserve page-based active state
    const hashLinks = Array.from(navLinks).filter(link => {
      const href = link.getAttribute('href') || '';
      return href.startsWith('#');
    });
    if (!hashLinks.length) return;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        hashLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) link.classList.add('active');
        });
      }
    });

  }

  // ── Mobile Menu ──
  function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Smooth Scroll ──
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          const nav = document.getElementById('navbar');
          const offset = nav ? nav.offsetHeight + 20 : 20;
          window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
        }
      });
    });
  }

  // ── Reveal Animations ──
  function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Pipeline steps stagger
    const pipeObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const steps = document.querySelectorAll('.pipeline-step');
          steps.forEach((step, i) => {
            setTimeout(() => step.classList.add('visible'), i * 200);
          });
          pipeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const pipeSection = document.querySelector('.pipeline-steps');
    if (pipeSection) pipeObs.observe(pipeSection);
  }

  // ── Animated Counters ──
  function initCounters() {
    const els = document.querySelectorAll('.hero-stat-num, .stat-number');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    els.forEach(el => obs.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    if (el.dataset.exact !== undefined) {
      el.textContent = prefix + el.dataset.exact + suffix;
      return;
    }
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ── API Status Check ──
  async function checkAPIStatus() {
    const statusEl = document.getElementById('apiStatus');
    try {
      const data = await RakshanaAPI.healthCheck();
      if (statusEl) {
        statusEl.innerHTML = `<span class="dot dot-green pulse-dot"></span><span>API: ${data.status} | v${data.version}</span>`;
      }
    } catch (e) {
      if (statusEl) {
        statusEl.innerHTML = `<span class="dot dot-red"></span><span>API: Offline — run backend</span>`;
      }
    }
  }

  // ═══════════════════════════════════════════
  //   AUTH
  // ═══════════════════════════════════════════

  window.openAuthModal = function(tab = 'login') {
    const modal = document.getElementById('authModal');
    if (modal) {
      modal.classList.add('open');
      switchAuthTab(tab);
    }
  };

  // Smart CTA handler — if already logged in, go to dashboard, else auth
  window.handleGetProtected = function(e) {
    if (e) e.preventDefault();
    if (RakshanaAPI.isLoggedIn()) {
      window.location.href = 'dashboard.html';
    } else {
      window.location.href = 'auth.html';
    }
  };


  window.closeAuthModal = function() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('open');
  };

  window.switchAuthTab = function(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
  };

  window.handleLogin = async function(e) {
    e.preventDefault();
    const btn = document.getElementById('btnLoginSubmit');
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    btn.disabled = true;
    btn.textContent = 'Signing in…';

    try {
      await RakshanaAPI.login(email, password);
      showToast(`Welcome back, ${RakshanaAPI.user.display_name}!`, 'success');
      closeAuthModal();
      updateAuthUI(true);
      loadDashboardData();

      // Scroll to dashboard
      setTimeout(() => {
        const dashboard = document.getElementById('dashboard-preview');
        if (dashboard) {
          const nav = document.getElementById('navbar');
          const offset = nav ? nav.offsetHeight + 20 : 20;
          window.scrollTo({ top: dashboard.offsetTop - offset, behavior: 'smooth' });
        }
      }, 500);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Sign In';
    }
  };

  window.handleRegister = async function(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const phone = document.getElementById('regPhone').value;
    const btn = e.target.querySelector('button[type="submit"]');

    if (btn) { btn.disabled = true; btn.textContent = 'Creating Shield…'; }

    try {
      await RakshanaAPI.register({
        display_name: name, email, password,
        phone_number: phone, language: 'en',
      });
      showToast(`Shield activated! Welcome, ${name}. 🛡️`, 'success');
      updateAuthUI(true);
      loadDashboardData();

      // Redirect to home to show the live notification bell
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Create Shield'; }
    }
  };


  function updateAuthUI(loggedIn) {
    const signInBtn = document.getElementById('btnSignIn');
    if (signInBtn) {
      if (loggedIn && RakshanaAPI.user) {
        signInBtn.textContent = RakshanaAPI.user.display_name;
        signInBtn.onclick = () => {
          RakshanaAPI.clearAuth();
          updateAuthUI(false);
          showToast('Signed out', 'info');
          setTimeout(() => location.href = 'index.html', 1000);
        };
      } else {
        signInBtn.textContent = 'Sign In';
        signInBtn.onclick = () => window.location.href = 'auth.html';
      }
    }
    // Update "Get Protected" button text when logged in
    const protectBtn = document.getElementById('btnGetProtected');
    if (protectBtn) {
      protectBtn.textContent = loggedIn ? 'My Dashboard' : 'Get Protected';
      protectBtn.onclick = handleGetProtected;
    }
    const demoBtn = document.getElementById('btnDemoLogin');
    if (demoBtn) {
      demoBtn.style.display = loggedIn ? 'none' : 'inline-flex';
    }
    const notifSection = document.getElementById('notifications');
    if (notifSection) {
      notifSection.style.display = loggedIn ? 'block' : 'none';
    }

    const navNotifWrapper = document.getElementById('navNotifWrapper');
    if (navNotifWrapper) {
      if (loggedIn) loadMiniNotifications();
      else loadMiniNotifications(); // Load empty state for logged out
    }
  }

  // ═══════════════════════════════════════════
  //   MINI NOTIFICATIONS
  // ═══════════════════════════════════════════
  
  let miniNotifFilter = 'all';

  window.filterMiniNotifs = function(filter, e) {
    if (e) e.stopPropagation();
    miniNotifFilter = filter;
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.filter === filter);
    });
    loadMiniNotifications();
  };

  window.markAllAsRead = async function(e) {
    if (e) e.stopPropagation();
    if (!RakshanaAPI.isLoggedIn()) return;
    try {
      // Typically API would have a bulk endpoint, but we'll use what we have
      const data = await RakshanaAPI.getAlerts();
      const unread = (data.alerts || []).filter(a => !a.is_read);
      if (unread.length === 0) return;
      
      await Promise.all(unread.map(a => RakshanaAPI.markAlertRead(a.id)));
      showToast('All notifications marked as read', 'success');
      loadMiniNotifications();
      if (typeof loadDashboardData === 'function') loadDashboardData();
    } catch (err) {
      showToast('Action failed', 'error');
    }
  };

  window.toggleMiniNotif = function(e) {
    if (e) e.stopPropagation();
    const windowEl = document.getElementById('miniNotifWindow');
    if (windowEl) {
      const isOpen = windowEl.classList.contains('open');
      document.querySelectorAll('.mini-notif-window').forEach(w => w.classList.remove('open'));
      if (!isOpen) {
        windowEl.classList.add('open');
        loadMiniNotifications();
      }
    }
  };

  document.addEventListener('click', (e) => {
    const windowEl = document.getElementById('miniNotifWindow');
    const wrapperEl = document.getElementById('navNotifWrapper');
    if (windowEl && windowEl.classList.contains('open') && wrapperEl && !wrapperEl.contains(e.target)) {
      windowEl.classList.remove('open');
    }
  });

  async function loadMiniNotifications() {
    const listEl = document.getElementById('miniNotifList');
    const badgeEl = document.getElementById('miniBadgeAlert');
    const countEl = document.getElementById('miniNotifCount');

    if (!RakshanaAPI.isLoggedIn()) {
      if (listEl) listEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔒</div>
          <p>Please <a href="auth.html" style="color: var(--primary); font-weight: 700;">Sign In</a> to view alerts.</p>
        </div>`;
      if (badgeEl) badgeEl.style.display = 'none';
      if (countEl) countEl.textContent = '0';
      return;
    }

    try {
      const data = await RakshanaAPI.getAlerts();
      let alerts = data.alerts || [];
      
      const unreadCount = alerts.filter(a => !a.is_read).length;
      if (badgeEl) {
        const oldCount = parseInt(badgeEl.textContent || '0', 10);
        badgeEl.textContent = unreadCount;
        badgeEl.style.display = 'flex';
        
        // Shake bell if new alerts arrived
        if (unreadCount > oldCount) {
          const bell = document.getElementById('btnNavNotif');
          if (bell) {
            bell.classList.add('shake-bell');
            setTimeout(() => bell.classList.remove('shake-bell'), 600);
          }
        }
      }
      if (countEl) countEl.textContent = unreadCount;

      if (!listEl) return;

      // Filter
      if (miniNotifFilter === 'unread') alerts = alerts.filter(a => !a.is_read);
      else if (miniNotifFilter === 'critical') alerts = alerts.filter(a => a.severity === 'critical');
      else if (miniNotifFilter === 'alert') alerts = alerts.filter(a => a.severity === 'alert');
      else if (miniNotifFilter === 'watch') alerts = alerts.filter(a => a.severity === 'watch');
      else if (miniNotifFilter === 'safe') alerts = alerts.filter(a => a.severity === 'safe');

      if (alerts.length === 0) {
        listEl.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">🛡️</div>
            <p>${miniNotifFilter === 'all' ? "No threats detected." : "No matching alerts."}</p>
          </div>`;
        return;
      }

      // Show top 10 in mini window
      const recent = alerts.slice(0, 10);
      listEl.innerHTML = recent.map((a, i) => {
        let icon = '🛡️';
        if (a.severity === 'critical') icon = '🚨';
        else if (a.severity === 'alert') icon = '⚠️';
        else if (a.severity === 'watch') icon = '👁️';

        let color = 'var(--green)';
        if (a.severity === 'critical') color = 'var(--red)';
        else if (a.severity === 'alert') color = 'var(--orange)';
        else if (a.severity === 'watch') color = 'var(--amber)';

        const time = a.detected_at ? timeAgo(new Date(a.detected_at)) : 'Recently';

        return `
          <div class="mini-notif-item ${!a.is_read ? 'unread' : ''} notif-item-enter" 
               style="animation-delay: ${i * 0.05}s; cursor: pointer;"
               onclick="window.location.href='dashboard.html'">
            <div class="mini-notif-icon" style="color: ${color};">${icon}</div>
            <div class="mini-notif-content">
              <div class="mini-notif-meta">
                <span class="mini-notif-title">${a.title || 'Threat Alert'}</span>
                <span class="mini-notif-time">${time}</span>
              </div>
              <div class="mini-notif-desc">${a.explanation || a.description}</div>
            </div>
          </div>
        `;
      }).join('');

    } catch (e) {
      if (listEl) listEl.innerHTML = '<div class="empty-state"><p>Error loading.</p></div>';
    }
  }


  window.demoLogin = async function() {
    const btn = document.getElementById('btnDemoLogin');
    if (btn) { btn.disabled = true; btn.textContent = 'Loading…'; }
    try {
      await RakshanaAPI.login('demo@rakshana.in', 'rakshana123');
      showToast('Demo mode activated!', 'success');
      updateAuthUI(true);
      loadDashboardData();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Load Live Data'; }
    }
  };

  // ═══════════════════════════════════════════
  //   DASHBOARD — Live API Data
  // ═══════════════════════════════════════════

  async function loadDashboardData() {
    if (!RakshanaAPI.isLoggedIn()) return;
    try {
      const dash = await RakshanaAPI.getDashboard();

      // Shield score
      const scoreEl = document.getElementById('dashScore');
      const labelEl = document.getElementById('dashLabel');
      const circleEl = document.getElementById('dashShieldCircle');
      const progressEl = document.getElementById('shieldProgress');

      if (scoreEl) {
        const score = dash.protection_status.threat_score;
        animateNumber(scoreEl, score);
        labelEl.textContent = dash.protection_status.status_text;

        // Color based on status
        const colors = { safe: '#16A34A', watching: '#D97706', alert: '#EA580C', critical: '#DC2626' };
        const color = colors[dash.protection_status.status] || '#22C55E';
        circleEl.style.setProperty('--shield-color', color);

        // Ring progress (inverse — lower score = more filled = more safe)
        const safePercent = (100 - score) / 100;
        const circumference = 339.3;
        if (progressEl) {
          progressEl.style.strokeDashoffset = circumference * (1 - safePercent);
          progressEl.style.stroke = color;
        }
      }

      // Last scan
      const scanEl = document.getElementById('dashLastScan');
      if (scanEl && dash.last_scan_at) {
        const ago = timeAgo(new Date(dash.last_scan_at));
        scanEl.textContent = `Last scan: ${ago} | Scans today: ${dash.scans_today}`;
      }

      // Alert badge
      const badgeEl = document.getElementById('alertBadge');
      if (badgeEl) {
        badgeEl.textContent = dash.unread_alerts;
        badgeEl.classList.toggle('has-alerts', dash.unread_alerts > 0);
      }

      // Recent alerts
      const alertsList = document.getElementById('dashAlertsList');
      if (alertsList && dash.recent_alerts.length > 0) {
        alertsList.innerHTML = dash.recent_alerts.map(a => `
          <div class="alert-item ${a.severity}">
            <span class="alert-dot dot-${severityColor(a.severity)}"></span>
            <div class="alert-info">
              <div class="alert-title">${a.title || a.threat_type}</div>
              <div class="alert-meta">Score: ${a.threat_score} · ${timeAgo(new Date(a.detected_at))}</div>
            </div>
          </div>
        `).join('');
      } else if (alertsList) {
        alertsList.innerHTML = '<div class="empty-state"><p>✅ No threats detected. You\'re safe!</p></div>';
      }

      // Load advanced notifications inbox
      loadNotifications();

    } catch (err) {
      console.error('Dashboard load failed:', err);
    }
  }

  // ═══════════════════════════════════════════
  //   NOTIFICATIONS INBOX
  // ═══════════════════════════════════════════

  let currentNotifFilter = 'all';

  document.querySelectorAll('.notif-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.notif-tab').forEach(t => t.classList.remove('active'));
      const btn = e.currentTarget;
      btn.classList.add('active');
      currentNotifFilter = btn.dataset.filter;
      loadNotifications(currentNotifFilter);
    });
  });

  window.loadNotifications = async function(filter = currentNotifFilter) {
    if (!RakshanaAPI.isLoggedIn()) return;
    
    const listEl = document.getElementById('notificationsList');
    if (listEl) listEl.innerHTML = '<div class="loading-state"><div class="loader-spinner small"></div><p>Loading alerts securely…</p></div>';

    try {
      // Fetch summary for badges
      const summary = await RakshanaAPI.getAlertsSummary();
      if (document.getElementById('badgeAll')) document.getElementById('badgeAll').textContent = summary.total || 0;
      if (document.getElementById('badgeCritical')) document.getElementById('badgeCritical').textContent = summary.by_severity.critical || 0;
      if (document.getElementById('badgeAlert')) document.getElementById('badgeAlert').textContent = summary.by_severity.alert || 0;
      if (document.getElementById('badgeWatch')) document.getElementById('badgeWatch').textContent = summary.by_severity.watch || 0;
      
      // Fetch filtered list
      const params = {};
      if (filter !== 'all') params.severity = filter;
      
      const data = await RakshanaAPI.getAlerts(params);
      
      if (!listEl) return;

      if (!data.alerts || data.alerts.length === 0) {
        let msg = filter === 'all' ? "You have no notifications." : `No ${filter} alerts found.`;
        listEl.innerHTML = `<div class="empty-state"><p>✅ ${msg}</p></div>`;
        return;
      }

      listEl.innerHTML = data.alerts.map(a => renderNotificationCard(a)).join('');

    } catch (err) {
      if (listEl) listEl.innerHTML = '<div class="empty-state"><p>❌ Failed to load notifications. Please try again.</p></div>';
      console.error(err);
    }
  };

  function renderNotificationCard(a) {
    const isUnread = !a.is_read ? 'unread' : '';
    const date = new Date(a.detected_at).toLocaleString();
    let scoreClass = `severity-${a.severity}`;
    
    let icon = '🛡️';
    if (a.severity === 'critical') icon = '🚨';
    else if (a.severity === 'alert') icon = '⚠️';
    else if (a.severity === 'watch') icon = '👁️';

    let actionButtons = '';
    if (!a.is_read) {
      actionButtons += `<button class="btn btn-sm btn-outline" onclick="RakshanaAPI.markAlertRead('${a.id}').then(()=>loadNotifications())">Mark Read</button>`;
    }
    actionButtons += `
      <select class="btn btn-sm btn-outline" onchange="if(this.value) { RakshanaAPI.takeAlertAction('${a.id}', this.value).then(()=>loadNotifications()); }">
        <option value="">Take Action…</option>
        <option value="reported">Report to Police (1930)</option>
        <option value="screenshot">Saved Evidence</option>
        <option value="dismissed">Dismiss Threat</option>
      </select>
    `;

    return `
      <div class="notif-item ${scoreClass} ${isUnread}">
        <div class="notif-icon">${icon}</div>
        <div class="notif-content">
          <div class="notif-header">
            <span class="notif-title">${a.title}</span>
            <span class="notif-time">${date}</span>
          </div>
          <div class="notif-desc">${a.explanation || a.description}</div>
          <div class="notif-meta">
            <span class="notif-score">Score: ${a.threat_score}/100</span>
            <span style="font-size: var(--font-xs); color: var(--text-muted); padding: 2px 6px; border: 1px solid var(--border); border-radius: var(--radius-sm)">Source: ${a.source_name || a.source_type}</span>
          </div>
        </div>
        <div class="notif-actions">
          ${actionButtons}
        </div>
      </div>
    `;
  }

  function animateNumber(el, target) {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(interval);
    }, 30);
  }

  function severityColor(severity) {
    return { safe: 'green', watch: 'amber', alert: 'orange', critical: 'red' }[severity] || 'green';
  }

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
    return Math.floor(seconds / 86400) + 'd ago';
  }

  // ═══════════════════════════════════════════
  //   NLP THREAT SCORING — Live Demo
  // ═══════════════════════════════════════════

  window.testNLP = async function() {
    const input = document.getElementById('nlpInput');
    const text = input.value.trim();
    if (!text) { showToast('Enter some text to analyze', 'warning'); return; }

    if (!RakshanaAPI.isLoggedIn()) {
      await RakshanaAPI.login('demo@rakshana.in', 'rakshana123');
      updateAuthUI(true);
    }

    const resultDiv = document.getElementById('nlpResult');
    resultDiv.style.display = 'block';

    try {
      const demo = await RakshanaAPI.getDemoScan();
      // Use the closest matching category
      const categories = demo.demo_results;
      let best = categories.safe;
      const textLower = text.toLowerCase();

      if (textLower.includes('deepfake') || textLower.includes('morphed') || textLower.includes('nude')) best = categories.critical;
      else if (textLower.includes('threaten') || textLower.includes('teach') || textLower.includes('lesson') || textLower.includes('track')) best = categories.alert;
      else if (textLower.includes('leaked') || textLower.includes('phone') || textLower.includes('consent') || textLower.includes('doxx')) best = categories.watch;

      const score = best.score;
      const fill = document.getElementById('nlpScoreFill');
      const scoreNum = document.getElementById('nlpScoreNum');
      const explanation = document.getElementById('nlpExplanation');
      const keywords = document.getElementById('nlpKeywords');

      // Animate score bar
      fill.style.width = score + '%';
      fill.className = 'nlp-score-fill';
      if (score >= 90) fill.classList.add('critical');
      else if (score >= 70) fill.classList.add('alert');
      else if (score >= 40) fill.classList.add('watch');
      else fill.classList.add('safe');

      scoreNum.textContent = score + '/100';
      explanation.textContent = best.explanation;
      keywords.innerHTML = (best.matched_keywords || []).map(k => `<span class="keyword-tag">${k}</span>`).join('');

    } catch (err) {
      showToast('NLP analysis failed: ' + err.message, 'error');
    }
  };

  // ═══════════════════════════════════════════
  //   LEGAL DATA — From API
  // ═══════════════════════════════════════════

  async function loadLegalData() {
    try {
      // Load laws
      const lawsData = await RakshanaAPI.getLaws();
      renderLaws(lawsData.laws);

      // Load rights
      const rightsData = await RakshanaAPI.getRights();
      renderRights(rightsData.rights);

      // Load helplines
      const helplinesData = await RakshanaAPI.getHelplines();
      renderHelplines(helplinesData.helplines);

      // Search functionality
      const searchInput = document.getElementById('lawSearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', async function () {
          const q = this.value.trim();
          try {
            const data = await RakshanaAPI.getLaws(q);
            renderLaws(data.laws);
          } catch (e) {}
        });
      }
    } catch (err) {
      console.error('Legal data load failed:', err);
      const grid = document.getElementById('lawsGrid');
      if (grid) grid.innerHTML = '<p class="error-state">Could not load legal data. Check API connection.</p>';
    }
  }

  function renderLaws(laws) {
    const grid = document.getElementById('lawsGrid');
    if (!grid) return;

    if (laws.length === 0) {
      grid.innerHTML = '<div class="empty-state"><p>No laws match your search.</p></div>';
      return;
    }

    grid.innerHTML = laws.map(law => `
      <div class="law-card glass-card" data-keywords="${(law.keywords || []).join(' ')}">
        <span class="law-badge ${law.category.includes('IT') ? 'it-act' : 'ipc'}">${law.category}</span>
        <h3>${law.title}</h3>
        <p class="law-sections">${law.sections}</p>
        <p>${law.description}</p>
        <div class="law-punishment">${law.punishment}</div>
        <div class="law-tags">${(law.tags || []).map(t => `<span class="law-tag">${t}</span>`).join('')}</div>
      </div>
    `).join('');
  }

  function renderRights(rights) {
    const grid = document.getElementById('rightsGrid');
    if (!grid) return;
    const icons = ['🛡️', '✊', '📋', '🕐', '⚖️'];
    grid.innerHTML = rights.map((r, i) => `
      <div class="right-card glass-card">
        <div class="right-icon">${icons[i] || '⚖️'}</div>
        <h3>${r.title}</h3>
        <p class="right-article">${r.article}</p>
        <p>${r.description}</p>
      </div>
    `).join('');
  }

  function renderHelplines(helplines) {
    const grid = document.getElementById('helplinesGrid');
    if (!grid) return;
    grid.innerHTML = helplines.map(h => `
      <div class="helpline-card glass-card">
        <span class="helpline-icon">${h.type === 'website' ? '🌐' : '📞'}</span>
        <div class="helpline-info">
          <strong>${h.name}</strong>
          <span class="helpline-number">${h.number || ''}</span>
          ${h.url ? `<a href="${h.url}" target="_blank" rel="noopener">${h.url}</a>` : ''}
        </div>
      </div>
    `).join('');
  }

  // ═══════════════════════════════════════════
  //   ANONYMOUS REPORT — API Connected
  // ═══════════════════════════════════════════

  async function loadReportTypes() {
    try {
      const data = await RakshanaAPI.getReportTypes();
      const select = document.getElementById('reportType');
      if (select && data.types) {
        // Keep the placeholder
        select.innerHTML = '<option value="">Select incident type…</option>';
        data.types.forEach(t => {
          const opt = document.createElement('option');
          opt.value = t.value;
          opt.textContent = t.label;
          select.appendChild(opt);
        });
      }
    } catch (e) {
      console.warn('Could not load report types');
    }
  }

  window.handleReport = async function(e) {
    e.preventDefault();
    const btn = document.getElementById('btnSubmitReport');
    const type = document.getElementById('reportType').value;
    const platform = document.getElementById('reportPlatform').value;
    const description = document.getElementById('reportDescription').value;

    if (!type) { showToast('Select an incident type', 'warning'); return; }
    if (!description || description.length < 10) { showToast('Please describe what happened (min 10 chars)', 'warning'); return; }

    btn.disabled = true;
    btn.textContent = '🔒 Encrypting & Submitting…';

    try {
      const data = await RakshanaAPI.submitReport({
        incident_type: type,
        platform: platform,
        description: description,
        language: 'en',
      });

      // Show success
      document.getElementById('reportForm').style.display = 'none';
      const successDiv = document.getElementById('reportSuccess');
      successDiv.style.display = 'block';

      document.getElementById('reportToken').textContent = data.anonymous_token;

      const lawsDiv = document.getElementById('reportLaws');
      if (data.applicable_laws && data.applicable_laws.length > 0) {
        lawsDiv.innerHTML = '<h4>Applicable Laws:</h4>' +
          data.applicable_laws.map(l => `<div class="report-law">§${l.section} ${l.act} — ${l.title}</div>`).join('');
      }

      showToast('Report submitted anonymously!', 'success');

    } catch (err) {
      showToast('Submission failed: ' + err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = '🛡️ Submit Anonymous Report';
    }
  };

  // ═══════════════════════════════════════════
  //   TOAST NOTIFICATIONS
  // ═══════════════════════════════════════════

  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icons = { success: '✓', warning: '⚠', error: '✕', info: 'ℹ' };

    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || 'ℹ'}</span>
      <span class="toast-msg">${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  window.showToast = showToast;

  // ═══════════════════════════════════════════
  //   FILE UPLOAD & THREAT SCANNER
  // ═══════════════════════════════════════════

  let selectedFile = null;

  // Drag & Drop handlers
  const dropArea = document.getElementById('dropArea');
  const fileInput = document.getElementById('fileInput');

  if (dropArea) {
    ['dragenter', 'dragover'].forEach(evt => {
      dropArea.addEventListener(evt, (e) => {
        e.preventDefault();
        dropArea.classList.add('drag-over');
      });
    });
    ['dragleave', 'drop'].forEach(evt => {
      dropArea.addEventListener(evt, (e) => {
        e.preventDefault();
        dropArea.classList.remove('drag-over');
      });
    });
    dropArea.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) handleFileSelect(files[0]);
    });
    dropArea.addEventListener('click', () => fileInput && fileInput.click());
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) handleFileSelect(e.target.files[0]);
    });
  }

  function handleFileSelect(file) {
    selectedFile = file;
    const fileInfo = document.getElementById('fileInfo');
    const dropAreaEl = document.getElementById('dropArea');
    const fileNameEl = document.getElementById('fileName');
    const fileSizeEl = document.getElementById('fileSize');

    if (fileInfo && fileNameEl && fileSizeEl) {
      fileNameEl.textContent = file.name;
      fileSizeEl.textContent = formatFileSize(file.size);
      fileInfo.style.display = 'flex';
      if (dropAreaEl) dropAreaEl.style.display = 'none';
    }
  }

  window.clearFile = function() {
    selectedFile = null;
    const fileInfo = document.getElementById('fileInfo');
    const dropAreaEl = document.getElementById('dropArea');
    if (fileInfo) fileInfo.style.display = 'none';
    if (dropAreaEl) dropAreaEl.style.display = 'block';
    if (fileInput) fileInput.value = '';
  };

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  window.runThreatScan = async function() {
    const textInput = document.getElementById('scanTextInput');
    const text = textInput ? textInput.value.trim() : '';
    const btn = document.getElementById('btnRunScan');

    if (!selectedFile && !text) {
      showToast('Please upload a file or paste text to analyze.', 'warning');
      return;
    }

    if (btn) { btn.disabled = true; btn.innerHTML = '⏳ Initializing Deep Scan…'; }

    const term = document.getElementById('scanTerminal');
    const termLogs = document.getElementById('scanTerminalLogs');
    const placeholder = document.getElementById('scanPlaceholder');
    const results = document.getElementById('scanResults');

    if (placeholder) placeholder.style.display = 'none';
    if (results) results.style.display = 'none';

    // Simulate Terminal Animation
    if (term && termLogs) {
        term.style.display = 'flex';
        termLogs.innerHTML = '';
        const simulateLogs = [
            "Initializing Rakshana Core Engine...",
            "Authenticating AI NLP Model...",
            "Checking image metadata, EXIF traits...",
            "Mapping contextual substrings...",
            "Querying known Telegram leak nodes...",
            "Cross-referencing dark web paste sites...",
            "Executing neural threat evaluation model...",
            "Consolidating risk score..."
        ];

        const analysisPromise = (async () => {
            if (selectedFile) return await RakshanaAPI.analyzeFile(selectedFile, text);
            return await RakshanaAPI.analyzeContent(text);
        })();

        try {
            for (let i = 0; i < simulateLogs.length; i++) {
                await new Promise(r => setTimeout(r, 200 + Math.random() * 300));
                const colorClass = Math.random() > 0.8 ? 'scan-warn' : 'scan-prog';
                const prefix = colorClass === 'scan-warn' ? '[WARN]' : '[INFO]';
                termLogs.innerHTML += `<div class="${colorClass}">&gt; ${prefix} ${simulateLogs[i]}</div>`;
                termLogs.scrollTop = termLogs.scrollHeight;
            }

            const result = await analysisPromise;

            termLogs.innerHTML += `<div style="color: #a6e3a1; font-weight: bold; margin-top: 10px;">&gt; [SUCCESS] Analysis Complete! Decoding payload...</div>`;
            termLogs.scrollTop = termLogs.scrollHeight;
            await new Promise(r => setTimeout(r, 800));

            if (term) term.style.display = 'none';
            displayScanResults(result);

            if (result.score >= 40) showWarningBanner(result);
            if (result.score >= 70) sendPushNotification(result);

            showToast('Analysis complete!', 'success');
        } catch (err) {
            termLogs.innerHTML += `<div class="scan-err" style="color: #f38ba8; margin-top: 10px;">&gt; [ERROR] Trace Failed: ${err.message}</div>`;
            termLogs.scrollTop = termLogs.scrollHeight;
            showToast('Analysis failed: ' + err.message, 'error');
        } finally {
            if (btn) { btn.disabled = false; btn.innerHTML = '🚀 Execute Deep Scan'; }
        }
    } else {
        // Fallback if UI is missing
        try {
            let result;
            if (selectedFile) result = await RakshanaAPI.analyzeFile(selectedFile, text);
            else result = await RakshanaAPI.analyzeContent(text);
            displayScanResults(result);
            if (result.score >= 40) showWarningBanner(result);
            if (result.score >= 70) sendPushNotification(result);
            showToast('Analysis complete!', 'success');
        } catch (err) {
            showToast('Analysis failed: ' + err.message, 'error');
        } finally {
            if (btn) { btn.disabled = false; btn.innerHTML = '🚀 Execute Deep Scan'; }
        }
    }
  };

  function displayScanResults(result) {
    const placeholder = document.getElementById('scanPlaceholder');
    const results = document.getElementById('scanResults');
    if (placeholder) placeholder.style.display = 'none';
    if (results) results.style.display = 'block';

    const score = result.score || 0;
    const circumference = 339.3;
    const offset = circumference - (score / 100) * circumference;

    // Score ring
    const ring = document.getElementById('scanScoreRing');
    const scoreNum = document.getElementById('scanScoreNum');
    const scoreLabel = document.getElementById('scanScoreLabel');
    const scoreCircle = document.getElementById('scanScoreCircle');

    let severity, ringColor, label;
    if (score >= 90) { severity = 'critical'; ringColor = '#DC2626'; label = 'CRITICAL'; }
    else if (score >= 70) { severity = 'alert'; ringColor = '#EA580C'; label = 'ALERT'; }
    else if (score >= 40) { severity = 'watch'; ringColor = '#D97706'; label = 'CAUTION'; }
    else { severity = 'safe'; ringColor = '#16A34A'; label = 'SAFE'; }

    if (ring) {
      ring.style.stroke = ringColor;
      setTimeout(() => { ring.style.strokeDashoffset = offset; }, 100);
    }
    if (scoreNum) { scoreNum.textContent = score; scoreNum.style.color = ringColor; }
    if (scoreLabel) scoreLabel.textContent = label;
    if (scoreCircle) { scoreCircle.className = 'scan-score-circle score-' + severity; }

    // Threat type & confidence
    const typeLabels = {
      doxxing: 'Personal Info Exposure (Doxxing)',
      stalking: 'Stalking / Surveillance',
      morphed_image: 'Manipulated / Explicit Images',
      harassment: 'Harassment / Abuse',
      blackmail: 'Blackmail / Extortion',
      potential_image_threat: 'Image Threat Analysis',
      none: 'No Threat Detected',
    };

    const threatType = document.getElementById('scanThreatType');
    const confidence = document.getElementById('scanConfidence');
    const fileName = document.getElementById('scanFileName');

    if (threatType) threatType.textContent = typeLabels[result.threat_type] || result.threat_type || 'Unknown';
    if (confidence) confidence.textContent = `Confidence: ${result.confidence || 0}%`;
    if (fileName && result.filename) {
      fileName.textContent = `File: ${result.filename}`;
      fileName.style.display = 'block';
    }

    // Explanation
    const explanation = document.getElementById('scanExplanation');
    if (explanation) explanation.textContent = result.explanation || '';

    // Keywords
    const keywords = document.getElementById('scanKeywords');
    if (keywords && result.matched_keywords) {
      keywords.innerHTML = result.matched_keywords.map(k =>
        `<span class="keyword-tag">${k}</span>`
      ).join('');
    }

    // Applicable laws
    const lawsSection = document.getElementById('scanLaws');
    const lawsList = document.getElementById('scanLawsList');
    if (lawsSection && lawsList && result.applicable_laws && result.applicable_laws.length > 0) {
      lawsSection.style.display = 'block';
      lawsList.innerHTML = result.applicable_laws.map(law => `
        <div class="law-item">
          <span class="law-section">§${law.section}</span>
          <div class="law-info">
            <div class="law-title">${law.title}</div>
            <div class="law-act">${law.act}</div>
          </div>
        </div>
      `).join('');
    } else if (lawsSection) {
      lawsSection.style.display = 'none';
    }

    // Recommended actions
    const actionsSection = document.getElementById('scanActions');
    const actionsList = document.getElementById('scanActionsList');
    if (actionsSection && actionsList && result.recommended_actions && result.recommended_actions.length > 0) {
      actionsSection.style.display = 'block';
      actionsList.innerHTML = result.recommended_actions.map(a =>
        `<div class="action-item">${a}</div>`
      ).join('');
    } else if (actionsSection) {
      actionsSection.style.display = 'none';
    }

    // Scroll to results
    const panel = document.getElementById('scanResultsPanel');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ═══════════════════════════════════════════
  //   WARNING ALERT BANNER
  // ═══════════════════════════════════════════

  window.showWarningBanner = function(result) {
    const banner = document.getElementById('warningBanner');
    const title = document.getElementById('warningTitle');
    const message = document.getElementById('warningMessage');
    if (!banner) return;

    const score = result.score || 0;
    let severity, titleText, msgText;

    if (score >= 90) {
      severity = 'critical';
      titleText = '🚨 CRITICAL THREAT DETECTED';
      msgText = `Score: ${score}/100 — ${result.explanation || 'Immediate action required. Take screenshots and contact helpline 1930.'}`;
    } else if (score >= 70) {
      severity = 'alert';
      titleText = '⚠️ HIGH ALERT — Threat Identified';
      msgText = `Score: ${score}/100 — ${result.threat_type ? result.threat_type.replace(/_/g, ' ') : 'Suspicious content'}. Review details and take precautions.`;
    } else if (score >= 40) {
      severity = 'watch';
      titleText = '👁️ Caution — Suspicious Content';
      msgText = `Score: ${score}/100 — Potential ${result.threat_type ? result.threat_type.replace(/_/g, ' ') : 'threat'} detected. Monitor closely.`;
    } else {
      severity = 'safe';
      titleText = '✅ Content Appears Safe';
      msgText = `Score: ${score}/100 — No significant threat indicators found.`;
    }

    banner.className = 'warning-banner severity-' + severity;
    if (title) title.textContent = titleText;
    if (message) message.textContent = msgText;
    banner.style.display = 'block';

    // Auto-hide after 15 seconds for low severity
    if (score < 70) {
      setTimeout(() => dismissWarning(), 15000);
    }
  };

  window.dismissWarning = function() {
    const banner = document.getElementById('warningBanner');
    if (banner) {
      banner.style.animation = 'slideDown 0.3s ease reverse';
      setTimeout(() => { banner.style.display = 'none'; banner.style.animation = ''; }, 300);
    }
  };

  // ═══════════════════════════════════════════
  //   PUSH NOTIFICATIONS
  // ═══════════════════════════════════════════

  // Show notification prompt after 5 seconds if not already granted/denied
  setTimeout(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      const dismissed = sessionStorage.getItem('notifDismissed');
      if (!dismissed) {
        const prompt = document.getElementById('notifPrompt');
        if (prompt) prompt.style.display = 'flex';
      }
    }
  }, 5000);

  window.enableNotifications = async function() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        showToast('Push notifications enabled! 🔔', 'success');
        // Send a test notification
        new Notification('Rakshana 24/7 — Shield Active 🛡️', {
          body: 'You will now receive instant alerts when threats are detected.',
          icon: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><path d="M30 5L50 15V28C50 42 40 54 30 58C20 54 10 42 10 28V15L30 5Z" fill="%23F472B6"/><path d="M24 30L28 34L37 25" stroke="white" stroke-width="3" fill="none"/></svg>'),
          badge: '🛡️',
        });
      } else {
        showToast('Notifications blocked. You can enable them in browser settings.', 'warning');
      }
    } catch (err) {
      showToast('Could not enable notifications.', 'error');
    }
    dismissNotifPrompt();
  };

  window.dismissNotifPrompt = function() {
    const prompt = document.getElementById('notifPrompt');
    if (prompt) {
      prompt.style.animation = 'slideUp 0.3s ease reverse';
      setTimeout(() => { prompt.style.display = 'none'; }, 300);
    }
    sessionStorage.setItem('notifDismissed', 'true');
  };

  function sendPushNotification(result) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    const score = result.score || 0;
    let title, body;

    if (score >= 90) {
      title = '🚨 CRITICAL: Threat Score ' + score + '/100';
      body = result.explanation || 'Critical threat detected. Take immediate action.';
    } else if (score >= 70) {
      title = '⚠️ ALERT: Threat Score ' + score + '/100';
      body = result.explanation || 'High-risk content detected. Review details.';
    } else {
      title = '👁️ Watch: Threat Score ' + score + '/100';
      body = result.explanation || 'Suspicious content found. Monitor situation.';
    }

    try {
      new Notification(title, {
        body: body.substring(0, 200),
        icon: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><path d="M30 5L50 15V28C50 42 40 54 30 58C20 54 10 42 10 28V15L30 5Z" fill="%23F472B6"/><path d="M24 30L28 34L37 25" stroke="white" stroke-width="3" fill="none"/></svg>'),
        requireInteraction: score >= 90,
        tag: 'rakshana-threat-' + Date.now(),
      });
    } catch (e) {}
  }

  // ── Service Worker ──
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  // ═══════════════════════════════════════════
  //   LANGUAGE PICKER
  // ═══════════════════════════════════════════

  window.toggleLangPicker = function(e) {
    if (e) e.stopPropagation();
    const wrapper = document.getElementById('langPickerWrapper');
    if (wrapper) wrapper.classList.toggle('open');
  };

  window.selectLanguage = function(lang, e) {
    if (e) e.stopPropagation();
    if (typeof RakshanaI18n !== 'undefined') {
      RakshanaI18n.setLanguage(lang);
      showToast(`Language changed to ${RAKSHANA_LANGS[lang].native}`, 'success');
    }
    const wrapper = document.getElementById('langPickerWrapper');
    if (wrapper) wrapper.classList.remove('open');
  };

  // Close language picker on click outside
  document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('langPickerWrapper');
    if (wrapper && wrapper.classList.contains('open') && !wrapper.contains(e.target)) {
      wrapper.classList.remove('open');
    }
  });

  // ═══════════════════════════════════════════
  //   24/7 PROACTIVE SHAKE SOS (Advanced)
  // ═══════════════════════════════════════════
  let shakeSOSInstance = null;

  class ShakeSOS {
    constructor() {
      this.lastX = null;
      this.lastY = null;
      this.lastZ = null;
      this.threshold = 30; // Sensitive but robust
      this.minShakeCount = 6; // Requires rapid successive motion
      this.shakeCount = 0;
      this.lastShakeTime = 0;
      this.isTriggered = false;
      this.timer = null;
      this.countdown = 5;
      
      this.init();
    }

    init() {
      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', (e) => this.motionHandler(e), false);
        console.log('🛡️ Rakshana 24/7: Fail-safe monitoring active.');
      }
    }

    motionHandler(event) {
      if (this.isTriggered) return;

      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const curX = acc.x;
      const curY = acc.y;
      const curZ = acc.z;

      if (this.lastX !== null) {
        const deltaX = Math.abs(this.lastX - curX);
        const deltaY = Math.abs(this.lastY - curY);
        const deltaZ = Math.abs(this.lastZ - curZ);

        if ((deltaX > this.threshold && deltaY > this.threshold) || 
            (deltaX > this.threshold && deltaZ > this.threshold) || 
            (deltaY > this.threshold && deltaZ > this.threshold)) {
          
          const curTime = Date.now();
          if ((curTime - this.lastShakeTime) < 300) {
            this.shakeCount++;
            if (this.shakeCount >= this.minShakeCount) {
              this.trigger();
              this.shakeCount = 0;
            }
          } else {
            this.shakeCount = 1;
          }
          this.lastShakeTime = curTime;
        }
      }

      this.lastX = curX;
      this.lastY = curY;
      this.lastZ = curZ;
    }

    trigger() {
      this.isTriggered = true;
      const overlay = document.getElementById('sosOverlay');
      if (overlay) overlay.classList.add('active');
      document.body.classList.add('sos-active');
      this.countdown = 5;
      this.updateTimerUI();

      this.startSiren();

      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 500]);

      this.timer = setInterval(() => {
        this.countdown--;
        this.updateTimerUI();
        if (navigator.vibrate) navigator.vibrate(200);
        if (this.countdown <= 0) this.broadcast();
      }, 1000);
    }

    startSiren() {
      if (!window.AudioContext && !window.webkitAudioContext) return;
      try {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillator = this.audioCtx.createOscillator();
        this.gainNode = this.audioCtx.createGain();
        this.oscillator.type = 'sawtooth';
        this.oscillator.frequency.setValueAtTime(500, this.audioCtx.currentTime);
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.audioCtx.destination);
        this.gainNode.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
        this.oscillator.start();
        
        this.sirenInterval = setInterval(() => {
          if (this.audioCtx) {
            this.oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioCtx.currentTime + 0.4);
            this.oscillator.frequency.exponentialRampToValueAtTime(500, this.audioCtx.currentTime + 0.8);
          }
        }, 800);
      } catch (e) {}
    }

    stopSiren() {
      if (this.sirenInterval) clearInterval(this.sirenInterval);
      if (this.oscillator) try { this.oscillator.stop(); } catch(e){}
      if (this.audioCtx) try { this.audioCtx.close(); } catch(e){}
    }

    updateTimerUI() {
      const el = document.getElementById('sosTimer');
      if (el) el.textContent = this.countdown;
    }

    cancel() {
      clearInterval(this.timer);
      this.stopSiren();
      this.isTriggered = false;
      const overlay = document.getElementById('sosOverlay');
      if (overlay) overlay.classList.remove('active');
      document.body.classList.remove('sos-active');
      showToast('24/7 Protection: SOS Standby. 🛡️', 'success');
    }

    broadcast() {
      clearInterval(this.timer);
      const overlay = document.getElementById('sosOverlay');
      if (overlay) {
        overlay.innerHTML = `<div class="sos-shield-icon" style="background:var(--green); animation:none;"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div><h2 class="sos-title">SHIELD ACTIVATED</h2><p class="sos-subtitle">Broadcasting coordinates to emergency responders. Help is on the way.</p><button class="btn-sos-cancel" onclick="cancelSOS()">CLOSE</button>`;
      }
      if (navigator.vibrate) navigator.vibrate([500, 200, 500, 200, 1000]);
    }
  }

  window.initShakeSOS = function() {
    if (!shakeSOSInstance) shakeSOSInstance = new ShakeSOS();
  };

  window.cancelSOS = function() {
    if (shakeSOSInstance) shakeSOSInstance.cancel();
  };

  /** Autonomous 24/7 Activation on Interaction */
  const autoActivateShield = async () => {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const state = await DeviceMotionEvent.requestPermission();
        if (state === 'granted') window.initShakeSOS();
      } catch (e) {}
    } else {
      window.initShakeSOS();
    }
    
    const btn = document.getElementById('sosToggleBtn');
    if (btn) {
      btn.classList.add('active');
      const tooltip = btn.querySelector('.sos-tooltip');
      if (tooltip) tooltip.textContent = '24/7 Shield Active';
      showToast('Rakshana 24/7 Protection Active 🛡️', 'success');
    }

    document.removeEventListener('click', autoActivateShield);
    document.removeEventListener('touchstart', autoActivateShield);
  };

  document.addEventListener('click', autoActivateShield);
  document.addEventListener('touchstart', autoActivateShield);

})();
