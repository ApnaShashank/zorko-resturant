'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { subscribeToPush } from './components/PWAProvider';

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
  { name: 'Nandani', initial: 'N', text: 'Zorko in Jiyanpur is honestly a game-changer for food lovers in the area. The place brings a fresh vibe with its modern setup, clean environment, and quick service that you usually don\'t expect in a small town. The menu is loaded with variety—especially their burgers, pizzas, and cheesy snacks—which are full of flavor and perfectly cooked.', stars: 5, source: 'Google Review' },
  { name: 'Shyam Kumar (SKS)', initial: 'S', text: 'Great place to hang out with friends. Specially their mojito was really good and refreshing!', stars: 5, source: 'Google Review' },
  { name: 'Bandana Singh', initial: 'B', text: 'The taste of the food was really amazing and the quality was top notch. Highly recommended!', stars: 5, source: 'Google Review' },
];

// ─── Dynamic Leaderboard Integration ───

// ─── Game Constants ───
const MEMORY_EMOJIS = ['🍔', '🍕', '🌮', '🍟', '🥤', '🧁'];
const FOOD_CATCHER_ITEMS = ['🍔', '🍕', '🌮', '🍟', '🥤', '🧁', '🍩', '🥪'];
const FOOD_CATCHER_BOMBS = ['🌶️', '💣', '🔥'];

// ════════════════════════════════════════
// ─── GAME COMPONENTS ───
// ════════════════════════════════════════

// ─── Tic Tac Toe ───
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
    // Try to win
    for (let i = 0; i < 9; i++) {
      if (!b[i]) { const t = [...b]; t[i] = 'O'; if (checkWinner(t)?.winner === 'O') return i; }
    }
    // Block player
    for (let i = 0; i < 9; i++) {
      if (!b[i]) { const t = [...b]; t[i] = 'X'; if (checkWinner(t)?.winner === 'X') return i; }
    }
    // Center
    if (!b[4]) return 4;
    // Corners
    const corners = [0,2,6,8].filter(i => !b[i]);
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
    // Any
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
    <div className="game-container">
      <div className="game-top-bar">
        <button className="game-back-btn" onClick={onBack}>← Back</button>
        <h3>Tic Tac Toe</h3>
        <span className="game-badge">vs Zorko Bot 🤖</span>
      </div>
      <p className="game-status">
        {winner === 'X' ? '🎉 You Won! +1 Coin!' : winner === 'O' ? '😢 Bot Wins! Try Again' : winner === 'draw' ? '🤝 Draw!' : isPlayerTurn ? 'Your Turn (X)' : 'Bot Thinking...'}
      </p>
      <div className="ttt-board">
        {board.map((cell, i) => (
          <button
            key={i}
            className={`ttt-cell ${cell ? 'filled' : ''} ${cell === 'X' ? 'player-x' : cell === 'O' ? 'player-o' : ''} ${winLine?.includes(i) ? 'win-cell' : ''}`}
            onClick={() => handleClick(i)}
            disabled={!!cell || !!winner || !isPlayerTurn}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && <button className="game-retry-btn" onClick={reset}>Play Again</button>}
    </div>
  );
}

// ─── Rock Paper Scissors ───
function RockPaperScissors({ onWin, onBack }) {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [cpuChoice, setCpuChoice] = useState(null);
  const [roundResult, setRoundResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [round, setRound] = useState(1);
  const [matchOver, setMatchOver] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const choices = ['🪨', '📄', '✂️'];
  const labels = ['Rock', 'Paper', 'Scissors'];

  const getResult = (p, c) => {
    if (p === c) return 'draw';
    if ((p === 0 && c === 2) || (p === 1 && c === 0) || (p === 2 && c === 1)) return 'win';
    return 'lose';
  };

  const play = (pi) => {
    if (matchOver || showResult) return;
    const ci = Math.floor(Math.random() * 3);
    setPlayerChoice(pi);
    setCpuChoice(ci);
    const result = getResult(pi, ci);
    setRoundResult(result);
    setShowResult(true);

    setTimeout(() => {
      let ps = playerScore, cs = cpuScore;
      if (result === 'win') { ps = playerScore + 1; setPlayerScore(ps); }
      else if (result === 'lose') { cs = cpuScore + 1; setCpuScore(cs); }

      if (ps >= 2 || cs >= 2) {
        setMatchOver(true);
        if (ps >= 2) onWin();
      } else {
        setRound(r => r + 1);
      }
      setShowResult(false);
    }, 1200);
  };

  const reset = () => {
    setPlayerChoice(null); setCpuChoice(null); setRoundResult(null);
    setPlayerScore(0); setCpuScore(0); setRound(1);
    setMatchOver(false); setShowResult(false);
  };

  return (
    <div className="game-container">
      <div className="game-top-bar">
        <button className="game-back-btn" onClick={onBack}>← Back</button>
        <h3>Rock Paper Scissors</h3>
        <span className="game-badge">Best of 3 👨‍🍳</span>
      </div>
      <div className="rps-scores">
        <div className={`rps-score-card ${playerScore > cpuScore ? 'leading' : ''}`}>
          <span className="rps-score-label">You</span>
          <span className="rps-score-num">{playerScore}</span>
        </div>
        <div className="rps-round-badge">Round {round}</div>
        <div className={`rps-score-card ${cpuScore > playerScore ? 'leading' : ''}`}>
          <span className="rps-score-label">Chef</span>
          <span className="rps-score-num">{cpuScore}</span>
        </div>
      </div>

      {showResult && (
        <div className="rps-battle">
          <div className={`rps-choice-display ${roundResult === 'win' ? 'winner' : ''}`}>
            <span className="rps-big-emoji">{choices[playerChoice]}</span>
            <span>You</span>
          </div>
          <span className="rps-vs">VS</span>
          <div className={`rps-choice-display ${roundResult === 'lose' ? 'winner' : ''}`}>
            <span className="rps-big-emoji">{choices[cpuChoice]}</span>
            <span>Chef</span>
          </div>
        </div>
      )}

      {!showResult && !matchOver && (
        <div className="rps-choices">
          <p className="game-status">Pick your weapon!</p>
          <div className="rps-buttons">
            {choices.map((c, i) => (
              <button key={i} className="rps-pick-btn" onClick={() => play(i)}>
                <span className="rps-pick-emoji">{c}</span>
                <span className="rps-pick-label">{labels[i]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {matchOver && (
        <div className="game-result-box">
          <p className="game-status">{playerScore >= 2 ? '🎉 You Beat the Chef! +1 Coin!' : '😢 Chef Wins! Try Again!'}</p>
          <button className="game-retry-btn" onClick={reset}>Play Again</button>
        </div>
      )}
    </div>
  );
}

// ─── Food Catcher ───
function FoodCatcher({ onWin, onBack }) {
  const canvasRef = useRef(null);
  const gameRef = useRef({ basket: 0, foods: [], score: 0, lives: 3, gameOver: false, won: false, frame: 0, spawnTimer: 0 });
  const animRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [started, setStarted] = useState(false);
  const keysRef = useRef({ left: false, right: false });

  const initGame = useCallback(() => {
    const g = gameRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width;
    g.basket = W / 2 - 30;
    g.foods = [];
    g.score = 0;
    g.lives = 3;
    g.gameOver = false;
    g.won = false;
    g.frame = 0;
    g.spawnTimer = 0;
    setScore(0); setLives(3); setGameOver(false); setWon(false);
  }, []);

  const spawnFood = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width;
    const isBomb = Math.random() < 0.2;
    const items = isBomb ? FOOD_CATCHER_BOMBS : FOOD_CATCHER_ITEMS;
    gameRef.current.foods.push({
      x: Math.random() * (W - 40) + 10,
      y: -30,
      emoji: items[Math.floor(Math.random() * items.length)],
      isBomb,
      speed: 1.5 + Math.random() * 1.5,
    });
  }, []);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const g = gameRef.current;
    const W = canvas.width, H = canvas.height;

    if (g.gameOver) return;

    ctx.clearRect(0, 0, W, H);

    // Move basket
    if (keysRef.current.left) g.basket = Math.max(0, g.basket - 5);
    if (keysRef.current.right) g.basket = Math.min(W - 60, g.basket + 5);

    // Draw basket
    ctx.font = '36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🍽️', g.basket + 30, H - 16);

    // Spawn
    g.spawnTimer++;
    if (g.spawnTimer > 50) { spawnFood(); g.spawnTimer = 0; }

    // Update foods
    g.foods = g.foods.filter(f => {
      f.y += f.speed;
      ctx.font = '28px serif';
      ctx.fillText(f.emoji, f.x + 14, f.y + 28);

      // Catch
      if (f.y + 28 >= H - 40 && f.x > g.basket - 15 && f.x < g.basket + 65) {
        if (f.isBomb) {
          g.lives--;
          setLives(g.lives);
          if (g.lives <= 0) { g.gameOver = true; setGameOver(true); }
        } else {
          g.score++;
          setScore(g.score);
          if (g.score >= 10) { g.gameOver = true; g.won = true; setWon(true); setGameOver(true); onWin(); }
        }
        return false;
      }

      // Missed good food
      if (f.y > H + 30) {
        if (!f.isBomb) { g.lives--; setLives(g.lives); if (g.lives <= 0) { g.gameOver = true; setGameOver(true); } }
        return false;
      }
      return true;
    });

    // HUD
    ctx.fillStyle = '#FF8119';
    ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${g.score}/10`, 10, 22);
    ctx.textAlign = 'right';
    ctx.fillText(`Lives: ${'❤️'.repeat(g.lives)}`, W - 10, 22);

    if (!g.gameOver) animRef.current = requestAnimationFrame(gameLoop);
  }, [spawnFood, onWin]);

  useEffect(() => {
    if (!started) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = Math.min(360, window.innerWidth - 40);
    canvas.height = 500;
    initGame();

    const onKeyDown = (e) => { if (e.key === 'ArrowLeft') keysRef.current.left = true; if (e.key === 'ArrowRight') keysRef.current.right = true; };
    const onKeyUp = (e) => { if (e.key === 'ArrowLeft') keysRef.current.left = false; if (e.key === 'ArrowRight') keysRef.current.right = false; };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    animRef.current = requestAnimationFrame(gameLoop);
    return () => { window.removeEventListener('keydown', onKeyDown); window.removeEventListener('keyup', onKeyUp); cancelAnimationFrame(animRef.current); };
  }, [started, initGame, gameLoop]);

  const restart = () => { initGame(); animRef.current = requestAnimationFrame(gameLoop); };
  const holdLeft = () => { keysRef.current.left = true; };
  const holdRight = () => { keysRef.current.right = true; };
  const release = () => { keysRef.current.left = false; keysRef.current.right = false; };

  // Touch move on canvas
  const handleTouchMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    gameRef.current.basket = Math.max(0, Math.min(canvas.width - 60, x - 30));
  };

  return (
    <div className="game-container">
      <div className="game-top-bar">
        <button className="game-back-btn" onClick={onBack}>← Back</button>
        <h3>Food Catcher</h3>
        <span className="game-badge">Catch 10! 🍽️</span>
      </div>
      {!started ? (
        <div className="game-start-screen">
          <div className="game-start-emoji">🍔</div>
          <h4>Catch falling foods!</h4>
          <p>Catch 10 items to earn a coin.<br/>Avoid 🌶️💣🔥 bombs!</p>
          <button className="game-retry-btn" onClick={() => setStarted(true)}>Start Game</button>
        </div>
      ) : (
        <>
          <div className="catcher-canvas-wrap">
            <canvas ref={canvasRef} className="catcher-canvas" onTouchMove={handleTouchMove} onTouchStart={handleTouchMove} />
          </div>
          <div className="catcher-controls">
            <button className="catcher-ctrl-btn" onTouchStart={holdLeft} onMouseDown={holdLeft} onTouchEnd={release} onMouseUp={release} onMouseLeave={release}>◀</button>
            <span className="catcher-score-display">🍔 {score}/10 &nbsp; ❤️ {lives}</span>
            <button className="catcher-ctrl-btn" onTouchStart={holdRight} onMouseDown={holdRight} onTouchEnd={release} onMouseUp={release} onMouseLeave={release}>▶</button>
          </div>
          {gameOver && (
            <div className="game-result-box">
              <p className="game-status">{won ? '🎉 You Caught Them All! +1 Coin!' : '💥 Game Over! Try Again!'}</p>
              <button className="game-retry-btn" onClick={restart}>Play Again</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Memory Match ───
function MemoryMatch({ onWin, onBack }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const lockRef = useRef(false);

  useEffect(() => { initCards(); }, []);

  const initCards = () => {
    const pairs = [...MEMORY_EMOJIS, ...MEMORY_EMOJIS];
    const shuffled = pairs.sort(() => Math.random() - 0.5).map((emoji, i) => ({ id: i, emoji }));
    setCards(shuffled);
    setFlipped([]); setMatched([]); setMoves(0); setGameOver(false); setWon(false);
    lockRef.current = false;
  };

  const handleFlip = (id) => {
    if (lockRef.current || flipped.includes(id) || matched.includes(id) || gameOver) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      lockRef.current = true;
      const newMoves = moves + 1;
      setMoves(newMoves);

      const [a, b] = newFlipped;
      if (cards[a].emoji === cards[b].emoji) {
        const newMatched = [...matched, a, b];
        setMatched(newMatched);
        setFlipped([]);
        lockRef.current = false;
        if (newMatched.length === cards.length) {
          setGameOver(true);
          if (newMoves <= 18) { setWon(true); onWin(); } else { setWon(false); }
        }
      } else {
        setTimeout(() => { setFlipped([]); lockRef.current = false; }, 800);
      }

      if (newMoves >= 18 && !gameOver) {
        setTimeout(() => {
          const matchedSoFar = matched.length + (cards[newFlipped[0]]?.emoji === cards[newFlipped[1]]?.emoji ? 2 : 0);
          if (matchedSoFar < cards.length) { setGameOver(true); setWon(false); }
        }, 900);
      }
    }
  };

  return (
    <div className="game-container">
      <div className="game-top-bar">
        <button className="game-back-btn" onClick={onBack}>← Back</button>
        <h3>Memory Match</h3>
        <span className="game-badge">Moves: {moves}/18 🧠</span>
      </div>
      <p className="game-status">
        {gameOver ? (won ? '🎉 Perfect Memory! +1 Coin!' : '😢 Too many moves! Try again!') : `Match all pairs in ≤18 moves`}
      </p>
      <div className="memory-grid">
        {cards.map((card, i) => (
          <button
            key={card.id}
            className={`memory-card ${flipped.includes(i) || matched.includes(i) ? 'flipped' : ''} ${matched.includes(i) ? 'matched' : ''}`}
            onClick={() => handleFlip(i)}
          >
            <div className="memory-card-inner">
              <div className="memory-card-front">🍽️</div>
              <div className="memory-card-back">{card.emoji}</div>
            </div>
          </button>
        ))}
      </div>
      {gameOver && <button className="game-retry-btn" onClick={initCards}>Play Again</button>}
    </div>
  );
}

// ─── Coin Modal ───
function CoinModal({ coins, history, onClose }) {
  const discount = (coins / 100).toFixed(1);
  return (
    <div className="coin-modal-overlay" onClick={onClose}>
      <div className="coin-modal" onClick={e => e.stopPropagation()}>
        <button className="coin-modal-close" onClick={onClose}>✕</button>
        <div className="coin-modal-header">
          <div className="coin-modal-big-coin">🪙</div>
          <h2>{coins} Coins</h2>
          <div className="coin-discount-badge">{discount}% OFF</div>
          <p className="coin-modal-sub">100 coins = 1% discount on your order!</p>
        </div>
        <div className="coin-modal-body">
          <h4>📜 Coin History</h4>
          {history.length === 0 ? (
            <p className="coin-empty">No coins earned yet. Play games to earn!</p>
          ) : (
            <div className="coin-history-list">
              {[...history].reverse().map((h, i) => (
                <div key={i} className="coin-history-item">
                  <div className="coin-history-game">
                    <span className="coin-dot">🪙</span>
                    <span>{h.game}</span>
                  </div>
                  <div className="coin-history-meta">
                    <span>+{h.amount} coin</span>
                    <span className="coin-history-date">{h.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {coins >= 100 && (
          <div className="coin-claim-section">
            <p>🎁 Show this screen at Zorko to claim <strong>{discount}% OFF</strong>!</p>
          </div>
        )}
      </div>
    </div>
  );
}


// ════════════════════════════════════════
// ─── MAIN HOME COMPONENT ───
// ════════════════════════════════════════

export default function Home() {
  const [activeCat, setActiveCat] = useState('burgers');
  const [scrolled, setScrolled] = useState(false);
  const categoriesRef = useRef(null);

  // Game state
  const [coins, setCoins] = useState(0);
  const [coinHistory, setCoinHistory] = useState([]);
  const [activeGame, setActiveGame] = useState(null);
  const [showCoinModal, setShowCoinModal] = useState(false);
  const [coinCelebrate, setCoinCelebrate] = useState(false);

  // Auth and Leaderboard states
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('register'); // 'register' or 'login'
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [pendingGame, setPendingGame] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [loadingLeaders, setLoadingLeaders] = useState(true);

  // Loading states
  const [profileLoading, setProfileLoading] = useState(true);
  const [gameLoading, setGameLoading] = useState(false);
  const [loadingGameTitle, setLoadingGameTitle] = useState('');
  const [coinSyncing, setCoinSyncing] = useState(false);

  // Discounts & push
  const [siteDiscounts, setSiteDiscounts] = useState([]);
  const [pushStatus, setPushStatus] = useState('idle'); // 'idle' | 'loading' | 'subscribed' | 'denied'
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  // Helper to launch game with launcher transition
  const launchGame = (gameId) => {
    const gameNameMap = {
      tictactoe: 'Tic Tac Toe',
      rps: 'Rock Paper Scissors',
      catcher: 'Food Catcher',
      memory: 'Memory Match'
    };
    setLoadingGameTitle(gameNameMap[gameId] || 'Game');
    setGameLoading(true);
    
    // Smooth scroll to game zone
    setTimeout(() => {
      document.getElementById('game-zone')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    setTimeout(() => {
      setActiveGame(gameId);
      setGameLoading(false);
    }, 900);
  };

  const handlePushSubscribe = async () => {
    if (pushStatus === 'subscribed') return;
    setPushStatus('loading');
    const result = await subscribeToPush();
    if (result.success) {
      setPushStatus('subscribed');
    } else if (result.error?.includes('denied') || result.error?.includes('permission')) {
      setPushStatus('denied');
    } else {
      setPushStatus('idle');
    }
  };

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') { setInstallPrompt(null); setShowInstallBanner(false); }
  };

  // Fetch real leaderboard
  const fetchLeaderboard = async () => {
    try {
      setLoadingLeaders(true);
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      if (data.success) {
        setLeaders(data.leaderboard);
      }
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    } finally {
      setLoadingLeaders(false);
    }
  };

  // Load user from localStorage and fetch leaderboard
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('zorko_user');
      if (savedUser) {
        const userObj = JSON.parse(savedUser);
        setCurrentUser(userObj);
        setCoins(userObj.coins || 0);
        setCoinHistory(userObj.history || []);
      } else {
        setCoins(0);
        setCoinHistory([]);
      }
    } catch (e) { /* ignore */ }
    fetchLeaderboard();
    setProfileLoading(false);

    // Fetch active discounts for landing page
    fetch('/api/discounts').then(r => r.json()).then(d => { if (d.success) setSiteDiscounts(d.discounts); }).catch(() => {});

    // Check push notification status
    if ('Notification' in window) {
      if (Notification.permission === 'granted') setPushStatus('subscribed');
      else if (Notification.permission === 'denied') setPushStatus('denied');
    }

    // PWA install prompt
    const handleBeforeInstall = (e) => { e.preventDefault(); setInstallPrompt(e); setShowInstallBanner(true); };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const awardCoin = async (gameName) => {
    if (!currentUser) return;

    setCoinSyncing(true);
    try {
      const res = await fetch('/api/user/coins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: currentUser.phone, game: gameName })
      });
      const data = await res.json();
      if (data.success) {
        setCoins(data.user.coins);
        setCoinHistory(data.user.history);
        const updatedUser = { ...currentUser, coins: data.user.coins, history: data.user.history };
        setCurrentUser(updatedUser);
        try {
          localStorage.setItem('zorko_user', JSON.stringify(updatedUser));
          localStorage.setItem('zorko_coins', data.user.coins.toString());
          localStorage.setItem('zorko_coin_history', JSON.stringify(data.user.history));
        } catch (e) { /* ignore */ }
        fetchLeaderboard();
      }
    } catch (err) {
      console.error('Failed to update coins in database:', err);
      // Fallback
      const newCoins = coins + 1;
      const entry = {
        game: gameName,
        amount: 1,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      };
      const newHistory = [...coinHistory, entry];
      setCoins(newCoins);
      setCoinHistory(newHistory);
      try {
        localStorage.setItem('zorko_coins', newCoins.toString());
        localStorage.setItem('zorko_coin_history', JSON.stringify(newHistory));
      } catch (e) { /* ignore */ }
    } finally {
      setCoinSyncing(false);
    }

    setCoinCelebrate(true);
    setTimeout(() => setCoinCelebrate(false), 2000);
  };

  const handlePlayGame = (gameId) => {
    if (!currentUser) {
      setPendingGame(gameId);
      setAuthTab('register');
      setAuthError('');
      setAuthName('');
      setAuthPhone('');
      setAuthPassword('');
      setShowAuthModal(true);
    } else {
      launchGame(gameId);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const payload = {
        action: authTab,
        phone: authPhone,
        password: authPassword,
        ...(authTab === 'register' ? { name: authName } : {})
      };

      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || 'Authentication failed.');
        setAuthLoading(false);
        return;
      }

      setCurrentUser(data.user);
      setCoins(data.user.coins);
      setCoinHistory(data.user.history);

      try {
        localStorage.setItem('zorko_user', JSON.stringify(data.user));
        localStorage.setItem('zorko_coins', data.user.coins.toString());
        localStorage.setItem('zorko_coin_history', JSON.stringify(data.user.history));
      } catch (e) { /* ignore */ }

      setShowAuthModal(false);
      setAuthLoading(false);

      if (pendingGame) {
        launchGame(pendingGame);
        setPendingGame(null);
      }

      fetchLeaderboard();
    } catch (err) {
      console.error('Auth error:', err);
      setAuthError('Connection failed. Please check your internet connection.');
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCoins(0);
    setCoinHistory([]);
    try {
      localStorage.removeItem('zorko_user');
      localStorage.removeItem('zorko_coins');
      localStorage.removeItem('zorko_coin_history');
    } catch (e) { /* ignore */ }
    fetchLeaderboard();
  };

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

  // Leaderboard data is fetched dynamically and stored in "leaders" state

  const gameCards = [
    { id: 'tictactoe', emoji: '❌', title: 'Tic Tac Toe', desc: 'Beat Zorko Bot', color: '#FF8119' },
    { id: 'rps', emoji: '✊', title: 'Rock Paper Scissors', desc: 'vs Zorko Chef', color: '#2D68FF' },
    { id: 'catcher', emoji: '🍔', title: 'Food Catcher', desc: 'Catch 10 foods!', color: '#25D366' },
    { id: 'memory', emoji: '🧠', title: 'Memory Match', desc: 'Find all pairs', color: '#e6683c' },
  ];

  return (
    <>
      {/* ─── Coin Celebration ─── */}
      {coinCelebrate && (
        <div className="coin-celebrate">
          <div className="coin-celebrate-inner">
            <span className="coin-celebrate-emoji">🪙</span>
            <span>+1 Coin!</span>
          </div>
        </div>
      )}

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
          <a href="#game-zone">Game</a>
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
          <h1>Jiyanpur&apos;s<br /><span className="highlight">Favorite</span> Food Spot 🍔</h1>
          <p className="hero-sub">Good Food • Good Mood • Great Moments</p>
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
        <button className="action-btn" onClick={() => scrollToSection('menu')}>
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
        <button className="action-btn" onClick={() => scrollToSection('game-zone')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 12h4m-2-2v4m5 1h2m-1-1v.01M15 10h.01M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6z"/></svg>
          Game
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
            {['🍔','🥤','🧁','🍕','🌮','🥪','🍟','🍩'].map((e, i) => (
              <div key={i} className="insta-item" style={{ background: '#141414' }}>
                {e}
                <div className="insta-overlay">▶ View Reel</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* ─── GAME ZONE ─── */}
      {/* ════════════════════════════════════════ */}
      <section id="game-zone" className="game-zone-section">
        <div className="container">
          <div className="reveal">
            <p className="section-label">Play & Win</p>
            <h2 className="section-title">🎮 Zorko<br />Game Zone</h2>
          </div>

          {/* ─── User Session Profile Bar ─── */}
          <div className="gz-profile-bar reveal">
            {profileLoading ? (
              <div className="gz-profile-info gz-profile-skeleton skeleton-shimmer">
                <div className="gz-profile-welcome-skeleton"></div>
                <div className="gz-profile-btn-skeleton"></div>
              </div>
            ) : currentUser ? (
              <div className="gz-profile-info">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="gz-profile-welcome">👋 Welcome, <span className="gz-profile-name">{currentUser.name}</span>!</span>
                  {currentUser.uid && <span style={{ fontSize: '11px', color: '#FF8119', fontWeight: 700, opacity: 0.8 }}>🆔 UID: {currentUser.uid}</span>}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={handlePushSubscribe}
                    title={pushStatus === 'subscribed' ? 'Notifications enabled!' : pushStatus === 'denied' ? 'Notifications blocked in browser settings' : 'Enable offer notifications'}
                    style={{ background: pushStatus === 'subscribed' ? 'rgba(34,197,94,0.15)' : 'rgba(255,129,25,0.12)', border: `1px solid ${pushStatus === 'subscribed' ? 'rgba(34,197,94,0.3)' : 'rgba(255,129,25,0.25)'}`, color: pushStatus === 'subscribed' ? '#22C55E' : '#FF8119', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 700, cursor: pushStatus === 'subscribed' ? 'default' : 'pointer' }}
                    disabled={pushStatus === 'loading' || pushStatus === 'denied'}
                  >
                    {pushStatus === 'subscribed' ? '🔔 Notified' : pushStatus === 'loading' ? '⏳...' : pushStatus === 'denied' ? '🔕 Blocked' : '🔔 Offers'}
                  </button>
                  <button className="gz-profile-logout" onClick={handleLogout}>Log Out</button>
                </div>
              </div>
            ) : (
              <div className="gz-profile-info anonymous">
                <span>Play games to earn discount coins!</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={handlePushSubscribe} style={{ background: 'rgba(255,129,25,0.12)', border: '1px solid rgba(255,129,25,0.25)', color: '#FF8119', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }} disabled={pushStatus === 'loading' || pushStatus === 'denied'}>
                    {pushStatus === 'subscribed' ? '🔔 Offers Enabled' : pushStatus === 'denied' ? '🔕 Blocked' : '🔔 Enable Offers'}
                  </button>
                  <button className="gz-profile-login-btn" onClick={() => { setAuthTab('login'); setShowAuthModal(true); }}>
                    Log In / Register
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ─── Leaderboard + Coins Bar ─── */}
          <div className="gz-top-bar reveal">
            <div className="gz-leaderboard">
              <h4>🏆 Leaderboard</h4>
              <div className="gz-lb-list">
                {loadingLeaders ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="gz-lb-item-skeleton skeleton-shimmer">
                      <span className="gz-lb-rank-skeleton"></span>
                      <span className="gz-lb-name-skeleton"></span>
                      <span className="gz-lb-coins-skeleton"></span>
                    </div>
                  ))
                ) : leaders.length === 0 ? (
                  <div className="gz-lb-empty">No players yet. Be the first!</div>
                ) : (
                  leaders.map((p, i) => {
                    const isYou = currentUser && p.name === currentUser.name;
                    return (
                      <div key={i} className={`gz-lb-item ${isYou ? 'gz-lb-you' : ''}`}>
                        <span className="gz-lb-rank">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}</span>
                        <span className="gz-lb-name">{p.name} {isYou && '🏆 (You)'}</span>
                        <span className="gz-lb-coins">{p.coins} 🪙</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="gz-coin-widget">
              <div className="gz-coin-display" onClick={() => setShowCoinModal(true)}>
                <div className="gz-coin-icon">🪙</div>
                <div className="gz-coin-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="gz-coin-count">{coins}</span>
                    {coinSyncing && <span className="gz-coin-sync-spinner"></span>}
                  </div>
                  <span className="gz-coin-label">Coins</span>
                </div>
              </div>
              <div className="gz-discount-badge">
                {(coins / 100).toFixed(1)}% OFF
              </div>
              <button className="gz-coin-history-btn" onClick={() => setShowCoinModal(true)}>
                View History →
              </button>
              <p className="gz-coin-hint">Win games to earn coins!<br/>100 coins = 1% discount</p>
            </div>
          </div>

          {/* ─── Active Game or Game Cards ─── */}
          {gameLoading ? (
            <div className="gz-launcher-container reveal visible">
              <div className="gz-launcher-card">
                <span className="gz-launcher-icon">🎮</span>
                <h4>Launching {loadingGameTitle}...</h4>
                <p>Initializing retro engine & syncing with kitchen leaderboard...</p>
                <div className="gz-launcher-bar">
                  <div className="gz-launcher-bar-fill"></div>
                </div>
              </div>
            </div>
          ) : activeGame === 'tictactoe' ? (
            <div className="reveal"><TicTacToe onWin={() => awardCoin('Tic Tac Toe')} onBack={() => setActiveGame(null)} /></div>
          ) : activeGame === 'rps' ? (
            <div className="reveal"><RockPaperScissors onWin={() => awardCoin('Rock Paper Scissors')} onBack={() => setActiveGame(null)} /></div>
          ) : activeGame === 'catcher' ? (
            <div className="reveal"><FoodCatcher onWin={() => awardCoin('Food Catcher')} onBack={() => setActiveGame(null)} /></div>
          ) : activeGame === 'memory' ? (
            <div className="reveal"><MemoryMatch onWin={() => awardCoin('Memory Match')} onBack={() => setActiveGame(null)} /></div>
          ) : (
            <div className="gz-game-grid reveal">
              {gameCards.map(g => (
                <button key={g.id} className="gz-game-card" onClick={() => handlePlayGame(g.id)} style={{ '--gc-color': g.color }}>
                  <span className="gz-game-emoji">{g.emoji}</span>
                  <h4>{g.title}</h4>
                  <p>{g.desc}</p>
                  <span className="gz-game-play">Play →</span>
                </button>
              ))}
            </div>
          )}
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

      {/* ─── Discounts Section ─── */}
      {siteDiscounts.length > 0 && (
        <section className="discounts-section">
          <div className="container reveal">
            <div className="section-header">
              <span className="section-label">🔥 Hot Offers</span>
              <h2>Latest <em className="em">Discounts</em></h2>
              <p>Check out our freshest deals — collect coins in Game Zone to unlock more!</p>
            </div>
            <div className="discounts-grid">
              {siteDiscounts.map((d) => (
                <div key={d._id} className="discount-card" style={{ '--discount-color': d.color || '#FF8119' }}>
                  <div className="discount-badge-icon">{d.badge || '🎉'}</div>
                  <div className="discount-content">
                    <h3 className="discount-title">{d.title}</h3>
                    {d.description && <p className="discount-desc">{d.description}</p>}
                  </div>
                  <div className="discount-shine"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              <a href="https://instagram.com/zorkojiyanpur" target="_blank" className="social-icon-btn instagram" title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://wa.me/919278140402" target="_blank" className="social-icon-btn whatsapp" title="WhatsApp" style={{ background: '#25D366', color: '#fff', borderColor: 'transparent' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
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

      {/* ─── Coin Modal ─── */}
      {showCoinModal && <CoinModal coins={coins} history={coinHistory} onClose={() => setShowCoinModal(false)} />}

      {/* ─── Auth Modal (Register/Login) ─── */}
      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => { !authLoading && setShowAuthModal(false); !authLoading && setPendingGame(null); }}>
          <div className="auth-modal" onClick={e => e.stopPropagation()}>
            {!authLoading && (
              <button className="auth-modal-close" onClick={() => { setShowAuthModal(false); setPendingGame(null); }}>✕</button>
            )}

            {authLoading ? (
              <div className="auth-loading-screen">
                <div className="auth-loading-spinner"></div>
                <h4>Connecting to Game Zone...</h4>
                <p>Verifying credentials & syncing with live player database. Please wait...</p>
              </div>
            ) : (
              <>
                <div className="auth-modal-header">
                  <div className="auth-modal-icon">🎮</div>
                  <h3>Zorko Game Zone</h3>
                  <p>Register or Login to play and earn discount coins!</p>
                </div>

                <div className="auth-tabs">
                  <button
                    className={`auth-tab-btn ${authTab === 'register' ? 'active' : ''}`}
                    type="button"
                    onClick={() => { setAuthTab('register'); setAuthError(''); }}
                  >
                    New Player
                  </button>
                  <button
                    className={`auth-tab-btn ${authTab === 'login' ? 'active' : ''}`}
                    type="button"
                    onClick={() => { setAuthTab('login'); setAuthError(''); }}
                  >
                    Already Registered
                  </button>
                </div>

                {authError && <div className="auth-error-msg">{authError}</div>}

                <form onSubmit={handleAuthSubmit} className="auth-form">
                  {authTab === 'register' && (
                    <div className="auth-input-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={authName}
                        onChange={e => setAuthName(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="auth-input-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={authPhone}
                      onChange={e => setAuthPhone(e.target.value)}
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>

                  <div className="auth-input-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      value={authPassword}
                      onChange={e => setAuthPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="auth-submit-btn" disabled={authLoading}>
                    {authTab === 'register' ? 'Register & Play' : 'Login & Play'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      {/* ─── PWA Install Banner ─── */}
      {showInstallBanner && (
        <div className="pwa-install-banner">
          <div className="pwa-install-content">
            <span className="pwa-install-icon">🍔</span>
            <div className="pwa-install-text">
              <strong>Install Zorko App!</strong>
              <span>Add to home screen for offline menu & quick access</span>
            </div>
            <button onClick={handleInstallApp} className="pwa-install-btn">Install</button>
            <button onClick={() => setShowInstallBanner(false)} className="pwa-install-close">✕</button>
          </div>
        </div>
      )}
    </>
  );
}
