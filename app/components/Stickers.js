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

export function NamasteSymbol({ size = 220, color = '#211712', opacity = 0.32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity, pointerEvents: 'none' }}
    >
      {/* Radiant Welcome Rays */}
      <g stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.75">
        <line x1="60" y1="8" x2="60" y2="16" />
        <line x1="42" y1="13" x2="47" y2="20" />
        <line x1="78" y1="13" x2="73" y2="20" />
        <line x1="27" y1="26" x2="33" y2="32" />
        <line x1="93" y1="26" x2="87" y2="32" />
      </g>

      {/* Decorative Sparkle Stars */}
      <path
        d="M20 54 Q20 48 17 45 Q20 42 20 36 Q20 42 23 45 Q20 48 20 54 Z"
        fill={color}
        opacity="0.6"
      />
      <path
        d="M100 54 Q100 48 97 45 Q100 42 100 36 Q100 42 103 45 Q100 48 100 54 Z"
        fill={color}
        opacity="0.6"
      />

      {/* Folded Hands (Anjali Mudra / Pranam) */}
      <g stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Left hand contour */}
        <path d="M60 22 C53 26 46 36 44 48 C42 58 42 66 45 74 C47 78 45 84 45 92" />
        
        {/* Right hand contour */}
        <path d="M60 22 C67 26 74 36 76 48 C78 58 78 66 75 74 C73 78 75 84 75 92" />

        {/* Center seam between palms */}
        <path d="M60 23 L60 92" strokeWidth="1.8" strokeDasharray="3 2" />

        {/* Thumbs */}
        <path d="M45 66 C48 66 52 69 55 74" strokeWidth="2" />
        <path d="M75 66 C72 66 68 69 65 74" strokeWidth="2" />

        {/* Finger crease details left */}
        <path d="M48 48 C51 49 55 52 57 56" strokeWidth="1.6" opacity="0.8" />
        <path d="M50 38 C53 40 56 43 58 46" strokeWidth="1.6" opacity="0.8" />

        {/* Finger crease details right */}
        <path d="M72 48 C69 49 65 52 63 56" strokeWidth="1.6" opacity="0.8" />
        <path d="M70 38 C67 40 64 43 62 46" strokeWidth="1.6" opacity="0.8" />

        {/* Wrist bands / cuffs */}
        <path d="M42 92 C50 94 70 94 78 92" strokeWidth="2.5" />
        <path d="M44 97 C50 99 70 99 76 97" strokeWidth="2" opacity="0.75" />
      </g>

      {/* Traditional "नमस्ते" Typography */}
      <text
        x="60"
        y="114"
        textAnchor="middle"
        fill={color}
        fontSize="13"
        fontWeight="800"
        fontFamily="inherit"
        letterSpacing="2"
      >
        नमस्ते
      </text>

      <text
        x="60"
        y="126"
        textAnchor="middle"
        fill={color}
        fontSize="7.5"
        fontWeight="800"
        letterSpacing="2"
        opacity="0.85"
      >
        SWAGATAM
      </text>
    </svg>
  );
}
