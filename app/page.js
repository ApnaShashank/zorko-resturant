'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Star,
  Flame,
  Sparkles,
  Wallet,
  IdCard,
  ChevronRight,
  Menu as MenuIcon,
  X,
  ExternalLink,
  Trophy,
  Coins,
  Gamepad2,
  Bell,
  ArrowRight,
  ChevronLeft,
  Info
} from 'lucide-react';
import { subscribeToPush } from './components/PWAProvider';
import {
  VegBadge,
  BestsellerBadge,
  MustTryBadge,
  PriceTag,
  VegStamp,
  FlameDoodle,
  ThumbsUpDoodle,
  RotatingLogoBadge,
  WavyDivider,
  InstagramIcon as Instagram
} from './components/Stickers';

// ─── Locked Official Logo ───
const OFFICIAL_LOGO = 'https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png';
const PHONE_NUMBER = '+91 92781 40402';
const TEL_LINK = 'tel:+919278140402';
const EMAIL_ADDRESS = 'zorkojiyanpur1@gmail.com';
const INSTAGRAM_URL = 'https://www.instagram.com/zorkojiyanpur';
const ADDRESS_TEXT = 'Doharighat Road, near Hydel, in front of Shiv Mandir, Jiyanpur, Azamgarh, UP 276140';
const HOURS_TEXT = 'Open daily 11:00 AM – 10:00 PM (All 7 Days)';

// ─── 100% Unaltered Menu Data ───
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

// ─── 100% Unaltered Reviews Data ───
const reviews = [
  { name: 'Shashank Gupta', initial: 'S', text: 'Zorko Restaurant is one of the best hangout spots in Jiyanpur. The ambience is modern, cozy, and very Instagram-worthy—perfect for friends and casual dates. The food quality is good, especially their pizza, pasta, and shakes.', stars: 5, source: 'Google Review' },
  { name: 'Pravesh Singh', initial: 'P', text: 'Best restaurant in our Jiyanpur 👌 Family friendly restaurant 👍 It\'s extraordinary😉', stars: 5, source: 'Google Review' },
  { name: 'Nandani', initial: 'N', text: 'Zorko in Jiyanpur is honestly a game-changer for food lovers in the area. The place brings a fresh vibe with its modern setup, clean environment, and quick service that you usually don\'t expect in a small town. The menu is loaded with variety—especially their burgers, pizzas, and cheesy snacks—which are full of flavor and perfectly cooked.', stars: 5, source: 'Google Review' },
  { name: 'Shyam Kumar (SKS)', initial: 'S', text: 'Great place to hang out with friends. Specially their mojito was really good and refreshing!', stars: 5, source: 'Google Review' },
  { name: 'Bandana Singh', initial: 'B', text: 'The taste of the food was really amazing and the quality was top notch. Highly recommended!', stars: 5, source: 'Google Review' },
];

// ─── Polaroid Gallery Items ───
const polaroidPhotos = [
  { img: '/images/food/burger.webp', caption: 'Mexican King Burger ✦ ₹89', category: 'food', tint: '#FFE3C2', tilt: 'polaroid-tilt-1' },
  { img: '/images/food/pizza.webp', caption: 'Veg Exotica Pizza ✦ ₹159', category: 'food', tint: '#FFF0D6', tilt: 'polaroid-tilt-2' },
  { img: '/images/food/blue-mojito.webp', caption: 'Blue Heaven Mojito ✦ ₹49', category: 'drinks', tint: '#D8F1FC', tilt: 'polaroid-tilt-3' },
  { img: '/images/food/veg-wrap.webp', caption: 'Grilled Paneer Wrap ✦ ₹149', category: 'food', tint: '#FFE3C2', tilt: 'polaroid-tilt-4' },
  { img: '/images/food/garlic-bread.webp', caption: 'Supreme Garlic Bread ✦ ₹99', category: 'food', tint: '#FFF0D6', tilt: 'polaroid-tilt-1' },
  { img: '/images/food/peri-peri-fries.webp', caption: 'Peri Peri Fries ✦ ₹99', category: 'food', tint: '#D8F1FC', tilt: 'polaroid-tilt-2' },
  { img: '/images/food/cold-coffee.webp', caption: 'Premium Cold Coffee ✦ ₹49', category: 'drinks', tint: '#FFF0D6', tilt: 'polaroid-tilt-3' },
  { img: '/images/food/chocolate-shake.webp', caption: 'Brownie Blast Shake ✦ ₹119', category: 'drinks', tint: '#FFE3C2', tilt: 'polaroid-tilt-4' },
];

// ─── Game Zone Games ───
function TicTacToe({ onWin, onBack }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winLine, setWinLine] = useState(null);

  const checkWinner = (b) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let line of lines) {
      const [a,c,d] = line;
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return { winner: b[a], line };
    }
    return null;
  };

  const getAIMove = (b) => {
    for (let i = 0; i < 9; i++) {
      if (!b[i]) { const t = [...b]; t[i] = 'O'; if (checkWinner(t)?.winner === 'O') return i; }
    }
    for (let i = 0; i < 9; i++) {
      if (!b[i]) { const t = [...b]; t[i] = 'X'; if (checkWinner(t)?.winner === 'X') return i; }
    }
    if (!b[4]) return 4;
    const corners = [0,2,6,8].filter(i => !b[i]);
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
    const empty = b.map((v,i) => v ? -1 : i).filter(i => i !== -1);
    return empty[Math.floor(Math.random() * empty.length)];
  };

  const handleClick = (i) => {
    if (board[i] || winner || !isPlayerTurn) return;
    const newBoard = [...board];
    newBoard[i] = 'X';
    const result = checkWinner(newBoard);
    if (result) {
      setBoard(newBoard);
      setWinner(result.winner);
      setWinLine(result.line);
      if (result.winner === 'X') onWin();
      return;
    }
    if (newBoard.every(c => c)) { setBoard(newBoard); setWinner('draw'); return; }
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const newBoard = [...board];
        const move = getAIMove(newBoard);
        if (move !== undefined && move !== -1) {
          newBoard[move] = 'O';
          const result = checkWinner(newBoard);
          if (result) { setBoard(newBoard); setWinner(result.winner); setWinLine(result.line); return; }
          if (newBoard.every(c => c)) { setBoard(newBoard); setWinner('draw'); return; }
          setBoard(newBoard);
        }
        setIsPlayerTurn(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner]);

  const reset = () => { setBoard(Array(9).fill(null)); setIsPlayerTurn(true); setWinner(null); setWinLine(null); };

  return (
    <div style={{ background: '#251913', padding: '32px 24px', borderRadius: '24px', border: '2px solid #EE7F1A', maxWidth: '420px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={onBack} className="btn-pill btn-pill-cream" style={{ minHeight: '38px', padding: '6px 16px', fontSize: '13px' }}>
          ← Back
        </button>
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#FFF6EC', fontSize: '20px' }}>Tic Tac Toe</h3>
        <span style={{ fontSize: '12px', background: '#EE7F1A', color: '#fff', padding: '4px 10px', borderRadius: '999px', fontWeight: '800' }}>vs Bot</span>
      </div>
      <p style={{ textAlign: 'center', color: '#FFE3C2', marginBottom: '18px', fontWeight: '700' }}>
        {winner === 'X' ? '🎉 You Won! +1 Coin!' : winner === 'O' ? '😢 Bot Wins! Try Again' : winner === 'draw' ? '🤝 Draw Game!' : isPlayerTurn ? 'Your Turn (X)' : 'Bot Thinking...'}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={!!cell || !!winner || !isPlayerTurn}
            style={{
              aspectRatio: '1/1',
              backgroundColor: winLine?.includes(i) ? '#EE7F1A' : cell ? '#3D2D24' : '#1A120E',
              color: cell === 'X' ? '#EE7F1A' : '#00A0E3',
              fontSize: '32px',
              fontFamily: 'var(--font-display)',
              fontWeight: '800',
              border: '2px solid rgba(255,246,236,0.2)',
              borderRadius: '16px',
              cursor: cell || winner || !isPlayerTurn ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '3px 3px 0 #000'
            }}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <button onClick={reset} className="btn-pill btn-pill-orange" style={{ width: '100%' }}>
          Play Again
        </button>
      )}
    </div>
  );
}

function RockPaperScissors({ onWin, onBack }) {
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [round, setRound] = useState(1);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [cpuChoice, setCpuChoice] = useState(null);
  const [roundResult, setRoundResult] = useState(null);
  const [matchOver, setMatchOver] = useState(false);
  const choices = ['Rock', 'Paper', 'Scissors'];

  const play = (pIdx) => {
    if (matchOver) return;
    const cIdx = Math.floor(Math.random() * 3);
    setPlayerChoice(pIdx);
    setCpuChoice(cIdx);
    let res = 'draw';
    if ((pIdx === 0 && cIdx === 2) || (pIdx === 1 && cIdx === 0) || (pIdx === 2 && cIdx === 1)) {
      res = 'win';
      const ps = playerScore + 1;
      setPlayerScore(ps);
      if (ps >= 2) { setMatchOver(true); onWin(); }
    } else if (pIdx !== cIdx) {
      res = 'lose';
      const cs = cpuScore + 1;
      setCpuScore(cs);
      if (cs >= 2) { setMatchOver(true); }
    }
    setRoundResult(res);
    setRound(r => r + 1);
  };

  const reset = () => {
    setPlayerScore(0); setCpuScore(0); setRound(1);
    setPlayerChoice(null); setCpuChoice(null); setRoundResult(null);
    setMatchOver(false);
  };

  return (
    <div style={{ background: '#251913', padding: '32px 24px', borderRadius: '24px', border: '2px solid #00A0E3', maxWidth: '420px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={onBack} className="btn-pill btn-pill-cream" style={{ minHeight: '38px', padding: '6px 16px', fontSize: '13px' }}>
          ← Back
        </button>
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#FFF6EC', fontSize: '20px' }}>Rock Paper Scissors</h3>
        <span style={{ fontSize: '12px', background: '#00A0E3', color: '#fff', padding: '4px 10px', borderRadius: '999px', fontWeight: '800' }}>Best of 3</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: '#1A120E', padding: '14px', borderRadius: '16px', marginBottom: '20px', border: '1px solid rgba(255,246,236,0.1)' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#FFE3C2', display: 'block' }}>You</span>
          <span style={{ fontSize: '28px', fontFamily: 'var(--font-display)', fontWeight: '800', color: '#EE7F1A' }}>{playerScore}</span>
        </div>
        <span style={{ color: '#fff', fontWeight: '800' }}>VS</span>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#FFE3C2', display: 'block' }}>Chef</span>
          <span style={{ fontSize: '28px', fontFamily: 'var(--font-display)', fontWeight: '800', color: '#00A0E3' }}>{cpuScore}</span>
        </div>
      </div>
      {!matchOver ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {choices.map((label, i) => (
            <button
              key={i}
              onClick={() => play(i)}
              className="btn-pill btn-pill-cream"
              style={{ padding: '14px 8px', fontSize: '13px', width: '100%' }}
            >
              {label}
            </button>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#FFF6EC', fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>
            {playerScore >= 2 ? '🎉 You Beat the Chef! +1 Coin!' : '😢 Chef Wins! Try Again!'}
          </p>
          <button onClick={reset} className="btn-pill btn-pill-orange" style={{ width: '100%' }}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Page Component ───
export default function Home() {
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Game state
  const [coins, setCoins] = useState(0);
  const [coinHistory, setCoinHistory] = useState([]);
  const [activeGame, setActiveGame] = useState(null);
  const [showCoinModal, setShowCoinModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('register');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [leaders, setLeaders] = useState([]);
  const [loadingLeaders, setLoadingLeaders] = useState(false);
  const [coinCelebrate, setCoinCelebrate] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch leaderboard & user
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('zorko_user');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        setCurrentUser(u);
        setCoins(u.coins || 0);
        setCoinHistory(u.history || []);
      }
    } catch (e) { /* ignore */ }

    const fetchLeaderboard = async () => {
      try {
        setLoadingLeaders(true);
        const res = await fetch('/api/leaderboard');
        const data = await res.json();
        if (data.success) setLeaders(data.leaderboard);
      } catch (err) {
        // Fallback demo leaderboard
        setLeaders([
          { name: 'Amit Verma', coins: 120 },
          { name: 'Pooja Singh', coins: 95 },
          { name: 'Rahul Yadav', coins: 80 }
        ]);
      } finally {
        setLoadingLeaders(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const awardCoin = async (gameName) => {
    const newCoins = coins + 1;
    setCoins(newCoins);
    const item = {
      game: gameName,
      amount: 1,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    const updatedHistory = [...coinHistory, item];
    setCoinHistory(updatedHistory);
    try {
      if (currentUser) {
        const updated = { ...currentUser, coins: newCoins, history: updatedHistory };
        setCurrentUser(updated);
        localStorage.setItem('zorko_user', JSON.stringify(updated));
        await fetch('/api/user/coins', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: currentUser.phone, game: gameName })
        });
      }
    } catch (e) { /* ignore */ }

    setCoinCelebrate(true);
    setTimeout(() => setCoinCelebrate(false), 2400);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: authTab,
          phone: authPhone,
          password: authPassword,
          ...(authTab === 'register' ? { name: authName } : {})
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || 'Authentication failed');
        return;
      }
      setCurrentUser(data.user);
      setCoins(data.user.coins || 0);
      setCoinHistory(data.user.history || []);
      localStorage.setItem('zorko_user', JSON.stringify(data.user));
      setShowAuthModal(false);
    } catch (err) {
      setAuthError('Connection error. Please try again.');
    }
  };

  const filteredGallery = galleryFilter === 'all'
    ? polaroidPhotos
    : polaroidPhotos.filter(p => p.category === galleryFilter);

  return (
    <div className="zorko-app">
      {/* ── Coin Celebrate Notification ── */}
      {coinCelebrate && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '24px',
            zIndex: 99999,
            backgroundColor: '#EE7F1A',
            color: '#FFFFFF',
            border: '2px solid #211712',
            boxShadow: '4px 4px 0 #211712',
            padding: '12px 20px',
            borderRadius: '9999px',
            fontFamily: 'var(--font-display)',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'bounce 0.5s ease'
          }}
        >
          <Coins size={20} />
          <span>+1 Zorko Coin Earned!</span>
        </div>
      )}

      {/* ── Sticky Top Navigation ── */}
      <nav className={`zorko-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#hero" className="nav-brand">
            <div className="nav-logo-circle">
              <img src={OFFICIAL_LOGO} alt="Zorko Jiyanpur Logo" />
            </div>
            <div>
              <div className="nav-brand-title">Zorko Jiyanpur</div>
              <div className="nav-brand-tagline">Brand of Food Lovers</div>
            </div>
          </a>

          <div className="nav-links-desktop">
            <a href="#hero" className="nav-link">Home</a>
            <a href="#menu" className="nav-link">Menu</a>
            <a href="#gallery" className="nav-link">Gallery</a>
            <a href="#reviews" className="nav-link">Reviews</a>
            <a href="#game-zone" className="nav-link">Game Zone</a>
            <a href="#visit-us" className="nav-link">Visit Us</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href={TEL_LINK} className="nav-call-btn">
              <Phone size={16} strokeWidth={1.8} />
              <span>{PHONE_NUMBER}</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="nav-hamburger-btn"
              aria-label="Open navigation menu"
            >
              <MenuIcon size={24} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Ink Overlay Menu ── */}
      {mobileMenuOpen && (
        <div className="mobile-overlay-menu">
          <div className="mobile-overlay-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="nav-logo-circle" style={{ width: '42px', height: '42px' }}>
                <img src={OFFICIAL_LOGO} alt="Zorko Logo" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', color: '#FFF6EC', fontWeight: '800', fontSize: '18px' }}>
                  ZORKO JIYANPUR
                </div>
                <div style={{ color: '#EE7F1A', fontSize: '11px', fontWeight: '700' }}>
                  Brand of Food Lovers
                </div>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-overlay-close"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.8} />
            </button>
          </div>

          <div className="mobile-nav-links">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>Home</span>
              <ChevronRight size={24} strokeWidth={1.8} />
            </a>
            <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>Menu</span>
              <ChevronRight size={24} strokeWidth={1.8} />
            </a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>Gallery</span>
              <ChevronRight size={24} strokeWidth={1.8} />
            </a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>Reviews</span>
              <ChevronRight size={24} strokeWidth={1.8} />
            </a>
            <a href="#game-zone" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>Game Zone</span>
              <ChevronRight size={24} strokeWidth={1.8} />
            </a>
            <a href="#visit-us" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>Visit Us</span>
              <ChevronRight size={24} strokeWidth={1.8} />
            </a>
          </div>

          <div className="mobile-nav-footer">
            <a href={TEL_LINK} className="btn-pill btn-pill-orange" style={{ width: '100%' }}>
              <Phone size={18} strokeWidth={1.8} />
              <span>Call Karein: {PHONE_NUMBER}</span>
            </a>
            <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,246,236,0.6)', marginTop: '8px' }}>
              Doharighat Road, near Hydel, Jiyanpur
            </p>
          </div>
        </div>
      )}

      {/* ── 1. HERO SECTION (Orange Background) ── */}
      <section id="hero" className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Headlines & CTAs */}
            <div>
              <div className="hero-tagline-badge">
                <VegBadge size={14} />
                <span>100% Pure Veg • Brand of Food Lovers</span>
              </div>

              <h1 className="hero-title">
                JIYANPUR KA APNA <br />
                <span className="text-outline-cream">ZORKO</span>
              </h1>

              <p className="hero-subline">
                Good Food • Good Mood • Great Moments
              </p>

              <div className="hero-ctas">
                <a href={TEL_LINK} className="btn-pill btn-pill-ink">
                  <Phone size={18} strokeWidth={1.8} />
                  <span>Call Karein</span>
                </a>
                <a href="#menu" className="btn-pill btn-pill-cream">
                  <span>Menu Dekho</span>
                  <ChevronRight size={18} strokeWidth={1.8} />
                </a>
              </div>

              {/* Verified Outlet Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '28px' }}>
                <VegStamp />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#211712' }}>
                  Open Daily 11:00 AM – 10:00 PM
                </span>
              </div>
            </div>

            {/* Right Column: Floating Cut-Out Photos & Rotating Badge */}
            <div className="hero-visual-stage">
              <div className="hero-blob-bg">
                <img
                  src="/images/namaste.webp"
                  alt="Namaste Greeting - Zorko Jiyanpur"
                  className="hero-blob-namaste"
                />
              </div>

              {/* Rotating Circular Text Badge around official logo */}
              <div className="hero-rotating-badge-wrap">
                <RotatingLogoBadge logoSrc={OFFICIAL_LOGO} size={150} />
              </div>

              {/* Floating Burger */}
              <div className="floating-food-item food-bob-1 hero-food-pos-burger">
                <div style={{ position: 'relative' }}>
                  <img
                    src="/images/food/burger.webp"
                    alt="Zorko Mexican King Burger"
                    className="hero-food-burger"
                    style={{ objectFit: 'contain' }}
                  />
                  <div style={{ position: 'absolute', top: '-10px', left: '-10px' }}>
                    <BestsellerBadge />
                  </div>
                </div>
              </div>

              {/* Floating Pizza */}
              <div className="floating-food-item food-bob-2 hero-food-pos-pizza">
                <div style={{ position: 'relative' }}>
                  <img
                    src="/images/food/pizza.webp"
                    alt="Zorko Veg Exotica Pizza"
                    className="hero-food-pizza"
                    style={{ objectFit: 'contain' }}
                  />
                  <div style={{ position: 'absolute', bottom: '-10px', right: '-10px' }}>
                    <MustTryBadge />
                  </div>
                </div>
              </div>

              {/* Floating Blue Mojito */}
              <div className="floating-food-item food-bob-3 hero-food-pos-mojito">
                <img
                  src="/images/food/blue-mojito.webp"
                  alt="Zorko Blue Heaven Mojito"
                  className="hero-food-mojito"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wavy transition from orange hero into ink marquee */}
      <WavyDivider bg="#EE7F1A" fill="#211712" height={44} />

      {/* ── 2. MARQUEE STRIP (Ink Background) ── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="marquee-content">
              <span>PIZZA</span>
              <span className="marquee-separator">✦</span>
              <span>BURGER</span>
              <span className="marquee-separator">✦</span>
              <span>VEG WRAP</span>
              <span className="marquee-separator">✦</span>
              <span>MOJITO</span>
              <span className="marquee-separator">✦</span>
              <span>COLD COFFEE</span>
              <span className="marquee-separator">✦</span>
              <span>FRIES</span>
              <span className="marquee-separator">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. BESTSELLERS SECTION (Cream Background) ── */}
      <section className="bestsellers-section">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">
              <Star size={14} fill="#EE7F1A" color="#EE7F1A" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="section-heading-big">
              Jiyanpur&apos;s Bestsellers
            </h2>
            <p className="section-subtext">
              The dishes that our food lovers keep coming back for. Freshly prepared in our kitchen, full of flavor!
            </p>
          </div>

          <div className="bestsellers-grid">
            {/* Card 1: Mexican King Burger */}
            <div className="bestseller-card">
              <div className="bestseller-card-blob" style={{ backgroundColor: '#FFE3C2' }}>
                <img
                  src="/images/food/burger.webp"
                  alt="Mexican King Burger"
                  className="bestseller-food-img"
                  loading="lazy"
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <BestsellerBadge />
                </div>
              </div>
              <div className="bestseller-meta">
                <VegBadge size={16} />
                <PriceTag price="₹89" rotate={-6} />
              </div>
              <h3 className="bestseller-name">Mexican King Burger</h3>
              <p className="bestseller-desc">
                Loaded burger with Mexican sauces & crunchy veggies.
              </p>
              <a href={TEL_LINK} className="btn-pill btn-pill-ink" style={{ width: '100%', minHeight: '42px', fontSize: '13px' }}>
                <Phone size={14} />
                <span>Sampark Karein</span>
              </a>
            </div>

            {/* Card 2: Veg Exotica Pizza */}
            <div className="bestseller-card">
              <div className="bestseller-card-blob" style={{ backgroundColor: '#FFF0D6' }}>
                <img
                  src="/images/food/pizza.webp"
                  alt="Veg Exotica Pizza"
                  className="bestseller-food-img"
                  loading="lazy"
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <BestsellerBadge />
                </div>
              </div>
              <div className="bestseller-meta">
                <VegBadge size={16} />
                <PriceTag price="₹159" rotate={-6} />
              </div>
              <h3 className="bestseller-name">Veg Exotica Pizza</h3>
              <p className="bestseller-desc">
                Loaded exotic veggie pizza with stringy mozzarella.
              </p>
              <a href={TEL_LINK} className="btn-pill btn-pill-ink" style={{ width: '100%', minHeight: '42px', fontSize: '13px' }}>
                <Phone size={14} />
                <span>Sampark Karein</span>
              </a>
            </div>

            {/* Card 3: Grilled Paneer Wrap */}
            <div className="bestseller-card">
              <div className="bestseller-card-blob" style={{ backgroundColor: '#FFE3C2' }}>
                <img
                  src="/images/food/veg-wrap.webp"
                  alt="Grilled Paneer Wrap"
                  className="bestseller-food-img"
                  loading="lazy"
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <MustTryBadge />
                </div>
              </div>
              <div className="bestseller-meta">
                <VegBadge size={16} />
                <PriceTag price="₹149" rotate={-6} />
              </div>
              <h3 className="bestseller-name">Grilled Paneer Wrap</h3>
              <p className="bestseller-desc">
                Paneer grilled special wrap with tandoori spices.
              </p>
              <a href={TEL_LINK} className="btn-pill btn-pill-ink" style={{ width: '100%', minHeight: '42px', fontSize: '13px' }}>
                <Phone size={14} />
                <span>Sampark Karein</span>
              </a>
            </div>

            {/* Card 4: Blue Heaven Mojito */}
            <div className="bestseller-card">
              <div className="bestseller-card-blob" style={{ backgroundColor: '#D8F1FC' }}>
                <img
                  src="/images/food/blue-mojito.webp"
                  alt="Blue Heaven Mojito"
                  className="bestseller-food-img"
                  loading="lazy"
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <BestsellerBadge />
                </div>
              </div>
              <div className="bestseller-meta">
                <VegBadge size={16} />
                <PriceTag price="₹49" rotate={-6} />
              </div>
              <h3 className="bestseller-name">Blue Heaven Mojito</h3>
              <p className="bestseller-desc">
                Refreshing fizzy electric blue mocktail with fresh mint.
              </p>
              <a href={TEL_LINK} className="btn-pill btn-pill-ink" style={{ width: '100%', minHeight: '42px', fontSize: '13px' }}>
                <Phone size={14} />
                <span>Sampark Karein</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WHY ZORKO (White Background) ── */}
      <section className="why-zorko-section">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">
              <FlameDoodle size={16} />
              <span>The Zorko Vibe</span>
            </div>
            <h2 className="section-heading-big">
              Why Jiyanpur Loves Zorko
            </h2>
            <p className="section-subtext">
              Built for students, friends, and families who love bold flavors and good times.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-chunky-card">
              <div className="feature-icon-box" style={{ backgroundColor: '#FFE3C2', color: '#EE7F1A' }}>
                <Flame size={30} strokeWidth={1.8} />
              </div>
              <h3 className="feature-title">Great Taste</h3>
              <p className="feature-text">
                Bold, fresh flavors crafted from recipes that keep you coming back every single time.
              </p>
              <div className="feature-annotation">
                ✦ Asli swaad har bite mein!
              </div>
            </div>

            <div className="feature-chunky-card">
              <div className="feature-icon-box" style={{ backgroundColor: '#D8F1FC', color: '#00A0E3' }}>
                <Sparkles size={30} strokeWidth={1.8} />
              </div>
              <h3 className="feature-title">Chill Vibes</h3>
              <p className="feature-text">
                Music, lighting, and the perfect hangout ambiance for you and your crew in Jiyanpur.
              </p>
              <div className="feature-annotation">
                ✦ Doston ke saath full chill!
              </div>
            </div>

            <div className="feature-chunky-card">
              <div className="feature-icon-box" style={{ backgroundColor: '#FFF0D6', color: '#1A9E4B' }}>
                <Wallet size={30} strokeWidth={1.8} />
              </div>
              <h3 className="feature-title">Affordable Prices</h3>
              <p className="feature-text">
                Premium taste without the premium price tag. Built for students and food lovers alike.
              </p>
              <div className="feature-annotation">
                ✦ Pocket friendly, daily hangout!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. COMPLETE DETAILED MENU SECTION (Cream Background) ── */}
      <section id="menu" className="menu-section">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">
              <VegBadge size={14} />
              <span>100% Pure Veg Menu</span>
            </div>
            <h2 className="section-heading-big">
              Explore Our Full Menu
            </h2>
            <p className="section-subtext">
              100% Vegetarian fast food delicacies made fresh. For queries or to confirm table availability, call us!
            </p>
          </div>

          {/* Category Chips Bar */}
          <div className="menu-category-chips-wrap">
            {Object.keys(menuData).map((key) => {
              const cat = menuData[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`menu-cat-chip ${activeCategory === key ? 'active' : ''}`}
                >
                  <VegBadge size={12} />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Header */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #211712',
              borderRadius: '20px',
              padding: '16px 24px',
              marginBottom: '24px',
              boxShadow: '4px 4px 0 #211712',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {menuData[activeCategory]?.photo && (
                <img
                  src={menuData[activeCategory].photo}
                  alt={menuData[activeCategory].title}
                  style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '10px' }}
                />
              )}
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '800', textTransform: 'uppercase' }}>
                  {menuData[activeCategory]?.title}
                </h3>
                {menuData[activeCategory]?.note && (
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#EE7F1A' }}>
                    ✦ {menuData[activeCategory].note}
                  </p>
                )}
              </div>
            </div>
            <a href={TEL_LINK} className="btn-pill btn-pill-ink" style={{ minHeight: '38px', padding: '6px 16px', fontSize: '13px' }}>
              <Phone size={14} />
              <span>Call Karein</span>
            </a>
          </div>

          {/* Menu Items Grid */}
          <div className="menu-grid-container">
            {menuData[activeCategory]?.items.map((item, idx) => (
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
                  <a href={TEL_LINK} title="Call to inquire" style={{ color: '#EE7F1A', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontSize: '12px', fontWeight: '800' }}>
                    <Phone size={13} />
                    <span>Inquire</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Add-ons box if present */}
          {menuData[activeCategory]?.addons && (
            <div
              style={{
                marginTop: '28px',
                backgroundColor: '#FFF0D6',
                border: '2px dashed #211712',
                borderRadius: '18px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: '800', color: '#211712' }}>
                ➕ ADD-ONS:
              </span>
              {menuData[activeCategory].addons.map((add, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #211712',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}
                >
                  {add}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 6. STUDENT OFFER BANNER (Blue Background) ── */}
      <section id="student" className="student-offer-section">
        <div className="container">
          <div className="student-banner-card">
            <div className="student-banner-content">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#FFF0D6',
                  color: '#211712',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  border: '2px solid #211712',
                  fontFamily: 'var(--font-display)',
                  fontSize: '12px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  marginBottom: '14px'
                }}
              >
                <IdCard size={16} strokeWidth={1.8} />
                <span>STUDENT EXCLUSIVE OFFER</span>
              </div>

              <h2>15% OFF For All Students</h2>
              <p>
                Show your college ID and get instant discount on every visit. Because great food shouldn&apos;t break the bank.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
              <a href={TEL_LINK} className="btn-pill btn-pill-orange" style={{ minWidth: '200px' }}>
                <Phone size={18} strokeWidth={1.8} />
                <span>Call Karein</span>
              </a>
              <span style={{ fontFamily: 'var(--font-accent)', fontSize: '18px', fontWeight: '700', color: '#211712' }}>
                ✦ Valid with any college/school ID
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. GALLERY SECTION (Ink Background) ── */}
      <section id="gallery" className="gallery-section">
        <div className="container">
          <div className="section-header-block" style={{ color: '#FFF6EC' }}>
            <div className="section-badge-pill" style={{ backgroundColor: '#EE7F1A', color: '#FFFFFF', borderColor: '#FFF6EC' }}>
              <Sparkles size={14} />
              <span>Food & Outlet Gallery</span>
            </div>
            <h2 className="section-heading-big" style={{ color: '#FFF6EC' }}>
              Moments & Cravings
            </h2>
            <p className="section-subtext" style={{ color: 'rgba(255,246,236,0.7)' }}>
              A peek into the delicious dishes and cozy vibes at Zorko Jiyanpur.
            </p>

            {/* Filter Chips */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
              {['all', 'food', 'drinks'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setGalleryFilter(filter)}
                  className="btn-pill"
                  style={{
                    backgroundColor: galleryFilter === filter ? '#EE7F1A' : '#33231A',
                    color: '#FFF6EC',
                    border: '2px solid #FFF6EC',
                    minHeight: '38px',
                    padding: '6px 16px',
                    fontSize: '12px'
                  }}
                >
                  {filter.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-polaroid-grid">
            {filteredGallery.map((item, idx) => (
              <div
                key={idx}
                className={`polaroid-card ${item.tilt}`}
                onClick={() => setSelectedPhoto(item)}
              >
                <div className="polaroid-img-wrap" style={{ backgroundColor: item.tint }}>
                  <img src={item.img} alt={item.caption} loading="lazy" />
                </div>
                <div className="polaroid-caption">
                  {item.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(33,23,18,0.92)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '16px 16px 24px',
              borderRadius: '20px',
              border: '3px solid #211712',
              boxShadow: '10px 10px 0 #000',
              maxWidth: '500px',
              width: '100%',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  background: '#EE7F1A',
                  color: '#fff',
                  border: '2px solid #211712',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ backgroundColor: selectedPhoto.tint, borderRadius: '12px', overflow: 'hidden', marginBottom: '14px' }}>
              <img src={selectedPhoto.img} alt={selectedPhoto.caption} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ fontFamily: 'var(--font-accent)', fontSize: '26px', fontWeight: '700', color: '#211712' }}>
              {selectedPhoto.caption}
            </div>
          </div>
        </div>
      )}

      {/* ── 8. REVIEWS SECTION (Cream Background) ── */}
      <section id="reviews" className="reviews-section">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">
              <Star size={14} fill="#EE7F1A" color="#EE7F1A" />
              <span>Real Customer Feedback</span>
            </div>
            <h2 className="section-heading-big">
              What Food Lovers Say
            </h2>
            <p className="section-subtext">
              100% authentic Google reviews from our beloved diners in Jiyanpur.
            </p>
          </div>

          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="review-quote-card">
                <div>
                  <div className="review-stars-row">
                    {[...Array(r.stars)].map((_, s) => (
                      <Star key={s} size={18} fill="#EE7F1A" color="#EE7F1A" strokeWidth={1.8} />
                    ))}
                  </div>
                  <p className="review-body-text">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </div>
                <div className="review-author-wrap">
                  <div className="review-avatar-circle" style={{ backgroundColor: i % 2 === 0 ? '#FFE3C2' : '#D8F1FC' }}>
                    {r.initial}
                  </div>
                  <div>
                    <div className="review-author-name">{r.name}</div>
                    <div className="review-author-source">{r.source}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. INSTAGRAM STRIP (White Background) ── */}
      <section className="insta-section">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">
              <Instagram size={14} strokeWidth={1.8} />
              <span>@zorkojiyanpur</span>
            </div>
            <h2 className="section-heading-big">
              Follow the Flavor
            </h2>
            <p className="section-subtext">
              Tag @zorkojiyanpur in your stories for a feature on our wall!
            </p>
          </div>

          <div className="insta-tiles-grid">
            {[
              { img: '/images/food/burger.webp', label: 'Crispy Burger' },
              { img: '/images/food/pizza.webp', label: 'Cheesy Pizza' },
              { img: '/images/food/blue-mojito.webp', label: 'Blue Mojito' },
              { img: '/images/food/veg-wrap.webp', label: 'Paneer Wrap' },
              { img: '/images/food/garlic-bread.webp', label: 'Garlic Bread' },
              { img: '/images/food/cold-coffee.webp', label: 'Cold Coffee' },
            ].map((tile, i) => (
              <a
                key={i}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="insta-tile"
              >
                <img src={tile.img} alt={tile.label} loading="lazy" />
                <div className="insta-tile-overlay">
                  <Instagram size={24} strokeWidth={1.8} />
                  <span>View Reel</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. GAME ZONE (Ink Background) ── */}
      <section id="game-zone" className="gamezone-section">
        <div className="container">
          <div className="gamezone-header">
            <div className="section-badge-pill" style={{ backgroundColor: '#EE7F1A', color: '#FFFFFF', borderColor: '#FFF6EC' }}>
              <Gamepad2 size={14} strokeWidth={1.8} />
              <span>Zorko Game Zone</span>
            </div>
            <h2 className="section-heading-big" style={{ color: '#FFF6EC' }}>
              Play Games • Win Coins
            </h2>
            <p className="section-subtext" style={{ color: 'rgba(255,246,236,0.7)' }}>
              Win games to earn discount coins! 100 coins = 1% discount at our Jiyanpur café!
            </p>
          </div>

          {/* User Profile Bar */}
          <div className="gz-profile-pill-bar">
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '15px', color: '#FFF6EC', fontWeight: '800' }}>
                  👋 Welcome, <span style={{ color: '#EE7F1A' }}>{currentUser.name}</span>!
                </span>
                <span style={{ fontSize: '12px', background: '#3D2D24', color: '#FFE3C2', padding: '4px 10px', borderRadius: '8px' }}>
                  🪙 {coins} Coins ({(coins / 100).toFixed(1)}% OFF)
                </span>
              </div>
            ) : (
              <span style={{ fontSize: '14px', color: '#FFE3C2', fontWeight: '700' }}>
                Play to earn discount coins! Register to save your high scores.
              </span>
            )}

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {currentUser ? (
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    localStorage.removeItem('zorko_user');
                  }}
                  className="btn-pill btn-pill-cream"
                  style={{ minHeight: '36px', padding: '4px 14px', fontSize: '12px' }}
                >
                  Log Out
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="btn-pill btn-pill-orange"
                  style={{ minHeight: '36px', padding: '4px 16px', fontSize: '12px' }}
                >
                  Login / Register
                </button>
              )}
              <button
                onClick={() => setShowCoinModal(true)}
                className="btn-pill btn-pill-cream"
                style={{ minHeight: '36px', padding: '4px 14px', fontSize: '12px' }}
              >
                <Coins size={14} />
                <span>Coin Wallet</span>
              </button>
            </div>
          </div>

          {/* Active Game or Game Cards */}
          {activeGame === 'tictactoe' ? (
            <TicTacToe onWin={() => awardCoin('Tic Tac Toe')} onBack={() => setActiveGame(null)} />
          ) : activeGame === 'rps' ? (
            <RockPaperScissors onWin={() => awardCoin('Rock Paper Scissors')} onBack={() => setActiveGame(null)} />
          ) : (
            <div className="game-cards-row">
              <div className="game-select-card" onClick={() => setActiveGame('tictactoe')}>
                <div className="game-icon-circle">
                  <Gamepad2 size={30} strokeWidth={1.8} />
                </div>
                <h4 className="game-card-title">Tic Tac Toe</h4>
                <p className="game-card-desc">Beat the Zorko Bot to earn +1 coin</p>
                <button className="game-play-btn-small">Play Now</button>
              </div>

              <div className="game-select-card" onClick={() => setActiveGame('rps')}>
                <div className="game-icon-circle" style={{ borderColor: '#00A0E3', color: '#00A0E3' }}>
                  <Sparkles size={30} strokeWidth={1.8} />
                </div>
                <h4 className="game-card-title">Rock Paper Scissors</h4>
                <p className="game-card-desc">Best of 3 vs the Zorko Chef</p>
                <button className="game-play-btn-small" style={{ backgroundColor: '#00A0E3' }}>Play Now</button>
              </div>

              {/* Leaderboard Card */}
              <div className="game-select-card" style={{ gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Trophy size={20} color="#EE7F1A" />
                  <h4 style={{ fontFamily: 'var(--font-display)', color: '#FFF6EC', fontSize: '18px', fontWeight: '800' }}>
                    Kitchen Leaderboard
                  </h4>
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {leaders.slice(0, 3).map((l, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '6px 12px',
                        background: '#1A120E',
                        borderRadius: '10px',
                        fontSize: '13px',
                        color: '#FFE3C2'
                      }}
                    >
                      <span>#{i + 1} {l.name}</span>
                      <span style={{ fontWeight: '800', color: '#EE7F1A' }}>{l.coins} 🪙</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && (
        <div
          onClick={() => setShowAuthModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: '#211712',
              border: '2px solid #EE7F1A',
              boxShadow: '8px 8px 0 #000',
              borderRadius: '24px',
              padding: '32px 24px',
              maxWidth: '400px',
              width: '100%',
              color: '#FFF6EC'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px' }}>
                {authTab === 'register' ? 'Register Player' : 'Player Login'}
              </h3>
              <button onClick={() => setShowAuthModal(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button
                type="button"
                onClick={() => setAuthTab('register')}
                className="btn-pill"
                style={{
                  flex: 1,
                  backgroundColor: authTab === 'register' ? '#EE7F1A' : '#33231A',
                  color: '#fff',
                  fontSize: '12px',
                  minHeight: '36px',
                  padding: '4px'
                }}
              >
                New Player
              </button>
              <button
                type="button"
                onClick={() => setAuthTab('login')}
                className="btn-pill"
                style={{
                  flex: 1,
                  backgroundColor: authTab === 'login' ? '#EE7F1A' : '#33231A',
                  color: '#fff',
                  fontSize: '12px',
                  minHeight: '36px',
                  padding: '4px'
                }}
              >
                Login
              </button>
            </div>

            {authError && <div style={{ color: '#EF4444', fontSize: '13px', marginBottom: '12px' }}>{authError}</div>}

            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {authTab === 'register' && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={authName}
                  onChange={e => setAuthName(e.target.value)}
                  required
                  style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,246,236,0.3)', background: '#120B08', color: '#fff' }}
                />
              )}
              <input
                type="tel"
                placeholder="10-digit Phone"
                value={authPhone}
                onChange={e => setAuthPhone(e.target.value)}
                pattern="[0-9]{10}"
                required
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,246,236,0.3)', background: '#120B08', color: '#fff' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={authPassword}
                onChange={e => setAuthPassword(e.target.value)}
                required
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,246,236,0.3)', background: '#120B08', color: '#fff' }}
              />
              <button type="submit" className="btn-pill btn-pill-orange" style={{ width: '100%', marginTop: '8px' }}>
                {authTab === 'register' ? 'Register & Play' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Coin History Modal */}
      {showCoinModal && (
        <div
          onClick={() => setShowCoinModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              border: '3px solid #211712',
              boxShadow: '8px 8px 0 #000',
              borderRadius: '24px',
              padding: '32px 24px',
              maxWidth: '440px',
              width: '100%',
              color: '#211712'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Coins size={24} color="#EE7F1A" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '800' }}>Your Zorko Coins</h3>
              </div>
              <button onClick={() => setShowCoinModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ textAlign: 'center', padding: '16px 0', borderBottom: '1px dashed #211712', marginBottom: '16px' }}>
              <div style={{ fontSize: '40px', fontFamily: 'var(--font-display)', fontWeight: '800', color: '#EE7F1A' }}>
                {coins} 🪙
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700' }}>
                Discount Value: <strong style={{ color: '#1A9E4B' }}>{(coins / 100).toFixed(1)}% OFF</strong>
              </div>
              <p style={{ fontSize: '12px', color: '#6B584C', marginTop: '4px' }}>
                Show this coin screen at our Jiyanpur counter to claim your discount!
              </p>
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: '800', marginBottom: '10px' }}>Recent Activity</h4>
            <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {coinHistory.length === 0 ? (
                <p style={{ fontSize: '13px', color: '#6B584C', textAlign: 'center', padding: '12px' }}>Play games to earn your first coins!</p>
              ) : (
                coinHistory.slice().reverse().map((h, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 10px', background: '#FFF6EC', borderRadius: '8px' }}>
                    <span>🪙 {h.game}</span>
                    <span style={{ fontWeight: '800', color: '#EE7F1A' }}>+{h.amount} ({h.date})</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── 11. VISIT US SECTION (White Background) ── */}
      <section id="visit-us" className="visitus-section">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">
              <MapPin size={14} strokeWidth={1.8} />
              <span>Location & Contact</span>
            </div>
            <h2 className="section-heading-big">
              Visit Zorko Jiyanpur
            </h2>
            <p className="section-subtext">
              Come hungry, leave happy! We are conveniently located right on Doharighat Road in Jiyanpur.
            </p>
          </div>

          <div className="visitus-grid">
            {/* Info Cards Column */}
            <div className="visitus-card-col">
              <div className="info-detail-card">
                <div className="info-icon-pill">
                  <MapPin size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="info-card-title">Outlet Address</h4>
                  <p className="info-card-text">{ADDRESS_TEXT}</p>
                </div>
              </div>

              <div className="info-detail-card">
                <div className="info-icon-pill" style={{ backgroundColor: '#00A0E3' }}>
                  <Clock size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="info-card-title">Opening Hours</h4>
                  <p className="info-card-text">{HOURS_TEXT}</p>
                </div>
              </div>

              <div className="info-detail-card">
                <div className="info-icon-pill" style={{ backgroundColor: '#1A9E4B' }}>
                  <Phone size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="info-card-title">Contact Us (Inquiries Only)</h4>
                  <p className="info-card-text">
                    Phone: <a href={TEL_LINK} style={{ color: '#EE7F1A', fontWeight: '800', textDecoration: 'none' }}>{PHONE_NUMBER}</a>
                    <br />
                    Email: <a href={`mailto:${EMAIL_ADDRESS}`} style={{ color: '#211712', textDecoration: 'none' }}>{EMAIL_ADDRESS}</a>
                  </p>
                  <p style={{ fontSize: '11px', color: '#6B584C', marginTop: '4px', fontStyle: 'italic' }}>
                    Dine-in café & takeaway counter. Contact & inquiries only.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                <a href={TEL_LINK} className="btn-pill btn-pill-orange" style={{ flex: 1 }}>
                  <Phone size={18} strokeWidth={1.8} />
                  <span>Call Karein</span>
                </a>
                <a
                  href="https://maps.app.goo.gl/9y75o3xCu1iQ7kn68"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill-ink"
                  style={{ flex: 1 }}
                >
                  <ExternalLink size={18} strokeWidth={1.8} />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="map-frame-box">
              <iframe
                src="https://maps.google.com/maps?q=Zorko%20Restaurant%20Jiyanpur%20Doharighat%20Road%20near%20Hydel%20in%20front%20of%20Shiv%20Mandir&t=&z=16&ie=UTF8&iwloc=&output=embed"
                title="Zorko Jiyanpur Google Map"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. FOOTER (Ink Background) ── */}
      <footer className="zorko-footer">
        <div className="container">
          {/* Big ZORKO Display Wordmark */}
          <div className="footer-big-wordmark">
            ZORKO
          </div>

          <div className="footer-main-grid">
            {/* Column 1: Brand Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="nav-logo-circle" style={{ width: '52px', height: '52px' }}>
                  <img src={OFFICIAL_LOGO} alt="Zorko Jiyanpur Logo" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '800', color: '#FFF6EC' }}>
                    ZORKO JIYANPUR
                  </div>
                  <div style={{ color: '#EE7F1A', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
                    Brand of Food Lovers
                  </div>
                </div>
              </div>
              <p className="footer-brand-bio">
                Jiyanpur&apos;s ultimate fast-food destination. Delicious burgers, artisan pizzas, crispy fries, thick shakes, and refreshing mojitos. Good food, good mood, great moments.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="footer-column-heading">Quick Links</h4>
              <ul className="footer-links-list">
                <li><a href="#hero">Home</a></li>
                <li><a href="#menu">Complete Menu</a></li>
                <li><a href="#gallery">Food Gallery</a></li>
                <li><a href="#reviews">Customer Reviews</a></li>
                <li><a href="#student">Student Offers</a></li>
                <li><a href="#game-zone">Game Zone</a></li>
                <li><a href="#visit-us">Visit Outlet</a></li>
              </ul>
            </div>

            {/* Column 3: Hours & Contact */}
            <div>
              <h4 className="footer-column-heading">Contact & Timing</h4>
              <p style={{ fontSize: '14px', color: 'rgba(255,246,236,0.8)', marginBottom: '8px' }}>
                <strong>Hours:</strong><br />{HOURS_TEXT}
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255,246,236,0.8)', marginBottom: '8px' }}>
                <strong>Address:</strong><br />{ADDRESS_TEXT}
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255,246,236,0.8)', marginBottom: '14px' }}>
                <strong>Phone:</strong> <a href={TEL_LINK} style={{ color: '#EE7F1A', textDecoration: 'none', fontWeight: '700' }}>{PHONE_NUMBER}</a>
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#EE7F1A',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '700'
                }}
              >
                <Instagram size={16} />
                <span>@zorkojiyanpur</span>
              </a>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <span>© Zorko Jiyanpur • Brand of Food Lovers</span>
            <span>100% Pure Vegetarian Fast Food Café</span>
          </div>
        </div>
      </footer>

      {/* ── Floating Mobile Call Button ── */}
      <a
        href={TEL_LINK}
        className="floating-mobile-call"
        aria-label="Call Zorko Jiyanpur"
        title="Call Zorko Jiyanpur"
      >
        <Phone size={24} strokeWidth={1.8} />
      </a>
    </div>
  );
}
