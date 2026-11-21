'use client';

// Reusable sticker badges, doodles, and dividers
// Brand Colors: Cream #FFF6EC, Orange #EE7F1A, Blue #00A0E3, Ink #211712, Veg #1A9E4B

export function InstagramIcon({ size = 20, strokeWidth = 1.8, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function VegBadge({ size = 16, className = '' }) {
  return (
    <span
      className={`inline-flex items-center justify-center p-[2px] bg-white border border-[#1A9E4B] rounded-[4px] shrink-0 ${className}`}
      title="100% Pure Vegetarian"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        border: '1.5px solid #1A9E4B',
        borderRadius: '3px',
        backgroundColor: '#FFFFFF',
        padding: '2px',
        boxSizing: 'border-box'
      }}
    >
      <span
        style={{
          width: `${size * 0.45}px`,
          height: `${size * 0.45}px`,
          borderRadius: '50%',
          backgroundColor: '#1A9E4B',
          display: 'block'
        }}
      />
    </span>
  );
}

export function BestsellerBadge({ className = '', style = {} }) {
  return (
    <div
      className={`sticker-badge sticker-bestseller ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: '#EE7F1A',
        color: '#FFFFFF',
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: '12px',
        fontWeight: '800',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        padding: '5px 12px',
        borderRadius: '9999px',
        border: '2px solid #211712',
        boxShadow: '3px 3px 0 #211712',
        transform: 'rotate(-4deg)',
        userSelect: 'none',
        ...style
      }}
    >
      <span>BESTSELLER</span>
      <span style={{ fontSize: '13px' }}>★</span>
    </div>
  );
}

export function MustTryBadge({ className = '', style = {} }) {
  return (
    <div
      className={`sticker-badge sticker-musttry ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: '#00A0E3',
        color: '#FFFFFF',
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: '11px',
        fontWeight: '800',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        padding: '5px 12px',
        borderRadius: '9999px',
        border: '2px solid #211712',
        boxShadow: '3px 3px 0 #211712',
        transform: 'rotate(5deg)',
        userSelect: 'none',
        ...style
      }}
    >
      <span>MUST TRY!</span>
      <span style={{ fontSize: '12px' }}>⚡</span>
    </div>
  );
}

export function PriceTag({ price, rotate = -6, style = {} }) {
  return (
    <div
      className="sticker-price-tag"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF0D6',
        color: '#211712',
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: '15px',
        fontWeight: '800',
        padding: '4px 12px',
        borderRadius: '10px',
        border: '2px solid #211712',
        boxShadow: '3px 3px 0 #211712',
        transform: `rotate(${rotate}deg)`,
        userSelect: 'none',
        ...style
      }}
    >
      {price}
    </div>
  );
}

export function VegStamp({ style = {} }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: '#FFFFFF',
        color: '#1A9E4B',
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: '12px',
        fontWeight: '800',
        padding: '4px 10px',
        borderRadius: '9999px',
        border: '2px solid #1A9E4B',
        boxShadow: '2px 2px 0 #1A9E4B',
        userSelect: 'none',
        ...style
      }}
    >
      <VegBadge size={14} />
      <span>100% PURE VEG</span>
    </div>
  );
}

export function FlameDoodle({ size = 24, color = "#EE7F1A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="#211712" strokeWidth="1.5">
      <path d="M12 2C9.5 6 6 8.5 6 13a6 6 0 0 0 12 0c0-3-1.5-5-2.5-6.5-.5 2-2 3-3.5 3 0-2.5 1-4.5 0-7.5Z" />
    </svg>
  );
}

export function ThumbsUpDoodle({ size = 24, color = "#00A0E3" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="#211712" strokeWidth="1.5">
      <path d="M7 10v12M15 10.5V6a3 3 0 0 0-3-3l-4 7.5V22h10a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H15Z" />
    </svg>
  );
}

export function RotatingLogoBadge({ logoSrc, size = 150, className = '' }) {
  return (
    <div
      className={`rotating-badge-container ${className}`}
      style={{
        position: 'relative',
        width: `var(--badge-size, ${size}px)`,
        height: `var(--badge-size, ${size}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer rotating text ring */}
      <svg
        viewBox="0 0 200 200"
        className="rotating-svg-ring"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          animation: 'spinRing 14s linear infinite',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <path
            id="textcircle"
            d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
          />
        </defs>
        <text
          fill="#211712"
          fontSize="13"
          fontFamily="'Bricolage Grotesque', sans-serif"
          fontWeight="800"
          letterSpacing="2.5px"
        >
          <textPath href="#textcircle" startOffset="0%">
            ✦ BRAND OF FOOD LOVERS ✦ ZORKO JIYANPUR
          </textPath>
        </text>
      </svg>

      {/* Center circle with official logo */}
      <div
        style={{
          width: '62%',
          height: '62%',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          border: '3px solid #211712',
          boxShadow: '3px 3px 0 #211712',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <img
          src={logoSrc}
          alt="Zorko Jiyanpur Logo"
          style={{
            width: '90%',
            height: '90%',
            objectFit: 'contain',
            borderRadius: '50%',
          }}
        />
      </div>
    </div>
  );
}

export function WavyDivider({
  fill = '#FFF6EC',
  bg = '#EE7F1A',
  inverted = false,
  height = 48,
}) {
  return (
    <div
      style={{
        backgroundColor: bg,
        overflow: 'hidden',
        lineHeight: 0,
        transform: inverted ? 'rotate(180deg)' : 'none',
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          position: 'relative',
          display: 'block',
          width: 'calc(100% + 1.3px)',
          height: `${height}px`,
        }}
      >
        <path
          d="M0,0 C150,95 350,-40 500,45 C650,130 900,-30 1200,60 L1200,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export function NamasteSymbol({ size = 220, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ pointerEvents: 'none', overflow: 'visible' }}
    >
      {/* Warm Glow Circular Halo */}
      <circle
        cx="50"
        cy="44"
        r="36"
        fill="#FFF0D6"
        stroke="#EE7F1A"
        strokeWidth="1.8"
        strokeDasharray="3.5 3.5"
      />

      {/* Radiant Sunburst Rays */}
      <g stroke="#EE7F1A" strokeWidth="2.2" strokeLinecap="round">
        <line x1="50" y1="3" x2="50" y2="8" />
        <line x1="31" y1="8" x2="34" y2="13" />
        <line x1="69" y1="8" x2="66" y2="13" />
        <line x1="18" y1="20" x2="23" y2="24" />
        <line x1="82" y1="20" x2="77" y2="24" />
        <line x1="12" y1="38" x2="18" y2="40" />
        <line x1="88" y1="38" x2="82" y2="40" />
      </g>

      {/* Decorative Brand Sparkles */}
      <path
        d="M17 48 Q17 43 14 41 Q17 39 17 34 Q17 39 20 41 Q17 43 17 48 Z"
        fill="#EE7F1A"
      />
      <path
        d="M83 48 Q83 43 80 41 Q83 39 83 34 Q83 39 86 41 Q83 43 83 48 Z"
        fill="#EE7F1A"
      />

      {/* Shadow Base beneath Wrists */}
      <ellipse cx="50" cy="74" rx="16" ry="3.5" fill="#211712" opacity="0.12" />

      {/* Left Hand Solid Silhouette */}
      <path
        d="M50 15 C46.5 17.5 37.5 29 34.5 44 C32.5 52 32.5 60 35.5 67 L50 71 Z"
        fill="#FFFFFF"
      />

      {/* Right Hand Solid Silhouette */}
      <path
        d="M50 15 C53.5 17.5 62.5 29 65.5 44 C67.5 52 67.5 60 64.5 67 L50 71 Z"
        fill="#FFFFFF"
      />

      {/* Outlined Folded Hands (Anjali Mudra / Namaste) */}
      <g stroke="#211712" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {/* Left Hand Outer Edge */}
        <path d="M50 15 C46.5 17.5 37.5 29 34.5 44 C32.5 52 32.5 60 35.5 67" />

        {/* Right Hand Outer Edge */}
        <path d="M50 15 C53.5 17.5 62.5 29 65.5 44 C67.5 52 67.5 60 64.5 67" />

        {/* Center Seam dividing the two palms */}
        <path d="M50 15 L50 71" strokeWidth="2.2" />

        {/* Folded Thumbs */}
        <path
          d="M34.5 51 C37 48 42 48 45.5 52 C47.5 55 46.5 62 46.5 64"
          fill="#FFF6EC"
          strokeWidth="2.2"
        />
        <path
          d="M65.5 51 C63 48 58 48 54.5 52 C52.5 55 53.5 62 53.5 64"
          fill="#FFF6EC"
          strokeWidth="2.2"
        />

        {/* Finger Creases (Left) */}
        <path d="M37.5 39 C40.5 39 44.5 42 46.5 45" strokeWidth="1.6" opacity="0.8" />
        <path d="M40.5 30 C43.5 31 46.5 34 47.5 37" strokeWidth="1.6" opacity="0.8" />

        {/* Finger Creases (Right) */}
        <path d="M62.5 39 C59.5 39 55.5 42 53.5 45" strokeWidth="1.6" opacity="0.8" />
        <path d="M59.5 30 C56.5 31 53.5 34 52.5 37" strokeWidth="1.6" opacity="0.8" />

        {/* Wrist Bangles / Sacred Kalava */}
        <path
          d="M34.5 67 C39.5 70 60.5 70 65.5 67 L65.5 72 C60.5 75 39.5 75 34.5 72 Z"
          fill="#EE7F1A"
          stroke="#211712"
          strokeWidth="2.2"
        />
        <path
          d="M35.5 73 C40.5 76 59.5 76 64.5 73 L64.5 76 C59.5 79 40.5 79 35.5 76 Z"
          fill="#211712"
          stroke="#211712"
          strokeWidth="1.8"
        />
      </g>

      {/* Chunky Sticker Pill Badge: नमस्ते */}
      <g filter="drop-shadow(2.5px 2.5px 0px #211712)">
        <rect
          x="19"
          y="81"
          width="62"
          height="18"
          rx="9"
          fill="#EE7F1A"
          stroke="#211712"
          strokeWidth="2.2"
        />
        <text
          x="50"
          y="93.8"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="10"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.2"
        >
          नमस्ते 🙏
        </text>
      </g>
    </svg>
  );
}
