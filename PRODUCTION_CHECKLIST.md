# Rakshana 24/7 — Production Deployment Checklist

## 🚨 CRITICAL SECURITY ISSUES (Must Fix)

### 1. ✅ CORS Configuration
**Status:** FIXED in `backend/app/__init__.py`
- Restricted CORS to specific origins from `CORS_ORIGINS` env variable
- Removed wildcard origins
- Set `supports_credentials=True` only with restricted origins

**Action:** Set `CORS_ORIGINS` environment variable to your domain:
```bash
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

---

### 2. ✅ Hardcoded Secrets
**Status:** FIXED in `backend/config.py`
- Removed all default values for secrets
- Application now raises error if secrets not set
- Use `.env.example` as template

**Action:** Generate and set secrets:
```bash
# Generate SECRET_KEY
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Generate JWT_SECRET_KEY  
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Generate ENCRYPTION_KEY (must be 32 bytes)
python -c "import secrets; print(secrets.token_hex(16))"
```

Set in `.env`:
```
SECRET_KEY=<your-generated-key>
JWT_SECRET_KEY=<your-generated-key>
ENCRYPTION_KEY=<your-32-byte-key>
```

---

### 3. ✅ Security Headers
**Status:** FIXED in `backend/app/__init__.py`
- Added X-Frame-Options, X-Content-Type-Options, CSP
- HSTS enabled in production only
- All headers sent with every response

**Action:** Verify in production
```bash
curl -I https://yourdomain.com
# Should show: Strict-Transport-Security, X-Frame-Options, etc
```

---

### 4. ✅ Rate Limiting on Auth
**Status:** FIXED in `backend/app/routes/auth.py`
- Login endpoint: 10 attempts per hour per IP
- Register endpoint: 5 attempts per hour per IP
- Uses Flask-Limiter with Redis backend

**Dependency:** `flask-limiter` (add to `requirements.txt`)

**Action:** Ensure Redis is running and `REDIS_URL` is set

---

### 5. ✅ JWT Tokens in HttpOnly Cookies
**Status:** FIXED in `backend/config.py`
- Changed `JWT_TOKEN_LOCATION` from headers to cookies
- Set `JWT_COOKIE_HTTPONLY=True` (prevents XSS theft)
- Set `JWT_COOKIE_SECURE=True` (HTTPS only)
- Set `JWT_COOKIE_SAMESITE="Strict"` (CSRF protection)

**Action:** 
- Update frontend API calls to handle cookies (no localStorage)
- Update `frontend/api.js` to use fetch with `credentials: 'include'`

---

### 6. ✅ Database Connection Pooling
**Status:** FIXED in `backend/config.py`
```python
SQLALCHEMY_ENGINE_OPTIONS = {
    "pool_size": 10,
    "pool_recycle": 3600,
    "pool_pre_ping": True,
}
```

**Action:** Use PostgreSQL in production (not SQLite)

---

### 7. ⚠️ Frontend XSS Vulnerabilities
**Status:** PARTIALLY FIXED
- Added DOMPurify to `package.json`
- Need to update `frontend/app.js` to sanitize HTML

**Action:** Update unsafe `.innerHTML` calls:
```javascript
// BEFORE (vulnerable)
element.innerHTML = data.alerts.map(a => `<div>${a.title}</div>`).join('');

// AFTER (safe)
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(
  data.alerts.map(a => `<div>${a.title}</div>`).join('')
);
```

Locations to fix:
- `frontend/app.js` line 557, 723, 894
- Use `DOMPurify.sanitize()` wrapper

---

### 8. ⚠️ Encryption Salt
**Status:** NEEDS FIXING
**File:** `backend/app/utils/encryption.py`
**Issue:** Fixed salt defeats randomness purpose

**Action:** Generate random salt per user:
```python
import os
salt = os.urandom(16)  # Random 16 bytes per user
```

---

## 📋 Production Checklist

### Infrastructure
- [ ] Use PostgreSQL (not SQLite)
  ```bash
  # Example: Create production database
  createdb rakshana_prod
  ```
- [ ] Redis running with password authentication
  ```bash
  # Test connection
  redis-cli -u redis://:password@localhost:6379 ping
  ```
- [ ] Nginx reverse proxy with SSL/TLS
- [ ] Enable HTTPS with valid certificate (Let's Encrypt)
- [ ] Configure firewall to allow only 443/80

### Environment
- [ ] Set `FLASK_ENV=production`
- [ ] All secrets in `.env` file (never in code)
- [ ] `.env` added to `.gitignore` (verify with `git check-ignore .env`)
- [ ] Database backups configured
- [ ] Error tracking (Sentry, DataDog, etc.)

### Security
- [ ] Rotate all secrets before deployment
- [ ] Enable database encryption at rest
- [ ] Enable Redis TLS
- [ ] WAF rules configured (AWS WAF, Cloudflare, ModSecurity)
- [ ] API rate limiting enabled (✅ Done: 10 login/hour, 5 register/hour)
- [ ] CORS restricted to your domain (✅ Done)
- [ ] Security headers enabled (✅ Done)

### Frontend
- [ ] Remove all `console.log()` statements
- [ ] Update token storage to use HttpOnly cookies
- [ ] Add DOMPurify sanitization for user content
- [ ] Update API calls: `credentials: 'include'`
- [ ] Test on mobile browsers

### Backend
- [ ] Test all auth flows with rate limiting
- [ ] Verify security headers in response
- [ ] Test database connection pooling under load
- [ ] Verify JWT expiry and refresh token rotation
- [ ] Check error messages (no stack traces to clients)

### Monitoring
- [ ] Set up log aggregation (CloudWatch, Datadog, ELK)
- [ ] Health check endpoint monitored
- [ ] Alert on failed login attempts (brute force)
- [ ] Alert on high error rates
- [ ] Alert on database connection pool exhaustion

### Testing
- [ ] Load test: `locust -f locustfile.py --headless -u 1000 -r 50`
- [ ] Security scan: `owasp-zap --self-signed`
- [ ] SSL/TLS test: `testssl.sh https://yourdomain.com`
- [ ] Test CORS: `curl -H "Origin: https://evil.com" https://yourdomain.com`

---

## 🚀 Deployment Steps

### Step 1: Prepare Secrets
```bash
cd backend
cp .env.example .env
# Edit .env with production values
source .env  # Verify all secrets set
```

### Step 2: Set Up Database
```bash
# PostgreSQL
createdb rakshana_prod
export DATABASE_URL="postgresql://user:password@localhost/rakshana_prod"
python app.py  # Creates tables
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
pip install flask-limiter  # For rate limiting
npm install               # Frontend dependencies
```

### Step 4: Run Application
```bash
# Production server (use gunicorn, not Flask dev server)
gunicorn -w 4 -b 0.0.0.0:5000 --certfile=/path/to/cert --keyfile=/path/to/key wsgi:app
```

### Step 5: Verify Deployment
```bash
# Test API
curl -H "Origin: https://yourdomain.com" https://yourdomain.com/api/health

# Check security headers
curl -I https://yourdomain.com

# Test CORS
curl -H "Origin: https://evil.com" -v https://yourdomain.com/api/health
# Should NOT have Access-Control-Allow-Origin header
```

---

## 🔐 Secret Management (Best Practice)

**❌ Don't:** Store secrets in `.env` files in production

**✅ Do:** Use secret management service:
- **AWS:** AWS Secrets Manager
  ```python
  import boto3
  client = boto3.client('secretsmanager')
  secret = client.get_secret_value(SecretId='rakshana/prod')
  ```
  
- **Docker:** Docker Secrets
- **Kubernetes:** kubectl secrets
- **Hashicorp Vault**

---

## 🚨 Common Mistakes to Avoid

1. ❌ Committing `.env` file to git
2. ❌ Using SQLite in production
3. ❌ Hardcoding API keys
4. ❌ Leaving debug mode on
5. ❌ Not rotating secrets after deployment
6. ❌ Missing HTTPS
7. ❌ Not monitoring error logs
8. ❌ Forgetting to update CORS origins
9. ❌ Running with default passwords
10. ❌ Not testing security fixes before deployment

---

## 📞 Emergency Contacts

If you discover a security issue:
1. **DO NOT** commit secrets to public repository
2. **DO** immediately rotate affected secrets
3. **DO** enable forensics/audit logging
4. **DO** notify affected users
5. **DO** file incident report

---

**Last Updated:** 2025-04-20  
**Maintained By:** Rakshana Security Team
