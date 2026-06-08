const I18N = {
  en: {
    nav_home:"Home", nav_shop:"Shop", nav_about:"About", nav_contact:"Contact",
    hero_title:"Clothing Without Boundaries", hero_subtitle:"Modern, sustainable fashion designed for everyone. No labels, no limits — just great style.", hero_cta:"Shop Now",
    shop_title:"Our Collection",
    filter_all:"All", filter_coats:"Coats", filter_shirts:"Shirts", filter_pants:"Pants", filter_sweaters:"Sweaters", filter_dresses:"Dresses & Skirts", filter_accessories:"Accessories",
    about_title:"Fashion for Everyone", about_p1:"EQUAL believes clothing should express who you are — not what society expects. We design every piece to be worn and loved by anyone, regardless of gender.", about_p2:"Our collections use sustainable materials, ethical production, and timeless designs that transcend categories. Because great style doesn't need a label.",
    stat_neutral:"Gender-Neutral", stat_eco:"Sustainable Materials", stat_ship:"Worldwide Shipping",
    footer_tagline:"Clothing without boundaries.", footer_shop:"Shop", footer_help:"Help", footer_contact:"Contact Us", footer_shipinfo:"Shipping Info", footer_returns:"Returns", footer_faq:"FAQ", footer_news:"Newsletter", footer_news_text:"Get 10% off your first order.", footer_sub:"Subscribe", footer_rights:"All rights reserved.",
    cart_title:"Your Cart", cart_empty:"Your cart is empty.", cart_total:"Total:", cart_checkout:"Checkout",
    toast_added:"Added to cart!", toast_removed:"Removed from cart.", toast_empty:"No products in this category."
  },
  sq: {
    nav_home:"Kreu", nav_shop:"Dyqani", nav_about:"Rreth Nesh", nav_contact:"Kontakt",
    hero_title:"Veshje Pa Kufij", hero_subtitle:"Modë moderne dhe e qëndrueshme për të gjithë. Pa etiketa, pa kufij — thjesht stil i shkëlqyer.", hero_cta:"Shiko Koleksionin",
    shop_title:"Koleksioni Ynë",
    filter_all:"Të gjitha", filter_coats:"Pallto", filter_shirts:"Këmisha", filter_pants:"Pantallona", filter_sweaters:"Triko", filter_dresses:"Fustane & Funde", filter_accessories:"Aksesorë",
    about_title:"Modë për të Gjithë", about_p1:"EQUAL beson se veshja duhet të shprehë atë që je — jo atë që pret shoqëria. Ne projektojmë çdo pjesë që të vishet dhe të dashurohet nga kushdo, pavarësisht gjinisë.", about_p2:"Koleksionet tona përdorin materiale të qëndrueshme, prodhim etik dhe dizajne të përjetshme që tejkalojnë kategoritë. Sepse stili i mirë nuk ka nevojë për etiketë.",
    stat_neutral:"Pa Dallim Gjinie", stat_eco:"Materiale të Qëndrueshme", stat_ship:"Transport Ndërkombëtar",
    footer_tagline:"Veshje pa kufij.", footer_shop:"Dyqani", footer_help:"Ndihmë", footer_contact:"Na Kontaktoni", footer_shipinfo:"Informacion Transporti", footer_returns:"Kthimet", footer_faq:"Pyetje të Shpeshta", footer_news:"Buletini", footer_news_text:"Përfitoni 10% zbritje në porosinë e parë.", footer_sub:"Abonohu", footer_rights:"Të gjitha të drejtat e rezervuara.",
    cart_title:"Shporta Juaj", cart_empty:"Shporta juaj është bosh.", cart_total:"Totali:", cart_checkout:"Porosit",
    toast_added:"U shtua në shportë!", toast_removed:"U hoq nga shporta.", toast_empty:"Asnjë produkt në këtë kategori."
  },
  de: {
    nav_home:"Start", nav_shop:"Shop", nav_about:"Über uns", nav_contact:"Kontakt",
    hero_title:"Kleidung Ohne Grenzen", hero_subtitle:"Moderne, nachhaltige Mode für alle. Keine Etiketten, keine Grenzen — einfach großartiger Stil.", hero_cta:"Jetzt Einkaufen",
    shop_title:"Unsere Kollektion",
    filter_all:"Alle", filter_coats:"Mäntel", filter_shirts:"Hemden", filter_pants:"Hosen", filter_sweaters:"Pullover", filter_dresses:"Kleider & Röcke", filter_accessories:"Accessoires",
    about_title:"Mode für Alle", about_p1:"EQUAL glaubt, dass Kleidung ausdrücken sollte, wer du bist — nicht, was die Gesellschaft erwartet. Jedes Stück wird so gestaltet, dass es von jedem getragen und geliebt werden kann, unabhängig vom Geschlecht.", about_p2:"Unsere Kollektionen verwenden nachhaltige Materialien, ethische Produktion und zeitlose Designs, die Kategorien überwinden. Denn großartiger Stil braucht kein Etikett.",
    stat_neutral:"Geschlechtsneutral", stat_eco:"Nachhaltige Materialien", stat_ship:"Weltweiter Versand",
    footer_tagline:"Kleidung ohne Grenzen.", footer_shop:"Shop", footer_help:"Hilfe", footer_contact:"Kontaktiere uns", footer_shipinfo:"Versandinformationen", footer_returns:"Rücksendungen", footer_faq:"FAQ", footer_news:"Newsletter", footer_news_text:"Erhalte 10% Rabatt auf deine erste Bestellung.", footer_sub:"Abonnieren", footer_rights:"Alle Rechte vorbehalten.",
    cart_title:"Dein Warenkorb", cart_empty:"Dein Warenkorb ist leer.", cart_total:"Gesamt:", cart_checkout:"Zur Kasse",
    toast_added:"Zum Warenkorb hinzugefügt!", toast_removed:"Aus dem Warenkorb entfernt.", toast_empty:"Keine Produkte in dieser Kategorie."
  }
};

let LANG = "en";
function setLang(l) { if(!I18N[l]) return; LANG=l; localStorage.setItem("equal_lang",l); applyLang(); updateLangBtns(); }
function t(k) { return I18N[LANG]?.[k] || I18N.en[k] || k; }

function applyLang() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(el => { const k=el.getAttribute("data-i18n"); if(I18N[LANG][k]) el.textContent=I18N[LANG][k]; });
}

function updateLangBtns() {
  document.querySelectorAll(".lang-btn").forEach(b => b.classList.toggle("active", b.dataset.lang===LANG));
}

function loadLang() {
  const s = localStorage.getItem("equal_lang");
  if(s && I18N[s]) LANG=s;
  applyLang(); updateLangBtns();
}
