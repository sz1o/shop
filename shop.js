// shop.js — load products.json and render the products grid
(function () {
  async function loadProducts() {
    try {
      const res = await fetch('products.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch products.json');
      const json = await res.json();
      const products = Array.isArray(json.products) ? json.products : [];
      const productsGrid = document.getElementById('products-grid');
      if (!productsGrid) return;

      productsGrid.innerHTML = '';

      products.forEach((product, index) => {
        const productBox = document.createElement('div');
        productBox.className = 'product-box' + (product.status === 'Coming Soon' ? ' coming-soon' : '');
        productBox.style.animationDelay = `${index * 0.08}s`;

        // choose logo by title
        const title = (product.title || '').toLowerCase();
        let logoHTML = '';
        if (title.includes('xbox')) {
          logoHTML = '<div class="product-logo"><img src="xbox.png" alt="Xbox Logo" class="product-image"></div>';
        } else if (title.includes('roblox')) {
          logoHTML = '<div class="product-logo"><img src="roblox-empty.png" alt="Roblox Logo" class="product-image"></div>';
        } else if (title.includes('netflix')) {
          logoHTML = '<div class="product-logo"><img src="netflix.png" alt="Netflix Logo" class="product-image"></div>';
        }

        productBox.innerHTML = `
          ${logoHTML}
          <h2 class="product-title">${product.title || ''}</h2>
          <p class="product-subtitle">${product.subtitle || ''}</p>
          <p class="product-status ${product.status === 'Available' ? 'available' : 'soon'}">${product.status || ''}</p>
        `;

        // click navigation for available items
        productBox.addEventListener('click', () => {
          if (product.status === 'Coming Soon') return;
          if (title.includes('xbox')) {
            window.location.href = 'xbox.html';
          } else if (title.includes('roblox')) {
            window.location.href = 'roblox.html';
          } else if (title.includes('netflix')) {
            window.location.href = 'netflix.html';
          }
        });

        productsGrid.appendChild(productBox);
      });
    } catch (err) {
      console.error('Error loading products:', err);
      // graceful fallback: render a few default boxes
      const productsGrid = document.getElementById('products-grid');
      if (!productsGrid) return;
      productsGrid.innerHTML = `
        <div class="product-box" style="animation-delay:0s;">
          <div class="product-logo"><img src="xbox.png" alt="Xbox Logo" class="product-image"></div>
          <h2 class="product-title">Xbox</h2>
          <p class="product-subtitle">FRESH ACCOUNT</p>
          <p class="product-status available">Available</p>
        </div>
        <div class="product-box" style="animation-delay:0.1s;">
          <div class="product-logo"><img src="roblox-empty.png" alt="Roblox Logo" class="product-image"></div>
          <h2 class="product-title">Roblox</h2>
          <p class="product-subtitle">Premium Account</p>
          <p class="product-status available">Available</p>
        </div>
        <div class="product-box" style="animation-delay:0.2s;">
          <div class="product-logo"><img src="netflix.png" alt="Netflix Logo" class="product-image"></div>
          <h2 class="product-title">Netflix</h2>
          <p class="product-subtitle">Premium Subscription</p>
          <p class="product-status available">Available</p>
        </div>
      `;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProducts);
  } else {
    loadProducts();
  }
})();