/* ============================================
   RAKSHANA 24/7 — API Service Layer
   Connects frontend to Flask backend
   ============================================ */

const API_BASE = 'http://localhost:5000/api';

const RakshanaAPI = {
  token: localStorage.getItem('rakshana_token') || null,
  refreshToken: localStorage.getItem('rakshana_refresh') || null,
  user: JSON.parse(localStorage.getItem('rakshana_user') || 'null'),

  headers() {
    const h = { 'Content-Type': 'application/json' };
    if (this.token) h['Authorization'] = `Bearer ${this.token}`;
    return h;
  },

  saveAuth(data) {
    this.token = data.access_token;
    this.refreshToken = data.refresh_token;
    this.user = data.user;
    localStorage.setItem('rakshana_token', data.access_token);
    localStorage.setItem('rakshana_refresh', data.refresh_token);
    localStorage.setItem('rakshana_user', JSON.stringify(data.user));
  },

  clearAuth() {
    this.token = null;
    this.refreshToken = null;
    this.user = null;
    localStorage.removeItem('rakshana_token');
    localStorage.removeItem('rakshana_refresh');
    localStorage.removeItem('rakshana_user');
  },

  isLoggedIn() {
    return !!this.token;
  },

  async request(endpoint, options = {}) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: this.headers(),
        ...options,
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 && this.refreshToken) {
          const refreshed = await this.refreshAuth();
          if (refreshed) {
            return this.request(endpoint, options);
          }
        }
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      return data;
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to API server. Make sure backend is running on port 5000.');
      }
      throw err;
    }
  },

  // ── Auth ──
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.saveAuth(data);
    return data;
  },

  async register(userData) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    this.saveAuth(data);
    return data;
  },

  async refreshAuth() {
    try {
      const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.refreshToken}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        this.token = data.access_token;
        this.refreshToken = data.refresh_token;
        localStorage.setItem('rakshana_token', data.access_token);
        localStorage.setItem('rakshana_refresh', data.refresh_token);
        return true;
      }
    } catch (e) {}
    this.clearAuth();
    return false;
  },

  async getMe() {
    return this.request('/auth/me');
  },

  // ── Dashboard ──
  async getDashboard() {
    return this.request('/dashboard/');
  },

  async getTimeline(days = 7) {
    return this.request(`/dashboard/timeline?days=${days}`);
  },

  async getStats() {
    return this.request('/dashboard/stats');
  },

  // ── Alerts ──
  async getAlerts(params = {}) {
    const q = new URLSearchParams(params).toString();
    return this.request(`/alerts/?${q}`);
  },

  async getAlertsSummary() {
    return this.request('/alerts/summary');
  },

  async markAlertRead(alertId) {
    return this.request(`/alerts/${alertId}/read`, { method: 'PUT' });
  },

  async takeAlertAction(alertId, action) {
    return this.request(`/alerts/${alertId}/action`, {
      method: 'PUT',
      body: JSON.stringify({ action })
    });
  },

  // ── Scans ──
  async triggerScan() {
    return this.request('/scan/trigger', { method: 'POST' });
  },

  async getScanStatus() {
    return this.request('/scan/status');
  },

  async getScanHistory() {
    return this.request('/scan/history');
  },

  async getDemoScan() {
    return this.request('/scan/demo');
  },

  async analyzeContent(text) {
    return this.request('/scan/analyze', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },

  async analyzeFile(file, additionalText = '') {
    const formData = new FormData();
    formData.append('file', file);
    if (additionalText) formData.append('text', additionalText);
    // Don't use this.headers() because FormData sets its own Content-Type
    const headers = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    try {
      const res = await fetch(`${API_BASE}/scan/analyze`, {
        method: 'POST',
        headers,
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      return data;
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to API server.');
      }
      throw err;
    }
  },

  // ── Reports (no auth needed) ──
  async submitReport(reportData) {
    return this.request('/reports/submit', {
      method: 'POST',
      body: JSON.stringify(reportData),
      headers: { 'Content-Type': 'application/json' },
    });
  },

  async getReportStatus(token) {
    return this.request(`/reports/status/${token}`);
  },

  async getReportTypes() {
    return this.request('/reports/types');
  },

  // ── Legal (no auth needed) ──
  async getLaws(query = '') {
    const q = query ? `?q=${encodeURIComponent(query)}` : '';
    return this.request(`/legal/laws${q}`);
  },

  async getRights() {
    return this.request('/legal/rights');
  },

  async getHelplines() {
    return this.request('/legal/helplines');
  },

  // ── i18n ──
  async getStrings(lang = 'en') {
    return this.request(`/i18n/strings?lang=${lang}`);
  },

  // ── Health ──
  async healthCheck() {
    return this.request('/health');
  },

  // ── Users ──
  async exportData() {
    return this.request('/users/export');
  },
};
