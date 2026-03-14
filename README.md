# 🛡️ Rakshana 24/7
### Proactive Digital Safety and Cyber-Hygiene Platform for Women

[![Status: Production](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)](https://rakshana.safety)
[![Tech: Python/Flask](https://img.shields.io/badge/Backend-Flask_3.1-blue?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)
[![Tech: Vanilla JS](https://img.shields.io/badge/Frontend-Vanilla_JS-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **"Light that travels ahead of the harm."**  
> Rakshana 24/7 is an advanced, AI-powered platform designed to provide a proactive shield against digital harassment, doxxing, and cyber-threats. Unlike reactive reporting tools, Rakshana monitors the internet's perimeter to alert you *before* the harm reaches you.

---

## ✨ Key Features

### 🔍 Deep Intelligence Scanner
Utilizes a proprietary NLP-driven engine and high-frequency scanners to trace identifiers across Telegram, paste sites, and dark-web forums. 
- **Automated Monitoring**: Background tasks run every 4 hours via Celery.
- **Threat Scoring**: Intelligent ranking (0-100) based on context and severity.

### 🕵️ Anonymous Reporting
A secure, encrypted channel to report incidents without fear of retaliation.
- **Zero-Log Policy**: No IP addresses or personal identifiers are stored.
- **Direct Integration**: Options to forward reports to the National Cyber Crime Portal.

### 🏛️ Legal & Constitutional Rights
A comprehensive library of Indian cyber-laws (IPC, IT Act) translated and explained in simple terms across multiple languages.
- **Searchable Database**: Instant reference for sections related to stalking, doxxing, and morphed imagery.
- **Emergency Helplines**: One-tap access to women's safety helplines.

### 🎙️ AI Voice Assistant
A premium glassmorphism interface featuring "Rakshana AI" — a voice-activated guide that helps users navigate legal rights, perform scans, and file reports.

### 🌍 Universal Accessibility (i18n)
Fully internationalized platform supporting 6 core languages:
- 🇬🇧 English | 🇮🇳 हिन्दी | 🇮🇳 తెలుగు | 🇮🇳 ಕನ್ನಡ | 🇮🇳 മലയാളം | 🇮🇳 தமிழ்

---

## 🛠️ Technology Stack

### **Backend Infrastructure**
- **Framework**: Python 3.x / Flask
- **Asynchronous Tasks**: Celery + Redis
- **Database**: SQLAlchemy ORM (Secure Encryption at Rest)
- **Monitoring**: Telethon (Telegram Intelligence), BeautifulSoup4 (Scraping)
- **NLP**: NLTK (Natural Language Toolkit) for sentiment analysis and threat extraction.
- **Security**: JWT (JSON Web Tokens) for auth, Bcrypt for hashing, AES-256 for sensitive report encryption.

### **Frontend & UI/UX**
- **Architecture**: Multi-Page Application (MPA) with optimized asset loading.
- **Design System**: Hybrid Glassmorphism / Neumorphism theme for a premium, futuristic feel.
- **Interactions**: Vanilla JS, Socket.IO for real-time alerts.
- **PWA Ready**: Offline capabilities and background sync support via Service Workers.

---

## 🚀 Getting Started

### **Prerequisites**
- Python 3.9+
- Redis Server (for background task monitoring)

### **Quick Setup**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ashwin605/Rakshana-24-7.git
   cd Rakshana-24-7
   ```

2. **Install Dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Configure Environment**:
   Create a `.env` file in the `backend/` directory (Refer to `.env.example`):
   ```env
   SECRET_KEY=your_secure_key
   DATABASE_URL=sqlite:///rakshana.db
   REDIS_URL=redis://localhost:6379/0
   ```

4. **Launch Unified Server**:
   Run the master server script which initializes both the API and the local web server:
   ```bash
   python app.py
   ```
   - **Frontend**: [http://localhost:8000](http://localhost:8000)
   - **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 🏗️ Project Architecture

```text
Rakshana-24-7/
├── backend/
│   ├── app/                # Core Flask application logic
│   ├── migrations/         # Database schema migrations
│   ├── tests/              # Unit & Integration tests
│   ├── run.py              # Backend entry point
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── assets/             # Images, logos, and illustrations
│   ├── styles.css          # Main glassmorphism design system
│   ├── app.js              # Core frontend logic & API interface
│   ├── translations.js     # Internationalization engine
│   └── voice-assistant.js  # AI Voice Assistant logic
├── app.py                  # Unified startup script
└── sw.js                   # Service Worker for PWA/Notifications
```

---

## 🤝 Contributing
We welcome developers, legal experts, and advocates! 
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## ⚖️ Disclaimer
*Rakshana 24/7 is a digital safety tool designed for proactive monitoring and educational purposes. It is not a substitute for local law enforcement. In case of immediate physical danger, always contact local emergency services immediately (Dial 100/1090).*

---
<p align="center">Made with 🛡️ by the Rakshana Team</p>
