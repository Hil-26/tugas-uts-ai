/* ===================================================================
   SOBAT ALAM - APP ENGINE & E-COMMERCE CORE LOGIC (app.js)
   Features: Auth, Product Catalog, Filters, Search, Cart, Checkout,
             Order Tracking, Admin Dashboard (Full CRUD), Toast & Modals
   =================================================================== */

// --- 1. DEFAULT DATA DUMMY ---
const defaultProducts = [
    {
        id: 1,
        name: "Tenda Dome Arpenaz 4 Orang Ultra",
        price: 1250000,
        category: "pria",
        type: "tenda",
        stock: 12,
        rating: 4.9,
        reviews: 84,
        image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80",
        description: "Tenda dome kapasitas 4 orang dengan teknologi waterproof PU 3000mm. Dilengkapi vestibule luas untuk menyimpan ransel, frame alloy aerospace yang ringan dan anti badai.",
        specs: {
            "Kapasitas": "4 Orang Dewasa",
            "Bahan": "Polyester 190T Ripstop + PU 3000mm",
            "Frame": "Aluminium Alloy 8.5mm",
            "Berat": "3.8 Kg",
            "Dimensi": "240 x 210 x 135 cm"
        }
    },
    {
        id: 2,
        name: "Tas Carrier Eiger Rhinos 60L",
        price: 1400000,
        category: "pria",
        type: "carrier",
        stock: 8,
        rating: 4.8,
        reviews: 120,
        image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&q=80",
        description: "Tas ransel gunung 60 liter dengan teknologi Tropic Backsystem ergonomis untuk sirkulasi udara maksimal di punggung. Cocok untuk pendakian ekspedisi 3-5 hari.",
        specs: {
            "Kapasitas": "60 Liter + 5L Expandable",
            "Bahan": "Cordura 500D High Tenacity",
            "Backsystem": "Ergonomic Airflow Mesh",
            "Berat": "1.9 Kg",
            "Fitur": "Rain cover included, Trekking pole loop"
        }
    },
    {
        id: 3,
        name: "Sepatu Trekking Vibram Waterproof Pria",
        price: 850000,
        category: "pria",
        type: "sepatu",
        stock: 15,
        rating: 4.7,
        reviews: 95,
        image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80",
        description: "Sepatu hiking mid-cut dengan sol karet Vibram cengkeraman ekstra pada jalur basah dan bebatuan licin. Membran tahan air menjaga kaki tetap kering saat melintasi sungai dangkal.",
        specs: {
            "Sol": "Vibram Rubber Grip",
            "Upper": "Genuine Suede + Waterproof Membrane",
            "Insole": "Ortholite Cushioning",
            "Ukuran": "40 - 45",
            "Proteksi": "Rubber Toe & Heel Bumper"
        }
    },
    {
        id: 4,
        name: "Jaket Gunung Windbreaker Thermal Pria",
        price: 550000,
        category: "pria",
        type: "pakaian",
        stock: 20,
        rating: 4.8,
        reviews: 64,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
        description: "Jaket pendaki dengan lapisan insulasi polar thermal lembut untuk menahan suhu beku pegunungan. Luaran Taslan tahan angin (100% windproof) dan water-repellent.",
        specs: {
            "Bahan Luar": "Taslan Waterproof & Windproof",
            "Lapisan Dalam": "Warm Fleece Polar",
            "Fitur": "Adjustable Hoodie, 4 Saku Beritsleting",
            "Ukuran": "M, L, XL, XXL"
        }
    },
    {
        id: 5,
        name: "Sleeping Bag Polar Ultralight Extreme",
        price: 350000,
        category: "pria",
        type: "alat",
        stock: 25,
        rating: 4.9,
        reviews: 142,
        image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=600&q=80",
        description: "Kantung tidur model mummy yang mengunci suhu tubuh hingga kenyamanan 5°C. Sangat ringkas saat dipacking dengan compression sack bawaan.",
        specs: {
            "Limit Suhu": "Comfort 10°C, Limit 5°C, Extreme 0°C",
            "Bahan": "Ripstop Nylon + Dacron Silicone Fill",
            "Ukuran": "210 x 80 x 50 cm",
            "Berat Terlipat": "850 gram"
        }
    },
    {
        id: 6,
        name: "Kompor Portable Camping Windproof",
        price: 250000,
        category: "pria",
        type: "alat",
        stock: 18,
        rating: 4.6,
        reviews: 80,
        image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&q=80",
        description: "Kompor gas lipat dengan daun pelindung angin (windshield flower style) dan pemantik piezo otomatis. Api berdaya tinggi 2800W hemat gas.",
        specs: {
            "Daya Api": "2800W Turbo Flame",
            "Tipe Gas": "Butane Canister (Gas Kaleng)",
            "Pemantik": "Piezo Electric Built-in",
            "Bahan": "Stainless Steel & Copper Alloy",
            "Berat": "450 gram"
        }
    },
    {
        id: 7,
        name: "Jaket Waterproof Summit Series Wanita",
        price: 520000,
        category: "wanita",
        type: "pakaian",
        stock: 14,
        rating: 4.9,
        reviews: 110,
        image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80",
        description: "Jaket gunung khusus siluet wanita dengan bahan Gore-Tex 3-Layer water repellent. Nyaman dan breathable, melindungi saat hujan lebat maupun kabut tebal.",
        specs: {
            "Bahan": "3-Layer GORE-TEX Breathable Fabric",
            "Waterproof Rating": "10.000mm H2O",
            "Fitur": "Pit-zips Ventilasi Ketiak, Hoodie Fleksibel",
            "Ukuran": "S, M, L, XL"
        }
    },
    {
        id: 8,
        name: "Sepatu Hiking Wanita Lite Trail",
        price: 780000,
        category: "wanita",
        type: "sepatu",
        stock: 10,
        rating: 4.8,
        reviews: 58,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
        description: "Sepatu trail hiking wanita berbobot ringan dengan bantalan empuk EVA midsole. Mengurangi kelelahan kaki saat berjalan rute terjal dan berbatu seharian.",
        specs: {
            "Sol": "High Traction Rubber Compound",
            "Bahan": "Breathable Mesh + TPU Overlays",
            "Berat": "360 gram per pasang",
            "Ukuran": "36 - 41"
        }
    },
    {
        id: 9,
        name: "Daypack Ergonomic 30L Wanita",
        price: 600000,
        category: "wanita",
        type: "carrier",
        stock: 16,
        rating: 4.7,
        reviews: 73,
        image: "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=600&q=80",
        description: "Ransel harian untuk pendakian tektok (one-day summit). Didesain khusus sesuai anatomi bahu wanita, lengkap dengan kompartemen water bladder dan rain cover.",
        specs: {
            "Kapasitas": "30 Liter",
            "Fitur": "H2O Port Water Bladder, Front Shove-it Pocket",
            "Bahan": "Nylon Ripstop 420D",
            "Berat": "800 gram"
        }
    },
    {
        id: 10,
        name: "Trekking Pole Carbon Ultralight Lock",
        price: 180000,
        category: "wanita",
        type: "aksesoris",
        stock: 30,
        rating: 4.9,
        reviews: 130,
        image: "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=600&q=80",
        description: "Tongkat pendakian berbahan carbon fiber super ringan dengan sistem pengunci quick-flip lock yang kokoh. Gagang busa EVA menyerap keringat.",
        specs: {
            "Bahan": "100% Carbon Fiber Shaft",
            "Panjang": "62 cm (terlipat) - 135 cm (maksimal)",
            "Gagang": "Ergonomic High Density EVA Foam",
            "Berat": "195 gram"
        }
    },
    {
        id: 11,
        name: "Hammock Parasut Camping Single Plus Tali",
        price: 150000,
        category: "wanita",
        type: "aksesoris",
        stock: 40,
        rating: 4.8,
        reviews: 215,
        image: "https://images.unsplash.com/photo-1531853121101-cb94c8ed218d?w=600&q=80",
        description: "Tempat tidur gantung santai berbahan parasut nilon berkualitas tinggi. Kuat menopang beban hingga 200 kg. Termasuk tali webbing tubular tebal dan carabiner baja.",
        specs: {
            "Beban Maksimal": "200 Kg",
            "Bahan": "High Strength Parachute Nylon 210T",
            "Ukuran": "270 x 140 cm",
            "Kelengkapan": "2x Webbing 2.5m, 2x Steel Carabiner"
        }
    },
    {
        id: 12,
        name: "Headlamp LED Rechargeable 500 Lumens",
        price: 120000,
        category: "wanita",
        type: "alat",
        stock: 35,
        rating: 4.9,
        reviews: 198,
        image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=600&q=80",
        description: "Senter kepala tahan air IPX4 dengan baterai lithium isi ulang via USB Type-C. Memiliki sensor gerak tangan (motion sensor) untuk menyalakan senter tanpa menekan tombol.",
        specs: {
            "Kecerahan": "500 Lumens XPE + COB Red Light",
            "Baterai": "1200mAh Li-ion Rechargeable USB-C",
            "Ketahanan": "Hingga 8 Jam Pemakaian",
            "Waterproof": "IPX4 Rainproof"
        }
    }
];

const defaultUsers = [
    { username: 'admin', name: 'Administrator Sobat Alam', password: '123', role: 'admin' },
    { username: 'user', name: 'Budi Petualang', password: '123', role: 'user' }
];

const defaultOrders = [
    {
        id: "INV-20261001-8841",
        user: "user",
        customerName: "Budi Petualang",
        phone: "081234567890",
        address: "Jl. Rinjani No. 45, Kota Bandung, Jawa Barat",
        courier: "JNE Reguler (Rp 18.000)",
        paymentMethod: "Transfer Bank BCA",
        items: [
            { id: 1, name: "Tenda Dome Arpenaz 4 Orang Ultra", price: 1250000, qty: 1, image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80" },
            { id: 10, name: "Trekking Pole Carbon Ultralight Lock", price: 180000, qty: 2, image: "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=600&q=80" }
        ],
        subtotal: 1610000,
        discount: 161000,
        shippingCost: 18000,
        total: 1467000,
        status: "Dikirim",
        date: "2026-10-01 14:22"
    }
];

// Peta perbaikan URL gambar jika sebelumnya tersimpan gambar rusak/404 di browser pengguna
const brokenUrlMap = {
    "photo-1504280390467-339230698150": "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80",
    "photo-1553531384-411a247cad94": "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&q=80",
    "photo-1627259445255-88548a4c8491": "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=600&q=80",
    "photo-1536767679373-c6c7f8a7e44a": "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=600&q=80"
};

// URL cadangan jika terjadi kegagalan jaringan saat memuat gambar
const fallbackImageUrl = "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&q=80";

// --- 2. LOCALSTORAGE HELPERS & INITIALIZATION ---
function getDB(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error("Error reading localStorage", e);
        return null;
    }
}

function saveDB(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Inisialisasi Database Pertama Kali & Migrasi Otomatis URL Gambar
function initDatabase() {
    if (!localStorage.getItem('products')) {
        saveDB('products', defaultProducts);
    } else {
        // Migrasi jika produk lama belum punya atribut lengkap atau masih pakai link gambar 404
        let stored = getDB('products') || [];
        let updated = false;
        stored = stored.map(p => {
            let itemChanged = false;
            // Perbaiki link gambar yang rusak
            for (const [badKey, goodUrl] of Object.entries(brokenUrlMap)) {
                if (p.image && p.image.includes(badKey)) {
                    p.image = goodUrl;
                    itemChanged = true;
                }
            }

            if (!p.type || !p.rating || !p.stock) {
                p.type = p.type || "alat";
                p.stock = p.stock || 15;
                p.rating = p.rating || 4.8;
                p.reviews = p.reviews || 40;
                p.description = p.description || "Perlengkapan outdoor berkualitas tinggi untuk mendaki dan berkemah.";
                itemChanged = true;
            }

            if (itemChanged) updated = true;
            return p;
        });
        if (updated) saveDB('products', stored);
    }

    // Migrasi pesanan lama jika ada gambar 404
    let storedOrders = getDB('orders');
    if (!storedOrders) {
        saveDB('orders', defaultOrders);
    } else {
        let ordersChanged = false;
        storedOrders.forEach(o => {
            if (o.items && Array.isArray(o.items)) {
                o.items.forEach(it => {
                    for (const [badKey, goodUrl] of Object.entries(brokenUrlMap)) {
                        if (it.image && it.image.includes(badKey)) {
                            it.image = goodUrl;
                            ordersChanged = true;
                        }
                    }
                });
            }
        });
        if (ordersChanged) saveDB('orders', storedOrders);
    }

    // Migrasi keranjang lama jika ada gambar 404
    let storedCart = getDB('cart');
    if (!storedCart) {
        saveDB('cart', []);
    } else {
        let cartChanged = false;
        storedCart.forEach(it => {
            for (const [badKey, goodUrl] of Object.entries(brokenUrlMap)) {
                if (it.image && it.image.includes(badKey)) {
                    it.image = goodUrl;
                    cartChanged = true;
                }
            }
        });
        if (cartChanged) saveDB('cart', storedCart);
    }

    if (!localStorage.getItem('users')) saveDB('users', defaultUsers);
}

initDatabase();

// Format Rupiah
function formatRupiah(num) {
    return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
}

// Toast Notifikasi Universal
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-check-circle';
    if (type === 'error') iconClass = 'fa-exclamation-circle';
    else if (type === 'warning') iconClass = 'fa-triangle-exclamation';
    else if (type === 'info') iconClass = 'fa-info-circle';

    toast.innerHTML = `
        <i class="fas ${iconClass}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// --- 3. SISTEM AUTENTIKASI ---
function getCurrentUser() {
    return getDB('currentUser');
}

function login(e) {
    if (e) e.preventDefault();
    const userInp = document.getElementById('username')?.value.trim();
    const passInp = document.getElementById('password')?.value;
    const users = getDB('users') || [];
    
    const validUser = users.find(u => u.username.toLowerCase() === userInp.toLowerCase() && u.password === passInp);
    
    if (validUser) {
        saveDB('currentUser', validUser);
        showToast(`Selamat datang kembali, ${validUser.name || validUser.username}!`);
        setTimeout(() => {
            if (validUser.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'index.html';
            }
        }, 800);
    } else {
        showToast("Username atau kata sandi tidak cocok!", "error");
    }
}

function register(e) {
    if (e) e.preventDefault();
    const nameInp = document.getElementById('reg-fullname')?.value.trim();
    const userInp = document.getElementById('reg-username')?.value.trim();
    const passInp = document.getElementById('reg-password')?.value;
    
    if (!nameInp || !userInp || !passInp) {
        showToast("Mohon lengkapi semua kolom pendaftaran!", "warning");
        return;
    }

    const users = getDB('users') || [];
    if (users.find(u => u.username.toLowerCase() === userInp.toLowerCase())) {
        showToast("Username sudah digunakan, silakan pilih yang lain!", "error");
        return;
    }

    const newUser = {
        username: userInp,
        name: nameInp,
        password: passInp,
        role: 'user'
    };

    users.push(newUser);
    saveDB('users', users);
    saveDB('currentUser', newUser);
    
    showToast("Pendaftaran berhasil! Mengalihkan ke toko...", "success");
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function logout() {
    const user = getCurrentUser();
    localStorage.removeItem('currentUser');
    showToast("Anda telah keluar dari akun.", "info");
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 600);
}

// Proteksi Halaman Khusus
function checkPageProtection() {
    const page = window.location.pathname.toLowerCase();
    const user = getCurrentUser();

    if (page.includes('admin.html')) {
        if (!user || user.role !== 'admin') {
            showToast("Akses terbatas! Silakan masuk sebagai Admin.", "error");
            setTimeout(() => { window.location.href = 'login.html'; }, 500);
        }
    }
}
checkPageProtection();

// Quick Demo Login Helper (untuk kemudahan dosen/tester)
function quickLogin(role) {
    if (role === 'admin') {
        saveDB('currentUser', { username: 'admin', name: 'Administrator Sobat Alam', password: '123', role: 'admin' });
        window.location.href = 'admin.html';
    } else {
        saveDB('currentUser', { username: 'user', name: 'Budi Petualang', password: '123', role: 'user' });
        window.location.href = 'index.html';
    }
}

// --- 4. RENDER KOMPONEN NAVBAR & GLOBAL HEADER ---
function setupNavbar() {
    const user = getCurrentUser();
    const navIcons = document.querySelector('.nav-actions');
    const navLinks = document.querySelector('.nav-links');

    // Menu Aktif Berdasarkan URL
    const currentPath = window.location.pathname;
    if (navLinks) {
        const links = navLinks.querySelectorAll('a');
        links.forEach(l => {
            const href = l.getAttribute('href');
            if (href && currentPath.endsWith(href)) {
                l.classList.add('active');
            } else if (currentPath.endsWith('/') && href === 'index.html') {
                l.classList.add('active');
            }
        });
    }

    // Update Avatar Profil Pengguna di Navbar
    const userArea = document.getElementById('user-nav-slot');
    if (userArea) {
        if (user) {
            userArea.innerHTML = `
                <div class="user-profile-menu">
                    <button class="user-badge-btn" onclick="toggleUserDropdown(event)">
                        <div class="user-avatar">${user.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
                        <span>${user.name ? user.name.split(' ')[0] : user.username}</span>
                        <i class="fas fa-chevron-down" style="font-size: 0.7rem;"></i>
                    </button>
                    <div class="user-dropdown" id="user-dropdown-menu">
                        <div class="user-dropdown-header">
                            <div class="name">${user.name || user.username}</div>
                            <span class="role-badge ${user.role}">${user.role === 'admin' ? 'Administrator' : 'Petualang'}</span>
                        </div>
                        <a href="orders.html"><i class="fas fa-box-open"></i> Riwayat Pesanan</a>
                        ${user.role === 'admin' ? '<a href="admin.html"><i class="fas fa-chart-line"></i> Dashboard Admin</a>' : ''}
                        <button class="logout-item" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Keluar</button>
                    </div>
                </div>
            `;
        } else {
            userArea.innerHTML = `
                <a href="login.html" class="btn btn-sm btn-outline-forest">
                    <i class="fas fa-sign-in-alt"></i> Masuk
                </a>
            `;
        }
    }

    updateCartCount();
}

function toggleUserDropdown(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('user-dropdown-menu');
    if (dropdown) dropdown.classList.toggle('show');
}

// Tutup dropdown saat klik sembarang di luar
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('user-dropdown-menu');
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    if (nav) nav.classList.toggle('active');
}

function updateCartCount() {
    const countBadge = document.getElementById('cart-count');
    if (!countBadge) return;
    const cart = getDB('cart') || [];
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    countBadge.textContent = totalQty;
    countBadge.style.display = totalQty > 0 ? 'flex' : 'none';
}

// --- 5. LOGIKA KATALOG PRODUK & FILTER DINAMIS ---
let currentCategoryFilter = 'all';
let currentTypeFilter = 'all';
let currentSearchQuery = '';
let currentSortBy = 'featured';

function initProductCatalog() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    currentCategoryFilter = grid.getAttribute('data-category') || 'all';

    // Hook search input
    const searchInp = document.getElementById('catalog-search');
    if (searchInp) {
        searchInp.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.toLowerCase().trim();
            renderFilteredProducts();
        });
    }

    // Hook sort dropdown
    const sortSelect = document.getElementById('catalog-sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSortBy = e.target.value;
            renderFilteredProducts();
        });
    }

    // Hook category pills
    const pills = document.querySelectorAll('.cat-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentTypeFilter = pill.getAttribute('data-type') || 'all';
            renderFilteredProducts();
        });
    });

    renderFilteredProducts();
}

function renderFilteredProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    let products = getDB('products') || [];

    // Filter Gender/Halaman (all, pria, wanita)
    if (currentCategoryFilter !== 'all') {
        products = products.filter(p => p.category === currentCategoryFilter || p.category === 'unisex');
    }

    // Filter Subkategori / Tipe Produk
    if (currentTypeFilter !== 'all') {
        products = products.filter(p => p.type === currentTypeFilter);
    }

    // Filter Pencarian
    if (currentSearchQuery) {
        products = products.filter(p => 
            p.name.toLowerCase().includes(currentSearchQuery) ||
            (p.description && p.description.toLowerCase().includes(currentSearchQuery)) ||
            (p.type && p.type.toLowerCase().includes(currentSearchQuery))
        );
    }

    // Pengurutan (Sorting)
    if (currentSortBy === 'price-low') {
        products.sort((a, b) => a.price - b.price);
    } else if (currentSortBy === 'price-high') {
        products.sort((a, b) => b.price - a.price);
    } else if (currentSortBy === 'rating') {
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (currentSortBy === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Update Counter Jumlah Produk Ditemukan
    const countEl = document.getElementById('product-result-count');
    if (countEl) {
        countEl.textContent = `${products.length} produk ditemukan`;
    }

    // Render Grid
    if (products.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-compass"></i>
                <h3>Produk tidak ditemukan</h3>
                <p>Coba gunakan kata kunci pencarian lain atau pilih kategori yang berbeda.</p>
                <button class="btn btn-sm btn-outline-forest" onclick="resetFilters()">Reset Filter</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = products.map(p => {
        const stockStatusClass = (p.stock && p.stock <= 5) ? 'low-stock' : 'in-stock';
        const stockStatusText = (p.stock && p.stock <= 5) ? `Sisa ${p.stock}` : 'Tersedia';

        return `
            <div class="product-card">
                <div class="product-image-wrap">
                    <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackImageUrl}';">
                    <span class="badge-tag">${p.type || p.category}</span>
                    <span class="stock-tag ${stockStatusClass}">${stockStatusText}</span>
                    <button class="quick-view-btn" onclick="openProductDetailModal(${p.id})">
                        <i class="fas fa-eye"></i> Lihat Detail
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-meta">
                        <span class="product-category-label">${p.category === 'pria' ? 'Pria' : (p.category === 'wanita' ? 'Wanita' : 'Outdoor')}</span>
                        <div class="product-rating">
                            <i class="fas fa-star"></i>
                            <span>${p.rating || 4.8} (${p.reviews || 25})</span>
                        </div>
                    </div>
                    <h3 title="${p.name}">${p.name}</h3>
                    <p class="product-desc-snippet">${p.description || 'Perlengkapan outdoor tangguh dan tahan lama.'}</p>
                    <div class="product-bottom">
                        <div class="product-price">${formatRupiah(p.price)}</div>
                        <div class="card-actions">
                            <button class="btn-cart" onclick="addToCart(${p.id})">
                                <i class="fas fa-shopping-cart"></i> + Keranjang
                            </button>
                            <button class="btn-detail" onclick="openProductDetailModal(${p.id})" title="Spesifikasi">
                                <i class="fas fa-info-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function resetFilters() {
    const searchInp = document.getElementById('catalog-search');
    if (searchInp) searchInp.value = '';
    currentSearchQuery = '';
    currentTypeFilter = 'all';
    const pills = document.querySelectorAll('.cat-pill');
    pills.forEach((p, idx) => p.classList.toggle('active', idx === 0));
    renderFilteredProducts();
}

// --- 6. MODAL DETAIL PRODUK ---
function openProductDetailModal(id) {
    const products = getDB('products') || [];
    const p = products.find(item => item.id === id);
    if (!p) return;

    let modal = document.getElementById('product-detail-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'product-detail-modal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }

    let specsHtml = '';
    if (p.specs && typeof p.specs === 'object') {
        specsHtml = `
            <table class="detail-specs-table">
                ${Object.entries(p.specs).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}
            </table>
        `;
    }

    modal.innerHTML = `
        <div class="modal-box">
            <button class="modal-close-btn" onclick="closeProductDetailModal()"><i class="fas fa-times"></i></button>
            <div class="product-detail-layout">
                <div class="detail-img-box">
                    <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null; this.src='${fallbackImageUrl}';">
                </div>
                <div class="detail-content">
                    <div class="detail-header">
                        <span class="badge-tag" style="position:static; margin-bottom:8px; display:inline-block;">${p.type || p.category}</span>
                        <h2>${p.name}</h2>
                        <div class="product-rating" style="margin-bottom:8px;">
                            <i class="fas fa-star"></i>
                            <span>${p.rating || 4.8} / 5.0 (${p.reviews || 30} Ulasan Pembeli)</span>
                        </div>
                        <div class="detail-price">${formatRupiah(p.price)}</div>
                    </div>
                    
                    <p class="detail-desc">${p.description}</p>
                    
                    ${specsHtml}

                    <div class="qty-picker">
                        <label>Jumlah Beli:</label>
                        <div class="qty-stepper">
                            <button onclick="changeModalQty(-1)">-</button>
                            <input type="text" id="modal-qty-input" value="1" readonly>
                            <button onclick="changeModalQty(1)">+</button>
                        </div>
                        <span style="font-size:0.82rem; color:var(--text-muted);">(Stok: ${p.stock || 15})</span>
                    </div>

                    <div style="display:flex; gap:12px; margin-top:auto;">
                        <button class="btn btn-primary btn-block" onclick="addToCartFromModal(${p.id})">
                            <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
                        </button>
                        <button class="btn btn-forest btn-block" onclick="buyNowFromModal(${p.id})">
                            Beli Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeProductDetailModal() {
    const modal = document.getElementById('product-detail-modal');
    if (modal) modal.classList.remove('active');
}

function changeModalQty(delta) {
    const inp = document.getElementById('modal-qty-input');
    if (!inp) return;
    let val = parseInt(inp.value) || 1;
    val += delta;
    if (val < 1) val = 1;
    inp.value = val;
}

function addToCartFromModal(id) {
    const inp = document.getElementById('modal-qty-input');
    const qty = inp ? parseInt(inp.value) || 1 : 1;
    addToCart(id, qty);
    closeProductDetailModal();
}

function buyNowFromModal(id) {
    const inp = document.getElementById('modal-qty-input');
    const qty = inp ? parseInt(inp.value) || 1 : 1;
    addToCart(id, qty);
    closeProductDetailModal();
    window.location.href = 'cart.html';
}

// --- 7. SISTEM KERANJANG BELANJA (CART) ---
function addToCart(id, qty = 1) {
    const products = getDB('products') || [];
    const cart = getDB('cart') || [];
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex > -1) {
        cart[existingIndex].qty += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            stock: product.stock,
            qty: qty
        });
    }

    saveDB('cart', cart);
    updateCartCount();
    showToast(`"${product.name}" dimasukkan ke keranjang!`, "success");
}

function updateCartQty(id, change) {
    let cart = getDB('cart') || [];
    const item = cart.find(c => c.id === id);
    if (!item) return;

    item.qty += change;
    if (item.qty <= 0) {
        cart = cart.filter(c => c.id !== id);
        showToast("Barang dihapus dari keranjang", "info");
    }

    saveDB('cart', cart);
    updateCartCount();
    renderCartPage();
}

function removeFromCart(id) {
    let cart = getDB('cart') || [];
    cart = cart.filter(c => c.id !== id);
    saveDB('cart', cart);
    updateCartCount();
    renderCartPage();
    showToast("Barang telah dihapus dari keranjang.", "info");
}

// Diskon & Kupon
let appliedDiscount = 0;
let appliedCouponCode = '';

function applyCoupon() {
    const codeInp = document.getElementById('coupon-input');
    if (!codeInp) return;
    const code = codeInp.value.trim().toUpperCase();

    const cart = getDB('cart') || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (code === 'SOBATALAM') {
        appliedDiscount = Math.round(subtotal * 0.1); // Diskon 10%
        appliedCouponCode = code;
        showToast("Kupon SOBATALAM diterapkan: Diskon 10%!", "success");
    } else if (code === 'CAMPINGHEMAT') {
        appliedDiscount = 50000;
        appliedCouponCode = code;
        showToast("Kupon CAMPINGHEMAT diterapkan: Diskon Rp 50.000!", "success");
    } else if (code === 'GRATISONGKIR') {
        appliedDiscount = 18000;
        appliedCouponCode = code;
        showToast("Kupon GRATISONGKIR diterapkan!", "success");
    } else {
        showToast("Kode voucher tidak valid atau sudah kedaluwarsa!", "error");
        appliedDiscount = 0;
        appliedCouponCode = '';
    }

    renderCartPage();
}

function removeCoupon() {
    appliedDiscount = 0;
    appliedCouponCode = '';
    showToast("Voucher diskon dibatalkan", "info");
    renderCartPage();
}

// Render Halaman Keranjang Belanja (cart.html)
function renderCartPage() {
    const cartContainer = document.getElementById('cart-list');
    if (!cartContainer) return;

    const cart = getDB('cart') || [];
    const user = getCurrentUser();

    // Auto-fill nama pembeli jika sudah login
    const nameField = document.getElementById('checkout-name');
    if (nameField && user && !nameField.value) {
        nameField.value = user.name || user.username;
    }

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-state" style="background:#fff; border-radius:var(--radius-md); border:1px solid var(--border-color);">
                <i class="fas fa-shopping-bag"></i>
                <h3>Keranjang Anda masih kosong</h3>
                <p>Jelajahi koleksi perlengkapan camping dan trekking kami untuk memulai petualangan!</p>
                <a href="index.html" class="btn btn-primary">
                    <i class="fas fa-compass"></i> Mulai Belanja Sekarang
                </a>
            </div>
        `;

        document.getElementById('cart-subtotal').textContent = 'Rp 0';
        document.getElementById('cart-discount').textContent = '- Rp 0';
        document.getElementById('cart-shipping').textContent = 'Rp 0';
        document.getElementById('cart-total').textContent = 'Rp 0';
        return;
    }

    let subtotal = 0;
    cartContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        return `
            <div class="cart-item-row">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null; this.src='${fallbackImageUrl}';">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="item-price">${formatRupiah(item.price)}</span>
                </div>
                <div class="cart-item-qty">
                    <div class="qty-stepper">
                        <button onclick="updateCartQty(${item.id}, -1)">-</button>
                        <input type="text" value="${item.qty}" readonly>
                        <button onclick="updateCartQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-subtotal">
                    ${formatRupiah(itemTotal)}
                </div>
                <button class="btn-remove-item" onclick="removeFromCart(${item.id})" title="Hapus Barang">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    }).join('');

    // Hitung Biaya Pengiriman
    const courierSelect = document.getElementById('checkout-courier');
    let shippingCost = 18000;
    if (courierSelect) {
        shippingCost = parseInt(courierSelect.value) || 18000;
    }

    // Hitung Total Akhir
    const total = Math.max(0, subtotal - appliedDiscount + shippingCost);

    document.getElementById('cart-subtotal').textContent = formatRupiah(subtotal);
    document.getElementById('cart-discount').textContent = `- ${formatRupiah(appliedDiscount)}`;
    document.getElementById('cart-shipping').textContent = formatRupiah(shippingCost);
    document.getElementById('cart-total').textContent = formatRupiah(total);

    // Tampilan Status Kupon
    const couponStatusEl = document.getElementById('coupon-status-box');
    if (couponStatusEl) {
        if (appliedCouponCode) {
            couponStatusEl.innerHTML = `
                <div class="coupon-applied-alert">
                    <span><i class="fas fa-check-circle"></i> Kupon <b>${appliedCouponCode}</b> aktif!</span>
                    <button onclick="removeCoupon()" style="background:none; border:none; cursor:pointer; color:var(--danger); font-weight:bold;">&times;</button>
                </div>
            `;
        } else {
            couponStatusEl.innerHTML = '';
        }
    }
}

// Proses Transaksi Checkout
function checkout(e) {
    if (e) e.preventDefault();

    const cart = getDB('cart') || [];
    if (cart.length === 0) {
        showToast("Keranjang belanja Anda masih kosong!", "warning");
        return;
    }

    const nameInp = document.getElementById('checkout-name')?.value.trim();
    const phoneInp = document.getElementById('checkout-phone')?.value.trim();
    const addressInp = document.getElementById('checkout-address')?.value.trim();
    const courierSelect = document.getElementById('checkout-courier');
    const paymentSelect = document.getElementById('checkout-payment');

    if (!nameInp || !phoneInp || !addressInp) {
        showToast("Harap isi Nama, Nomor Telepon, dan Alamat Pengiriman!", "warning");
        return;
    }

    const courierText = courierSelect?.options[courierSelect.selectedIndex].text || "JNE Reguler";
    const shippingCost = parseInt(courierSelect?.value) || 18000;
    const paymentText = paymentSelect?.options[paymentSelect.selectedIndex].text || "Transfer Bank";

    const user = getCurrentUser() || { username: 'tamu', name: nameInp, role: 'user' };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const total = Math.max(0, subtotal - appliedDiscount + shippingCost);

    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder = {
        id: "INV-" + Date.now().toString().slice(-8),
        user: user.username,
        customerName: nameInp,
        phone: phoneInp,
        address: addressInp,
        courier: courierText,
        paymentMethod: paymentText,
        items: [...cart],
        subtotal: subtotal,
        discount: appliedDiscount,
        shippingCost: shippingCost,
        total: total,
        status: "Diproses",
        date: dateFormatted
    };

    const orders = getDB('orders') || [];
    orders.unshift(newOrder);
    saveDB('orders', orders);

    // Kosongkan keranjang & kupon
    saveDB('cart', []);
    appliedDiscount = 0;
    appliedCouponCode = '';
    updateCartCount();

    // Munculkan Modal Invoice
    showInvoiceModal(newOrder);
}

// Modal Invoice / Bukti Pembelian Sukses (Untuk Pengguna di Halaman Checkout)
function showInvoiceModal(order) {
    let modal = document.getElementById('invoice-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'invoice-modal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-box" style="max-width: 600px;">
            <button class="modal-close-btn" onclick="closeModal('invoice-modal')" title="Tutup"><i class="fas fa-times"></i></button>
            <div class="invoice-card">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div class="invoice-badge-success">
                        <i class="fas fa-check-circle"></i> Pesanan Berhasil Dibuat!
                    </div>
                    <h2 style="color:var(--primary-brown); font-size: 1.5rem;">Terima Kasih atas Pesanan Anda</h2>
                    <p style="color:var(--text-muted); font-size: 0.88rem;">Invoice pesanan resmi dari Sobat Alam E-Commerce</p>
                </div>

                <div class="invoice-header">
                    <div>
                        <div class="invoice-meta">No. Invoice:</div>
                        <h3 style="font-size:1.15rem; color:var(--primary-forest);">${order.id}</h3>
                    </div>
                    <div style="text-align:right;">
                        <div class="invoice-meta">Waktu Pesan:</div>
                        <div style="font-weight:600; font-size:0.88rem;">${order.date}</div>
                    </div>
                </div>

                <div style="background:var(--bg-muted); padding:14px; border-radius:var(--radius-sm); margin-bottom:18px; font-size:0.85rem;">
                    <div><b>Penerima:</b> ${order.customerName} (${order.phone})</div>
                    <div><b>Alamat:</b> ${order.address}</div>
                    <div><b>Pengiriman:</b> ${order.courier}</div>
                    <div><b>Metode Pembayaran:</b> ${order.paymentMethod}</div>
                </div>

                <div class="invoice-items-list">
                    <h4 style="font-size:0.92rem; margin-bottom:8px; color:var(--text-secondary);">Rincian Barang:</h4>
                    ${order.items.map(it => `
                        <div class="invoice-item-row">
                            <span>${it.name} x ${it.qty}</span>
                            <span>${formatRupiah(it.price * it.qty)}</span>
                        </div>
                    `).join('')}
                    ${order.discount > 0 ? `
                        <div class="invoice-item-row" style="color:var(--earth-orange);">
                            <span>Diskon Voucher</span>
                            <span>- ${formatRupiah(order.discount)}</span>
                        </div>
                    ` : ''}
                    <div class="invoice-item-row">
                        <span>Ongkos Kirim</span>
                        <span>${formatRupiah(order.shippingCost)}</span>
                    </div>
                    <div class="invoice-item-row" style="font-weight:800; font-size:1.05rem; color:var(--primary-forest); border-top:2px solid var(--border-color); margin-top:8px; padding-top:8px;">
                        <span>Total Bayar</span>
                        <span>${formatRupiah(order.total)}</span>
                    </div>
                </div>

                <div style="display:flex; gap:12px; margin-top:24px;">
                    <a href="orders.html" class="btn btn-primary btn-block">
                        <i class="fas fa-receipt"></i> Lihat Riwayat Pesanan
                    </a>
                    <a href="index.html" class="btn btn-outline-forest btn-block">
                        Belanja Lagi
                    </a>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

// --- 8. RIWAYAT PESANAN PENGGUNA (orders.html) ---
let currentOrderTab = 'all';

function initOrdersPage() {
    const ordersContainer = document.getElementById('orders-container');
    if (!ordersContainer) return;

    const user = getCurrentUser();
    if (!user) {
        ordersContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-user-lock"></i>
                <h3>Silakan Masuk Terlebih Dahulu</h3>
                <p>Anda perlu masuk ke akun Anda untuk melihat riwayat pesanan dan status pengiriman.</p>
                <a href="login.html" class="btn btn-primary">Masuk ke Akun</a>
            </div>
        `;
        return;
    }

    renderOrdersList();
}

function filterOrdersByStatus(status, btn) {
    currentOrderTab = status;
    const buttons = document.querySelectorAll('.order-tab-btn');
    buttons.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderOrdersList();
}

function renderOrdersList() {
    const ordersContainer = document.getElementById('orders-container');
    if (!ordersContainer) return;

    const user = getCurrentUser();
    let orders = getDB('orders') || [];

    // Filter pesanan sesuai user (kecuali admin bisa lihat semua)
    if (user.role !== 'admin') {
        orders = orders.filter(o => o.user === user.username);
    }

    if (currentOrderTab !== 'all') {
        orders = orders.filter(o => o.status.toLowerCase() === currentOrderTab.toLowerCase());
    }

    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-state" style="background:#fff; border-radius:var(--radius-md); border:1px solid var(--border-color);">
                <i class="fas fa-box-open"></i>
                <h3>Belum ada transaksi ${currentOrderTab !== 'all' ? `berstatus ${currentOrderTab}` : ''}</h3>
                <p>Semua pesanan yang Anda selesaikan akan tercatat otomatis di sini.</p>
                <a href="index.html" class="btn btn-primary">Mulai Belanja</a>
            </div>
        `;
        return;
    }

    ordersContainer.innerHTML = orders.map(order => {
        let statusBadgeClass = 'diproses';
        if (order.status === 'Lunas' || order.status === 'Selesai') statusBadgeClass = 'selesai';
        else if (order.status === 'Dikirim') statusBadgeClass = 'dikirim';
        else if (order.status === 'Menunggu') statusBadgeClass = 'menunggu';
        else if (order.status === 'Dibatalkan') statusBadgeClass = 'dibatalkan';

        return `
            <div class="order-card">
                <div class="order-card-header">
                    <div class="order-header-info">
                        <i class="fas fa-receipt" style="color:var(--forest-accent);"></i>
                        <span class="inv-num">${order.id}</span>
                        <span style="color:var(--text-muted);">&bull;</span>
                        <span style="color:var(--text-muted); font-size:0.84rem;">${order.date}</span>
                    </div>
                    <span class="order-status-badge ${statusBadgeClass}">${order.status}</span>
                </div>
                <div class="order-card-body">
                    ${order.items.map(it => `
                        <div class="order-item-snippet">
                            <img src="${it.image}" alt="${it.name}" onerror="this.onerror=null; this.src='${fallbackImageUrl}';">
                            <div style="flex:1;">
                                <h4 style="font-size:0.95rem; margin-bottom:2px;">${it.name}</h4>
                                <span style="font-size:0.84rem; color:var(--text-muted);">${it.qty} barang x ${formatRupiah(it.price)}</span>
                            </div>
                            <div style="font-weight:700; color:var(--primary-forest);">
                                ${formatRupiah(it.price * it.qty)}
                            </div>
                        </div>
                    `).join('')}

                    <div class="order-card-footer">
                        <div style="font-size:0.85rem; color:var(--text-muted);">
                            <div><b>Pengiriman:</b> ${order.courier}</div>
                            <div><b>Penerima:</b> ${order.customerName} (${order.address})</div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-size:0.82rem; color:var(--text-muted);">Total Belanja:</div>
                            <div style="font-size:1.25rem; font-weight:800; color:var(--primary-forest);">
                                ${formatRupiah(order.total)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// --- 9. DASHBOARD ADMIN LENGKAP (admin.html) ---
let currentAdminTab = 'products';

function initAdminDashboard() {
    if (!document.getElementById('admin-stats')) return;
    renderAdminStats();
    renderAdminProductsList();
    renderAdminOrdersList();

    // Hook Form Tambah Produk
    const formAdd = document.getElementById('form-add-product');
    if (formAdd) {
        formAdd.addEventListener('submit', handleAdminAddProduct);
    }

    // Hook Form Edit Produk
    const formEdit = document.getElementById('form-edit-product');
    if (formEdit) {
        formEdit.addEventListener('submit', handleAdminEditProduct);
    }
}

function switchAdminTab(tabName) {
    currentAdminTab = tabName;
    const navItems = document.querySelectorAll('.admin-nav-item');
    navItems.forEach(n => {
        n.classList.toggle('active', n.getAttribute('data-tab') === tabName);
    });

    const secProducts = document.getElementById('admin-sec-products');
    const secOrders = document.getElementById('admin-sec-orders');
    const secSettings = document.getElementById('admin-sec-settings');

    if (secProducts) secProducts.style.display = tabName === 'products' ? 'block' : 'none';
    if (secOrders) secOrders.style.display = tabName === 'orders' ? 'block' : 'none';
    if (secSettings) secSettings.style.display = tabName === 'settings' ? 'block' : 'none';
}

function renderAdminStats() {
    const products = getDB('products') || [];
    const orders = getDB('orders') || [];
    const users = getDB('users') || [];

    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    const elProd = document.getElementById('stat-total-products');
    const elOrder = document.getElementById('stat-total-orders');
    const elRev = document.getElementById('stat-total-revenue');
    const elUser = document.getElementById('stat-total-users');

    if (elProd) elProd.textContent = products.length;
    if (elOrder) elOrder.textContent = orders.length;
    if (elRev) elRev.textContent = formatRupiah(totalRevenue);
    if (elUser) elUser.textContent = users.length;
}

function renderAdminProductsList() {
    const tbody = document.getElementById('admin-product-table-body');
    if (!tbody) return;

    const products = getDB('products') || [];
    const searchFilter = document.getElementById('admin-prod-search')?.value.toLowerCase().trim() || '';

    const filtered = products.filter(p => p.name.toLowerCase().includes(searchFilter) || p.category.includes(searchFilter));

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px;">Tidak ada data produk ditemukan.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(p => `
        <tr>
            <td style="font-weight:700; color:var(--text-muted);">#${p.id}</td>
            <td><img src="${p.image}" width="48" height="48" style="object-fit:cover; border-radius:6px;" onerror="this.onerror=null; this.src='${fallbackImageUrl}';"></td>
            <td>
                <div style="font-weight:700; color:var(--text-primary);">${p.name}</div>
                <div style="font-size:0.78rem; color:var(--forest-accent);">${p.type || 'alat'} &bull; ${p.category}</div>
            </td>
            <td style="font-weight:700; color:var(--primary-forest);">${formatRupiah(p.price)}</td>
            <td>
                <span class="stock-tag ${p.stock <= 5 ? 'low-stock' : 'in-stock'}">${p.stock || 0} unit</span>
            </td>
            <td><i class="fas fa-star" style="color:#eab308; font-size:0.8rem;"></i> ${p.rating || 4.8}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-action edit" onclick="openEditProductModal(${p.id})" title="Edit Produk">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-action delete" onclick="deleteProduct(${p.id})" title="Hapus Produk">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function handleAdminAddProduct(e) {
    e.preventDefault();
    const name = document.getElementById('prod-name').value.trim();
    const price = parseInt(document.getElementById('prod-price').value);
    const category = document.getElementById('prod-cat').value;
    const type = document.getElementById('prod-type').value;
    const stock = parseInt(document.getElementById('prod-stock').value) || 10;
    const image = document.getElementById('prod-img').value.trim();
    const desc = document.getElementById('prod-desc').value.trim();

    if (!name || isNaN(price)) {
        showToast("Nama dan harga produk wajib diisi!", "warning");
        return;
    }

    const products = getDB('products') || [];
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
        id: newId,
        name: name,
        price: price,
        category: category,
        type: type,
        stock: stock,
        rating: 5.0,
        reviews: 1,
        image: image || fallbackImageUrl,
        description: desc || "Perlengkapan outdoor tangguh dan berkualitas tinggi dari Sobat Alam.",
        specs: {
            "Kategori": category,
            "Tipe": type,
            "Garansi": "1 Bulan Resmi Sobat Alam"
        }
    };

    products.unshift(newProduct);
    saveDB('products', products);

    showToast(`Produk "${name}" berhasil ditambahkan!`, "success");
    closeModal('modal-add-product');
    document.getElementById('form-add-product').reset();
    renderAdminProductsList();
    renderAdminStats();
}

function openEditProductModal(id) {
    const products = getDB('products') || [];
    const p = products.find(item => item.id === id);
    if (!p) return;

    document.getElementById('edit-prod-id').value = p.id;
    document.getElementById('edit-prod-name').value = p.name;
    document.getElementById('edit-prod-price').value = p.price;
    document.getElementById('edit-prod-cat').value = p.category;
    document.getElementById('edit-prod-type').value = p.type || 'alat';
    document.getElementById('edit-prod-stock').value = p.stock || 10;
    document.getElementById('edit-prod-img').value = p.image;
    document.getElementById('edit-prod-desc').value = p.description || '';

    openModal('modal-edit-product');
}

function handleAdminEditProduct(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('edit-prod-id').value);
    const name = document.getElementById('edit-prod-name').value.trim();
    const price = parseInt(document.getElementById('edit-prod-price').value);
    const category = document.getElementById('edit-prod-cat').value;
    const type = document.getElementById('edit-prod-type').value;
    const stock = parseInt(document.getElementById('edit-prod-stock').value);
    const image = document.getElementById('edit-prod-img').value.trim();
    const desc = document.getElementById('edit-prod-desc').value.trim();

    let products = getDB('products') || [];
    const target = products.find(p => p.id === id);
    if (!target) return;

    target.name = name;
    target.price = price;
    target.category = category;
    target.type = type;
    target.stock = stock;
    target.image = image;
    target.description = desc;

    saveDB('products', products);
    showToast(`Produk "${name}" berhasil diperbarui!`, "success");
    closeModal('modal-edit-product');
    renderAdminProductsList();
}

function deleteProduct(id) {
    const products = getDB('products') || [];
    const p = products.find(item => item.id === id);
    if (!p) return;

    if (confirm(`Yakin ingin menghapus produk "${p.name}"?`)) {
        const updated = products.filter(item => item.id !== id);
        saveDB('products', updated);
        showToast("Produk berhasil dihapus.", "info");
        renderAdminProductsList();
        renderAdminStats();
    }
}

// Render Order List di Admin
function renderAdminOrdersList() {
    const tbody = document.getElementById('admin-orders-table-body');
    if (!tbody) return;

    const orders = getDB('orders') || [];
    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px;">Belum ada riwayat pesanan.</td></tr>`;
        return;
    }

    tbody.innerHTML = orders.map(o => `
        <tr>
            <td style="font-weight:700; color:var(--primary-forest);">${o.id}</td>
            <td>
                <div style="font-weight:600;">${o.customerName}</div>
                <div style="font-size:0.78rem; color:var(--text-muted);">${o.phone}</div>
            </td>
            <td>
                <div style="font-size:0.85rem;">${o.items.map(i => `${i.name} (x${i.qty})`).join(', ')}</div>
            </td>
            <td style="font-weight:700; color:var(--primary-forest);">${formatRupiah(o.total)}</td>
            <td>
                <select onchange="updateOrderStatus('${o.id}', this.value)" style="padding:6px 10px; border-radius:4px; font-weight:700; font-size:0.8rem; border:1px solid var(--border-color);">
                    <option value="Menunggu" ${o.status === 'Menunggu' ? 'selected' : ''}>Menunggu</option>
                    <option value="Diproses" ${o.status === 'Diproses' ? 'selected' : ''}>Diproses</option>
                    <option value="Dikirim" ${o.status === 'Dikirim' ? 'selected' : ''}>Dikirim</option>
                    <option value="Selesai" ${o.status === 'Selesai' || o.status === 'Lunas' ? 'selected' : ''}>Selesai</option>
                    <option value="Dibatalkan" ${o.status === 'Dibatalkan' ? 'selected' : ''}>Dibatalkan</option>
                </select>
            </td>
            <td>
                <button class="btn-action edit" onclick="viewAdminOrderDetail('${o.id}')">
                    <i class="fas fa-eye"></i> Detail
                </button>
            </td>
        </tr>
    `).join('');
}

function updateOrderStatus(orderId, newStatus) {
    let orders = getDB('orders') || [];
    const target = orders.find(o => o.id === orderId);
    if (target) {
        target.status = newStatus;
        saveDB('orders', orders);
        showToast(`Status ${orderId} diubah ke ${newStatus}`, "success");
    }
}

// Modal Detail Pesanan Khusus Panel Admin (Admin TIDAK akan dialihkan ke toko)
function viewAdminOrderDetail(orderId) {
    const orders = getDB('orders') || [];
    const order = orders.find(item => item.id === orderId);
    if (!order) return;

    let modal = document.getElementById('admin-order-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'admin-order-modal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-box" style="max-width: 680px;">
            <button class="modal-close-btn" onclick="closeAdminOrderModal()" title="Tutup Modal"><i class="fas fa-times"></i></button>
            <div style="padding: 26px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; border-bottom: 2px solid var(--border-color); padding-bottom: 14px; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <span class="badge-tag" style="position:static; display:inline-block; margin-bottom:6px; background:var(--primary-brown);">
                            Pesanan Masuk
                        </span>
                        <h2 style="font-size: 1.35rem; color: var(--primary-brown); margin: 0;">${order.id}</h2>
                        <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">
                            <i class="fas fa-clock"></i> Tanggal Transaksi: ${order.date}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <label style="display:block; font-size: 0.78rem; font-weight: 700; color: var(--text-muted); margin-bottom: 4px;">Ubah Status Pesanan:</label>
                        <select onchange="updateOrderStatusFromModal('${order.id}', this.value)" style="padding: 6px 12px; border-radius: 6px; font-weight: 700; font-size: 0.85rem; border: 1px solid var(--border-color); background: #fff; cursor: pointer;">
                            <option value="Menunggu" ${order.status === 'Menunggu' ? 'selected' : ''}>Menunggu</option>
                            <option value="Diproses" ${order.status === 'Diproses' ? 'selected' : ''}>Diproses</option>
                            <option value="Dikirim" ${order.status === 'Dikirim' ? 'selected' : ''}>Dikirim</option>
                            <option value="Selesai" ${order.status === 'Selesai' || order.status === 'Lunas' ? 'selected' : ''}>Selesai</option>
                            <option value="Dibatalkan" ${order.status === 'Dibatalkan' ? 'selected' : ''}>Dibatalkan</option>
                        </select>
                    </div>
                </div>

                <!-- Informasi Pembeli & Ekspedisi -->
                <div style="background: var(--bg-muted); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px; font-size: 0.88rem; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; border: 1px solid var(--border-color);">
                    <div>
                        <div style="color: var(--text-muted); font-size: 0.78rem; font-weight: 700;">DATA PEMBELI:</div>
                        <div style="font-weight: 700; color: var(--text-primary); margin-top: 2px;">${order.customerName}</div>
                        <div style="color: var(--text-secondary);"><i class="fas fa-user-circle"></i> Akun: ${order.user}</div>
                        <div style="color: var(--text-secondary);"><i class="fas fa-phone"></i> ${order.phone}</div>
                    </div>
                    <div>
                        <div style="color: var(--text-muted); font-size: 0.78rem; font-weight: 700;">PENGIRIMAN & PEMBAYARAN:</div>
                        <div style="color: var(--text-secondary); margin-top: 2px;"><i class="fas fa-truck-fast"></i> ${order.courier}</div>
                        <div style="color: var(--text-secondary);"><i class="fas fa-credit-card"></i> ${order.paymentMethod}</div>
                        <div style="color: var(--text-secondary); font-size: 0.82rem; margin-top: 2px;"><i class="fas fa-map-marker-alt"></i> ${order.address}</div>
                    </div>
                </div>

                <!-- Daftar Barang yang Dipesan -->
                <div style="margin-bottom: 20px;">
                    <h4 style="font-size: 0.95rem; color: var(--primary-brown); margin-bottom: 10px; font-weight: 700;">
                        <i class="fas fa-box-open"></i> Rincian Barang yang Dipesan:
                    </h4>
                    <div style="border: 1px solid var(--border-color); border-radius: var(--radius-sm); overflow: hidden;">
                        ${order.items.map(it => `
                            <div style="display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-bottom: 1px solid var(--border-light); background: #fff;">
                                <img src="${it.image}" alt="${it.name}" width="50" height="50" style="object-fit:cover; border-radius:4px;" onerror="this.onerror=null; this.src='${fallbackImageUrl}';">
                                <div style="flex: 1;">
                                    <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">${it.name}</div>
                                    <div style="font-size: 0.8rem; color: var(--text-muted);">${formatRupiah(it.price)} x ${it.qty} unit</div>
                                </div>
                                <div style="font-weight: 700; color: var(--primary-brown); font-size: 0.95rem;">
                                    ${formatRupiah(it.price * it.qty)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Rincian Biaya -->
                <div style="background: #faf8f5; border-radius: var(--radius-sm); padding: 14px; border: 1px solid var(--border-color); margin-bottom: 22px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.88rem; color:var(--text-secondary);">
                        <span>Subtotal Produk:</span>
                        <span>${formatRupiah(order.subtotal || order.total)}</span>
                    </div>
                    ${order.discount ? `
                        <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.88rem; color:var(--earth-orange);">
                            <span>Diskon Voucher:</span>
                            <span>- ${formatRupiah(order.discount)}</span>
                        </div>
                    ` : ''}
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.88rem; color:var(--text-secondary);">
                        <span>Biaya Ongkos Kirim:</span>
                        <span>${formatRupiah(order.shippingCost || 0)}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.15rem; color:var(--primary-brown); border-top:2px dashed var(--border-color); padding-top:8px; margin-top:6px;">
                        <span>Total Pembayaran:</span>
                        <span>${formatRupiah(order.total)}</span>
                    </div>
                </div>

                <!-- Tombol Aksi: TUTUP & CETAK (Admin tetap berada di admin panel) -->
                <div style="display: flex; justify-content: flex-end; gap: 12px;">
                    <button type="button" class="btn btn-outline-brown" onclick="closeAdminOrderModal()">
                        <i class="fas fa-times"></i> Tutup
                    </button>
                    <button type="button" class="btn btn-primary" onclick="window.print()">
                        <i class="fas fa-print"></i> Cetak Invoice
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeAdminOrderModal() {
    const modal = document.getElementById('admin-order-modal');
    if (modal) modal.classList.remove('active');
}

function updateOrderStatusFromModal(orderId, newStatus) {
    updateOrderStatus(orderId, newStatus);
    renderAdminOrdersList();
}

// Reset Database ke Awal (Admin Tool)
function resetDatabaseToDefault() {
    if (confirm("Perhatian! Ini akan mengembalikan data produk dan menghapus riwayat pesanan ke awal. Lanjutkan?")) {
        saveDB('products', defaultProducts);
        saveDB('orders', defaultOrders);
        saveDB('cart', []);
        showToast("Database berhasil di-reset ke kondisi awal!", "success");
        setTimeout(() => window.location.reload(), 1000);
    }
}

// Modal Helpers
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

// --- 10. ONLOAD EVENT LISTENER UNIVERSAL ---
window.addEventListener('DOMContentLoaded', () => {
    setupNavbar();

    // Halaman Beranda / Katalog
    if (document.getElementById('product-grid')) {
        initProductCatalog();
    }

    // Halaman Keranjang Belanja
    if (document.getElementById('cart-list')) {
        renderCartPage();
    }

    // Halaman Riwayat Pesanan
    if (document.getElementById('orders-container')) {
        initOrdersPage();
    }

    // Halaman Admin
    if (document.getElementById('admin-stats')) {
        initAdminDashboard();
    }

    // Halaman Login & Register
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', login);

    const regForm = document.getElementById('register-form');
    if (regForm) regForm.addEventListener('submit', register);
});