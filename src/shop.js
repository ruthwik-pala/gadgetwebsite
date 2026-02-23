import { products } from './data/products.js';

let cart = JSON.parse(localStorage.getItem('gadget360-cart') || '[]');

function saveCart() {
  localStorage.setItem('gadget360-cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((n, i) => n + (i.qty || 1), 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

function renderProductCard(p) {
  const inCart = cart.some(i => i.id === p.id);
  return `
    <article class="product-card" data-id="${p.id}">
      <a href="shop.html?id=${p.id}" class="product-image">
        <span>${p.emoji}</span>
        ${p.badge ? `<span class="product-badges"><span class="product-badge ${p.badge}">${p.badge}</span></span>` : ''}
      </a>
      <div class="product-info">
        <p class="category">${p.category.replace(/-/g, ' ')}</p>
        <h3>${p.name}</h3>
        <div class="product-footer">
          <span class="product-price">
            ${p.originalPrice ? `<span class="original">₹${p.originalPrice}</span>` : ''}
            ₹${p.price}
          </span>
          <button class="btn btn-primary add-to-cart" data-id="${p.id}" ${inCart ? 'disabled' : ''}>
            ${inCart ? 'In Cart' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  `;
}

function filterProducts(cat) {
  const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
  const grid = document.getElementById('shop-products');
  grid.innerHTML = filtered.map(renderProductCard).join('');
}

// Init
const params = new URLSearchParams(location.search);
const initialCat = params.get('cat') || 'all';

document.getElementById('filter-tabs').querySelectorAll('button').forEach(btn => {
  btn.classList.toggle('active', btn.dataset.cat === initialCat);
  btn.addEventListener('click', () => {
    document.querySelectorAll('#filter-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts(btn.dataset.cat);
  });
});

filterProducts(initialCat);

document.addEventListener('click', e => {
  const btn = e.target.closest('.add-to-cart');
  if (!btn) return;
  e.preventDefault();
  const id = parseInt(btn.dataset.id);
  const p = products.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty = (existing.qty || 1) + 1;
  else cart.push({ id, qty: 1, ...p });
  saveCart();
  btn.textContent = 'In Cart';
  btn.disabled = true;
});

// Cart drawer (reuse main.js logic)
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsEl = document.getElementById('cart-items');

function openCart() {
  cartDrawer?.classList.add('open');
  cartOverlay?.classList.add('open');
  renderCartItems();
}

function closeCart() {
  cartDrawer?.classList.remove('open');
  cartOverlay?.classList.remove('open');
}

function renderCartItems() {
  if (!cartItemsEl) return;
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    return;
  }
  cartItemsEl.innerHTML = cart.map(item => {
    const p = products.find(x => x.id === item.id) || item;
    return `
      <div class="cart-item" style="display:flex;gap:1rem;padding:1rem;border-bottom:1px solid var(--border);">
        <span style="font-size:2rem">${p.emoji || '📦'}</span>
        <div style="flex:1"><strong>${p.name}</strong><p style="color:var(--text-muted);font-size:0.9rem;">₹${p.price} × ${item.qty || 1}</p></div>
        <button class="remove-from-cart" data-id="${p.id}" style="background:none;border:none;color:var(--text-muted);cursor:pointer;">×</button>
      </div>
    `;
  }).join('');
  cartItemsEl.querySelectorAll('.remove-from-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      cart = cart.filter(i => i.id !== parseInt(btn.dataset.id));
      saveCart();
      renderCartItems();
      updateCartUI();
    });
  });
}

document.querySelectorAll('.cart-btn').forEach(btn => btn.addEventListener('click', openCart));
document.querySelector('.close-cart')?.addEventListener('click', closeCart);
cartOverlay?.addEventListener('click', closeCart);

updateCartUI();
