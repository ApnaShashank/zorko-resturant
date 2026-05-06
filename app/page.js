'use client';

import { useState, useEffect, useRef } from 'react';

// ─── Menu Data ───
const menuData = {
  burgers: [
    { name: 'Mexican King Burger', desc: 'Premium spicy burger', price: '₹89', best: true },
    { name: 'Spicy Salsa Barbeque Burger', desc: 'Smoky & spicy', price: '₹79', best: false },
    { name: 'Korean Burger 🌶️', desc: 'Spicy Korean style', price: '₹69', best: false },
    { name: 'Double Tikki Burger', desc: 'Two patties, extra filling', price: '₹79', best: false },
    { name: 'Classic OG Burger', desc: 'The original taste', price: '₹49', best: false },
    { name: 'Royal Paneer Grilled Burger', desc: 'Fresh grilled paneer', price: '₹139', best: false },
  ],
  fries: [
    { name: 'Peri Peri French Fries', desc: 'Spicy peri peri seasoning', price: '₹99', best: false },
    { name: 'Salted French Fries', desc: 'Classic salted fries', price: '₹79', best: false },
    { name: 'Korean Cheesy Fries', desc: 'Cheese & Korean spices', price: '₹149', best: false },
    { name: 'Sizzling Italian Fries', desc: 'Herbs & cheese', price: '₹159', best: false },
  ],
  wraps: [
    { name: 'Mexican Salsa Wrap', desc: 'Spicy salsa & veggies', price: '₹129', best: false },
    { name: 'Classic Veg Wrap', desc: 'Fresh garden wrap', price: '₹109', best: false },
    { name: 'Grilled Paneer Wrap', desc: 'Char-grilled paneer', price: '₹149', best: true },
  ],
  pizza: [
    { name: 'Veg Exotica Pizza', desc: 'Loaded with exotic veggies', price: '₹159', best: true },
    { name: 'Paneer Barbeque Pizza', desc: 'Paneer & BBQ sauce', price: '₹189', best: false },
    { name: 'Hot To Hell Pizza 🌶️', desc: 'Extremely spicy', price: '₹149', best: false },
    { name: 'Pizza Di Sicilia', desc: 'Sicilian style herbs', price: '₹129', best: false },
    { name: 'Margherita Pizza', desc: 'Classic cheese & tomato', price: '₹99', best: false },
    { name: 'The Xplod (Cheese Burst)', desc: 'Liquid cheese explosion', price: '₹169', best: false },
    { name: 'Golden Harvest Pizza', desc: 'Sweet corn & pineapple', price: '₹109', best: false },
    { name: 'Four Cheese Pizza', desc: 'Mozzarella, Cheddar, Processed, Gouda', price: '₹169', best: false },
    { name: 'Korean Pizza', desc: 'Korean fusion flavors', price: '₹159', best: false },
  ],
  momos: [
    { name: 'Steam Momos', desc: 'Classic steamed dumplings', price: '₹89', best: false },
    { name: 'Fried Momos', desc: 'Crispy fried dumplings', price: '₹89', best: false },
    { name: 'Cheese Melting Gravy Momos', desc: 'Drowned in cheese gravy', price: '₹159', best: true },
  ],
  kulhad: [
    { name: 'Cheese Volcano Kulhad Momos', desc: 'Hot & cheesy momos', price: '₹149', best: false },
    { name: 'Cheese Loaded Kulhad Pizza', desc: 'Pizza served in a clay pot', price: '₹149', best: false },
    { name: 'Cheese Chatori Kulhad Maggi', desc: 'Masala maggi with extra cheese', price: '₹149', best: true },
  ],
  sandwich: [
    { name: 'Veg Mexican Sandwich', desc: 'Spicy salsa filling', price: '₹139', best: false },
    { name: 'Paneer Maharaja Sandwich', desc: 'King size paneer layers', price: '₹149', best: false },
    { name: 'Veggie Mumbai Grilled Sandwich', desc: 'Classic street style', price: '₹109', best: false },
    { name: 'Cheese Chilli Sandwich', desc: 'Hot & cheesy', price: '₹129', best: true },
  ],
  pasta: [
    { name: 'Alfredo Pasta', desc: 'Creamy white sauce (Reg/Baked)', price: '₹139/₹169', best: false },
    { name: 'Arrabbiata Pasta', desc: 'Spicy red sauce (Reg/Baked)', price: '₹139/₹169', best: false },
    { name: 'Ala Rosey Pasta', desc: 'Pink sauce mix (Reg/Baked)', price: '₹139/₹169', best: true },
    { name: 'Peri Peri Pasta', desc: 'Spicy peri peri sauce (Reg/Baked)', price: '₹139/₹169', best: false },
  ],
  'garlic-bread': [
    { name: 'Cheese Garlic Bread', desc: 'Classic cheesy bread', price: '₹89', best: false },
    { name: 'Supreme Treat Garlic Bread', desc: 'With toppings & cheese', price: '₹99', best: false },
    { name: 'Paneer Toofani Garlic Bread', desc: 'Spicy paneer topping', price: '₹119', best: false },
  ],
  maggi: [
    { name: 'Veg Masala Maggi', desc: 'Loaded with veggies', price: '₹79', best: false },
    { name: 'Hot Passion Spicy Maggi 🌶️', desc: 'Very spicy', price: '₹69', best: false },
    { name: 'Double Masala Maggi', desc: 'Extra spice kick', price: '₹59', best: false },
    { name: 'Cheese Chatori Maggi', desc: 'Extremely cheesy', price: '₹99', best: true },
  ],
  'cold-coffee': [
    { name: 'Premium Cold Coffee', desc: 'Classic & creamy', price: '₹49', best: true },
    { name: 'Strong Cold Coffee', desc: 'Extra caffeine kick', price: '₹59', best: false },
    { name: 'Chocolate Cold Coffee', desc: 'Mixed with cocoa', price: '₹79', best: false },
  ],
  mojitos: [
    { name: 'Surprise Mojito', desc: 'Barman special', price: '₹49', best: true },
    { name: 'Korean Mojito 🌶️', desc: 'Spicy & refreshing', price: '₹49', best: false },
    { name: 'Strawberry Mojito', desc: 'Sweet berry flavor', price: '₹49', best: false },
    { name: 'Blue Heaven Mojito', desc: 'Refreshing blue curacao', price: '₹49', best: true },
    { name: 'Cranberry/Peach/Passion', desc: 'Various fruit flavors', price: '₹49', best: false },
  ],
  milkshakes: [
    { name: 'Oreo Chocolate Shake', desc: 'Crunchy oreo bits', price: '₹99', best: false },
    { name: 'Brownie Blast Shake', desc: 'With loaded brownie', price: '₹119', best: true },
    { name: 'KitKat Chocolate Shake', desc: 'Kitkat chunk blend', price: '₹109', best: false },
  ],
  desserts: [
    { name: 'Sizzling Brownie', desc: 'Warm brownie with ice cream', price: '₹149', best: false },
    { name: 'Kulhad Chocolaty Mud Pie', desc: 'Chocolate delight in kulhad', price: '₹199', best: true },
  ],
  combos: [
    { name: 'Classic Burger + Drink', desc: 'OG Burger + Mojito/Ice Tea', price: '₹69', best: false },
    { name: 'Pizza + Drink', desc: 'Sicilia Pizza + Mojito/Ice Tea', price: '₹149', best: false },
    { name: 'Student Party Pack', desc: '3 Any Mojitos/Ice Teas', price: '₹99', best: true },
  ],
  'special-buns': [
    { name: 'Cheese Pull & Tear Garlic Bun', desc: 'Loaded with cheese', price: '₹149', best: true },
    { name: 'Korean Jalapeno Bun', desc: 'Spicy & cheesy', price: '₹149', best: false },
  ],
  toasties: [
    { name: 'Korean Spicy Paneer', desc: 'Fusion toastie', price: '₹89', best: false },
    { name: 'Peri Peri Cheese Blast', desc: 'Spicy cheese explosion', price: '₹99', best: false },
    { name: 'Italian Treat', desc: 'Herbs & cheese', price: '₹79', best: false },
  ],
  nachos: [
    { name: 'Cheesy Delight Nachos', desc: 'With cheese sauce', price: '₹129', best: false },
    { name: 'Nachos with Cheese Dip', desc: 'Classic crunch', price: '₹79', best: false },
    { name: 'Nachos & Salsa', desc: 'Spicy salsa dip', price: '₹149', best: true },
  ],
  'ice-tea': [
    { name: 'Lemon/Peach Ice Tea', desc: 'Refreshing fruit tea', price: '₹49', best: false },
    { name: 'American Blue Ice Tea', desc: 'Special blue blend', price: '₹49', best: true },
  ],
  'hot-beverages': [
    { name: 'Hot Coffee', desc: 'Classic warm brew', price: '₹29', best: false },
    { name: 'Hot Chocolate', desc: 'Rich & creamy', price: '₹39', best: true },
  ]
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
  { name: 'Shashank Gupta', initial: 'S', text: 'Zorko Restaurant is one of the best hangout spots in Jiyanpur. The ambience is modern, cozy, and very Instagram-worthy—perfect for friends and casual dates. The food quality is good, especially their pizza, pasta, and shakes.', stars: 4, source: 'Google Review' },
  { name: 'Pravesh Singh', initial: 'P', text: 'Best restaurant in our Jiyanpur 👌 Family friendly restaurant 👍 It\'s extraordinary😉', stars: 5, source: 'Google Review' },
  { name: 'Nandani', initial: 'N', text: 'Zorko in Jiyanpur is honestly a game-changer for food lovers in the area. The place brings a fresh vibe with its modern setup, clean environment, and quick service that you usually don’t expect in a small town. The menu is loaded with variety—especially their burgers, pizzas, and cheesy snacks—which are full of flavor and perfectly cooked.', stars: 5, source: 'Google Review' },
  { name: 'Shyam Kumar (SKS)', initial: 'S', text: 'Great place to hang out with friends. Specially their mojito was really good and refreshing!', stars: 5, source: 'Google Review' },
  { name: 'Bandana Singh', initial: 'B', text: 'The taste of the food was really amazing and the quality was top notch. Highly recommended!', stars: 5, source: 'Google Review' },
];

export default function Home() {
  const [activeCat, setActiveCat] = useState('burgers');
  const [scrolled, setScrolled] = useState(false);

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
            <h2 className="section-title">Taste What&apos;s<br />Trending</h2>
          </div>
          <div className="menu-categories reveal">
            {Object.keys(menuData).map((cat) => (
              <button 
                key={cat} 
                className={`menu-cat-btn ${activeCat === cat ? 'active' : ''}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
          <div className="menu-grid reveal">
            {menuData[activeCat].map((item, i) => (
              <div key={i} className="menu-item">
                <div className="menu-item-info">
                  <h4>{item.name} {item.best && <span className="bestseller"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{width:'10px',height:'10px',display:'inline-block',verticalAlign:'middle',marginRight:'2px'}}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>BEST</span>}</h4>
                  <p>{item.desc}</p>
                </div>
                <span className="menu-price">{item.price}</span>
              </div>
            ))}
          </div>
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
              <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=83.05%2C26.15%2C83.15%2C26.25&layer=mapnik" allowFullScreen loading="lazy"></iframe>
            </div>
            <div className="location-info">
              <div className="location-detail">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4>Address</h4>
                  <p>Doharighat Road, Jiyanpur,<br />Azamgarh, Uttar Pradesh</p>
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
                  <p>+91 92781 40402<br />zorko.jiyanpur@gmail.com</p>
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
