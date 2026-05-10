// API Configuration
const API_URL = 'https://books-backend-7umx.onrender.com/api';

// State Management
const state = {
  currentUser: null,
  token: null,
  currentSection: 'books',
  books: [],
  users: [],
  orders: [],
  selectedBookForOrder: null,
};

// ==================== DOM Elements ====================
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const authModal = document.getElementById('authModal');
const orderModal = document.getElementById('orderModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const ordersBtn = document.getElementById('ordersBtn');
const profileBtn = document.getElementById('profileBtn');
const closeButtons = document.querySelectorAll('.close-btn');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const orderForm = document.getElementById('orderForm');
const booksContainer = document.getElementById('booksContainer');
const usersContainer = document.getElementById('usersContainer');
const ordersContainer = document.getElementById('ordersContainer');
const profileContainer = document.getElementById('profileContainer');

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
  loadTokenFromStorage();
  setupEventListeners();
  if (state.token) {
    loadUserProfile();
  }
  loadBooks();
  loadUsers();
});

// ==================== Event Listeners ====================
function setupEventListeners() {
  // Navigation
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const section = e.target.dataset.section;
      if (section) {
        showSection(section);
      }
    });
  });

  // Auth Modal
  loginBtn.addEventListener('click', () => {
    showAuthModal('login');
  });

  logoutBtn.addEventListener('click', logout);

  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        modal.classList.remove('show');
      }
    });
  });

  // Auth Form Switching
  switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });

  switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });

  // Auth Forms
  loginFormElement.addEventListener('submit', handleLogin);
  registerFormElement.addEventListener('submit', handleRegister);

  // Order Form
  orderForm.addEventListener('submit', handleCreateOrder);

  // Close modals on outside click
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.classList.remove('show');
    }
  });

  orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) {
      orderModal.classList.remove('show');
    }
  });
}

// ==================== Section Management ====================
function showSection(sectionId) {
  state.currentSection = sectionId;

  // Update active button
  navBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.section === sectionId) {
      btn.classList.add('active');
    }
  });

  // Hide all sections
  sections.forEach(section => {
    section.classList.add('hidden');
  });

  // Show selected section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.remove('hidden');

    // Load data if needed
    if (sectionId === 'my-orders' && state.token) {
      loadMyOrders();
    }
    if (sectionId === 'profile' && state.token) {
      loadUserProfile();
    }
  }
}

// ==================== Authentication ====================
function showAuthModal(form = 'login') {
  authModal.classList.add('show');
  if (form === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  } else {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  }
}

async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      showNotification(result.message || 'Kirish muvaffaqiyatsiz', 'error');
      return;
    }

    state.token = result.data.token;
    state.currentUser = result.data.user;

    localStorage.setItem('token', state.token);
    localStorage.setItem('user', JSON.stringify(state.currentUser));

    showNotification(result.message || 'Muvaffaqiyatli kirdingiz', 'success');

    updateAuthUI();
    authModal.classList.remove('show');
    loginFormElement.reset();
    showSection('books');
  } catch (error) {
    showNotification('Xato: ' + error.message, 'error');
  }
}

async function handleRegister(e) {
  e.preventDefault();

  const fullName = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      showNotification(result.message || 'Ro\'yxatdan o\'tish muvaffaqiyatsiz', 'error');
      return;
    }

    state.token = result.data.token;
    state.currentUser = result.data.user;

    localStorage.setItem('token', state.token);
    localStorage.setItem('user', JSON.stringify(state.currentUser));

    showNotification(result.message || 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz', 'success');

    updateAuthUI();
    authModal.classList.remove('show');
    registerFormElement.reset();
    showSection('books');
  } catch (error) {
    showNotification('Xato: ' + error.message, 'error');
  }
}

function logout() {
  state.token = null;
  state.currentUser = null;
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  updateAuthUI();
  showNotification('Siz tizimdan chiqdingiz', 'info');
  showSection('books');
}

function loadTokenFromStorage() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    state.token = token;
    state.currentUser = JSON.parse(user);
    updateAuthUI();
  }
}

function updateAuthUI() {
  if (state.token) {
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    ordersBtn.classList.remove('hidden');
    profileBtn.classList.remove('hidden');
  } else {
    loginBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
    ordersBtn.classList.add('hidden');
    profileBtn.classList.add('hidden');
  }
}

// ==================== API Calls ====================
async function loadBooks() {
  try {
    const response = await fetch(`${API_URL}/books`);
    const result = await response.json();

    if (response.ok && result.data) {
      state.books = result.data;
      renderBooks();
    } else {
      throw new Error(result.message || 'Kitoblarni yuklash muvaffaqiyatsiz');
    }
  } catch (error) {
    showNotification('Kitoblarni yuklashda xato: ' + error.message, 'error');
    booksContainer.innerHTML = '<div class="loading">Kitoblarni yuklashda xato</div>';
  }
}

async function loadUsers() {
  try {
    const response = await fetch(`${API_URL}/users`);
    const result = await response.json();

    if (response.ok && result.data) {
      state.users = result.data;
      renderUsers();
    } else {
      throw new Error(result.message || 'Foydalanuvchilarni yuklash muvaffaqiyatsiz');
    }
  } catch (error) {
    showNotification('Foydalanuvchilarni yuklashda xato: ' + error.message, 'error');
    usersContainer.innerHTML = '<div class="loading">Foydalanuvchilarni yuklashda xato</div>';
  }
}

async function loadMyOrders() {
  if (!state.token || !state.currentUser) {
    showNotification('Avval tizimga kiring', 'warning');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/orders/my/${state.currentUser._id}`, {
      headers: {
        'Authorization': `Bearer ${state.token}`,
      },
    });

    const result = await response.json();

    if (response.ok && result.data) {
      state.orders = result.data;
      renderOrders();
    } else {
      throw new Error(result.message || 'Buyurtmalarni yuklash muvaffaqiyatsiz');
    }
  } catch (error) {
    showNotification('Buyurtmalarni yuklashda xato: ' + error.message, 'error');
    ordersContainer.innerHTML = '<div class="loading">Buyurtmalarni yuklashda xato</div>';
  }
}

async function loadUserProfile() {
  if (!state.token) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${state.token}`,
      },
    });

    const result = await response.json();

    if (response.ok && result.data) {
      state.currentUser = result.data;
      localStorage.setItem('user', JSON.stringify(state.currentUser));
      if (state.currentSection === 'profile') {
        renderProfile();
      }
    }
  } catch (error) {
    console.error('Profil yuklashda xato:', error);
  }
}

async function handleCreateOrder(e) {
  e.preventDefault();

  if (!state.token) {
    showNotification('Avval tizimga kiring', 'warning');
    return;
  }

  if (!state.selectedBookForOrder) {
    showNotification('Kitob tanlang', 'error');
    return;
  }

  const quantity = parseInt(document.getElementById('orderQuantity').value);

  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`,
      },
      body: JSON.stringify({
        bookId: state.selectedBookForOrder._id,
        quantity: quantity,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      showNotification(result.message || 'Buyurtma yaratish muvaffaqiyatsiz', 'error');
      return;
    }

    showNotification(result.message || 'Buyurtma muvaffaqiyatli yaratildi', 'success');
    orderModal.classList.remove('show');
    orderForm.reset();
    loadBooks(); // Refresh books to update stock
    state.selectedBookForOrder = null;
  } catch (error) {
    showNotification('Buyurtma yaratishda xato: ' + error.message, 'error');
  }
}

async function cancelOrder(orderId) {
  if (!state.token) {
    showNotification('Avval tizimga kiring', 'warning');
    return;
  }

  if (!confirm('Buyurtmani bekor qilishga ishonchingiz kommi?')) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${state.token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      showNotification(result.message || 'Buyurtmani bekor qilish muvaffaqiyatsiz', 'error');
      return;
    }

    showNotification(result.message || 'Buyurtma bekor qilindi', 'success');
    loadMyOrders();
    loadBooks(); // Refresh books to update stock
  } catch (error) {
    showNotification('Buyurtmani bekor qilishda xato: ' + error.message, 'error');
  }
}

// ==================== Rendering ====================
function renderBooks() {
  if (state.books.length === 0) {
    booksContainer.innerHTML = '<div class="loading">Kitoblar topilmadi</div>';
    return;
  }

  booksContainer.innerHTML = state.books.map(book => {
    const isOutOfStock = book.stock === 0;
    const isLowStock = book.stock > 0 && book.stock < 5;

    return `
      <div class="book-card">
        <div class="book-card-image">📖</div>
        <div class="book-card-content">
          <div class="book-card-title">${escapeHtml(book.title)}</div>
          <div class="book-card-author">📝 ${escapeHtml(book.author)}</div>
          <div class="book-card-description">${escapeHtml(book.description || 'Tavsif yo\'q')}</div>
          <div class="book-card-meta">
            <div class="book-card-price">${book.price.toLocaleString('uz-UZ')} so'm</div>
            <div class="book-card-stock ${isOutOfStock ? 'out' : isLowStock ? 'low' : ''}">
              ${book.stock > 0 ? `📦 ${book.stock}` : 'Stokda yo\'q'}
            </div>
          </div>
          <div class="book-card-meta">
            <span style="font-size: 12px; color: #6b7280;">Kategoriya: ${escapeHtml(book.category)}</span>
          </div>
          <div class="book-card-actions">
            <button class="btn btn-primary" ${isOutOfStock ? 'disabled' : ''} onclick="openOrderModal({
              _id: '${book._id}',
              title: '${escapeHtml(book.title).replace(/'/g, "\\'")}',
              price: ${book.price},
              stock: ${book.stock}
            })">
              ${isOutOfStock ? 'Stokda yo\'q' : 'Buyurtma Qilish'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderUsers() {
  if (state.users.length === 0) {
    usersContainer.innerHTML = '<div class="loading">Foydalanuvchilar topilmadi</div>';
    return;
  }

  usersContainer.innerHTML = state.users.map(user => {
    const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase();

    return `
      <div class="user-card">
        <div class="user-card-avatar">${initials}</div>
        <div class="user-card-name">${escapeHtml(user.fullName)}</div>
        <div class="user-card-email">${escapeHtml(user.email)}</div>
        <div class="user-card-role ${user.role.toLowerCase()}">
          ${user.role === 'ADMIN' ? '👑 Admin' : '👤 Foydalanuvchi'}
        </div>
      </div>
    `;
  }).join('');
}

function renderOrders() {
  if (state.orders.length === 0) {
    ordersContainer.innerHTML = '<div class="loading">Buyurtmalar topilmadi</div>';
    return;
  }

  ordersContainer.innerHTML = state.orders.map(order => {
    const bookTitle = order.bookId?.title || 'Noma\'lum kitob';
    const bookAuthor = order.bookId?.author || '';
    const createdDate = new Date(order.createdAt).toLocaleDateString('uz-UZ');

    return `
      <div class="order-card ${order.status.toLowerCase()}">
        <div class="order-card-header">
          <div class="order-card-book">📚 ${escapeHtml(bookTitle)}</div>
          <div class="order-card-status ${order.status.toLowerCase()}">
            ${getStatusLabel(order.status)}
          </div>
        </div>
        <div class="order-card-info">
          <div class="order-info-item">
            <div class="order-info-label">Muallif</div>
            <div class="order-info-value">${escapeHtml(bookAuthor)}</div>
          </div>
          <div class="order-info-item">
            <div class="order-info-label">Miqdori</div>
            <div class="order-info-value">${order.quantity} ta</div>
          </div>
          <div class="order-info-item">
            <div class="order-info-label">Jami Narx</div>
            <div class="order-info-value">${order.totalPrice.toLocaleString('uz-UZ')} so'm</div>
          </div>
          <div class="order-info-item">
            <div class="order-info-label">Sana</div>
            <div class="order-info-value">${createdDate}</div>
          </div>
        </div>
        ${order.status === 'PENDING' ? `
          <div class="order-card-actions">
            <button class="btn btn-secondary" onclick="cancelOrder('${order._id}')">
              Bekor Qilish
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  if (state.currentSection === 'profile') {
    renderProfile();
  }
}

function renderProfile() {
  if (!state.currentUser) {
    profileContainer.innerHTML = '<div class="loading">Profil topilmadi</div>';
    return;
  }

  const joinDate = new Date(state.currentUser.createdAt).toLocaleDateString('uz-UZ');
  const initials = state.currentUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase();

  profileContainer.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar">${initials}</div>
      <div class="profile-info">
        <div class="profile-name">${escapeHtml(state.currentUser.fullName)}</div>
        <div class="profile-email">${escapeHtml(state.currentUser.email)}</div>
        <div class="profile-role ${state.currentUser.role.toLowerCase()}">
          ${state.currentUser.role === 'ADMIN' ? '👑 Admin' : '👤 Foydalanuvchi'}
        </div>
      </div>
    </div>
    <div class="profile-details">
      <div class="profile-detail-item">
        <div class="profile-detail-label">Ro'yxatdan O'tgan Sana</div>
        <div class="profile-detail-value">${joinDate}</div>
      </div>
      <div class="profile-detail-item">
        <div class="profile-detail-label">Hisobi Holati</div>
        <div class="profile-detail-value">
          ${state.currentUser.isActive ? '✅ Faol' : '❌ Faol emas'}
        </div>
      </div>
      <div class="profile-detail-item">
        <div class="profile-detail-label">Buyurtmalar</div>
        <div class="profile-detail-value">${state.orders.length} ta</div>
      </div>
    </div>
  `;
}

// ==================== Order Modal ====================
function openOrderModal(book) {
  state.selectedBookForOrder = book;

  const quantityInput = document.getElementById('orderQuantity');
  quantityInput.max = book.stock;
  quantityInput.value = 1;

  updateOrderTotal();

  orderModal.classList.add('show');
}

function updateOrderTotal() {
  if (!state.selectedBookForOrder) return;

  const quantity = parseInt(document.getElementById('orderQuantity').value);
  const total = state.selectedBookForOrder.price * quantity;
  const orderTotal = document.getElementById('orderTotal');

  orderTotal.innerHTML = `
    Jami narx: <strong>${total.toLocaleString('uz-UZ')} so'm</strong> 
    (${quantity} × ${state.selectedBookForOrder.price.toLocaleString('uz-UZ')} so'm)
  `;
}

document.addEventListener('input', (e) => {
  if (e.target.id === 'orderQuantity') {
    updateOrderTotal();
  }
});

// ==================== Notifications ====================
function showNotification(message, type = 'info') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.remove('hidden');

  setTimeout(() => {
    notification.classList.add('hidden');
  }, 4000);
}

// ==================== Helpers ====================
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getStatusLabel(status) {
  const labels = {
    'PENDING': '⏳ Kutilmoqda',
    'DELIVERED': '✅ Yetkazildi',
    'CANCELLED': '❌ Bekor Qilindi',
  };
  return labels[status] || status;
}

// Start with books section
showSection('books');
