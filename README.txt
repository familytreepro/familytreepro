FamilyTreePro V72.3 Real Firebase Security

آپلود روی سایت:
- index.html
- manifest.json
- service-worker.js

تنظیمات امنیت واقعی در Firebase:
1) Authentication > Sign-in method > Email/Password فعال باشد.
2) در Authentication یک کاربر با ایمیل alibahripor33@gmail.com بسازید یا همین ایمیل را وارد کنید.
3) Firestore Rules را از فایل firestore.rules کپی و Publish کنید.
4) Storage Rules را از فایل storage.rules کپی و Publish کنید.

نقش‌ها:
- ایمیل alibahripor33@gmail.com مدیر اصلی است.
- برای کاربرهای دیگر در Firestore کالکشن roles بسازید:
  roles/{UID} => { role: "editor" } یا { role: "viewer" } یا { role: "admin" }

نکته:
امنیت واقعی فقط وقتی کامل است که Rules را در Firebase منتشر کنید.
