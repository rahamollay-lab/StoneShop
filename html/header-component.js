class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
              * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .main-header {
                    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
                    color: white;
                    padding: 0;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                    width: 100%;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 1000;
                    backdrop-filter: blur(10px);
                }

                .header-container {
                    width: 90%;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 0px;
                }

                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 80px;
                }

                .logo {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #e67e22;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .logo:hover {
                    color: #ff9d42;
                    transform: scale(1.05);
                }

                .logo-icon {
                    font-size: 2.2rem;
                }

                .nav-links {
                    display: flex;
                    list-style: none;
                    align-items: center;
                    gap: 10px;
                }

                .nav-links li {
                    position: relative;
                }

                .nav-links a {
                    color: white;
                    text-decoration: none;
                    padding: 15px 20px;
                    border-radius: 25px;
                    transition: all 0.3s ease;
                    font-weight: 600;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .nav-links a:hover {
                    background: rgba(230, 126, 34, 0.2);
                    color: #e67e22;
                    transform: translateY(-2px);
                }

                .nav-links a.active {
                    background: #e67e22;
                    color: white;
                    box-shadow: 0 4px 15px rgba(230, 126, 34, 0.3);
                }

                .nav-icon {
                    font-size: 1.2rem;
                }

                .dropdown {
                    position: relative;
                }

                .dropdown-content {
                    display: none;
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    min-width: 220px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                    border-radius: 15px;
                    z-index: 1001;
                    padding: 10px 0;
                    margin-top: 10px;
                }

                .dropdown-content a {
                    color: #2c3e50 !important;
                    padding: 12px 20px;
                    display: block;
                    border-radius: 0;
                    font-weight: 500;
                    border-bottom: 1px solid #f8f9fa;
                }
.dropdown-content a:hover {
                    background: #f8f9fa;
                    color: #e67e22 !important;
                    transform: none;
                }

                .dropdown-content a:last-child {
                    border-bottom: none;
                }

                .dropdown:hover .dropdown-content {
                    display: block;
                }

                .user-actions {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .action-btn {
                    background: rgba(255,255,255,0.1);
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 25px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    backdrop-filter: blur(10px);
                }

                .action-btn:hover {
                    background: #e67e22;
                    transform: scale(1.05);
                }

                .cart-count {
                    background: #e74c3c;
                    color: white;
                    border-radius: 50%;
                    padding: 2px 6px;
                    font-size: 0.8rem;
                    margin-right: 5px;
                }

                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 10px;
                    transition: all 0.3s ease;
                }

                .mobile-menu-btn:hover {
                    background: rgba(255,255,255,0.1);
                }

                /* استایل‌های رسپانسیو */
                @media (max-width: 1024px) {
                    .nav-links {
                        gap: 5px;
                    }
                    
                    .nav-links a {
                        padding: 12px 15px;
                        font-size: 0.9rem;
                    }
                    
                    .logo {
                        font-size: 1.5rem;
                    }
                }

                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: block;
                    }

                    .nav-links {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        background: #2c3e50;
                        flex-direction: column;
                        padding: 20px 0;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                        border-radius: 0 0 20px 20px;
                    }

                    .nav-links.active {
                        display: flex;
                    }

                    .nav-links li {
                        width: 100%;
                        text-align: center;
                    }

                    .nav-links a {
                        display: flex;
                        padding: 15px 20px;
                        width: 100%;
                        justify-content: center;
                        border-radius: 0;
                    }

                    .dropdown-content {
                        position: static;
                        box-shadow: none;
                        background: #34495e;
                        width: 100%;
                        border-radius: 0;
                        margin-top: 0;
                    }
.dropdown-content a {
                        color: white !important;
                        padding: 12px 40px;
                    }

                    .user-actions {
                        display: none;
                    }

                    .header-content {
                        height: 70px;
                    }
                }

                /* انیمیشن‌ها */
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .dropdown-content {
                    animation: slideDown 0.3s ease;
                }
            </style>

          <header class="main-header">
                <div class="header-container">
                    <div class="header-content">
                        <!-- لوگو -->
                        <a href="/" class="logo">
                            <span class="logo-icon"></span>
                            سنگ فروشی نصف جهان
                        </a>

                        <!-- منوی موبایل -->
                        <button class="mobile-menu-btn">☰</button>

                        <!-- منوی اصلی -->
                        <ul class="nav-links">
                            <li>
                                <a href="pagehome.html" class="nav-link active">
                                    <span class="nav-icon">🏠</span>
                                    خانه
                                </a>
                            </li>
                            
                            <li class="dropdown">
                                <a href="product.html">
                                    <span class="nav-icon">📦</span>
                                    محصولات
                                    <span style="font-size: 0.8rem; margin-right: 5px;"></span>
                                </a>
                               
                            </li>
                            <li class="dropdown">
                                <a href="#">
                                    <span class="nav-icon">🏗️</span>
                                    سنگ های کار شده
                                    <span style="font-size: 0.8rem; margin-right: 5px;">▼</span>
</a>
                                <div class="dropdown-content">
                                    <a href="completed-projects.html">
                                        <span style="margin-left: 8px;">✅</span>
                                        پروژه های انجام شده
                                    </a>
                                    <a href="portfolio.html">
                                        <span style="margin-left: 8px;">📁</span>
                                        نمونه کارها
                                    </a>
                                  
                                </div>
                            </li>
                            
                            <li>
                                <a href="contact.html" class="nav-link">
                                    <span class="nav-icon">📞</span>
                                    ارتباط با ما
                                </a>
                            </li>
                        </ul>

                        <!-- اقدامات کاربر -->
                        <div class="user-actions">
                            <button class="action-btn consultation-btn">
                                <span>💎</span>
                                مشاوره رایگان
                            </button>
                            <button class="action-btn cart-btn" href="cartItem.html">
                                <span class="cart-count">0</span>
                                🛒 سبد خرید
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        const mobileMenuBtn = this.querySelector('.mobile-menu-btn');
        const navLinks = this.querySelector('.nav-links');
        const dropdowns = this.querySelectorAll('.dropdown');

        // منوی موبایل
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navLinks.classList.toggle('active');
            });
        }
        // منوهای کشویی برای دسکتاپ
        dropdowns.forEach(dropdown => {
            if (window.innerWidth > 768) {
                dropdown.addEventListener('mouseenter', () => {
                    const content = dropdown.querySelector('.dropdown-content');
                    if (content) content.style.display = 'block';
                });

                dropdown.addEventListener('mouseleave', () => {
                    const content = dropdown.querySelector('.dropdown-content');
                    if (content) content.style.display = 'none';
                });
            }
        });

        // بستن منو هنگام کلیک خارج از آن
        document.addEventListener('click', (e) => {
            if (navLinks && !this.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // مدیریت رسپانسیو منوهای کشویی در موبایل
        if (window.innerWidth <= 768) {
            dropdowns.forEach(dropdown => {
                const trigger = dropdown.querySelector('a');
                const content = dropdown.querySelector('.dropdown-content');

                if (trigger && content) {
                    trigger.addEventListener('click', (e) => {
                        e.preventDefault();
                        content.style.display = content.style.display === 'block' ? 'none' : 'block';
                    });
                }
            });
        }
    }
}

// ثبت کامپوننت
if (!customElements.get('header-component')) {
    customElements.define('header-component', HeaderComponent);
}

console.log('✅ Header Component Loaded Successfully');