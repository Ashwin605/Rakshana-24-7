/* ============================================
   RAKSHANA 24/7 — Voice Assistant Engine
   Multilingual AI assistant with full site control
   ============================================ */

(function() {
  'use strict';

  // ── Language Config ──
  const VA_LANGS = {
    en: { name: 'English',   native: 'English',   flag: '🇬🇧', bcp: 'en-US', greeting: "Hi! I'm Rakshana Shield, your safety assistant. How can I help you today?" },
    hi: { name: 'Hindi',     native: 'हिन्दी',     flag: '🇮🇳', bcp: 'hi-IN', greeting: "नमस्ते! मैं रक्षणा शील्ड हूँ, आपकी सुरक्षा सहायक। मैं आपकी कैसे मदद कर सकती हूँ?" },
    te: { name: 'Telugu',    native: 'తెలుగు',    flag: '🇮🇳', bcp: 'te-IN', greeting: "హాయ్! నేను రక్షణ షీల్డ్, మీ భద్రతా సహాయకురాలు. నేను మీకు ఎలా సహాయం చేయగలను?" },
    ta: { name: 'Tamil',     native: 'தமிழ்',     flag: '🇮🇳', bcp: 'ta-IN', greeting: "வணக்கம்! நான் ரக்ஷணா ஷீல்டு, உங்கள் பாதுகாப்பு உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?" },
    kn: { name: 'Kannada',   native: 'ಕನ್ನಡ',   flag: '🇮🇳', bcp: 'kn-IN', greeting: "ನಮಸ್ಕಾರ! ನಾನು ರಕ್ಷಣ ಶೀಲ್ಡ್, ನಿಮ್ಮ ಸುರಕ್ಷತಾ ಸಹಾಯಕ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?" },
    ml: { name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', bcp: 'ml-IN', greeting: "ഹായ്! ഞാൻ രക്ഷണ ഷീൽഡ്, നിങ്ങളുടെ സുരക്ഷാ സഹായി. എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?" },
    bn: { name: 'Bengali',   native: 'বাংলা',    flag: '🇮🇳', bcp: 'bn-IN', greeting: "হ্যালো! আমি রক্ষণা শিল্ড, আপনার নিরাপত্তা সহকারী। আমি কীভাবে আপনাকে সাহায্য করতে পারি?" },
    mr: { name: 'Marathi',   native: 'मराठी',     flag: '🇮🇳', bcp: 'mr-IN', greeting: "नमस्कार! मी रक्षणा शील्ड, तुमची सुरक्षा सहाय्यक. मी तुम्हाला कशी मदत करू शकते?" },
    gu: { name: 'Gujarati',  native: 'ગુજરાતી',  flag: '🇮🇳', bcp: 'gu-IN', greeting: "નમસ્તે! હું રક્ષણા શીલ્ડ, તમારી સુરક્ષા સહાયક. હું તમને કેવી રીતે મદદ કરી શકું?" },
    pa: { name: 'Punjabi',   native: 'ਪੰਜਾਬੀ',    flag: '🇮🇳', bcp: 'pa-IN', greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਰਕਸ਼ਣਾ ਸ਼ੀਲਡ ਹਾਂ, ਤੁਹਾਡੀ ਸੁਰੱਖਿਆ ਸਹਾਇਕ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ?" },
    ur: { name: 'Urdu',      native: 'اردو',      flag: '🇮🇳', bcp: 'ur-IN', greeting: "ہیلو! میں رکشنا شیلڈ ہوں، آپ کی حفاظتی معاون۔ میں آپ کی کیسے مدد کر سکتی ہوں؟" },
    fr: { name: 'French',    native: 'Français',  flag: '🇫🇷', bcp: 'fr-FR', greeting: "Bonjour! Je suis Rakshana Shield, votre assistante de sécurité. Comment puis-je vous aider?" },
    es: { name: 'Spanish',   native: 'Español',   flag: '🇪🇸', bcp: 'es-ES', greeting: "¡Hola! Soy Rakshana Shield, tu asistente de seguridad. ¿Cómo puedo ayudarte?" },
    de: { name: 'German',    native: 'Deutsch',   flag: '🇩🇪', bcp: 'de-DE', greeting: "Hallo! Ich bin Rakshana Shield, Ihre Sicherheitsassistentin. Wie kann ich Ihnen helfen?" },
    ja: { name: 'Japanese',  native: '日本語',     flag: '🇯🇵', bcp: 'ja-JP', greeting: "こんにちは！私はラクシャナシールド、あなたの安全アシスタントです。何かお手伝いできますか？" },
    ko: { name: 'Korean',    native: '한국어',     flag: '🇰🇷', bcp: 'ko-KR', greeting: "안녕하세요! 저는 락샤나 쉴드, 당신의 안전 도우미입니다. 어떻게 도와드릴까요?" },
    zh: { name: 'Chinese',   native: '中文',       flag: '🇨🇳', bcp: 'zh-CN', greeting: "你好！我是Rakshana Shield，你的安全助手。我能为你做什么？" },
    ar: { name: 'Arabic',    native: 'العربية',   flag: '🇸🇦', bcp: 'ar-SA', greeting: "مرحبا! أنا ركشانا شيلد، مساعدتك الأمنية. كيف يمكنني مساعدتك؟" },
    pt: { name: 'Portuguese', native: 'Português', flag: '🇧🇷', bcp: 'pt-BR', greeting: "Olá! Eu sou Rakshana Shield, sua assistente de segurança. Como posso ajudá-la?" },
    ru: { name: 'Russian',   native: 'Русский',   flag: '🇷🇺', bcp: 'ru-RU', greeting: "Привет! Я Ракшана Шилд, ваш ассистент безопасности. Как я могу вам помочь?" },
  };

  // ── Intent Patterns (multilingual keywords) ──
  const INTENTS = {
    navigate_home:     { keywords: ['home','go home','main page','होम','హోమ్','முகப்பு','ಮುಖಪುಟ','ഹോം','go to home','take me home','homepage'], action: () => navigateTo('index.html') },
    navigate_scan:     { keywords: ['scan','scanner','threat scan','स्कैन','స్కాన్','ஸ்கேன்','ಸ್ಕ್ಯಾನ್','സ്കാൻ','go to scan','open scan','start scan'], action: () => navigateTo('scan.html') },
    navigate_report:   { keywords: ['report','file report','anonymous report','रिपोर्ट','రిపోర్ట్','அறிக்கை','ವರದಿ','റിപ്പോർട്ട്','make report','go to report'], action: () => navigateTo('report.html') },
    navigate_legal:    { keywords: ['legal','legal rights','law','rights','कानूनी','చట్టపరమైన','சட்ட','ಕಾನೂನು','നിയമ','my rights','legal help'], action: () => navigateTo('legal.html') },
    navigate_how:      { keywords: ['how it works','how does it work','explain','कैसे काम','ఎలా పనిచేస్తుంది','எப்படி வேலை','ಹೇಗೆ ಕೆಲಸ','എങ്ങനെ','how to use'], action: () => navigateTo('how-it-works.html') },
    navigate_dashboard:{ keywords: ['dashboard','my dashboard','डैशबोर्ड','డ్యాష్‌బోర్డ్','டாஷ்போர்டு','ಡ್ಯಾಶ್‌ಬೋರ್ಡ್','ഡാഷ്‌ബോർഡ്'], action: () => navigateTo('dashboard.html') },
    navigate_signin:   { keywords: ['sign in','login','log in','signin','साइन इन','సైన్ ఇన్','உள்நுழை','ಸೈನ್ ಇನ್','സൈൻ ഇൻ'], action: () => navigateTo('auth.html') },
    scroll_top:        { keywords: ['scroll top','go top','top of page','scroll up','back to top','ऊपर','పైకి','மேலே','ಮೇಲೆ','മുകളിൽ'], action: () => { window.scrollTo({top:0,behavior:'smooth'}); return acted('Scrolled to top'); } },
    scroll_bottom:     { keywords: ['scroll down','bottom','go to bottom','नीचे','క్రిందకు','கீழே','ಕೆಳಗೆ','താഴെ','end of page'], action: () => { window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'}); return acted('Scrolled to bottom'); } },
    toggle_theme:      { keywords: ['dark mode','dark theme','night mode','light mode','theme','डार्क मोड','డార్క్ మోడ్','இருண்ட','ಡಾರ್ಕ್','ഡാർക്ക്'], action: toggleDarkMode },
    open_sos:          { keywords: ['sos','emergency','help me','danger','खतरा','అత్యవసరం','அவசரம்','ತುರ್ತು','അടിയന്തിരം','i am in danger','help','safety'], action: triggerSOS },
    what_is_rakshana:  { keywords: ['what is rakshana','about rakshana','tell me about','what do you do','who are you','explain rakshana','रक्षणा क्या है','what can you do'], action: explainRakshana },
    change_language:   { keywords: ['change language','switch language','भाषा बदलें','భాష మార్చండి','மொழி மாற்று','ಭಾಷೆ ಬದಲಿಸಿ','ഭാഷ മാറ്റുക','language'], action: showLanguageHelp },
    start_protection:  { keywords: ['start protection','protect me','get protected','सुरक्षा शुरू','రక్షణ ప్రారంభ','பாதுகாப்பு','ರಕ್ಷಣೆ','സംരക്ഷണം','create shield'], action: () => { if(typeof handleGetProtected==='function') handleGetProtected(); return acted('Starting protection setup...'); } },
    faq_section:       { keywords: ['faq','questions','frequently asked','सवाल','ప్రశ్నలు','கேள்விகள்','ಪ್ರಶ್ನೆ','ചോദ്യങ്ങൾ'], action: () => scrollToSection('#faq') },
    features_section:  { keywords: ['features','what features','क्या-क्या','ఫీచర్లు','அம்சங்கள்','ವೈಶಿಷ್ಟ್ಯ','ഫീച്ചറുകൾ','capabilities'], action: () => scrollToSection('#resources') },
    read_page:         { keywords: ['read this page','read aloud','read content','read to me','पढ़ो','చదవండి','படி','ಓದು','വായിക്കൂ'], action: readPageContent },
    stop_speaking:     { keywords: ['stop','stop speaking','quiet','be quiet','shut up','चुप','ఆపు','நிறுத்து','ನಿಲ್ಲಿಸು','നിർത്തൂ','silence','mute'], action: () => { window.speechSynthesis.cancel(); return acted('Stopped speaking.'); } },
    helplines:         { keywords: ['helpline','call','phone number','emergency number','हेल्पलाइन','హెల్ప్‌లైన్','உதவி எண்','ಹೆಲ್ಪ್‌ಲೈನ್','ഹെൽപ്ലൈൻ','1091','181','women helpline','cyber crime'], action: showHelplines },
    greeting:          { keywords: ['hello','hi','hey','namaste','नमस्ते','హాయ్','வணக்கம்','ನಮಸ್ಕಾರ','ഹലോ','good morning','good evening'], action: () => null },
  };

  // ── State ──
  let currentLang = localStorage.getItem('va_lang') || 'en';
  let isOpen = false;
  let isListening = false;
  let recognition = null;
  let vizInterval = null;
  let panelEl, messagesEl, inputEl, micBtn, vizEl, speakingEl;

  // ── Helpers ──
  function acted(msg) { return { type: 'action', message: msg }; }

  function navigateTo(page) {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    if (current === page) return acted(`You're already on ${page.replace('.html','').replace(/-/g,' ')} page.`);
    addMessage(`Navigating to ${page.replace('.html','').replace(/-/g,' ')}...`, 'assistant');
    setTimeout(() => window.location.href = page, 600);
    return { type: 'navigating' };
  }

  function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); return acted(`Scrolled to ${selector} section.`); }
    return acted("I couldn't find that section on this page.");
  }

  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    return acted(isDark ? 'Dark mode enabled.' : 'Light mode enabled.');
  }

  function triggerSOS() {
    const overlay = document.getElementById('sosOverlay');
    if (overlay) { overlay.style.display = 'flex'; }
    return acted('🚨 Emergency SOS triggered! Stay safe. Helplines: Women Helpline 181, Police 100, Cyber Crime 1930.');
  }

  function explainRakshana() {
    return acted("Rakshana 24/7 is an AI-powered digital safety platform for women. It monitors the internet for threats targeting you — stalkerware, deepfakes, doxxing — and alerts you BEFORE harm reaches you. It includes threat scanning, legal rights guidance, anonymous reporting, and emergency SOS features. All data is AES-256 encrypted. Your safety, your control.");
  }

  function showLanguageHelp() {
    return acted("I support 20 languages! Use the language chips above the chat, or say 'switch to Hindi', 'switch to Telugu', etc. You can also say the language name directly.");
  }

  function showHelplines() {
    return acted("🆘 Emergency Helplines:\n• Women Helpline: 181\n• Police: 100\n• Cyber Crime: 1930\n• NCW Helpline: 7827-170-170\n• Childline: 1098\n• cybercrime.gov.in\n\nSay 'SOS' to trigger emergency mode.");
  }

  function readPageContent() {
    const main = document.querySelector('main') || document.querySelector('.hero') || document.body;
    const text = main.innerText.substring(0, 1000);
    speak(text);
    return acted('Reading the page content aloud...');
  }

  // ── Intent Matching ──
  function matchIntent(text) {
    const lower = text.toLowerCase().trim();

    // Check for language switch commands
    for (const [code, lang] of Object.entries(VA_LANGS)) {
      if (lower.includes(`switch to ${lang.name.toLowerCase()}`) || lower.includes(`change to ${lang.name.toLowerCase()}`) ||
          lower === lang.name.toLowerCase() || lower === lang.native.toLowerCase() ||
          lower.includes(lang.native.toLowerCase())) {
        return { intent: 'switch_language', lang: code };
      }
    }

    // Match intents
    let bestMatch = null, bestScore = 0;
    for (const [name, intent] of Object.entries(INTENTS)) {
      for (const kw of intent.keywords) {
        if (lower.includes(kw)) {
          const score = kw.length;
          if (score > bestScore) { bestScore = score; bestMatch = { name, ...intent }; }
        }
      }
    }
    return bestMatch;
  }

  // ── Process User Input ──
  function processInput(text) {
    if (!text.trim()) return;
    addMessage(text, 'user');
    showTyping();

    setTimeout(() => {
      hideTyping();
      const match = matchIntent(text);

      if (match && match.intent === 'switch_language') {
        setVALanguage(match.lang);
        addMessage(VA_LANGS[match.lang].greeting, 'assistant');
        speak(VA_LANGS[match.lang].greeting);
        return;
      }

      if (match && match.name === 'greeting') {
        const lang = VA_LANGS[currentLang];
        addMessage(lang.greeting, 'assistant');
        speak(lang.greeting);
        return;
      }

      if (match && match.action) {
        const result = match.action();
        if (result && result.message) {
          addMessage(result.message, 'assistant');
          speak(result.message.replace(/[🚨🆘•\n]/g, ' '));
        }
        return;
      }

      // Fallback — smart contextual response
      const fallback = generateFallback(text);
      addMessage(fallback, 'assistant');
      speak(fallback);
    }, 500 + Math.random() * 400);
  }

  function generateFallback(text) {
    const lower = text.toLowerCase();
    const responses = {
      en: `I understand you said: "${text}". I can help you with:\n• Navigation — "Go to Scan", "Open Report"\n• Safety — "SOS", "Helplines"\n• Information — "What is Rakshana", "Legal Rights"\n• Controls — "Scroll top", "Read page", "Dark mode"\n• Languages — "Switch to Hindi"\nTry one of these commands!`,
      hi: `मैं समझती हूँ आपने कहा: "${text}"। मैं इनमें मदद कर सकती हूँ:\n• नेविगेशन — "स्कैन पर जाओ"\n• सुरक्षा — "SOS", "हेल्पलाइन"\n• जानकारी — "रक्षणा क्या है"\nइन कमांड्स को आज़माएं!`,
    };
    return responses[currentLang] || responses.en;
  }

  // ── TTS ──
  function speak(text) {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = VA_LANGS[currentLang]?.bcp || 'en-US';
    utter.rate = 0.95;
    utter.pitch = 1.05;

    // Try to pick a voice matching the language
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = utter.lang.substring(0, 2);
    const matched = voices.find(v => v.lang.startsWith(langPrefix));
    if (matched) utter.voice = matched;

    utter.onstart = () => showSpeaking(true);
    utter.onend = () => showSpeaking(false);
    utter.onerror = () => showSpeaking(false);
    window.speechSynthesis.speak(utter);
  }

  function showSpeaking(on) {
    if (speakingEl) speakingEl.classList.toggle('active', on);
  }

  // ── Speech Recognition ──
  function initRecognition() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = VA_LANGS[currentLang]?.bcp || 'en-US';

    recognition.onresult = (e) => {
      let final = '', interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      if (inputEl) inputEl.value = final || interim;
      if (final) {
        stopListening();
        processInput(final);
      }
    };

    recognition.onerror = () => stopListening();
    recognition.onend = () => { if (isListening) stopListening(); };
    return recognition;
  }

  function startListening() {
    if (!recognition) initRecognition();
    if (!recognition) { addMessage("Voice recognition is not supported in your browser. Please type your request instead.", 'assistant'); return; }
    recognition.lang = VA_LANGS[currentLang]?.bcp || 'en-US';
    isListening = true;
    micBtn?.classList.add('listening');
    vizEl?.classList.add('active');
    startVizAnimation();
    try { recognition.start(); } catch(e) { stopListening(); }
  }

  function stopListening() {
    isListening = false;
    micBtn?.classList.remove('listening');
    vizEl?.classList.remove('active');
    stopVizAnimation();
    try { recognition?.stop(); } catch(e) {}
  }

  function startVizAnimation() {
    const bars = vizEl?.querySelectorAll('.va-viz-bar');
    if (!bars) return;
    vizInterval = setInterval(() => {
      bars.forEach(bar => { bar.style.height = (6 + Math.random() * 28) + 'px'; });
    }, 100);
  }

  function stopVizAnimation() {
    clearInterval(vizInterval);
    vizEl?.querySelectorAll('.va-viz-bar')?.forEach(bar => { bar.style.height = '6px'; });
  }

  // ── UI Helpers ──
  function addMessage(text, role) {
    if (!messagesEl) return;
    const div = document.createElement('div');
    div.className = `va-msg ${role}`;
    // Support newlines
    div.innerHTML = text.replace(/\n/g, '<br>');
    const time = document.createElement('span');
    time.className = 'va-msg-time';
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    div.appendChild(time);
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    if (!messagesEl) return;
    const d = document.createElement('div');
    d.className = 'va-typing';
    d.id = 'vaTyping';
    d.innerHTML = '<div class="va-typing-dot"></div><div class="va-typing-dot"></div><div class="va-typing-dot"></div>';
    messagesEl.appendChild(d);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() { document.getElementById('vaTyping')?.remove(); }

  function setVALanguage(lang) {
    currentLang = lang;
    localStorage.setItem('va_lang', lang);
    document.querySelectorAll('.va-lang-chip').forEach(c => c.classList.toggle('active', c.dataset.lang === lang));
    if (recognition) recognition.lang = VA_LANGS[lang]?.bcp || 'en-US';
    // Sync website language if supported
    if (typeof RakshanaI18n !== 'undefined' && ['en','hi','te','kn','ml','ta'].includes(lang)) {
      RakshanaI18n.setLanguage(lang);
    }
  }

  // ── Build UI ──
  function buildUI() {
    // Trigger button
    const trigger = document.createElement('button');
    trigger.className = 'va-trigger';
    trigger.id = 'vaTrigger';
    trigger.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="19" x2="12" y2="23" stroke="white" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="23" x2="16" y2="23" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
      <span class="va-trigger-tooltip">Rakshana Voice Assistant</span>
    `;
    trigger.onclick = togglePanel;
    document.body.appendChild(trigger);

    // Panel
    panelEl = document.createElement('div');
    panelEl.className = 'va-panel';
    panelEl.id = 'vaPanel';

    // Build lang chips (show top 8 initially)
    const topLangs = ['en','hi','te','ta','kn','ml','bn','mr','gu','pa','ur','fr','es','de','ja','ko','zh','ar','pt','ru'];
    let langChips = topLangs.map(code => {
      const l = VA_LANGS[code];
      return `<button class="va-lang-chip ${code===currentLang?'active':''}" data-lang="${code}" title="${l.name}">${l.flag} ${l.native}</button>`;
    }).join('');

    panelEl.innerHTML = `
      <div class="va-header">
        <div class="va-avatar"><svg viewBox="0 0 24 24"><path d="M12 2L20 7V12C20 18 15 21 12 22C9 21 4 18 4 12V7L12 2Z" fill="white" opacity="0.9"/><path d="M9 12l2 2 4-4" stroke="rgba(228,29,72,1)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div class="va-header-info">
          <div class="va-header-title">Rakshana Shield <span class="va-live-dot"></span></div>
          <div class="va-header-subtitle">AI Safety Assistant • 20 Languages</div>
        </div>
        <div class="va-header-actions">
          <button class="va-header-btn" id="vaMinimize" title="Minimize"><svg viewBox="0 0 24 24"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg></button>
          <button class="va-header-btn" id="vaClose" title="Close"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        </div>
      </div>
      <div class="va-lang-bar">${langChips}</div>
      <div class="va-messages" id="vaMessages"></div>
      <div class="va-suggestions" id="vaSuggestions">
        <button class="va-suggestion-chip" data-cmd="What is Rakshana?"><span class="chip-icon">🛡️</span> What is Rakshana?</button>
        <button class="va-suggestion-chip" data-cmd="Go to Scan"><span class="chip-icon">🔍</span> Scan Threats</button>
        <button class="va-suggestion-chip" data-cmd="Show helplines"><span class="chip-icon">📞</span> Helplines</button>
        <button class="va-suggestion-chip" data-cmd="Legal Rights"><span class="chip-icon">⚖️</span> Legal Rights</button>
        <button class="va-suggestion-chip" data-cmd="File a Report"><span class="chip-icon">📝</span> Report</button>
        <button class="va-suggestion-chip" data-cmd="SOS Emergency"><span class="chip-icon">🚨</span> SOS</button>
      </div>
      <div class="va-speaking-indicator" id="vaSpeaking"><div class="va-speaking-wave"><span></span><span></span><span></span><span></span><span></span></div> Speaking...</div>
      <div class="va-visualizer" id="vaVisualizer">${'<div class="va-viz-bar"></div>'.repeat(20)}<div class="va-viz-label"><span class="listening-dot"></span>Listening...</div></div>
      <div class="va-input-area">
        <textarea class="va-text-input" id="vaInput" placeholder="Type or speak your request..." rows="1"></textarea>
        <button class="va-mic-btn" id="vaMicBtn" title="Voice Input"><svg viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></button>
        <button class="va-send-btn" id="vaSendBtn" title="Send"><svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"/></svg></button>
      </div>
    `;
    document.body.appendChild(panelEl);

    // Cache elements
    messagesEl = document.getElementById('vaMessages');
    inputEl = document.getElementById('vaInput');
    micBtn = document.getElementById('vaMicBtn');
    vizEl = document.getElementById('vaVisualizer');
    speakingEl = document.getElementById('vaSpeaking');

    // Events
    document.getElementById('vaClose').onclick = () => togglePanel();
    document.getElementById('vaMinimize').onclick = () => togglePanel();
    micBtn.onclick = () => isListening ? stopListening() : startListening();
    document.getElementById('vaSendBtn').onclick = sendText;
    inputEl.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText(); } });
    inputEl.addEventListener('input', autoResize);

    // Lang chips
    panelEl.querySelectorAll('.va-lang-chip').forEach(chip => {
      chip.onclick = () => {
        const lang = chip.dataset.lang;
        setVALanguage(lang);
        addMessage(VA_LANGS[lang].greeting, 'assistant');
        speak(VA_LANGS[lang].greeting);
      };
    });

    // Suggestion chips
    panelEl.querySelectorAll('.va-suggestion-chip').forEach(chip => {
      chip.onclick = () => processInput(chip.dataset.cmd);
    });

    // Load voices
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }

  function sendText() {
    const text = inputEl?.value?.trim();
    if (!text) return;
    inputEl.value = '';
    autoResize();
    processInput(text);
  }

  function autoResize() {
    if (!inputEl) return;
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 80) + 'px';
  }

  function togglePanel() {
    isOpen = !isOpen;
    panelEl?.classList.toggle('open', isOpen);
    document.getElementById('vaTrigger')?.classList.toggle('open', isOpen);
    if (isOpen && messagesEl && !messagesEl.children.length) {
      addMessage(VA_LANGS[currentLang].greeting, 'assistant');
    }
  }

  // ── Keyboard Shortcut ──
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'V') {
      e.preventDefault();
      togglePanel();
      if (isOpen) setTimeout(() => startListening(), 400);
    }
  });

  // ── Init ──
  function init() {
    buildUI();
    initRecognition();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
