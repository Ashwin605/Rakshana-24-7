/* ============================================
   RAKSHANA 24/7 — Multi-Language Translations
   Supported: English, Hindi, Telugu, Kannada, Malayalam, Tamil
   ============================================ */

const RAKSHANA_LANGS = {
  en: { label: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr' },
  hi: { label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  te: { label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', dir: 'ltr' },
  kn: { label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳', dir: 'ltr' },
  ml: { label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', dir: 'ltr' },
  ta: { label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', dir: 'ltr' },
};

const TRANSLATIONS = {
  // ═══════════════════════════════════════════
  //   NAVIGATION
  // ═══════════════════════════════════════════
  'nav.home': {
    en: 'Home', hi: 'होम', te: 'హోమ్', kn: 'ಮುಖಪುಟ', ml: 'ഹോം', ta: 'முகப்பு',
  },
  'nav.howItWorks': {
    en: 'How It Works', hi: 'यह कैसे काम करता है', te: 'ఇది ఎలా పనిచేస్తుంది', kn: 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ', ml: 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു', ta: 'இது எப்படி வேலை செய்கிறது',
  },
  'nav.legalRights': {
    en: 'Legal Rights', hi: 'कानूनी अधिकार', te: 'చట్టపరమైన హక్కులు', kn: 'ಕಾನೂನು ಹಕ್ಕುಗಳು', ml: 'നിയമപരമായ അവകാശങ്ങൾ', ta: 'சட்ட உரிமைகள்',
  },
  'nav.scan': {
    en: 'Scan', hi: 'स्कैन', te: 'స్కాన్', kn: 'ಸ್ಕ್ಯಾನ್', ml: 'സ്കാൻ', ta: 'ஸ்கேன்',
  },
  'nav.report': {
    en: 'Report', hi: 'रिपोर्ट', te: 'రిపోర్ట్', kn: 'ವರದಿ', ml: 'റിപ്പോർട്ട്', ta: 'அறிக்கை',
  },
  'nav.signIn': {
    en: 'Sign In', hi: 'साइन इन', te: 'సైన్ ఇన్', kn: 'ಸೈನ್ ಇನ್', ml: 'സൈൻ ഇൻ', ta: 'உள்நுழையவும்',
  },
  'nav.myDashboard': {
    en: 'My Dashboard', hi: 'मेरा डैशबोर्ड', te: 'నా డ్యాష్‌బోర్డ్', kn: 'ನನ್ನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', ml: 'എന്റെ ഡാഷ്‌ബോർഡ്', ta: 'எனது டாஷ்போர்டு',
  },
  'nav.getProtected': {
    en: 'Get Protected', hi: 'सुरक्षा पाएं', te: 'రక్షణ పొందండి', kn: 'ರಕ್ಷಣೆ ಪಡೆಯಿರಿ', ml: 'സംരക്ഷണം നേടുക', ta: 'பாதுகாப்பு பெறுங்கள்',
  },

  // ═══════════════════════════════════════════
  //   HERO SECTION
  // ═══════════════════════════════════════════
  'hero.badge': {
    en: 'AI-Powered Digital Safety', hi: 'AI-संचालित डिजिटल सुरक्षा', te: 'AI-ఆధారిత డిజిటల్ భద్రత', kn: 'AI-ಚಾಲಿತ ಡಿಜಿಟಲ್ ಸುರಕ್ಷತೆ', ml: 'AI-പവർഡ് ഡിജിറ്റൽ സുരക്ഷ', ta: 'AI-இயங்கும் டிஜிட்டல் பாதுகாப்பு',
  },
  'hero.title.part1': {
    en: "She shouldn't have to", hi: 'उसे इंतज़ार नहीं करना चाहिए', te: 'ఆమె వేచి ఉండాల్సిన అవసరం లేదు', kn: 'ಅವಳು ಕಾಯಬೇಕಾಗಿಲ್ಲ', ml: 'അവൾ കാത്തിരിക്കേണ്ടതില്ല', ta: 'அவள் காத்திருக்க வேண்டியதில்லை',
  },
  'hero.title.highlight': {
    en: 'wait', hi: 'इंतज़ार', te: 'వేచి', kn: 'ಕಾಯು', ml: 'കാത്തിരിക്കുക', ta: 'காத்திருக்க',
  },
  'hero.title.part2': {
    en: 'for the harm to find help.', hi: 'नुकसान होने पर मदद पाने के लिए।', te: 'హాని జరిగే వరకు సహాయం కోసం.', kn: 'ಹಾನಿಗೆ ಸಹಾಯ ಹುಡುಕಲು.', ml: 'ദോഷം കണ്ടെത്താൻ സഹായത്തിനായി.', ta: 'தீங்கு ஏற்பட உதவி பெற.',
  },
  'hero.desc': {
    en: 'Rakshana 24/7 monitors the internet for threats targeting you and alerts you <strong>before</strong> the harassment reaches your inbox, your phone, or your door.',
    hi: 'रक्षणा 24/7 आपको लक्षित करने वाले खतरों के लिए इंटरनेट की निगरानी करता है और उत्पीड़न आपके इनबॉक्स, फोन या दरवाजे तक पहुंचने <strong>से पहले</strong> आपको सचेत करता है।',
    te: 'రక్షణ 24/7 మిమ్మల్ని లక్ష్యంగా చేసుకునే బెదిరింపుల కోసం ఇంటర్నెట్‌ను పర్యవేక్షిస్తుంది మరియు వేధింపులు మీ ఇన్‌బాక్స్, ఫోన్ లేదా తలుపు వద్దకు చేరుకునే <strong>ముందు</strong> మిమ్మల్ని హెచ్చరిస్తుంది.',
    kn: 'ರಕ್ಷಣ 24/7 ನಿಮ್ಮನ್ನು ಗುರಿಯಾಗಿಸುವ ಬೆದರಿಕೆಗಳಿಗಾಗಿ ಇಂಟರ್ನೆಟ್ ಅನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ಕಿರುಕುಳವು ನಿಮ್ಮ ಇನ್‌ಬಾಕ್ಸ್, ಫೋನ್ ಅಥವಾ ಬಾಗಿಲನ್ನು ತಲುಪುವ <strong>ಮೊದಲು</strong> ನಿಮಗೆ ಎಚ್ಚರಿಕೆ ನೀಡುತ್ತದೆ.',
    ml: 'രക്ഷണ 24/7 നിങ്ങളെ ലക്ഷ്യമിടുന്ന ഭീഷണികൾക്കായി ഇന്റർനെറ്റ് നിരീക്ഷിക്കുന്നു. ഉപദ്രവം നിങ്ങളുടെ ഇൻബോക്സിലേക്കോ ഫോണിലേക്കോ വാതിലിലേക്കോ എത്തുന്നതിന് <strong>മുമ്പ്</strong> നിങ്ങൾക്ക് അറിയിപ്പ് നൽകുന്നു.',
    ta: 'ரக்ஷணா 24/7 உங்களை குறிவைக்கும் அச்சுறுத்தல்களுக்காக இணையத்தை கண்காணிக்கிறது மற்றும் தொல்லை உங்கள் இன்பாக்ஸ், தொலைபேசி அல்லது கதவை அடைவதற்கு <strong>முன்பே</strong> உங்களை எச்சரிக்கிறது.',
  },
  'hero.startProtection': {
    en: 'Start Protection', hi: 'सुरक्षा शुरू करें', te: 'రక్షణ ప్రారంభించండి', kn: 'ರಕ್ಷಣೆ ಪ್ರಾರಂಭಿಸಿ', ml: 'സംരക്ഷണം ആരംഭിക്കുക', ta: 'பாதுகாப்பைத் தொடங்கு',
  },
  'hero.seeHowItWorks': {
    en: 'See How It Works', hi: 'देखें कैसे काम करता है', te: 'ఇది ఎలా పనిచేస్తుందో చూడండి', kn: 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ನೋಡಿ', ml: 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നുവെന്ന് കാണുക', ta: 'இது எப்படி வேலை செய்கிறது பாருங்கள்',
  },
  'hero.emergencySos': {
    en: 'Emergency SOS', hi: 'आपातकालीन SOS', te: 'అత్యవసర SOS', kn: 'ತುರ್ತು SOS', ml: 'അടിയന്തര SOS', ta: 'அவசர SOS',
  },
  'hero.stat.threats': {
    en: 'threats from known contacts', hi: 'परिचित संपर्कों से खतरे', te: 'తెలిసిన సంపర్కాల నుండి బెదిరింపులు', kn: 'ಪರಿಚಿತ ಸಂಪರ್ಕಗಳಿಂದ ಬೆದರಿಕೆಗಳು', ml: 'അറിയാവുന്ന കോൺടാക്ടുകളിൽ നിന്നുള്ള ഭീഷണികൾ', ta: 'தெரிந்த தொடர்புகளிலிருந்து அச்சுறுத்தல்கள்',
  },
  'hero.stat.crimes': {
    en: 'crimes reported', hi: 'अपराध रिपोर्ट किए गए', te: 'నేరాలు నివేదించబడ్డాయి', kn: 'ಅಪರಾಧಗಳು ವರದಿಯಾಗಿವೆ', ml: 'കുറ്റകൃത്യങ്ങൾ റിപ്പോർട്ട് ചെയ്തു', ta: 'குற்றங்கள் புகாரளிக்கப்பட்டன',
  },
  'hero.stat.tools': {
    en: 'proactive tools exist', hi: 'सक्रिय उपकरण मौजूद हैं', te: 'చురుకైన సాధనాలు ఉన్నాయి', kn: 'ಪೂರ್ವಭಾವಿ ಸಾಧನಗಳಿವೆ', ml: 'മുൻകൂർ ഉപകരണങ്ങൾ ഉണ്ട്', ta: 'முன்னெச்சரிக்கை கருவிகள் உள்ளன',
  },

  // ═══════════════════════════════════════════
  //   NOTIFICATION PANEL
  // ═══════════════════════════════════════════
  'notif.title': {
    en: 'Shield Notifications', hi: 'शील्ड सूचनाएं', te: 'షీల్డ్ నోటిఫికేషన్లు', kn: 'ಶೀಲ್ಡ್ ಅಧಿಸೂಚನೆಗಳು', ml: 'ഷീൽഡ് അറിയിപ്പുകൾ', ta: 'ஷீல்ட் அறிவிப்புகள்',
  },
  'notif.markAllRead': {
    en: 'Mark all read', hi: 'सभी पढ़ी गई', te: 'అన్నీ చదివినవిగా గుర్తించు', kn: 'ಎಲ್ಲಾ ಓದಿರಿ', ml: 'എല്ലാം വായിച്ചതായി മാർക്ക് ചെയ്യുക', ta: 'அனைத்தையும் படித்ததாகக் குறிக்கவும்',
  },
  'notif.viewAll': {
    en: 'View All', hi: 'सब देखें', te: 'అన్నీ చూడండి', kn: 'ಎಲ್ಲವನ್ನೂ ಪರಿಶೀಲಿಸಿ', ml: 'എല്ലാം കാണുക', ta: 'அனைத்தையும் பார்',
  },
  'notif.all': {
    en: 'All', hi: 'सभी', te: 'అన్నీ', kn: 'ಎಲ್ಲಾ', ml: 'എല്ലാം', ta: 'அனைத்தும்',
  },
  'notif.critical': {
    en: 'Critical', hi: 'गंभीर', te: 'క్రిటికల్', kn: 'ಗಂಭೀರ', ml: 'ഗുരുതരം', ta: 'தீவிரம்',
  },
  'notif.highAlert': {
    en: 'High Alert', hi: 'उच्च चेतावनी', te: 'హై అలర్ట్', kn: 'ಹೈ ಅಲರ್ಟ್', ml: 'ഹൈ അലർട്ട്', ta: 'அதிக எச்சரிக்கை',
  },
  'notif.watch': {
    en: 'Watch', hi: 'देखें', te: 'వాచ్', kn: 'ವಾಚ್', ml: 'വാച്ച്', ta: 'கவனி',
  },
  'notif.safe': {
    en: 'Safe', hi: 'सुरक्षित', te: 'సేఫ్', kn: 'ಸುರಕ್ಷಿತ', ml: 'സുരക്ഷിതം', ta: 'பாதுகாப்பு',
  },
  'notif.unread': {
    en: 'Unread', hi: 'अपठित', te: 'చదవనివి', kn: 'ಓದದ', ml: 'വായിക്കാത്തത്', ta: 'படிக்காதவை',
  },
  'notif.watchingThreats': {
    en: 'Watching for threats 24/7', hi: '24/7 खतरों पर नज़र', te: '24/7 బెదిరింపులను పర్యవేక్షిస్తోంది', kn: '24/7 ಬೆದರಿಕೆಗಳ ಮೇಲ್ವಿಚಾರಣೆ', ml: '24/7 ഭീഷണികൾ നിരീക്ഷിക്കുന്നു', ta: '24/7 அச்சுறுத்தல்களைக் கண்காணித்தல்',
  },
  'notif.checkingThreats': {
    en: 'Checking for threats...', hi: 'खतरों की जांच हो रही है...', te: 'బెదిరింపులు తనిఖీ చేస్తోంది...', kn: 'ಬೆದರಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...', ml: 'ഭീഷണികൾ പരിശോധിക്കുന്നു...', ta: 'அச்சுறுத்தல்களைச் சரிபார்க்கிறது...',
  },

  // ═══════════════════════════════════════════
  //   FEATURES / WHY SECTION
  // ═══════════════════════════════════════════
  'features.sectionLabel': {
    en: 'WHY RAKSHANA', hi: 'रक्षणा क्यों', te: 'రక్షణ ఎందుకు', kn: 'ರಕ್ಷಣ ಏಕೆ', ml: 'രക്ഷണ എന്തുകൊണ്ട്', ta: 'ரக்ஷணா ஏன்',
  },
  'features.title': {
    en: 'Built for those the internet forgot to protect.', hi: 'उनके लिए बनाया गया जिन्हें इंटरनेट सुरक्षित करना भूल गया।', te: 'ఇంటర్నెట్ రక్షించడం మరిచిపోయిన వారి కోసం నిర్మించబడింది.', kn: 'ಇಂಟರ್ನೆಟ್ ರಕ್ಷಿಸಲು ಮರೆತಿರುವವರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.', ml: 'ഇന്റർനെറ്റ് സംരക്ഷിക്കാൻ മറന്നവർക്ക് വേണ്ടി നിർമ്മിച്ചത്.', ta: 'இணையம் பாதுகாக்க மறந்தவர்களுக்காக உருவாக்கப்பட்டது.',
  },

  // ═══════════════════════════════════════════
  //   PIPELINE / HOW IT WORKS
  // ═══════════════════════════════════════════
  'pipeline.sectionLabel': {
    en: 'THE PIPELINE', hi: 'पाइपलाइन', te: 'పైప్‌లైన్', kn: 'ಪೈಪ್‌ಲೈನ್', ml: 'പൈപ്പ്‌ലൈൻ', ta: 'பைப்லைன்',
  },
  'pipeline.title': {
    en: 'From registration to protection in <span class="gradient-text">5 steps</span>.', hi: 'रजिस्ट्रेशन से सुरक्षा तक <span class="gradient-text">5 चरणों</span> में।', te: 'రిజిస్ట్రేషన్ నుండి రక్షణ వరకు <span class="gradient-text">5 దశల్లో</span>.', kn: 'ನೋಂದಣಿಯಿಂದ ರಕ್ಷಣೆಯವರೆಗೆ <span class="gradient-text">5 ಹಂತಗಳಲ್ಲಿ</span>.', ml: 'രജിസ്ട്രേഷൻ മുതൽ സംരക്ഷണം വരെ <span class="gradient-text">5 ഘട്ടങ്ങളിൽ</span>.', ta: 'பதிவிலிருந்து பாதுகாப்பு வரை <span class="gradient-text">5 படிகளில்</span>.',
  },
  'pipeline.step1.title': {
    en: 'Register Your Digital Fingerprint', hi: 'अपना डिजिटल फिंगरप्रिंट दर्ज करें', te: 'మీ డిజిటల్ ఫింగర్‌ప్రింట్ నమోదు చేయండి', kn: 'ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಫಿಂಗರ್‌ಪ್ರಿಂಟ್ ನೋಂದಣಿ ಮಾಡಿ', ml: 'നിങ്ങളുടെ ഡിജിറ്റൽ ഫിംഗർപ്രിന്റ് രജിസ്റ്റർ ചെയ്യുക', ta: 'உங்கள் டிஜிட்டல் கைரேகையைப் பதிவு செய்யுங்கள்',
  },
  'pipeline.step1.desc': {
    en: 'Phone number, selfie, social handles — hashed and encrypted. Raw data is never stored.', hi: 'फोन नंबर, सेल्फी, सोशल हैंडल — हैश और एन्क्रिप्टेड। कच्चा डेटा कभी संग्रहीत नहीं किया जाता।', te: 'ఫోన్ నంబర్, సెల్ఫీ, సోషల్ హ్యాండిల్స్ — హ్యాష్ మరియు ఎన్‌క్రిప్ట్ చేయబడింది. ముడి డేటా ఎప్పుడూ నిల్వ చేయబడదు.', kn: 'ಫೋನ್ ಸಂಖ್ಯೆ, ಸೆಲ್ಫಿ, ಸಾಮಾಜಿಕ ಹ್ಯಾಂಡಲ್‌ಗಳು — ಹ್ಯಾಶ್ ಮತ್ತು ಎನ್‌ಕ್ರಿಪ್ಟ್. ಕಚ್ಚಾ ಡೇಟಾ ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.', ml: 'ഫോൺ നമ്പർ, സെൽഫി, സോഷ്യൽ ഹാൻഡിൽസ് — ഹാഷ് ചെയ്ത് എൻക്രിപ്റ്റ് ചെയ്തു. റോ ഡാറ്റ ഒരിക്കലും സംഭരിക്കില്ല.', ta: 'தொலைபேசி எண், செல்ஃபி, சமூக ஹேண்டில்கள் — ஹாஷ் மற்றும் என்கிரிப்ட் செய்யப்பட்டது. மூல தரவு ஒருபோதும் சேமிக்கப்படாது.',
  },
  'pipeline.step2.title': {
    en: 'Continuous Background Monitoring', hi: 'निरंतर पृष्ठभूमि निगरानी', te: 'నిరంతర బ్యాక్‌గ్రౌండ్ మానిటరింగ్', kn: 'ನಿರಂತರ ಹಿನ್ನೆಲೆ ಮೇಲ್ವಿಚಾರಣೆ', ml: 'തുടർച്ചയായ പശ്ചാത്തല നിരീക്ഷണം', ta: 'தொடர்ச்சியான பின்னணி கண்காணிப்பு',
  },
  'pipeline.step2.desc': {
    en: 'Scanner runs every 4 hours across Telegram channels, paste sites, and forums — powered by Celery + Redis.', hi: 'स्कैनर हर 4 घंटे टेलीग्राम चैनल, पेस्ट साइट और फोरम में चलता है — Celery + Redis द्वारा संचालित।', te: 'ప్రతి 4 గంటలకు టెలిగ్రామ్ ఛానళ్లు, పేస్ట్ సైట్లు మరియు ఫోరమ్‌లలో స్కానర్ రన్ అవుతుంది — Celery + Redis ద్వారా.', kn: 'ಸ್ಕ್ಯಾನರ್ ಪ್ರತಿ 4 ಗಂಟೆಗಳಿಗೊಮ್ಮೆ ಟೆಲಿಗ್ರಾಮ್ ಚಾನೆಲ್‌ಗಳು, ಪೇಸ್ಟ್ ಸೈಟ್‌ಗಳು ಮತ್ತು ಫೋರಮ್‌ಗಳಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.', ml: 'ടെലിഗ്രാം ചാനലുകൾ, പേസ്റ്റ് സൈറ്റുകൾ, ഫോറങ്ങൾ എന്നിവയിൽ ഓരോ 4 മണിക്കൂറിലും സ്കാനർ പ്രവർത്തിക്കുന്നു.', ta: 'ஒவ்வொரு 4 மணி நேரத்திற்கும் டெலிகிராம் சேனல்கள், பேஸ்ட் தளங்கள் மற்றும் மன்றங்களில் ஸ்கேனர் இயங்குகிறது.',
  },
  'pipeline.step3.title': {
    en: 'NLP Threat Scoring', hi: 'NLP खतरा स्कोरिंग', te: 'NLP థ్రెట్ స్కోరింగ్', kn: 'NLP ಬೆದರಿಕೆ ಸ್ಕೋರಿಂಗ್', ml: 'NLP ഭീഷണി സ്കോറിംഗ്', ta: 'NLP அச்சுறுத்தல் மதிப்பீடு',
  },
  'pipeline.step3.desc': {
    en: '"Priya\'s number" in a contact group vs doxxing thread — our NLP engine knows the difference. Score: 0-100.', hi: 'एक कॉन्टैक्ट ग्रुप में "प्रिया का नंबर" बनाम डॉक्सिंग थ्रेड — हमारा NLP इंजन अंतर जानता है। स्कोर: 0-100।', te: 'కాంటాక్ట్ గ్రూప్‌లో "ప్రియ నంబర్" vs డాక్సింగ్ థ్రెడ్ — మా NLP ఇంజిన్ తేడా తెలుసు. స్కోర్: 0-100.', kn: 'ಸಂಪರ್ಕ ಗುಂಪಿನಲ್ಲಿ "ಪ್ರಿಯಾ ಸಂಖ್ಯೆ" vs ಡಾಕ್ಸಿಂಗ್ ಥ್ರೆಡ್ — ನಮ್ಮ NLP ವ್ಯತ್ಯಾಸ ತಿಳಿದಿದೆ. ಸ್ಕೋರ್: 0-100.', ml: 'ഒരു കോൺടാക്ട് ഗ്രൂപ്പിൽ "പ്രിയയുടെ നമ്പർ" vs ഡോക്സിംഗ് ത്രെഡ്— ഞങ്ങളുടെ NLP വ്യത്യാസം അറിയാം. സ്കോർ: 0-100.', ta: 'தொடர்பு குழுவில் "பிரியா எண்" எதிர் டாக்ஸிங் த்ரெட் — எங்கள் NLP வித்தியாசத்தை அறியும். மதிப்பெண்: 0-100.',
  },
  'pipeline.step4.title': {
    en: 'Graduated Alert Delivery', hi: 'क्रमिक अलर्ट डिलीवरी', te: 'గ్రాడ్యుయేటెడ్ అలర్ట్ డెలివరీ', kn: 'ಶ್ರೇಣೀಕೃತ ಎಚ್ಚರಿಕೆ ವಿತರಣೆ', ml: 'ഗ്രാഡുവേറ്റഡ് അലർട്ട് ഡെലിവറി', ta: 'படிநிலை எச்சரிக்கை விநியோகம்',
  },
  'pipeline.step4.desc': {
    en: 'Score > 40: dashboard. > 70: SMS alert. > 90: trusted contacts notified. Never panic-inducing.', hi: 'स्कोर > 40: डैशबोर्ड। > 70: SMS अलर्ट। > 90: विश्वसनीय संपर्कों को सूचित किया जाता है। कभी घबराहट नहीं।', te: 'స్కోర్ > 40: డ్యాష్‌బోర్డ్. > 70: SMS అలర్ట్. > 90: విశ్వసనీయ సంపర్కాలకు తెలియజేయబడుతుంది.', kn: 'ಸ್ಕೋರ್ > 40: ಡ್ಯಾಶ್‌ಬೋರ್ಡ್. > 70: SMS ಎಚ್ಚರಿಕೆ. > 90: ವಿಶ್ವಾಸಾರ್ಹ ಸಂಪರ್ಕಗಳಿಗೆ ತಿಳಿಸಲಾಗುತ್ತದೆ.', ml: 'സ്കോർ > 40: ഡാഷ്‌ബോർഡ്. > 70: SMS അലർട്ട്. > 90: വിശ്വസ്ത കോൺടാക്ടുകളെ അറിയിക്കുന്നു.', ta: 'மதிப்பெண் > 40: டாஷ்போர்டு. > 70: SMS எச்சரிக்கை. > 90: நம்பகமான தொடர்புகளுக்கு அறிவிக்கப்படும்.',
  },
  'pipeline.step5.title': {
    en: 'Action + Legal + Support', hi: 'कार्रवाई + कानूनी + सहायता', te: 'చర్య + చట్టపరమైనది + సపోర్ట్', kn: 'ಕ್ರಮ + ಕಾನೂನು + ಬೆಂಬಲ', ml: 'നടപടി + നിയമ + പിന്തുണ', ta: 'நடவடிக்கை + சட்ட + ஆதரவு',
  },
  'pipeline.step5.desc': {
    en: 'Every alert includes the relevant legal section, what to screenshot, how to file a complaint at cybercrime.gov.in, and connects to helplines — in your language.', hi: 'प्रत्येक अलर्ट में प्रासंगिक कानूनी धारा, क्या स्क्रीनशॉट लेना है, cybercrime.gov.in पर शिकायत कैसे दर्ज करें, और हेल्पलाइन से जुड़ें — आपकी भाषा में।', te: 'ప్రతి అలర్ట్‌లో సంబంధిత చట్ట విభాగం, ఏమి స్క్రీన్‌షాట్ చేయాలి, cybercrime.gov.in వద్ద ఫిర్యాదు ఎలా చేయాలి, హెల్ప్‌లైన్లకు కనెక్ట్ — మీ భాషలో.', kn: 'ಪ್ರತಿ ಎಚ್ಚರಿಕೆಯಲ್ಲಿ ಸಂಬಂಧಿತ ಕಾನೂನು ವಿಭಾಗ, ಏನು ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಮಾಡಬೇಕು, cybercrime.gov.in ನಲ್ಲಿ ದೂರು ಸಲ್ಲಿಸುವುದು — ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ.', ml: 'ഓരോ അലർട്ടിലും പ്രസക്ത നിയമ വിഭാഗം, എന്ത് സ്ക്രീൻഷോട്ട് ചെയ്യണം, cybercrime.gov.in-ൽ പരാതി നൽകുന്നത് — നിങ്ങളുടെ ഭാഷയിൽ.', ta: 'ஒவ்வொரு எச்சரிக்கையிலும் சட்டப் பிரிவு, என்ன ஸ்க்ரீன்ஷாட் எடுக்க வேண்டும், cybercrime.gov.in-ல் புகார் எப்படி பதிவு செய்வது — உங்கள் மொழியில்.',
  },

  // ═══════════════════════════════════════════
  //   CTA SECTION
  // ═══════════════════════════════════════════
  'cta.title': {
    en: 'She needs something that is already <span class="gradient-text">watching</span> when she is asleep.', hi: 'जब वह सो रही होती है तो उसे ऐसी चीज़ की ज़रूरत है जो पहले से <span class="gradient-text">देख</span> रही हो।', te: 'ఆమె నిద్రపోతున్నప్పుడు ఇప్పటికే <span class="gradient-text">చూస్తున్న</span> ఏదో ఒకటి ఆమెకు కావాలి.', kn: 'ಅವಳು ಮಲಗಿರುವಾಗ ಈಗಾಗಲೇ <span class="gradient-text">ನೋಡುತ್ತಿರುವ</span> ಏನಾದರೂ ಅವಳಿಗೆ ಬೇಕು.', ml: 'അവൾ ഉറങ്ങുമ്പോൾ ഇതിനകം <span class="gradient-text">നിരീക്ഷിക്കുന്ന</span> എന്തെങ്കിലും അവൾക്ക് വേണം.', ta: 'அவள் தூங்கும்போது ஏற்கனவே <span class="gradient-text">கண்காணிக்கும்</span> ஒன்று அவளுக்குத் தேவை.',
  },
  'cta.subtitle': {
    en: 'Rakshana 24/7 is that something. Start your protection now — it takes 2 minutes.', hi: 'रक्षणा 24/7 वो चीज़ है। अभी अपनी सुरक्षा शुरू करें — 2 मिनट लगते हैं।', te: 'రక్షణ 24/7 అదే. ఇప్పుడు మీ రక్షణ ప్రారంభించండి — 2 నిమిషాలు పడుతుంది.', kn: 'ರಕ್ಷಣ 24/7 ಅದೇ. ಈಗಲೇ ನಿಮ್ಮ ರಕ್ಷಣೆ ಪ್ರಾರಂಭಿಸಿ — 2 ನಿಮಿಷ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ.', ml: 'രക്ഷണ 24/7 അതാണ്. ഇപ്പോൾ നിങ്ങളുടെ സംരക്ഷണം ആരംഭിക്കുക — 2 മിനിറ്റ് മതി.', ta: 'ரக்ஷணா 24/7 அதுதான். இப்போதே உங்கள் பாதுகாப்பைத் தொடங்குங்கள் — 2 நிமிடங்கள் ஆகும்.',
  },
  'cta.createShield': {
    en: 'Create Your Shield', hi: 'अपनी ढाल बनाएं', te: 'మీ షీల్డ్ సృష్టించండి', kn: 'ನಿಮ್ಮ ಶೀಲ್ಡ್ ರಚಿಸಿ', ml: 'നിങ്ങളുടെ ഷീൽഡ് സൃഷ്ടിക്കുക', ta: 'உங்கள் கவசத்தை உருவாக்குங்கள்',
  },

  // ═══════════════════════════════════════════
  //   FOOTER
  // ═══════════════════════════════════════════
  'footer.brand': {
    en: '<strong>Rakshana 24/7</strong> — Proactive Digital Safety for Women', hi: '<strong>रक्षणा 24/7</strong> — महिलाओं के लिए सक्रिय डिजिटल सुरक्षा', te: '<strong>రక్షణ 24/7</strong> — మహిళల కోసం చురుకైన డిజిటల్ భద్రత', kn: '<strong>ರಕ್ಷಣ 24/7</strong> — ಮಹಿಳೆಯರಿಗಾಗಿ ಪೂರ್ವಭಾವಿ ಡಿಜಿಟಲ್ ಸುರಕ್ಷತೆ', ml: '<strong>രക്ഷണ 24/7</strong> — സ്ത്രീകൾക്കുള്ള മുൻകൂർ ഡിജിറ്റൽ സുരക്ഷ', ta: '<strong>ரக்ஷணா 24/7</strong> — பெண்களுக்கான முன்னெச்சரிக்கை டிஜிட்டல் பாதுகாப்பு',
  },
  'footer.tagline': {
    en: '"Light that travels ahead of the harm."', hi: '"वो रोशनी जो नुकसान से पहले पहुंचती है।"', te: '"హానికి ముందుగా ప్రయాణించే వెలుగు."', kn: '"ಹಾನಿಗಿಂತ ಮುಂದೆ ಚಲಿಸುವ ಬೆಳಕು."', ml: '"ദോഷത്തിന് മുന്നേ സഞ്ചരിക്കുന്ന വെളിച്ചം."', ta: '"தீங்குக்கு முன்னே பயணிக்கும் ஒளி."',
  },
  'footer.legalRights': {
    en: 'Legal Rights', hi: 'कानूनी अधिकार', te: 'చట్టపరమైన హక్కులు', kn: 'ಕಾನೂನು ಹಕ್ಕುಗಳು', ml: 'നിയമപരമായ അവകാശങ്ങൾ', ta: 'சட்ட உரிமைகள்',
  },
  'footer.resources': {
    en: 'Resources', hi: 'संसाधन', te: 'వనరులు', kn: 'ಸಂಪನ್ಮೂಲಗಳು', ml: 'വിഭവങ്ങൾ', ta: 'வளங்கள்',
  },
  'footer.reportAnonymously': {
    en: 'Report Anonymously', hi: 'गुमनाम रूप से रिपोर्ट करें', te: 'అజ్ఞాతంగా రిపోర్ట్ చేయండి', kn: 'ಅನಾಮಧೇಯವಾಗಿ ವರದಿ ಮಾಡಿ', ml: 'അജ്ഞാതമായി റിപ്പോർട്ട് ചെയ്യുക', ta: 'அநாமதேயமாக புகாரளிக்கவும்',
  },
  'footer.language': {
    en: 'Language', hi: 'भाषा', te: 'భాష', kn: 'ಭಾಷೆ', ml: 'ഭാഷ', ta: 'மொழி',
  },

  // ═══════════════════════════════════════════
  //   MISC / COMMON
  // ═══════════════════════════════════════════
  'common.loading': {
    en: 'Loading...', hi: 'लोड हो रहा है...', te: 'లోడ్ అవుతోంది...', kn: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...', ml: 'ലോഡ് ചെയ്യുന്നു...', ta: 'ஏற்றுகிறது...',
  },
  'common.signedOut': {
    en: 'Signed out', hi: 'साइन आउट हो गए', te: 'సైన్ అవుట్ అయ్యారు', kn: 'ಸೈನ್ ಔಟ್ ಆಗಿದ್ದೀರಿ', ml: 'സൈൻ ഔട്ട് ചെയ്തു', ta: 'வெளியேறினீர்கள்',
  },
  'common.enablePush': {
    en: 'Enable Push Notifications', hi: 'पुश सूचनाएं सक्षम करें', te: 'పుష్ నోటిఫికేషన్లు ఎనేబుల్ చేయండి', kn: 'ಪುಶ್ ಅಧಿಸೂಚನೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ', ml: 'പുഷ് അറിയിപ്പുകൾ പ്രവർത്തനക്ഷമമാക്കുക', ta: 'புஷ் அறிவிப்புகளை இயக்கு',
  },
  'common.enable': {
    en: 'Enable', hi: 'सक्षम करें', te: 'ఎనేబుల్', kn: 'ಸಕ್ರಿಯಗೊಳಿಸಿ', ml: 'പ്രവർത്തനക്ഷമമാക്കുക', ta: 'இயக்கு',
  },
  'common.later': {
    en: 'Later', hi: 'बाद में', te: 'తర్వాత', kn: 'ನಂತರ', ml: 'പിന്നീട്', ta: 'பிறகு',
  },
};

// ═══════════════════════════════════════════
//   LANGUAGE ENGINE
// ═══════════════════════════════════════════

const RakshanaI18n = {
  currentLang: localStorage.getItem('rakshana_lang') || 'en',

  /** Get translated string */
  t(key) {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[this.currentLang] || entry['en'] || key;
  },

  /** Set new language and persist */
  setLanguage(lang) {
    if (!RAKSHANA_LANGS[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('rakshana_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = RAKSHANA_LANGS[lang].dir;
    this.applyTranslations();
    this.updateLanguagePicker();
  },

  /** Apply translations to all elements with data-i18n attribute */
  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = this.t(key);
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = translated;
      } else {
        el.textContent = translated;
      }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });

    // Titles / aria-labels
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.title = this.t(key);
    });
  },

  /** Update the language picker dropdown to show current language */
  updateLanguagePicker() {
    const picker = document.getElementById('langPickerCurrent');
    if (picker) {
      const langInfo = RAKSHANA_LANGS[this.currentLang];
      picker.innerHTML = `${langInfo.flag} ${langInfo.native}`;
    }
    // Highlight active option and ensure native names are correct
    document.querySelectorAll('.lang-option').forEach(opt => {
      const lang = opt.dataset.lang;
      opt.classList.toggle('active', lang === this.currentLang);
      
      // Fix native name rendering (in case encoded incorrectly)
      if (lang && RAKSHANA_LANGS[lang]) {
        const nativeSpan = opt.querySelector('.lang-option-native');
        const englishSpan = opt.querySelector('.lang-option-english');
        const flagSpan = opt.querySelector('.lang-option-flag');
        if (nativeSpan) nativeSpan.textContent = RAKSHANA_LANGS[lang].native;
        if (englishSpan) englishSpan.textContent = RAKSHANA_LANGS[lang].label;
        if (flagSpan) flagSpan.textContent = RAKSHANA_LANGS[lang].flag;
      }
    });
  },

  /** Initialize on page load */
  init() {
    this.applyTranslations();
    this.updateLanguagePicker();
  }
};

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => RakshanaI18n.init());
} else {
  RakshanaI18n.init();
}
