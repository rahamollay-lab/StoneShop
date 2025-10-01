window.showCategory = showCategory;
function showCategory(category, element) {
    // مخفی کردن همه بخش‌ها
    document.querySelectorAll('.category-section').forEach(section => {
        section.classList.remove('active');
    });

    // غیرفعال کردن همه دکمه‌ها
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // نمایش بخش انتخاب شده
    document.getElementById(category).classList.add('active');

    // فعال کردن دکمه انتخاب شده
    element.classList.add('active');

    // مدیریت فیلتر رنگ
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // مدیریت فیلتر قیمت
    const priceRange = document.getElementById('priceRange');
    const selectedPrice = document.getElementById('selectedPrice');

    if (priceRange && selectedPrice) {
        // فرمت کردن اعداد به صورت فارسی
        function formatPrice(price) {
            return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
        }

        priceRange.addEventListener('input', function () {
            selectedPrice.textContent = formatPrice(this.value);
        });

        // مقدار اولیه
        selectedPrice.textContent = formatPrice(priceRange.value);
    }
}

// فیلتر بر اساس محدوده قیمت
function filterByPrice(minPrice, maxPrice) {
    document.querySelectorAll('.stone-item').forEach(item => {
        const priceText = item.querySelector('.price-range').textContent;
        const prices = priceText.match(/\d+/g);
        if (prices && prices.length >= 2) {
            const itemMinPrice = parseInt(prices[0].replace(/,/g, ''));
            const itemMaxPrice = parseInt(prices[1].replace(/,/g, ''));
            
            if (itemMinPrice >= minPrice && itemMaxPrice <= maxPrice) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// جستجو در نام محصولات
function searchStones(query) {
    document.querySelectorAll('.stone-item').forEach(item => {
        const stoneName = item.querySelector('.stone-name').textContent.toLowerCase();
        if (stoneName.includes(query.toLowerCase())) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

let compareList = [];

function addToCompare(stoneName) {
    if (!compareList.includes(stoneName)) {
        compareList.push(stoneName);
        updateCompareBadge();
        showNotification(`سنگ ${stoneName} به لیست مقایسه اضافه شد`);
    }
}

function updateCompareBadge() {
    // پیاده‌سازی آپدیت نشان مقایسه
    console.log('لیست مقایسه آپدیت شد:', compareList);
}

function showNotification(message) {
    // پیاده‌سازی نمایش نوتیفیکیشن
    console.log('نوتیفیکیشن:', message);
}

function showCompareModal() {
    if (compareList.length > 0) {
        // نمایش مودال مقایسه
        const modal = document.createElement('div');
        modal.className = 'compare-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>مقایسه محصولات</h3>
                <div class="compare-table">
                    <!-- جدول مقایسه -->
                </div>
                <button onclick="closeCompareModal()">بستن</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

function closeCompareModal() {
    const modal = document.querySelector('.compare-modal');
    if (modal) {
        modal.remove();
    }
}

// تابع نمایش مشاوره
function showConsultation() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: 'Vazir', sans-serif;
    `;

    modal.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 20px; text-align: center; max-width: 500px; width: 90%;">
            <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 1.8rem;">💎 مشاوره رایگان</h3>
            <p style="color: #666; margin-bottom: 25px; font-size: 1.1rem; line-height: 1.6;">
                متخصصین ما آماده ارائه مشاوره رایگان در زمینه انتخاب سنگ مناسب برای پروژه شما هستند
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #e67e22; margin-bottom: 15px;">📞 راه‌های ارتباطی</h4>
                <p style="margin: 10px 0; color: #2c3e50;">
                    <strong>تلفن:</strong> ۰۹۱۳۱۹۳۰۹۰۶
                </p>
                <p style="margin: 10px 0; color: #2c3e50;">
                    <strong>واتس‌اپ:</strong> ۰۹۱۳۱۹۳۰۹۰۶
                </p>
                <p style="margin: 10px 0; color: #2c3e50;">
                    <strong>ساعات کاری:</strong> ۸:۰۰ تا ۱۸:۰۰
                </p>
            </div>
            
            <button onclick="this.closest('div').parentElement.remove()" 
                    style="background: linear-gradient(135deg, #e67e22, #d35400); 
                           color: white; 
                           border: none; 
                           padding: 15px 40px; 
                           border-radius: 25px; 
                           cursor: pointer; 
                           font-size: 1.1rem; 
                           font-weight: bold;
                           transition: all 0.3s ease;">
                متوجه شدم
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}

// مدیریت تب‌های محصولات پرفروش
document.addEventListener('DOMContentLoaded', function() {
    // تب‌های محصولات پرفروش
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productsGrid = document.querySelector('.products-grid');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // حذف کلاس active از همه دکمه‌ها
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // اضافه کردن کلاس active به دکمه کلیک شده
            this.classList.add('active');
            
            const tabType = this.getAttribute('data-tab');
            filterProducts(tabType);
        });
    });
    
    function filterProducts(tabType) {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const badge = card.querySelector('.product-badge');
            const badgeText = badge ? badge.textContent.trim() : '';
            
            switch(tabType) {
                case 'bestsellers':
                    if (badgeText === 'پرفروش') {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                    break;
                    
                case 'discount':
                    if (badgeText.includes('تخفیف')) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                    break;
                    
                case 'new':
                    if (badgeText === 'جدید') {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                    break;
                    
                default:
                    card.style.display = 'block';
            }
        });
    }
    
    // مدیریت دکمه‌های افزودن به سبد خرید
    const productButtons = document.querySelectorAll('.product-btn');
    
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // نمایش مودال تأیید
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;
            
            modal.innerHTML = `
                <div style="background: white; padding: 30px; border-radius: 20px; text-align: center; max-width: 400px; width: 90%;">
                    <h3 style="color: #27ae60; margin-bottom: 15px; font-size: 1.5rem;">✅ موفقیت آمیز</h3>
                    <p style="margin-bottom: 10px; color: #666; font-size: 1.1rem;">${productName}</p>
                    <p style="font-size: 1.3rem; color: #e67e22; margin-bottom: 20px; font-weight: bold;">
                        ${productPrice}
                    </p>
                    <p style="color: #27ae60; margin-bottom: 25px; font-size: 1rem;">
                        محصول با موفقیت به سبد خرید شما اضافه شد
                    </p>
                    <button onclick="this.closest('div').parentElement.remove()" 
                            style="background: #e67e22; color: white; border: none; padding: 12px 35px; border-radius: 25px; cursor: pointer; font-size: 1rem; font-weight: 500;">
                        متوجه شدم
                    </button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // آپدیت شمارنده سبد خرید در هدر
            updateCartCount();
        });
    });
    
    // مدیریت فرم خبرنامه
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // شبیه‌سازی ارسال ایمیل
                showNewsletterSuccess();
                emailInput.value = '';
            } else {
                alert('لطفاً یک ایمیل معتبر وارد کنید.');
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNewsletterSuccess() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 20px; text-align: center; max-width: 400px; width: 90%;">
                <h3 style="color: #27ae60; margin-bottom: 15px; font-size: 1.5rem;">✅ عضویت موفق</h3>
                <p style="color: #666; margin-bottom: 20px; font-size: 1.1rem; line-height: 1.6;">
                    با تشکر از عضویت شما در خبرنامه!<br>
                    جدیدترین تخفیف‌ها و محصولات برای شما ارسال خواهد شد.
                </p>
                <button onclick="this.closest('div').parentElement.remove()" 
                        style="background: #e67e22; color: white; border: none; padding: 12px 35px; border-radius: 25px; cursor: pointer; font-size: 1rem; font-weight: 500;">
                    متوجه شدم
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // تابع آپدیت شمارنده سبد خرید
    function updateCartCount() {
        const headerComponent = document.querySelector('header-component');
        if (headerComponent && headerComponent.updateCartCount) {
            const currentCount = parseInt(headerComponent.shadowRoot?.querySelector('.cart-count')?.textContent || '0');
            headerComponent.updateCartCount(currentCount + 1);
        }
    }
    
    // انیمیشن اسکرول برای بخش‌ها
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // مشاهده بخش‌ها برای انیمیشن
    const sections = document.querySelectorAll('.main-categories, .featured-products, .about-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// مدیریت دکمه شناور مشاوره
document.addEventListener('DOMContentLoaded', function() {
    const consultationFloating = document.getElementById('consultationFloating');
    
    if (consultationFloating) {
        // انیمیشن پالس برای دکمه شناور
        setInterval(() => {
            consultationFloating.style.transform = 'scale(1.05)';
            setTimeout(() => {
                consultationFloating.style.transform = 'scale(1)';
            }, 1000);
        }, 2000);
    }
});

// مدیریت اسکرول نرم برای لینک‌ها
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});