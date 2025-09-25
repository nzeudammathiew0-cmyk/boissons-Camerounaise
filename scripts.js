// Global variables
let cart = [];
let currentCategory = 'jus';

// DOCUMENT OBJECT MODEL (DOM) ELEMENTS
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartModal = document.getElementById('cartModal');
const checkoutModal = document.getElementById('checkoutModal');
const cartCount = document.querySelector('.cart-count');
const cartLink = document.querySelector('.cart-link');
const notification = document.getElementById('notification');

// liste des produits
const products = {
    'top-pamplemousse': {
        id: 'top-pamplemousse',
        name: 'Top Pamplemousse',
        description: 'Jus de pamplemousse 100% naturel',
        image: 'image/IM8.jpeg',
        category: 'jus',
        sizes: {
            '33cl': 500,
            '50cl': 750,
            '1L': 1500
        }
    },
    'top-grenadine': {
        id: 'top-grenadine',
        name: 'Top Grenadine',
        description: 'Sirop de grenadine premium',
        image: 'image/top grenadine.jpg',
        category: 'jus',
        sizes: {
            '33cl': 500,
            '50cl': 750,
            '1L': 1500
        }
    },
    'top-ananas': {
        id: 'top-ananas',
        name: 'Top Ananas',
        description: 'Jus d\'ananas tropical frais',
        image: 'image/top ananas.jpeg',
        category: 'jus',
        sizes: {
            '33cl': 500,
            '50cl': 750,
            '1L': 1500
        }
    },
    'djino': {
        id: 'djino',
        name: 'Djino',
        description: 'Boisson au gingembre pétillante',
        image: 'image/djino.jpeg',
        category: 'jus',
        sizes: {
            '25cl': 750,
            '50cl': 1200
        }
    },
    'planete-cocktail': {
        id: 'planete-cocktail',
        name: 'Planète Cocktail',
        description: 'Mélange de fruits exotiques',
        image: 'image/planete cocktail.jpeg',
        category: 'jus',
        sizes: {
            '33cl': 500,
            '50cl': 750
        }
    },
    'vimpto': {
        id: 'vimpto',
        name: 'Vimpto',
        description: 'Boisson à l\'hibiscus traditionnelle',
        image: 'image/vimpto.jpeg',
        category: 'jus',
        sizes: {
            '25cl': 600,
            '50cl': 1200,
            '1L': 2400
        }
    },
    'kadji-beer': {
        id: 'kadji-beer',
        name: 'Kadji Beer',
        description: 'Bière blonde camerounaise',
        image: 'image/kadji.jpeg',
        category: 'biere',
        sizes: {
            '33cl': 800,
            '50cl': 1200,
            '65cl': 1500
        }
    },
    '33-export': {
        id: '33-export',
        name: '33 Export',
        description: 'Bière premium d\'exportation',
        image: 'image/33 export.jpeg',
        category: 'biere',
        sizes: {
            '33cl': 1000,
            '50cl': 1500,
            '65cl': 1800
        }
    },
    'booster cola': {
        id: 'booster cola',
        name: 'Booster Cola',
        description: 'Bière énergisante rafraîchissante',
        image: 'image/booster cola.jpeg',
        category: 'biere',
        sizes: {
            '33cl': 1200,
            '50cl': 1800
        }
    },
    'dopel': {
        id: 'dopel',
        name: 'Dopel',
        description: 'Bière forte double malt',
        image: 'image/dopel.jpeg',
        category: 'biere',
        sizes: {
            '33cl': 1500,
            '50cl': 2200,
            '65cl': 2800
        }
    },
    'castel': {
        id: 'castel',
        name: 'Castel',
        description: 'Bière blonde légère',
        image: 'image/castel.jpg',
        category: 'biere',
        sizes: {
            '33cl': 900,
            '50cl': 1300,
            '65cl': 1600
        }
    },
    'mutzig': {
        id: 'mutzig',
        name: 'Mutzig',
        description: 'Bière alsacienne au Cameroun',
        image: 'image/mutzig.jpeg',
        category: 'biere',
        sizes: {
            '33cl': 1100,
            '50cl': 1600,
            '65cl': 2000
        }
    }
};

// initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadCartFromStorage();
    updateCartDisplay();
    setupSizeSelectors();
    setupPaymentMethodToggle();
    setupFormValidation();
});

// ecouteur d'evenements
function initializeEventListeners() {
    // menu hamburger mobile
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // lien de navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        if (!link.classList.contains('cart-link')) {
            link.addEventListener('click', handleNavClick);
        }
    });
    
    // Cart modal
    cartLink.addEventListener('click', openCartModal);
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModals);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeModals();
        }
        if (event.target === checkoutModal) {
            closeModals();
        }
    });
    
    // Smooth scroll for CTA button
    document.querySelector('.cta-button').addEventListener('click', scrollToProducts);
    }

// Mobile menu toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Navigation click handler
function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    // Close mobile menu if open
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Scroll to products section
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Category switching
function switchCategory(category) {
    currentCategory = category;
    
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Update category content
    document.querySelectorAll('.category-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(category).classList.add('active');
    
    // Reinitialize size selectors for the new category
    setupSizeSelectors();
}

// Size selector setup
function setupSizeSelectors() {
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.getAttribute('data-product');
            const size = this.getAttribute('data-size');
            const price = this.getAttribute('data-price');
            
            // Update active size
            productCard.querySelectorAll('.size-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update price display
            const priceDisplay = productCard.querySelector('.product-price');
            priceDisplay.textContent = formatPrice(parseInt(price));
        });
    });
}

// Add to cart functionality
function addToCart(productId) {
    const product = products[productId];
    if (!product) return;
    
    const productCard = document.querySelector(`[data-product="${productId}"]`);
    const activeSize = productCard.querySelector('.size-option.active');
    const size = activeSize.getAttribute('data-size');
    const price = parseInt(activeSize.getAttribute('data-price'));
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === productId && item.size === size
    );
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            description: product.description,
            image: product.image,
            size: size,
            price: price,
            quantity: 1
        });
    }
    updateCartDisplay();
    saveCartToStorage();
    showNotification(`${product.name} (${size}) ajouté au panier !`, 'success');
    
    // Add animation to cart button
    const cartButton = cartLink;
    cartButton.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartButton.style.transform = 'scale(1)';
    }, 200);
}

// Update cart display
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

// Open cart modal
function openCartModal() {
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.getElementById('totalAmount');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Votre panier est vide</p>';
        totalAmount.textContent = '0 FCFA';
        document.querySelector('.checkout-btn').disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80/2c5530/ffffff?text=Produit'">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.description} - ${item.size}</p>
                    <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', '${item.size}', -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', '${item.size}', 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}', '${item.size}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = formatPrice(total);
        document.querySelector('.checkout-btn').disabled = false;
    }
    
    cartModal.style.display = 'block';
}

// Update quantity in cart
function updateQuantity(productId, size, change) {
    const itemIndex = cart.findIndex(item => item.id === productId && item.size === size);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        updateCartDisplay();
        saveCartToStorage();
        openCartModal(); // Refresh cart modal
    }
}

// Remove item from cart
function removeFromCart(productId, size) {
    const itemIndex = cart.findIndex(item => item.id === productId && item.size === size);
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        cart.splice(itemIndex, 1);
        updateCartDisplay();
        saveCartToStorage();
        openCartModal(); // Refresh cart modal
        showNotification(`${item.name} retiré du panier`, 'success');
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) return;
    
    cartModal.style.display = 'none';
    // Populate order summary
    const summaryContent = document.querySelector('.summary-content');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    summaryContent.innerHTML = `
        ${cart.map(item => `
            <div class="summary-item">
                <span>${item.name} (${item.size}) x ${item.quantity}</span>
                <span>${formatPrice(item.price * item.quantity)}</span>
            </div>
        `).join('')}
        <div class="summary-total">
            <span>Total</span>
            <span>${formatPrice(total)}</span>
        </div>
    `;
    
    checkoutModal.style.display = 'block';
}

// Payment method toggle
function setupPaymentMethodToggle() {
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const cardForm = document.getElementById('cardForm');
            const mobileForm = document.getElementById('mobileForm');
            
            if (this.value === 'card') {
                cardForm.classList.add('active');
                mobileForm.classList.remove('active');
            } else {
                cardForm.classList.remove('active');
                mobileForm.classList.add('active');
            }
        });
    });
}

// Form validation setup
function setupFormValidation() {
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue !== this.value) {
                this.value = formattedValue;
            }
        });
    }
    
    // Expiry date formatting
    const cardExpiryInput = document.getElementById('cardExpiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }
    
    // CVV validation
    const cardCvvInput = document.getElementById('cardCvv');
    if (cardCvvInput) {
        cardCvvInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').substring(0, 4);
        });
    }
    
    // Mobile number formatting
    const mobileNumberInput = document.getElementById('mobileNumber');
    if (mobileNumberInput) {
        mobileNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.startsWith('237')) {
                value = '+' + value;
            } else if (value.startsWith('6') || value.startsWith('7') || value.startsWith('8') || value.startsWith('9')) {
                value = '+237' + value;
            }
            this.value = value;
        });
    }
    
    // PIN validation
    const mobilePinInput = document.getElementById('mobilePin');
    if (mobilePinInput) {
        mobilePinInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').substring(0, 4);
        });
    }
}

// Confirm payment
function confirmPayment() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const confirmBtn = document.querySelector('.confirm-btn');
    
    // Validate form
    if (!validatePaymentForm(paymentMethod)) {
        return;
    }
    
    // Show loading state
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
    confirmBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Reset button
        confirmBtn.innerHTML = '<i class="fas fa-lock"></i> Confirmer le paiement';
        confirmBtn.disabled = false;
        
        // Clear cart and close modal
        cart = [];
        updateCartDisplay();
        saveCartToStorage();
        closeModals();
        
        // Show success message
        showNotification('Paiement effectué avec succès ! Votre commande sera livrée sous 24h.', 'success');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3000);
}

// Validate payment form
function validatePaymentForm(paymentMethod) {
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCvv = document.getElementById('cardCvv').value;
        const cardName = document.getElementById('cardName').value;
        
        if (!cardNumber || cardNumber.length < 13) {
            showNotification('Numéro de carte invalide', 'error');
            return false;
        }
        
        if (!cardExpiry || cardExpiry.length !== 5) {
            showNotification('Date d\'expiration invalide', 'error');
            return false;
        }
        
        if (!cardCvv || cardCvv.length < 3) {
            showNotification('Code CVV invalide', 'error');
            return false;
        }
        
        if (!cardName.trim()) {
            showNotification('Nom sur la carte requis', 'error');
            return false;
        }
    } else {
        const mobileNumber = document.getElementById('mobileNumber').value;
        const mobilePin = document.getElementById('mobilePin').value;
        
        if (!mobileNumber || !mobileNumber.match(/^\+237[6-9]\d{8}$/)) {
            showNotification('Numéro de téléphone invalide', 'error');
            return false;
        }
        
        if (!mobilePin || mobilePin.length < 4) {
            showNotification('Code PIN requis', 'error');
            return false;
        }
        
        // Validate operator-specific numbers
        if (paymentMethod === 'orange' && !mobileNumber.match(/^\+23769\d{7}$/)) {
            showNotification('Numéro Orange Money invalide (doit commencer par 69)', 'error');
            return false;
        }
        
        if (paymentMethod === 'mtn' && !mobileNumber.match(/^\+2376[78]\d{7}$/)) {
            showNotification('Numéro MTN Mobile Money invalide (doit commencer par 67 ou 68)', 'error');
            return false;
        }
    }
    
    return true;
}

// Cancel checkout
function cancelCheckout() {
    closeModals();
}

// Close all modals
function closeModals() {
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'none';
}

// Show notification
function showNotification(message, type = 'success') {
    const notificationIcon = notification.querySelector('.notification-icon');
    const notificationMessage = notification.querySelector('.notification-message');
     notification.className = `notification ${type}`;
    notificationIcon.className = `notification-icon fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`;
    notificationMessage.textContent = message;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
}

// Local storage functions
function saveCartToStorage() {
    localStorage.setItem('camerounDrinksCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('camerounDrinksCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Scroll animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    document.querySelectorAll('.product-card, .feature, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', observeElements);

// Smooth scroll for all anchor links
document.addEventListener('DOMContentLoaded', function() {
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
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});
