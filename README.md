# 🛋️ Meuble Concept Design — دليل الإعداد والنشر

## هيكل الملفات
```
meuble-concept/
├── index.html          ← الصفحة الرئيسية + المنتجات
├── login.html          ← تسجيل الدخول
├── register.html       ← إنشاء حساب
├── booking.html        ← نظام الحجز
├── checkout.html       ← إتمام الطلب + طرق الدفع
├── vercel.json         ← إعدادات Vercel
├── supabase-setup.sql  ← سكريبت قاعدة البيانات
├── css/
│   └── style.css       ← جميع الأنماط
├── js/
│   ├── supabase.js     ← إعدادات Supabase
│   ├── auth.js         ← نظام المستخدمين
│   ├── products.js     ← جلب المنتجات
│   └── cart.js         ← السلة (localStorage)
└── admin/
    └── index.html      ← لوحة التحكم (محمية)
```

---

## خطوة 1: إعداد Supabase

### 1.1 تشغيل SQL
- اذهب إلى: **Supabase Dashboard → SQL Editor**
- انسخ محتوى `supabase-setup.sql` والصقه
- اضغط **Run**

### 1.2 تعطيل تأكيد الإيميل
- اذهب إلى: **Authentication → Settings**
- ابحث عن **"Confirm email"**
- قم بتعطيله ✓

### 1.3 إنشاء حساب الأدمن
- اذهب إلى: **Authentication → Users → Add user**
- البريد: `admin@meubleconcept.com`
- كلمة مرور قوية من اختيارك
- أو يمكنك التسجيل من صفحة register.html بنفس الإيميل

---

## خطوة 2: النشر على Vercel

### الطريقة السهلة (Drag & Drop):
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل الدخول (يفضل بـ GitHub)
3. اضغط **Add New → Project**
4. اختر **"Import Third-Party Git Repository"** أو ارفع الملفات مباشرة
5. اضغط **Deploy** ✓

### عبر GitHub:
```bash
# ارفع الملفات لـ GitHub
git init
git add .
git commit -m "Meuble Concept Design v1.0"
git push origin main

# ثم اربط الـ repo بـ Vercel
```

---

## طرق الدفع المتاحة
| الطريقة | الوصف |
|---------|-------|
| 💵 الدفع عند الاستلام | Cash on delivery |
| 🏦 CCP | بريد الجزائر |
| 📱 BaridiMob | تطبيق بريدي |
| 🔄 تحويل بنكي | BNA |

---

## الأدمن
- **الرابط:** `/admin/index.html`
- **محمي بـ:** أي إيميل يبدأ بـ `admin@`
- **الصلاحيات:** إضافة/تعديل/حذف منتجات، إدارة الطلبات والحجوزات

---

## ميزات السلة
- تُحفظ في `localStorage` (تبقى حتى بعد إغلاق المتصفح)
- تُفرّغ تلقائياً بعد إتمام الطلب

---

## ملاحظات تقنية
- الموقع 100% Vanilla JS (بدون frameworks)
- ES Modules عبر CDN (`jsdelivr`)
- Dark Theme متكامل بـ CSS Variables
- Responsive للموبايل

---

*Meuble Concept Design © 2025*
