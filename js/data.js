/* ================================================================
   Product Data — 18 gender-neutral clothing items across 6 categories
   Each product has a unique ID, name, category, price, sizes, and
   a description used for alt text / accessibility.
   All imagery uses picsum.photos placeholders (no real products).
   ================================================================ */

const PRODUCTS = [
  // ---- COATS ----
  {
    id: 1,
    name: "Oversized Wool Coat",
    category: "coats",
    price: 189.00,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=667&fit=crop",
    desc: "Heavy wool-blend coat with dropped shoulders and a relaxed silhouette."
  },
  {
    id: 2,
    name: "Classic Trench Coat",
    category: "coats",
    price: 165.00,
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=500&h=667&fit=crop",
    desc: "Water-resistant cotton twill trench with removable belt and storm flaps."
  },
  {
    id: 3,
    name: "Quilted Utility Jacket",
    category: "coats",
    price: 135.00,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=667&fit=crop",
    desc: "Lightweight quilted jacket with oversized pockets and snap closures."
  },

  // ---- SHIRTS ----
  {
    id: 4,
    name: "Linen Button-Up",
    category: "shirts",
    price: 72.00,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=667&fit=crop",
    desc: "Breathable stonewashed linen with a relaxed collar and chest pocket."
  },
  {
    id: 5,
    name: "Organic Cotton Tee",
    category: "shirts",
    price: 38.00,
    sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=667&fit=crop",
    desc: "Heavyweight 220 GSM organic cotton. Pre-shrunk, boxy fit."
  },
  {
    id: 6,
    name: "Oversized Oxford Shirt",
    category: "shirts",
    price: 84.00,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1598033129183-c4f50dac7c9c?w=500&h=667&fit=crop",
    desc: "Brushed cotton oxford with a generous cut. Perfect layered or solo."
  },

  // ---- PANTS ----
  {
    id: 7,
    name: "Wide-Leg Trousers",
    category: "pants",
    price: 98.00,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=667&fit=crop",
    desc: "High-waisted wide-leg trousers in drapey TENCEL™ Lyocell."
  },
  {
    id: 8,
    name: "Cargo Pants",
    category: "pants",
    price: 92.00,
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=667&fit=crop",
    desc: "Relaxed-fit cotton twill cargos with large flap pockets and drawstring hem."
  },
  {
    id: 9,
    name: "Elasticated Chinos",
    category: "pants",
    price: 78.00,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=667&fit=crop",
    desc: "Stretch cotton chinos with a hidden elastic waistband for all-day comfort."
  },

  // ---- SWEATERS ----
  {
    id: 10,
    name: "Chunky Knit Sweater",
    category: "sweaters",
    price: 115.00,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=667&fit=crop",
    desc: "Heavy-gauge alpaca-blend knit with a cozy funnel neck."
  },
  {
    id: 11,
    name: "Half-Zip Pullover",
    category: "sweaters",
    price: 94.00,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=667&fit=crop",
    desc: "Brushed fleece mock-neck with quarter zip and kangaroo pocket."
  },
  {
    id: 12,
    name: "Fine Merino Crewneck",
    category: "sweaters",
    price: 128.00,
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a20?w=500&h=667&fit=crop",
    desc: "Extra-fine merino wool in a classic crewneck. Lightweight, not bulky."
  },

  // ---- DRESSES & SKIRTS ----
  {
    id: 13,
    name: "Wrap Dress",
    category: "dresses",
    price: 110.00,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=667&fit=crop",
    desc: "Adjustable wrap dress in fluid TENCEL™ with a self-tie belt."
  },
  {
    id: 14,
    name: "Midi Skirt",
    category: "dresses",
    price: 82.00,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1583496661160-fb59e8146acf?w=500&h=667&fit=crop",
    desc: "A-line midi skirt in heavyweight crinkle viscose. Elastic back waist."
  },
  {
    id: 15,
    name: "Shirt Dress",
    category: "dresses",
    price: 105.00,
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1591369822096-ffd6890ab674?w=500&h=667&fit=crop",
    desc: "Poplin shirt dress with a relaxed fit. Wear open as a jacket or buttoned."
  },

  // ---- ACCESSORIES ----
  {
    id: 16,
    name: "Canvas Tote Bag",
    category: "accessories",
    price: 34.00,
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&h=667&fit=crop",
    desc: "Heavy-duty organic cotton tote with reinforced handles and inner pocket."
  },
  {
    id: 17,
    name: "Ribbed Beanie",
    category: "accessories",
    price: 26.00,
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&h=667&fit=crop",
    desc: "Chunky rib-knit beanie in RWS-certified merino wool."
  },
  {
    id: 18,
    name: "Woven Scarf",
    category: "accessories",
    price: 42.00,
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1520903920243-00d22f015bba?w=500&h=667&fit=crop",
    desc: "Oversized woven scarf in a wool-modal blend. Finished with short fringe."
  }
];
