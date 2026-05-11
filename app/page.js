'use client';

import { useState, useEffect, useRef } from 'react';

// ─── Menu Data ───
const menuData = {
  burgers: {
    icon: 'https://img.icons8.com/color/48/hamburger.png',
    items: [
      { name: 'Mexican King Burger', desc: 'Loaded burger with Mexican sauces & crunchy veggies', price: '₹89', best: true },
      { name: 'Spicy Salsa Barbeque Burger', desc: 'Spicy + smoky barbeque flavor', price: '₹79' },
      { name: 'Korean Burger 🌶️', desc: 'Korean spicy taste with special sauce', price: '₹69', spice: true },
      { name: 'Double Tikki Burger', desc: 'Double crispy tikki burger', price: '₹79' },
      { name: 'Classic OG Burger', desc: 'Classic simple burger', price: '₹49' },
      { name: 'Royal Paneer Grilled Burger', desc: 'Premium paneer grilled burger', price: '₹139' },
    ],
    addons: ['Add Cheese Slice → ₹15', 'Double Cheese Slice → ₹30', 'Grill Any Burger → ₹30']
  },
  fries: {
    icon: 'https://img.icons8.com/color/48/french-fries.png',
    items: [
      { name: 'Peri Peri French Fries', desc: 'Peri peri masala loaded fries', price: '₹99' },
      { name: 'Salted French Fries', desc: 'Classic salted fries', price: '₹79' },
      { name: 'Korean Cheesy Fries', desc: 'Cheese + Korean flavor fries', price: '₹149' },
      { name: 'Sizzling Italian Fries', desc: 'Italian style loaded fries', price: '₹159' },
    ],
    addons: ['Cheese Dip → ₹40']
  },
  wraps: {
    icon: 'https://img.icons8.com/fluency/48/burrito.png',
    items: [
      { name: 'Mexican Salsa Wrap', desc: 'Mexican filling with salsa', price: '₹129' },
      { name: 'Classic Veg Wrap', desc: 'Veggie loaded wrap', price: '₹109' },
      { name: 'Grilled Paneer Wrap', desc: 'Paneer grilled special wrap', price: '₹149', best: true },
    ],
    addons: ['Add Cheese → ₹30']
  },
  pizza: {
    icon: 'https://img.icons8.com/color/48/pizza.png',
    items: [
      { name: 'Veg Exotica Pizza', desc: 'Loaded exotic veggie pizza', price: '₹159', best: true },
      { name: 'Paneer Barbeque Pizza', desc: 'Paneer + BBQ flavor pizza', price: '₹189' },
      { name: 'Hot To Hell Pizza 🌶️', desc: 'Extra spicy pizza', price: '₹149', spice: true },
      { name: 'Pizza Di Sicilia', desc: 'Italian style pizza', price: '₹129' },
      { name: 'Margherita Pizza', desc: 'Classic cheese pizza', price: '₹99' },
      { name: 'The Xplod (Cheese Burst)', desc: 'Cheese burst special pizza', price: '₹169' },
      { name: 'Golden Harvest Pizza', desc: 'Veggie loaded pizza', price: '₹109' },
      { name: 'Four Cheese Pizza', desc: '4 cheese combination pizza', price: '₹169' },
      { name: 'Korean Pizza', desc: 'Korean flavor special pizza', price: '₹159' },
    ],
    addons: ['Add Double Cheese → ₹40']
  },
  momos: {
    icon: 'https://img.icons8.com/color/48/dumplings.png',
    items: [
      { name: 'Steam Momos', desc: 'Steamed veg momos', price: '₹89' },
      { name: 'Fried Momos', desc: 'Crispy fried momos', price: '₹89' },
      { name: 'Cheese Melting Gravy Momos', desc: 'Cheesy gravy loaded momos', price: '₹159', best: true },
    ]
  },
  kulhad: {
    icon: 'https://img.icons8.com/color/48/tea-cup.png',
    items: [
      { name: 'Cheese Volcano Kulhad Momos', desc: 'Kulhad served cheesy momos', price: '₹149' },
      { name: 'Cheese Loaded Kulhad Pizza', desc: 'Pizza served in kulhad style', price: '₹149' },
      { name: 'Cheese Chatori Kulhad Maggi', desc: 'Cheese loaded kulhad maggi', price: '₹149', best: true },
    ]
  },
  sandwich: {
    icon: 'https://img.icons8.com/color/48/sandwich.png',
    items: [
      { name: 'Veg Mexican Sandwich', desc: 'Mexican flavored sandwich', price: '₹139' },
      { name: 'Paneer Maharaja Sandwich', desc: 'Paneer loaded sandwich', price: '₹149' },
      { name: 'Veggie Mumbai Grilled Sandwich', desc: 'Mumbai street style sandwich', price: '₹109' },
      { name: 'Cheese Chilli Sandwich', desc: 'Cheese + chilli flavor sandwich', price: '₹129', best: true },
    ],
    addons: ['Add Cheese → ₹30']
  },
  pasta: {
    icon: 'https://img.icons8.com/color/48/spaghetti.png',
    note: 'Regular → ₹139 | Baked → ₹169',
    items: [
      { name: 'Alfredo Pasta', desc: 'Creamy white sauce pasta', price: 'R:139 | B:169' },
      { name: 'Arrabbiata Pasta', desc: 'Spicy red sauce pasta', price: 'R:139 | B:169' },
      { name: 'Ala Rosey Pasta', desc: 'Pink sauce creamy pasta', price: 'R:139 | B:169', best: true },
      { name: 'Peri Peri Pasta', desc: 'Peri peri spicy pasta', price: 'R:139 | B:169' },
    ]
  },
  'garlic-bread': {
    icon: 'https://img.icons8.com/color/48/baguette.png',
    items: [
      { name: 'Cheese Garlic Bread', desc: 'Classic cheesy bread', price: '₹89' },
      { name: 'Supreme Treat Garlic Bread', desc: 'With toppings & cheese', price: '₹99' },
      { name: 'Paneer Toofani Garlic Bread', desc: 'Spicy paneer topping', price: '₹119' },
    ],
    addons: ['Add Cheese → ₹30']
  },
  'special-buns': {
    icon: 'https://img.icons8.com/color/48/bread.png',
    items: [
      { name: 'Cheese Pull & Tear Garlic Bun', desc: 'Cheesy garlic bun', price: '₹149', best: true },
      { name: 'Korean Jalapeno Bun', desc: 'Korean spicy bun', price: '₹149' },
    ]
  },
  toasties: {
    icon: 'https://img.icons8.com/fluency/48/toast.png',
    items: [
      { name: 'Korean Spicy Paneer', price: '₹89' },
      { name: 'Peri Peri Cheese Blast', price: '₹99' },
      { name: 'Italian Treat', price: '₹79' },
    ]
  },
  nachos: {
    icon: 'https://img.icons8.com/color/48/nachos.png',
    items: [
      { name: 'Cheesy Delight Nachos', price: '₹129' },
      { name: 'Nachos with Cheese Dip', price: '₹79' },
      { name: 'Nachos & Salsa', price: '₹149', best: true },
    ]
  },
  maggi: {
    icon: 'https://img.icons8.com/color/48/noodles.png',
    items: [
      { name: 'Veg Masala Maggi', price: '₹79' },
      { name: 'Hot Passion Spicy Maggi 🌶️', price: '₹69' },
      { name: 'Double Masala Maggi', price: '₹59' },
      { name: 'Cheese Chatori Maggi', price: '₹99', best: true },
    ],
    addons: ['Add Cheese → ₹30', 'Add Butter → ₹10']
  },
  'cold-coffee': {
    icon: 'https://img.icons8.com/color/48/iced-coffee.png',
    items: [
      { name: 'Premium Cold Coffee', price: '₹49', best: true },
      { name: 'Strong Cold Coffee', price: '₹59' },
      { name: 'Chocolate Cold Coffee', price: '₹79' },
    ],
    addons: ['Add Ice Cream Scoop → ₹25']
  },
  mojitos: {
    icon: 'https://img.icons8.com/color/48/cocktail.png',
    note: 'All Mojitos → ₹49',
    items: [
      { name: 'Surprise Mojito', best: true },
      { name: 'Korean Mojito 🌶️' },
      { name: 'Strawberry Mojito' },
      { name: 'Tangy Mango Mojito' },
      { name: 'Pineapple Punch Mojito' },
      { name: 'Mary Litchi Mojito' },
      { name: 'Mint Mojito' },
      { name: 'Orange Cinderella Mojito' },
      { name: 'Blue Heaven Mojito', best: true },
      { name: 'Rose Petal Mojito' },
      { name: 'Cranberry Mojito' },
      { name: 'Passion Mojito' },
      { name: 'Peach Mojito' },
    ],
    addons: ['Add Float → ₹30', 'Add Injector → ₹30']
  },
  milkshakes: {
    icon: 'https://img.icons8.com/color/48/milkshake.png',
    items: [
      { name: 'Oreo Chocolate Shake', price: '₹99' },
      { name: 'Rose Delight Shake', price: '₹79' },
      { name: 'Strawberry Shake', price: '₹79' },
      { name: 'KitKat Chocolate Shake', price: '₹109' },
      { name: 'Brownie Blast Shake', price: '₹119', best: true },
    ],
    addons: ['Add Ice Cream Scoop → ₹25']
  },
  'ice-tea': {
    icon: 'https://img.icons8.com/fluency/48/tea.png',
    note: 'All → ₹49',
    items: [
      { name: 'Lemon Ice Tea' },
      { name: 'Peach Ice Tea' },
      { name: 'Passion Fruit Ice Tea' },
      { name: 'Cranberry Ice Tea' },
      { name: 'American Blue Ice Tea', best: true },
    ]
  },
  'hot-beverages': {
    icon: 'https://img.icons8.com/color/48/coffee.png',
    items: [
      { name: 'Hot Coffee', price: '₹29' },
      { name: 'Hot Chocolate', price: '₹39', best: true },
    ]
  },
  desserts: {
    icon: 'https://img.icons8.com/color/48/cake.png',
    items: [
      { name: 'Sizzling Brownie', price: '₹149' },
      { name: 'Special Kulhad Chocolaty Mud Pie', price: '₹199', best: true },
    ]
  },
  combos: {
    icon: 'https://img.icons8.com/fluency/48/fast-food.png',
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
    icon: 'https://img.icons8.com/fluency/48/meal.png',
    items: [
      { name: 'French Fries + Any Mojito/Ice Tea', price: '₹99' },
      { name: 'Garlic Bread + Any Mojito/Ice Tea', price: '₹109' },
    ],
    note: '🔥 Add ₹10 → Replace Mojito with Cold Coffee'
  }
};

// ─── Showcase Data ───
const showcaseItems = [
  { emoji: '🍔', bg: '#1a1a1a', label: 'Smash Burgers' },
  { emoji: '🥪', bg: '#1a1a1a', label: 'Loaded Subs' },
  { emoji: '🥤', bg: '#1a1a1a', label: 'Fresh Mojitos' },
  { emoji: '🧁', bg: '#1a1a1a', label: 'Sweet Treats' },
  { emoji: '🍟', bg: '#1a1a1a', label: 'Crispy Fries' },
  { emoji: '🌮', bg: '#1a1a1a', label: 'Tacos & Wraps' },
  { emoji: '🍕', bg: '#1a1a1a', label: 'Cheesy Pizza' },
  { emoji: '🍩', bg: '#1a1a1a', label: 'Doughnuts' },
];

// ─── Reviews Data ───
const reviews = [
  { name: 'Shashank Gupta', initial: 'S', text: 'Zorko Restaurant is one of the best hangout spots in Jiyanpur. The ambience is modern, cozy, and very Instagram-worthy—perfect for friends and casual dates. The food quality is good, especially their pizza, pasta, and shakes.', stars: 5, source: 'Google Review' },
  { name: 'Pravesh Singh', initial: 'P', text: 'Best restaurant in our Jiyanpur 👌 Family friendly restaurant 👍 It\'s extraordinary😉', stars: 5, source: 'Google Review' },
  { name: 'Nandani', initial: 'N', text: 'Zorko in Jiyanpur is honestly a game-changer for food lovers in the area. The place brings a fresh vibe with its modern setup, clean environment, and quick service that you usually don’t expect in a small town. The menu is loaded with variety—especially their burgers, pizzas, and cheesy snacks—which are full of flavor and perfectly cooked.', stars: 5, source: 'Google Review' },
  { name: 'Shyam Kumar (SKS)', initial: 'S', text: 'Great place to hang out with friends. Specially their mojito was really good and refreshing!', stars: 5, source: 'Google Review' },
  { name: 'Bandana Singh', initial: 'B', text: 'The taste of the food was really amazing and the quality was top notch. Highly recommended!', stars: 5, source: 'Google Review' },
];

export default function Home() {
  const [activeCat, setActiveCat] = useState('burgers');
  const [scrolled, setScrolled] = useState(false);
  const categoriesRef = useRef(null);

  const scrollCategories = (dir) => {
    if (categoriesRef.current) {
      const scrollAmt = dir === 'left' ? -200 : 200;
      categoriesRef.current.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);

    // Scroll Reveal Logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* ─── Top Nav ─── */}
      <nav className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo" onClick={() => scrollToSection('hero')} style={{ cursor: 'pointer' }}>
          <img src="https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png" alt="Zorko" className="logo-img" />
          <div className="logo-text">
            <span className="brand">Zorko Jiyanpur</span>
            <span className="sub">Brand of Food Lovers</span>
          </div>
        </div>
        <div className="nav-links">
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="#reviews">Reviews</a>
          <a href="#location">Location</a>
        </div>
      </nav>

      {/* ─── Welcome Banner ─── */}
      <div className="welcome-banner">
        <img src="https://ik.imagekit.io/DEMOPROJECT/030bf104-5ac0-430c-85a7-be13cc633d08.png" alt="Welcome to Zorko Jiyanpur" className="welcome-img" />
      </div>

      {/* ─── Hero ─── */}
      <section className="hero" id="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1>Jiyanpur&apos;s<br /><span className="highlight">Favorite</span> Food Spot</h1>
          <p className="hero-sub">Zorko — Brand of Food Lovers</p>
          <button onClick={() => scrollToSection('menu')} className="btn-primary">
            Explore Menu
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <div className="hero-logo-wrap">
            <img src="https://ik.imagekit.io/DEMOPROJECT/ad67ed46-da96-4656-ac68-ba4588ff97fc.png" alt="Zorko Jiyanpur" className="hero-logo-img" />
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line"></div>
          Scroll
        </div>
      </section>

      {/* ─── Quick Action Bar ─── */}
      <div className="action-bar" id="actionBar">
        <button className={`action-btn ${activeCat === 'menu' ? 'active' : ''}`} onClick={() => scrollToSection('menu')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          Menu
        </button>
        <button className="action-btn" onClick={() => scrollToSection('location')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Location
        </button>
        <button className="action-btn" onClick={() => scrollToSection('student')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          Offers
        </button>
        <button className="action-btn" onClick={() => scrollToSection('location')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.16 13 19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.05 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Contact
        </button>
      </div>

      {/* ─── About Experience ─── */}
      <section id="about">
        <div className="container">
          <div className="reveal">
            <p className="section-label">The Experience</p>
            <h2 className="section-title">Why Jiyanpur<br />Loves Zorko</h2>
          </div>
          <div className="experience-grid">
            <div className="exp-card reveal">
              <div className="exp-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 15h2a2 2 0 1 0 0-4h-2a2 2 0 1 0 0 4Z"/><path d="m20 17-5-5"/><path d="M14 2h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="M18 8v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8"/><path d="M14 8h-4"/></svg>
              </div>
              <h3>Great Taste</h3>
              <p>Bold, fresh flavors crafted from recipes that keep you coming back every single time.</p>
            </div>
            <div className="exp-card reveal">
              <div className="exp-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              </div>
              <h3>Chill Vibes</h3>
              <p>Music, lighting, and the perfect hangout ambiance for you and your crew.</p>
            </div>
            <div className="exp-card reveal">
              <div className="exp-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
              </div>
              <h3>Affordable Prices</h3>
              <p>Premium taste without the premium price tag. Built for students and food lovers alike.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Signature Menu ─── */}
      <section id="menu">
        <div className="container">
          <div className="reveal">
            <p className="section-label">Signature Menu</p>
            <h2 className="section-title">🍔 ZORKO JIYANPUR — COMPLETE DETAILED MENU</h2>
          </div>
          <div className="menu-categories-wrapper reveal">
            <button className="nav-arrow left" onClick={() => scrollCategories('left')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className="menu-categories" ref={categoriesRef}>
              {Object.keys(menuData).map((cat) => (
                <button 
                  key={cat} 
                  className={`menu-cat-btn ${activeCat === cat ? 'active' : ''}`}
                  onClick={() => setActiveCat(cat)}
                >
                  <img src={menuData[cat].icon} alt={cat} className="cat-icon" />
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
            <button className="nav-arrow right" onClick={() => scrollCategories('right')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          <div className="menu-header reveal">
            <h3 className="cat-header-title">{activeCat.toUpperCase().replace('-', ' ')}</h3>
            {menuData[activeCat].note && <p className="cat-note">{menuData[activeCat].note}</p>}
          </div>

          <div className="menu-grid reveal">
            {menuData[activeCat].items.map((item, i) => (
              <div key={i} className="menu-item">
                <div className="menu-item-info">
                  <h4>
                    {item.name} 
                    {item.best && <span className="bestseller">⭐ BEST</span>}
                  </h4>
                  <p>{item.desc}</p>
                </div>
                {item.price && <span className="menu-price">💰 {item.price}</span>}
              </div>
            ))}
          </div>

          {menuData[activeCat].addons && (
            <div className="menu-addons reveal">
              <h5>➕ {activeCat.toUpperCase().replace('-', ' ')} ADD-ONS</h5>
              <div className="addons-grid">
                {menuData[activeCat].addons.map((addon, i) => (
                  <div key={i} className="addon-item">{addon}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Food Showcase ─── */}
      <section style={{ paddingBottom: '60px' }}>
        <div className="container reveal">
          <p className="section-label">Food Gallery</p>
          <h2 className="section-title">One Bite =<br />Pure Addiction</h2>
        </div>
        <div className="showcase-wrapper">
          <div className="showcase-track">
            {[...showcaseItems, ...showcaseItems].map((item, i) => (
              <div key={i} className="showcase-card" style={{ background: item.bg }}>
                <div className="food-visual">{item.emoji}</div>
                <div className="overlay"><p>{item.label}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Student Offer ─── */}
      <section id="student" className="student-section">
        <div className="container">
          <div className="student-card reveal">
            <div className="offer-badge">🎓 STUDENT EXCLUSIVE</div>
            <h2><span className="big">15% OFF</span><br />For All Students</h2>
            <p>Show your college ID and get instant discount on every order. Because great food shouldn&apos;t break the bank.</p>
            <button onClick={() => scrollToSection('location')} className="btn-primary">
              Claim Now
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Reviews ─── */}
      <section id="reviews">
        <div className="container">
          <div className="reveal">
            <p className="section-label">Social Proof</p>
            <h2 className="section-title">What People<br />Are Saying</h2>
          </div>
          <div className="reviews-grid reveal">
            {reviews.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
                <blockquote>&quot;{r.text}&quot;</blockquote>
                <div className="review-author">
                  <div className="review-avatar">{r.initial}</div>
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-source">{r.source}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Instagram Wall ─── */}
      <section id="instagram">
        <div className="container reveal">
          <p className="section-label">@zorkojiyanpur</p>
          <h2 className="section-title">Follow the<br />Flavor</h2>
          <div className="insta-grid">
            {['🍔','🥤','🧁','🍕','🌮','🥪',' Fries','🍩'].map((e, i) => (
              <div key={i} className="insta-item" style={{ background: '#141414' }}>
                {e}
                <div className="insta-overlay">▶ View Reel</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Location ─── */}
      <section id="location">
        <div className="container">
          <div className="reveal">
            <p className="section-label">Find Us</p>
            <h2 className="section-title">Come Hungry,<br />Leave Happy</h2>
          </div>
          <div className="location-grid reveal">
            <div className="map-container">
              <iframe src="https://maps.google.com/maps?q=Zorko%20Restaurant%20Jiyanpur%20Doharighat%20Road%20near%20Hydel%20in%20front%20of%20Shiv%20Mandir&t=&z=16&ie=UTF8&iwloc=&output=embed" allowFullScreen loading="lazy"></iframe>
            </div>
            <div className="location-info">
              <div className="location-detail">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4>Address</h4>
                  <p>Doharighat Road, near Hydel,<br />in front of Shiv Mandir, Jiyanpur,<br />Khankah Bahrampur, UP 276140</p>
                </div>
              </div>
              <div className="location-detail">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <h4>Hours</h4>
                  <p>Mon – Sun: 10:00 AM – 10:00 PM<br />Open all days of the week</p>
                </div>
              </div>
              <div className="location-detail">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.16 13 19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.05 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <h4>Contact</h4>
                  <p>+91 92781 40402<br />zorkojiyanpur1@gmail.com</p>
                </div>
              </div>
              <button onClick={() => window.open('https://maps.app.goo.gl/9y75o3xCu1iQ7kn68', '_blank')} className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                Get Directions
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-section">
        <div className="container reveal">
          <h2>Hungry?<br />We Know the <em className="em">Answer</em></h2>
          <button onClick={() => scrollToSection('location')} className="btn-primary">
            Visit Now
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer>
        <div className="container">
          <div className="footer-simple">
            <div className="footer-logo">
              <img src="https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png" alt="Zorko Jiyanpur" className="footer-logo-img" />
              <div className="footer-logo-text">
                <span className="brand">Zorko Jiyanpur</span>
                <span className="tagline">Brand of Food Lovers</span>
              </div>
            </div>
            <p className="footer-desc">Jiyanpur&apos;s favorite food spot — bold flavors, chill vibes, and unforgettable bites. Come hungry, leave happy. 😊</p>
            <div className="footer-divider"></div>
            <div className="footer-actions">
              <a href="https://www.instagram.com/zorkojiyanpur?igsh=dHd6Y2hscDNsNW9x" target="_blank" className="social-icon-btn instagram" title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1apCffxJvy/" target="_blank" className="social-icon-btn facebook" title="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <button onClick={() => scrollToSection('about')} className="social-icon-btn about">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8"/><polyline points="11 11 12 11 12 16 13 16"/></svg>
                About Us
              </button>
            </div>
            <div className="footer-divider"></div>
            <p className="footer-copy">© 2026 Zorko Jiyanpur. All rights reserved.</p>
          </div>
        </div>
        <div className="footer-banner-wrap">
          <img src="https://ik.imagekit.io/DEMOPROJECT/35392bc6-c7b8-4cd9-9bfc-218e6ba384d3.png" alt="Zorko Jiyanpur" className="footer-banner-img" />
        </div>
      </footer>
    </>
  );
}
