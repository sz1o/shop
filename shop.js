// Load products from JSON and display them
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        const productsGrid = document.getElementById('products-grid');
        
        if (!productsGrid) return;
        
        productsGrid.innerHTML = '';
        
        data.products.forEach(product => {
            const productBox = document.createElement('div');
            productBox.className = `product-box ${product.status === 'Coming Soon' ? 'coming-soon' : ''} animate-fadeInUp`;
            productBox.style.animationDelay = `${index * 0.1}s`;
            productBox.setAttribute('data-product-id', product.id);
            
            // Create logo based on product
            let logoHTML = '';
            if (product.title.toLowerCase() === 'xbox') {
                logoHTML = `
                    <div class="product-logo">
                        <img src="xbox.png" alt="Xbox Logo" class="product-image">
                    </div>
                `;
            } else if (product.title.toLowerCase() === 'roblox') {
                logoHTML = `
                    <div class="product-logo">
                        <img src="roblox-empty.png" alt="Roblox Logo" class="product-image">
                    </div>
                `;
            } else if (product.title.toLowerCase() === 'netflix') {
                logoHTML = `
                    <div class="product-logo">
                        <img src="netflix.png" alt="Netflix Logo" class="product-image">
                    </div>
                `;
            }
            
            productBox.innerHTML = `
                ${logoHTML}
                <h2 class="product-title">${product.title}</h2>
                <p class="product-subtitle">${product.subtitle}</p>
                <p class="product-status available">${product.status}</p>
            `;
            
            // Add click event to navigate to product page
            productBox.addEventListener('click', () => {
                if (product.status !== 'Coming Soon') {
                    const productName = product.title.toLowerCase();
                    if (productName === 'xbox') {
                        window.location.href = 'xbox.html';
                    } else if (productName === 'roblox') {
                        window.location.href = 'roblox.html';
                    } else if (productName === 'netflix') {
                        window.location.href = 'netflix.html';
                    }
                }
            });
            
            productsGrid.appendChild(productBox);
        });
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback if JSON fails to load
        const productsGrid = document.getElementById('products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div class="product-box animate-fadeInUp" data-product="xbox" style="animation-delay: 0s;">
                    <div class="product-logo">
                        <img src="xbox.png" alt="Xbox Logo" class="product-image">
                    </div>
                    <h2 class="product-title">Xbox</h2>
                    <p class="product-subtitle">FRESH ACCOUNT</p>
                    <p class="product-status available">Available</p>
                </div>
                <div class="product-box animate-fadeInUp" data-product="roblox" style="animation-delay: 0.1s;">
                    <div class="product-logo">
                        <img src="roblox-empty.png" alt="Roblox Logo" class="product-image">
                    </div>
                    <h2 class="product-title">Roblox</h2>
                    <p class="product-subtitle">Premium Account</p>
                    <p class="product-status available">Available</p>
                </div>
                <div class="product-box animate-fadeInUp" data-product="netflix" style="animation-delay: 0.2s;">
                    <div class="product-logo">
                        <img src="netflix.png" alt="Netflix Logo" class="product-image">
                    </div>
                    <h2 class="product-title">Netflix</h2>
                    <p class="product-subtitle">Premium Subscription</p>
                    <p class="product-status available">Available</p>
                </div>
                <div class="product-box animate-fadeInUp coming-soon" style="animation-delay: 0.3s;">
                    <h2 class="product-title">More Coming Soon!</h2>
                    <p class="product-subtitle">Stay Tuned</p>
                    <p class="product-status soon">Coming Soon</p>
                </div>
            `;
            
            // Add click handlers to fallback product boxes
            const fallbackBoxes = productsGrid.querySelectorAll('.product-box[data-product]');
            fallbackBoxes.forEach(box => {
                box.addEventListener('click', () => {
                    const product = box.getAttribute('data-product');
                    if (product === 'xbox') {
                        window.location.href = 'xbox.html';
                    } else if (product === 'roblox') {
                        window.location.href = 'roblox.html';
                    } else if (product === 'netflix') {
                        window.location.href = 'netflix.html';
                    }
                });
            });
        }
    }
}

// Load products when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProducts);
} else {
    loadProducts();
}
