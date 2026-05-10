# Book Store Frontend 📚

Zamonaviy va responsive Book Store frontend qismi. Backend-ga to'liq mos ravishda yaratilgan.

## 🌟 Features

### ✅ Asosiy Xususiyatlar
- **Kitoblar Galereyasi** - Barcha kitoblarni kartochka ko'rinishida ko'rish
- **Foydalanuvchilar Ro'yxati** - Tizim foydalanuvchilarini ko'rish
- **Authentication** - Ro'yxatdan o'tish va kirish tizimi
- **Mening Buyurtmalarim** - Shaxsiy buyurtmalar tarixi
- **Profil Sahifasi** - Shaxsiy ma'lumotlarni ko'rish
- **Buyurtma Qilish** - Kitoblar buyurtmasi

### 🎨 Design Features
- ✨ Zamonaviy va shikli UI/UX
- 📱 Mobil qurilmalarga to'liq responsive
- 🎯 Intuitiv navigatsiya
- 🌐 O'zbek tilida to'liq lokalizatsiya
- ⚡ Tez va samarali

### 🔒 Security
- JWT Token authentication
- LocalStorage-da xavfsiz token saqlash
- CORS support
- XSS Protection

## 📋 Talablar

### Environment
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- Backend API: `https://books-backend-7umx.onrender.com`

## 🚀 Deployment Options

### Option 1: Backend bilan bir joyda (Render)
Backend app.js allaqachon static files serve qilish uchun konfiguratsiya qilingan.

```bash
# Render-ga yangi deployment qilish
git push origin main
```

Frontend fayllari `public/` papkasidan avtomatik serve bo'ladi.

### Option 2: Netlify / Vercel
Frontend fayllarini to'g'ri hostga deploy qiling:
- `public/index.html`
- `public/styles.css`
- `public/frontend.js`

### Option 3: GitHub Pages
```bash
# public papkasini gh-pages branch-ga push qiling
npm install gh-pages --save-dev
# Package.json-ga qo'shing: "deploy": "gh-pages -d public"
npm run deploy
```

## 📁 File Structure

```
public/
├── index.html      # HTML struktura
├── styles.css      # CSS styling (responsive)
└── frontend.js     # JavaScript (API integration)
```

## 🔌 API Integration

### Endpoints

#### Kitoblar (Public)
```javascript
GET /api/books           // Barcha kitoblar
GET /api/books/:id       // Bitta kitob
```

Response Format:
```json
{
  "data": [
    {
      "_id": "...",
      "title": "Kitob nomi",
      "author": "Muallif",
      "description": "Tavsif",
      "price": 50000,
      "stock": 10,
      "category": "Kategoriya",
      "createdAt": "2024-01-01T..."
    }
  ]
}
```

#### Foydalanuvchilar (Public)
```javascript
GET /api/users      // Barcha foydalanuvchilar
GET /api/users/:id  // Bitta foydalanuvchi
```

#### Authentication
```javascript
POST /api/auth/register    // Ro'yxatdan o'tish
POST /api/auth/login       // Kirish
GET /api/auth/profile      // Profil (Protected)
```

Request body:
```json
{
  "fullName": "Ism Familiya",
  "email": "user@email.com",
  "password": "password123"
}
```

Response:
```json
{
  "data": {
    "user": {
      "_id": "...",
      "fullName": "Ism Familiya",
      "email": "user@email.com",
      "role": "USER",
      "isActive": true
    },
    "token": "jwt_token_here"
  },
  "message": "Muvaffaqiyatli ro'yxatdan o'tdingiz"
}
```

#### Buyurtmalar (Protected)
```javascript
GET /api/orders/my/:userId        // Mening buyurtmalarim
POST /api/orders                  // Yangi buyurtma
PATCH /api/orders/:id/cancel      // Buyurtmani bekor qilish
```

Header:
```javascript
{
  "Authorization": "Bearer jwt_token_here"
}
```

## 💻 Local Testing

### Frontend fayllarini lokal test qilish:
```bash
# Har qanday http server ishlatgan bo'ladi
python -m http.server 8000
# yoki
npx http-server

# Brauzer-da: http://localhost:8000
```

## 🎯 Functionality Details

### 1. Kitoblar Sahifasi
- Barcha mavjud kitoblarni ko'rish
- Kitob haqida to'liq ma'lumot (nom, muallif, tavsif, narx, stock)
- "Buyurtma Qilish" tugmasi
- Stock holatini ko'rish (Mavjud/Kam/Yo'q)

### 2. Foydalanuvchilar Sahifasi
- Barcha ro'yxatdan o'tgan foydalanuvchilarni ko'rish
- Foydalanuvchi profilini ko'rish (ism, email, rol)
- Admin va oddiy foydalanuvchilarni farqlash

### 3. Authentication
- Email va parol bilan ro'yxatdan o'tish
- Token-ga asoslangan kirish tizimi
- Avtomatik token saqlash
- Xavfsiz logout

### 4. Mening Buyurtmalarim
- Shaxsiy buyurtmalar ro'yxati
- Buyurtma holati (Kutilmoqda/Yetkazildi/Bekor Qilindi)
- Buyurtma tafsilotlari (kitob, miqdor, narx, sana)
- Kutilgan buyurtmalarni bekor qilish

### 5. Profil Sahifasi
- Foydalanuvchi ma'lumotlari
- Ro'yxatdan o'tish sanasi
- Hisobi holati
- Jami buyurtmalar soni

## 🔐 Token Management

Frontend token-larni localStorage-da saqlaydi:
```javascript
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));
```

Login qilganda avtomatik saqlanadi. Logout qilganda o'chiriladi.

## 📱 Responsive Breakpoints

```css
Desktop: 1200px+
Tablet: 768px - 1199px
Mobile: < 768px
Small Mobile: < 480px
```

## 🛠️ Troubleshooting

### Problem: "CORS Error"
**Solution**: Backend-da CORS sozlanishi kerak.

### Problem: "Kitoblar yuklashmadi"
**Solution**: 
1. Backend URL-ni tekshiring
2. Network tab-ni brauzer Dev Tools-da tekshiring
3. Console-da xatoliklarni ko'ring

### Problem: "Kirish ishlashi"
**Solution**:
1. Email va parolni tekshiring
2. Backend server ishlab turganini tekshiring
3. Token localStorage-da saqlanib turganini tekshiring

## 🌍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Notes

### API Response Format
Barcha API response-lar quyidagi formatda keladi:
```json
{
  "data": { ... },
  "message": "Xabar matnı"
}
```

### Error Handling
- Xatoliklar ekranda notification ko'rinishida ko'rsatiladi
- Terminal-da xatolik ko'rsatilmaydi
- Har bir amalnuftud operatsiya uchun feedback mavjud

### Loading States
- Kitoblar yuklanayotganda loading spinner ko'rsatiladi
- Foydalanuvchilar yuklanayotganda loading spinner ko'rsatiladi
- Buyurtma yaratilayotganda loading spinner ko'rsatiladi

## 🚀 Performance

- Minimal bundle size
- CSS Grid va Flexbox-dan optimal foydalanish
- Event delegation qo'llanildi
- Efficient DOM manipulation

## 📞 Support

Hech qanday muammo paydo bo'lsa:
1. Console-da xatoliklarni tekshiring (F12)
2. Network tab-da API request-larni tekshiring
3. Backend logs-ni tekshiring

## 📄 License

Bu loyiha barcha huquqlar bilan himoyalangan.

---

**Version**: 1.0.0  
**Created**: 2024  
**Status**: Active
