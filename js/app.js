/* EQUAL — Main application logic (Supabase + static fallback) */

let filter = "all";
let cart = [];
let products = []; // populated at init

/* Init */
document.addEventListener("DOMContentLoaded", async () => {
  loadLang();
  loadCart();
  initSupabase();
  products = await fetchProducts();
  render();
  bindEvents();
});

/* Event bindings */
function bindEvents() {
  document.querySelectorAll(".lang-btn").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
  document.getElementById("filters").addEventListener("click", e => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.cat;
    render();
  });
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });
  document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("nav").classList.toggle("open"));
  document.getElementById("productGrid").addEventListener("click", e => {
    const btn = e.target.closest(".product-card-add");
    if (!btn) return;
    addToCart(+btn.dataset.id);
  });
  document.getElementById("cartBody").addEventListener("click", e => {
    if (e.target.classList.contains("cart-item-remove")) removeFromCart(+e.target.dataset.id);
  });
  document.getElementById("cartBody").addEventListener("change", e => {
    if (e.target.classList.contains("cart-item-qty")) updateQty(+e.target.dataset.id, +e.target.value);
  });
}

/* Render products */
function render() {
  const grid = document.getElementById("productGrid");
  const items = filter === "all" ? products : products.filter(p => p.cat === filter);
  if (!items.length) {
    grid.innerHTML = `<div class="empty-state"><p>${t("toast_empty")}</p></div>`;
    return;
  }
  grid.innerHTML = items.map(p => `
    <div class="product-card">
      <img class="product-card-img" src="${p.img}" alt="${p.name}" loading="lazy">
      <div class="product-card-body">
        <div class="product-card-cat">${t("filter_" + p.cat)}</div>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-price">&euro;${p.price.toFixed(2)}</div>
        <div class="product-card-sizes">${p.sizes.map(s => `<span class="size-badge">${s}</span>`).join("")}</div>
      </div>
      <button class="product-card-add" data-id="${p.id}">+</button>
    </div>
  `).join("");
}

/* Cart */
function loadCart() { try { cart = JSON.parse(localStorage.getItem("equal_cart")) || []; } catch (e) { cart = []; } updateCartUI(); }
function saveCart() { localStorage.setItem("equal_cart", JSON.stringify(cart)); updateCartUI(); }

function getProduct(id) { return products.find(p => p.id === id); }

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cartCount").textContent = count;
  const body = document.getElementById("cartBody");
  const foot = document.getElementById("cartFoot");
  if (!cart.length) { body.innerHTML = `<p class="cart-empty">${t("cart_empty")}</p>`; foot.style.display = "none"; return; }
  foot.style.display = "block";
  let total = 0;
  body.innerHTML = cart.map(item => {
    const p = getProduct(item.id);
    if (!p) return "";
    total += p.price * item.qty;
    return `<div class="cart-item">
      <img class="cart-item-img" src="${p.img}" alt="${p.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-price">&euro;${p.price.toFixed(2)}</div>
        <div class="cart-item-row">
          <input class="cart-item-qty" type="number" min="1" max="20" value="${item.qty}" data-id="${item.id}">
          <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        </div>
      </div>
    </div>`;
  }).join("");
  document.getElementById("cartTotalPrice").textContent = "€" + total.toFixed(2);
}

function addToCart(id) {
  const ex = cart.find(i => i.id === id);
  ex ? ex.qty++ : cart.push({ id, qty: 1 });
  saveCart();
  toast(t("toast_added"));
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  toast(t("toast_removed"));
}

function updateQty(id, qty) {
  if (qty < 1 || isNaN(qty)) { removeFromCart(id); return; }
  const item = cart.find(i => i.id === id);
  if (item) { item.qty = Math.min(qty, 20); saveCart(); }
}

/* Checkout — submit order to Supabase */
async function checkout(name, email) {
  const orderItems = cart.map(item => {
    const p = getProduct(item.id);
    return { id: item.id, qty: item.qty, price: p ? p.price : 0, name: p ? p.name : "Unknown" };
  });
  const result = await submitOrder(orderItems, { name, email });
  if (result.success) {
    cart = [];
    saveCart();
    toast("Order placed! " + (result.demo ? "(Demo mode)" : "Order #" + result.orderId));
    closeCart();
  } else {
    toast("Order failed. Please try again.");
  }
}

/* Attach checkout handler */
document.addEventListener("DOMContentLoaded", () => {
  // Wait a tick for DOM to settle, then attach
  setTimeout(() => {
    const checkoutBtn = document.querySelector(".cart-foot .btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => checkout("Guest", "guest@equal.store"));
    }
  }, 100);
});

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

/* Toast */
let toastTimer;
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.classList.remove("show"); }, 2500);
}
