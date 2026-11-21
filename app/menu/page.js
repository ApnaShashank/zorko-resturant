'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  ChevronLeft,
  Search,
  Sparkles,
  Star
} from 'lucide-react';
import {
  VegBadge,
  BestsellerBadge,
  MustTryBadge,
  PriceTag,
  VegStamp
} from '../components/Stickers';

const OFFICIAL_LOGO = 'https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png';
const PHONE_NUMBER = '+91 92781 40402';
const TEL_LINK = 'tel:+919278140402';

// 100% Unaltered Menu Data
const menuData = {
  burgers: {
    title: 'Burgers',
    photo: '/images/food/burger.webp',
    items: [
      { name: 'Mexican King Burger', desc: 'Loaded burger with Mexican sauces & crunchy veggies', price: '₹89', best: true },
      { name: 'Spicy Salsa Barbeque Burger', desc: 'Spicy + smoky barbeque flavor', price: '₹79' },
      { name: 'Korean Burger', desc: 'Korean spicy taste with special sauce', price: '₹69', spice: true },
      { name: 'Double Tikki Burger', desc: 'Double crispy tikki burger', price: '₹79' },
      { name: 'Classic OG Burger', desc: 'Classic simple burger', price: '₹49' },
      { name: 'Royal Paneer Grilled Burger', desc: 'Premium paneer grilled burger', price: '₹139' },
    ],
    addons: ['Add Cheese Slice → ₹15', 'Double Cheese Slice → ₹30', 'Grill Any Burger → ₹30']
  },
  fries: {
    title: 'French Fries',
    photo: '/images/food/peri-peri-fries.webp',
    items: [
      { name: 'Peri Peri French Fries', desc: 'Peri peri masala loaded fries', price: '₹99', best: true },
      { name: 'Salted French Fries', desc: 'Classic salted fries', price: '₹79' },
      { name: 'Korean Cheesy Fries', desc: 'Cheese + Korean flavor fries', price: '₹149' },
      { name: 'Sizzling Italian Fries', desc: 'Italian style loaded fries', price: '₹159' },
    ],
    addons: ['Cheese Dip → ₹40']
  },
  wraps: {
    title: 'Veg Wraps',
    photo: '/images/food/veg-wrap.webp',
    items: [
      { name: 'Mexican Salsa Wrap', desc: 'Mexican filling with salsa', price: '₹129' },
      { name: 'Classic Veg Wrap', desc: 'Veggie loaded wrap', price: '₹109' },
      { name: 'Grilled Paneer Wrap', desc: 'Paneer grilled special wrap', price: '₹149', best: true },
    ],
    addons: ['Add Cheese → ₹30']
  },
  pizza: {
    title: 'Pizzas',
    photo: '/images/food/pizza.webp',
    items: [
      { name: 'Veg Exotica Pizza', desc: 'Loaded exotic veggie pizza', price: '₹159', best: true },
      { name: 'Paneer Barbeque Pizza', desc: 'Paneer + BBQ flavor pizza', price: '₹189' },
      { name: 'Hot To Hell Pizza', desc: 'Extra spicy pizza', price: '₹149', spice: true },
      { name: 'Pizza Di Sicilia', desc: 'Italian style pizza', price: '₹129' },
      { name: 'Margherita Pizza', desc: 'Classic cheese pizza', price: '₹99' },
      { name: 'The Xplod (Cheese Burst)', desc: 'Cheese burst special pizza', price: '₹169' },
      { name: 'Golden Harvest Pizza', desc: 'Veggie loaded pizza', price: '₹109' },
      { name: 'Four Cheese Pizza', desc: '4 cheese combination pizza', price: '₹169' },
      { name: 'Korean Pizza', desc: 'Korean flavor special pizza', price: '₹159' },
    ],
    addons: ['Add Double Cheese → ₹40']
  },
  sandwich: {
    title: 'Grilled Sandwiches',
    photo: '/images/food/grilled-sandwich.webp',
    items: [
      { name: 'Veg Mexican Sandwich', desc: 'Mexican flavored sandwich', price: '₹139' },
      { name: 'Paneer Maharaja Sandwich', desc: 'Paneer loaded sandwich', price: '₹149' },
      { name: 'Veggie Mumbai Grilled Sandwich', desc: 'Mumbai street style sandwich', price: '₹109' },
      { name: 'Cheese Chilli Sandwich', desc: 'Cheese + chilli flavor sandwich', price: '₹129', best: true },
    ],
    addons: ['Add Cheese → ₹30']
  },
  'garlic-bread': {
    title: 'Garlic Bread',
    photo: '/images/food/garlic-bread.webp',
    items: [
      { name: 'Cheese Garlic Bread', desc: 'Classic cheesy bread', price: '₹89' },
      { name: 'Supreme Treat Garlic Bread', desc: 'With toppings & cheese', price: '₹99' },
      { name: 'Paneer Toofani Garlic Bread', desc: 'Spicy paneer topping', price: '₹119', best: true },
    ],
    addons: ['Add Cheese → ₹30']
  },
  mojitos: {
    title: 'Mojitos',
    photo: '/images/food/blue-mojito.webp',
    note: 'All Mojitos → ₹49',
    items: [
      { name: 'Surprise Mojito', best: true, price: '₹49' },
      { name: 'Korean Mojito', price: '₹49' },
      { name: 'Strawberry Mojito', price: '₹49' },
      { name: 'Tangy Mango Mojito', price: '₹49' },
      { name: 'Pineapple Punch Mojito', price: '₹49' },
      { name: 'Mary Litchi Mojito', price: '₹49' },
      { name: 'Mint Mojito', price: '₹49' },
      { name: 'Orange Cinderella Mojito', price: '₹49' },
      { name: 'Blue Heaven Mojito', best: true, price: '₹49' },
      { name: 'Rose Petal Mojito', price: '₹49' },
      { name: 'Cranberry Mojito', price: '₹49' },
      { name: 'Passion Mojito', price: '₹49' },
      { name: 'Peach Mojito', price: '₹49' },
    ],
    addons: ['Add Float → ₹30', 'Add Injector → ₹30']
  },
  'cold-coffee': {
    title: 'Cold Coffee',
    photo: '/images/food/cold-coffee.webp',
    items: [
      { name: 'Premium Cold Coffee', price: '₹49', best: true },
      { name: 'Strong Cold Coffee', price: '₹59' },
      { name: 'Chocolate Cold Coffee', price: '₹79' },
    ],
    addons: ['Add Ice Cream Scoop → ₹25']
  },
  milkshakes: {
    title: 'Milkshakes',
    photo: '/images/food/chocolate-shake.webp',
    items: [
      { name: 'Oreo Chocolate Shake', price: '₹99' },
      { name: 'Rose Delight Shake', price: '₹79' },
      { name: 'Strawberry Shake', price: '₹79' },
      { name: 'KitKat Chocolate Shake', price: '₹109' },
      { name: 'Brownie Blast Shake', price: '₹119', best: true },
    ],
    addons: ['Add Ice Cream Scoop → ₹25']
  },
  momos: {
    title: 'Momos',
    items: [
      { name: 'Steam Momos', desc: 'Steamed veg momos', price: '₹89' },
      { name: 'Fried Momos', desc: 'Crispy fried momos', price: '₹89' },
      { name: 'Cheese Melting Gravy Momos', desc: 'Cheesy gravy loaded momos', price: '₹159', best: true },
    ]
  },
  kulhad: {
    title: 'Kulhad Specials',
    items: [
      { name: 'Cheese Volcano Kulhad Momos', desc: 'Kulhad served cheesy momos', price: '₹149' },
      { name: 'Cheese Loaded Kulhad Pizza', desc: 'Pizza served in kulhad style', price: '₹149' },
      { name: 'Cheese Chatori Kulhad Maggi', desc: 'Cheese loaded kulhad maggi', price: '₹149', best: true },
    ]
  },
  pasta: {
    title: 'Pasta',
    note: 'Regular → ₹139 | Baked → ₹169',
    items: [
      { name: 'Alfredo Pasta', desc: 'Creamy white sauce pasta', price: 'R:139 | B:169' },
      { name: 'Arrabbiata Pasta', desc: 'Spicy red sauce pasta', price: 'R:139 | B:169' },
      { name: 'Ala Rosey Pasta', desc: 'Pink sauce creamy pasta', price: 'R:139 | B:169', best: true },
      { name: 'Peri Peri Pasta', desc: 'Peri peri spicy pasta', price: 'R:139 | B:169' },
    ]
  },
  'special-buns': {
    title: 'Special Buns',
    items: [
      { name: 'Cheese Pull & Tear Garlic Bun', desc: 'Cheesy garlic bun', price: '₹149', best: true },
      { name: 'Korean Jalapeno Bun', desc: 'Korean spicy bun', price: '₹149' },
    ]
  },
  toasties: {
    title: 'Toasties',
    items: [
      { name: 'Korean Spicy Paneer', price: '₹89' },
      { name: 'Peri Peri Cheese Blast', price: '₹99' },
      { name: 'Italian Treat', price: '₹79' },
    ]
  },
  nachos: {
    title: 'Nachos',
    items: [
      { name: 'Cheesy Delight Nachos', price: '₹129' },
      { name: 'Nachos with Cheese Dip', price: '₹79' },
      { name: 'Nachos & Salsa', price: '₹149', best: true },
    ]
  },
  maggi: {
    title: 'Maggi',
    items: [
      { name: 'Veg Masala Maggi', price: '₹79' },
      { name: 'Hot Passion Spicy Maggi', price: '₹69', spice: true },
      { name: 'Double Masala Maggi', price: '₹59' },
      { name: 'Cheese Chatori Maggi', price: '₹99', best: true },
    ],
    addons: ['Add Cheese → ₹30', 'Add Butter → ₹10']
  },
  'ice-tea': {
    title: 'Ice Tea',
    note: 'All → ₹49',
    items: [
      { name: 'Lemon Ice Tea', price: '₹49' },
      { name: 'Peach Ice Tea', price: '₹49' },
      { name: 'Passion Fruit Ice Tea', price: '₹49' },
      { name: 'Cranberry Ice Tea', price: '₹49' },
      { name: 'American Blue Ice Tea', price: '₹49', best: true },
    ]
  },
  'hot-beverages': {
    title: 'Hot Beverages',
    items: [
      { name: 'Hot Coffee', price: '₹29' },
      { name: 'Hot Chocolate', price: '₹39', best: true },
    ]
  },
  desserts: {
    title: 'Desserts',
    items: [
      { name: 'Sizzling Brownie', price: '₹149' },
      { name: 'Special Kulhad Chocolaty Mud Pie', price: '₹199', best: true },
    ]
  },
  combos: {
    title: 'Value Combos',
    items: [
      { name: 'Classic OG Burger + Any Mojito/Ice Tea', price: '₹69' },
      { name: 'Pizza Di Sicilia + Any Mojito/Ice Tea', price: '₹149' },
      { name: 'Any Toastie + French Fries + Any Mojito/Ice Tea', price: '₹199' },
      { name: 'Any Kulhad + Any Mojito/Ice Tea', price: '₹169' },
      { name: 'Any Pizza + Any Mojito/Ice Tea', price: '₹199' },
      { name: '3 Any Mojito/Ice Tea', price: '₹99', best: true },
      { name: 'Korean Burger + French Fries + Any Mojito/Ice Tea', price: '₹149' },
      { name: 'Any Grilled Sandwich + Any Mojito/Ice Tea', price: '₹169' },
      { name: '2 Premium Cold Coffee', price: '₹89' },
    ]
  },
  'make-a-meal': {
    title: 'Make a Meal',
    items: [
      { name: 'French Fries + Any Mojito/Ice Tea', price: '₹99' },
      { name: 'Garlic Bread + Any Mojito/Ice Tea', price: '₹109' },
    ],
    note: 'Add ₹10 → Replace Mojito with Cold Coffee'
  }
};

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  return (
    <div style={{ backgroundColor: '#FFF6EC', minHeight: '100vh', color: '#211712' }}>
      {/* Top Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 99,
          backgroundColor: '#FFF6EC',
          borderBottom: '2px solid #211712',
          boxShadow: '0 4px 0 #211712',
          padding: '12px 20px'
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/" className="btn-pill btn-pill-cream" style={{ minHeight: '38px', padding: '6px 14px', fontSize: '13px' }}>
              <ChevronLeft size={16} />
              <span>Home</span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src={OFFICIAL_LOGO} alt="Zorko" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid #211712' }} />
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '800', lineHeight: 1.1 }}>
                  ZORKO JIYANPUR
                </h1>
                <span style={{ fontSize: '11px', color: '#EE7F1A', fontWeight: '700' }}>Complete Menu</span>
              </div>
            </div>
          </div>

          <a href={TEL_LINK} className="btn-pill btn-pill-orange" style={{ minHeight: '38px', padding: '6px 16px', fontSize: '13px' }}>
            <Phone size={14} />
            <span>Call: {PHONE_NUMBER}</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 20px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <VegStamp style={{ marginBottom: '12px' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px' }}>
            Full Café Menu
          </h2>
          <p style={{ fontSize: '15px', color: '#6B584C', maxWidth: '600px', margin: '0 auto' }}>
            Doharighat Road, near Hydel, Jiyanpur. Open daily 11:00 AM – 10:00 PM. Dine-in café & takeaway inquiries welcome!
          </p>
        </div>

        {/* Search Input */}
        <div style={{ maxWidth: '500px', margin: '0 auto 32px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6B584C' }} />
          <input
            type="text"
            placeholder="Search pizza, burger, mojito, shake..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 44px',
              borderRadius: '9999px',
              border: '2px solid #211712',
              boxShadow: '4px 4px 0 #211712',
              fontSize: '15px',
              fontFamily: 'var(--font-body)',
              outline: 'none',
              backgroundColor: '#FFFFFF',
              color: '#211712'
            }}
          />
        </div>

        {/* Category Filter Chips */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '32px' }}>
          <button
            onClick={() => setSelectedCat('all')}
            className={`btn-pill ${selectedCat === 'all' ? 'btn-pill-orange' : 'btn-pill-cream'}`}
            style={{ minHeight: '36px', padding: '6px 16px', fontSize: '13px' }}
          >
            All Categories
          </button>
          {Object.keys(menuData).map((catKey) => (
            <button
              key={catKey}
              onClick={() => setSelectedCat(catKey)}
              className={`btn-pill ${selectedCat === catKey ? 'btn-pill-orange' : 'btn-pill-cream'}`}
              style={{ minHeight: '36px', padding: '6px 16px', fontSize: '13px', whiteSpace: 'nowrap' }}
            >
              {menuData[catKey].title}
            </button>
          ))}
        </div>

        {/* Category Sections */}
        {Object.keys(menuData)
          .filter(catKey => selectedCat === 'all' || selectedCat === catKey)
          .map((catKey) => {
            const cat = menuData[catKey];
            const matchingItems = cat.items.filter(item =>
              searchTerm === '' ||
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (item.desc && item.desc.toLowerCase().includes(searchTerm.toLowerCase()))
            );

            if (matchingItems.length === 0) return null;

            return (
              <section key={catKey} style={{ marginBottom: '48px' }}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #211712',
                    borderRadius: '20px',
                    padding: '16px 24px',
                    marginBottom: '20px',
                    boxShadow: '4px 4px 0 #211712',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {cat.photo && (
                      <img src={cat.photo} alt={cat.title} style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '10px' }} />
                    )}
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800', textTransform: 'uppercase' }}>
                        {cat.title}
                      </h3>
                      {cat.note && (
                        <p style={{ fontSize: '13px', fontWeight: '700', color: '#EE7F1A' }}>
                          ✦ {cat.note}
                        </p>
                      )}
                    </div>
                  </div>
                  <a href={TEL_LINK} className="btn-pill btn-pill-ink" style={{ minHeight: '36px', padding: '6px 14px', fontSize: '12px' }}>
                    <Phone size={13} />
                    <span>Call Karein</span>
                  </a>
                </div>

                <div className="menu-grid-container">
                  {matchingItems.map((item, idx) => (
                    <div key={idx} className="menu-item-row">
                      <div>
                        <div className="menu-item-header">
                          <div className="menu-item-title-wrap">
                            <VegBadge size={14} />
                            <h4 className="menu-item-title">{item.name}</h4>
                          </div>
                          {item.best && <BestsellerBadge style={{ fontSize: '10px', padding: '3px 8px' }} />}
                        </div>
                        {item.desc && <p className="menu-item-desc">{item.desc}</p>}
                      </div>
                      <div className="menu-item-footer">
                        <span className="menu-price-text">{item.price}</span>
                        <a href={TEL_LINK} style={{ color: '#EE7F1A', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontSize: '12px', fontWeight: '800' }}>
                          <Phone size={13} />
                          <span>Inquire</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {cat.addons && (
                  <div
                    style={{
                      marginTop: '20px',
                      backgroundColor: '#FFF0D6',
                      border: '2px dashed #211712',
                      borderRadius: '16px',
                      padding: '12px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: '800' }}>
                      ➕ ADD-ONS:
                    </span>
                    {cat.addons.map((add, i) => (
                      <span key={i} style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #211712', padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '700' }}>
                        {add}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
      </main>

      {/* Floating Call Button */}
      <a href={TEL_LINK} className="floating-mobile-call" aria-label="Call Zorko Jiyanpur">
        <Phone size={24} strokeWidth={1.8} />
      </a>
    </div>
  );
}
