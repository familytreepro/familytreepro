FamilyTreePro V99 Login Safe From V98/V97

هدف این نسخه:
- رفع مشکل ورود بدون دست زدن به ساختار اصلی سایت
- جلوگیری از گیر کردن لایه‌های روی صفحه Login
- پاکسازی خطاهای کش و service worker
- محافظت از فرم email/password
- بدون اضافه کردن دیتابیس ایران در این مرحله

روش استفاده امن:
1) فعلاً فقط روی نسخه‌ای که آخرین بار ورودش مشکل دارد تست کن.
2) قبل از جایگزینی، از index.html و manifest.json و service-worker.js بکاپ بگیر.
3) فایل v99-login-safe-patch.js را کنار index.html آپلود کن.
4) قبل از بسته شدن </body> این خط را به index.html اضافه کن:

<script src="./v99-login-safe-patch.js?v=99-login-safe"></script>

5) اگر سایت درست شد، بعداً همین پچ را داخل index اصلی ادغام می‌کنیم.

نکته مهم:
این پچ دیتابیس، Firebase Config یا رمز کاربران را تغییر نمی‌دهد.
