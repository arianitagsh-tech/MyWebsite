/* Supabase client — loads CDN dynamically, falls back to static data */

let supabase = null;
let useSupabase = false;

async function initSupabase() {
  // Only attempt Supabase if anon key is configured
  if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === "YOUR_ANON_KEY_HERE") {
    console.log("Using static data (anon key not configured)");
    return false;
  }

  // Dynamically load the Supabase CDN
  try {
    await loadScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js");
  } catch (e) {
    console.warn("Supabase CDN failed to load, using static data:", e.message);
    return false;
  }

  if (typeof window.supabaseCreateClient === "undefined") {
    console.warn("Supabase client not available, using static data");
    return false;
  }

  try {
    supabase = window.supabaseCreateClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    useSupabase = true;
    console.log("Supabase connected");
    return true;
  } catch (e) {
    console.error("Supabase init failed:", e);
    return false;
  }
}

/* Dynamic script loader */
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = url;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Failed to load " + url));
    document.head.appendChild(s);
  });
}

/* ---- Products ---- */
async function fetchProducts() {
  if (!useSupabase) return PRODUCTS;
  try {
    const { data, error } = await supabase.from("products").select("*").order("id");
    if (error) throw error;
    if (!data || data.length === 0) return PRODUCTS;
    return data.map(p => ({
      id: p.id, name: p.name, cat: p.category,
      price: Number(p.price), sizes: p.sizes || [],
      img: p.image_url, description: p.description
    }));
  } catch (e) {
    console.warn("Supabase fetch failed, using static data:", e.message);
    return PRODUCTS;
  }
}

/* ---- Orders ---- */
async function submitOrder(cartItems, customer) {
  if (!useSupabase) {
    console.log("Order (demo):", cartItems.length + " items");
    return { success: true, demo: true };
  }
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const { data: order, error: oerr } = await supabase.from("orders")
    .insert({ customer_name: customer.name || "Guest", customer_email: customer.email || "", total, status: "pending" })
    .select().single();
  if (oerr) return { success: false, error: oerr };
  const items = cartItems.map(i => ({ order_id: order.id, product_id: i.id, quantity: i.qty, price: i.price }));
  const { error: ierr } = await supabase.from("order_items").insert(items);
  if (ierr) return { success: false, error: ierr };
  return { success: true, orderId: order.id };
}

/* ---- Contact ---- */
async function submitContact(name, email, message) {
  if (!useSupabase) return { success: true, demo: true };
  const { error } = await supabase.from("contact_messages").insert({ name, email, message });
  if (error) return { success: false, error };
  return { success: true };
}
