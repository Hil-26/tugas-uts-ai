// --- 1. INISIALISASI DATABASE & BANYAK BARANG ---
const defaultUsers = [
    { username: 'admin', password: '123', role: 'admin' },
    { username: 'user', password: '123', role: 'user' }
];

// Data perlengkapan outdoor dengan link gambar asli
const defaultProducts = [
    { id: 1, name: "Tenda Dome 4 Orang Ultra", price: 1250000, category: "pria", image: "https://images.unsplash.com/photo-1504280390467-339230698150?w=500&q=80" },
    { id: 2, name: "Tas Carrier Eiger 60L", price: 1400000, category: "pria", image: "https://images.unsplash.com/photo-1553531384-411a247cad94?w=500&q=80" },
    { id: 3, name: "Sepatu Trekking Pria", price: 850000, category: "pria", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80" },
    { id: 4, name: "Jaket Gunung Windbreaker Pria", price: 550000, category: "pria", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80" },
    { id: 5, name: "Sleeping Bag Polar", price: 350000, category: "pria", image: "https://images.unsplash.com/photo-1627259445255-88548a4c8491?w=500&q=80" },
    { id: 6, name: "Kompor Portable Camping", price: 250000, category: "pria", image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=500&q=80" },
    
    { id: 7, name: "Jaket Waterproof Wanita", price: 520000, category: "wanita", image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&q=80" },
    { id: 8, name: "Sepatu Hiking Wanita Lite", price: 780000, category: "wanita", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80" },
    { id: 9, name: "Daypack 30L Wanita", price: 600000, category: "wanita", image: "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=500&q=80" },
    { id: 10, name: "Trekking Pole Carbon", price: 180000, category: "wanita", image: "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=500&q=80" },
    { id: 11, name: "Hammock Parasut Single", price: 150000, category: "wanita", image: "https://images.unsplash.com/photo-1531853121101-cb94c8ed218d?w=500&q=80" },
    { id: 12, name: "Headlamp LED Rechargeable", price: 120000, category: "wanita", image: "https://images.unsplash.com/photo-1536767679373-c6c7f8a7e44a?w=500&q=80" }
];

// KODE INI UNTUK MEMAKSA UPDATE DATA JIKA SEBELUMNYA MASIH PAKAI ICON EMOJI
localStorage.setItem('products', JSON.stringify(defaultProducts));

if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify(defaultUsers));
if (!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify([]));
if (!localStorage.getItem('orders')) localStorage.setItem('orders', JSON.stringify([]));

const getDB = (key) => JSON.parse(localStorage.getItem(key));
const saveDB = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// --- 2. LOGIKA AUTENTIKASI ---
function login(e) {
    e.preventDefault();
    const userInp = document.getElementById('username').value;
    const passInp = document.getElementById('password').value;
    const users = getDB('users');
    const validUser = users.find(u => u.username === userInp && u.password === passInp);
    
    if (validUser) {
        localStorage.setItem('currentUser', JSON.stringify(validUser));
        window.location.href = validUser.role === 'admin' ? 'admin.html' : 'index.html';
    } else {
        alert("Username atau password salah!");
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

const currentUser = getDB('currentUser');
const currentPage = window.location.pathname;

if (currentPage.includes('admin.html') && (!currentUser || currentUser.role !== 'admin')) {
    window.location.href = 'login.html';
} else if ((currentPage.includes('index.html') || currentPage.includes('cart.html')) && !currentUser) {
    window.location.href = 'login.html';
}

// --- 3. TAMPILAN USER (MENAMPILKAN GAMBAR) ---
function renderUserProducts(category) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    let products = getDB('products');
    if (category !== 'all') products = products.filter(p => p.category === category);

    grid.innerHTML = '';
    products.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <!-- Tag div diubah menjadi img -->
                <img src="${p.image}" class="product-image" alt="${p.name}">
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p class="price">Rp ${p.price.toLocaleString('id-ID')}</p>
                    <button class="btn-cart" onclick="addToCart(${p.id})">Tambah ke Keranjang</button>
                </div>
            </div>
        `;
    });
}

// --- 4. LOGIKA KERANJANG MODERN ---
function addToCart(id) {
    const products = getDB('products');
    const cart = getDB('cart');
    const product = products.find(p => p.id === id);
    
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveDB('cart', cart);
    updateCartCount();
    
    // Notifikasi sederhana bawaan browser jika toast tidak ada
    if(document.getElementById('toast')) {
        document.getElementById('toast').className = "toast show";
        setTimeout(() => document.getElementById('toast').className = "toast", 3000);
    } else {
        alert(`${product.name} masuk ke keranjang!`);
    }
}

function updateCartCount() {
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) {
        const cart = getDB('cart');
        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cart-list');
    const totalEl = document.getElementById('cart-total');
    if (!cartContainer) return;

    const cart = getDB('cart');
    let total = 0;
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Keranjang Anda masih kosong. Yuk belanja!</p>';
        totalEl.textContent = 'Rp 0';
        return;
    }

    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        
        // Membangun Card UI untuk Keranjang
        cartContainer.innerHTML += `
            <div class="cart-item-card">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Rp ${item.price.toLocaleString('id-ID')}</p>
                </div>
                <div class="cart-qty-controls">
                    <button onclick="updateQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQty(${item.id}, 1)">+</button>
                </div>
                <div style="font-weight: 600; width: 120px; text-align: right;">
                    Rp ${subtotal.toLocaleString('id-ID')}
                </div>
                <button class="btn-delete" onclick="removeFromCart(${item.id})" title="Hapus Barang">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    totalEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

function updateQty(id, change) {
    let cart = getDB('cart');
    const item = cart.find(c => c.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
        saveDB('cart', cart);
        renderCart();
        updateCartCount();
    }
}

function removeFromCart(id) {
    let cart = getDB('cart');
    cart = cart.filter(c => c.id !== id);
    saveDB('cart', cart);
    renderCart();
    updateCartCount();
}

function checkout() {
    const cart = getDB('cart');
    if (cart.length === 0) return alert("Keranjang masih kosong!");
    
    const orders = getDB('orders');
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    orders.push({
        id: "INV-" + Date.now(),
        user: getDB('currentUser').username,
        items: cart,
        total: total,
        status: "Lunas"
    });
    
    saveDB('orders', orders);
    saveDB('cart', []);
    alert("Pembayaran Berhasil! Terima kasih telah berbelanja.");
    renderCart();
    updateCartCount();
}

// Fitur Admin (Read & Delete Product, Read Order)
function renderAdminProducts() {
    const tbody = document.getElementById('admin-product-list');
    if (!tbody) return;
    const products = getDB('products');
    tbody.innerHTML = '';
    products.forEach(p => {
        tbody.innerHTML += `<tr>
            <td><img src="${p.image}" width="50" style="border-radius:4px;"></td>
            <td>${p.name}</td>
            <td>Rp ${p.price.toLocaleString('id-ID')}</td>
            <td>${p.category}</td>
            <td><button onclick="deleteProduct(${p.id})">Hapus</button></td>
        </tr>`;
    });
}

function renderAdminOrders() {
    const tbody = document.getElementById('admin-order-list');
    if (!tbody) return;
    const orders = getDB('orders');
    tbody.innerHTML = '';
    orders.forEach(o => {
        tbody.innerHTML += `<tr><td>${o.id}</td><td>${o.user}</td><td>Rp ${o.total.toLocaleString('id-ID')}</td><td>Lunas</td></tr>`;
    });
}

function deleteProduct(id) {
    if(confirm("Hapus produk ini?")) {
        let products = getDB('products');
        products = products.filter(p => p.id !== id);
        saveDB('products', products);
        renderAdminProducts();
    }
}

// Window Onload
window.onload = () => {
    updateCartCount();
    const grid = document.getElementById('product-grid');
    if(grid) renderUserProducts(grid.getAttribute('data-category'));
    if(document.getElementById('cart-list')) renderCart();
    if(document.getElementById('admin-product-list')) { renderAdminProducts(); renderAdminOrders(); }
    const loginForm = document.getElementById('login-form');
    if(loginForm) loginForm.addEventListener('submit', login);
};