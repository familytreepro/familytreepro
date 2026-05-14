FamilyTreePro V67 Clean Base No-Cache

Replace only these files in GitHub Pages repository:
1. index.html
2. manifest.json
3. service-worker.js

Test URL:
index.html?v=v67-clean-base-no-cache

Changes:
- Removed appended patch blocks after the stable V67 core.
- Kept the original core UI and core logic.
- Kept no-cache / no-store behavior.
- Kept Service Worker cache deletion behavior.
- Removed duplicate render/node overrides caused by patch-on-patch appends.
