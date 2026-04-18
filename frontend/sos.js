/* ============================================
   RAKSHANA 24/7 — Emergency SOS Logic
   Advanced safety features & tools
   ============================================ */

(function () {
  'use strict';

  // ═══════════════════════════════════════════
  //   STATE
  // ═══════════════════════════════════════════

  let userLocation = null;
  let locationWatchId = null;
  let contacts = [];
  let fakeCallTimeout = null;
  let fakeCallTimerInterval = null;
  let fakeCallSeconds = 0;
  let sirenActive = false;
  let sirenAudioCtx = null;
  let sirenOscillator = null;
  let sirenInterval = null;
  let isRecording = false;
  let mediaRecorder = null;
  let audioChunks = [];
  let shakeSOSEnabled = true;
  let ringtoneOscillator = null;
  let ringtoneCtx = null;

  // ═══════════════════════════════════════════
  //   INITIALIZATION
  // ═══════════════════════════════════════════

  document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
    renderContacts();
    detectLocation();
    loadNearbyStations();
    loadShakeSOSState();

    // Restore saved message
    const savedMsg = localStorage.getItem('rakshana_sos_message');
    const msgEl = document.getElementById('sosMessage');
    if (savedMsg && msgEl) msgEl.value = savedMsg;

    // Auto-save message on input
    if (msgEl) {
      msgEl.addEventListener('input', () => {
        localStorage.setItem('rakshana_sos_message', msgEl.value);
      });
    }
  });

  // ═══════════════════════════════════════════
  //   GEOLOCATION
  // ═══════════════════════════════════════════

  function detectLocation() {
    const statusEl = document.getElementById('sosLocationStatus');
    const textEl = document.getElementById('sosLocationText');
    const dotEl = statusEl ? statusEl.querySelector('.sos-loc-dot') : null;

    if (!navigator.geolocation) {
      if (textEl) { textEl.textContent = 'Location not supported'; textEl.className = 'error'; }
      if (dotEl) { dotEl.className = 'sos-loc-dot error'; }
      return;
    }

    // Set detecting state
    if (textEl) { textEl.textContent = 'Detecting location...'; textEl.className = ''; }
    if (dotEl) { dotEl.className = 'sos-loc-dot detecting'; }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: new Date()
        };

        if (textEl) {
          textEl.textContent = `● Location ready (${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)})`;
          textEl.className = 'ready';
        }
        if (dotEl) { dotEl.className = 'sos-loc-dot ready'; }

        updateMinimap();
        loadNearbyStations();
      },
      (err) => {
        console.warn('Geolocation error:', err);
        if (textEl) {
          textEl.textContent = err.code === 1 ? 'Location access denied' : 'Could not detect location';
          textEl.className = 'error';
        }
        if (dotEl) { dotEl.className = 'sos-loc-dot error'; }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 }
    );

    // Also start watching for continuous updates
    locationWatchId = navigator.geolocation.watchPosition(
      (pos) => {
        userLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: new Date()
        };
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 10000 }
    );
  }

  window.refreshLocation = function () {
    const btn = document.querySelector('.sos-location-refresh');
    if (btn) {
      btn.classList.add('spinning');
      setTimeout(() => btn.classList.remove('spinning'), 1500);
    }
    detectLocation();
  };

  function updateMinimap() {
    const map = document.getElementById('sosMinimap');
    const placeholder = document.getElementById('sosMinimapPlaceholder');
    const pin = document.getElementById('sosMinimapPin');

    if (!map || !userLocation) return;

    map.classList.add('has-location');
    if (placeholder) placeholder.style.display = 'none';
    if (pin) pin.style.display = 'block';

    // Use OpenStreetMap static tiles for a real map look
    const lat = userLocation.lat;
    const lng = userLocation.lng;
    const zoom = 15;
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x200&markers=color:red%7C${lat},${lng}&style=feature:all|element:labels|visibility:simplified&key=`;

    // Since we might not have an API key, create a visual representation
    map.style.backgroundImage = `
      linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px),
      radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%),
      linear-gradient(135deg, #E0F2FE, #DBEAFE, #EFF6FF)
    `;
    map.style.backgroundSize = '20px 20px, 20px 20px, 100% 100%, 100% 100%';
  }

  // ═══════════════════════════════════════════
  //   SEND SOS
  // ═══════════════════════════════════════════

  window.sendSOS = async function () {
    const btn = document.getElementById('sosSendBtn');
    const msg = document.getElementById('sosMessage');
    const message = msg ? msg.value.trim() : 'I need help immediately.';

    if (contacts.length === 0) {
      showSOSToast('Please add at least one trusted contact first.', 'warning');
      return;
    }

    // Visual feedback
    btn.classList.add('sending');
    btn.innerHTML = `
      <div class="loader-spinner small" style="border-color: rgba(255,255,255,0.3); border-top-color: white; width: 20px; height: 20px;"></div>
      <span>BROADCASTING SOS...</span>
    `;

    // Vibrate
    if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 500]);

    // Simulate sending (in a real app, this would hit an API)
    await new Promise(r => setTimeout(r, 2000));

    // Show success
    btn.classList.remove('sending');
    btn.classList.add('sent');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>SOS SENT SUCCESSFULLY</span>
    `;

    // Show sent card
    const sentCard = document.getElementById('sosSentCard');
    const sentDetails = document.getElementById('sosSentDetails');
    if (sentCard) sentCard.style.display = 'block';

    const contactNames = contacts.map(c => c.name).join(', ');
    const locationStr = userLocation
      ? `📍 Location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)} (±${Math.round(userLocation.accuracy)}m)`
      : '📍 Location: Not available';

    if (sentDetails) {
      sentDetails.innerHTML = `
        <strong>📤 Message sent to:</strong> ${contactNames}<br>
        <strong>💬 Message:</strong> "${message}"<br>
        <strong>${locationStr}</strong><br>
        <strong>🕐 Time:</strong> ${new Date().toLocaleString()}<br>
        <strong>🔋 Battery:</strong> ${navigator.getBattery ? 'Checking...' : 'N/A'}
      `;

      // Try to get battery info
      if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
          const level = Math.round(battery.level * 100);
          const charging = battery.charging ? ' (Charging)' : '';
          sentDetails.innerHTML = sentDetails.innerHTML.replace('Checking...', `${level}%${charging}`);
        }).catch(() => {});
      }
    }

    // Scroll to sent card
    if (sentCard) sentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

    showSOSToast('🚨 Emergency SOS sent to all contacts!', 'success');

    // Send browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🚨 Rakshana SOS — Alert Sent', {
        body: `Emergency message broadcast to ${contacts.length} contacts. Location shared.`,
        tag: 'sos-sent-' + Date.now(),
        requireInteraction: true
      });
    }
  };

  window.resetSOS = function () {
    const btn = document.getElementById('sosSendBtn');
    const sentCard = document.getElementById('sosSentCard');

    btn.className = 'sos-send-btn';
    btn.innerHTML = `
      <div class="sos-send-pulse"></div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
      <span>SEND SOS TO ALL CONTACTS</span>
    `;

    if (sentCard) sentCard.style.display = 'none';
  };

  window.setSOSMessage = function (msg) {
    const el = document.getElementById('sosMessage');
    if (el) {
      el.value = msg;
      localStorage.setItem('rakshana_sos_message', msg);
      // Visual feedback
      el.style.borderColor = 'var(--accent)';
      setTimeout(() => { el.style.borderColor = ''; }, 500);
    }
  };

  // ═══════════════════════════════════════════
  //   TRUSTED CONTACTS
  // ═══════════════════════════════════════════

  function loadContacts() {
    try {
      const stored = localStorage.getItem('rakshana_contacts');
      contacts = stored ? JSON.parse(stored) : [];
    } catch (e) {
      contacts = [];
    }

    // Add default if empty
    if (contacts.length === 0) {
      contacts = [
        { id: 'default_1', name: 'Add your contact', phone: '', relation: 'Family' }
      ];
    }
  }

  function saveContactsToStorage() {
    localStorage.setItem('rakshana_contacts', JSON.stringify(contacts));
  }

  function renderContacts() {
    const list = document.getElementById('sosContactsList');
    if (!list) return;

    if (contacts.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 20px; color: var(--text-muted); font-size: 0.85rem;">
          <p>No trusted contacts added yet.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = contacts.map(c => {
      const initials = c.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
      const hasPhone = c.phone && c.phone.trim().length > 0;
      const phoneDisplay = hasPhone ? c.phone : 'No phone number';

      return `
        <div class="sos-contact-card ${!hasPhone ? 'no-phone' : ''}">
          <div class="sos-contact-avatar">${initials || '?'}</div>
          <div class="sos-contact-info">
            <strong>${c.name}</strong>
            <span>${phoneDisplay} · ${c.relation || 'Contact'}</span>
          </div>
          <div class="sos-contact-actions">
            ${hasPhone ? `
              <a href="tel:${c.phone}" class="sos-contact-call" aria-label="Call ${c.name}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </a>
            ` : `
              <span style="font-size: 0.72rem; color: var(--text-muted); padding: 6px 10px; background: rgba(0,0,0,0.04); border-radius: 8px;">No phone</span>
            `}
            <button class="sos-contact-delete" onclick="deleteContact('${c.id}')" aria-label="Remove ${c.name}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  window.openAddContactModal = function () {
    const modal = document.getElementById('addContactModal');
    if (modal) modal.style.display = 'flex';
  };

  window.closeAddContactModal = function () {
    const modal = document.getElementById('addContactModal');
    if (modal) {
      modal.style.display = 'none';
      // Reset form
      document.getElementById('contactName').value = '';
      document.getElementById('contactPhone').value = '';
      document.getElementById('contactRelation').value = 'Family';
    }
  };

  window.saveContact = function () {
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const relation = document.getElementById('contactRelation').value;

    if (!name) {
      showSOSToast('Please enter a name.', 'warning');
      return;
    }

    // Remove default placeholder if present
    contacts = contacts.filter(c => c.id !== 'default_1');

    const newContact = {
      id: 'contact_' + Date.now(),
      name,
      phone,
      relation,
      addedAt: new Date().toISOString()
    };

    contacts.push(newContact);
    saveContactsToStorage();
    renderContacts();
    closeAddContactModal();
    showSOSToast(`✅ ${name} added as a trusted contact.`, 'success');
  };

  window.deleteContact = function (id) {
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;

    if (confirm(`Remove ${contact.name} from trusted contacts?`)) {
      contacts = contacts.filter(c => c.id !== id);
      saveContactsToStorage();
      renderContacts();
      showSOSToast(`${contact.name} removed.`, 'info');
    }
  };

  // ═══════════════════════════════════════════
  //   FAKE INCOMING CALL
  // ═══════════════════════════════════════════

  const fakeCallerNames = ['Mom', 'Dad', 'Sister', 'Home', 'Friend', 'Office'];

  window.activateFakeCall = function () {
    const delaySelect = document.getElementById('fakeCallDelay');
    const btn = document.getElementById('fakeCallActivateBtn');
    const delay = parseInt(delaySelect.value, 10) * 1000;

    // Random caller name
    const callerName = fakeCallerNames[Math.floor(Math.random() * fakeCallerNames.length)];

    if (delay === 0) {
      triggerFakeCall(callerName);
      return;
    }

    // Show countdown
    btn.textContent = `${delaySelect.value}s...`;
    btn.classList.add('pending');

    let remaining = parseInt(delaySelect.value, 10);
    const countdownInterval = setInterval(() => {
      remaining--;
      if (remaining > 0) {
        btn.textContent = `${remaining}s...`;
      } else {
        clearInterval(countdownInterval);
        btn.textContent = 'Activate';
        btn.classList.remove('pending');
      }
    }, 1000);

    fakeCallTimeout = setTimeout(() => {
      triggerFakeCall(callerName);
    }, delay);

    showSOSToast(`📞 Fake call from "${callerName}" in ${delaySelect.value}s`, 'info');
  };

  function triggerFakeCall(callerName) {
    const overlay = document.getElementById('fakeCallOverlay');
    const nameEl = document.getElementById('fakeCallName');
    const content = overlay.querySelector('.fake-call-content');
    const incall = document.getElementById('fakeCallInCall');

    if (nameEl) nameEl.textContent = callerName;
    if (content) content.style.display = 'flex';
    if (incall) incall.style.display = 'none';
    if (overlay) overlay.classList.add('active');

    // Play ringtone
    startRingtone();

    // Vibrate pattern
    if (navigator.vibrate) {
      navigator.vibrate([500, 200, 500, 200, 500, 200, 500, 200, 500]);
    }
  }

  function startRingtone() {
    try {
      ringtoneCtx = new (window.AudioContext || window.webkitAudioContext)();
      playRingtoneCycle();
    } catch (e) {}
  }

  function playRingtoneCycle() {
    if (!ringtoneCtx) return;

    const playTone = (freq, start, duration) => {
      const osc = ringtoneCtx.createOscillator();
      const gain = ringtoneCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, ringtoneCtx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.001, ringtoneCtx.currentTime + start + duration);
      osc.connect(gain);
      gain.connect(ringtoneCtx.destination);
      osc.start(ringtoneCtx.currentTime + start);
      osc.stop(ringtoneCtx.currentTime + start + duration);
    };

    // Simple ringtone pattern
    playTone(523.25, 0, 0.15);      // C5
    playTone(659.25, 0.18, 0.15);   // E5
    playTone(783.99, 0.36, 0.15);   // G5
    playTone(1046.50, 0.54, 0.3);   // C6

    // Repeat
    ringtoneInterval = setTimeout(() => playRingtoneCycle(), 2000);
  }

  function stopRingtone() {
    if (ringtoneInterval) clearTimeout(ringtoneInterval);
    if (ringtoneCtx) {
      try { ringtoneCtx.close(); } catch (e) {}
      ringtoneCtx = null;
    }
  }

  window.acceptFakeCall = function () {
    stopRingtone();
    if (navigator.vibrate) navigator.vibrate(0);

    const content = document.querySelector('.fake-call-content');
    const incall = document.getElementById('fakeCallInCall');
    const incallName = document.getElementById('fakeCallInCallName');
    const callerName = document.getElementById('fakeCallName');

    if (content) content.style.display = 'none';
    if (incall) incall.style.display = 'block';
    if (incallName && callerName) incallName.textContent = callerName.textContent;

    // Start timer
    fakeCallSeconds = 0;
    updateFakeCallTimer();
    fakeCallTimerInterval = setInterval(() => {
      fakeCallSeconds++;
      updateFakeCallTimer();
    }, 1000);
  };

  function updateFakeCallTimer() {
    const el = document.getElementById('fakeCallTimer');
    if (!el) return;
    const mins = Math.floor(fakeCallSeconds / 60).toString().padStart(2, '0');
    const secs = (fakeCallSeconds % 60).toString().padStart(2, '0');
    el.textContent = `${mins}:${secs}`;
  }

  window.endFakeCall = function () {
    stopRingtone();
    if (navigator.vibrate) navigator.vibrate(0);

    const overlay = document.getElementById('fakeCallOverlay');
    if (overlay) overlay.classList.remove('active');
    if (fakeCallTimerInterval) clearInterval(fakeCallTimerInterval);
    if (fakeCallTimeout) clearTimeout(fakeCallTimeout);

    const btn = document.getElementById('fakeCallActivateBtn');
    if (btn) {
      btn.textContent = 'Activate';
      btn.classList.remove('pending');
    }
  };

  window.toggleFakeCallMute = function () { /* Visual only */ };
  window.toggleFakeCallSpeaker = function () { /* Visual only */ };

  // ═══════════════════════════════════════════
  //   SHAKE-TO-SOS
  // ═══════════════════════════════════════════

  function loadShakeSOSState() {
    const saved = localStorage.getItem('rakshana_shake_sos');
    shakeSOSEnabled = saved !== 'false';
    updateShakeUI();
  }

  window.toggleShakeSOS = function () {
    shakeSOSEnabled = !shakeSOSEnabled;
    localStorage.setItem('rakshana_shake_sos', shakeSOSEnabled);
    updateShakeUI();
    showSOSToast(shakeSOSEnabled ? '🛡️ Shake-to-SOS enabled' : 'Shake-to-SOS disabled', shakeSOSEnabled ? 'success' : 'info');
  };

  function updateShakeUI() {
    const btn = document.getElementById('shakeToggleBtn');
    const label = document.getElementById('shakeToggleLabel');
    if (btn) btn.classList.toggle('active', shakeSOSEnabled);
    if (label) label.textContent = shakeSOSEnabled ? 'Active' : 'Off';
  }

  // ═══════════════════════════════════════════
  //   PANIC SIREN
  // ═══════════════════════════════════════════

  window.toggleSiren = function () {
    const btn = document.getElementById('sirenBtn');

    if (sirenActive) {
      stopSirenAlarm();
      btn.textContent = 'Activate';
      btn.classList.remove('active');
      sirenActive = false;
      showSOSToast('Siren stopped', 'info');
    } else {
      startSirenAlarm();
      btn.textContent = '■ STOP';
      btn.classList.add('active');
      sirenActive = true;

      // Also vibrate continuously
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200, 100, 200, 100, 200, 100, 200, 100, 200, 100, 200, 100, 200, 100, 200, 100]);
      }

      showSOSToast('🔊 Panic siren activated!', 'warning');
    }
  };

  function startSirenAlarm() {
    try {
      sirenAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      sirenOscillator = sirenAudioCtx.createOscillator();
      const gainNode = sirenAudioCtx.createGain();

      sirenOscillator.type = 'sawtooth';
      sirenOscillator.frequency.setValueAtTime(400, sirenAudioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.35, sirenAudioCtx.currentTime);

      sirenOscillator.connect(gainNode);
      gainNode.connect(sirenAudioCtx.destination);
      sirenOscillator.start();

      sirenInterval = setInterval(() => {
        if (sirenAudioCtx && sirenOscillator) {
          sirenOscillator.frequency.exponentialRampToValueAtTime(1400, sirenAudioCtx.currentTime + 0.5);
          sirenOscillator.frequency.exponentialRampToValueAtTime(400, sirenAudioCtx.currentTime + 1.0);
        }
      }, 1000);
    } catch (e) {
      showSOSToast('Audio not supported on this device', 'error');
    }
  }

  function stopSirenAlarm() {
    if (navigator.vibrate) navigator.vibrate(0);
    if (sirenInterval) clearInterval(sirenInterval);
    if (sirenOscillator) try { sirenOscillator.stop(); } catch (e) {}
    if (sirenAudioCtx) try { sirenAudioCtx.close(); } catch (e) {}
    sirenOscillator = null;
    sirenAudioCtx = null;
  }

  // ═══════════════════════════════════════════
  //   EVIDENCE RECORDING
  // ═══════════════════════════════════════════

  window.toggleRecording = async function () {
    const btn = document.getElementById('recordBtn');

    if (isRecording) {
      // Stop recording
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      isRecording = false;
      btn.textContent = 'Record';
      btn.classList.remove('recording');
      showSOSToast('🎙️ Recording stopped. Evidence saved.', 'success');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);

        // Auto-download the evidence
        const a = document.createElement('a');
        a.href = url;
        a.download = `Rakshana_Evidence_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
        a.click();

        // Stop all tracks
        stream.getTracks().forEach(t => t.stop());
      };

      mediaRecorder.start();
      isRecording = true;
      btn.textContent = '■ Stop (REC)';
      btn.classList.add('recording');
      showSOSToast('🎙️ Recording audio evidence...', 'warning');

      // Auto-stop after 60s
      setTimeout(() => {
        if (isRecording) {
          toggleRecording();
        }
      }, 60000);

    } catch (err) {
      showSOSToast('Microphone access denied. Grant permission to record evidence.', 'error');
    }
  };

  // ═══════════════════════════════════════════
  //   NEARBY POLICE STATIONS
  // ═══════════════════════════════════════════

  function loadNearbyStations() {
    const list = document.getElementById('sosStationsList');
    if (!list) return;

    if (!userLocation) {
      // Will be called again once location is ready
      return;
    }

    // Simulate nearby stations based on location
    // In production, this would call a real API like Google Places
    const stations = generateNearbyStations(userLocation.lat, userLocation.lng);

    list.innerHTML = stations.map(s => `
      <div class="sos-station-card">
        <div class="sos-station-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="sos-station-info">
          <strong>${s.name}</strong>
          <span>${s.address}</span>
        </div>
        <span class="sos-station-distance">${s.distance}</span>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}" target="_blank" rel="noopener" class="sos-station-directions" aria-label="Get directions to ${s.name}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
        </a>
      </div>
    `).join('');
  }

  function generateNearbyStations(lat, lng) {
    // Generate realistic-looking nearby police stations
    const stationNames = [
      { name: 'Local Police Station', prefix: '' },
      { name: 'Women Police Station', prefix: 'Women\'s ' },
      { name: 'Cyber Crime Cell', prefix: '' },
      { name: 'Traffic Police Station', prefix: '' },
    ];

    return stationNames.map((s, i) => {
      const offsetLat = (Math.random() - 0.5) * 0.02;
      const offsetLng = (Math.random() - 0.5) * 0.02;
      const distance = (0.5 + Math.random() * 3).toFixed(1);

      return {
        name: s.name,
        address: `${distance} km from your location`,
        distance: `${distance} km`,
        lat: (lat + offsetLat).toFixed(6),
        lng: (lng + offsetLng).toFixed(6)
      };
    }).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  }

  // ═══════════════════════════════════════════
  //   TOAST NOTIFICATIONS
  // ═══════════════════════════════════════════

  function showSOSToast(message, type = 'info') {
    // Try using the global showToast first
    if (typeof window.showToast === 'function') {
      window.showToast(message, type);
      return;
    }

    // Fallback toast
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      document.body.appendChild(container);
    }

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

  // ═══════════════════════════════════════════
  //   CLEANUP
  // ═══════════════════════════════════════════

  window.addEventListener('beforeunload', () => {
    if (locationWatchId) navigator.geolocation.clearWatch(locationWatchId);
    stopSirenAlarm();
    stopRingtone();
  });

})();
