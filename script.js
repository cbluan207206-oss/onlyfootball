// DỮ LIỆU SẢN PHẨM KHỞI TẠO (GIẢ LẬP DATABASE REALTIME)
let productsData = [
    {
        id: "p1",
        name: "Váy Dạ Hội Bordeaux Silk Tailor",
        price: 4500000,
        oldPrice: 6000000,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=500",
        color: "Đỏ Rượu",
        sizes: ["S", "M", "L"],
        isNew: true,
        isFeatured: true,
        desc: "Thiết kế đo ni đóng giày tôn dáng tuyệt đối, vải lụa tơ tằm thượng hạng bồng bềnh quý phái.",
        specs: "Chất liệu: 100% Silk tự nhiên. Xuất xứ: Việt Nam thủ công."
    },
    {
        id: "p2",
        name: "Suit Quý Ông Midnight Charcoal Slim",
        price: 8200000,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=500",
        color: "Đen Huyền",
        sizes: ["M", "L", "XL"],
        isNew: false,
        isFeatured: true,
        desc: "Đường cắt may sắc sảo chuẩn phom Âu, màu đen tuyền nam tính huyền bí cuốn hút mọi ánh nhìn.",
        specs: "Chất liệu: Premium Wool 140s. Lót lụa lụa mịn chống nhăn."
    },
    {
        id: "p3",
        name: "Đầm Cúp Ngực Imperial Gold Leaf",
        price: 5900000,
        oldPrice: 7500000,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500",
        color: "Vàng Đồng",
        sizes: ["S", "M"],
        isNew: true,
        isFeatured: false,
        desc: "Họa tiết thêu tay chỉ vàng đồng vương giả độc bản, dành riêng cho những đại tiệc sang trọng bậc nhất.",
        specs: "Chất liệu: Gấm thêu chỉ vàng. Phom dựng corset định hình."
    }
];

// STATE QUẢN LÝ ỨNG DỤNG (CART / ROUTING)
let cart = [];
let appliedDiscount = 0; // Tỷ lệ giảm giá (%)

// KHỞI CHẠY HỆ THỐNG WIDGETS
document.addEventListener("DOMContentLoaded", () => {
    // 13. Tắt Màn Hình Chờ (Loading Animation) sau 1.2s giả lập tải trang thần tốc CDN
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 1200);

    // Kích hoạt Render Sản Phẩm
    renderHomeProducts();
    renderShopProducts(productsData);

    // Xử lý Sự Kiện Menu Mobile
    document.getElementById('menu-open-btn').addEventListener('click', () => document.getElementById('mobile-menu').classList.add('open'));
    document.getElementById('menu-close-btn').addEventListener('click', () => document.getElementById('mobile-menu').classList.remove('open'));

    // 13. Dark Mode Chuyển Đổi Nhanh Chóng
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        darkModeBtn.innerHTML = isLight ? `<i class="fa-solid fa-sun"></i>` : `<i class="fa-solid fa-moon"></i>`;
    });
});

// THAY ĐỔI TRANG THEO CƠ CHẾ SINGLE PAGE APPLICATION (SPA)
function switchPage(pageId) {
    // Ẩn toàn bộ các section
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => sec.classList.remove('active-page'));

    // Hiển thị section chỉ định
    const targetSection = document.getElementById(`page-${pageId}`);
    if (targetSection) {
        targetSection.classList.add('active-page');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Cập nhật trạng thái Active trên Desktop Menu Nav
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Đóng Mobile Menu phòng trường hợp đang mở
    document.getElementById('mobile-menu').classList.remove('open');
}

// 13. CHỨC NĂNG THÔNG BÁO POPUP (TOAST NOTIFICATION)
function showToast(message) {
    const toast = document.getElementById('notification');
    document.getElementById('notification-msg').innerText = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// RENDER SẢN PHẨM TRANG CHỦ
function renderHomeProducts() {
    const container = document.getElementById('home-products-container');
    if (!container) return;
    container.innerHTML = '';

    // Lấy các sản phẩm nổi bật hoặc mới
    productsData.forEach(p => {
        container.innerHTML += generateProductCardHTML(p);
    });
}

// RENDER SẢN PHẨM TRANG CỬA HÀNG (CÓ BỘ LỌC)
function renderShopProducts(dataList) {
    const container = document.getElementById('shop-products-container');
    if (!container) return;
    if (dataList.length === 0) {
        container.innerHTML = `<p class="text-center w-100 gold-text" style="grid-column: 1/-1;">Không tìm thấy kiệt tác nào phù hợp tiêu chí.</p>`;
        return;
    }
    container.innerHTML = '';
    dataList.forEach(p => {
        container.innerHTML += generateProductCardHTML(p);
    });
}

// KHUÔN MẪU CARD SẢN PHẨM SANG TRỌNG
function generateProductCardHTML(p) {
    const saleBadge = p.oldPrice ? `<div class="badge-sale">ƯU ĐÃI</div>` : '';
    const originalPriceHTML = p.oldPrice ? `<span class="old-price">${p.oldPrice.toLocaleString()}đ</span>` : '';
    
    return `
        <div class="product-card">
            <div class="p-img-wrapper" onclick="viewProductDetail('${p.id}')" style="cursor:pointer;">
                ${saleBadge}
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <div class="p-info">
                <h4 class="p-name" onclick="viewProductDetail('${p.id}')" style="cursor:pointer;">${p.name}</h4>
                <div class="price-box">
                    ${originalPriceHTML}
                    <span class="current-price">${p.price.toLocaleString()}đ</span>
                </div>
                <button class="p-card-btn" onclick="viewProductDetail('${p.id}')">CHI TIẾT KIỆT TÁC</button>
            </div>
        </div>
    `;
}

// 11. BỘ LỌC TÌM KIẾM CHUYÊN NGHIỆP
function applyFilters() {
    let keyword = document.getElementById('adv-search-input').value.toLowerCase();
    let priceRange = document.getElementById('filter-price').value;
    let sizeSelected = document.getElementById('filter-size').value;
    let colorSelected = document.getElementById('filter-color').value;

    let filtered = productsData.filter(p => {
        // Lọc theo từ khóa
        let matchesKey = p.name.toLowerCase().includes(keyword) || p.desc.toLowerCase().includes(keyword);
        
        // Lọc theo màu sắc
        let matchesColor = (colorSelected === 'all' || p.color === colorSelected);
        
        // Lọc theo kích thước
        let matchesSize = (sizeSelected === 'all' || p.sizes.includes(sizeSelected));

        // Lọc theo giá tiền
        let matchesPrice = true;
        if (priceRange !== 'all') {
            let [min, max] = priceRange.split('-').map(Number);
            matchesPrice = (p.price >= min && p.price <= max);
        }

        return matchesKey && matchesColor && matchesSize && matchesPrice;
    });

    renderShopProducts(filtered);
}

// 11. TÌM KIẾM NHANH Ở TRANG SEARCH TẬP TRUNG
function executeQuickSearch() {
    let val = document.getElementById('quick-search-input').value.toLowerCase();
    let resContainer = document.getElementById('quick-search-results');
    if(!val) { resContainer.innerHTML = ''; return; }
    
    let filtered = productsData.filter(p => p.name.toLowerCase().includes(val) || p.color.toLowerCase().includes(val));
    resContainer.innerHTML = '';
    filtered.forEach(p => {
        resContainer.innerHTML += generateProductCardHTML(p);
    });
}

// 4. TRANG CHI TIẾT SẢN PHẨM ĐỘNG (XEM SẢN PHẨM)
let activeSelectedSize = '';
function viewProductDetail(productId) {
    const p = productsData.find(item => item.id === productId);
    if (!p) return;

    activeSelectedSize = p.sizes[0]; // Mặc định chọn size đầu tiên
    const container = document.getElementById('product-detail-container');
    
    const originalPriceHTML = p.oldPrice ? `<span class="old-price" style="text-decoration:line-through; opacity:0.5;">${p.oldPrice.toLocaleString()}đ</span>` : '';

    let sizeButtonsHTML = p.sizes.map((s, idx) => `
        <button class="size-btn ${idx === 0 ? 'active' : ''}" onclick="selectDetailSize(this, '${s}')">${s}</button>
    `).join('');

    container.innerHTML = `
        <div class="detail-layout">
            <div class="detail-gallery">
                <div class="main-img-zoom-box" id="zoom-box">
                    <img src="${p.image}" id="main-detail-img" alt="${p.name}">
                </div>
                <div class="thumb-gallery">
                    <img src="${p.image}" class="thumb-img active" onclick="changeDetailThumb(this, '${p.image}')">
                    <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500" class="thumb-img" onclick="changeDetailThumb(this, 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500')">
                </div>
            </div>
            <div class="detail-meta">
                <p class="gold-text" style="letter-spacing:2px;">BỘ SƯU TẬP HOÀNG GIA / MÀU: ${p.color}</p>
                <h1>${p.name}</h1>
                <div class="detail-prices">
                    ${originalPriceHTML}
                    <span class="gold-text font-weight-bold">${p.price.toLocaleString()}đ</span>
                </div>
                
                <hr class="gold-hr">
                
                <div class="selector-row">
                    <span>Chọn Kích Cỡ:</span>
                    <div style="display:flex; gap:10px;">${sizeButtonsHTML}</div>
                </div>

                <div class="selector-row">
                    <span>Số Lượng:</span>
                    <div class="qty-counter">
                        <button onclick="alterDetailQty(-1)">-</button>
                        <input type="number" id="detail-qty-input" value="1" min="1" readonly>
                        <button onclick="alterDetailQty(1)">+</button>
                    </div>
                </div>

                <div class="detail-actions-btn-group">
                    <button class="btn-luxury" style="flex:1;" onclick="addSelectedToCart('${p.id}')">THÊM VÀO GIỎ HÀNG</button>
                    <button class="btn-gold" style="flex:1;" onclick="addSelectedToCart('${p.id}', true)">MUA NGAY</button>
                </div>

                <div class="tabs-descriptions mt-4">
                    <h3>Mô Tả Sản Phẩm</h3>
                    <p style="margin:10px 0; line-height:1.6; color:#ccc;">${p.desc}</p>
                    <h3>Thông Số Kỹ Thuật</h3>
                    <p style="font-size:0.9rem; color:var(--gold-color); font-style:italic;">${p.specs}</p>
                    <h3 class="mt-2">Chính Sách Đổi Trả Xa Xỉ</h3>
                    <p style="font-size:0.85rem; opacity:0.7;">Đổi trả vô điều kiện tại nhà trong vòng 7 ngày nếu không ưng ý.</p>
                </div>
            </div>
        </div>
    `;

    switchPage('product-detail');
}

// ĐIỀU PHỐI GALLERY CHI TIẾT
function changeDetailThumb(element, imgUrl) {
    document.getElementById('main-detail-img').src = imgUrl;
    document.querySelectorAll('.thumb-img').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
}

function selectDetailSize(btn, size) {
    document.querySelectorAll('.size-btn').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    activeSelectedSize = size;
}

function alterDetailQty(amount) {
    const input = document.getElementById('detail-qty-input');
    let current = parseInt(input.value) + amount;
    if (current < 1) current = 1;
    input.value = current;
}

// 5. NGHIỆP VỤ GIỎ HÀNG THƯƠNG MẠI
function addSelectedToCart(productId, isBuyNow = false) {
    const p = productsData.find(item => item.id === productId);
    const qty = parseInt(document.getElementById('detail-qty-input').value);
    
    // Tìm xem sản phẩm cùng size đã có trong giỏ chưa
    let existingItem = cart.find(item => item.id === productId && item.size === activeSelectedSize);
    if(existingItem) {
        existingItem.qty += qty;
    } else {
        cart.push({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image,
            size: activeSelectedSize,
            qty: qty
        });
    }

    updateCartBadge();
    renderCartPage();
    showToast(`Đã thêm ${qty} sản phẩm vào giỏ hàng thành công!`);

    if(isBuyNow) {
        switchPage('cart');
    }
}

function updateCartBadge() {
    let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count-badge').innerText = totalItems;
}

function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    if(!container) return;

    if(cart.length === 0) {
        container.innerHTML = `<p class="gold-text">Giỏ hàng của quý khách đang trống.</p>`;
        calculateCartTotals();
        return;
    }

    container.innerHTML = '';
    cart.forEach((item, index) => {
        container.innerHTML += `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <img src="${item.image}" alt="">
                    <div>
                        <h4>${item.name}</h4>
                        <p style="font-size:0.85rem; opacity:0.6;">Kích cỡ: ${item.size}</p>
                        <p class="gold-text">${item.price.toLocaleString()}đ</p>
                    </div>
                </div>
                <div>
                    <span style="margin-right:20px; font-weight:600;">SL: ${item.qty}</span>
                    <button onclick="removeCartItem(${index})" style="background:none; border:none; color:var(--wine-color); cursor:pointer;"><i class="fa-solid fa-trash-can"></i> Xóa</button>
                </div>
            </div>
        `;
    });

    calculateCartTotals();
}

function removeCartItem(index) {
    cart.splice(index, 1);
    updateCartBadge();
    renderCartPage();
}

function applyCoupon() {
    const code = document.getElementById('coupon-code').value.trim().toUpperCase();
    if (code === 'LUXE10') {
        appliedDiscount = 10;
        showToast("Áp dụng mã LUXE10 thành công! Quý khách được giảm 10% tổng đơn.");
    } else {
        showToast("Mã giảm giá không hợp lệ hoặc đã hết hạn thượng lưu.");
        appliedDiscount = 0;
    }
    calculateCartTotals();
}

function calculateCartTotals() {
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let discountAmount = subtotal * (appliedDiscount / 100);
    let total = subtotal - discountAmount;

    document.getElementById('cart-subtotal').innerText = subtotal.toLocaleString() + 'đ';
    document.getElementById('cart-total').innerText = total.toLocaleString() + 'đ';
}

// 6. XỬ LÝ ĐẶT HÀNG TRANG CHECKOUT
function processOrder(e) {
    e.preventDefault();
    if(cart.length === 0) {
        alert("Giỏ hàng chưa có sản phẩm. Vui lòng chọn sản phẩm thượng hạng trước khi thanh toán.");
        return;
    }
    
    showToast("Hệ thống đang mã hóa giao dịch an toàn...");
    setTimeout(() => {
        alert("XÁC NHẬN: Đơn hàng của bạn đã được ghi nhận trên hệ thống bảo mật cao Luxe Vintage. Trợ lý cuộc gọi VIP sẽ liên hệ bạn ngay lập tức.");
        cart = [];
        appliedDiscount = 0;
        updateCartBadge();
        switchPage('home');
    }, 1500);
}

// 7. TÀI KHOẢN NGƯỜI DÙNG TABS CONTROLLER
function toggleAuthTab(type) {
    document.querySelectorAll('.auth-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-view').forEach(view => view.classList.remove('active'));
    
    if(type === 'login') {
        event.target.classList.add('active');
        document.getElementById('auth-login-view').classList.add('active');
    } else {
        event.target.classList.add('active');
        document.getElementById('auth-register-view').classList.add('active');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const accountBox = document.getElementById('account-box');
    // Đăng nhập giả lập thành công, hiển thị trang Lịch sử đơn hàng, Wishlist
    accountBox.innerHTML = `
        <div class="w-100">
            <h2 class="gold-text">CHÀO MỪNG QUÝ TỘC TRỞ LẠI</h2>
            <p>Hạng thành viên: <strong>VIP DIAMOND</strong></p>
            <hr class="gold-hr">
            <h3><i class="fa-solid fa-clock-rotate-left"></i> LỊCH SỬ ĐƠN HÀNG MUA SẮM</h3>
            <table style="width:100%; border:1px solid var(--border-color); border-collapse:collapse; margin-top:15px; font-size:0.9rem;">
                <tr style="background:#111; color:var(--gold-color);">
                    <th style="padding:10px;">Mã Đơn</th>
                    <th>Ngày Mua</th>
                    <th>Sản Phẩm</th>
                    <th>Tổng Tiền</th>
                    <th>Trạng Thái</th>
                </tr>
                <tr style="border-top:1px solid var(--border-color); text-align:center;">
                    <td style="padding:12px;">#LX-9941</td>
                    <td>04/06/2026</td>
                    <td>Váy Dạ Hội Bordeaux</td>
                    <td>4.500.000đ</td>
                    <td style="color:green;">Đang giao hỏa tốc</td>
                </tr>
            </table>
        </div>
    `;
    showToast("Chào mừng quý hội viên VIP đăng nhập thành công!");
}

// 13. LIVE CHAT TRỰC TIẾP WIDGET LOGIC
let isChatOpen = false;
function toggleChatWindow() {
    const body = document.getElementById('chat-body');
    const footer = document.getElementById('chat-footer');
    const icon = document.getElementById('chat-icon-dir');
    
    isChatOpen = !isChatOpen;
    if(isChatOpen) {
        body.classList.add('open');
        footer.style.display = 'flex';
        icon.className = 'fa-solid fa-chevron-down';
    } else {
        body.classList.remove('open');
        footer.style.display = 'none';
        icon.className = 'fa-solid fa-chevron-up';
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if(!text) return;

    const body = document.getElementById('chat-body');
    // Thêm tin nhắn user
    body.innerHTML += `<div class="chat-msg user-msg">${text}</div>`;
    input.value = '';
    body.scrollTop = body.scrollHeight;

    // Giả lập trợ lý VIP trả lời sau 1 giây
    setTimeout(() => {
        body.innerHTML += `<div class="chat-msg system-msg">Yêu cầu của Quý khách đã chuyển tới chuyên viên tư vấn size phục trang. Xin vui lòng đợi trong giây lát.</div>`;
        body.scrollTop = body.scrollHeight;
    }, 1000);
}

// 14. TRANG QUẢN TRỊ ADMIN - THÊM SẢN PHẨM MỚI (REALTIME VÀO GIAO DIỆN)
function adminAddProduct(e) {
    e.preventDefault();
    const name = document.getElementById('admin-p-name').value;
    const price = Number(document.getElementById('admin-p-price').value);
    const img = document.getElementById('admin-p-img').value;
    const color = document.getElementById('admin-p-color').value;

    const newProduct = {
        id: "p_add_" + Date.now(),
        name: name,
        price: price,
        oldPrice: null,
        image: img || "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=500", // Fallback ảnh mặc định
        color: color,
        sizes: ["S", "M", "L"],
        isNew: true,
        isFeatured: true,
        desc: "Sản phẩm thiết kế độc quyền mới cập nhật trên bảng Admin.",
        specs: "Bảo hành chính hãng."
    };

    // Đẩy vào mảng gốc toàn cục
    productsData.unshift(newProduct);
    
    // Đồng bộ lại các màn hình hiển thị ngay lập tức
    renderHomeProducts();
    renderShopProducts(productsData);

    showToast("Đã kích hoạt và niêm yết sản phẩm mới thành công!");
    document.getElementById('admin-add-product-form').reset();
}