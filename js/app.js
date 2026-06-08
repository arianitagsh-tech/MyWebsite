/* ================================================================
   app.js — EQUAL Clothing Store
   Product rendering, category filtering, shopping cart, language
   ================================================================ */

/* ---- STATE ---- */
let activeFilter = "all";
let cart = [];

/* ---- INIT ---- */
document.addEventListener("DOMContentLoaded", () => {
  loadLanguage();
  loadCart();
  renderProducts();
  bindEvents();
});

/* ---- EVENT BINDINGS ---- */
function bindEvents() {
  // Language switcher
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
  });

  // Category filters
  document.getElementById("filters").addEventListener("click", e => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.getAttribute("data-category");
    renderProducts();
  });

  // Cart toggle
  document.getElementById("cartToggle").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);

  // Product grid: delegate add-to-cart clicks
  document.getElementById("productGrid").addEventListener("click", e => {
    const addBtn = e.target.closest(".product-card__add");
    if (!addBtn) return;
    const id = parseInt(addBtn.getAttribute("data-id"), 10);
    addToCart(id);
  });

  // Cart items: delegate quantity change / remove
  document.getElementById("cartItems").addEventListener("click", e => {
    if (e.target.classList.contains("cart-item__remove")) {
      const id = parseInt(e.target.getAttribute("data-id"), 10);
      removeFromCart(id);
    }
  });
  document.getElementById("cartItems").addEventListener("change", e => {
    if (e.target.classList.contains("cart-item__qty")) {
      const id = parseInt(e.target.getAttribute("data-id"), 10);
      const qty = parseInt(e.target.value, 10);
      updateCartQty(id, qty);
    }
  });

  // ESC to close cart
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeCart();
  });

  // Mobile nav
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.querySelector(".nav").classList.toggle("nav--open");
  });
}

/* ---- PRODUCT RENDERING ---- */
function renderProducts() {
  const grid = document.getElementById("productGrid");
  const filtered = activeFilter === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state"><p>${t("toast_no_results")}</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const categoryLabel = t(`filter_${p.category}`) || p.category;
    const sizesHTML = p.sizes.map(s => `<span class="size-badge">${s}</span>`).join("");
    return `
      <article class="product-card">
        <img
          class="product-card__image"
          src="${p.image}"
          alt="${p.name} — ${p.desc}"
          loading="lazy"
        >
        <div class="product-card__body">
          <div class="product-card__category">${categoryLabel}</div>
          <h3 class="product-card__name">${p.name}</h3>
          <div class="product-card__price">&euro;${p.price.toFixed(2)}</div>
          <div class="product-card__sizes">${sizesHTML}</div>
        </div>
        <button class="product-card__add" data-id="${p.id}" aria-label="Add ${p.name} to cart">+</button>
      </article>
    `;
  }).join("");

  // Re-translate the filter buttons (their text was set by i18n already — but we just re-set innerHTML for grid)
  // No need to re-translate filters here since we only change the grid
}

/* ---- CART LOGIC ---- */
function loadCart() {
  try {
    const stored = localStorage.getItem("equal_cart");
    cart = stored ? JSON.parse(stored) : [];
  } catch {
    cart = [];
  }
  updateCartUI();
}

function saveCart() {
  localStorage.setItem("equal_cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").textContent = count;

  const itemsContainer = document.getElementById("cartItems");
  const footer = document.getElementById("cartFooter");

  if (cart.length === 0) {
    itemsContainer.innerHTML = `<p class="cart__empty">${t("cart_empty")}</p>`;
    footer.style.display = "none";
    return;
  }

  footer.style.display = "block";

  let total = 0;
  itemsContainer.innerHTML = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return "";
    const lineTotal = product.price * item.qty;
    total += lineTotal;
    return `
      <div class="cart-item">
        <img class="cart-item__image" src="${product.image}" alt="${product.name}">
        <div class="cart-item__info">
          <div class="cart-item__name">${product.name}</div>
          <div class="cart-item__price">&euro;${product.price.toFixed(2)}</div>
          <div class="cart-item__actions">
            <input
              class="cart-item__qty"
              type="number"
              min="1"
              max="20"
              value="${item.qty}"
              data-id="${item.id}"
            >
            <button class="cart-item__remove" data-id="${item.id}">${t("cart_empty") === "Your cart is empty." ? "Remove" : "\u2715"}</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  document.getElementById("cartTotalPrice").textContent = `\u20AC${total.toFixed(2)}`;
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  showToast(t("toast_added"));
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  showToast(t("toast_removed"));
}

function updateCartQty(id, qty) {
  if (qty < 1 || isNaN(qty)) {
    removeFromCart(id);
    return;
  }
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.min(qty, 20);
    saveCart();
  }
}

function openCart() {
  document.getElementById("cartOverlay").classList.add("open");
  document.getElementById("cartSidebar").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartOverlay").classList.remove("open");
  document.getElementById("cartSidebar").classList.remove("open");
  document.body.style.overflow = "";
}

/* ---- TOAST NOTIFICATION ---- */
let toastTimeout;
function showToast(message) {
  // Remove existing toast
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => toast.classList.add("show"));

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  }, 2200);
}
