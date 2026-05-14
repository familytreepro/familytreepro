FamilyTreePro V72 Security Lockdown

Security-only production hardening. No new duplicate dashboard/chat/tree modules.

Replace only:
- index.html
- manifest.json
- service-worker.js

Test URL:
index.html?v=v72-security-lockdown-no-cache

Notes:
- No website can be guaranteed impossible to hack.
- V72 adds forced default-password change, emergency lock, input sanitizing, security backup, audit log, CSP meta and safer cloud import sanitizing.
- For real production security, configure Firebase Auth, Firestore/Storage Rules and App Check in Firebase Console.
