   // داده‌های نمونه برای پیشنهادات
        const suggestions = [
            {
                id: 101,
                name: "چسب سنگ",
                category: "ملزومات نصب",
                price: 85000,
                color: "#8B4513"
            },
            {
                id: 102,
                name: "رزین سنگ",
                category: "مواد ترمیم",
                price: 120000,
                color: "#FFD700"
            },
            {
                id: 103,
                name: "واترپروف سنگ",
                category: "محافظ",
                price: 95000,
                color: "#1E90FF"
            },
            {
                id: 104,
                name: "پولیش سنگ",
                category: "مواد نگهداری",
                price: 65000,
                color: "#32CD32"
            }
        ];

        // مدیریت سبد خرید
        class CartManager {
            constructor() {
                this.cart = JSON.parse(localStorage.getItem('stoneCart')) || [];
                this.init();
            }

            init() {
                this.renderCart();
                this.renderSuggestions();
                this.attachEventListeners();
            }

            renderCart() {
                const container = document.getElementById('cartItemsContainer');
                const emptyCart = document.getElementById('emptyCart');
                const cartCount = document.getElementById('cartCount');
                const checkoutBtn = document.getElementById('checkoutBtn');

                if (this.cart.length === 0) {
                    emptyCart.style.display = 'block';
                    checkoutBtn.disabled = true;
                    checkoutBtn.style.opacity = '0.6';
                    cartCount.textContent = '0 محصول';
                    this.updateSummary();
                    return;
                }

                emptyCart.style.display = 'none';
                checkoutBtn.disabled = false;
                checkoutBtn.style.opacity = '1';
                cartCount.textContent = `${this.cart.length} محصول`;

                container.innerHTML = this.cart.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="item-image" style="background: linear-gradient(135deg, ${item.color}, ${this.darkenColor(item.color)})">
                            ${item.name}
                        </div>
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-category">${item.category}</div>
                            <div class="item-specs">
                                <div class="spec">${item.size || '60x60'}</div>
                                <div class="spec">${item.thickness || '2cm'}</div>
                                <div class="spec">${item.finish || 'صیقلی'}</div>
                            </div>
                            <div class="item-controls">
                                <div class="quantity-controls">
                                    <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                                    <span class="quantity">${item.quantity}</span>
                                    <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                </div>
                                <div class="item-price">
                                    <div class="current-price">${(item.price * item.quantity).toLocaleString()} تومان</div>
                                    <div class="total-price">${item.price.toLocaleString()} تومان (متر مربع)</div>
                                </div>
                                <button class="remove-btn" onclick="cartManager.removeFromCart(${item.id})">
                                    🗑️ حذف
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');

                this.updateSummary();
            }

            updateSummary() {
                const itemsCount = document.getElementById('itemsCount');
                const subtotal = document.getElementById('subtotal');
                const total = document.getElementById('total');

                const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
                const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                itemsCount.textContent = `${totalItems} عدد`;
                subtotal.textContent = `${totalPrice.toLocaleString()} تومان`;
                total.textContent = `${totalPrice.toLocaleString()} تومان`;
            }

            updateQuantity(productId, newQuantity) {
                if (newQuantity < 1) return;

                this.cart = this.cart.map(item => 
                    item.id === productId 
                        ? { ...item, quantity: newQuantity }
                        : item
                );

                this.saveCart();
                this.renderCart();
            }

            removeFromCart(productId) {
                if (confirm('آیا از حذف این محصول از سبد خرید مطمئن هستید؟')) {
                    this.cart = this.cart.filter(item => item.id !== productId);
                    this.saveCart();
                    this.renderCart();
                    
                    // نمایش اعلان
                    this.showNotification('محصول از سبد خرید حذف شد');
                }
            }

            addSuggestion(product) {
                const existingItem = this.cart.find(item => item.id === product.id);
                
                if (existingItem) {
                    this.updateQuantity(product.id, existingItem.quantity + 1);
                } else {
                    this.cart.push({
                        ...product,
                        quantity: 1,
                        size: 'متناسب',
                        thickness: 'استاندارد',
                        finish: 'پیشنهادی'
                    });
                    this.saveCart();
                    this.renderCart();
                }

                this.showNotification(`"${product.name}" به سبد خرید اضافه شد`);
            }

            renderSuggestions() {
                const container = document.getElementById('suggestionsGrid');
                container.innerHTML = suggestions.map(product => `
                    <div class="suggestion-item">
                        <div class="suggestion-image" style="background: linear-gradient(135deg, ${product.color}, ${this.darkenColor(product.color)})">
                            ${product.name}
                        </div>
                        <div class="suggestion-name">${product.name}</div>
                        <div class="suggestion-category">${product.category}</div>
                        <div class="suggestion-price">${product.price.toLocaleString()} تومان</div>
                        <button class="add-suggestion" onclick="cartManager.addSuggestion(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                            افزودن به سبد
                        </button>
                    </div>
                `).join('');
            }

            saveCart() {
                localStorage.setItem('stoneCart', JSON.stringify(this.cart));
            }

            darkenColor(color) {
                // تابع برای تیره کردن رنگ برای گرادیان
                return color.replace(/#/, '#80');
            }

            showNotification(message) {
                // ایجاد اعلان موقت
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 100px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #27ae60;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 25px;
                    z-index: 10000;
                    font-weight: bold;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    animation: fadeIn 0.3s ease;
                `;
                notification.textContent = message;
                document.body.appendChild(notification);

                setTimeout(() => {
                    notification.remove();
                }, 3000);
            }

            attachEventListeners() {
                // مدیریت کد تخفیف
                document.querySelector('.apply-discount').addEventListener('click', () => {
                    const discountInput = document.querySelector('.discount-input');
                    const code = discountInput.value.trim();
                    
                    if (code === 'STONE10') {
                        this.applyDiscount(10);
                        this.showNotification('کد تخفیف 10% اعمال شد');
                        discountInput.value = '';
                    } else if (code === 'STONE20') {
                        this.applyDiscount(20);
                        this.showNotification('کد تخفیف 20% اعمال شد');
                        discountInput.value = '';
                    } else if (code) {
                        this.showNotification('کد تخفیف معتبر نیست');
                    }
                });

                // مدیریت دکمه پرداخت
                document.getElementById('checkoutBtn').addEventListener('click', () => {
                    if (this.cart.length > 0) {
                        window.location.href = 'checkout.html';
                    }
                });
            }

            applyDiscount(percent) {
                const discountElement = document.getElementById('discount');
                const totalElement = document.getElementById('total');
                const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const discount = (subtotal * percent) / 100;
                const total = subtotal - discount;

                discountElement.textContent = `${discount.toLocaleString()} تومان`;
                totalElement.textContent = `${total.toLocaleString()} تومان`;
            }
        }

        // مقداردهی اولیه سبد خرید
        const cartManager = new CartManager();
        // cart-manager.js
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('stoneCart')) || [];
        this.init();
    }

    init() {
        this.updateCartCount();
    }

    // افزودن محصول به سبد خرید
    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                persianName: product.persianName,
                category: product.category,
                price: product.price,
                color: product.color || product.colors?.[0] || '#ccc',
                size: product.size || '60x60',
                thickness: product.thickness || '2cm',
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.showAddToCartNotification(product);
        
        return this.cart;
    }

    // حذف از سبد خرید
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    // تغییر تعداد
    updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            this.removeFromCart(productId);
            return;
        }
        
        this.cart = this.cart.map(item => 
            item.id === productId 
                ? { ...item, quantity: newQuantity }
                : item
        );
        
        this.saveCart();
        this.updateCartCount();
    }

    // ذخیره در localStorage
    saveCart() {
        localStorage.setItem('stoneCart', JSON.stringify(this.cart));
    }

    // گرفتن کل سبد خرید
    getCart() {
        return this.cart;
    }

    // محاسبه جمع کل
    getTotalPrice() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // تعداد کل محصولات
    getTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // به‌روزرسانی شمارنده
    updateCartCount() {
        const totalItems = this.getTotalItems();
        document.querySelectorAll('.cart-count, .cart-badge').forEach(element => {
            element.textContent = totalItems;
        });
    }

    // نمایش اعلان
    showAddToCartNotification(product) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">✅</div>
                <div class="notification-text">
                    <strong>"${product.persianName}"</strong>
                    <span>به سبد خرید اضافه شد</span>
                </div>
                <div class="notification-actions">
                    <button onclick="cartManager.continueShopping()">ادامه خرید</button>
                    <a href="/html/cart.html" class="view-cart-btn">مشاهده سبد خرید</a>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // استایل اعلان
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            border-right: 4px solid #27ae60;
            min-width: 350px;
            animation: slideDown 0.3s ease;
        `;

        // استایل محتوای اعلان
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 15px;
        `;

        notification.querySelector('.notification-actions').style.cssText = `
            display: flex;
            gap: 10px;
            margin-top: 10px;
        `;

        notification.querySelector('.view-cart-btn').style.cssText = `
            background: #3498db;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            text-decoration: none;
            font-size: 0.9rem;
        `;

        notification.querySelector('button').style.cssText = `
            background: #95a5a6;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
        `;

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    continueShopping() {
        document.querySelector('.cart-notification')?.remove();
    }

    // پاک کردن سبد خرید
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
    }
}

// ایجاد نمونه全局
const cartManager = new CartManager();