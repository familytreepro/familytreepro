/* FamilyTreePro V99 Login Safe Patch
   Safe add-on: fixes common login UI blocking / cache issues without changing Firebase config.
*/
(function () {
  'use strict';

  const VERSION = 'V99-LOGIN-SAFE';
  window.FAMILY_TREE_PRO_VERSION = VERSION;

  function log(msg) {
    try { console.log('[FamilyTreePro ' + VERSION + '] ' + msg); } catch (e) {}
  }

  // 1) Prevent old service worker/caches from keeping broken login builds alive.
  async function clearOldCachesOnce() {
    try {
      const key = 'ftp_v99_login_cache_cleared';
      if (localStorage.getItem(key) === VERSION) return;

      if ('caches' in window) {
        const names = await caches.keys();
        await Promise.all(names.map(name => caches.delete(name)));
      }

      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(reg => reg.unregister()));
      }

      localStorage.setItem(key, VERSION);
      log('Old caches/service workers cleared once. Reload may be needed.');
    } catch (e) {
      console.warn('[FamilyTreePro V99] cache clear skipped:', e);
    }
  }

  // 2) Fix invisible overlay/layer that blocks email/password inputs.
  function unlockLoginInputs() {
    const selectors = [
      'input[type="email"]',
      'input[type="password"]',
      'input[name*="email" i]',
      'input[name*="password" i]',
      '#email',
      '#password'
    ];

    const inputs = document.querySelectorAll(selectors.join(','));
    inputs.forEach(input => {
      input.removeAttribute('disabled');
      input.removeAttribute('readonly');
      input.style.pointerEvents = 'auto';
      input.style.userSelect = 'text';
      input.style.opacity = '1';
      input.autocomplete = input.type === 'password' ? 'current-password' : 'email';
    });

    const buttons = document.querySelectorAll('button, input[type="submit"]');
    buttons.forEach(btn => {
      const text = (btn.innerText || btn.value || '').trim();
      if (/ورود|login|sign in|ثبت/i.test(text)) {
        btn.removeAttribute('disabled');
        btn.style.pointerEvents = 'auto';
        btn.style.opacity = '1';
      }
    });
  }

  // 3) Make common full-screen decorative layers non-blocking, but keep real panels/buttons clickable.
  function relaxBlockingLayers() {
    const all = Array.from(document.body ? document.body.querySelectorAll('*') : []);
    all.forEach(el => {
      const st = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const isHuge = rect.width > window.innerWidth * 0.85 && rect.height > window.innerHeight * 0.60;
      const isOverlayLike = st.position === 'fixed' || st.position === 'absolute';
      const hasInteractive = el.querySelector && el.querySelector('input, button, textarea, select, a');
      const cls = (el.className || '').toString().toLowerCase();
      const id = (el.id || '').toLowerCase();
      const looksDecorative = /bg|background|overlay|glass|blur|pattern|decor|hero/.test(cls + ' ' + id);

      if (isOverlayLike && isHuge && !hasInteractive && looksDecorative) {
        el.style.pointerEvents = 'none';
      }
    });
  }

  // 4) Preserve user data before any login attempt, so failed login won't wipe family tree data.
  function backupLocalDataBeforeLogin() {
    try {
      const keys = Object.keys(localStorage).filter(k => /family|tree|people|person|ftp|backup/i.test(k));
      const backup = {};
      keys.forEach(k => backup[k] = localStorage.getItem(k));
      localStorage.setItem('ftp_v99_pre_login_backup', JSON.stringify({
        version: VERSION,
        time: new Date().toISOString(),
        backup
      }));
    } catch (e) {}
  }

  function attachLoginBackup() {
    document.addEventListener('submit', function (ev) {
      const form = ev.target;
      if (!form || !form.querySelector) return;
      if (form.querySelector('input[type="email"], input[type="password"]')) {
        backupLocalDataBeforeLogin();
      }
    }, true);

    document.addEventListener('click', function (ev) {
      const btn = ev.target && ev.target.closest ? ev.target.closest('button, input[type="submit"]') : null;
      if (!btn) return;
      const text = (btn.innerText || btn.value || '').trim();
      if (/ورود|login|sign in/i.test(text)) backupLocalDataBeforeLogin();
    }, true);
  }

  function runFixes() {
    unlockLoginInputs();
    relaxBlockingLayers();
  }

  clearOldCachesOnce();
  attachLoginBackup();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runFixes);
  } else {
    runFixes();
  }

  // React apps sometimes render after load; repeat lightly without heavy loops.
  let count = 0;
  const timer = setInterval(() => {
    runFixes();
    count += 1;
    if (count >= 20) clearInterval(timer);
  }, 500);

  log('Login Safe Patch active.');
})();
