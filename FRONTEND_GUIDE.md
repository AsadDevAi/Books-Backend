# Frontend Features & User Guide

## 📖 Dastlabki O'zlashtirish

### Foydalanuvchi Roli

#### 1. **Kirish Oldingi (Guest)**
```
Mavjud Sahifalar:
- 📚 Kitoblar Galereyasi (Public)
- 👥 Foydalanuvchilar Ro'yxati (Public)
- 🔐 Kirish/Ro'yxatdan O'tish (Modal)
```

**Qilish Mumkin:**
- Kitoblarni ko'rish
- Foydalanuvchilarni ko'rish
- Ro'yxatdan o'tish
- Tizimga kirish

**Qilish Mumkin emas:**
- Buyurtma qilish
- Profil ko'rish
- O'z buyurtmalarni ko'rish

#### 2. **Login Qilingan (User)**
```
Mavjud Sahifalar:
- 📚 Kitoblar Galereyasi
- 👥 Foydalanuvchilar Ro'yxati
- 📋 Mening Buyurtmalarim
- 👤 Profilim
- 🔐 Chiqish
```

**Yangi Imkoniyatlar:**
- ✅ Kitoblar buyurtmasi
- ✅ O'z buyurtmalarni ko'rish
- ✅ Buyurtmani bekor qilish
- ✅ Profil ma'lumotlarini ko'rish
- ✅ Token avtomatik saqlash

---

## 🎯 Functionality Guide

### 1️⃣ Kitoblar Galereyasi (Home)

**Ko'rsatilgan Ma'lumotlar:**
- 📖 Kitob emoji (icon)
- 📚 Kitob nomi
- 📝 Muallif
- 📄 Tavsif
- 💰 Narx (so'm-da)
- 📦 Stock holati
- 🏷️ Kategoriya

**Stock Holati:**
```
✅ Mavjud (Ko'k): "📦 N ta"
⚠️ Kam Stock (Sariq): "📦 1-4 ta"  
❌ Yo'q (Qizil): "Stokda yo'q"
```

**Tugmalar:**
- 🛒 "Buyurtma Qilish" (Login kerak)
- ⛔ "Stokda yo'q" (Stock = 0 bo'lganda disabled)

**Modalda:**
- Miqdori kiriting (1-stock oraliqlari)
- Jami narx avtomatik hisoblanadi
- "Buyurtma Qilish" tugmasini bosing

---

### 2️⃣ Foydalanuvchilar Ro'yxati

**Ko'rsatilgan Ma'lumotlar (Kartochka):**
- 👤 Avatar (Ism harf)
- 👤 To'liq ism
- 📧 Email
- 👑 Rol (Admin/Foydalanuvchi)

**Rol Belgisi:**
- 👑 Admin: Qizil background
- 👤 User: Yashil background

**Imkoniyatlar:**
- Barcha foydalanuvchilarni ko'rish
- Profil ma'lumotlarini o'qish

---

### 3️⃣ Tizimga Kirish / Ro'yxatdan O'tish

#### Ro'yxatdan O'tish:
```
1. "Kirish" tugmasini bosing
2. "Ro'yxatdan o'tish" link-ni bosing
3. Ma'lumotlarni kiriting:
   - To'liq Ism: "Ism Familiya"
   - Email: "user@example.com"
   - Parol: "Xavfsiz parol"
4. "Ro'yxatdan O'tish" tugmasini bosing
5. Avtomatik login qilinadi
```

**Validatsiya:**
- Email unikalni bo'lishi kerak
- Parol minimal 6 ta belgi
- Barcha maydonlar required

#### Tizimga Kirish:
```
1. "Kirish" tugmasini bosing (default)
2. Ma'lumotlarni kiriting:
   - Email: "user@example.com"
   - Parol: "Xavfsiz parol"
3. "Kirish" tugmasini bosing
4. Token localStorage-da saqlanadi
```

**Xatoliklar:**
- ❌ "Email yoki parol noto'g'ri" - Email/parol xato
- ❌ "Bu email allaqachon ro'yxatdan o'tgan" - Email band

---

### 4️⃣ Mening Buyurtmalarim

**Buyurtma Kartochkasi:**
```
Yuqori qism:
- 📚 Kitob nomi
- Status badge (⏳ Kutilmoqda / ✅ Yetkazildi / ❌ Bekor Qilindi)

Tafsilotlar:
- Muallif
- Miqdori
- Jami Narx
- Buyurtma Sanasi

Tugma (PENDING holati uchun):
- "Bekor Qilish"
```

**Status Ranglar:**
```
⏳ Kutilmoqda (PENDING)      - Sariq
✅ Yetkazildi (DELIVERED)   - Yashil
❌ Bekor Qilindi (CANCELLED) - Qizil
```

**Imkoniyatlar:**
- PENDING buyurtmalarni bekor qilish
- Buyurtma tafsilotlarini ko'rish
- Bekor qilingan buyurtmalar ko'rish

---

### 5️⃣ Profilim

**Ma'lumotlar:**
```
Yuqori qism:
- 👤 Avatar (ism harfi)
- Ism Familiya
- Email
- Rol

Tafsilotlar Grid:
- Ro'yxatdan O'tgan Sana
- Hisobi Holati (✅ Faol / ❌ Faol emas)
- Jami Buyurtmalar Soni
```

**Avtomatik Yangilanish:**
- Sahifani ochganida profil ma'lumotlari backend-dan yangilanadi
- Mening Buyurtmalarim-da saqlanadi

---

## 🎨 UI Components

### Notificationlar (Bildirishnomalar)

```
✅ SUCCESS (Yashil)
- Muvaffaqiyatli amallar
- Messa: "Ro'yxatdan o'tdingiz"

❌ ERROR (Qizil)
- Xato yuz berdi
- Xabar: "Email yoki parol noto'g'ri"

⚠️ WARNING (Sariq)
- Ogohlantirish
- Xabar: "Avval tizimga kiring"

ℹ️ INFO (Moviy)
- Informatsiya
- Xabar: "Siz tizimdan chiqdingiz"
```

**Davomiyligi**: 4 soniya (avtomatik yo'qoladi)

### Modallar

#### Auth Modal
- Login va Register ikkita form
- Close button (X)
- Outside-ga click qiling - modalda yopiladi

#### Order Modal
- Miqdor input (1-stock)
- Jami narx avtomatik hisoblanadi
- Close button
- Outside-ga click - modal yopiladi

---

## 🔐 Security Features

### Token Management
```javascript
// Login qilganda:
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));

// Logout qilganda:
localStorage.removeItem('token');
localStorage.removeItem('user');
```

### Xavfsizlik
- Parollar hesh qilinadi (bcrypt)
- JWT tokens bilan protected
- XSS protection (HTML escape)
- CSRF protection (orqali backend)

---

## 📱 Responsive Design

### Breakpoints
```
Desktop:        1200px+   (3-4 kolonna)
Tablet:         768-1199px (2-3 kolonna)
Mobile:         481-767px  (1-2 kolonna)
Small Mobile:   < 480px    (1 kolonna)
```

**Mobil Features:**
- Hamburger menu yo'q (buttons responsive)
- Single column layout
- Touch-friendly buttons
- Optimized fonts

---

## ⌨️ Keyboard Shortcuts

```
Tab          - Navigation
Enter        - Submit form
Escape       - Close modal
```

---

## 🌐 API Response Handling

### Success Response
```javascript
{
  "data": [...],
  "message": "Muvaffaqiyatli"
}
// UI: Green notification + Success state
```

### Error Response
```javascript
{
  "statusCode": 400,
  "message": "Xato matnı"
}
// UI: Red notification
```

### Loading States
- Kitoblar yuklanayotganda: "Kitoblar yuklanmoqda..."
- API request kutilayotganda: Disable button

---

## 💡 Tips & Tricks

### 1. Tez Kirish
- Email saqlangan bo'lsa, autofill ishlaydi
- Token localStorage-da saqlanadi (24 soatdan ko'p bo'lmasligi kerak)

### 2. Buyurtma Qilish
- Stock holatini tekshiring (ko'rish mumkin)
- Jami narx avtomatik hisoblanadi
- PENDING buyurtmalar bekor qilinishi mumkin

### 3. Profil
- Profile-da barcha buyurtmalar ko'rsatiladi
- Yangilanishi avtomatik bo'ladi

### 4. Xatoliklar
- Xatoliklar ekranda ko'rsatiladi
- Console yopilgan bo'lsa ham bilasiz

---

## 🐛 Common Issues & Solutions

| Muammo | Sababi | Yechim |
|--------|--------|--------|
| Kitoblar yuklashmadi | Backend offline | Render-da status tekshiring |
| Kirish ishlasi | Email/parol xato | Email/parolni tekshiring |
| Token yo'q | Session tugadi | Qayta login qiling |
| Buyurtma bekor bo'ldi | Network error | Qayta urinib ko'ring |
| Stock yangilanmadi | Cache | Sahifani refresh qiling |

---

## 🚀 Performance Tips

1. **Caching**: Browser cache ishlatiladi
2. **Lazy Loading**: Kitoblar on-demand
3. **Efficient Rendering**: Virtual DOM-style updates
4. **Minimal Bundle**: ~20KB (uncompressed)

---

## 📞 Support Qo'llanma

### Debug Mode
1. Brauzer DevTools aching (F12)
2. Console tab-ni tekshiring
3. Network tab-da API requests ko'rish
4. Application tab-da localStorage

### Backend Logs
```bash
# Render Dashboard-da
Logs -> View logs
```

---

## 🎓 Learning Resources

- JavaScript: Modern DOM API
- CSS: Grid, Flexbox, Variables
- API: Fetch, JWT, CORS
- Design: Responsive, Accessibility

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Language**: O'zbek (uz)
