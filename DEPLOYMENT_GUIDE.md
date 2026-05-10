# Render-ga Frontend + Backend Deployment Guide

## 🎯 Maqsad
Backend va Frontend-ni birgalikda Render-da deploy qilish.

## ✅ Prerequisites

1. Git installed
2. GitHub repository
3. Render account

## 📦 Current Setup

### Backend Routes (API)
```
/api/auth/register
/api/auth/login
/api/auth/profile
/api/users
/api/books
/api/orders
```

### Frontend Static Files
```
public/index.html
public/styles.css
public/frontend.js
```

## 🚀 Deployment Steps

### Step 1: Update Backend Configuration

Backend `app.js` allaqachon quyidagilar bilan konfiguratsiya qilingan:
- ✅ Static files serving (`express.static('public')`)
- ✅ Users route qo'shilgan
- ✅ CORS enabled (Render-da)

### Step 2: Git Commit & Push

```bash
# Barcha o'zgarishlarni add qiling
git add -A

# Commit qiling
git commit -m "Add complete frontend and users API

- Create responsive frontend (HTML, CSS, JS)
- Add users route and controller
- Enable static file serving
- Update app.js for public folder serving"

# Push qiling
git push -u origin main
```

### Step 3: Render Deploy

#### Option A: Yangi deployment (agar bu birinchi marta bo'lsa)

1. [render.com](https://render.com) ga kiring
2. "New +" tugmasini bosing
3. "Web Service" tanlang
4. GitHub repository-ni ulang
5. Quyidagilarni to'ldiring:
   - **Name**: book-store-api
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
   - **Plan**: Free

#### Option B: Mavjud deployment-ni yangilash

```bash
# Render CLI orqali (agar o'rnatilgan bo'lsa)
render login
render deploy

# yoki GitHub-ga push qiling, Render avtomatik yangilanadi
git push origin main
```

### Step 4: Environment Variables (Agar kerak bo'lsa)

Render Dashboard-da:
1. "Environment" -> "Environment Variables"
2. Qo'shing:
```
PORT=4001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10
```

### Step 5: Verify Deployment

```bash
# API endpoints-ni test qiling
curl https://books-backend-7umx.onrender.com/api/books

# Frontend-ni brauzer-da oching
https://books-backend-7umx.onrender.com

# Console-ni tekshiring
# Render Dashboard -> Logs
```

## 📁 File Structure (Render-da)

```
/
├── app.js                      # Main server
├── package.json
├── .env                        # Environment variables
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utils/
└── public/                     # Frontend (static files)
    ├── index.html
    ├── styles.css
    └── frontend.js
```

## 🔍 Testing

### Frontend Testing
```bash
# Lokal test
cd public
python -m http.server 8000
# http://localhost:8000
```

### API Testing
```bash
# Kitoblarni olish
curl https://books-backend-7umx.onrender.com/api/books

# Foydalanuvchilarni olish
curl https://books-backend-7umx.onrender.com/api/users

# Ro'yxatdan o'tish
curl -X POST https://books-backend-7umx.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🛠️ Troubleshooting

### Issue: Static files not serving
**Solution**: 
1. `public/` papka root-da ekanligini tekshiring
2. `express.static('public')` app.js-da before routes-dan oldin bo'lishi kerak
3. Render-ga restart qiling

### Issue: API routes not working
**Solution**:
1. `/api` prefix-ni tekshiring
2. Headers-ni tekshiring (`Content-Type: application/json`)
3. Logs-ni tekshiring (Render Dashboard)

### Issue: CORS errors
**Solution**:
1. Frontend URL-ni tekshiring
2. Backend-da CORS konfiguratsiyasini tekshiring

## 📊 Monitoring

### Render Dashboard-da
1. **Logs** - Barcha server logs
2. **Metrics** - CPU, Memory usage
3. **Events** - Deployments, errors

### Frontend Monitoring
```bash
# Browser DevTools (F12)
# Console - Errors va logs
# Network - API requests
# Application - LocalStorage
```

## 🔄 Update Process

Hereafter yangilanishlar uchun:

```bash
# 1. Kod o'zgartirilgan qismnda:
code changes...

# 2. Git
git add -A
git commit -m "Update message"
git push origin main

# 3. Render avtomatik yangilanadi (1-2 daqiqada)
```

## 📝 Important Notes

1. **CORS**: Frontend va Backend bir URL-da, CORS muammosi yo'q
2. **Performance**: Static files Render-da tezlik bilan serve bo'ladi
3. **Cold Starts**: Free plan-da cold start bo'lishi mumkin (30 sekund)
4. **Database**: MongoDB connection string .env-da bo'lishi kerak

## ✅ Deployment Checklist

- [ ] Git repository updated
- [ ] All files committed
- [ ] `public/` folder created
- [ ] Frontend files copied to public
- [ ] `app.js` configured for static serving
- [ ] Users route added
- [ ] `.gitignore` has node_modules
- [ ] Environment variables set
- [ ] Render deployment triggered
- [ ] Frontend loads at root URL
- [ ] API endpoints responsive
- [ ] Login/Register works
- [ ] Book ordering works

## 🎉 Success Indicators

✅ Render deployment complete qo'l tutan haqida ko'rsatish:
```
https://books-backend-7umx.onrender.com      # Frontend loads
https://books-backend-7umx.onrender.com/api/books  # API works
```

## 📞 Common Commands

```bash
# Git status
git status

# View logs
git log --oneline -5

# Reset to previous commit (agar kerak bo'lsa)
git reset --hard HEAD~1

# View remotes
git remote -v
```

---

**Deployment Duration**: ~2 minutes  
**Difficulty Level**: Easy  
**Last Updated**: 2024
